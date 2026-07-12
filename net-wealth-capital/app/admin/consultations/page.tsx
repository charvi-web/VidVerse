"use client";

import { PageHeader } from "@/components/portal/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { StatCard } from "@/components/ui/stat-card";
import { consultations, clients } from "@/lib/mock";
import { formatDate } from "@/lib/utils";
import { CalendarDays, CheckCircle2, Clock, Plus } from "lucide-react";

function statusVariant(status: string) {
  switch (status) {
    case "Upcoming":
      return "warning" as const;
    case "Completed":
      return "success" as const;
    case "Cancelled":
      return "destructive" as const;
    default:
      return "outline" as const;
  }
}

function ConsultationTable({ status }: { status: "Upcoming" | "Completed" | "Cancelled" }) {
  const rows = consultations.filter((item) => item.status === status);
  if (rows.length === 0) {
    return <Card><CardContent className="p-8 text-center text-sm text-muted-foreground">No {status.toLowerCase()} consultations.</CardContent></Card>;
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead><TableHead>Service</TableHead><TableHead>Advisor</TableHead><TableHead>Date & Time</TableHead><TableHead>Mode</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((item, index) => {
              const client = clients[index % clients.length];
              return (
                <TableRow key={item.id}>
                  <TableCell><div className="font-medium">{client.name}</div><div className="text-xs text-muted-foreground">{item.id}</div></TableCell>
                  <TableCell>{item.service}</TableCell>
                  <TableCell><div className="flex items-center gap-2"><Avatar name={item.advisor} className="size-8" />{item.advisor}</div></TableCell>
                  <TableCell><div>{formatDate(item.date)}</div><div className="text-xs text-muted-foreground">{item.time}</div></TableCell>
                  <TableCell>{item.mode}</TableCell>
                  <TableCell><Badge variant={statusVariant(item.status)}>{item.status}</Badge></TableCell>
                  <TableCell className="space-x-2 text-right">
                    {status === "Upcoming" && <><Button variant="outline" size="sm">Reschedule</Button><Button size="sm">Join</Button></>}
                    {status === "Completed" && <Button variant="ghost" size="sm">View Notes</Button>}
                    {status === "Cancelled" && <Button variant="outline" size="sm">Reschedule</Button>}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default function AdminConsultationsPage() {
  const count = (status: string) => consultations.filter((item) => item.status === status).length;

  return (
    <div className="space-y-6">
      <PageHeader title="Consultations" description="Schedule and manage advisory meetings" actions={<Button><Plus className="size-4" />Schedule</Button>} />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Upcoming" value={count("Upcoming")} icon={CalendarDays} hint="Booked sessions" />
        <StatCard label="Completed" value={count("Completed")} icon={CheckCircle2} hint="This month" />
        <StatCard label="Cancelled" value={count("Cancelled")} icon={Clock} hint="Needs follow-up" />
      </div>
      <Tabs defaultValue="upcoming">
        <TabsList><TabsTrigger value="upcoming">Upcoming</TabsTrigger><TabsTrigger value="completed">Completed</TabsTrigger><TabsTrigger value="cancelled">Cancelled</TabsTrigger></TabsList>
        <TabsContent value="upcoming"><ConsultationTable status="Upcoming" /></TabsContent>
        <TabsContent value="completed"><ConsultationTable status="Completed" /></TabsContent>
        <TabsContent value="cancelled"><ConsultationTable status="Cancelled" /></TabsContent>
      </Tabs>
    </div>
  );
}
