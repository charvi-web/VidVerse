import { Download, Eye, FileText, Plus, Search, Upload } from "lucide-react";

import { PageHeader } from "@/components/portal/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { documents } from "@/lib/mock";
import { formatDate } from "@/lib/utils";

export default function DocumentsPage() {
  const categories = Array.from(new Set(documents.map((document) => document.category)));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Documents"
        description="Upload, review, and download secure advisory documents."
        actions={
          <Button>
            <Plus className="size-4" /> Upload
          </Button>
        }
      />

      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center px-6 py-10 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Upload className="size-5" />
          </span>
          <h2 className="mt-4 text-lg font-semibold text-foreground">Drag & drop files here or browse</h2>
          <p className="mt-1 text-sm text-muted-foreground">Supported formats: PDF, JPG, PNG, DOCX up to 10 MB.</p>
          <Button variant="outline" className="mt-4">Browse files</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="grid gap-4 pt-6 md:grid-cols-[220px_1fr]">
          <Field label="Category" htmlFor="category-filter">
            <Select id="category-filter" defaultValue="all">
              <option value="all">All categories</option>
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </Select>
          </Field>
          <Field label="Search" htmlFor="document-search">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="document-search" placeholder="Search documents" className="pl-9" />
            </div>
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Document library</CardTitle>
          <CardDescription>All files shared by you and your NWealth advisory team.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((document) => (
                <TableRow key={document.id}>
                  <TableCell>
                    <span className="inline-flex items-center gap-2 font-medium text-foreground">
                      <FileText className="size-4 text-muted-foreground" /> {document.name}
                    </span>
                  </TableCell>
                  <TableCell><Badge variant="secondary">{document.category}</Badge></TableCell>
                  <TableCell>{document.owner}</TableCell>
                  <TableCell>{document.size}</TableCell>
                  <TableCell>{formatDate(document.date)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost" aria-label={`View ${document.name}`}><Eye className="size-4" /></Button>
                      <Button size="icon" variant="ghost" aria-label={`Download ${document.name}`}><Download className="size-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
