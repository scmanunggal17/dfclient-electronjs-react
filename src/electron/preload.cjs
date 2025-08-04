const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");
const utm = require("utm");

let udpCallbackRef = null;

contextBridge.exposeInMainWorld("NodeFn", {
  closeApp: () => {
    ipcRenderer.send("close-app");
  },
  convertUtm: (lat, lon) => {
    return utm.fromLatLon(lat, lon);
  },
  writeFile: (path, data, options) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, data, options, (err) => {
        if (err) {
          rejects(err);
        } else {
          resolve();
        }
      });
    });
  },
  readFile: (path, options) => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, options, (err, data) => {
        if (err) {
          if (err.code === "ENOENT") {
            const defaultData = JSON.stringify(
              {
                latDms: "0",
                lonDms: "",
                zone: "0",
                easting: "0",
                northing: "0",
                co: "0",
                compassOffset: 0,
              },
              null,
              2
            );
            fs.writeFile(path, defaultData, "utf8", (err) => {});
          } else {
            reject(err);
          }
        } else {
          resolve(data);
        }
      });
    });
  },
  reloadWindow: () => ipcRenderer.send("reload-window"),
  moveWindow: (side) => ipcRenderer.send("move-window", side),

  startUdpListener: (callback) => {
    udpCallbackRef = (_event, data) => callback(data);
    ipcRenderer.on("udp-message", udpCallbackRef);
  },
  stopUdpListener: () => {
    if (udpCallbackRef) {
      ipcRenderer.removeListener("udp-message", udpCallbackRef);
      udpCallbackRef = null;
    }
  },
});
