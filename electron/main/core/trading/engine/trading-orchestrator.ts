import { PriceFeed } from "./price-feed";
import { StrategyEngine } from "./strategy-engine";
import { RiskManager } from "./risk-manager";
import { BrokerClient } from "../../broker/broker-client";
import { DEFAULT_PAIRS } from "../config/pairs-config";
import type { TradingMode } from "../../broker/broker-types";
import { sendTick, sendOrder } from "../../../ipc/ipc-trading-stream";

type Tick = { symbol: string; price: number };

export class TradingOrchestrator {
  private mode: TradingMode;
  private feed: PriceFeed;
  private strategy: StrategyEngine;
  private risk: RiskManager;
  private broker: BrokerClient;
  public isRunning: boolean;

  constructor(mode: TradingMode = "DEMO", liveConfig?: { apiKey: string; apiSecret: string; baseUrl: string }) {
    this.mode = mode;
    this.isRunning = true;

    this.feed = new PriceFeed(DEFAULT_PAIRS);
    this.strategy = new StrategyEngine();
    this.risk = new RiskManager();
    this.broker =
      mode === "DEMO"
        ? new BrokerClient("DEMO")
        : new BrokerClient("LIVE", liveConfig);

    this.feed.on("tick", (tick: Tick) => {
      sendTick(tick);
      this.onTick(tick);
    });
  }

  start() {
    this.isRunning = true;
  }

  stop() {
    this.isRunning = false;
  }

  // dacă ai nevoie de cleanup suplimentar, îl poți apela din manager
  cleanup() {
    // ex: this.feed.stop() dacă implementezi stop în PriceFeed
  }

  private async onTick(tick: Tick) {
    if (!this.isRunning) return;

    const decision = this.strategy.onTick(tick);
    if (decision.signal === "HOLD") return;

    const account = await this.broker.getAccountInfo();
    if (!this.risk.canExecute(account, decision)) return;

    const order = await this.broker.placeOrder({
      symbol: tick.symbol,
      side: decision.signal,
      volume: 0.1,
      price: decision.price,
    });

    sendOrder(order);
    console.log(`[${this.mode}] ORDER EXECUTED:`, order);
  }
}
