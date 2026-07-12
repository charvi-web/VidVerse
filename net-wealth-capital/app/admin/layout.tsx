import { PortalShell } from "@/components/portal/portal-shell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalShell
      variant="admin"
      role="Administrator"
      accent="gold"
      user={{ name: "Naveen Wadhwa", email: "naveen@nwealthcapital.com" }}
    >
      {children}
    </PortalShell>
  );
}
