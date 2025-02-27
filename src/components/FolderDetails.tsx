
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

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle, MoreVertical, RefreshCw, Trash2, Calendar } from "lucide-react";
import { FolderNode } from "@/types/folder";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { format, addMinutes, isAfter } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

interface FolderDetailsProps {
  folder: FolderNode | null;
}

// Common time zones with readable labels
const TIME_ZONES = [
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "America/Anchorage", label: "Alaska Time (AKT)" },
  { value: "Pacific/Honolulu", label: "Hawaii Time (HT)" },
  { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
  { value: "Europe/Paris", label: "Central European Time (CET)" },
  { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
  { value: "Australia/Sydney", label: "Australian Eastern Time (AET)" }
];

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

  // Find the timezone label for display
  const getTimeZoneLabel = (tzValue: string) => {
    const zone = TIME_ZONES.find(tz => tz.value === tzValue);
    return zone ? zone.label : tzValue;
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

  const getScheduledDateTime = () => {
    // Create a date object in the selected time zone
    const dateTimeString = `${scheduledDate}T${scheduledTime}`;
    return new Date(dateTimeString);
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

  const isValidScheduleTime = () => {
    const scheduledTime = getScheduledDateTime();
    const now = new Date();
    return isAfter(scheduledTime, now);
  };

  // Format scheduled time for display, with time zone
  const formatScheduledTime = (time: Date) => {
    return formatInTimeZone(time, selectedTimeZone, "MMM d, yyyy h:mm a (zzz)");
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
                      onClick={handleCancelScheduledSync}
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
                      onClick={handleSync}
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
                        <div className="space-y-4">
                          <h4 className="font-medium text-sm">Schedule Sync</h4>
                          <div className="space-y-2">
                            <Label htmlFor="sync-time">Sync Time</Label>
                            <Select 
                              value={syncSchedule} 
                              onValueChange={(value) => setSyncSchedule(value as "now" | "scheduled")}
                            >
                              <SelectTrigger id="sync-time">
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="now">Now</SelectItem>
                                <SelectItem value="scheduled">Schedule for later</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {syncSchedule === "scheduled" && (
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="sync-date">Date</Label>
                                <Input
                                  id="sync-date"
                                  type="date"
                                  value={scheduledDate}
                                  onChange={(e) => setScheduledDate(e.target.value)}
                                  className="w-full"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="sync-time-input">Time</Label>
                                <Input
                                  id="sync-time-input"
                                  type="time"
                                  value={scheduledTime}
                                  onChange={(e) => setScheduledTime(e.target.value)}
                                  className="w-full"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="time-zone">Time Zone</Label>
                                <Select 
                                  value={selectedTimeZone} 
                                  onValueChange={setSelectedTimeZone}
                                >
                                  <SelectTrigger id="time-zone">
                                    <SelectValue placeholder="Select time zone" />
                                  </SelectTrigger>
                                  <SelectContent className="max-h-80">
                                    {TIME_ZONES.map((tz) => (
                                      <SelectItem key={tz.value} value={tz.value}>
                                        {tz.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <Button 
                                onClick={handleSync} 
                                className="w-full"
                                disabled={!isValidScheduleTime()}
                              >
                                Schedule Sync
                              </Button>
                              {!isValidScheduleTime() && (
                                <p className="text-xs text-[#D82C0D]">
                                  Please select a future time
                                </p>
                              )}
                            </div>
                          )}

                          {syncSchedule === "now" && (
                            <Button 
                              onClick={handleSync} 
                              className="w-full"
                            >
                              Sync Now
                            </Button>
                          )}
                        </div>
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
