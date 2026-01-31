import { observer } from "mobx-react-lite";
import { updateStore } from "@/state/update-store";

export const UpdatePanel = observer(() => {
  const s = updateStore;

  return (
    <div style={{ padding: 20 }}>
      <h2>Software Update</h2>

      <button
        onClick={() => s.check()}
        disabled={s.status === "checking" || s.status === "downloading"}
      >
        {s.status === "checking" ? "Checking..." : "Check for updates"}
      </button>

      <div style={{ marginTop: 15 }}>
        {s.status === "available" && <p>New update available!</p>}
        {s.status === "none" && <p>You are up to date.</p>}
        {s.status === "downloading" && (
          <p>Downloading update: {s.progress.toFixed(0)}%</p>
        )}
        {s.status === "ready" && (
          <p>Update ready! Restart the app to install.</p>
        )}
      </div>
    </div>
  );
});
