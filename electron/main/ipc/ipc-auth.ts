import { ipcMain } from "electron";

ipcMain.handle("auth:login", async (_, payload) => {
  if (!payload.email || !payload.password) {
    return { success: false, error: "Missing credentials" };
  }

  return {
    success: true,
    user: { email: payload.email }
  };
});

ipcMain.handle("auth:register", async (_, payload) => {
  if (!payload.email || !payload.password) {
    return { success: false, error: "Missing fields" };
  }

  return {
    success: true,
    user: { email: payload.email }
  };
});
