export class StrategyEngine {
  constructor() {
    this.lastPrices = {};
  }

  onTick(tick) {
    this.lastPrices[tick.symbol] = tick.price;

    // Semnal simplu: dacă prețul crește, BUY; dacă scade, SELL
    const direction = Math.random() > 0.5 ? "BUY" : "SELL";

    return {
      symbol: tick.symbol,
      signal: direction,
      price: tick.price
    };
  }
}
