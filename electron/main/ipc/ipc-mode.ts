import { ipcMain } from "electron";
import { orchestratorManager } from "../core/trading/engine/orchestrator-manager";

ipcMain.handle("mode:set", (_, mode: "DEMO" | "LIVE") => {
  orchestratorManager.create(mode);
  return { success: true, mode };
});
