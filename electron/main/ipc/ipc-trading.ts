import { ipcMain } from "electron";
import { getDemoAccount } from "../core/storage/user-store";
import { DEFAULT_PAIRS } from "../core/trading/config/pairs-config";

ipcMain.handle("trading:status", async () => {
  return {
    account: getDemoAccount(),
    pairs: DEFAULT_PAIRS
  };
});
