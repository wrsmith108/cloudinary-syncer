
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, AlertCircle, MoreVertical } from "lucide-react";
import { FolderNode } from "@/types/folder";

interface SubfoldersTableProps {
  folder: FolderNode;
}

export const SubfoldersTable: React.FC<SubfoldersTableProps> = ({ folder }) => {
  const getStatusIcon = (status: "synced" | "error" | "pending") => {
    switch (status) {
      case "synced":
        return <CheckCircle size={16} className="text-[#007F5F]" />;
      case "error":
        return <AlertCircle size={16} className="text-[#D82C0D]" />;
      case "pending":
        return <MoreVertical size={16} className="text-[#B98900]" />;
      default:
        return null;
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('default', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    }).format(date);
  };

  if (!folder.children || folder.children.length === 0) {
    return null;
  }

  return (
    <Card className="border-shopify-border-subdued shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium text-shopify-text">Subfolders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-shopify-border-subdued hover:bg-transparent">
              <TableHead className="text-sm font-medium text-shopify-text">Name</TableHead>
              <TableHead className="text-sm font-medium text-shopify-text">Status</TableHead>
              <TableHead className="text-sm font-medium text-shopify-text">Last Sync</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {folder.children.map(child => (
              <TableRow key={child.id} className="border-shopify-border-subdued hover:bg-shopify-background">
                <TableCell className="text-sm">{child.name}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(child.status)}
                    <span className="capitalize text-sm">{child.status}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  {child.lastSync ? formatDateTime(child.lastSync) : "Never"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
