"use client";

import { useEffect, useRef, useState } from "react";
import { Upload, CheckCircle2, Send, Briefcase } from "lucide-react";
import gsap from "gsap";

const POSITIONS = [
  {
    title: "UI & UX Designer",
    desc: "We're seeking a talented designer to create immersive wireframes, user journeys, and high-fidelity visual interfaces.",
    type: "Full-time",
    salary: "Not Disclosed",
  },
  {
    title: "Web Developer",
    desc: "We're seeking a passionate developer skilled in modern Next.js, HTML5, and responsive engineering layouts.",
    type: "Full-time",
    salary: "Not Disclosed",
  },
  {
    title: "Mobile App Developer - iOS",
    desc: "We're seeking an iOS specialist to build robust native Swift and hybrid mobile applications.",
    type: "Full-time",
    salary: "Not Disclosed",
  },
  {
    title: "Digital Marketing",
    desc: "We're seeking a marketer to drive SEO rankings, digital campaigns, and social media outreach programs.",
    type: "Full-time",
    salary: "Not Disclosed",
  },
  {
    title: "React Developer",
    desc: "We're seeking a frontend engineer focused on building modular components and state-managed web apps.",
    type: "Full-time",
    salary: "Not Disclosed",
  },
  {
    title: "Graphic Designer",
    desc: "We're seeking a visual artist to shape client logos, packaging materials, brochures, and brand identity systems.",
    type: "Full-time",
    salary: "Not Disclosed",
  },
];

const CareersForm = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    position: "UI & UX Designer",
    description: "",
  });
  const [resume, setResume] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let ctx = gsap.context(() => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        // Application form reveal
        gsap.fromTo(
          ".careers-form-reveal",
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".careers-grid-trigger",
              start: "top 85%",
              once: true,
            },
          }
        );

        // Positions reveal
        gsap.fromTo(
          ".careers-list-reveal",
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".careers-grid-trigger",
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-background pb-20 px-4 sm:px-6 lg:px-8 select-none"
    >
      <div className="careers-grid-trigger container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Application Form */}
          <div className="careers-form-reveal lg:col-span-7">
            <div className="rounded-[2rem] border border-border/60 bg-card/30 p-6 sm:p-10 backdrop-blur-md">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-5">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/25">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Application Submitted!
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Thank you for applying to Design Hub. Our HR department will review your details and resume. If your profile matches our requirements, we will reach out to schedule an interview.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        location: "",
                        position: "UI & UX Designer",
                        description: "",
                      });
                      setResume(null);
                    }}
                    className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-md transition-all hover:bg-accent/90"
                  >
                    Submit Another Application
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Grid Input */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200"
                        placeholder="Name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200"
                        placeholder="Email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200"
                        placeholder="Mobile Number"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="location" className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
                        Location *
                      </label>
                      <input
                        type="text"
                        id="location"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200"
                        placeholder="Location"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Position apply for */}
                    <div className="space-y-2">
                      <label htmlFor="position" className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
                        Position Apply For *
                      </label>
                      <select
                        id="position"
                        required
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none transition-all duration-200"
                      >
                        {POSITIONS.map((pos) => (
                          <option key={pos.title} value={pos.title}>
                            {pos.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Resume Upload */}
                    <div className="space-y-2">
                      <span className="block text-xs font-semibold text-foreground/80 uppercase tracking-wider">
                        Resume *
                      </span>
                      <label className="flex items-center justify-between w-full rounded-xl border border-border bg-background/50 px-4 py-2 text-sm text-muted-foreground cursor-pointer hover:border-accent hover:text-foreground transition-all duration-200 h-[46px]">
                        <span className="truncate pr-2">
                          {resume ? resume.name : "Choose File"}
                        </span>
                        <div className="flex-shrink-0 flex items-center gap-1.5 rounded-lg bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground shadow-sm">
                          <Upload className="h-3 w-3" />
                          Browse
                        </div>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          required
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </div>

                  {/* Description Box */}
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
                      Description *
                    </label>
                    <textarea
                      id="description"
                      required
                      rows={5}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200 resize-none"
                      placeholder="Description:"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full inline-flex items-center justify-center rounded-2xl bg-accent px-8 py-4 text-sm font-bold text-accent-foreground shadow-md transition-all hover:bg-accent/90 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isLoading ? "Submitting Application..." : "Apply Now"}
                    {!isLoading && <Send className="ml-2 h-4 w-4" />}
                  </button>

                </form>
              )}
            </div>
          </div>

          {/* Right Column: Positions List */}
          <div className="careers-list-reveal lg:col-span-5 space-y-6">
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl tracking-wider text-foreground">
              Opening Positions:
            </h2>

            <div className="space-y-5">
              {POSITIONS.map((pos) => (
                <article
                  key={pos.title}
                  onClick={() => setFormData((prev) => ({ ...prev, position: pos.title }))}
                  className={`group relative rounded-2xl border p-5 cursor-pointer transition-all duration-300 backdrop-blur-md ${
                    formData.position === pos.title
                      ? "border-accent bg-accent/5"
                      : "border-border/60 bg-card/45 hover:border-border hover:bg-card/65"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-accent transition-colors duration-200">
                        {pos.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {pos.desc}
                      </p>
                      
                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        <span className="inline-flex items-center rounded-md bg-secondary px-2.5 py-0.5 text-2xs font-semibold uppercase tracking-wider text-primary dark:text-[#7f91ff] border border-border/40">
                          {pos.type}
                        </span>
                        <span className="inline-flex items-center rounded-md bg-accent/10 px-2.5 py-0.5 text-2xs font-semibold uppercase tracking-wider text-accent border border-accent/25">
                          {pos.salary}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                      <Briefcase className="h-4 w-4" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CareersForm;
