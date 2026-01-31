import React from "react";
import { authStore } from "../../state/auth-store";

export default function Topbar() {
  return (
    <div style={{
      height: 60,
      background: "#f5f5f5",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px"
    }}>
      <h3>Dashboard</h3>
      <button onClick={() => authStore.logout()}>Logout</button>
    </div>
  );
}
