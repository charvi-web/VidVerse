import { Shield, User } from "lucide-react";

import { PageHeader } from "@/components/portal/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { currentClient } from "@/lib/mock";

function SettingRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="font-medium text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground">{value}</p>
      </div>
      <Button variant="outline" size="sm">Edit</Button>
    </div>
  );
}

function NotificationToggle({ label, description, defaultChecked }: { label: string; description: string; defaultChecked?: boolean }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-border p-4">
      <span>
        <span className="block font-medium text-foreground">{label}</span>
        <span className="text-sm text-muted-foreground">{description}</span>
      </span>
      <Checkbox defaultChecked={defaultChecked} className="size-5" />
    </label>
  );
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Control account details, notifications, security, and portal preferences." />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><User className="size-4" /> Account</CardTitle>
          <CardDescription>Basic profile details connected to your portal account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SettingRow label="Name" value={currentClient.name} />
          <Separator />
          <SettingRow label="Email" value={currentClient.email} />
          <Separator />
          <SettingRow label="Phone" value={currentClient.phone} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Choose how NWealth sends important updates.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <NotificationToggle label="Email updates" description="Reports, documents, and account summaries." defaultChecked />
          <NotificationToggle label="SMS reminders" description="Time-sensitive service and compliance reminders." defaultChecked />
          <NotificationToggle label="Consultation reminders" description="Alerts before upcoming advisory calls." defaultChecked />
          <NotificationToggle label="Payment alerts" description="Invoice due dates and receipt confirmations." defaultChecked />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Shield className="size-4" /> Security</CardTitle>
          <CardDescription>Manage secure access to your financial information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-foreground">Password</p>
              <p className="text-sm text-muted-foreground">Change your account password regularly.</p>
            </div>
            <Button variant="outline" size="sm">Change password</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-foreground">Two-factor setup</p>
              <p className="text-sm text-muted-foreground">Authenticator app is recommended for all clients.</p>
            </div>
            <Button variant="secondary" size="sm">Manage</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-foreground">Active sessions</p>
              <p className="text-sm text-muted-foreground">Review devices currently signed in.</p>
            </div>
            <Button variant="ghost" size="sm">Review sessions</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Personalise how your portal displays information.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <Field label="Language" htmlFor="language">
            <Select id="language" defaultValue="en">
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="mr">Marathi</option>
            </Select>
          </Field>
          <Field label="Currency" htmlFor="currency">
            <Select id="currency" defaultValue="inr">
              <option value="inr">Indian Rupee (INR)</option>
              <option value="usd">US Dollar (USD)</option>
            </Select>
          </Field>
          <Field label="Timezone" htmlFor="timezone">
            <Select id="timezone" defaultValue="ist">
              <option value="ist">Asia/Kolkata (IST)</option>
              <option value="gst">Gulf Standard Time</option>
              <option value="gmt">Greenwich Mean Time</option>
            </Select>
          </Field>
        </CardContent>
      </Card>

      <Card className="border-destructive/30 bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-destructive">Danger zone</CardTitle>
          <CardDescription>Close account requests require advisor confirmation and compliance checks.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-foreground">Close account</p>
            <p className="text-sm text-muted-foreground">Request permanent closure of your NWealth portal account.</p>
          </div>
          <Button variant="destructive">Close account</Button>
        </CardContent>
      </Card>
    </div>
  );
}
