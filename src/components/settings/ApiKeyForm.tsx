import React from "react";
import { settingsStore } from "../../state/settings-store";
import { observer } from "mobx-react-lite";

export default observer(function ApiKeyForm() {
  if (settingsStore.mode !== "LIVE") return null;

  return (
    <div style={{ marginTop: 20 }}>
      <h3>LIVE Broker API</h3>

      <input
        placeholder="API Key"
        value={settingsStore.apiKey}
        onChange={(e) => settingsStore.setApiKey(e.target.value)}
      />

      <input
        placeholder="API Secret"
        type="password"
        value={settingsStore.apiSecret}
        onChange={(e) => settingsStore.setApiSecret(e.target.value)}
      />

      <input
        placeholder="Base URL"
        value={settingsStore.baseUrl}
        onChange={(e) => settingsStore.setBaseUrl(e.target.value)}
      />
    </div>
  );
});
