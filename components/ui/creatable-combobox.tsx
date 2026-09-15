"use client";

import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, PlusCircle } from "lucide-react";

interface Option {
  id: string;
  name: string;
}

interface CreatableComboboxProps {
  options: Option[];
  value: string | undefined;
  onChange: (value: string) => void;
  onCreate: (name: string) => Promise<Option | null>;
  placeholder?: string;
  emptyText?: string;
}

export function CreatableCombobox({
  options,
  value,
  onChange,
  onCreate,
  placeholder = "Select an option...",
  emptyText = "No option found.",
}: CreatableComboboxProps) {
  const [localOptions, setLocalOptions] = React.useState<Option[]>(options);
  const [isCreating, setIsCreating] = React.useState(false);

  React.useEffect(() => {
    setLocalOptions(options);
  }, [options]);

  const handleValueChange = async (val: string) => {
    if (val === "CREATE_NEW") {
      const name = window.prompt("Enter new category name:");
      if (!name || !name.trim()) return;

      const existing = localOptions.find((opt) => opt.name.toLowerCase() === name.trim().toLowerCase());
      if (existing) {
        onChange(existing.id);
        return;
      }

      try {
        setIsCreating(true);
        const newOption = await onCreate(name.trim());
        if (newOption) {
          setLocalOptions((prev) => [...prev, newOption]);
          onChange(newOption.id);
        }
      } catch (error) {
        console.error("Failed to create option:", error);
      } finally {
        setIsCreating(false);
      }
    } else {
      onChange(val);
    }
  };

  return (
    <Select value={value || ""} onValueChange={handleValueChange} disabled={isCreating}>
      <SelectTrigger className="w-full bg-[#101735] border-[#26336F]/50 text-white rounded-xl h-10 px-3">
        {isCreating ? (
          <div className="flex items-center text-slate-400">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating...
          </div>
        ) : (
          <SelectValue placeholder={placeholder} />
        )}
      </SelectTrigger>
      <SelectContent className="bg-[#0b1228] border-[#26336F]/50 text-white rounded-xl">
        {localOptions.length === 0 && (
          <div className="py-2 text-center text-sm text-slate-400">{emptyText}</div>
        )}
        {localOptions.map((opt) => (
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
  );
}
