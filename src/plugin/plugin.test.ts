import {
  Network,
  mockSDK
} from "@qatium/sdk-testing-library"
import { MyPlugin } from "./plugin"
import { Valve } from '@qatium/sdk';

describe("engine", () => {
  const network: Network = [
    {
      id: "S1",
      type: "Junction"
    },
    {
      id: "V1",
      connections: ["S1", "T1"],
      simulation: {
        status: "OPEN"
      },
      type: "Valve"
    },
    {
      id: "T1",
      type: "Tank"
    },
    {
      id: "V2",
      connections: ["T1", "J1"],
      simulation: {
        status: "CLOSED"
      },
      type: "Valve"
    },
    {
      id: "J1",
      type: "Junction"
    },
  ];

  it("close valves on message", () => {
    const sdk = mockSDK({ network })
    global.sdk = sdk;
    const pluginEngine = new MyPlugin();

    pluginEngine.onMessage({ command: "closeValves", data: 1 });

    expect(sdk.network.setStatus).toHaveBeenCalledTimes(1);
    expect(sdk.network.setStatus).toHaveBeenCalledWith("V1", "CLOSED");

    expect((sdk.network.getAsset("V1") as Valve)?.simulation?.status).toEqual("CLOSED")
  });
});