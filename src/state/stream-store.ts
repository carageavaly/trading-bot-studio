import { makeAutoObservable } from "mobx";

class StreamStore {
  ticks = [];
  orders = [];
  pnlHistory = [];
  lastEquity = 50000;

  constructor() {
    makeAutoObservable(this);

    window.stream.onTick((tick) => this.addTick(tick));
    window.stream.onOrder((order) => this.addOrder(order));
  }

  addTick(tick) {
    this.ticks.push(tick);
    if (this.ticks.length > 500) this.ticks.shift();
  }

  addOrder(order) {
    this.orders.push(order);
    if (this.orders.length > 200) this.orders.shift();

    const pnl = order.side === "BUY" ? -order.price : order.price;
    this.lastEquity += pnl;
    this.pnlHistory.push({ time: Date.now(), equity: this.lastEquity });
  }
}

export const streamStore = new StreamStore();
