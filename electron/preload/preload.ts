import { contextBridge, ipcRenderer } from "electron";

// STREAM: ticks + orders
contextBridge.exposeInMainWorld("stream", {
  onTick: (cb: (tick: any) => void) => {
    ipcRenderer.removeAllListeners("stream:tick");
    ipcRenderer.on("stream:tick", (_, data) => cb(data));
  },

  onOrder: (cb: (order: any) => void) => {
    ipcRenderer.removeAllListeners("stream:order");
    ipcRenderer.on("stream:order", (_, data) => cb(data));
  },
});

// BOT CONTROL: start / stop / status
contextBridge.exposeInMainWorld("bot", {
  start: () => ipcRenderer.invoke("bot:start"),
  stop: () => ipcRenderer.invoke("bot:stop"),
  status: () => ipcRenderer.invoke("bot:status"),
});

// MODE SWITCH: DEMO / LIVE
contextBridge.exposeInMainWorld("mode", {
  set: (mode: "DEMO" | "LIVE") => ipcRenderer.invoke("mode:set", mode),
});
contextBridge.exposeInMainWorld("updates", {
  check: () => ipcRenderer.invoke("update:check"),
  onAvailable: (cb) => ipcRenderer.on("update:available", cb),
  onNone: (cb) => ipcRenderer.on("update:none", cb),
  onProgress: (cb) => ipcRenderer.on("update:progress", (_, data) => cb(data)),
  onReady: (cb) => ipcRenderer.on("update:ready", cb),
});
