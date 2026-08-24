"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ProjectDetail from "./project-detail";

interface ProjectImage {
  id: string;
  url: string;
  publicId: string;
}

interface ProjectDetailModalProps {
  title: string;
  images: ProjectImage[];
}

export default function ProjectDetailModal({
  title,
  images,
}: ProjectDetailModalProps) {
  return (
    <Dialog open>
      <DialogContent
        className="
          !w-[95vw]
          !max-w-[1600px]
          h-[95vh]
          p-0
          border-0
          outline-none
          ring-0
          shadow-none
          rounded-none
          overflow-y-auto
          overflow-x-hidden
          scrollbar-hide
          no-scrollbar
          bg-transparent!
        "
        showCloseButton={false}
      >

        <DialogTitle className="sr-only">
          {title}
        </DialogTitle>

        <ProjectDetail
          title={title}
          images={images}
        />
      </DialogContent>
    </Dialog>
  );
}