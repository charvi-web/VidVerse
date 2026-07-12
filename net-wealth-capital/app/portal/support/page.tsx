import { FileText, MessageSquare, Phone } from "lucide-react";

import { PageHeader } from "@/components/portal/page-header";
import { Accordion } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { supportFaqs, supportTickets } from "@/lib/mock";
import { brand } from "@/lib/site";
import { formatDate } from "@/lib/utils";

function statusVariant(status: string) {
  if (["Completed", "Paid", "Success", "Resolved", "Active"].includes(status)) return "success";
  if (["Cancelled", "Overdue", "Failed"].includes(status)) return "destructive";
  if (["Upcoming", "New"].includes(status)) return "info";
  return "warning";
}

export default function SupportPage() {
  const channels = [
    { title: "Chat with us", description: "Get quick help from client support.", icon: MessageSquare, action: "Start chat" },
    { title: "Call us", description: brand.phone, icon: Phone, action: "Call now" },
    { title: "Email us", description: brand.email, icon: FileText, action: "Send email" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Support" description="We're here to help." />

      <div className="grid gap-4 md:grid-cols-3">
        {channels.map((channel) => {
          const Icon = channel.icon;
          return (
            <Card key={channel.title}>
              <CardContent className="space-y-4 pt-6">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h2 className="font-semibold text-foreground">{channel.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{channel.description}</p>
                </div>
                <Button variant="outline" size="sm">{channel.action}</Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your tickets</CardTitle>
          <CardDescription>Recent support requests and their current status.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {supportTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>{ticket.category}</TableCell>
                  <TableCell>{formatDate(ticket.updated)}</TableCell>
                  <TableCell><Badge variant={statusVariant(ticket.status)}>{ticket.status}</Badge></TableCell>
                  <TableCell><Button variant="ghost" size="sm">View</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Raise a ticket</CardTitle>
            <CardDescription>Tell us what you need help with.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Field label="Subject" htmlFor="ticket-subject" required>
                <Input id="ticket-subject" placeholder="Briefly describe your issue" />
              </Field>
              <Field label="Category" htmlFor="ticket-category" required>
                <Select id="ticket-category" defaultValue="technical">
                  <option value="technical">Technical</option>
                  <option value="billing">Billing</option>
                  <option value="documents">Documents</option>
                  <option value="advisory">Advisory</option>
                </Select>
              </Field>
              <Field label="Description" htmlFor="ticket-description" required>
                <Textarea id="ticket-description" placeholder="Share details so we can help faster" />
              </Field>
              <Button type="submit">Submit Ticket</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frequently asked questions</CardTitle>
            <CardDescription>Answers to common portal and support questions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion items={supportFaqs} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
