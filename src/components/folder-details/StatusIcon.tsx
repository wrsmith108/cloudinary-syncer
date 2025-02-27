
/**
 * StatusIcon component for displaying sync status visually.
 * 
 * Features:
 * - Shows appropriate icon based on folder sync status
 * - Uses color coding for easy status identification:
 *   - Green check: Successfully synced
 *   - Red alert: Error during sync
 *   - Yellow vertical dots: Sync pending/in progress
 * 
 * Props:
 * - status: Current sync status ("synced", "error", or "pending")
 * - size: Optional icon size in pixels (defaults to 16px)
 * 
 * Usage:
 * ```tsx
 * <StatusIcon status="synced" />
 * <StatusIcon status="error" size={20} />
 * ```
 */
import React from "react";
import { CheckCircle, AlertCircle, MoreVertical } from "lucide-react";

interface StatusIconProps {
  status: "synced" | "error" | "pending";
  size?: number;
}

export const StatusIcon: React.FC<StatusIconProps> = ({ status, size = 16 }) => {
  switch (status) {
    case "synced":
      return <CheckCircle size={size} className="text-[#007F5F]" />;
    case "error":
      return <AlertCircle size={size} className="text-[#D82C0D]" />;
    case "pending":
      return <MoreVertical size={size} className="text-[#B98900]" />;
    default:
      return null;
  }
};
