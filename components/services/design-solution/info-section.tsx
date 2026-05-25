const InfoSection = () => {
  return (
    <section
      className="relative overflow-hidden py-12 sm:py-16 lg:py-24"
      style={{
        backgroundImage:
          "linear-gradient(41deg, #1E2383 27%, #000000 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-12">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:p-8 lg:p-12">
          <div className="space-y-8">
            {/* Intro */}
            <p className="text-sm leading-7 text-white/80 sm:text-base sm:leading-8 lg:text-lg lg:leading-9">
              At Design Hub, our design solutions are built to support digital
              marketing success by combining creativity, strategy, and
              performance-driven thinking. We believe design is not just about
              aesthetics — it is a powerful communication tool that influences
              perception, engagement, and conversion. Every design we create is
              aligned with your business objectives and marketing goals.
            </p>

            {/* Features */}
            <div>
              <h6 className="text-lg font-semibold text-white sm:text-xl">
                What Our Design Solutions Include:
              </h6>

              <ul className="mt-5 grid gap-4 pl-5 text-sm leading-7 text-white/75 sm:text-base lg:grid-cols-2">
                {[
                  "Business-Oriented Design: Designs created with clear marketing and growth objectives",

                  "Strategic Creativity: Creative ideas supported by data, insights, and brand strategy",

                  "Brand Identity Development: Logos, color systems, typography, and visual guidelines",

                  "Cross-Platform Consistency: Unified design across websites, social media, ads, and print",

                  "Engagement-Focused Visuals: Designs that capture attention and improve recall",

                  "Market-Specific Customization: Tailored solutions based on your industry and audience",
                ].map((item, index) => (
                  <li
                    key={index}
                    className="list-disc marker:text-white/40"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;