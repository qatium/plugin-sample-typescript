import { AssetStatus, PluginI, SDK, ValveFamilies } from "@qatium/plugin/engine";

type Message = { command: string; data: number }

export class Engine implements PluginI<Message> {
  run(sdk: SDK) {
    const closedValves = sdk.network.getValves((a) => (
      a.family === ValveFamilies.TCV &&
      !!a.simulation &&
      a.simulation.status === AssetStatus.CLOSED
    ));

    sdk.ui.sendMessage(closedValves.length);
  }

  private closeValves(sdk: SDK, quantity: number) {
    return sdk.network
      .getValves((valve) => valve.simulation?.status === "OPEN")
      .slice(0, quantity)
      .forEach((valve) => {
        sdk.network.setStatus(valve.id, "CLOSED");
      });
  }

  onMessage(sdk: SDK, message: Message) {
    switch (message.command) {
      case "closeValves":
        return this.closeValves(sdk, message.data)
      default:
        return;
    }
  }
}