import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const nav = useNavigate();

  return (
    <div style={{
      width: 220,
      background: "#1e1e1e",
      color: "white",
      padding: 20
    }}>
      <h2>Trading Bot</h2>

      <p onClick={() => nav("/")}>Dashboard</p>
      <p onClick={() => nav("/settings")}>Settings</p>
    </div>
  );
}
