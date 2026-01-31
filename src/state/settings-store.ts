import { makeAutoObservable } from "mobx";

class SettingsStore {
  mode: "DEMO" | "LIVE" = "DEMO";
  apiKey = "";
  apiSecret = "";
  baseUrl = "";

  constructor() {
    makeAutoObservable(this);
    this.load();
  }

  load() {
    const saved = localStorage.getItem("settings");
    if (saved) {
      const data = JSON.parse(saved);
      this.mode = data.mode ?? "DEMO";
      this.apiKey = data.apiKey ?? "";
      this.apiSecret = data.apiSecret ?? "";
      this.baseUrl = data.baseUrl ?? "";
    }
  }

  save() {
    localStorage.setItem(
      "settings",
      JSON.stringify({
        mode: this.mode,
        apiKey: this.apiKey,
        apiSecret: this.apiSecret,
        baseUrl: this.baseUrl,
      })
    );
  }

  setMode(mode: "DEMO" | "LIVE") {
    this.mode = mode;
    this.save();
    window.mode.set(mode);
  }

  setApiKey(v: string) {
    this.apiKey = v;
    this.save();
    // aici poți trimite și către main printr-un IPC separat (ex: settings:set)
  }

  setApiSecret(v: string) {
    this.apiSecret = v;
    this.save();
  }

  setBaseUrl(v: string) {
    this.baseUrl = v;
    this.save();
  }
}

export const settingsStore = new SettingsStore();
