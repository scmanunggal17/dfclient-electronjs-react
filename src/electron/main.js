const { app, BrowserWindow, screen, ipcMain } = require("electron");
const path = require("path");

const createWindow = () => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  const winHeight = 912;
  const posX = width - 400;

  const win = new BrowserWindow({
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

  win.loadFile(path.join(__dirname, "../../dist-react/index.html"));
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
  const win = BrowserWindow.getFocusedWindow();
  if (win) {
    win.reload();
  }
});

ipcMain.on("move-window", (event, side) => {
  let posX = 0;
  if (side === "left") {
    posX = 0;
  } else if (side === "right") {
    posX = screen.getPrimaryDisplay().workAreaSize.width - 400;
  }
  const win = BrowserWindow.getFocusedWindow();
  if (win) {
    win.setBounds({
      x: posX,
      y: 0,
      width: win.getBounds().width,
      height: win.getBounds().height,
    });
  }
});
