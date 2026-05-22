import React from "react";

const OutDoor = () => {
  const data = [
    {
      title: "Hoardings & Billboards",
      desc: "Large-format visuals for maximum reach",
      image: "/service/outdoor/mdi_billboard.svg",
    },
    {
      title: "Flex & Banner Displays",
      desc: "Cost-effective and high-visibility solutions",
      image: "/service/outdoor/material-symbols_flex-wrap.svg",
    },
    {
      title: "Bus Stops & Shelter Ads",
      desc: "Targeted exposure in high-footfall areas",
      image: "/service/outdoor/roentgen_shelter.svg",
    },
    {
      title: "Street & Roadside Branding",
      desc: "Continuous brand presence in key locations",
      image: "/service/outdoor/streamline-sharp_street-sign-solid.svg",
    },
    {
      title: "Transit Advertisements",
      desc: "Bus, auto, and mobile van branding",
      image: "/service/outdoor/temaki_transit.svg",
    },
  ];

  const features = [
    {
      title: "High Visibility",
      description:
        "Outdoor advertising places your brand in busy public spaces, ensuring maximum exposure to a wide audience.",
    },
    {
      title: "Strong Brand Recall",
      description:
        "Repeated visual exposure helps audiences remember your brand easily and for longer periods.",
    },
    {
      title: "Wide Reach",
      description:
        "Outdoor ads reach diverse audiences across locations, making them ideal for mass awareness campaigns.",
    },
    {
      title: "Digital Campaigns",
      description:
        "Outdoor advertising strengthens digital marketing by reinforcing brand presence offline.",
    },
  ];

  return (
    <>
      <section
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat py-8 pb-20"
        style={{
          backgroundImage: "url('/service/outdoor-bg.webp')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/80" />

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-center text-4xl uppercase">
            outdoor advertising services
          </h3>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-12">
            <div className="flex flex-wrap justify-center items-stretch gap-8">
              {data.map((item) => (
                <div
                  key={item.title}
                  className="
    w-full
    sm:w-[320px]
    bg-white/10
    backdrop-blur-md
    border border-white/10
    rounded-2xl
    p-8
    shadow-xl
    transition-all
    duration-300
    hover:-translate-y-2
    hover:bg-white/15
  "
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="mx-auto h-24 w-24 object-contain mb-6"
                  />
                  <h4 className="text-xl font-bold text-center">
                    {item.title}
                  </h4>
                  <p className="text-center">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="w-full px-4 py-16 mt-12"></div> */}
        </div>
      </section>

          <p className="text-center font-light max-w-2xl mx-auto my-8 text-white">
            Our team manages the entire process—from concept and design to
            production and execution—ensuring consistency, quality, and
            effectiveness across all outdoor formats. Our team manages the
            entire process—from concept and design to production and
            execution—ensuring consistency, quality, and effectiveness across
            all outdoor formats.
          </p>
      <section
        className="
      mx-auto
      grid
      max-w-5xl
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
            {/* Divider */}
            {index !== features.length - 1 && (
              <div className="absolute right-[-20px] top-0 hidden h-full w-px bg-black/10 lg:block" />
            )}

            <h3 className="text-xl font-semibold leading-tight border-b border-black/10 pb-4">
              {item.title}
            </h3>

            <p className="mt-4 text-sm leading-6 text-black/60">
              {item.description}
            </p>
          </div>
        ))}
      </section>
    </>
  );
};

export default OutDoor;
