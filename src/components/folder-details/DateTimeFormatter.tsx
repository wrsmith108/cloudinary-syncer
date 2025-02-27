
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
