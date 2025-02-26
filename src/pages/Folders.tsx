
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { 
  Folder, 
  FolderOpen, 
  Search,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react";
import FolderDetails from "@/components/FolderDetails";

/**
 * Represents the structure of a folder node in the folder tree.
 * Used for both folders and subfolders throughout the application.
 */
export interface FolderNode {
  id: string;
  name: string;
  status: "synced" | "error" | "pending";
  lastSync?: string;
  children?: FolderNode[];
}

// Mock data structure for folder hierarchy
// TODO: Replace with actual API data fetching
const initialFolders: FolderNode[] = [
  {
    id: "1",
    name: "Product Images",
    status: "synced",
    lastSync: "2024-02-20T10:00:00",
    children: [
      {
        id: "1-1",
        name: "Summer Collection 2024",
        status: "synced",
        lastSync: "2024-02-20T10:00:00",
        children: [
          {
            id: "1-1-1",
            name: "Apparel",
            status: "synced",
            lastSync: "2024-02-20T09:30:00"
          },
          {
            id: "1-1-2",
            name: "Accessories",
            status: "pending"
          }
        ]
      },
      {
        id: "1-2",
        name: "Winter Collection 2023",
        status: "error",
        lastSync: "2024-02-19T15:45:00",
        children: [
          {
            id: "1-2-1",
            name: "Outerwear",
            status: "error",
            lastSync: "2024-02-19T15:45:00"
          },
          {
            id: "1-2-2",
            name: "Footwear",
            status: "synced",
            lastSync: "2024-02-19T14:20:00"
          }
        ]
      }
    ]
  },
  {
    id: "2",
    name: "Marketing Assets",
    status: "synced",
    lastSync: "2024-02-19T15:30:00",
    children: [
      {
        id: "2-1",
        name: "Social Media",
        status: "synced",
        lastSync: "2024-02-19T15:30:00",
        children: [
          {
            id: "2-1-1",
            name: "Instagram Stories",
            status: "pending"
          },
          {
            id: "2-1-2",
            name: "Facebook Ads",
            status: "synced",
            lastSync: "2024-02-19T15:00:00"
          }
        ]
      },
      {
        id: "2-2",
        name: "Email Campaigns",
        status: "error",
        lastSync: "2024-02-18T11:20:00",
        children: [
          {
            id: "2-2-1",
            name: "Newsletter Templates",
            status: "error",
            lastSync: "2024-02-18T11:20:00"
          },
          {
            id: "2-2-2",
            name: "Promotional Banners",
            status: "synced",
            lastSync: "2024-02-18T10:45:00"
          }
        ]
      }
    ]
  },
  {
    id: "3",
    name: "Lifestyle Photos",
    status: "synced",
    lastSync: "2024-02-18T09:15:00",
    children: [
      {
        id: "3-1",
        name: "Studio Shots",
        status: "synced",
        lastSync: "2024-02-18T09:15:00",
        children: [
          {
            id: "3-1-1",
            name: "Product Lifestyle",
            status: "synced",
            lastSync: "2024-02-18T09:00:00"
          },
          {
            id: "3-1-2",
            name: "Model Photos",
            status: "pending"
          }
        ]
      },
      {
        id: "3-2",
        name: "Location Shoots",
        status: "synced",
        lastSync: "2024-02-17T16:30:00",
        children: [
          {
            id: "3-2-1",
            name: "Urban Collection",
            status: "synced",
            lastSync: "2024-02-17T16:30:00"
          },
          {
            id: "3-2-2",
            name: "Beach Collection",
            status: "synced",
            lastSync: "2024-02-17T15:45:00"
          }
        ]
      }
    ]
  }
];

/**
 * FolderItem component renders a single folder item in the folder tree.
 * Handles expanding/collapsing of folders and displays folder status.
 * 
 * @param folder - The folder data to display
 * @param level - The nesting level of the folder (used for indentation)
 * @param expanded - Set of expanded folder IDs
 * @param selected - Currently selected folder ID
 * @param onToggle - Callback when folder is expanded/collapsed
 * @param onSelect - Callback when folder is selected
 */
const FolderItem: React.FC<{
  folder: FolderNode;
  level: number;
  expanded: Set<string>;
  selected: string | null;
  onToggle: (id: string) => void;
  onSelect: (id: string) => void;
}> = ({ folder, level, expanded, selected, onToggle, onSelect }) => {
  const isExpanded = expanded.has(folder.id);
  const hasChildren = folder.children && folder.children.length > 0;
  const isSelected = selected === folder.id;

  // Map folder status to corresponding icon component
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

/**
 * Folders component is the main view for displaying and managing the folder hierarchy.
 * Implements a split panel view with folder tree on the left and folder details on the right.
 * 
 * Features:
 * - Folder tree navigation with expand/collapse functionality
 * - Folder selection with details panel
 * - Search functionality (TODO: Implement search logic)
 */
const Folders = () => {
  // Track expanded folder IDs and currently selected folder
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["1", "2"]));
  const [selected, setSelected] = useState<string | null>("1");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFolder = (id: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpanded(newExpanded);
  };

  // Helper function to find a folder by ID in the folder tree
  const selectedFolder = selected
    ? findFolder(initialFolders, selected)
    : null;

  function findFolder(folders: FolderNode[], id: string): FolderNode | null {
    for (const folder of folders) {
      if (folder.id === id) return folder;
      if (folder.children) {
        const found = findFolder(folder.children, id);
        if (found) return found;
      }
    }
    return null;
  }

  return (
    <div className="grid grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
      <div className="col-span-1 bg-shopify-surface border border-shopify-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-shopify-border">
          <div className="relative">
            <Search 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-shopify-icon-subdued" 
            />
            <Input
              placeholder="Search folders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 border-shopify-border-subdued"
            />
          </div>
        </div>
        <div className="overflow-auto h-[calc(100%-5rem)]">
          {initialFolders.map((folder) => (
            <FolderItem
              key={folder.id}
              folder={folder}
              level={0}
              expanded={expanded}
              selected={selected}
              onToggle={toggleFolder}
              onSelect={setSelected}
            />
          ))}
        </div>
      </div>
      <div className="col-span-2 bg-shopify-surface border border-shopify-border rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Folder Details</h2>
        <FolderDetails folder={selectedFolder} />
      </div>
    </div>
  );
};

export default Folders;
