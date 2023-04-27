#!/usr/bin/env -S deno run -A
import {
  decodeAddress,
  GearApi,
  GearKeyring,
  getProgramMetadata,
} from "https://gear-js.deno.dev/api/index.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
// import deploy from "../dist/deploy.json" assert { type: "json" };
// import { metaHex } from "../dist/mod.ts";

if (Deno.args.length !== 1) {
  throw Error("usage: ./script/start_battle.ts <PROGRAM_ID>");
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

  const alice = await GearKeyring.fromSuri("//Alice");
  const aliceHex = decodeAddress(alice.address);

  const api = await initGearApi();

  const payload = {
    StartBattle: null,
  };
  console.log(payload);

  const gas = await api.program.calculateGas.handle(
    aliceHex,
    programId,
    payload,
    0,
    true,
    meta,
  );
  console.log(`GasLimit: ${gas}\n`);

  const msg = {
    destination: programId,
    payload,
    gasLimit: gas.min_limit,
    value: 0,
  };

  console.log(msg);

  const tx = api.message.send(msg, meta);

  await new Promise((resolve, reject) => {
    tx.signAndSend(alice, ({ events, status }) => {
      console.log(`STATUS: ${status.toString()}`);
      if (status.isFinalized) {
        resolve(status.asFinalized);
      }
      events.forEach(({ event }) => {
        if (event.method === "ExtrinsicFailed") {
          reject(api.getExtrinsicFailedError(event).docs.join("\n"));
        }
      });
    });
  });
}

await main();
Deno.exit(0);
