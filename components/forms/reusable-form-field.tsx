"use client";

import React from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReusableFormFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues, any, any>;
  name: TName;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "textarea" | "switch" | "select" | "date";
  description?: string;
  options?: { label: string; value: string }[];
  disabled?: boolean;
}

export function ReusableFormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  description,
  options,
  disabled,
}: ReusableFormFieldProps<TFieldValues, TName>) {
  return (
    <FormField
      control={control as any}
      name={name as any}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-slate-300 font-semibold text-sm">
            {label}
          </FormLabel>
          <FormControl>
            {type === "textarea" ? (
              <Textarea
                placeholder={placeholder}
                disabled={disabled}
                {...field}
                className="bg-[#101735]/40 border-[#26336F]/30 text-white placeholder-slate-500 rounded-xl focus:border-[#DF1B25]/50 focus:ring-[#DF1B25]/20 focus-visible:border-[#DF1B25]/50 min-h-[100px]"
              />
            ) : type === "switch" ? (
              <div className="flex items-center h-9">
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={disabled}
                />
              </div>
            ) : type === "select" ? (
              <Select
                disabled={disabled}
                onValueChange={field.onChange}
                value={field.value}
              >
                <SelectTrigger className="w-full bg-[#101735]/40 border-[#26336F]/30 text-white rounded-xl focus:border-[#DF1B25]/50 focus:ring-[#DF1B25]/20">
                  <SelectValue placeholder={placeholder || "Select option"} />
                </SelectTrigger>
                <SelectContent className="bg-[#101735] border-[#26336F]/30 text-white rounded-xl">
                  {options?.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      className="focus:bg-white/5 focus:text-white cursor-pointer rounded-lg"
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                {...field}
                className="bg-[#101735]/40 border-[#26336F]/30 text-white placeholder-slate-500 rounded-xl focus:border-[#DF1B25]/50 focus:ring-[#DF1B25]/20 focus-visible:border-[#DF1B25]/50"
              />
            )}
          </FormControl>
          {description && (
            <FormDescription className="text-slate-400 text-xs">
              {description}
            </FormDescription>
          )}
          <FormMessage className="text-[#DF1B25] text-xs font-semibold" />
        </FormItem>
      )}
    />
  );
}
