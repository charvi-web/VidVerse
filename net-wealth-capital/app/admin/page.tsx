import { PageHeader } from "@/components/portal/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { StatCard } from "@/components/ui/stat-card";
import { leads, clients, consultations, adminActivity, revenueByMonth, leadsBySource } from "@/lib/mock";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { UserPlus, Users, CalendarDays, IndianRupee, TrendingUp, Download, Eye } from "lucide-react";

function statusVariant(status: string) {
  switch (status) {
    case "New":
      return "info" as const;
    case "Contacted":
      return "secondary" as const;
    case "Qualified":
      return "warning" as const;
    case "Converted":
      return "success" as const;
    case "Lost":
      return "destructive" as const;
    default:
      return "outline" as const;
  }
}

function toneClass(tone: string) {
  switch (tone) {
    case "success":
      return "bg-primary";
    case "warning":
      return "bg-muted-foreground";
    case "info":
      return "bg-muted-foreground";
    case "destructive":
      return "bg-destructive";
    default:
      return "bg-muted-foreground";
  }
}

const maxRevenue = Math.max(...revenueByMonth.map((item) => item.value));
const maxSource = Math.max(...leadsBySource.map((item) => item.value));
const latestRevenue = revenueByMonth[revenueByMonth.length - 1]?.value ?? 0;

export default function AdminDashboardPage() {
  const upcomingConsultations = consultations.filter((item) => item.status === "Upcoming").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Firm overview"
        actions={
          <>
            <Button variant="outline"><Download className="size-4" />Export</Button>
            <Button><UserPlus className="size-4" />Add Lead</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total Leads" value={leads.length} icon={UserPlus} trend={{ value: "+12%", direction: "up" }} hint="Across all sources" />
        <StatCard label="Total Clients" value={clients.length} icon={Users} trend={{ value: "+8%", direction: "up" }} hint="Managed relationships" />
        <StatCard label="Consultation Requests" value={upcomingConsultations} icon={CalendarDays} trend={{ value: "+4%", direction: "up" }} hint="Upcoming sessions" />
        <StatCard label="Revenue (MTD)" value={formatCurrency(latestRevenue * 100000)} icon={IndianRupee} trend={{ value: "+15%", direction: "up" }} hint="Latest month" />
        <StatCard label="Conversion Rate" value="32%" icon={TrendingUp} trend={{ value: "+3%", direction: "up" }} hint="Lead to client" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Summary</CardTitle>
              <CardDescription>Monthly revenue in ₹ lakh</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-72 items-end gap-3 rounded-lg border bg-muted/20 p-4">
                {revenueByMonth.map((item) => (
                  <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-48 w-full items-end">
                      <div
                        className="w-full rounded-t-lg bg-primary/85"
                        style={{ height: `${(item.value / maxRevenue) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-foreground">₹{item.value}L</span>
                    <span className="text-xs text-muted-foreground">{item.month}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Leads</CardTitle>
              <CardDescription>Newest enquiries requiring follow-up</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.slice(0, 5).map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>
                        <div className="font-medium">{lead.name}</div>
                        <div className="text-xs text-muted-foreground">{formatDate(lead.created)}</div>
                      </TableCell>
                      <TableCell>{lead.service}</TableCell>
                      <TableCell>{lead.source}</TableCell>
                      <TableCell><Badge variant={statusVariant(lead.status)}>{lead.status}</Badge></TableCell>
                      <TableCell className="text-right"><Button variant="ghost" size="sm"><Eye className="size-4" />View</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest admin updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {adminActivity.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <span className={cn("mt-1.5 size-2 rounded-full", toneClass(item.tone))} />
                  <div>
                    <p className="text-sm"><span className="font-medium">{item.actor}</span> {item.action} <span className="font-medium">{item.target}</span></p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Leads by Source</CardTitle>
              <CardDescription>Acquisition mix</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {leadsBySource.map((item) => (
                <div key={item.source} className="space-y-1.5">
                  <div className="flex justify-between text-sm"><span>{item.source}</span><span className="font-medium">{item.value}</span></div>
                  <div className="h-2 rounded-full bg-muted">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${(item.value / maxSource) * 100}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
