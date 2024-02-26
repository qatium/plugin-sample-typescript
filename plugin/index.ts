import { AssetStatus, OverlayLayer, PluginI, SDK, ValveFamilies } from "@qatium/plugin/engine";

class Plugin implements PluginI<string> {
  run(sdk: SDK) {
    const hydrants = sdk.network.getJunctions((j) => j.group === 'hydrant');

    sdk.map.addOverlay([
      {
        type: 'HeatmapLayer',
        id: 'density',
        data: hydrants.map((h) => ({ geometry: h.geometry, properties: {}, type: 'Feature' })),
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

  onMessage(sdk: SDK, message: string) {
    switch(message) {
      case "zoomMap":
        return sdk.map.fitTo(["Mandalay_P1"], { flightDuration: 2000 });
      default:
        return;
    }
  }
}

register(new Plugin());
