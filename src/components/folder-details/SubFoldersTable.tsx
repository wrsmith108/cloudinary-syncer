
/**
 * SubFoldersTable component for displaying a list of subfolders with their sync status.
 * 
 * Features:
 * - Renders a table of subfolders with their names, status icons, and last sync times
 * - Auto-hides when no subfolders exist
 * - Uses StatusIcon component to show sync status visually
 * - Formats dates consistently with DateTimeFormatter
 * - Styled to match Shopify design system
 * 
 * Props:
 * - folder: Parent folder object containing children array
 * 
 * Dependencies:
 * - Requires StatusIcon and DateTimeFormatter components
 * - Uses shadcn/ui Card and Table components
 * 
 * Assumptions:
 * - Folder has children property that is an array of FolderNode objects
 * - Each child has id, name, status, and lastSync properties
 */
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FolderNode } from "@/types/folder";
import { StatusIcon } from "./StatusIcon";
import { DateTimeFormatter } from "./DateTimeFormatter";

interface SubFoldersTableProps {
  folder: FolderNode;
}

export const SubFoldersTable: React.FC<SubFoldersTableProps> = ({ folder }) => {
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
                    <StatusIcon status={child.status} />
                    <span className="capitalize text-sm">{child.status}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  <DateTimeFormatter dateString={child.lastSync} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
