import React from "react";
import { observer } from "mobx-react-lite";
import { streamStore } from "../../state/stream-store";

export default observer(function PriceChart() {
  const data = streamStore.ticks.slice(-100);

  return (
    <div style={{ padding: 20, background: "#fff", marginBottom: 20 }}>
      <h3>Price Chart</h3>
      <div style={{ height: 200, background: "#eee" }}>
        {data.map((t, i) => (
          <div
            key={i}
            style={{
              height: 2,
              width: 2,
              background: "black",
              position: "absolute",
              left: i * 3,
              bottom: t.price * 100,
            }}
          />
        ))}
      </div>
    </div>
  );
});
