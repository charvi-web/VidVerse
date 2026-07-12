import { Shield, User } from "lucide-react";

import { PageHeader } from "@/components/portal/page-header";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { currentClient } from "@/lib/mock";
import { formatDate } from "@/lib/utils";

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="mt-1 font-medium text-foreground">{value}</dd>
    </div>
  );
}

function statusVariant(status: string) {
  if (["Completed", "Paid", "Success", "Resolved", "Active"].includes(status)) return "success";
  if (["Cancelled", "Overdue", "Failed"].includes(status)) return "destructive";
  if (["Upcoming", "New"].includes(status)) return "info";
  return "warning";
}

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Profile"
        description="Manage your identity, contact details, and account security."
        actions={<Button>Edit Profile</Button>}
      />

      <Card>
        <CardContent className="flex flex-col gap-5 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar name={currentClient.name} className="size-16 text-lg" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-semibold text-foreground">{currentClient.name}</h2>
                <Badge variant={statusVariant("Active")}>Active</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{currentClient.clientId}</p>
              <p className="text-sm text-muted-foreground">Member since {formatDate(currentClient.memberSince)}</p>
            </div>
          </div>
          <div className="rounded-lg bg-secondary p-4 text-sm">
            <p className="text-muted-foreground">Primary advisor</p>
            <p className="mt-1 font-medium text-foreground">{currentClient.advisor}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><User className="size-4" /> Personal Information</CardTitle>
            <CardDescription>Your profile information used for advisory and compliance.</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4 sm:grid-cols-2">
              <ProfileRow label="Full name" value={currentClient.name} />
              <ProfileRow label="Date of birth" value={formatDate(currentClient.dob)} />
              <ProfileRow label="PAN" value={currentClient.pan} />
              <ProfileRow label="City" value={currentClient.city} />
              <ProfileRow label="Occupation" value={currentClient.occupation} />
              <ProfileRow label="Annual income" value={currentClient.income} />
              <ProfileRow label="Risk appetite" value={currentClient.riskAppetite} />
              <ProfileRow label="Investment experience" value={currentClient.experience} />
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Where your advisory team can reach you.</CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4 sm:grid-cols-2">
              <ProfileRow label="Email" value={currentClient.email} />
              <ProfileRow label="Mobile" value={currentClient.phone} />
              <ProfileRow label="City" value={currentClient.city} />
              <ProfileRow label="Address" value={`${currentClient.city}, India`} />
            </dl>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Shield className="size-4" /> Security Settings</CardTitle>
          <CardDescription>Keep your portal access protected.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-foreground">Password</p>
              <p className="text-sm text-muted-foreground">•••••••••• Last changed 24 days ago</p>
            </div>
            <Button variant="outline" size="sm">Change</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-foreground">Two-factor authentication</p>
              <p className="text-sm text-muted-foreground">Authenticator app verification is enabled.</p>
            </div>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">On</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-foreground">Login sessions</p>
              <p className="text-sm text-muted-foreground">2 active sessions across web and mobile.</p>
            </div>
            <Button variant="ghost" size="sm">Review</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
