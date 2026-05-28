import Image from "next/image";
import React from "react";

const KeyFeaturesSection = () => {
  const list = [
    "Fast-loading and performance-optimized pages",
    "SEO-friendly structure and clean code",
    "Clear calls-to-action for higher conversions",
    "Brand-consistent visuals and messaging",
    "Secure and scalable design framework",
  ];
  return (
    <section className="container mx-auto px-4 py-16 flex flex-col md:flex-row gap-12 items-center justify-center">
      <div className="relative w-full max-w-lg relative">
        <Image
          src="/service/1915.gif"
          alt="Web Development"
          width={1003}
          height={388}
          className="w-full h-auto object-contain opacity-20"
        />
        <h4 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl md:text-5xl font-bold text-white text-start">
          <span className="text-glow-white font-extrabold text-8xl">KEY</span><br />
          <span className="text-primary"> FEATURES</span>
        </h4>
      </div>
      <div>
        <ul className="space-y-4 list-disc list-inside">
          {list.map((item, index) => (
            <li key={index}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default KeyFeaturesSection;
