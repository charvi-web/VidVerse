import { PortalShell } from "@/components/portal/portal-shell";
import { currentClient } from "@/lib/mock";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalShell
      variant="client"
      role="Client"
      user={{ name: currentClient.name, email: currentClient.email }}
    >
      {children}
    </PortalShell>
  );
}
