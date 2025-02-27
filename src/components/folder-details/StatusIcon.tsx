
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
