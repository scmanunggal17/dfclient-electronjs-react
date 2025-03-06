import { app, BrowserWindow, screen } from "electron";
import path from "node:path";

const createWindow = () => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  const winHeight = height - 50;
  const posX = width - 500;

  const win = new BrowserWindow({
    minHeight: 700,
    minWidth: 500,
    width: 500,
    height: winHeight,
    x: posX,
    y: 0,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(app.getAppPath(), "src/electron/preload.cjs"),
    },
  });

  win.loadFile("dist-react/index.html");
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
