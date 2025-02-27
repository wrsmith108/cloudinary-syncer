
/**
 * Page component for managing scheduled synchronizations.
 * 
 * Features:
 * - Lists all scheduled sync tasks
 * - Shows frequency, timing, and last run
 * - Provides deletion capability
 * 
 * Table Columns:
 * - Folder: Path to target folder
 * - Frequency: How often sync runs
 * - Next Run: Next scheduled execution
 * - Last Sync: Most recent sync time
 * - Actions: Delete scheduled task
 * 
 * Button Behavior:
 * - Delete (trash icon): Removes scheduled sync
 * 
 * Assumptions:
 * - Times stored in ISO format
 * - Frequencies are: Daily, Weekly, Monthly
 * - Each sync has unique ID
 */
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const scheduledSyncs = [
  {
    id: 1,
    folder: "Product Images/Summer Collection",
    frequency: "Daily",
    nextRun: "2024-02-21T10:00:00",
    lastSync: "2024-02-20T10:00:00"
  },
  {
    id: 2,
    folder: "Marketing Assets/Social Media",
    frequency: "Weekly",
    nextRun: "2024-02-26T15:30:00",
    lastSync: "2024-02-19T15:30:00"
  },
  {
    id: 3,
    folder: "Lifestyle Photos",
    frequency: "Monthly",
    nextRun: "2024-03-18T09:15:00",
    lastSync: "2024-02-18T09:15:00"
  }
];

const Scheduled = () => {
  return (
    <div className="bg-shopify-surface border border-shopify-border rounded-lg p-6">
      <h1 className="text-xl font-semibold mb-6">Scheduled Syncs</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Folder</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Next Run</TableHead>
            <TableHead>Last Sync</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scheduledSyncs.map((sync) => (
            <TableRow key={sync.id}>
              <TableCell className="font-medium">{sync.folder}</TableCell>
              <TableCell>{sync.frequency}</TableCell>
              <TableCell>{new Date(sync.nextRun).toLocaleString()}</TableCell>
              <TableCell>{new Date(sync.lastSync).toLocaleString()}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-shopify-icon-default hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Scheduled;
