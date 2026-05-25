"use client";

import { useEffect, useRef, useState } from "react";
import { useController, type Control, type FieldValues, type Path } from "react-hook-form";
import { ImagePlus, Loader2, Trash2, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ImageUploadFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues, any, any>;
  name: Path<TFieldValues>;
  label: string;
  description?: string;
  disabled?: boolean;
  accept?: string;
  maxSizeMB?: number;
  folder?: string;
  previewAlt?: string;
}

const defaultAccept = "image/*";
const defaultMaxSizeMB = 5;

export function ImageUploadField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  disabled = false,
  accept = defaultAccept,
  maxSizeMB = defaultMaxSizeMB,
  folder = "design-hub",
  previewAlt = "Uploaded asset preview",
}: ImageUploadFieldProps<TFieldValues>) {
  const { field } = useController({ control, name });
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

useEffect(() => {
  if (!field.value) {
    setPreviewUrl("");
    return;
  }

  // if value is object
  if (typeof field.value === "object" && field.value.url) {
    setPreviewUrl(field.value.url);
    return;
  }

  // fallback if string
  if (typeof field.value === "string") {
    setPreviewUrl(field.value);
    return;
  }

  setPreviewUrl("");
}, [field.value]);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setStatusMessage(null);

    if (!file.type.startsWith("image/")) {
      setStatusMessage("Please select an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      setStatusMessage(`Maximum size is ${maxSizeMB}MB.`);
      event.target.value = "";
      return;
    }

    setIsUploading(true);

    const currentValue = field.value;


    try {

      if (currentValue?.publicId) {
        await fetch("/api/admin/upload/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            publicId: currentValue.publicId,
          }),
        });
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Upload failed.");
      }

      field.onChange({
        url: data.url,
        publicId: data.publicId,
      });

      setPreviewUrl(data.url);
      setStatusMessage("Image uploaded successfully.");
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setIsUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  const handleRemove = async () => {
    try {
      setIsUploading(true);

      const currentValue = field.value;

      if (currentValue?.publicId) {
        await fetch("/api/admin/upload/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            publicId: currentValue.publicId,
          }),
        });
      }

      field.onChange(null);

      setPreviewUrl("");

      setStatusMessage("Image removed successfully.");
    } catch (error) {
      setStatusMessage("Failed to remove image.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-300">{label}</p>
          {description ? (
            <p className="text-xs text-slate-400 mt-1">{description}</p>
          ) : null}
        </div>
        {previewUrl ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Uploaded
          </span>
        ) : null}
      </div>

      <div className="rounded-2xl border border-[#26336F]/30 bg-[#101735]/40 p-3">
        {previewUrl ? (
          <div className="space-y-3">
            <img
              src={previewUrl}
              alt={previewAlt}
              className="h-40 w-full rounded-xl object-cover"
            />
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => inputRef.current?.click()}
                disabled={disabled || isUploading}
                className="border-[#26336F]/30 bg-transparent text-slate-200 hover:bg-white/5"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading
                  </>
                ) : (
                  <>
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Replace Image
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={handleRemove}
                disabled={disabled || isUploading}
                className="text-slate-300 hover:text-white"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <label className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[#26336F]/50 bg-[#0b1228]/70 px-4 py-8 text-center">
            <div className="rounded-full bg-[#DF1B25]/10 p-3 text-[#DF1B25]">
              <ImagePlus className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Upload an image</p>
              <p className="text-xs text-slate-400 mt-1">
                PNG, JPG, WEBP, or GIF • up to {maxSizeMB}MB
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              className="border-[#DF1B25]/40 bg-[#DF1B25]/10 text-white hover:bg-[#DF1B25]/20"
              disabled={disabled || isUploading}
              onClick={() => inputRef.current?.click()}
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading
                </>
              ) : (
                <>
                  <UploadCloud className="mr-2 h-4 w-4" />
                  Choose Image
                </>
              )}
            </Button>
            <Input
              ref={inputRef}
              type="file"
              accept={accept}
              className="hidden"
              onChange={handleFileChange}
              disabled={disabled || isUploading}
            />
          </label>
        )}
      </div>

      {statusMessage ? (
        <p className={`text-xs ${statusMessage.includes("successfully") ? "text-emerald-300" : "text-[#DF1B25]"}`}>
          {statusMessage}
        </p>
      ) : null}
    </div>
  );
}
