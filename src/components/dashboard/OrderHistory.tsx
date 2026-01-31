import React from "react";
import { observer } from "mobx-react-lite";
import { streamStore } from "../../state/stream-store";

export default observer(function OrderHistory() {
  return (
    <div style={{ padding: 20, background: "#fff" }}>
      <h3>Order History</h3>

      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Side</th>
            <th>Price</th>
            <th>Volume</th>
            <th>Time</th>
          </tr>
        </thead>

        <tbody>
          {streamStore.orders.map((o, i) => (
            <tr key={i}>
              <td>{o.symbol}</td>
              <td>{o.side}</td>
              <td>{o.price}</td>
              <td>{o.volume}</td>
              <td>{new Date(o.timestamp).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
