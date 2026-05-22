"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { ReusableFormField } from "@/components/forms/reusable-form-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { KeyRound } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";

const loginSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginValues) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl,
      });

      if (result?.error) {
        toast.error("Invalid credentials. Please verify your email and password.");
      } else {
        toast.success("Welcome back! Access granted.");
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      toast.error("An unexpected communication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    try {
      await signIn(provider, { callbackUrl });
    } catch (err) {
      toast.error(`Authentication with ${provider} failed.`);
    }
  };

  return (
    <div className="min-h-screen bg-[#050711] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Auras */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-[#26336F]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[60%] rounded-full bg-[#DF1B25]/5 blur-[120px] pointer-events-none" />

      {/* Login Card Grid Layout */}
      <div className="w-full max-w-md bg-[#101735]/40 border border-[#26336F]/20 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-2xl shadow-2xl relative z-10">
        
        {/* Logo/Brand Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-white/5 border border-[#26336F]/30 text-white mb-2 shadow-inner">
            <KeyRound className="w-6 h-6 text-[#DF1B25]" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white font-sans">
            System Authentication
          </h1>
          <p className="text-xs text-slate-400">
            Provide authorization parameters to access the administrator terminal.
          </p>
        </div>

        {/* Credentials Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <ReusableFormField
              control={form.control}
              name="email"
              label="Account Email"
              placeholder="admin@designhub.com"
              type="email"
              disabled={loading}
            />
            <ReusableFormField
              control={form.control}
              name="password"
              label="Security Password"
              placeholder="••••••••"
              type="password"
              disabled={loading}
            />

            <SubmitButton
              loading={loading}
              className="w-full bg-[#DF1B25] hover:bg-[#DF1B25]/90 text-white rounded-xl py-6 font-semibold shadow-lg shadow-[#DF1B25]/10 mt-6 cursor-pointer"
            >
              Sign In to Terminal
            </SubmitButton>
          </form>
        </Form>

        {/* Custom Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-[#26336F]/20" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#050711]/0 px-4 text-slate-500 font-mono">Or connect with</span>
          </div>
        </div>

        {/* Social Authentication Row */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={() => handleSocialSignIn("google")}
            className="bg-[#101735]/40 border-[#26336F]/30 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl py-5 flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <FaGoogle className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-semibold font-mono">Google</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={() => handleSocialSignIn("github")}
            className="bg-[#101735]/40 border-[#26336F]/30 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl py-5 flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <FaGithub className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-semibold font-mono">GitHub</span>
          </Button>
        </div>

      </div>
    </div>
  );
}
