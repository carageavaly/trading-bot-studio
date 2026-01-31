export class MeanReversionStrategy {
  constructor() {
    this.prices = [];
    this.window = 20;
  }

  onTick(tick) {
    this.prices.push(tick.price);
    if (this.prices.length < this.window) return "HOLD";

    const slice = this.prices.slice(-this.window);
    const avg = slice.reduce((a, b) => a + b, 0) / slice.length;

    if (tick.price < avg * 0.995) return "BUY";
    if (tick.price > avg * 1.005) return "SELL";

    return "HOLD";
  }
}
