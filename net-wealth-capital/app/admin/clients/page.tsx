import { PageHeader } from "@/components/portal/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { StatCard } from "@/components/ui/stat-card";
import { clients } from "@/lib/mock";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Users, UserPlus, Download, Search, Wallet, CheckCircle2, ClipboardList, FileText, CreditCard, Activity } from "lucide-react";

function statusVariant(status: string) {
  switch (status) {
    case "Active":
      return "success" as const;
    case "Onboarding":
      return "warning" as const;
    case "Dormant":
      return "secondary" as const;
    default:
      return "outline" as const;
  }
}

export default function AdminClientsPage() {
  const firstClient = clients[0];
  const active = clients.filter((client) => client.status === "Active").length;
  const onboarding = clients.filter((client) => client.status === "Onboarding").length;
  const totalAum = clients.reduce((sum, client) => sum + client.aum, 0);
  const advisors = Array.from(new Set(clients.map((client) => client.advisor)));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Clients"
        description="Client book, AUM, services, and profile access"
        actions={
          <>
            <Button><UserPlus className="size-4" />Add Client</Button>
            <Button variant="outline"><Download className="size-4" />Export</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Clients" value={clients.length} icon={Users} hint="All relationships" />
        <StatCard label="Active" value={active} icon={CheckCircle2} trend={{ value: "+5%", direction: "up" }} hint="In good standing" />
        <StatCard label="Total AUM" value={formatCurrency(totalAum)} icon={Wallet} hint="Assets under advice" />
        <StatCard label="Onboarding" value={onboarding} icon={ClipboardList} hint="KYC and setup" />
      </div>

      <Card>
        <CardContent className="grid gap-3 p-4 md:grid-cols-[1fr_200px_180px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search clients..." />
          </div>
          <Select defaultValue="all"><option value="all">All advisors</option>{advisors.map((advisor) => <option key={advisor}>{advisor}</option>)}</Select>
          <Select defaultValue="all"><option value="all">All statuses</option><option>Active</option><option>Onboarding</option><option>Dormant</option></Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Client Directory</CardTitle>
          <CardDescription>Current client relationships and advisory coverage</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Services</TableHead>
                <TableHead>AUM</TableHead>
                <TableHead>Advisor</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell><div className="flex items-center gap-3"><Avatar name={client.name} /><div><div className="font-medium">{client.name}</div><div className="text-xs text-muted-foreground">{client.id}</div></div></div></TableCell>
                  <TableCell>{client.city}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell><Badge variant="outline">{client.services}</Badge></TableCell>
                  <TableCell>{formatCurrency(client.aum)}</TableCell>
                  <TableCell>{client.advisor}</TableCell>
                  <TableCell>{formatDate(client.joined)}</TableCell>
                  <TableCell><Badge variant={statusVariant(client.status)}>{client.status}</Badge></TableCell>
                  <TableCell className="text-right"><Button variant="ghost" size="sm">View</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Client profile preview</CardTitle>
          <CardDescription>{firstClient.name} · {firstClient.id}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-4">
          <div className="rounded-lg border p-4"><ClipboardList className="mb-3 size-5 text-primary" /><p className="text-sm text-muted-foreground">Services</p><p className="text-2xl font-semibold">{firstClient.services}</p></div>
          <div className="rounded-lg border p-4"><FileText className="mb-3 size-5 text-primary" /><p className="text-sm text-muted-foreground">Documents</p><Button variant="link" className="h-auto p-0">Open library</Button></div>
          <div className="rounded-lg border p-4"><CreditCard className="mb-3 size-5 text-primary" /><p className="text-sm text-muted-foreground">Payments</p><Button variant="link" className="h-auto p-0">View invoices</Button></div>
          <div className="rounded-lg border p-4"><Activity className="mb-3 size-5 text-primary" /><p className="text-sm text-muted-foreground">Activity</p><p className="font-medium">Review due this week</p></div>
        </CardContent>
      </Card>
    </div>
  );
}
