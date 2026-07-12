"use client";

import { PageHeader } from "@/components/portal/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { StatCard } from "@/components/ui/stat-card";
import { serviceRequests, clients } from "@/lib/mock";
import { formatDate } from "@/lib/utils";
import { ClipboardList, CheckCircle2, Clock } from "lucide-react";

function statusVariant(status: string) {
  switch (status) {
    case "New":
      return "info" as const;
    case "In Progress":
    case "On Hold":
      return "warning" as const;
    case "Completed":
      return "success" as const;
    default:
      return "outline" as const;
  }
}

function RequestsTable({ statuses }: { statuses: string[] }) {
  const rows = serviceRequests.filter((item) => statuses.includes(item.status));
  if (rows.length === 0) {
    return <Card><CardContent className="p-8 text-center text-sm text-muted-foreground">No service requests in this stage.</CardContent></Card>;
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Table>
          <TableHeader><TableRow><TableHead>Request ID</TableHead><TableHead>Service</TableHead><TableHead>Client</TableHead><TableHead>Advisor</TableHead><TableHead>Requested</TableHead><TableHead>Progress</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {rows.map((item, index) => {
              const client = clients[index % clients.length];
              return <TableRow key={item.id}><TableCell className="font-medium">{item.id}</TableCell><TableCell>{item.service}</TableCell><TableCell>{client.name}</TableCell><TableCell>{item.advisor}</TableCell><TableCell>{formatDate(item.requested)}</TableCell><TableCell><div className="flex min-w-32 items-center gap-2"><Progress value={item.progress} /><span className="text-xs text-muted-foreground">{item.progress}%</span></div></TableCell><TableCell><Badge variant={statusVariant(item.status)}>{item.status}</Badge></TableCell><TableCell className="text-right"><Button variant="ghost" size="sm">{item.status === "Completed" ? "View" : "Update"}</Button></TableCell></TableRow>;
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default function AdminServiceRequestsPage() {
  const count = (status: string) => serviceRequests.filter((item) => item.status === status).length;
  return (
    <div className="space-y-6">
      <PageHeader title="Service Requests" description="Track client service delivery and fulfilment" />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="New" value={count("New")} icon={ClipboardList} hint="Awaiting triage" />
        <StatCard label="In Progress" value={count("In Progress")} icon={Clock} hint="Advisor owned" />
        <StatCard label="Completed" value={count("Completed")} icon={CheckCircle2} hint="Closed requests" />
      </div>
      <Tabs defaultValue="new">
        <TabsList><TabsTrigger value="new">New Requests</TabsTrigger><TabsTrigger value="progress">In Progress</TabsTrigger><TabsTrigger value="completed">Completed</TabsTrigger></TabsList>
        <TabsContent value="new"><RequestsTable statuses={["New"]} /></TabsContent>
        <TabsContent value="progress"><RequestsTable statuses={["In Progress", "On Hold"]} /></TabsContent>
        <TabsContent value="completed"><RequestsTable statuses={["Completed"]} /></TabsContent>
      </Tabs>
    </div>
  );
}
