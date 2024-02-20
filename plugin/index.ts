import { AssetStatus, PluginI, SDK, ValveFamilies } from "@qatium/plugin";

class Plugin implements PluginI {
  onNetworkChanged() {
    console.log("network changed")
  }

  run(sdk: SDK) {
    sdk.ui.sendMessage(sdk.network.getValves((a) => (
      a.family === ValveFamilies.TCV &&
      !!a.simulation &&
      a.simulation.status === AssetStatus.CLOSED
    )).length)
  }

  onMessage(sdk: SDK, message: unknown) {
    if (typeof message !== "string") {
      return;
    }

    switch(message) {
      case "zoomMap":
        return sdk.map.fitTo(["Mandalay_P1"], { flightDuration: 2000 });
      default:
        return;
    }
  }
}

register(new Plugin());
