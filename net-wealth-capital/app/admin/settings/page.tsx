import { PageHeader } from "@/components/portal/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { brand } from "@/lib/site";
import { Building2, ShieldCheck, Mail, CalendarDays, CreditCard, FileText } from "lucide-react";

const services = [
  "Investment Advisory",
  "Taxation & Compliance",
  "Insurance Advisory",
  "Retirement Planning",
  "Estate Planning",
  "NRI Wealth Management",
];

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" description="Firm configuration, branding, services, and compliance controls" />

      <Card>
        <CardHeader><Building2 className="size-5 text-primary" /><CardTitle>Firm Profile</CardTitle><CardDescription>Public contact information for {brand.name}</CardDescription></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Field label="Firm name" htmlFor="firm-name"><Input id="firm-name" defaultValue={brand.name} /></Field>
          <Field label="Email" htmlFor="firm-email"><Input id="firm-email" defaultValue={brand.email} /></Field>
          <Field label="Phone" htmlFor="firm-phone"><Input id="firm-phone" defaultValue={brand.phone} /></Field>
          <Field label="Address" htmlFor="firm-address"><Input id="firm-address" defaultValue={`${brand.address.line1}, ${brand.address.line2}`} /></Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Branding</CardTitle><CardDescription>Portal appearance and brand assets</CardDescription></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3"><p className="text-sm font-medium">Primary colors</p><div className="flex gap-3"><span className="size-10 rounded-full bg-primary" /><span className="size-10 rounded-full bg-secondary" /><span className="size-10 rounded-full bg-muted-foreground" /><span className="size-10 rounded-full border bg-background" /></div></div>
          <div className="rounded-lg border border-dashed p-6 text-center"><p className="font-medium">Logo upload</p><p className="text-sm text-muted-foreground">Drop SVG or PNG brand mark here.</p><Button variant="outline" className="mt-3">Choose file</Button></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Services & Pricing</CardTitle><CardDescription>Default advisory fee inputs</CardDescription></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Service</TableHead><TableHead>Fee</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>{services.map((service, index) => <TableRow key={service}><TableCell className="font-medium">{service}</TableCell><TableCell><Input defaultValue={index % 2 === 0 ? "₹25,000" : "₹18,000"} /></TableCell><TableCell><Badge variant="success">Active</Badge></TableCell></TableRow>)}</TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><Mail className="size-5 text-primary" /><CardTitle>Notifications</CardTitle><CardDescription>Email and portal notification preferences</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          {['New lead alerts', 'Payment reminders', 'Document upload notifications', 'Weekly advisor digest'].map((item) => <label key={item} className="flex items-center justify-between rounded-lg border p-4"><span className="text-sm font-medium">{item}</span><Checkbox defaultChecked /></label>)}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Integrations</CardTitle><CardDescription>Connected systems for operations</CardDescription></CardHeader>
        <CardContent className="space-y-3">
          {[{ name: 'Email', icon: Mail, connected: true }, { name: 'Payment gateway', icon: CreditCard, connected: true }, { name: 'Calendar', icon: CalendarDays, connected: false }, { name: 'e-Sign', icon: FileText, connected: false }].map((item) => {
            const Icon = item.icon;
            return <div key={item.name} className="flex items-center justify-between rounded-lg border p-4"><div className="flex items-center gap-3"><Icon className="size-5 text-primary" /><span className="font-medium">{item.name}</span></div>{item.connected ? <Badge variant="success">Connected</Badge> : <Button variant="outline" size="sm">Connect</Button>}</div>;
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><ShieldCheck className="size-5 text-primary" /><CardTitle>Security & Compliance</CardTitle><CardDescription>Controls for data protection and audit readiness</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          <label className="flex items-center justify-between"><span className="text-sm font-medium">Enforce 2FA for all admin users</span><Checkbox defaultChecked /></label>
          <Separator />
          <div className="flex items-center justify-between"><div><p className="text-sm font-medium">Audit log</p><p className="text-xs text-muted-foreground">Review user activity and sensitive operations.</p></div><Button variant="outline">Open audit log</Button></div>
          <Separator />
          <Field label="Data retention" htmlFor="data-retention" hint="Default retention period for records"><Input id="data-retention" defaultValue="7 years" /></Field>
        </CardContent>
      </Card>
    </div>
  );
}
