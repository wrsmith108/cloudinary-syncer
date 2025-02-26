
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, Clock, RefreshCw } from "lucide-react";
import { FolderNode } from "@/types/folder";

interface FolderDetailsProps {
  folder: FolderNode | null;
}

/**
 * FolderDetails component displays detailed information about a selected folder.
 * Shows folder status, sync information, and subfolder details in a card layout.
 * 
 * @param folder - The selected folder to display details for, or null if no folder is selected
 */
const FolderDetails: React.FC<FolderDetailsProps> = ({ folder }) => {
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

  if (!folder) {
    return (
      <div className="text-shopify-icon-subdued">
        Select a folder to view its details
      </div>
    );
  }

  // Map folder status to corresponding status icon
  const statusIcon = {
    synced: <CheckCircle size={16} className="text-green-500" />,
    error: <AlertCircle size={16} className="text-red-500" />,
    pending: <Clock size={16} className="text-yellow-500" />
  }[folder.status];

  // Calculate total items in the folder (including all subfolders)
  const totalItems = folder.children?.reduce((acc, child) => {
    return acc + (child.children?.length || 0) + 1;
  }, 0) || 0;

  return (
    <div className="space-y-6">
      {/* Folder Overview Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Folder Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-shopify-icon-subdued">Sync</p>
              <div className="mt-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    console.log(`Initiating sync for folder: ${folder.id}`);
                  }}
                >
                  <RefreshCw size={14} className="mr-1" />
                  Sync
                </Button>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-shopify-icon-subdued">Status</p>
              <div className="flex items-center mt-1 space-x-2">
                {statusIcon}
                <span className="capitalize">{folder.status}</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-shopify-icon-subdued">Last Sync</p>
              <p className="mt-1">
                {folder.lastSync 
                  ? formatDateTime(folder.lastSync)
                  : "Never"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-shopify-icon-subdued">Total Items</p>
              <p className="mt-1">{totalItems}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subfolders Table Card */}
      {folder.children && folder.children.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Subfolders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Sync</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {folder.children.map((child) => (
                  <TableRow key={child.id}>
                    <TableCell>{child.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {statusIcon}
                        <span className="capitalize">{child.status}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {child.lastSync 
                        ? formatDateTime(child.lastSync)
                        : "Never"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FolderDetails;
