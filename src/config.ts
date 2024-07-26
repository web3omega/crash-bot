import * as os from "os";

import dotenv from "dotenv";

dotenv.config();
export default {
  env: process.env.NODE_ENV ?? "development",
  RPC_URL: process.env.RPC_URL ?? "https://api.devnet.solana.com",
  CRASH_API: process.env.CRASH_URL ?? "https://crash-api.degencoinflip.com",
  COINFLIP_API: process.env.COINFLIP_URL ?? "https://api.degencoinflip.com/v2",
  CASHOUT_MULTIPLIER: (process.env.CASHOUT_MULTIPLIER ?? 2) as number,
  BET_SIZE: (process.env.BET_SIZE ?? 0.01) as number,
};
