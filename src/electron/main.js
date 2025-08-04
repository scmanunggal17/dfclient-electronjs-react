const { app, BrowserWindow, screen, ipcMain } = require("electron");
const path = require("path");
const dgram = require('dgram');

let mainWIndow;

const createWindow = () => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  const winHeight = 912;
  const posX = width - 400;

  mainWIndow = new BrowserWindow({
    minHeight: 700,
    minWidth: 400,
    width: 400,
    height: winHeight,
    x: posX,
    y: 0,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  mainWIndow.loadFile(path.join(__dirname, "../../dist-react/index.html"));

  const udpSocket = dgram.createSocket('udp4');

  udpSocket.on('message', (msg, _rinfo) => {
    const dataInHz = parseInt(msg.toString().trim(), 10)

    if(!isNaN(dataInHz) && dataInHz > 0) {
      const dataInMhz = (dataInHz / 1_000_000).toFixed(3);

      if(mainWIndow) {
        mainWIndow.webContents.send('udp-message', dataInMhz);
      }
    }
  });

  udpSocket.bind(41234, "127.0.0.1");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("close-app", () => {
  setTimeout(() => {
    app.quit();
  }, 3000);
});

ipcMain.on("reload-window", () => {
  if (mainWIndow) {
    mainWIndow.reload();
  }
});

ipcMain.on("move-window", (_event, side) => {

  if(!mainWIndow) return;

  const { width } = screen.getPrimaryDisplay().workAreaSize;
  const posX = side === "right" ? width - 400 : 0;
  mainWIndow.setBounds({
    x: posX,
    y: 0,
    width: mainWIndow.getBounds().width,
    height: mainWIndow.getBounds().height,
  });
});