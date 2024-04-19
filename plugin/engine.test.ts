import {
  aJunction,
  aPipe,
  aPump,
  aSupplySource,
  aTank,
  aValve,
  mockSDK
} from "@qatium/sdk-testing-library"
import { Engine } from "./engine"
import { Valve } from '@qatium/sdk';

describe("engine", () => {
  const buildNetwork = () => [
    aSupplySource({
      id: "S1"
    }),
    aPump({
      id: "Pu1",
      connections: ["S1", "T1"]
    }),
    aTank({
      id: "T1"
    }),
    aPipe({
      id: "P1_1",
      connections: ["T1", "V2"]
    }),
    aValve({
      id: "V2",
      connections: ["P1_1", "P1_2"],
      simulation: {
        status: "OPEN"
      }
    }),
    aPipe({
      id: "P1_2",
      connections: ["V2", "J1"]
    }),
    aJunction({
      id: "J1",
      group: "hydrant",
      simulation: {}
    }),
    aPipe({
      id: "P2",
      connections: ["J1", "V1"]
    }),
    aValve({
      id: "V1",
      connections: ["P2"],
      simulation: {
        status: "CLOSED"
      }
    })
  ];

  it("add heatmap layer on run", () => {
    const sdk = mockSDK({ network: buildNetwork() })
    const pluginEngine = new Engine();

    pluginEngine.run(sdk);

    expect(sdk.map.addOverlay).toHaveBeenCalledWith([
      expect.objectContaining({
        data: [{
          "geometry": {
            "coordinates": [0, 0],
            "type": "Point"
          },
          "properties": {},
          "type": "Feature"
        }],
        type: "HeatmapLayer"
      })
    ])
  });

  it("close valves on message", () => {
    const sdk = mockSDK({ network: buildNetwork() })
    const pluginEngine = new Engine();

    pluginEngine.onMessage(sdk, { command: "closeValves", data: 1 });

    expect(sdk.network.setStatus).toHaveBeenCalledTimes(1);
    expect(sdk.network.setStatus).toHaveBeenCalledWith("V2", "CLOSED");

    expect((sdk.network.getAsset("V2") as Valve)?.simulation?.status).toEqual("CLOSED")
  });
});