"use client";

import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, PlusCircle, X } from "lucide-react";

interface Option {
  id: string;
  name: string;
}

interface MultiCreatableComboboxProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  onCreate: (name: string) => Promise<Option | null>;
  placeholder?: string;
  emptyText?: string;
}

export function MultiCreatableCombobox({
  options,
  value,
  onChange,
  onCreate,
  placeholder = "Select options...",
  emptyText = "No option found.",
}: MultiCreatableComboboxProps) {
  const [localOptions, setLocalOptions] = React.useState<Option[]>(options);
  const [isCreating, setIsCreating] = React.useState(false);

  React.useEffect(() => {
    setLocalOptions(options);
  }, [options]);

  const handleValueChange = async (val: string) => {
    if (val === "CREATE_NEW") {
      const name = window.prompt("Enter new tag name:");
      if (!name || !name.trim()) return;

      const existing = localOptions.find((opt) => opt.name.toLowerCase() === name.trim().toLowerCase());
      if (existing) {
        if (!value.includes(existing.id)) {
          onChange([...value, existing.id]);
        }
        return;
      }

      try {
        setIsCreating(true);
        const newOption = await onCreate(name.trim());
        if (newOption) {
          setLocalOptions((prev) => [...prev, newOption]);
          onChange([...value, newOption.id]);
        }
      } catch (error) {
        console.error("Failed to create option:", error);
      } finally {
        setIsCreating(false);
      }
    } else {
      if (!value.includes(val)) {
        onChange([...value, val]);
      }
    }
  };

  const handleRemove = (e: React.MouseEvent, idToRemove: string) => {
    e.preventDefault();
    e.stopPropagation();
    onChange(value.filter((id) => id !== idToRemove));
  };

  const selectedOptions = localOptions.filter((opt) => value.includes(opt.id));
  const availableOptions = localOptions.filter((opt) => !value.includes(opt.id));

  return (
    <div className="space-y-3">
      {selectedOptions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedOptions.map((opt) => (
            <Badge
              key={opt.id}
              variant="secondary"
              className="bg-[#26336F]/60 hover:bg-[#26336F]/80 text-white border-none rounded-md pr-1.5 py-1"
            >
              {opt.name}
              <div
                role="button"
                className="ml-1 ring-offset-background rounded-full outline-none hover:bg-[#DF1B25]/50 p-0.5 transition-colors cursor-pointer"
                onClick={(e) => handleRemove(e, opt.id)}
              >
                <X className="h-3 w-3 text-white" />
              </div>
            </Badge>
          ))}
        </div>
      )}

      <Select value="" onValueChange={handleValueChange} disabled={isCreating}>
        <SelectTrigger className="w-full bg-[#101735] border-[#26336F]/50 text-white rounded-xl h-10 px-3">
          {isCreating ? (
            <div className="flex items-center text-slate-400">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating...
            </div>
          ) : (
            <SelectValue placeholder={selectedOptions.length > 0 ? "Add more..." : placeholder} />
          )}
        </SelectTrigger>
        <SelectContent className="bg-[#0b1228] border-[#26336F]/50 text-white rounded-xl max-h-[300px]">
          {availableOptions.length === 0 && (
            <div className="py-2 text-center text-sm text-slate-400">{emptyText}</div>
          )}
          {availableOptions.map((opt) => (
            <SelectItem key={opt.id} value={opt.id} className="cursor-pointer focus:bg-[#26336F]/50 focus:text-white">
              {opt.name}
            </SelectItem>
          ))}
          <SelectItem 
            value="CREATE_NEW" 
            className="cursor-pointer text-[#DF1B25] font-medium border-t border-[#26336F]/30 mt-1 focus:bg-[#26336F]/50 focus:text-[#DF1B25]"
          >
            <div className="flex items-center">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New...
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
