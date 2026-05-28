"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { env } from "@/env";

const SERVICES_OPTIONS = [
  "Android App Development",
  "iOS App Development",
  "Hybrid App Development",
  "E-Commerce Website",
  "Dynamic Website",
  "Static Website",
  "Web App Development",
  "Instagram Marketing",
  "Facebook Marketing",
  "SEO Marketing",
  "Logo Design",
  "Brochure Design",
];

const ContactForm = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    description: "",
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        // Info pane reveal
        gsap.fromTo(
          ".contact-info-reveal",
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".contact-grid-trigger",
              start: "top 85%",
              once: true,
            },
          },
        );

        // Form pane reveal
        gsap.fromTo(
          ".contact-form-reveal",
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".contact-grid-trigger",
              start: "top 85%",
              once: true,
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          services: selectedServices,
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Unable to send your request.");
      }

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        description: "",
      });
      setSelectedServices([]);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to send your request right now.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-background pb-20 px-4 sm:px-6 lg:px-8 select-none"
    >
      <div className="contact-grid-trigger container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Get In Touch Info Card */}
          <div className="contact-info-reveal lg:col-span-4 space-y-8 lg:sticky lg:top-28">
            <div className="relative rounded-3xl border border-border/60 bg-card/45 p-6 sm:p-8 overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-accent to-transparent" />

              <h2 className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl tracking-wider text-foreground mb-8">
                Get In Touch
              </h2>

              <ul className="space-y-8">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                      Our Location
                    </h4>
                    <p className="text-sm leading-relaxed text-foreground/90 font-medium">
                      {env.NEXT_PUBLIC_ADDRESS}
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                      Call Support
                    </h4>
                    <div className="text-sm space-y-1 text-foreground/90 font-medium">
                      <p>
                        <span className="text-accent/80 font-bold mr-1">
                          Phone 1:
                        </span>
                        <a
                          href={`tel:${env.NEXT_PUBLIC_PHONE_NUMBER}`}
                          className="hover:underline"
                        >
                          {env.NEXT_PUBLIC_PHONE_LABEL}
                        </a>
                      </p>

                      <p>
                        <span className="text-accent/80 font-bold mr-1">
                          Phone 2:
                        </span>
                        <a
                          href={`tel:${env.NEXT_PUBLIC_PHONE_NUMBER_2}`}
                          className="hover:underline"
                        >
                          {env.NEXT_PUBLIC_PHONE_LABEL_2}
                        </a>
                      </p>

                      <p>
                        <span className="text-accent/80 font-bold mr-1">
                          Tel:
                        </span>
                        <a
                          href={`tel:${env.NEXT_PUBLIC_PHONE_NUMBER_3}`}
                          className="hover:underline"
                        >
                          {env.NEXT_PUBLIC_PHONE_LABEL_3}
                        </a>
                      </p>
                    </div>
                  </div>
                </li>

                <li className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                      Email Address
                    </h4>
                    <div className="text-sm space-y-1 text-foreground/90 font-medium">
                      <p>
                        <a
                          href={`mailto:${env.NEXT_PUBLIC_EMAIL}}`}
                          className="hover:text-accent transition-colors"
                        >
                          {env.NEXT_PUBLIC_EMAIL}
                        </a>
                      </p>
                      {/* <p>
                        <a
                          href="mailto:contact@designhub.in"
                          className="hover:text-accent transition-colors"
                        >
                          contact@designhub.in
                        </a>
                      </p>
                      <p>
                        <a
                          href="mailto:designhubcbe@gmail.com"
                          className="hover:text-accent transition-colors"
                        >
                          designhubcbe@gmail.com
                        </a>
                      </p> */}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interaction Form */}
          <div className="contact-form-reveal lg:col-span-8">
            <div className="rounded-[2rem] border border-border/60 bg-card/30 p-6 sm:p-10 backdrop-blur-md">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-5">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/25">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Request Received Successfully!
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to Design Hub. An account
                    executive will review your selected services and contact you
                    within 24 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "",
                        description: "",
                      });
                      setSelectedServices([]);
                    }}
                    className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-md transition-all hover:bg-accent/90"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Inputs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-xs font-semibold text-foreground/80 uppercase tracking-wider"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200"
                        placeholder="Name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-xs font-semibold text-foreground/80 uppercase tracking-wider"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200"
                        placeholder="Email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="text-xs font-semibold text-foreground/80 uppercase tracking-wider"
                      >
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200"
                        placeholder="Mobile Number"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="subject"
                        className="text-xs font-semibold text-foreground/80 uppercase tracking-wider"
                      >
                        How can we help you? *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200"
                        placeholder="How can we help you?"
                      />
                    </div>
                  </div>

                  {/* Services Checklist Grid */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-semibold text-foreground/80 uppercase tracking-wider">
                      Services You Are Interested In
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {SERVICES_OPTIONS.map((service) => {
                        const isChecked = selectedServices.includes(service);
                        return (
                          <div
                            key={service}
                            onClick={() => handleServiceToggle(service)}
                            className={`flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer select-none transition-all duration-200 ${
                              isChecked
                                ? "border-accent bg-accent/5 text-foreground"
                                : "border-border/60 bg-background/30 text-muted-foreground hover:border-border hover:text-foreground"
                            }`}
                          >
                            <div
                              className={`flex h-5 w-5 items-center justify-center rounded border transition-colors ${
                                isChecked
                                  ? "border-accent bg-accent text-accent-foreground"
                                  : "border-border/80"
                              }`}
                            >
                              {isChecked && (
                                <svg
                                  className="h-3 w-3 fill-current"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                                </svg>
                              )}
                            </div>
                            <span className="text-xs sm:text-sm font-semibold">
                              {service}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Description Box */}
                  <div className="space-y-2">
                    <label
                      htmlFor="description"
                      className="text-xs font-semibold text-foreground/80 uppercase tracking-wider"
                    >
                      Description *
                    </label>
                    <textarea
                      id="description"
                      required
                      rows={5}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-all duration-200 resize-none"
                      placeholder="Description:"
                    />
                  </div>

                  {/* Send Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl bg-accent px-8 py-4 text-sm font-bold text-accent-foreground shadow-md transition-all hover:bg-accent/90 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isLoading ? "Sending Request..." : "Send Your Request"}
                    {!isLoading && <Send className="ml-2 h-4 w-4" />}
                  </button>

                  {submitError ? (
                    <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                      {submitError}
                    </p>
                  ) : null}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
