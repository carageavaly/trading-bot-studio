import { ipcMain } from "electron";
import { orchestratorManager } from "../core/trading/engine/orchestrator-manager";

ipcMain.handle("bot:start", () => {
  orchestratorManager.start();
  return { running: true };
});

ipcMain.handle("bot:stop", () => {
  orchestratorManager.stop();
  return { running: false };
});

ipcMain.handle("bot:status", () => {
  return { running: orchestratorManager.isRunning(), mode: orchestratorManager.getMode() };
});
