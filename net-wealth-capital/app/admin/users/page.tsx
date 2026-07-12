import { PageHeader } from "@/components/portal/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { platformUsers } from "@/lib/mock";
import { ShieldCheck, UserPlus, Users } from "lucide-react";

function statusVariant(status: string) {
  switch (status) {
    case "Active":
      return "success" as const;
    case "Invited":
      return "warning" as const;
    case "Suspended":
      return "destructive" as const;
    default:
      return "outline" as const;
  }
}

function roleVariant(role: string) {
  if (role === "Administrator") return "default" as const;
  if (role === "Senior Advisor") return "secondary" as const;
  return "outline" as const;
}

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Users" description="Advisors & Administrators" actions={<Button><UserPlus className="size-4" />Invite User</Button>} />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardHeader>
            <CardTitle>Team Users</CardTitle>
            <CardDescription>Access, roles, and advisor client loads</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader><TableRow><TableHead>User</TableHead><TableHead>Role</TableHead><TableHead>Clients</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {platformUsers.map((user) => <TableRow key={user.id}><TableCell><div className="flex items-center gap-3"><Avatar name={user.name} /><div><div className="font-medium">{user.name}</div><div className="text-xs text-muted-foreground">{user.email}</div></div></div></TableCell><TableCell><Badge variant={roleVariant(user.role)}>{user.role}</Badge></TableCell><TableCell>{user.clients}</TableCell><TableCell><Badge variant={statusVariant(user.status)}>{user.status}</Badge></TableCell><TableCell className="space-x-2 text-right"><Button variant="ghost" size="sm">Edit</Button><Button variant="outline" size="sm">Suspend</Button></TableCell></TableRow>)}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader><ShieldCheck className="size-5 text-primary" /><CardTitle>Roles & permissions</CardTitle><CardDescription>Access model for the admin portal</CardDescription></CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground"><p><span className="font-medium text-foreground">ADMIN</span> is the single privileged group with full access to users, clients, billing, reports, and firm settings.</p><p>Advisors and support staff are managed as platform users and are assigned clients, leads, consultations, and requests by an administrator.</p></CardContent>
          </Card>
          <Card>
            <CardHeader><Users className="size-5 text-primary" /><CardTitle>User summary</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-3"><div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">Active</p><p className="text-xl font-semibold">{platformUsers.filter((user) => user.status === "Active").length}</p></div><div className="rounded-lg border p-3"><p className="text-xs text-muted-foreground">Invited</p><p className="text-xl font-semibold">{platformUsers.filter((user) => user.status === "Invited").length}</p></div></CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
