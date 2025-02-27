
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Trash2, Calendar } from "lucide-react";
import { FolderNode } from "@/types/folder";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, addMinutes } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { ScheduleSyncForm } from "./ScheduleSyncForm";

interface FolderOverviewProps {
  folder: FolderNode;
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

export const FolderOverview: React.FC<FolderOverviewProps> = ({
  folder,
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
  const getStatusIcon = (status: "synced" | "error" | "pending") => {
    switch (status) {
      case "synced":
        return <span className="text-[#007F5F]">●</span>;
      case "error":
        return <span className="text-[#D82C0D]">●</span>;
      case "pending":
        return <span className="text-[#B98900]">●</span>;
      default:
        return null;
    }
  };

  // Calculate total items in the folder (including all subfolders)
  const totalItems = folder.children?.reduce((acc, child) => {
    return acc + (child.children?.length || 0) + 1;
  }, 0) || 0;

  // Format scheduled time for display, with time zone
  const formatScheduledTime = (time: Date) => {
    return formatInTimeZone(time, selectedTimeZone, "MMM d, yyyy h:mm a (zzz)");
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
              {syncScheduled && scheduledSyncTime ? (
                <div className="flex flex-col">
                  <div className="text-sm mb-2">
                    Sync scheduled for {formatScheduledTime(scheduledSyncTime)}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 text-sm font-medium border-shopify-border-subdued hover:bg-shopify-background hover:text-shopify-text"
                    onClick={onCancelScheduledSync}
                  >
                    Cancel Scheduled Sync
                  </Button>
                </div>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 text-sm font-medium border-shopify-border-subdued hover:bg-shopify-background hover:text-shopify-text" 
                    onClick={onSync}
                  >
                    <RefreshCw size={14} className="mr-1" />
                    Sync
                  </Button>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 text-sm font-medium border-shopify-border-subdued hover:bg-shopify-background hover:text-shopify-text"
                      >
                        <Calendar size={14} className="mr-1" />
                        Schedule
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <ScheduleSyncForm
                        syncSchedule={syncSchedule}
                        scheduledDate={scheduledDate}
                        scheduledTime={scheduledTime}
                        selectedTimeZone={selectedTimeZone}
                        onSyncScheduleChange={onSyncScheduleChange}
                        onScheduledDateChange={onScheduledDateChange}
                        onScheduledTimeChange={onScheduledTimeChange}
                        onSelectedTimeZoneChange={onSelectedTimeZoneChange}
                        onSync={onSync}
                      />
                    </PopoverContent>
                  </Popover>
                </>
              )}
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
  );
};
