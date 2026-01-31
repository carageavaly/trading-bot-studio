import { ipcMain } from "electron";

let liveConfig = {
  apiKey: "",
  apiSecret: "",
  baseUrl: ""
};

ipcMain.handle("settings:get", () => {
  return liveConfig;
});

ipcMain.handle("settings:set", (_, payload) => {
  liveConfig = payload;
  return { success: true };
});
