import { PageHeader } from "@/components/portal/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Field } from "@/components/ui/field";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar } from "@/components/ui/avatar";
import { StatCard } from "@/components/ui/stat-card";
import { leads } from "@/lib/mock";
import { formatDate } from "@/lib/utils";
import { UserPlus, Download, Search, Filter, MoreHorizontal, Mail, Phone } from "lucide-react";

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

export default function AdminLeadsPage() {
  const firstLead = leads[0];
  const count = (status: string) => leads.filter((lead) => lead.status === status).length;
  const sources = Array.from(new Set(leads.map((lead) => lead.source)));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leads"
        description="Manage inbound prospects and advisor assignment"
        actions={
          <>
            <Button><UserPlus className="size-4" />Add Lead</Button>
            <Button variant="outline"><Download className="size-4" />Export</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="New" value={count("New")} icon={UserPlus} hint="Awaiting first response" />
        <StatCard label="Contacted" value={count("Contacted")} icon={Phone} hint="Discovery in progress" />
        <StatCard label="Qualified" value={count("Qualified")} icon={Filter} hint="Ready for advisor" />
        <StatCard label="Converted" value={count("Converted")} icon={Mail} trend={{ value: "+6%", direction: "up" }} hint="Became clients" />
      </div>

      <Card>
        <CardContent className="grid gap-3 p-4 md:grid-cols-[1fr_180px_180px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search leads..." />
          </div>
          <Select defaultValue="all">
            <option value="all">All statuses</option>
            {['New', 'Contacted', 'Qualified', 'Converted', 'Lost'].map((status) => <option key={status}>{status}</option>)}
          </Select>
          <Select defaultValue="all">
            <option value="all">All sources</option>
            {sources.map((source) => <option key={source}>{source}</option>)}
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lead Pipeline</CardTitle>
          <CardDescription>Clicking a lead opens details, status, notes, and advisor assignment.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"><Checkbox aria-label="Select all leads" /></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Assigned Advisor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell><Checkbox aria-label={`Select ${lead.name}`} /></TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar name={lead.name} />
                      <div><div className="font-medium">{lead.name}</div><div className="text-xs text-muted-foreground">{lead.email}</div></div>
                    </div>
                  </TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>{lead.service}</TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell>{formatDate(lead.created)}</TableCell>
                  <TableCell>{lead.advisor === "Unassigned" ? <Button variant="ghost" size="sm">Assign</Button> : lead.advisor}</TableCell>
                  <TableCell><Badge variant={statusVariant(lead.status)}>{lead.status}</Badge></TableCell>
                  <TableCell className="text-right"><Button variant="ghost" size="sm"><MoreHorizontal className="size-4" />View</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lead detail</CardTitle>
          <CardDescription>Representative panel for {firstLead.name}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-3">
          <div className="space-y-3 rounded-lg border p-4">
            <div className="flex items-center gap-3"><Avatar name={firstLead.name} /><div><p className="font-medium">{firstLead.name}</p><p className="text-sm text-muted-foreground">{firstLead.service}</p></div></div>
            <p className="flex items-center gap-2 text-sm"><Mail className="size-4 text-muted-foreground" />{firstLead.email}</p>
            <p className="flex items-center gap-2 text-sm"><Phone className="size-4 text-muted-foreground" />{firstLead.phone}</p>
          </div>
          <div className="space-y-4">
            <Field label="Status" htmlFor="lead-status"><Select id="lead-status" defaultValue={firstLead.status}>{['New', 'Contacted', 'Qualified', 'Converted', 'Lost'].map((status) => <option key={status}>{status}</option>)}</Select></Field>
            <Field label="Assign Advisor" htmlFor="lead-advisor"><Select id="lead-advisor" defaultValue={firstLead.advisor}><option>Unassigned</option><option>Priya Deshmukh</option><option>Naveen Wadhwa</option><option>Arjun Kapoor</option></Select></Field>
          </div>
          <div className="space-y-4">
            <Field label="Notes" htmlFor="lead-notes"><Textarea id="lead-notes" placeholder="Add discovery notes and next steps..." /></Field>
            <Button className="w-full">Save lead updates</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
