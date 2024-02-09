import { registerPlugin } from "@qatium/plugin";

import { MyPlugin } from "./plugin";

onload = () => {
  registerPlugin(new MyPlugin());
};
