import {
  IBrokerAdapter,
  BrokerAccountInfo,
  BrokerOrderRequest,
  BrokerOrderResponse,
} from "./broker-types";
import { getDemoAccount } from "../storage/user-store";

export class DemoBrokerAdapter implements IBrokerAdapter {
  async getAccountInfo(): Promise<BrokerAccountInfo> {
    const acc = getDemoAccount();
    return {
      balance: acc.balance,
      equity: acc.equity,
      currency: "USD",
    };
  }

  async placeOrder(req: BrokerOrderRequest): Promise<BrokerOrderResponse> {
    const acc = getDemoAccount();
    const price = req.price ?? 1.0;
    const cost = price * req.volume;

    if (req.side === "BUY") {
      acc.balance -= cost;
    } else {
      acc.balance += cost;
    }

    return {
      id: Date.now().toString(),
      symbol: req.symbol,
      side: req.side,
      volume: req.volume,
      price,
      timestamp: Date.now(),
    };
  }
}
