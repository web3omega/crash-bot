import {
  Connection,
  Keypair,
  PublicKey,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { Dealer } from "./idl/dealer";
import { IdlAccounts, utils, BN } from "@coral-xyz/anchor";
import "dotenv/config";

const IS_DEV = (process.env.IS_DEV || "").toUpperCase() === "TRUE";

export const programId = new PublicKey(
  "DEALERKFspSo5RoXNnKAhRPhTcvJeqeEgAgZsNSjCx5E"
);

export const getRoomPDA = (gameNumber: number, roomNumber: number) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from(utils.bytes.utf8.encode("ROOM")),
      new BN(gameNumber).toBuffer("be", 2),
      new BN(roomNumber).toBuffer("be", 2),
    ],
    programId
  );
  return pda;
};

export const getHousePDA = () => {
  const [pda] = PublicKey.findProgramAddressSync(
    [Buffer.from(utils.bytes.utf8.encode("HOUSE"))],
    programId
  );
  return pda;
};

export const getColdWallet = () => {
  return new PublicKey(
    IS_DEV
      ? "6RAb9hDKR777EWccBnH4DqJJMvwmoeLegpKYrouFGeJa"
      : "i821bbVqQguuDLQp72gNWd52KBXBcEAQc4sVtZxWk4n"
  );
};

export const getBossWallet = () => {
  return new PublicKey(
    IS_DEV
      ? "6RAb9hDKR777EWccBnH4DqJJMvwmoeLegpKYrouFGeJa"
      : "DEALVwKJrYswMvZAwPP5DpaN7epa6VXn16ondftGY1cB"
  );
};

export const getFeePDA = (gameNumber: number) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from(utils.bytes.utf8.encode("FEE")),
      new BN(gameNumber).toBuffer("be", 2),
    ],
    programId
  );
  return pda;
};

export const getRewardPDA = (gameNumber: number, player: PublicKey) => {
  const [pda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from(utils.bytes.utf8.encode("REWARD")),
      new BN(gameNumber).toBuffer("be", 2),
      player.toBuffer(),
    ],
    programId
  );
  return pda;
};

export const simulateSendAndConfirmTX = async (
  instructions: TransactionInstruction[],
  payer: Keypair,
  connection: Connection
) => {
  const latestBlockhash = await connection.getLatestBlockhash();

  const messageV0 = new TransactionMessage({
    payerKey: payer.publicKey,
    recentBlockhash: latestBlockhash.blockhash,
    instructions: instructions,
  }).compileToV0Message();
  const transaction = new VersionedTransaction(messageV0);
  transaction.sign([payer]);

  console.log(await connection.simulateTransaction(transaction));
  const signature = await connection.sendTransaction(transaction);

  const confirmed = (
    await connection.confirmTransaction({
      signature,
      blockhash: latestBlockhash.blockhash,
      lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
    })
  ).value;

  return { confirmed, signature };
};

export async function asyncForEach(array: any, callback: any) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export interface RoomAccountMeta {
  publicKey: PublicKey;
  account: IdlAccounts<Dealer>["gameRoom"];
}
