
/**
 * Search input component for filtering folders.
 * 
 * Features:
 * - Provides search input with icon
 * - Updates parent component with search term
 * - Styled to match Shopify design system
 * 
 * Props:
 * - value: Current search term
 * - onChange: Callback for search term updates
 * 
 * Styling:
 * - Uses shadcn/ui Input component
 * - Search icon positioned absolutely
 * - Consistent with Shopify border colors
 */
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FolderSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const FolderSearch: React.FC<FolderSearchProps> = ({ value, onChange }) => {
  return (
    <div className="p-4 border-b border-shopify-border">
      <div className="relative">
        <Search 
          size={16} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-shopify-icon-subdued" 
        />
        <Input
          placeholder="Search folders..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-9 border-shopify-border-subdued"
        />
      </div>
    </div>
  );
};

export default FolderSearch;
