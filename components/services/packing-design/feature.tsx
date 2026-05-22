import {
  BadgeCheck,
  Users,
  WandSparkles,
} from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Strong Visual Identity",
    description:
      "Packaging should instantly reflect the brand through consistent colors, typography, and design style.",
  },
  {
    icon: Users,
    title: "Clear & Honest Communication",
    description:
      "Effective packaging communicates key product information quickly and clearly.",
  },
  {
    icon: WandSparkles,
    title: "Customer-Centric Design",
    description:
      "Packaging should instantly reflect the brand through consistent colors, typography, and design style.",
  },
];

const PackagingFeatureStrip = () => {
  return (
    <section className="relative overflow-hidden px-4 py-14 sm:px-6 lg:px-8">
      <div
        className="
          mx-auto
          max-w-[1100px]
          overflow-hidden
          rounded-[48px]
          border
          border-white/10
          bg-gradient-to-r
          from-white/[0.14]
          via-white/[0.08]
          to-white/[0.14]
          backdrop-blur-2xl
        "
      >
        <div
          className="
            grid
            grid-cols-1
            divide-y
            divide-white/10
            md:grid-cols-3
            md:divide-x
            md:divide-y-0
          "
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="
                  flex
                  items-start
                  gap-5
                  px-6
                  py-8
                  sm:px-8
                  lg:px-10
                "
              >
                {/* icon */}
                <div
                  className="
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                  "
                >
                  <Icon
                    className="
                      h-7
                      w-7
                      text-white
                    "
                    strokeWidth={2}
                  />
                </div>

                {/* content */}
                <div>
                  <h3
                    className="
                      text-lg
                      font-bold
                      leading-tight
                      text-white
                      sm:text-xl
                    "
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="
                      mt-3
                      text-sm
                      leading-relaxed
                      text-white/70
                    "
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PackagingFeatureStrip;