const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("NodeFn", {
  closeApp: () => {
    ipcRenderer.send("close-app");
  },
});
