export class TrendFollowingStrategy {
  constructor() {
    this.short = [];
    this.long = [];
    this.shortPeriod = 10;
    this.longPeriod = 30;
  }

  ema(values, period) {
    if (values.length < period) return null;
    const k = 2 / (period + 1);
    let ema = values[0];
    for (let i = 1; i < values.length; i++) {
      ema = values[i] * k + ema * (1 - k);
    }
    return ema;
  }

  onTick(tick) {
    this.short.push(tick.price);
    this.long.push(tick.price);

    const emaShort = this.ema(this.short, this.shortPeriod);
    const emaLong = this.ema(this.long, this.longPeriod);

    if (!emaShort || !emaLong) return "HOLD";

    if (emaShort > emaLong) return "BUY";
    if (emaShort < emaLong) return "SELL";

    return "HOLD";
  }
}
