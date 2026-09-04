import Image from "next/image";

export interface ProjectImage {
  id: string;
  url: string;
  publicId: string;
}

interface ProjectDetailProps {
  title: string;
  images: ProjectImage[];
}

export default function ProjectDetail({
  title,
  images,
}: ProjectDetailProps) {
  return (
    <main className="min-h-screen bg-background pt-0 md:pt-24 lg:pt-32">
      <section className="mx-auto w-full md:max-w-5xl lg:max-w-6xl xl:max-w-7xl rounded-xl overflow-hidden shadow-2xl">
        {images.map((image) => (
          <Image
            key={image.id}
            src={image.url}
            alt={title}
            width={2400}
            height={2400}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 1024px, 1400px"
            loading="lazy"
            className="block w-full h-auto border-0 outline-none"
          />
        ))}
      </section>
    </main>
  );
}