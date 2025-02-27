
import { TIME_ZONES } from "./ScheduleSyncForm";

// Find the timezone label for display
export const getTimeZoneLabel = (tzValue: string) => {
  const zone = TIME_ZONES.find(tz => tz.value === tzValue);
  return zone ? zone.label : tzValue;
};

export const formatDateTime = (dateString: string) => {
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
