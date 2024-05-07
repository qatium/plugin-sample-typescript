import { sendMessage, onMessage } from '@qatium/plugin/ui';
const changeMapButton = document.querySelector("#close-valves");
changeMapButton === null || changeMapButton === void 0 ? void 0 : changeMapButton.addEventListener("click", () => {
    sendMessage({ command: "closeValves", data: 10 });
});
onMessage((msg) => {
    const valveText = document.querySelector("#valves");
    if (!valveText)
        return;
    valveText.innerHTML = `${msg}`;
});
