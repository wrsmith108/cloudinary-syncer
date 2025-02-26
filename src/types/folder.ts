
export interface FolderNode {
  id: string;
  name: string;
  status: "synced" | "error" | "pending";
  lastSync?: string;
  children?: FolderNode[];
}
