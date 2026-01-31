import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import SettingsPage from "../pages/SettingsPage";
import AuthPage from "../pages/AuthPage";
import { observer } from "mobx-react-lite";
import { authStore } from "../state/auth-store";

export const AppRouter = observer(() => {
  if (!authStore.user) return <AuthPage />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
});
