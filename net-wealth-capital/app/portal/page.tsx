import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Briefcase,
  CalendarDays,
  CreditCard,
  FileText,
  Video,
} from "lucide-react";

import { PageHeader } from "@/components/portal/page-header";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatCard } from "@/components/ui/stat-card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  consultations,
  currentClient,
  documents,
  invoices,
  notifications,
  quickActions,
  serviceRequests,
} from "@/lib/mock";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

function statusVariant(status: string) {
  if (["Completed", "Paid", "Success", "Resolved", "Active"].includes(status)) return "success";
  if (["Cancelled", "Overdue", "Failed"].includes(status)) return "destructive";
  if (["Upcoming", "New"].includes(status)) return "info";
  return "warning";
}

const notificationDot = {
  success: "bg-primary",
  warning: "bg-muted-foreground",
  info: "bg-muted-foreground",
  destructive: "bg-destructive",
  secondary: "bg-muted-foreground",
  default: "bg-primary",
};

export default function PortalDashboardPage() {
  const firstName = currentClient.name.split(" ")[0];
  const upcomingConsultations = consultations.filter((item) => item.status === "Upcoming");
  const activeRequests = serviceRequests.filter((item) => ["In Progress", "New"].includes(item.status));
  const amountDue = invoices
    .filter((invoice) => invoice.status === "Due")
    .reduce((total, invoice) => total + invoice.amount, 0);
  const nextConsultation = upcomingConsultations[0];
  const recentInvoices = [...invoices].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${firstName}`}
        description="Your portfolio snapshot, advisory tasks, and latest updates in one secure place."
        actions={
          <Button asChild>
            <Link href="/book">Book Consultation</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Upcoming Consultations"
          value={upcomingConsultations.length}
          icon={CalendarDays}
          trend={{ value: "+1 this month", direction: "up" }}
          hint="Next review is scheduled soon"
        />
        <StatCard
          label="Active Service Requests"
          value={activeRequests.length}
          icon={Briefcase}
          trend={{ value: "+2 active", direction: "up" }}
          hint="Across advisory and compliance"
        />
        <StatCard
          label="Amount Due"
          value={formatCurrency(amountDue)}
          icon={CreditCard}
          hint="Pay before the due date"
        />
        <StatCard
          label="Documents"
          value={documents.length}
          icon={FileText}
          hint="Latest reports and uploads"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Consultation</CardTitle>
              <CardDescription>Your next scheduled conversation with the advisory team.</CardDescription>
            </CardHeader>
            <CardContent>
              {nextConsultation ? (
                <div className="rounded-lg border border-border p-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-4">
                      <div>
                        <Badge variant={statusVariant(nextConsultation.status)}>{nextConsultation.status}</Badge>
                        <h3 className="mt-3 text-lg font-semibold text-foreground">{nextConsultation.service}</h3>
                      </div>
                      <div className="flex items-center gap-3">
                        <Avatar name={nextConsultation.advisor} />
                        <div>
                          <p className="text-sm font-medium text-foreground">{nextConsultation.advisor}</p>
                          <p className="text-xs text-muted-foreground">Assigned advisor</p>
                        </div>
                      </div>
                      <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
                        <span>{formatDate(nextConsultation.date)}</span>
                        <span>{nextConsultation.time}</span>
                        <span className="inline-flex items-center gap-2">
                          <Video className="size-4" /> {nextConsultation.mode}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 sm:flex-col">
                      <Button size="sm">Join</Button>
                      <Button size="sm" variant="outline">Reschedule</Button>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No upcoming consultations scheduled.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Service Requests</CardTitle>
              <CardDescription>Track work currently in progress with your advisory team.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeRequests.map((request) => (
                <div key={request.id} className="rounded-lg border border-border p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-foreground">{request.service}</p>
                      <p className="text-sm text-muted-foreground">Advisor: {request.advisor}</p>
                    </div>
                    <Badge variant={statusVariant(request.status)}>{request.status}</Badge>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <Progress value={request.progress} />
                    <span className="text-sm font-medium text-foreground">{request.progress}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Bell className="size-4" /> Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", notificationDot[item.tone])} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.body}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Button key={action.href} asChild variant="outline" className="h-auto flex-col py-4 text-center">
                    <Link href={action.href}>
                      <Icon className="size-5" />
                      <span>{action.label}</span>
                    </Link>
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
          <CardDescription>Your latest invoices and payment status.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.description}</TableCell>
                  <TableCell>{formatDate(invoice.date)}</TableCell>
                  <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                  <TableCell><Badge variant={statusVariant(invoice.status)}>{invoice.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button asChild variant="link" className="mt-3 px-0">
            <Link href="/portal/payments">View all payments <ArrowRight className="size-4" /></Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
