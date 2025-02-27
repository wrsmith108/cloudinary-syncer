
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { FolderNode } from "@/types/folder";
import { StatusIcon } from "./StatusIcon";
import { DateTimeFormatter } from "./DateTimeFormatter";
import { SyncControls } from "./SyncControls";

interface FolderOverviewCardProps {
  folder: FolderNode;
  totalItems: number;
  syncScheduled: boolean;
  scheduledSyncTime: Date | null;
  syncSchedule: "now" | "scheduled";
  scheduledDate: string;
  scheduledTime: string;
  selectedTimeZone: string;
  onSyncScheduleChange: (value: "now" | "scheduled") => void;
  onScheduledDateChange: (value: string) => void;
  onScheduledTimeChange: (value: string) => void;
  onSelectedTimeZoneChange: (value: string) => void;
  onSync: () => void;
  onRemove: () => void;
  onCancelScheduledSync: () => void;
}

export const FolderOverviewCard: React.FC<FolderOverviewCardProps> = ({
  folder,
  totalItems,
  syncScheduled,
  scheduledSyncTime,
  syncSchedule,
  scheduledDate,
  scheduledTime,
  selectedTimeZone,
  onSyncScheduleChange,
  onScheduledDateChange,
  onScheduledTimeChange,
  onSelectedTimeZoneChange,
  onSync,
  onRemove,
  onCancelScheduledSync
}) => {
  return (
    <Card className="border-shopify-border-subdued shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium text-shopify-text">Folder Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium mb-2 text-shopify-text">Sync</p>
            <div className="mt-1 flex space-x-2">
              <SyncControls
                folderName={folder.name}
                folderId={folder.id}
                syncScheduled={syncScheduled}
                scheduledSyncTime={scheduledSyncTime}
                syncSchedule={syncSchedule}
                scheduledDate={scheduledDate}
                scheduledTime={scheduledTime}
                selectedTimeZone={selectedTimeZone}
                onSyncScheduleChange={onSyncScheduleChange}
                onScheduledDateChange={onScheduledDateChange}
                onScheduledTimeChange={onScheduledTimeChange}
                onSelectedTimeZoneChange={onSelectedTimeZoneChange}
                onSync={onSync}
                onCancelScheduledSync={onCancelScheduledSync}
              />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-2 text-shopify-text">Remove</p>
            <div className="mt-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-8 text-sm font-medium border-shopify-border-subdued hover:bg-shopify-background hover:text-shopify-text text-[#D82C0D] hover:text-[#D82C0D]"
                onClick={onRemove}
              >
                <Trash2 size={14} className="mr-1" />
                Remove
              </Button>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-2 text-shopify-text">Status</p>
            <div className="flex items-center mt-1 space-x-2">
              <StatusIcon status={folder.status} />
              <span className="capitalize text-sm">{folder.status}</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-medium mb-2 text-shopify-text">Last Sync</p>
            <p className="mt-1 text-sm">
              <DateTimeFormatter dateString={folder.lastSync} />
            </p>
          </div>
          <div>
            <p className="text-sm font-medium mb-2 text-shopify-text">Total Assets</p>
            <p className="mt-1 text-sm">{totalItems}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
