import React from "react";
import { observer } from "mobx-react-lite";
import { botStore } from "../../state/bot-store";
import { settingsStore } from "../../state/settings-store";

export default observer(function BotControl() {
  const toggle = async () => {
    if (botStore.running) {
      await botStore.stop();
    } else {
      if (settingsStore.mode === "LIVE") {
        if (!settingsStore.apiKey || !settingsStore.apiSecret || !settingsStore.baseUrl) {
          alert("LIVE mode requires API Key, Secret and Base URL");
          return;
        }
      }
      await botStore.start();
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <button
        onClick={toggle}
        style={{
          padding: "10px 20px",
          background: botStore.running ? "#d9534f" : "#5cb85c",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        {botStore.running ? "Stop BOT" : "Start BOT"}
      </button>

      <p style={{ marginTop: 10 }}>
        Status: <strong>{botStore.running ? "Running" : "Stopped"}</strong>
      </p>
    </div>
  );
});
