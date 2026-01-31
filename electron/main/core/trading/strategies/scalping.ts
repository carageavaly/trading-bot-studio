export class ScalpingStrategy {
  constructor() {
    this.lastPrice = null;
  }

  onTick(tick) {
    if (!this.lastPrice) {
      this.lastPrice = tick.price;
      return "HOLD";
    }

    const diff = tick.price - this.lastPrice;
    this.lastPrice = tick.price;

    if (diff > 0.0003) return "BUY";
    if (diff < -0.0003) return "SELL";

    return "HOLD";
  }
}
