
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

  // Calculate total number of successfully synced items
  const syncedItems = folder.children?.reduce((acc, child) => {
    const childSynced = child.children?.filter(item => item.status === "synced").length || 0;
    return acc + (child.status === "synced" ? 1 : 0) + childSynced;
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
              <p className="text-sm font-medium text-shopify-icon-subdued">Status</p>
              <div className="flex items-center mt-1 space-x-2">
                {statusIcon}
                <span className="capitalize">{folder.status}</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-shopify-icon-subdued">Last Sync</p>
              <div className="flex items-center justify-between mt-1">
                <span>
                  {folder.lastSync 
                    ? new Date(folder.lastSync).toLocaleDateString() 
                    : "Never"}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-2"
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
              <p className="text-sm font-medium text-shopify-icon-subdued">Total Items</p>
              <p className="mt-1">{totalItems}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-shopify-icon-subdued">Synced Items</p>
              <p className="mt-1">{syncedItems}</p>
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
                        ? new Date(child.lastSync).toLocaleDateString() 
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
