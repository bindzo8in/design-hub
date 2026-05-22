"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles, Phone } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import gsap from "gsap";

const HomeCTASection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(
          ".cta-item",
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".cta-wrapper",
              start: "top 80%",
              once: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-20 sm:py-24 lg:py-32"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-7xl px-4">
        <div className="cta-wrapper relative overflow-hidden rounded-[2rem] border border-border/50 bg-card/40 backdrop-blur-xl">
          
          {/* gradient border */}
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-accent/20 via-transparent to-primary/20 pointer-events-none" />

          <div className="grid items-center gap-10 lg:grid-cols-2 p-6 sm:p-10 lg:p-16">
            
            {/* LEFT CONTENT */}
            <div className="relative z-10">
              
              <div className="cta-item inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                <Sparkles className="h-4 w-4" />
                Let's Build Something Great
              </div>

              <h2 className="cta-item mt-6 font-[family-name:var(--font-bebas-neue)] text-5xl leading-[0.9] tracking-wider sm:text-6xl lg:text-8xl uppercase">
                Your Vision <br />
                <span className="text-accent">Our Innovation</span>
              </h2>

              <p className="cta-item mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                We craft high-performing websites, mobile apps, branding,
                marketing systems, and digital experiences that help businesses
                grow faster and stand out in the market.
              </p>

              {/* BUTTONS */}
              <div className="cta-item mt-8 flex flex-col sm:flex-row gap-4">
                
                <a
                  href="https://wa.me/919994713122"
                  target="_blank"
                  className="inline-flex items-center justify-center rounded-2xl bg-accent px-6 py-4 text-sm font-bold text-accent-foreground transition-all hover:scale-[1.02]"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>

                <a
                  href="tel:+919994713122"
                  className="inline-flex items-center justify-center rounded-2xl border border-border bg-background/40 px-6 py-4 text-sm font-semibold hover:bg-accent/5"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Schedule a Call
                </a>
              </div>

              {/* STATS */}
              <div className="cta-item mt-10 flex flex-wrap gap-8">
                <div>
                  <h4 className="text-3xl font-bold">120+</h4>
                  <p className="text-sm text-muted-foreground">
                    Projects Delivered
                  </p>
                </div>

                <div>
                  <h4 className="text-3xl font-bold">6+</h4>
                  <p className="text-sm text-muted-foreground">
                    Years Experience
                  </p>
                </div>

                <div>
                  <h4 className="text-3xl font-bold">24/7</h4>
                  <p className="text-sm text-muted-foreground">
                    Support System
                  </p>
                </div>
              </div>
            </div>

{/* RIGHT ANIMATION */}
<div className="cta-item relative flex items-center justify-center">

  {/* glow */}
  <div className="absolute h-[350px] w-[350px] sm:h-[450px] sm:w-[450px] lg:h-[600px] lg:w-[600px] rounded-full bg-accent/20 blur-[100px]" />

  {/* responsive animation wrapper */}
  <div className="relative flex items-center justify-center w-full">
    <div className="
      w-[280px]
      sm:w-[380px]
      md:w-[460px]
      lg:w-[560px]
      xl:w-[680px]
      2xl:w-[760px]
    ">
      <DotLottieReact
        src="/lottie/team.lottie"
        loop
        autoplay
        className="h-full w-full"
      />
    </div>
  </div>
</div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCTASection;

// "use client";

// import { useEffect, useRef, useState } from "react";
// import { Send, CheckCircle2, ArrowRight } from "lucide-react";
// import gsap from "gsap";

// const HomeContactCTA = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     service: "Website Development",
//     message: "",
//   });
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     let ctx = gsap.context(() => {
//       import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
//         gsap.registerPlugin(ScrollTrigger);

//         // Header animations
//         gsap.fromTo(
//           ".cta-reveal",
//           { opacity: 0, y: 25 },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.8,
//             stagger: 0.12,
//             ease: "power3.out",
//             scrollTrigger: {
//               trigger: ".cta-trigger-header",
//               start: "top 85%",
//               once: true,
//             },
//           }
//         );

//         // Form animation
//         gsap.fromTo(
//           ".cta-form-card",
//           { opacity: 0, y: 35 },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.8,
//             ease: "power3.out",
//             scrollTrigger: {
//               trigger: ".cta-form-card",
//               start: "top 85%",
//               once: true,
//             },
//           }
//         );
//       });
//     }, containerRef);

//     return () => ctx.revert();
//   }, []);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       setSubmitted(true);
//     }, 1200);
//   };

//   return (
//     <section
//       ref={containerRef}
//       id="contact"
//       className="relative overflow-hidden bg-background py-16 sm:py-24 px-4 sm:px-8 border-t border-border/40 select-none text-center"
//     >
//       {/* Background glow node */}
//       <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-30">
//         <div className="h-[600px] w-[600px] rounded-full bg-accent/5 blur-[120px]" />
//       </div>

//       <div className="container mx-auto max-w-7xl">
        
//         {/* Header */}
//         <div className="cta-trigger-header max-w-2xl mx-auto mb-12 space-y-4">
//           <div className="cta-reveal inline-flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent justify-center">
//             <span className="w-8 h-[1px] bg-accent" />
//             Let's Work Together
//             <span className="w-8 h-[1px] bg-accent" />
//           </div>
//           <h2 className="cta-reveal font-[family-name:var(--font-bebas-neue)] text-5xl sm:text-7xl lg:text-8xl leading-[0.9] tracking-wider uppercase text-foreground">
//             Ready To Think <em className="not-italic text-accent">Different?</em>
//           </h2>
//           <p className="cta-reveal text-sm sm:text-base text-muted-foreground leading-relaxed">
//             Let's create something extraordinary together. Over 6 years of experience, serving clients worldwide.
//           </p>
//         </div>

//         {/* Form Card */}
//         <div className="cta-form-card max-w-3xl mx-auto rounded-3xl border border-border/60 bg-card/40 p-6 sm:p-10 shadow-lg text-left backdrop-blur-md">
//           {submitted ? (
//             <div className="text-center py-10 space-y-4">
//               <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
//                 <CheckCircle2 className="h-10 w-10" />
//               </div>
//               <h4 className="text-xl font-bold text-foreground">
//                 Request Submitted!
//               </h4>
//               <p className="text-sm text-muted-foreground max-w-sm mx-auto">
//                 Thank you for reaching out. A consultant from Design Hub will connect with you within 24 hours to go over the specifications.
//               </p>
//               <button
//                 onClick={() => {
//                   setSubmitted(false);
//                   setFormData({ name: "", email: "", phone: "", service: "Website Development", message: "" });
//                 }}
//                 className="mt-6 text-sm font-bold text-accent hover:underline underline-offset-4"
//               >
//                 Send Another Inquiry
//               </button>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-6">
              
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <label htmlFor="name" className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
//                     Full Name *
//                   </label>
//                   <input
//                     type="text"
//                     id="name"
//                     required
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none"
//                     placeholder="e.g. John Doe"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label htmlFor="email" className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
//                     Email Address *
//                   </label>
//                   <input
//                     type="email"
//                     id="email"
//                     required
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none"
//                     placeholder="e.g. john@example.com"
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <label htmlFor="phone" className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
//                     Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     id="phone"
//                     value={formData.phone}
//                     onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                     className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none"
//                     placeholder="e.g. +91 99947 13122"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label htmlFor="service" className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
//                     Select Service *
//                   </label>
//                   <select
//                     id="service"
//                     required
//                     value={formData.service}
//                     onChange={(e) => setFormData({ ...formData, service: e.target.value })}
//                     className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none"
//                   >
//                     <option>Website Development</option>
//                     <option>E-Commerce Development</option>
//                     <option>Mobile App Development</option>
//                     <option>Custom Software & ERP</option>
//                     <option>Search Engine Optimization</option>
//                     <option>Lead Generation (Paid Ads)</option>
//                     <option>Social Media Management</option>
//                     <option>Graphic Designing</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <label htmlFor="message" className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
//                   Requirements Message *
//                 </label>
//                 <textarea
//                   id="message"
//                   required
//                   rows={4}
//                   value={formData.message}
//                   onChange={(e) => setFormData({ ...formData, message: e.target.value })}
//                   className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none resize-none"
//                   placeholder="Tell us about your project requirements or timeline goals..."
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full inline-flex items-center justify-center rounded-2xl bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground shadow-sm transition-all hover:bg-accent/90 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? "Submitting..." : "Submit Quote Request"}
//                 {!loading && <Send className="ml-2 h-4 w-4" />}
//               </button>
//             </form>
//           )}
//         </div>

//         {/* Quick Communication links (Matching references) */}
//         <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm">
//           <a
//             href="tel:9994713122"
//             className="inline-flex items-center gap-2 font-semibold text-foreground hover:text-accent transition-colors"
//           >
//             Start a Project: +91 99947 13122
//             <ArrowRight className="h-4 w-4" />
//           </a>
//           <a
//             href="mailto:saitechnosolutionscbe@gmail.com"
//             className="inline-flex items-center gap-2 font-semibold text-muted-foreground hover:text-foreground transition-colors"
//           >
//             Send an Email
//             <ArrowRight className="h-4 w-4" />
//           </a>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default HomeContactCTA;