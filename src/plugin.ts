import { AssetStatus, PluginI, SDK, ValveFamilies } from '@qatium/plugin';

export class MyPlugin implements PluginI {
  private changeMapListener = () => {};

  private async handleChangeMap(sdk: SDK) {
    sdk.map.setHighlights(["Mandalay_P1"]);
    sdk.map.fitTo(["Mandalay_P1"], { flightDuration: 2000 });
    setTimeout(() => sdk.map.clearHighlights(), 4000);
  }

  async run(sdk: SDK) {
    const changeMapButton = document.querySelector("#changeMap") as HTMLButtonElement;
    if (changeMapButton) {
      changeMapButton.removeEventListener("click", this.changeMapListener);
      this.changeMapListener = async () => await this.handleChangeMap(sdk);
      changeMapButton.addEventListener("click", this.changeMapListener);
    }

    const closedValves = await sdk.network.getValves((a) => (
      a.family === ValveFamilies.TCV &&
      !!a.simulation &&
      a.simulation.status === AssetStatus.CLOSED
    ));

    const valveText = document.querySelector("#valves");
    if (!valveText) return;

    valveText.innerHTML = `${closedValves.length}`;
  }
}