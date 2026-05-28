"use client";

import { useEffect, useState } from "react";
import { X, Send, CheckCircle2 } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const ContactPopup = ({ open, onClose }: Props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    subject: "",
  });

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    setSubmitError(null);

    try {
      const response = await fetch("/api/contact-popup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...formData,

          email: "",

          description: "Quick popup inquiry",

          services: [],
        }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Something went wrong.");
      }

      setIsSubmitted(true);

      setFormData({
        name: "",
        phone: "",
        subject: "",
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Unable to submit request.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-border/50 bg-card/90 p-8 shadow-2xl"
      >
        {/* glow */}
        <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />

        {/* close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full border border-border/60 p-2 transition hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>

        {isSubmitted ? (
          <div className="space-y-5 py-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-500">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <div>
              <h3 className="text-2xl font-bold">Request Sent</h3>

              <p className="mt-2 text-sm text-muted-foreground">
                Our team will contact you shortly.
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="relative z-10 mb-8 text-center">
              <span className="inline-block rounded-full border border-accent/20 bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                Free Consultation
              </span>

              <h2 className="mt-4 text-3xl font-bold leading-tight">
                Let’s Discuss Your Project
              </h2>

              <p className="mt-3 text-sm text-muted-foreground">
                Quick response within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-accent"
              />

              <input
                type="tel"
                required
                placeholder="Mobile Number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-accent"
              />

              <textarea
                required
                rows={4}
                placeholder="Tell us what you need..."
                value={formData.subject}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    subject: e.target.value,
                  })
                }
                className="w-full resize-none rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-accent"
              />

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex w-full items-center justify-center rounded-2xl bg-accent px-6 py-4 text-sm font-bold text-accent-foreground transition hover:scale-[1.02] disabled:opacity-50"
              >
                {isLoading ? "Sending..." : "Send Request"}

                {!isLoading && <Send className="ml-2 h-4 w-4" />}
              </button>

              {submitError && (
                <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {submitError}
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactPopup;
