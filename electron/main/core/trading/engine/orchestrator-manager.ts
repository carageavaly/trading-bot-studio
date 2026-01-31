import { TradingOrchestrator } from "./trading-orchestrator";
import type { TradingMode } from "../../broker/broker-types";
import { getLiveConfig } from "../../settings/live-config-store";

class OrchestratorManager {
  private instance: TradingOrchestrator | null = null;
  private mode: TradingMode = "DEMO";

  create(mode: TradingMode) {
    if (mode !== "DEMO" && mode !== "LIVE") {
      throw new Error(`Invalid trading mode: ${mode}`);
    }

    // Oprește instanța anterioară
    if (this.instance) {
      this.instance.stop();
      this.instance.cleanup?.(); // dacă ai cleanup în orchestrator
      this.instance = null;
    }

    this.mode = mode;

    // Config LIVE
    let liveConfig = null;
    if (mode === "LIVE") {
      liveConfig = getLiveConfig();
      if (!liveConfig.apiKey || !liveConfig.apiSecret || !liveConfig.baseUrl) {
        throw new Error("LIVE mode requires valid API credentials.");
      }
    }

    // Creează orchestratorul
    this.instance = new TradingOrchestrator(mode, liveConfig);

    return this.instance;
  }

  get() {
    return this.instance;
  }

  start() {
    this.instance?.start();
  }

  stop() {
    this.instance?.stop();
  }

  isRunning() {
    return this.instance?.isRunning ?? false;
  }

  getMode() {
    return this.mode;
  }
}

export const orchestratorManager = new OrchestratorManager();
