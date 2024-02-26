import { sendMessage, onMessage } from '@qatium/plugin/ui'

const changeMapButton = document.querySelector("#changeMap") as HTMLButtonElement;
changeMapButton?.addEventListener("click", () => {
  sendMessage("zoomMap")
});

onMessage<number>((msg) => {
  const valveText = document.querySelector("#valves");
  if (!valveText) return;

  valveText.innerHTML = `${msg}`;
})