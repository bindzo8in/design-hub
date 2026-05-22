"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps extends React.ComponentProps<typeof Button> {
  loading: boolean;
  children: React.ReactNode;
}

export function SubmitButton({
  loading,
  children,
  className,
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={loading || props.disabled}
      className={className}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin text-current" />}
      {children}
    </Button>
  );
}
