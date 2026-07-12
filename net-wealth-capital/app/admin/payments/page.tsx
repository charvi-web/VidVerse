"use client";

import { PageHeader } from "@/components/portal/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StatCard } from "@/components/ui/stat-card";
import { invoices, transactions, clients } from "@/lib/mock";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CreditCard, Download, IndianRupee, Wallet, Clock, Plus } from "lucide-react";

function statusVariant(status: string) {
  switch (status) {
    case "Paid":
    case "Success":
      return "success" as const;
    case "Due":
    case "Pending":
      return "warning" as const;
    case "Overdue":
    case "Failed":
      return "destructive" as const;
    default:
      return "outline" as const;
  }
}

export default function AdminPaymentsPage() {
  const paidInvoices = invoices.filter((invoice) => invoice.status === "Paid").reduce((sum, invoice) => sum + invoice.amount, 0);
  const successfulTransactions = transactions.filter((txn) => txn.status === "Success").reduce((sum, txn) => sum + txn.amount, 0);
  const outstanding = invoices.filter((invoice) => invoice.status !== "Paid").reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidThisMonth = invoices.filter((invoice) => invoice.status === "Paid" && invoice.date.startsWith("2026-06")).reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingFailed = transactions.filter((txn) => txn.status !== "Success").length + invoices.filter((invoice) => invoice.status === "Due" || invoice.status === "Overdue").length;

  return (
    <div className="space-y-6">
      <PageHeader title="Payments" description="Invoices, transactions, and revenue collection" actions={<><Button><Plus className="size-4" />Create Invoice</Button><Button variant="outline"><Download className="size-4" />Export</Button></>} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Revenue" value={formatCurrency(paidInvoices + successfulTransactions)} icon={IndianRupee} trend={{ value: "+11%", direction: "up" }} />
        <StatCard label="Outstanding" value={formatCurrency(outstanding)} icon={Wallet} hint="Due and overdue" />
        <StatCard label="Paid This Month" value={formatCurrency(paidThisMonth)} icon={CreditCard} hint="June collections" />
        <StatCard label="Failed/Pending" value={pendingFailed} icon={Clock} hint="Needs attention" />
      </div>
      <Tabs defaultValue="transactions">
        <TabsList><TabsTrigger value="transactions">Transactions</TabsTrigger><TabsTrigger value="invoices">Invoice Status</TabsTrigger></TabsList>
        <TabsContent value="transactions"><Card><CardContent className="pt-6"><Table><TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Client</TableHead><TableHead>Method</TableHead><TableHead>Date</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody>{transactions.map((txn, index) => <TableRow key={txn.id}><TableCell className="font-medium">{txn.id}</TableCell><TableCell>{clients[index % clients.length].name}</TableCell><TableCell>{txn.method}</TableCell><TableCell>{formatDate(txn.date)}</TableCell><TableCell>{formatCurrency(txn.amount)}</TableCell><TableCell><Badge variant={statusVariant(txn.status)}>{txn.status}</Badge></TableCell></TableRow>)}</TableBody></Table></CardContent></Card></TabsContent>
        <TabsContent value="invoices"><Card><CardContent className="pt-6"><Table><TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Client</TableHead><TableHead>Description</TableHead><TableHead>Amount</TableHead><TableHead>Due date</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Action</TableHead></TableRow></TableHeader><TableBody>{invoices.map((invoice, index) => <TableRow key={invoice.id}><TableCell className="font-medium">{invoice.id}</TableCell><TableCell>{clients[index % clients.length].name}</TableCell><TableCell>{invoice.description}</TableCell><TableCell>{formatCurrency(invoice.amount)}</TableCell><TableCell>{formatDate(invoice.date)}</TableCell><TableCell><Badge variant={statusVariant(invoice.status)}>{invoice.status}</Badge></TableCell><TableCell className="text-right"><Button variant="ghost" size="sm">View</Button></TableCell></TableRow>)}</TableBody></Table></CardContent></Card></TabsContent>
      </Tabs>
    </div>
  );
}
