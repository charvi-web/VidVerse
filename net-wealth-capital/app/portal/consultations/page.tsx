"use client";

import Link from "next/link";
import { CalendarDays, Clock, MapPin, Phone, Video } from "lucide-react";

import { PageHeader } from "@/components/portal/page-header";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { consultations } from "@/lib/mock";
import { formatDate } from "@/lib/utils";

function statusVariant(status: string) {
  if (["Completed", "Paid", "Success", "Resolved", "Active"].includes(status)) return "success";
  if (["Cancelled", "Overdue", "Failed"].includes(status)) return "destructive";
  if (["Upcoming", "New"].includes(status)) return "info";
  return "warning";
}

function ModeIcon({ mode }: { mode: string }) {
  if (mode === "In-Person") return <MapPin className="size-4" />;
  if (mode === "Phone") return <Phone className="size-4" />;
  return <Video className="size-4" />;
}

function EmptyState({ label }: { label: string }) {
  return <p className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">No {label.toLowerCase()} consultations found.</p>;
}

export default function ConsultationsPage() {
  const statuses = ["Upcoming", "Completed", "Cancelled"];

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Consultations"
        description="Review past sessions and manage upcoming advisory conversations."
        actions={
          <Button asChild>
            <Link href="/book">Book Consultation</Link>
          </Button>
        }
      />

      <Tabs defaultValue="Upcoming">
        <TabsList>
          {statuses.map((status) => (
            <TabsTrigger key={status} value={status}>{status}</TabsTrigger>
          ))}
        </TabsList>

        {statuses.map((status) => {
          const items = consultations.filter((consultation) => consultation.status === status);
          return (
            <TabsContent key={status} value={status} className="space-y-4">
              {items.length === 0 ? <EmptyState label={status} /> : items.map((consultation) => (
                <Card key={consultation.id}>
                  <CardContent className="flex flex-col gap-5 pt-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold text-foreground">{consultation.service}</h3>
                        <Badge variant={statusVariant(consultation.status)}>{consultation.status}</Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <Avatar name={consultation.advisor} />
                        <div>
                          <p className="text-sm font-medium text-foreground">{consultation.advisor}</p>
                          <p className="text-xs text-muted-foreground">Advisor</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-2"><CalendarDays className="size-4" /> {formatDate(consultation.date)}</span>
                        <span className="inline-flex items-center gap-2"><Clock className="size-4" /> {consultation.time}</span>
                        <span className="inline-flex items-center gap-2"><ModeIcon mode={consultation.mode} /> {consultation.mode}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {status === "Upcoming" && (
                        <>
                          <Button size="sm">Join</Button>
                          <Button size="sm" variant="outline">Reschedule</Button>
                          <Button size="sm" variant="ghost">Cancel</Button>
                        </>
                      )}
                      {status === "Completed" && (
                        <>
                          <Button size="sm" variant="outline">View Notes</Button>
                          <Button size="sm">Book Follow-up</Button>
                        </>
                      )}
                      {status === "Cancelled" && <Button size="sm">Rebook</Button>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
