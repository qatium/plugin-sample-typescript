const a = "0.0.19", l = {
  OPEN: "OPEN",
  ACTIVE: "ACTIVE",
  CLOSED: "CLOSED",
  ON: "OPEN",
  OFF: "CLOSED"
}, V = {
  PRV: "PRV",
  PSV: "PSV",
  PBV: "PBV",
  FCV: "FCV",
  TCV: "TCV",
  GPV: "GPV"
}, i = a, o = "0.0.33", u = (e) => {
  _registerPlugin(e, {
    "@qatium/plugin": o,
    "@qatium/sdk": i
  });
};
class c {
  run() {
    const t = sdk.network.getValves((s) => s.family === V.TCV && !!s.simulation && s.simulation.status === l.CLOSED);
    sdk.ui.sendMessage(t.length);
  }
  closeValves(t) {
    return sdk.network.getValves((s) => {
      var n;
      return ((n = s.simulation) == null ? void 0 : n.status) === "OPEN";
    }).slice(0, t).forEach((s) => {
      sdk.network.setStatus(s.id, "CLOSED");
    });
  }
  onMessage(t) {
    switch (t.command) {
      case "closeValves":
        return this.closeValves(t.data);
      default:
        return;
    }
  }
}
u(new c());
