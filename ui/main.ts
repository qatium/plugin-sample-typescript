import { sendMessage, onMessage } from '@qatium/plugin'

const changeMapButton = document.querySelector("#changeMap") as HTMLButtonElement;
changeMapButton?.addEventListener("click", () => {
  sendMessage("zoomMap")
});

onMessage((msg) => {
  const valveText = document.querySelector("#valves");
  if (!valveText) return;

  valveText.innerHTML = `${msg}`;
})