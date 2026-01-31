import { makeAutoObservable } from "mobx";
import { tradingApi } from "../services/api/ipc-trading-client";

class TradingStore {
  account = null;
  pairs = [];

  constructor() {
    makeAutoObservable(this);
  }

  async load() {
    const data = await tradingApi.getStatus();
    this.account = data.account;
    this.pairs = data.pairs;
  }

  togglePair(symbol) {
    this.pairs = this.pairs.map(p =>
      p.symbol === symbol ? { ...p, enabled: !p.enabled } : p
    );
  }
}

export const tradingStore = new TradingStore();
