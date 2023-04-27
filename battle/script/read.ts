#!/usr/bin/env -S deno run -A
import {
  GearApi,
  getProgramMetadata,
  getStateMetadata,
} from "https://gear-js.deno.dev/api/index.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

if (Deno.args.length !== 1) {
  throw Error("usage: ./script/read.ts <PROGRAM_ID>");
}

const programId = Deno.args[0];
const metaHex = "0x" + Deno.readTextFileSync("./battle.meta.txt");
const meta = getProgramMetadata(metaHex);

let { RPC_NODE } = config();

async function initGearApi() {
  return await GearApi.create({
    providerAddress: RPC_NODE,
  });
}

async function main() {
  console.log("api is initializing. Please hold on...");

  const api = await initGearApi();

  console.log({ programId, meta });

  const result = await api.programState.read(
    { programId },
    meta,
  );

  console.log("full_state:", result.toHuman());
}

await main();
Deno.exit(0);
