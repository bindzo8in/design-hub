import React from "react";
import InfoCard from "./info-card";

const CardsSection = () => {
  const data = [
    {
      title: "Business-Oriented Design Approach",
      description:
        "We design with your business goals in mind, ensuring every visual supports growth, clarity, and measurable results.",
      image: "/service/card/1.webp",
    },
    {
      title: "Strong Focus On Brand Identity",
      description:
        "We build designs that reflect your brand's personality, values, and voice, creating a strong and recognizable identity.",
      image: "/service/card/2.jpg",
    },
    {
      title: "Consistency Across All Platforms",
      description:
        "We maintain visual consistency across print, digital, and outdoor media to strengthen brand recognition everywhere.",
      image: "/service/card/1.jpg",
    },
  ];

  return (
    <section className="overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-12 lg:py-24">
      <div
        className="
          mx-auto
          grid
          max-w-7xl
          grid-cols-1
          gap-6
          sm:grid-cols-2
          lg:grid-cols-3
          lg:gap-8
        "
      >
        {data.map((item, index) => (
          <InfoCard
            key={index}
            title={item.title}
            description={item.description}
            image={item.image}
          />
        ))}
      </div>
    </section>
  );
};

export default CardsSection;

// import React from "react";
// import InfoCard from "./info-card";

// const CardsSection = () => {
//   const data = [
//     {
//       title: "Business-Oriented Design Approach",
//       description:
//         "We design with your business goals in mind, ensuring every visual supports growth, clarity, and measurable results.",
//       image: "/tmp/card_placeholder.webp",
//     },
//     {
//       title: "Strong Focus On Brand Identity",
//       description:
//         "We build designs that reflect your brand's personality, values, and voice, creating a strong and recognizable identity.",
//       image: "/tmp/card_placeholder.webp",
//     },
//     {
//       title: "Consistency Across All Platforms",
//       description:
//         "We maintain visual consistency across print, digital, and outdoor media to strengthen brand recognition everywhere.",
//       image: "/tmp/card_placeholder.webp",
//     },
//   ];

//   return (
//     <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-16 min-h-screen overflow-hidden">
//       <div
//         className="
//           flex flex-wrap justify-center
//           gap-6 lg:gap-8
//         "
//       >
//         {data.map((item, index) => (
//           <InfoCard
//             key={index}
//             title={item.title}
//             description={item.description}
//             image={item.image}
//           />
//         ))}
//       </div>
//     </section>
//   );
// };

// export default CardsSection;