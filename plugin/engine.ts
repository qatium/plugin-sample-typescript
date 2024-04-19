import { AssetStatus, OverlayLayer, PluginI, SDK, ValveFamilies } from "@qatium/plugin/engine";

export class Engine implements PluginI<{ command: string; data: number }> {
  run(sdk: SDK) {
    const closedValves = sdk.network.getValves((valve) => valve.simulation?.status === "CLOSED");

    sdk.map.addOverlay([
      {
        type: 'HeatmapLayer',
        id: 'density',
        data: closedValves.map((valve) => ({
          geometry: valve.geometry,
          properties: {},
          type: 'Feature'
        })),
        opacity: 0.5,
        visible: true,
        getPosition: (j) => j.geometry.coordinates,
        radiusPixels: 25
      } as OverlayLayer<"HeatmapLayer">
    ]);

    sdk.ui.sendMessage(sdk.network.getValves((a) => (
      a.family === ValveFamilies.TCV &&
      !!a.simulation &&
      a.simulation.status === AssetStatus.CLOSED
    )).length);
  }

  private closeValves(sdk: SDK, quantity: number) {
    return sdk.network
      .getValves((valve) => valve.simulation?.status === "OPEN")
      .slice(0, quantity)
      .forEach((valve) => {
        sdk.network.setStatus(valve.id, "CLOSED");
      });
  }

  onMessage(sdk: SDK, message: { command: string; data: number }) {
    switch (message.command) {
      case "closeValves":
        return this.closeValves(sdk, message.data)
      default:
        return;
    }
  }
}