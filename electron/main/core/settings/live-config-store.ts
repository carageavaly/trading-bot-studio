type LiveConfig = {
  apiKey: string;
  apiSecret: string;
  baseUrl: string;
};

let liveConfig: LiveConfig = {
  apiKey: "",
  apiSecret: "",
  baseUrl: "",
};

export const setLiveConfig = (cfg: LiveConfig) => {
  liveConfig = { ...cfg };
};

export const getLiveConfig = (): LiveConfig => {
  return liveConfig;
};
