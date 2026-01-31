import { makeAutoObservable } from "mobx";

class BotStore {
  running = false;

  constructor() {
    makeAutoObservable(this);
    this.loadStatus();
  }

  async loadStatus() {
    const res = await window.bot.status();
    this.running = res.running;
  }

  async start() {
    const res = await window.bot.start();
    this.running = res.running;
  }

  async stop() {
    const res = await window.bot.stop();
    this.running = res.running;
  }
}

export const botStore = new BotStore();
