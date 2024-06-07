import { sendMessage, onMessage } from '@qatium/sdk/ui'

const changeMapButton = document.querySelector("#close-valves") as HTMLButtonElement;
changeMapButton?.addEventListener("click", () => {
  sendMessage({ command: "closeValves", data: 10 })
});

onMessage<number>((msg) => {
  const valveText = document.querySelector("#valves");
  if (!valveText) return;

  valveText.innerHTML = `${msg}`;
})