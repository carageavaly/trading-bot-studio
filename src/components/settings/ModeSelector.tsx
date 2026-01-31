import React from "react";
import { settingsStore } from "../../state/settings-store";
import { observer } from "mobx-react-lite";

export default observer(function ModeSelector() {
  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Trading Mode</h3>

      <select
        value={settingsStore.mode}
        onChange={(e) => settingsStore.setMode(e.target.value)}
      >
        <option value="DEMO">DEMO</option>
        <option value="LIVE">LIVE</option>
      </select>
    </div>
  );
});
