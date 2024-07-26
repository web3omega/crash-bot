# Crash bot

Simple bot to play on-chain crash on https://crash.degencoinflip.com, made in Typescript.

This bot just listens to on-chain events and places a new bet once a new round starts, and sets an auto-cashout value. It will also periodically claim profits. The bot is very basic, it has currently no checks and retries in place in case transactions do not land.

The bot claims in intervals. Please monitor yourself or adapt the code to your needs.

## Preparation

1. Create a keypair file `keypair.json`, for instance using `solana-keygen new -o keypair.json`
2. Create an `.env` file and add your own RPC URL. Adjust the other settings if necessary.

```
RPC_URL=<FILL IN YOUR URL>
CASHOUT_MULTIPLIER=2
BET_SIZE=0.01
```

## Build & Run

Run these commands to build and start the bot! Have fun!

```
yarn
yarn run start
```
