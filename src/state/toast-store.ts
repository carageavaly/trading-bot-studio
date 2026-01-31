import { makeAutoObservable } from "mobx";

export interface Toast {
  id: string;
  message: string;
  type?: "info" | "success" | "error";
}

class ToastStore {
  toasts: Toast[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  show(message: string, type: Toast["type"] = "info") {
    const id = Math.random().toString(36).substring(2, 9);
    this.toasts.push({ id, message, type });

    setTimeout(() => {
      this.toasts = this.toasts.filter((t) => t.id !== id);
    }, 4000);
  }
}

export const toastStore = new ToastStore();
