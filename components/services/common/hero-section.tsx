"use client";

import Image from "next/image";

interface HeroSectionProps {
  title: string;
  heading: string;
  description: string;
  bottomLabel: string;

  image: string;
  backgroundImage: string;

  glowColor?: string;
}

const HeroSection = ({
  title,
  heading,
  description,
  bottomLabel,
  image,
  backgroundImage,
  glowColor = "bg-cyan-400/20",
}: HeroSectionProps) => {
  return (
    <section
      className="
        relative overflow-hidden
        min-h-screen
        bg-cover bg-center bg-no-repeat
        flex flex-col justify-center
        px-4 sm:px-6 md:px-10 lg:px-16
        pb-10
      "
      style={{
        backgroundImage: `url('${backgroundImage}')`,
      }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0f0c29, #0d113d, #0a1351, #071466, #07137b)",
        }}
      />

      <div className="container mx-auto flex flex-1 flex-col justify-center">
        {/* Top Title */}
        <h1
          className="
            text-glow-white
            z-20
            text-center
            text-2xl
            font-bold
            tracking-wide

            sm:text-3xl
            md:text-4xl
            lg:text-5xl
          "
        >
          {title}
        </h1>

        {/* Hero Content */}
        <div
          className="
            z-20
            mt-10 lg:mt-16
            grid items-center gap-10 lg:gap-6
            lg:grid-cols-2
          "
        >
          {/* Left Content */}
          <div
            className="
              order-2 lg:order-1
              flex flex-col gap-4 lg:gap-3
              text-center lg:text-left
            "
          >
            <h2
              className="
                text-3xl
                font-bold
                leading-tight

                sm:text-4xl
                md:text-5xl
                lg:text-6xl
                xl:text-7xl
              "
            >
              {heading}
            </h2>

            <p
              className="
                text-sm
                font-light
                leading-relaxed
                text-muted-foreground

                sm:text-base
                md:text-lg
              "
            >
              {description}
            </p>
          </div>

          {/* Right Image */}
          <div
            className="
              order-1 lg:order-2
              relative flex justify-center
              animate-float
            "
          >
            {/* Glow */}
            <div
              className={`
                absolute
                rounded-full
                blur-[80px]

                h-[220px] w-[220px]
                sm:h-[320px] sm:w-[320px]
                lg:h-[420px] lg:w-[420px]

                ${glowColor}
              `}
            />

            {/* Image Wrapper */}
            <div
              className="
                relative z-10

                w-[160px] h-[220px]

                sm:w-[200px] sm:h-[280px]

                md:w-[240px] md:h-[340px]

                lg:w-[280px] lg:h-[400px]

                xl:w-[320px] xl:h-[460px]
              "
            >
              <Image
                src={image}
                alt={title}
                fill
                priority
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Bottom Label */}
        <div className="mt-2 lg:-mt-4">
          <h5
            className="
              animate-blur
              text-center
              uppercase
              tracking-widest
              leading-none

              text-[#6FD6ED]/40

              text-4xl
              sm:text-6xl
              md:text-7xl
              lg:text-8xl
              xl:text-9xl
            "
          >
            {bottomLabel}
          </h5>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
// "use client";

// import Image from "next/image";

// const HeroSection = () => {
//   return (
//     <section
//       className="
//         relative overflow-hidden
//         min-h-screen
//         bg-cover bg-center bg-no-repeat
//         flex flex-col justify-center
//         px-4 sm:px-6 md:px-10 lg:px-16
//         pb-10
//       "
//       style={{
//         backgroundImage: "url('/service/hero_bg.png')",
//       }}
//     >
//       {/* overlay */}
//       <div
//         className="absolute inset-0 opacity-40"
//         style={{
//           backgroundImage:
//             "linear-gradient(to right, #0f0c29, #0d113d, #0a1351, #071466, #07137b)",
//         }}
//       />
//       <div className="container mx-auto flex flex-1 flex-col justify-center">
//         {/* TOP TITLE */}
//         <h1
//           className="
//             text-glow-white
//             text-center
//             text-2xl
//             sm:text-3xl
//             md:text-4xl
//             lg:text-5xl
//             font-bold
//             tracking-wide
//             z-20
//           "
//         >
//           DESIGN SOLUTION
//         </h1>

//         {/* HERO CONTENT */}
//         <div
//           className="
//             mt-10 lg:mt-16
//             grid items-center gap-10 lg:gap-6
//             lg:grid-cols-2 z-20
//           "
//         >
//           {/* LEFT CONTENT */}
//           <div
//             className="
//               order-2 lg:order-1
//               text-center lg:text-left
//               flex flex-col gap-4 lg:gap-3
//             "
//           >
//             <h4
//               className="
//                 font-bold
//                 leading-tight
//                 text-3xl
//                 sm:text-4xl
//                 md:text-5xl
//                 lg:text-6xl
//                 xl:text-7xl
//               "
//             >
//               Every Customer
//               <br />
//               Communication Count
//             </h4>

//             <p
//               className="
//                 font-light
//                 text-sm
//                 sm:text-base
//                 md:text-lg
//                 text-muted-foreground
//                 leading-relaxed
//               "
//             >
//               We Bring All Customer Conversations Into
//               <br className="hidden sm:block" />
//               One Powerful Platform.
//             </p>
//           </div>

//           {/* RIGHT IMAGE */}
//           <div
//             className="
//               order-1 lg:order-2
//               relative flex justify-center animate-float
//             "
//           >
//             {/* Glow */}
//             <div
//               className="
//                 absolute
//                 h-[220px] w-[220px]
//                 sm:h-[320px] sm:w-[320px]
//                 lg:h-[420px] lg:w-[420px]
//                 rounded-full
//                 bg-cyan-400/20
//                 blur-[80px]
//               "
//             />
//             <div
//               className="
//     relative z-10
//     w-[160px]
//     h-[220px]

//     sm:w-[200px]
//     sm:h-[280px]

//     md:w-[240px]
//     md:h-[340px]

//     lg:w-[280px]
//     lg:h-[400px]

//     xl:w-[320px]
//     xl:h-[460px]
//   "
//             >
//               <Image
//                 src="/service/robot.png"
//                 alt="robot"
//                 fill
//                 priority
//                 className="object-contain"
//               />
//             </div>{" "}
//           </div>
//         </div>

//         {/* BOTTOM LABEL */}
//         <div className="mt-2 lg:-mt-4">
//           <h5
//             className="
//               text-center
//               uppercase
//               tracking-widest
//               leading-none
//               text-[#6FD6ED]/40
//               text-4xl
//               sm:text-6xl
//               md:text-7xl
//               lg:text-8xl
//               xl:text-9xl
//               animate-blur
//             "
//           >
//             DESIGN HUB
//           </h5>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
