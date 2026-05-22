// components/common/ServiceShowcase.tsx

import React from "react";

interface ServiceItem {
  title: string;
  desc: string;
  image: string;
}

interface FeatureItem {
  title: string;
  description: string;
}

interface ServiceShowcaseProps {
  title: string;
  backgroundImage: string;
  services: ServiceItem[];
  features?: FeatureItem[];
  description?: string;
}

const ServiceShowcase = ({
  title,
  backgroundImage,
  services,
  features,
  description,
}: ServiceShowcaseProps) => {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat py-12 lg:py-20"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Content */}
      <div className="relative z-10">
        {/* Heading */}
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl font-bold uppercase tracking-wide text-white sm:text-4xl lg:text-5xl">
            {title}
          </h2>

          {description && (
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
              {description}
            </p>
          )}
        </div>

        {/* Services */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-10">
          <div className="flex flex-wrap items-stretch justify-center gap-8">
            {services.map((item) => (
              <div
                key={item.title}
                className="
                  w-full
                  sm:w-[320px]
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/10
                  p-8
                  shadow-xl
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:bg-white/15
                "
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="mx-auto mb-6 h-24 w-24 object-contain"
                />

                <h3 className="text-center text-xl font-bold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-center leading-7 text-white/70">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        {features && (
          <div className="mx-auto mt-10 max-w-5xl px-4">
            <div
              className="
                grid
                grid-cols-1
                gap-8
                rounded-[2.5rem]
                bg-[#d9d9d9]
                px-8
                py-10
                text-black
                sm:grid-cols-2
                lg:grid-cols-4
                lg:gap-10
                lg:px-12
              "
            >
              {features.map((item, index) => (
                <div key={index} className="relative">
                  {index !== features.length - 1 && (
                    <div className="absolute right-[-20px] top-0 hidden h-full w-px bg-black/10 lg:block" />
                  )}

                  <h4 className="border-b border-black/10 pb-4 text-xl font-semibold leading-tight">
                    {item.title}
                  </h4>

                  <p className="mt-4 text-sm leading-6 text-black/60">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServiceShowcase;