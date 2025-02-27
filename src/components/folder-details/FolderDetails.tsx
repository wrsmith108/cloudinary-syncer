
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { FolderNode } from "@/types/folder";
import { format, addMinutes } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { FolderOverview } from "./FolderOverview";
import { SubFoldersTable } from "./SubFoldersTable";

interface FolderDetailsProps {
  folder: FolderNode | null;
}

export const FolderDetails: React.FC<FolderDetailsProps> = ({ folder }) => {
  const { toast } = useToast();
  const [syncSchedule, setSyncSchedule] = useState<"now" | "scheduled">("now");
  const [scheduledDate, setScheduledDate] = useState<string>(
    format(addMinutes(new Date(), 30), "yyyy-MM-dd")
  );
  const [scheduledTime, setScheduledTime] = useState<string>(
    format(addMinutes(new Date(), 30), "HH:mm")
  );
  const [syncScheduled, setSyncScheduled] = useState<boolean>(false);
  const [scheduledSyncTime, setScheduledSyncTime] = useState<Date | null>(null);
  const [selectedTimeZone, setSelectedTimeZone] = useState<string>(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (e) {
      return "America/New_York";
    }
  });

  const getScheduledDateTime = () => {
    // Create a date object in the selected time zone
    const dateTimeString = `${scheduledDate}T${scheduledTime}`;
    return new Date(dateTimeString);
  };

  const handleRemove = () => {
    // Reset sync scheduling state
    setSyncSchedule("now");
    setSyncScheduled(false);
    setScheduledSyncTime(null);
    setScheduledDate(format(addMinutes(new Date(), 30), "yyyy-MM-dd"));
    setScheduledTime(format(addMinutes(new Date(), 30), "HH:mm"));
    
    console.log(`Removing folder: ${folder?.id}`);
    toast({
      title: "Removed from Shopify",
      description: `Folder "${folder?.name}" has been removed`,
    });
  };

  const handleSync = () => {
    if (syncSchedule === "now") {
      console.log(`Initiating sync for folder: ${folder?.id}`);
      toast({
        title: "Sync Initiated",
        description: `Folder "${folder?.name}" is being synchronized`,
      });
    } else {
      const syncTime = getScheduledDateTime();
      setScheduledSyncTime(syncTime);
      setSyncScheduled(true);
      
      // Format the time in the selected time zone for the toast message
      const formattedTime = formatInTimeZone(
        syncTime, 
        selectedTimeZone,
        "MMM d, yyyy h:mm a (zzz)"
      );
      
      console.log(`Scheduling sync for folder: ${folder?.id} at ${syncTime.toString()} in ${selectedTimeZone}`);
      toast({
        title: "Sync Scheduled",
        description: `Folder "${folder?.name}" will be synchronized at ${formattedTime}`,
      });
      
      // Set a timeout to trigger the sync at the scheduled time
      const now = new Date();
      const timeUntilSync = syncTime.getTime() - now.getTime();
      
      if (timeUntilSync > 0) {
        setTimeout(() => {
          toast({
            title: "Sync Initiated",
            description: `Scheduled sync for folder "${folder?.name}" is now running`,
          });
          setSyncScheduled(false);
          setScheduledSyncTime(null);
        }, timeUntilSync);
      }
    }
  };

  const handleCancelScheduledSync = () => {
    setSyncScheduled(false);
    setScheduledSyncTime(null);
    toast({
      title: "Sync Cancelled",
      description: `Scheduled sync for folder "${folder?.name}" has been cancelled`,
    });
  };

  if (!folder) {
    return (
      <div className="text-shopify-icon-subdued text-center p-4">
        Select a folder to view its details
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <FolderOverview
        folder={folder}
        syncScheduled={syncScheduled}
        scheduledSyncTime={scheduledSyncTime}
        syncSchedule={syncSchedule}
        scheduledDate={scheduledDate}
        scheduledTime={scheduledTime}
        selectedTimeZone={selectedTimeZone}
        onSyncScheduleChange={setSyncSchedule}
        onScheduledDateChange={setScheduledDate}
        onScheduledTimeChange={setScheduledTime}
        onSelectedTimeZoneChange={setSelectedTimeZone}
        onSync={handleSync}
        onRemove={handleRemove}
        onCancelScheduledSync={handleCancelScheduledSync}
      />
      <SubFoldersTable folder={folder} />
    </div>
  );
};

export default FolderDetails;
