import { AssetStatus, Plugin, ValveFamilies } from "@qatium/plugin";

type Message = { command: string; data: number }

export class MyPlugin implements Plugin {
  run() {
    const closedValves = sdk.network.getValves((a) => (
      a.family === ValveFamilies.TCV &&
      !!a.simulation &&
      a.simulation.status === AssetStatus.CLOSED
    ));

    sdk.ui.sendMessage(closedValves.length);
  }

  private closeValves(quantity: number) {
    return sdk.network
      .getValves((valve) => valve.simulation?.status === "OPEN")
      .slice(0, quantity)
      .forEach((valve) => {
        sdk.network.setStatus(valve.id, "CLOSED");
      });
  }

  onMessage(message: Message) {
    switch (message.command) {
      case "closeValves":
        return this.closeValves(message.data);
      default:
        return;
    }
  }
}