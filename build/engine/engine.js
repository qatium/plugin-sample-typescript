import { AssetStatus, ValveFamilies } from "@qatium/plugin/engine";
export class Engine {
    run(sdk) {
        const closedValves = sdk.network.getValves((a) => (a.family === ValveFamilies.TCV &&
            !!a.simulation &&
            a.simulation.status === AssetStatus.CLOSED));
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
            }
        ]);
        sdk.ui.sendMessage(closedValves.length);
    }
    closeValves(sdk, quantity) {
        return sdk.network
            .getValves((valve) => { var _a; return ((_a = valve.simulation) === null || _a === void 0 ? void 0 : _a.status) === "OPEN"; })
            .slice(0, quantity)
            .forEach((valve) => {
            sdk.network.setStatus(valve.id, "CLOSED");
        });
    }
    onMessage(sdk, message) {
        switch (message.command) {
            case "closeValves":
                return this.closeValves(sdk, message.data);
            default:
                return;
        }
    }
}
