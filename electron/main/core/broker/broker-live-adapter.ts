import {
  IBrokerAdapter,
  BrokerAccountInfo,
  BrokerOrderRequest,
  BrokerOrderResponse,
} from "./broker-types";

export class LiveBrokerAdapter implements IBrokerAdapter {
  private apiKey: string;
  private apiSecret: string;
  private baseUrl: string;

  constructor(opts: { apiKey: string; apiSecret: string; baseUrl: string }) {
    this.apiKey = opts.apiKey;
    this.apiSecret = opts.apiSecret;
    this.baseUrl = opts.baseUrl;
  }

  async getAccountInfo(): Promise<BrokerAccountInfo> {
    // TODO: Integrare cu API-ul brokerului ales.
    // Aici trebuie folosită documentația oficială a brokerului,
    // cu semnături, autentificare și endpoint-uri corecte.
    throw new Error("LIVE broker not implemented. Configure manually and testați cu mare grijă.");
  }

  async placeOrder(_req: BrokerOrderRequest): Promise<BrokerOrderResponse> {
    // TODO: Implementare execuție ordine LIVE.
    // NU folosiți fără să înțelegeți complet riscurile și API-ul brokerului.
    throw new Error("LIVE order execution not implemented.");
  }
}
