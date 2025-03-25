const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");
const { resolve } = require("path");

contextBridge.exposeInMainWorld("NodeFn", {
  closeApp: () => {
    ipcRenderer.send("close-app");
  },
  writeFile: (path, data, options) => {
    fs.writeFile(path, data, options, (err) => {
      if (err) {
        rejects(err);
      } else {
        resolve();
      }
    });
  },
  readFile: (path, options) => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, options, (err, data) => {
        if (err) {
          if (err.code === "ENOENT") {
            const defaultData = JSON.stringify(
              {
                latDms: "00°00'00.0\"N",
                lonDms: "00°00'00.0\"E",
                zone: "00T",
                easting: "000000",
                northing: "000000",
                co: "00",
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
});
