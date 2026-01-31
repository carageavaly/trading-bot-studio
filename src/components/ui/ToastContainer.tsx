import { observer } from "mobx-react-lite";
import { toastStore } from "@/state/toast-store";

export const ToastContainer = observer(() => {
  return (
    <div style={{
      position: "fixed",
      bottom: 20,
      right: 20,
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }}>
      {toastStore.toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            padding: "10px 16px",
            borderRadius: 6,
            background: toast.type === "success" ? "#4caf50"
              : toast.type === "error" ? "#f44336"
              : "#333",
            color: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            fontSize: "14px"
          }}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
});
