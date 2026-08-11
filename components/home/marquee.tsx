const marqueeItems = [
  "Web Development",
  "E-Commerce Development",
  "Mobile Apps",
  "SEO Optimization",
  "Lead Generation",
  "Social Media",
  "Graphic Design",
  "Google Ads",
  "ERP Software",
];

const HomeMarquee = () => {
  return (
    <div className="marquee-section relative border-t border-b border-[#314085] py-3.5 sm:py-5 overflow-hidden bg-[#26336F] shadow-lg select-none z-10">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-loop {
          animation: marquee 25s linear infinite;
        }
      `}} />
      
      <div className="flex w-[200%] md:w-[150%] animate-marquee-loop whitespace-nowrap gap-12 sm:gap-16">
        {/* Double items for seamless loop */}
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-3 font-[family-name:var(--font-bebas-neue)] text-xl sm:text-2xl lg:text-3xl tracking-widest text-white uppercase drop-shadow-sm"
          >
            {item}
            <span className="text-white/70 text-sm sm:text-base select-none">&#10022;</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default HomeMarquee;