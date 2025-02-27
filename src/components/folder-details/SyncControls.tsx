
import React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RefreshCw, Calendar } from "lucide-react";
import { isAfter } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

// Common time zones with readable labels
export const TIME_ZONES = [
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

interface SyncControlsProps {
  folderName: string;
  folderId: string;
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
  onCancelScheduledSync: () => void;
}

export const SyncControls: React.FC<SyncControlsProps> = ({
  folderName,
  folderId,
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
  onCancelScheduledSync
}) => {
  const getScheduledDateTime = () => {
    const dateTimeString = `${scheduledDate}T${scheduledTime}`;
    return new Date(dateTimeString);
  };

  const isValidScheduleTime = () => {
    const scheduledTime = getScheduledDateTime();
    const now = new Date();
    return isAfter(scheduledTime, now);
  };

  const formatScheduledTime = (time: Date) => {
    return formatInTimeZone(time, selectedTimeZone, "MMM d, yyyy h:mm a (zzz)");
  };

  if (syncScheduled && scheduledSyncTime) {
    return (
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
    );
  }

  return (
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
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Schedule Sync</h4>
            <div className="space-y-2">
              <Label htmlFor="sync-time">Sync Time</Label>
              <Select 
                value={syncSchedule} 
                onValueChange={(value) => onSyncScheduleChange(value as "now" | "scheduled")}
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
                    onChange={(e) => onScheduledDateChange(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sync-time-input">Time</Label>
                  <Input
                    id="sync-time-input"
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => onScheduledTimeChange(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time-zone">Time Zone</Label>
                  <Select 
                    value={selectedTimeZone} 
                    onValueChange={onSelectedTimeZoneChange}
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
                  onClick={onSync} 
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
                onClick={onSync} 
                className="w-full"
              >
                Sync Now
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};
