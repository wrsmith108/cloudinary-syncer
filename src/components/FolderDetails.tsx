
/**
 * Component for displaying detailed information about a selected folder.
 * 
 * Features:
 * - Displays folder overview (status, last sync, total items)
 * - Provides sync functionality (immediate or scheduled)
 * - Shows subfolder table with status information
 * - Implements folder removal capability
 * 
 * Toast Notifications:
 * - Sync Initiated: When immediate sync starts
 * - Sync Scheduled: When sync is scheduled for later
 * - Schedule Cancelled: When scheduled sync is cancelled
 * - Folder Removed: When folder is removed from Shopify
 * 
 * Time Handling:
 * - Uses date-fns for date formatting
 * - Supports multiple timezones through date-fns-tz
 * - Scheduled times must be in the future
 * 
 * Button Behaviors:
 * - Sync: Opens popover with immediate/scheduled options
 * - Remove: Removes folder and resets sync state
 * - Cancel Scheduled: Cancels pending scheduled sync
 * 
 * Assumptions:
 * - Folder data includes status, lastSync, and children
 * - Status can be "synced", "error", or "pending"
 * - Browser's timezone is used as default
 * - Toast notifications should be user-friendly
 */

import React, { useState } from "react";
import { FolderNode } from "@/types/folder";
import { useToast } from "@/hooks/use-toast";
import { format, addMinutes } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { FolderOverviewCard, SubFoldersTable } from "@/components/folder-details";

interface FolderDetailsProps {
  folder: FolderNode | null;
}

const FolderDetails: React.FC<FolderDetailsProps> = ({
  folder
}) => {
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

  if (!folder) {
    return <div className="text-shopify-icon-subdued text-center p-4">
        Select a folder to view its details
      </div>;
  }

  // Calculate total items in the folder (including all subfolders)
  const totalItems = folder.children?.reduce((acc, child) => {
    return acc + (child.children?.length || 0) + 1;
  }, 0) || 0;

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
    
    console.log(`Removing folder: ${folder.id}`);
    toast({
      title: "Removed from Shopify",
      description: `Folder "${folder.name}" has been removed`,
    });
  };

  const handleSync = () => {
    if (syncSchedule === "now") {
      console.log(`Initiating sync for folder: ${folder.id}`);
      toast({
        title: "Sync Initiated",
        description: `Folder "${folder.name}" is being synchronized`,
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
      
      console.log(`Scheduling sync for folder: ${folder.id} at ${syncTime.toString()} in ${selectedTimeZone}`);
      toast({
        title: "Sync Scheduled",
        description: `Folder "${folder.name}" will be synchronized at ${formattedTime}`,
      });
      
      // Set a timeout to trigger the sync at the scheduled time
      const now = new Date();
      const timeUntilSync = syncTime.getTime() - now.getTime();
      
      if (timeUntilSync > 0) {
        setTimeout(() => {
          toast({
            title: "Sync Initiated",
            description: `Scheduled sync for folder "${folder.name}" is now running`,
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
      description: `Scheduled sync for folder "${folder.name}" has been cancelled`,
    });
  };

  return <div className="space-y-5">
      {/* Folder Overview Card */}
      <FolderOverviewCard
        folder={folder}
        totalItems={totalItems}
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

      {/* Subfolders Table Card */}
      {folder.children && folder.children.length > 0 && 
        <SubFoldersTable folder={folder} />
      }
    </div>;
};

export default FolderDetails;
