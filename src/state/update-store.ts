import { makeAutoObservable } from "mobx";
import { toastStore } from "./toast-store";


class UpdateStore {
  status: "idle" | "checking" | "available" | "none" | "downloading" | "ready" = "idle";
  progress: number = 0;

  constructor() {
    makeAutoObservable(this);

    window.updates.onAvailable(() => {
      this.status = "available";
      toastStore.show("New update available!", "info");
    });

    window.updates.onNone(() => {
      this.status = "none";
      toastStore.show("You are up to date.", "success");
    });

    window.updates.onProgress((p) => {
      this.status = "downloading";
      this.progress = p.percent ?? 0;
    });

    window.updates.onReady(() => {
      this.status = "ready";
      toastStore.show("Update downloaded. Restart to install.", "success");
    });
  }

  async check() {
    this.status = "checking";
    await window.updates.check();
  }
}

export const updateStore = new UpdateStore();
