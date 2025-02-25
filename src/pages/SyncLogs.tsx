
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";

const syncLogs = [
  {
    id: 1,
    folder: "Product Images/Summer Collection",
    status: "success",
    startTime: "2024-02-20T10:00:00",
    endTime: "2024-02-20T10:05:00",
    filesProcessed: 25
  },
  {
    id: 2,
    folder: "Marketing Assets/Social Media/Instagram",
    status: "error",
    startTime: "2024-02-19T15:30:00",
    endTime: "2024-02-19T15:32:00",
    filesProcessed: 12,
    error: "API Rate limit exceeded"
  },
  {
    id: 3,
    folder: "Lifestyle Photos",
    status: "in_progress",
    startTime: "2024-02-20T11:00:00",
    filesProcessed: 8
  }
];

const statusIcons = {
  success: <CheckCircle size={16} className="text-green-500" />,
  error: <AlertCircle size={16} className="text-red-500" />,
  in_progress: <Clock size={16} className="text-yellow-500" />
};

const SyncLogs = () => {
  return (
    <div className="bg-shopify-surface border border-shopify-border rounded-lg p-6">
      <h1 className="text-xl font-semibold mb-6">Sync Logs</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Folder</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Files Processed</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {syncLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>{statusIcons[log.status as keyof typeof statusIcons]}</TableCell>
              <TableCell className="font-medium">{log.folder}</TableCell>
              <TableCell>{new Date(log.startTime).toLocaleString()}</TableCell>
              <TableCell>
                {log.endTime ? new Date(log.endTime).toLocaleString() : "In Progress"}
              </TableCell>
              <TableCell>{log.filesProcessed}</TableCell>
              <TableCell className="text-red-500">{log.error}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SyncLogs;
