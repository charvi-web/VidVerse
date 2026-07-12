import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";

import { PageHeader } from "@/components/portal/page-header";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { serviceRequests } from "@/lib/mock";
import { services } from "@/lib/services";
import { formatDate } from "@/lib/utils";

function statusVariant(status: string) {
  if (["Completed", "Paid", "Success", "Resolved", "Active"].includes(status)) return "success";
  if (["Cancelled", "Overdue", "Failed"].includes(status)) return "destructive";
  if (["Upcoming", "New"].includes(status)) return "info";
  return "warning";
}

export default function ServicesPage() {
  const activeServiceNames = new Set(serviceRequests.map((request) => request.service));
  const moreServices = services.filter((service) => !activeServiceNames.has(service.name)).slice(0, 4);

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Services"
        description="Track ongoing engagements and explore additional wealth-management services."
        actions={
          <Button asChild>
            <Link href="/book">Request a Service</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {serviceRequests.map((request) => {
          const service = services.find((item) => item.name === request.service || item.shortName === request.service);
          const Icon = service?.icon ?? Briefcase;

          return (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <CardTitle>{request.service}</CardTitle>
                      <CardDescription>Requested {formatDate(request.requested)}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={statusVariant(request.status)}>{request.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center gap-3">
                  <Avatar name={request.advisor} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{request.advisor}</p>
                    <p className="text-xs text-muted-foreground">Advisor</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium text-foreground">{request.progress}%</span>
                  </div>
                  <Progress value={request.progress} />
                </div>
                <Button variant="ghost" className="px-0">
                  View details <ArrowRight className="size-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Explore more services</CardTitle>
          <CardDescription>Additional services that can complement your current wealth plan.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {moreServices.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors hover:bg-secondary"
              >
                <span className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </span>
                  <span>
                    <span className="block font-medium text-foreground">{service.name}</span>
                    <span className="text-sm text-muted-foreground">{service.tagline}</span>
                  </span>
                </span>
                <ArrowRight className="size-4 text-muted-foreground" />
              </Link>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
