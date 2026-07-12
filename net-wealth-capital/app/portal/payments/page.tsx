"use client";

import { CreditCard, Download, FileText } from "lucide-react";

import { PageHeader } from "@/components/portal/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { invoices, transactions } from "@/lib/mock";
import { formatCurrency, formatDate } from "@/lib/utils";

function statusVariant(status: string) {
  if (["Completed", "Paid", "Success", "Resolved", "Active"].includes(status)) return "success";
  if (["Cancelled", "Overdue", "Failed"].includes(status)) return "destructive";
  if (["Upcoming", "New"].includes(status)) return "info";
  return "warning";
}

export default function PaymentsPage() {
  const totalPaid = invoices.filter((invoice) => invoice.status === "Paid").reduce((total, invoice) => total + invoice.amount, 0);
  const outstanding = invoices.filter((invoice) => ["Due", "Overdue"].includes(invoice.status)).reduce((total, invoice) => total + invoice.amount, 0);
  const nextDue = invoices.find((invoice) => invoice.status === "Due");
  const paidInvoices = invoices.filter((invoice) => invoice.status === "Paid");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payments"
        description="Review invoices, transactions, receipts, and outstanding advisory fees."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Paid" value={formatCurrency(totalPaid)} icon={CreditCard} hint="Across completed invoices" />
        <StatCard label="Outstanding" value={formatCurrency(outstanding)} icon={FileText} hint="Due or overdue invoices" />
        <StatCard label="Next Due" value={nextDue ? formatDate(nextDue.date) : "—"} icon={CreditCard} hint={nextDue?.id ?? "No pending dues"} />
      </div>

      <Tabs defaultValue="invoices">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="receipts">Receipts</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>Advisory and service invoices issued to your account.</CardDescription>
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
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.description}</TableCell>
                      <TableCell>{formatDate(invoice.date)}</TableCell>
                      <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                      <TableCell><Badge variant={statusVariant(invoice.status)}>{invoice.status}</Badge></TableCell>
                      <TableCell>
                        {invoice.status === "Paid" ? (
                          <Button variant="outline" size="sm"><Download className="size-4" /> Download</Button>
                        ) : (
                          <Button size="sm">Pay Now</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>Payment attempts and successful settlements.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.method}</TableCell>
                      <TableCell>{formatDate(transaction.date)}</TableCell>
                      <TableCell>{formatCurrency(transaction.amount)}</TableCell>
                      <TableCell><Badge variant={statusVariant(transaction.status)}>{transaction.status}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receipts">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {paidInvoices.map((invoice) => (
              <Card key={invoice.id} className="overflow-hidden">
                <CardHeader className="border-b border-dashed border-border">
                  <CardTitle className="text-base">Receipt {invoice.id}</CardTitle>
                  <CardDescription>{formatDate(invoice.date)}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Amount paid</p>
                    <p className="text-2xl font-semibold text-foreground">{formatCurrency(invoice.amount)}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{invoice.description}</p>
                  <Button variant="outline" className="w-full"><Download className="size-4" /> Download receipt</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
