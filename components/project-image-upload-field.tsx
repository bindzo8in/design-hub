"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";

import { ImageIcon, Upload, X } from "lucide-react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

declare global {
  interface Window {
    cloudinary?: {
      createUploadWidget: (
        options: CloudinaryWidgetOptions,
        callback: CloudinaryWidgetCallback,
      ) => CloudinaryWidget;
    };
  }
}

interface CloudinaryWidgetOptions {
  cloudName: string;
  uploadPreset: string;
  folder?: string;
  multiple?: boolean;
  maxFiles?: number;
  resourceType?: string;
  clientAllowedFormats?: string[];
  maxFileSize?: number;
  sources?: string[];
  showAdvancedOptions?: boolean;
  cropping?: boolean;
}

interface CloudinaryUploadInfo {
  secure_url?: string;
  public_id?: string;
  original_filename?: string;
  format?: string;
  resource_type?: string;
}

interface CloudinaryUploadResult {
  event: string;
  info?: CloudinaryUploadInfo;
}

type CloudinaryWidgetCallback = (
  error: unknown,
  result: CloudinaryUploadResult,
) => void;

interface CloudinaryWidget {
  open: () => void;
  close: () => void;
  destroy: () => void;
}

export interface ProjectImageValue {
  url: string;
  publicId: string;
}

interface ProjectImageUploadFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: string;
  folder?: string;
  maxFiles?: number;
  disabled?: boolean;
}

export function ProjectImageUploadField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  label = "Project Images",
  folder = "projects/images",
  maxFiles = 20,
  disabled = false,
}: ProjectImageUploadFieldProps<TFieldValues, TName>) {
  const widgetRef = useRef<CloudinaryWidget | null>(null);

  /*
   * IMPORTANT:
   * Keep latest images here because Cloudinary can fire
   * multiple success callbacks very quickly.
   */
  const imagesRef = useRef<ProjectImageValue[]>([]);

  const [widgetReady, setWidgetReady] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { field } = useController({
    control,
    name,
  });

  const images: ProjectImageValue[] = Array.isArray(field.value)
    ? field.value
    : [];

  /*
   * Keep ref synchronized with React Hook Form
   *
   * IMPORTANT:
   * This is a TOP-LEVEL useEffect.
   * Do NOT put this inside another useEffect.
   */
  useEffect(() => {
    imagesRef.current = Array.isArray(field.value)
      ? field.value
      : [];
  }, [field.value]);

  /*
   * Restore page scrolling after Cloudinary closes
   */
  const restorePageScroll = () => {
    document.body.style.overflow = "";
    document.body.style.removeProperty("padding-right");

    document.documentElement.style.overflow = "";
  };

  /*
   * Load Cloudinary Upload Widget
   */
  useEffect(() => {
    if (window.cloudinary) {
      setWidgetReady(true);
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://upload-widget.cloudinary.com/global/all.js"]',
    );

    if (existingScript) {
      const handleLoad = () => {
        setWidgetReady(true);
      };

      existingScript.addEventListener("load", handleLoad);

      return () => {
        existingScript.removeEventListener(
          "load",
          handleLoad,
        );
      };
    }

    const script = document.createElement("script");

    script.src =
      "https://upload-widget.cloudinary.com/global/all.js";

    script.async = true;

    script.onload = () => {
      setWidgetReady(true);
    };

    script.onerror = () => {
      console.error(
        "Failed to load Cloudinary Upload Widget",
      );

      setWidgetReady(false);
    };

    document.body.appendChild(script);

    return () => {
      script.onload = null;
      script.onerror = null;
    };
  }, []);

  /*
   * Open Cloudinary Upload Widget
   */
  const openWidget = () => {
    if (!window.cloudinary) {
      console.error(
        "Cloudinary Upload Widget is not loaded.",
      );
      return;
    }

    const cloudName =
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    const uploadPreset =
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      console.error(
        "Missing Cloudinary environment variables.",
      );
      return;
    }

    /*
     * Destroy previous widget
     */
    if (widgetRef.current) {
      widgetRef.current.destroy();
      widgetRef.current = null;

      restorePageScroll();
    }

    /*
     * Get latest images
     */
    const currentImages = imagesRef.current;

    const remainingFiles = Math.max(
      maxFiles - currentImages.length,
      0,
    );

    if (remainingFiles <= 0) {
      return;
    }

    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName,
        uploadPreset,

        folder,

        multiple: true,
        maxFiles: remainingFiles,

        resourceType: "image",

        clientAllowedFormats: [
          "jpg",
          "jpeg",
          "png",
          "webp",
        ],

        maxFileSize: 10 * 1024 * 1024,

        sources: [
          "local",
          "url",
          "camera",
        ],

        showAdvancedOptions: false,
        cropping: false,
      },

      (error, result) => {
        /*
         * Cloudinary error
         */
        if (error) {
          console.error(
            "Cloudinary upload error:",
            error,
          );

          setUploading(false);
          restorePageScroll();

          return;
        }

        if (!result) {
          return;
        }

        /*
         * Upload started
         */
        if (result.event === "upload-added") {
          setUploading(true);
        }

        /*
         * Individual upload completed
         *
         * This callback can execute multiple times:
         *
         * image 1 → success
         * image 2 → success
         * image 3 → success
         * image 4 → success
         */
        if (
          result.event === "success" &&
          result.info?.secure_url &&
          result.info?.public_id
        ) {
          const newImage: ProjectImageValue = {
            url: result.info.secure_url,
            publicId: result.info.public_id,
          };

          /*
           * ALWAYS read from ref.
           *
           * Do not use `images` here because it can
           * contain stale React state.
           */
          const latestImages = imagesRef.current;

          const alreadyExists = latestImages.some(
            (image) =>
              image.publicId === newImage.publicId,
          );

          if (alreadyExists) {
            return;
          }

          const updatedImages = [
            ...latestImages,
            newImage,
          ];

          /*
           * Update ref immediately
           */
          imagesRef.current = updatedImages;

          /*
           * Update React Hook Form
           */
          field.onChange(updatedImages);
        }

        /*
         * All uploads completed
         */
        if (result.event === "queues-end") {
          setUploading(false);

          restorePageScroll();
        }

        /*
         * Widget closed
         */
        if (result.event === "close") {
          setUploading(false);

          restorePageScroll();
        }
      },
    );

    widgetRef.current = widget;

    widget.open();
  };

  /*
   * Remove image
   */
  const removeImage = (publicId: string) => {
    const updatedImages =
      imagesRef.current.filter(
        (image) => image.publicId !== publicId,
      );

    imagesRef.current = updatedImages;

    field.onChange(updatedImages);
  };

  /*
   * Widget cleanup
   */
  useEffect(() => {
    return () => {
      if (widgetRef.current) {
        widgetRef.current.destroy();
        widgetRef.current = null;
      }

      restorePageScroll();
    };
  }, []);

  const canUpload =
    !disabled &&
    !uploading &&
    widgetReady &&
    images.length < maxFiles;

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormLabel className="text-slate-200">
            {label}
          </FormLabel>

          <FormControl>
            <div className="space-y-4">
              {/*
               * IMAGE GRID
               */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {images.map((image, index) => (
                    <div
                      key={image.publicId}
                      className="group relative overflow-hidden rounded-xl border border-[#26336F]/30 bg-[#101735]/40"
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={image.url}
                          alt={`Project image ${
                            index + 1
                          }`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      </div>

                      {/*
                       * REMOVE
                       */}
                      <button
                        type="button"
                        onClick={() =>
                          removeImage(
                            image.publicId,
                          )
                        }
                        disabled={
                          disabled || uploading
                        }
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100 disabled:cursor-not-allowed"
                        aria-label={`Remove image ${
                          index + 1
                        }`}
                      >
                        <X className="h-4 w-4" />
                      </button>

                      {/*
                       * IMAGE NUMBER
                       */}
                      <div className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-1 text-[10px] text-white">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/*
               * UPLOAD BUTTON
               */}
              {images.length < maxFiles && (
                <button
                  type="button"
                  onClick={openWidget}
                  disabled={!canUpload}
                  className="flex min-h-[160px] w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[#26336F]/40 bg-[#101735]/30 px-6 py-8 text-center transition hover:border-[#26336F] hover:bg-white/[0.03] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#26336F]/20">
                    {uploading ? (
                      <Upload className="h-5 w-5 animate-pulse text-slate-300" />
                    ) : (
                      <ImageIcon className="h-5 w-5 text-slate-300" />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-200">
                      {uploading
                        ? "Uploading images..."
                        : images.length > 0
                          ? "Add More Images"
                          : "Upload Project Images"}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      JPG, PNG or WebP • Max 10MB
                      each
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      {images.length} /{" "}
                      {maxFiles} images
                    </p>
                  </div>
                </button>
              )}

              {/*
               * MAX FILES
               */}
              {images.length >= maxFiles && (
                <p className="text-xs text-slate-500">
                  Maximum of {maxFiles} project
                  images reached.
                </p>
              )}
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}