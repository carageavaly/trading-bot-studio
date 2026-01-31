import { app, BrowserWindow } from "electron";
import path from "path";

import log from "electron-log";
import { autoUpdater } from "electron-updater";

import { setMainWindow } from "./ipc/ipc-trading-stream";
import { orchestratorManager } from "./core/trading/engine/orchestrator-manager";
import { ipcMain } from "electron";

ipcMain.handle("update:check", () => {
  autoUpdater.checkForUpdatesAndNotify();
  return { ok: true };
});


let mainWindow: BrowserWindow | null = null;

// ---------------------------------------------------------
//  ELECTRON-LOG (v5+) INITIALIZATION
// ---------------------------------------------------------
log.initialize();
autoUpdater.logger = log;

// setează nivelul de log pentru fișier
const fileTransport = log.transports.file || log.transports.get("file");
fileTransport.level = "info";

// ---------------------------------------------------------
//  AUTO-UPDATER EVENTS
// ---------------------------------------------------------
autoUpdater.on("update-available", () => {
  log.info("Update available");
  mainWindow?.webContents.send("update:available");
});

autoUpdater.on("update-not-available", () => {
  log.info("No update available");
  mainWindow?.webContents.send("update:none");
});

autoUpdater.on("download-progress", (progress) => {
  mainWindow?.webContents.send("update:progress", progress);
});

autoUpdater.on("update-downloaded", () => {
  mainWindow?.webContents.send("update:ready");
});

// ---------------------------------------------------------
//  WINDOW CREATION
// ---------------------------------------------------------
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "../preload/preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  setMainWindow(mainWindow);

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../../dist/index.html"));
  }
};

// ---------------------------------------------------------
//  APP READY
// ---------------------------------------------------------
app.whenReady().then(() => {
  // 1. Creează fereastra
  createWindow();

  // 2. Creează orchestratorul în modul DEMO
  orchestratorManager.create("DEMO");

  // 3. Pornește auto-update
  autoUpdater.checkForUpdatesAndNotify();

  // macOS behavior
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// ---------------------------------------------------------
//  CLOSE BEHAVIOR
// ---------------------------------------------------------
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
