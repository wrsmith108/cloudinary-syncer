
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, MoreVertical, RefreshCw, Trash2 } from "lucide-react";
import { FolderNode } from "@/types/folder";
import { useToast } from "@/hooks/use-toast";

interface FolderDetailsProps {
  folder: FolderNode | null;
}

const FolderDetails: React.FC<FolderDetailsProps> = ({
  folder
}) => {
  const { toast } = useToast();

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
    return <div className="text-shopify-icon-subdued text-center p-4">
        Select a folder to view its details
      </div>;
  }

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

  // Calculate total items in the folder (including all subfolders)
  const totalItems = folder.children?.reduce((acc, child) => {
    return acc + (child.children?.length || 0) + 1;
  }, 0) || 0;

  const handleRemove = () => {
    console.log(`Removing folder: ${folder.id}`);
    toast({
      title: "Removed from Shopify",
      description: `Folder "${folder.name}" has been removed`,
    });
  };

  return <div className="space-y-5">
      {/* Folder Overview Card */}
      <Card className="border-shopify-border-subdued shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium text-shopify-text">Folder Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium mb-2 text-shopify-text">Sync</p>
              <div className="mt-1">
                <Button variant="outline" size="sm" className="h-8 text-sm font-medium border-shopify-border-subdued hover:bg-shopify-background hover:text-shopify-text" onClick={() => {
                console.log(`Initiating sync for folder: ${folder.id}`);
              }}>
                  <RefreshCw size={14} className="mr-1" />
                  Sync
                </Button>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2 text-shopify-text">Remove</p>
              <div className="mt-1">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 text-sm font-medium border-shopify-border-subdued hover:bg-shopify-background hover:text-shopify-text text-[#D82C0D] hover:text-[#D82C0D]"
                  onClick={handleRemove}
                >
                  <Trash2 size={14} className="mr-1" />
                  Remove
                </Button>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2 text-shopify-text">Status</p>
              <div className="flex items-center mt-1 space-x-2">
                {getStatusIcon(folder.status)}
                <span className="capitalize text-sm">{folder.status}</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2 text-shopify-text">Last Sync</p>
              <p className="mt-1 text-sm">
                {folder.lastSync ? formatDateTime(folder.lastSync) : "Never"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium mb-2 text-shopify-text">Total Assets</p>
              <p className="mt-1 text-sm">{totalItems}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subfolders Table Card */}
      {folder.children && folder.children.length > 0 && <Card className="border-shopify-border-subdued shadow-none">
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
                {folder.children.map(child => <TableRow key={child.id} className="border-shopify-border-subdued hover:bg-shopify-background">
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
                  </TableRow>)}
              </TableBody>
            </Table>
          </CardContent>
        </Card>}
    </div>;
};

export default FolderDetails;
