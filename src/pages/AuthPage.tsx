import React, { useState } from "react";
import { authApi } from "../services/api/ipc-auth-client";
import { authStore } from "../state/auth-store";

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const fn = mode === "login" ? authApi.login : authApi.register;
    const res = await fn({ email, password });

    if (res.success) {
      authStore.setUser(res.user);
    } else {
      alert(res.error);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>{mode === "login" ? "Login" : "Register"}</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={submit}>
        {mode === "login" ? "Login" : "Register"}
      </button>

      <p onClick={() => setMode(mode === "login" ? "register" : "login")}>
        {mode === "login" ? "Create account" : "Already have an account"}
      </p>
    </div>
  );
}
