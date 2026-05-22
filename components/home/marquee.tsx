const marqueeItems = [
  "Web Design",
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
    <div className="relative border-t border-b border-border/50 py-4 sm:py-6 overflow-hidden bg-card/60 select-none z-10">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-loop {
          animation: marquee 25s linear infinite;
        }
      `}} />
      
      <div className="flex w-[200%] md:w-[150%] animate-marquee-loop whitespace-nowrap gap-16">
        {/* Double items for seamless loop */}
        {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-3 font-[family-name:var(--font-bebas-neue)] text-xl sm:text-2xl lg:text-3xl tracking-widest text-muted-foreground/60 uppercase"
          >
            {item}
            <span className="text-accent text-sm sm:text-base select-none">&#10022;</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default HomeMarquee;