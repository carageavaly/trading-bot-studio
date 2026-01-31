import { TradingOrchestrator } from "./trading-orchestrator";
import { settingsStore } from "../../settings/settings-store";

export const orchestrator = new TradingOrchestrator(settingsStore.mode);
