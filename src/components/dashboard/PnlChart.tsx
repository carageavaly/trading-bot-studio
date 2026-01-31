import React from "react";
import { observer } from "mobx-react-lite";
import { streamStore } from "../../state/stream-store";

export default observer(function PnlChart() {
  const data = streamStore.pnlHistory.slice(-100);

  return (
    <div style={{ padding: 20, background: "#fff", marginBottom: 20 }}>
      <h3>Equity Curve</h3>
      <div style={{ height: 200, background: "#eef" }}>
        {data.map((p, i) => (
          <div
            key={i}
            style={{
              height: 2,
              width: 2,
              background: "blue",
              position: "absolute",
              left: i * 3,
              bottom: (p.equity - 49000) * 0.1,
            }}
          />
        ))}
      </div>
    </div>
  );
});
