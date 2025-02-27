
/**
 * DateTimeFormatter component for consistent date/time formatting.
 * 
 * Features:
 * - Formats date strings into localized, readable format
 * - Provides fallback text for undefined/null dates
 * - Uses browser's Intl API for localization support
 * - Displays full datetime with timezone information
 * 
 * Props:
 * - dateString: ISO date string to format
 * - fallback: Text to display when date is missing (defaults to "Never")
 * 
 * Usage:
 * ```tsx
 * <DateTimeFormatter dateString="2023-05-15T14:30:00Z" />
 * <DateTimeFormatter dateString={folder.lastSync} fallback="Not synchronized" />
 * ```
 */
import React from "react";

interface DateTimeFormatterProps {
  dateString: string | undefined;
  fallback?: string;
}

export const DateTimeFormatter: React.FC<DateTimeFormatterProps> = ({ 
  dateString, 
  fallback = "Never" 
}) => {
  if (!dateString) return <span>{fallback}</span>;
  
  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
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

  return <span>{formatDateTime(dateString)}</span>;
};
