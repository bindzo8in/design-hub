import Image from "next/image";
import React from "react";

const ServicesSection = () => {
  const list = [
    {
      title: "Custom Website Design",
      desc: "Unique layouts tailored to your brand and business needs",
    },
    {
      title: "Responsive Design",
      desc: "Optimized for all screen sizes and devices",
    },
    {
      title: "User Experience (UX) Design",
      desc: "Easy navigation and clear user journeys",
    },
    {
      title: "User Interface (UI) Design",
      desc: "Clean, modern visuals with strong branding",
    },
    {
      title: "Landing Page Design",
      desc: "Conversion-focused pages for campaigns and promotions",
    },
    {
      title: "Website Redesign",
      desc: "Modernizing existing websites for better performance",
    },
  ];
  return (
    <section className="container mx-auto px-4 py-16 flex flex-col md:flex-row gap-12 items-center justify-center">
      <div>
        <ul className="space-y-4">
          {list.map((item, index) => (
            <li key={index} className="flex gap-3 items-start">
              <img
                src="/service/arrow.svg"
                alt="icon"
                className="w-4 h-4 mt-1 shrink-0"
              />

              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full max-w-lg">
        <Image
          src="/service/web-design.webp"
          alt="Web Development"
          width={1003}
          height={388}
          className="w-full h-auto object-contain"
        />
      </div>
    </section>
  );
};

export default ServicesSection;
