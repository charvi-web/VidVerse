import { PageHeader } from "@/components/portal/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { documents, clients } from "@/lib/mock";
import { formatDate } from "@/lib/utils";
import { FileText, Search, Download, Plus, Eye } from "lucide-react";

export default function AdminDocumentsPage() {
  const categories = Array.from(new Set(documents.map((doc) => doc.category)));

  return (
    <div className="space-y-6">
      <PageHeader title="Documents" description="Client files, reports, and KYC records" actions={<Button><Plus className="size-4" />Upload</Button>} />

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <Card>
          <CardContent className="grid gap-3 p-4 md:grid-cols-[1fr_180px_220px]">
            <div className="relative"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input className="pl-9" placeholder="Search documents..." /></div>
            <Select defaultValue="all"><option value="all">All categories</option>{categories.map((category) => <option key={category}>{category}</option>)}</Select>
            <Select defaultValue="all"><option value="all">All clients</option>{clients.map((client) => <option key={client.id}>{client.name}</option>)}</Select>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3"><CardTitle>Storage</CardTitle><CardDescription>42.8 GB of 100 GB used</CardDescription></CardHeader>
          <CardContent><Progress value={43} /><p className="mt-2 text-xs text-muted-foreground">Includes client uploads and advisor reports.</p></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document Library</CardTitle>
          <CardDescription>Securely shared files across clients and advisors</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Client</TableHead><TableHead>Category</TableHead><TableHead>Owner</TableHead><TableHead>Size</TableHead><TableHead>Uploaded</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {documents.map((doc, index) => <TableRow key={doc.id}><TableCell><div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary"><FileText className="size-4" /></span><div><div className="font-medium">{doc.name}</div><div className="text-xs text-muted-foreground">{doc.id}</div></div></div></TableCell><TableCell>{clients[index % clients.length].name}</TableCell><TableCell><Badge variant="outline">{doc.category}</Badge></TableCell><TableCell>{doc.owner}</TableCell><TableCell>{doc.size}</TableCell><TableCell>{formatDate(doc.date)}</TableCell><TableCell className="space-x-1 text-right"><Button variant="ghost" size="icon" aria-label={`View ${doc.name}`}><Eye className="size-4" /></Button><Button variant="ghost" size="icon" aria-label={`Download ${doc.name}`}><Download className="size-4" /></Button></TableCell></TableRow>)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
