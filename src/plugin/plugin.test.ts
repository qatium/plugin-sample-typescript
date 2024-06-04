import {
  aJunction,
  aSupplySource,
  aTank,
  aValve,
  mockSDK
} from "@qatium/sdk-testing-library"
import { MyPlugin } from "./plugin"
import { Valve } from '@qatium/plugin';

describe("engine", () => {
  const buildNetwork = () => [
    aSupplySource({
      id: "S1"
    }),
    aValve({
      id: "V1",
      connections: ["S1", "T1"],
      simulation: {
        status: "OPEN"
      }
    }),
    aTank({
      id: "T1"
    }),
    aValve({
      id: "V2",
      connections: ["T1", "J1"],
      simulation: {
        status: "CLOSED"
      }
    }),
    aJunction({
      id: "J1"
    }),
  ];

  it("close valves on message", () => {
    const sdk = mockSDK({ network: buildNetwork() })
    global.sdk = sdk;
    const pluginEngine = new MyPlugin();

    pluginEngine.onMessage({ command: "closeValves", data: 1 });

    expect(sdk.network.setStatus).toHaveBeenCalledTimes(1);
    expect(sdk.network.setStatus).toHaveBeenCalledWith("V1", "CLOSED");

    expect((sdk.network.getAsset("V1") as Valve)?.simulation?.status).toEqual("CLOSED")
  });
});