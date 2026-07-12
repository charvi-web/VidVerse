import { PageHeader } from "@/components/portal/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { consultations, serviceRequests, revenueByMonth, leadsBySource, leads } from "@/lib/mock";
import { formatCurrency } from "@/lib/utils";
import { Download, TrendingUp, CalendarDays, ClipboardList, UserPlus } from "lucide-react";

const maxRevenue = Math.max(...revenueByMonth.map((item) => item.value));
const maxSource = Math.max(...leadsBySource.map((item) => item.value));
const latestRevenue = revenueByMonth[revenueByMonth.length - 1]?.value ?? 0;

export default function AdminReportsPage() {
  const consultationCount = (status: string) => consultations.filter((item) => item.status === status).length;
  const completedRequests = serviceRequests.filter((item) => item.status === "Completed").length;
  const convertedLeads = leads.filter((lead) => lead.status === "Converted").length;

  return (
    <div className="space-y-6">
      <PageHeader title="Reports" description="Performance analytics across acquisition, revenue, and operations" actions={<><Select defaultValue="30"><option value="30">Last 30 days</option><option value="90">Last 90 days</option><option value="365">This year</option></Select><Button variant="outline"><Download className="size-4" />Export</Button></>} />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card><CardHeader><UserPlus className="size-5 text-primary" /><CardTitle>Lead Report</CardTitle><CardDescription>{convertedLeads} conversions from {leads.length} leads</CardDescription></CardHeader><CardContent><div className="h-2 rounded-full bg-muted"><div className="h-full w-1/3 rounded-full bg-primary" /></div><Button variant="link" className="mt-3 h-auto p-0">View full report</Button></CardContent></Card>
        <Card><CardHeader><TrendingUp className="size-5 text-primary" /><CardTitle>Revenue Report</CardTitle><CardDescription>{formatCurrency(latestRevenue * 100000)} latest month</CardDescription></CardHeader><CardContent><div className="flex h-10 items-end gap-1">{revenueByMonth.slice(-4).map((item) => <div key={item.month} className="flex-1 rounded-t bg-accent" style={{ height: `${(item.value / maxRevenue) * 100}%` }} />)}</div><Button variant="link" className="mt-3 h-auto p-0">View full report</Button></CardContent></Card>
        <Card><CardHeader><CalendarDays className="size-5 text-primary" /><CardTitle>Consultation Report</CardTitle><CardDescription>{consultations.length} total sessions</CardDescription></CardHeader><CardContent><Badge variant="warning">{consultationCount("Upcoming")} upcoming</Badge><Button variant="link" className="mt-3 block h-auto p-0">View full report</Button></CardContent></Card>
        <Card><CardHeader><ClipboardList className="size-5 text-primary" /><CardTitle>Service Report</CardTitle><CardDescription>{completedRequests} completed requests</CardDescription></CardHeader><CardContent><div className="h-2 rounded-full bg-muted"><div className="h-full w-3/4 rounded-full bg-primary" /></div><Button variant="link" className="mt-3 h-auto p-0">View full report</Button></CardContent></Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Revenue Report</CardTitle><CardDescription>Monthly revenue in ₹ lakh</CardDescription></CardHeader>
          <CardContent><div className="flex h-80 items-end gap-3 rounded-lg border bg-muted/20 p-4">{revenueByMonth.map((item) => <div key={item.month} className="flex flex-1 flex-col items-center gap-2"><div className="flex h-56 w-full items-end"><div className="w-full rounded-t-lg bg-primary" style={{ height: `${(item.value / maxRevenue) * 100}%` }} /></div><span className="text-xs font-medium">₹{item.value}L</span><span className="text-xs text-muted-foreground">{item.month}</span></div>)}</div></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Leads by Source</CardTitle><CardDescription>Source contribution</CardDescription></CardHeader>
          <CardContent className="space-y-4">{leadsBySource.map((item) => <div key={item.source} className="space-y-1.5"><div className="flex justify-between text-sm"><span>{item.source}</span><span className="font-medium">{item.value}</span></div><div className="h-2 rounded-full bg-muted"><div className="h-full rounded-full bg-accent" style={{ width: `${(item.value / maxSource) * 100}%` }} /></div></div>)}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Consultation Report</CardTitle><CardDescription>Status distribution for advisor meetings</CardDescription></CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3"><div className="rounded-lg border p-4"><p className="text-sm text-muted-foreground">Upcoming</p><p className="text-2xl font-semibold">{consultationCount("Upcoming")}</p></div><div className="rounded-lg border p-4"><p className="text-sm text-muted-foreground">Completed</p><p className="text-2xl font-semibold">{consultationCount("Completed")}</p></div><div className="rounded-lg border p-4"><p className="text-sm text-muted-foreground">Cancelled</p><p className="text-2xl font-semibold">{consultationCount("Cancelled")}</p></div></CardContent>
      </Card>
    </div>
  );
}
