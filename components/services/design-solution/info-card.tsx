import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

interface InfoCardProps {
  title: string;
  description: string;
  image: string;
}

const InfoCard = ({
  title,
  description,
  image,
}: InfoCardProps) => {
  return (
    <Card
      className="
        group
        relative
        h-[420px]
        w-full
        max-w-[280px]
        overflow-hidden
        rounded-3xl
        border-0
        shrink-0
      "
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="
          absolute inset-0
          z-20
          object-cover

          translate-x-8 translate-y-48
          group-hover:translate-x-0
          group-hover:translate-y-0

          transition-transform
          duration-1000
          ease-in-out
        "
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-start">
        <CardHeader className="space-y-3 p-5 sm:p-6">
          <CardTitle className="text-sm font-light leading-relaxed text-white sm:text-base">
            {title}
          </CardTitle>

          <CardDescription className="text-xs font-extralight leading-relaxed text-white/80 sm:text-sm">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent />
      </div>
    </Card>
  );
};

export default InfoCard;