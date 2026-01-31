export {};

declare global {
  interface Window {
    stream: {
      onTick: (cb: (tick: { symbol: string; price: number }) => void) => void;
      onOrder: (
        cb: (order: {
          id: string;
          symbol: string;
          side: "BUY" | "SELL";
          volume: number;
          price: number;
          timestamp: number;
        }) => void
      ) => void;
    };

    bot: {
      start: () => Promise<{ running: boolean }>;
      stop: () => Promise<{ running: boolean }>;
      status: () => Promise<{ running: boolean; mode?: "DEMO" | "LIVE" }>;
    };

    mode: {
      set: (mode: "DEMO" | "LIVE") => Promise<{ success: boolean; mode: string }>;
    };
  }
}
interface Window {
  updates: {
    check: () => Promise<{ ok: boolean }>;
    onAvailable: (cb: () => void) => void;
    onNone: (cb: () => void) => void;
    onProgress: (cb: (p: any) => void) => void;
    onReady: (cb: () => void) => void;
  };
}
