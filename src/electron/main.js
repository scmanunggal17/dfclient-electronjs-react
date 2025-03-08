import { app, BrowserWindow, screen, ipcMain } from "electron";
import path from "node:path";

const createWindow = () => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  //Edit ini
  // const winHeight = height - 46;
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
      preload: path.join(app.getAppPath(), "src/electron/preload.cjs"),
    },
  });

  win.loadFile("dist-react/index.html");
  console.log("window Height: " + height);
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
