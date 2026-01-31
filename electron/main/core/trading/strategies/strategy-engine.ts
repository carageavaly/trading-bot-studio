import { MeanReversionStrategy } from "../strategies/mean-reversion";
import { TrendFollowingStrategy } from "../strategies/trend-following";
import { ScalpingStrategy } from "../strategies/scalping";

export class StrategyEngine {
  constructor() {
    this.strategies = [
      new MeanReversionStrategy(),
      new TrendFollowingStrategy(),
      new ScalpingStrategy()
    ];
  }

  onTick(tick) {
    const signals = this.strategies.map(s => s.onTick(tick));

    const finalSignal = signals.find(s => s !== "HOLD") || "HOLD";

    return {
      symbol: tick.symbol,
      signal: finalSignal,
      price: tick.price
    };
  }
}
