
import React from "react";
import { 
  Folder, 
  FolderOpen, 
  ChevronRight,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react";
import { FolderNode } from "@/types/folder";

interface FolderItemProps {
  folder: FolderNode;
  level: number;
  expanded: Set<string>;
  selected: string | null;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
}

const FolderItem: React.FC<FolderItemProps> = ({ 
  folder, 
  level, 
  expanded, 
  selected, 
  onToggle, 
  onSelect 
}) => {
  const isExpanded = expanded.has(folder.id);
  const hasChildren = folder.children && folder.children.length > 0;
  const isSelected = selected === folder.id;

  const statusIcon = {
    synced: <CheckCircle size={16} className="text-green-500" />,
    error: <AlertCircle size={16} className="text-red-500" />,
    pending: <Clock size={16} className="text-yellow-500" />
  }[folder.status];

  return (
    <div>
      <div
        className={`flex items-center px-2 py-1.5 cursor-pointer hover:bg-shopify-background transition-colors ${
          isSelected ? "bg-shopify-background" : ""
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => onSelect(folder.id)}
      >
        <button
          className="mr-1 p-0.5 hover:bg-shopify-border/20 rounded"
          onClick={(e) => {
            e.stopPropagation();
            if (hasChildren) onToggle(folder.id);
          }}
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown size={16} className="text-shopify-icon-default" />
            ) : (
              <ChevronRight size={16} className="text-shopify-icon-default" />
            )
          ) : (
            <span className="w-4" />
          )}
        </button>
        {isExpanded ? (
          <FolderOpen size={16} className="mr-2 text-shopify-icon-default" />
        ) : (
          <Folder size={16} className="mr-2 text-shopify-icon-default" />
        )}
        <span className="flex-1">{folder.name}</span>
        <div className="flex items-center space-x-2 text-sm text-shopify-icon-subdued">
          {statusIcon}
          {folder.lastSync && (
            <span>
              {new Date(folder.lastSync).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
      {isExpanded && folder.children && (
        <div>
          {folder.children.map((child) => (
            <FolderItem
              key={child.id}
              folder={child}
              level={level + 1}
              expanded={expanded}
              selected={selected}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FolderItem;
