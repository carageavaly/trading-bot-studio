import { ToastContainer } from "@/components/ui/ToastContainer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* layout-ul tău */}
      <div>{children}</div>

      {/* notificări globale */}
      <ToastContainer />
    </>
  );
}
