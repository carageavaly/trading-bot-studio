import React from "react";
import AppShell from "../components/layout/AppShell";
import ModeSelector from "../components/settings/ModeSelector";
import ApiKeyForm from "../components/settings/ApiKeyForm";
import { UpdatePanel } from "@/components/settings/UpdatePanel";

export default function SettingsPage() {
  return (
    <AppShell>
      <h1>Settings</h1>

      <ModeSelector />
      <ApiKeyForm />
      <UpdatePanel />
    </AppShell>
  );
}
