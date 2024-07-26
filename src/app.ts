import { AnchorProvider, BorshCoder, Program, Wallet } from "@coral-xyz/anchor";
import { IDL } from "./idl/dealer";
import {
  ComputeBudgetProgram,
  Connection,
  Context,
  KeyedAccountInfo,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from "@solana/web3.js";
import BN from "bn.js";
import {
  getBossWallet,
  getColdWallet,
  getFeePDA,
  getHousePDA,
  getRewardPDA,
  getRoomPDA,
  RoomAccountMeta,
  simulateSendAndConfirmTX,
} from "./utils";
import * as fs from "fs";
import config from "./config";
import axios from "axios";
import nacl from "tweetnacl";
import { decodeUTF8 } from "tweetnacl-util";

const coder = new BorshCoder(IDL);

const connection = new Connection(config.RPC_URL, {
  commitment: "confirmed",
  confirmTransactionInitialTimeout: 10000,
});

const provider: AnchorProvider = new AnchorProvider(
  connection,
  new Wallet(new Keypair()),
  {
    preflightCommitment: "confirmed",
    commitment: "confirmed",
  }
);
const PROGRAM_ADDRESS = new PublicKey(
  "DEALERKFspSo5RoXNnKAhRPhTcvJeqeEgAgZsNSjCx5E"
);

const program = new Program(IDL, PROGRAM_ADDRESS, provider);

const player: Keypair = Keypair.fromSeed(
  Uint8Array.from(
    JSON.parse(fs.readFileSync("./keypair.json", "utf-8")).slice(0, 32)
  )
);

const wallet = new Wallet(player);

const gameNumber = 2;
const roomNumber = 1;
let currentRound = new BN(0);

type AuthorizationToken = {
  exp: number;
  idToken: string;
  username: string;
  firstName: string;
  lastName: string;
};

let authKey: AuthorizationToken;

// Sign nonce
const signNonce = async () => {
  try {
    const nonceURL = `${config.COINFLIP_API}/wallets/${wallet.publicKey}/nonce`;
    const response = await axios.get(nonceURL);
    console.log("Authenticating to backend...");

    if (response.data.payload.nonce) {
      const message = `I am signing my one-time nonce: ${response.data.payload.nonce}`;
      const messageBytes = decodeUTF8(message);
      const signature = nacl.sign.detached(
        messageBytes,
        wallet.payer.secretKey
      );

      const authorizeBody = JSON.stringify({
        walletId: wallet.publicKey.toString(),
        signature: Buffer.from(signature).toString("base64"),
      });

      const authorizeResponse = await axios.post(
        `${config.COINFLIP_API}/authorize`,
        authorizeBody,
        {
          headers: {
            "Signature-Encoding": "base64",
            "Content-Type": "application/json",
          },
        }
      );
      authKey = authorizeResponse.data.payload as AuthorizationToken;

      console.log("Authenticated!");
      return true;
    }
  } catch (err) {}

  console.log("Cannot authenticate. Do you have keypair.json file?");
  return false;
};

const setMultiplier = async (stopAt: number) => {
  try {
    await axios
      .get(
        `${config.CRASH_API}/api/status/set_multiplier?multiplier=${stopAt}`,
        {
          headers: { Authorization: authKey.idToken },
        }
      )
      .then((result) => {
        if (result.data.multiplier) {
          console.log(`Confirmed set multiplier to ${result.data.multiplier}`);
        }
      });
  } catch (err) {
    console.log(`Error setting multiplier`);
    console.log(err);
  }
};

const playerJoinGame = async (betsize: number) => {
  try {
    const betsizeLamports = new BN(betsize * LAMPORTS_PER_SOL);

    const computeBudgetInstruction = ComputeBudgetProgram.setComputeUnitPrice({
      microLamports: 100000,
    });

    const computeBudgetLimitInstruction =
      ComputeBudgetProgram.setComputeUnitLimit({
        units: 120000,
      });

    const instruction = await program.methods
      .join(gameNumber, roomNumber, betsizeLamports, currentRound, "N_A")
      .accounts({
        room: getRoomPDA(gameNumber, roomNumber),
        house: getHousePDA(),
        fee: getFeePDA(gameNumber),
        coldHouse: getColdWallet(),
        player: player.publicKey,
        boss: getBossWallet(),
      })
      .instruction();

    const confirmation = await simulateSendAndConfirmTX(
      [computeBudgetInstruction, computeBudgetLimitInstruction, instruction],
      player,
      connection
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log(
      "Confirmed! Your transaction signature",
      confirmation.signature
    );
  } catch (err) {}
};

const claimGame = async () => {
  const computeBudgetInstruction = ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: 100000,
  });

  const computeBudgetLimitInstruction =
    ComputeBudgetProgram.setComputeUnitLimit({
      units: 120000,
    });

  const instruction = await program.methods
    .claim(gameNumber)
    .accounts({
      rewardAccount: getRewardPDA(gameNumber, player.publicKey),
      player: player.publicKey,
    })
    .instruction();

  const confirmation = await simulateSendAndConfirmTX(
    [computeBudgetInstruction, computeBudgetLimitInstruction, instruction],
    player,
    connection
  );

  await new Promise((resolve) => setTimeout(resolve, 5000));

  console.log(
    `Claimed! Player ${player.publicKey.toBase58()} Balance: ${
      (await connection.getBalance(player.publicKey)) / LAMPORTS_PER_SOL
    } SOL`
  );

  console.log("Your transaction signature", confirmation.signature);
};

const parseNewGames = async (
  keyedAccountInfo: KeyedAccountInfo,
  context: Context
) => {
  try {
    const newGameMeta: RoomAccountMeta = {
      publicKey: keyedAccountInfo.accountId,
      account: coder.accounts.decode(
        "gameRoom",
        keyedAccountInfo.accountInfo.data
      ),
    };

    if (
      currentRound.toNumber() !== newGameMeta.account.currentRound.toNumber() &&
      newGameMeta.account.currentGameStatus.betsOpen
    ) {
      currentRound = newGameMeta.account.currentRound;
      setMultiplier(config.CASHOUT_MULTIPLIER);
      playerJoinGame(config.BET_SIZE);
    }
  } catch (err) {
    console.log(err);
    console.log("Cannot parse new games from keyedaccountinfo!");
  }
};

const init = async () => {
  claimGame();

  if (!(await signNonce())) return;

  //Start fetching room changes
  provider.connection.onProgramAccountChange(
    PROGRAM_ADDRESS,
    parseNewGames,
    "confirmed"
  );

  // Periodically claim
  setInterval(() => {
    claimGame();
  }, 900000); //Every 15 minutes
};

init();
