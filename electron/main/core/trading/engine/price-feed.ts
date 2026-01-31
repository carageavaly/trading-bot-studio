import { EventEmitter } from "events";

export class PriceFeed extends EventEmitter {
  constructor(pairs) {
    super();
    this.pairs = pairs;
    this.start();
  }

  start() {
    setInterval(() => {
      this.pairs.forEach(pair => {
        const price = this.generatePrice();
        this.emit("tick", { symbol: pair.symbol, price });
      });
    }, 1000);
  }

  generatePrice() {
    const base = 1.0 + Math.random() * 0.5;
    const noise = (Math.random() - 0.5) * 0.01;
    return parseFloat((base + noise).toFixed(5));
  }
}
