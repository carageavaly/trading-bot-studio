import { ipcMain } from "electron";

let mainWindow = null;

export const setMainWindow = (win) => {
  mainWindow = win;
};

export const sendTick = (tick) => {
  if (mainWindow) {
    mainWindow.webContents.send("stream:tick", tick);
  }
};

export const sendOrder = (order) => {
  if (mainWindow) {
    mainWindow.webContents.send("stream:order", order);
  }
};
