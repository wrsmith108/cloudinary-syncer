
/**
 * Main folders page component displaying the folder hierarchy and details.
 * 
 * Architecture:
 * - Uses a two-panel layout: folder tree on left, details on right
 * - Maintains expanded/collapsed state for folder tree
 * - Implements search functionality for folders
 * - Shows folder details in right panel when selected
 * 
 * State Management:
 * - expanded: Set of folder IDs that are currently expanded
 * - selected: Currently selected folder ID
 * - searchQuery: Current search term for filtering folders
 * 
 * Component Hierarchy:
 * - FolderSearch: Search input for filtering folders
 * - FolderItem: Recursive component for rendering folder tree
 * - FolderDetails: Details panel for selected folder
 * 
 * Assumptions:
 * - Folders data structure is hierarchical
 * - Each folder has a unique ID
 * - Initial expanded state includes folders "1" and "2"
 * - Folder "1" is initially selected
 */
import React, { useState } from "react";
import FolderDetails from "@/components/FolderDetails";
import FolderItem from "@/components/FolderItem";
import FolderSearch from "@/components/FolderSearch";
import { FolderNode } from "@/types/folder";
import { initialFolders } from "@/data/mockFolders";

const findFolder = (folders: FolderNode[], id: string): FolderNode | null => {
  for (const folder of folders) {
    if (folder.id === id) return folder;
    if (folder.children) {
      const found = findFolder(folder.children, id);
      if (found) return found;
    }
  }
  return null;
};

const Folders = () => {
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

  const selectedFolder = selected ? findFolder(initialFolders, selected) : null;

  return (
    <div className="grid grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
      <div className="col-span-1 bg-shopify-surface border border-shopify-border rounded-lg overflow-hidden">
        <FolderSearch value={searchQuery} onChange={setSearchQuery} />
        <div className="px-4 py-2 border-b border-shopify-border">
          <h3 className="font-medium text-shopify-text">Recent</h3>
        </div>
        <div className="overflow-auto h-[calc(100%-8rem)]">
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
