export type TradingMode = "DEMO" | "LIVE";

export interface BrokerOrderRequest {
  symbol: string;
  side: "BUY" | "SELL";
  volume: number;
  price?: number;
}

export interface BrokerOrderResponse {
  id: string;
  symbol: string;
  side: "BUY" | "SELL";
  volume: number;
  price: number;
  timestamp: number;
}

export interface BrokerAccountInfo {
  balance: number;
  equity: number;
  currency: string;
}

export interface IBrokerAdapter {
  getAccountInfo(): Promise<BrokerAccountInfo>;
  placeOrder(req: BrokerOrderRequest): Promise<BrokerOrderResponse>;
}
