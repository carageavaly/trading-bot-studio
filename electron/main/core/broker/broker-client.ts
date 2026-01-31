import { DemoBrokerAdapter } from "./broker-demo-adapter";
import { LiveBrokerAdapter } from "./broker-live-adapter";
import { IBrokerAdapter } from "./broker-types";

export class BrokerClient {
  private adapter: IBrokerAdapter;

  constructor(mode: "DEMO" | "LIVE", liveConfig?: { apiKey: string; apiSecret: string; baseUrl: string }) {
    if (mode === "DEMO") {
      this.adapter = new DemoBrokerAdapter();
    } else {
      if (!liveConfig) {
        throw new Error("LIVE mode requires configuration.");
      }
      this.adapter = new LiveBrokerAdapter(liveConfig);
    }
  }

  getAccountInfo() {
    return this.adapter.getAccountInfo();
  }

  placeOrder(req) {
    return this.adapter.placeOrder(req);
  }
}
