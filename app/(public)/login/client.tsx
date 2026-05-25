"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { KeyRound } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const error = searchParams.get("error");
  const [loading, setLoading] = useState(false);

  const accessDeniedMessage =
    error === "AccessDenied"
      ? "This area is restricted to the configured admin Google account. Sign in with that account to continue."
      : null;

  const handleGoogleSignIn = async () => {
    setLoading(true);

    try {
      await signIn("google", { callbackUrl });
    } catch {
      toast.error("Google authentication failed.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050711] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-[#26336F]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[60%] rounded-full bg-[#DF1B25]/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#101735]/40 border border-[#26336F]/20 rounded-[2.5rem] p-8 md:p-10 backdrop-blur-2xl shadow-2xl relative z-10">
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-white/5 border border-[#26336F]/30 text-white mb-2 shadow-inner">
            <KeyRound className="w-6 h-6 text-[#DF1B25]" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white font-sans">
            System Authentication
          </h1>
          <p className="text-xs text-slate-400">
            Sign in with your Google account to access the administrator terminal.
          </p>
        </div>

        {accessDeniedMessage ? (
          <div className="mb-4 rounded-xl border border-[#DF1B25]/30 bg-[#DF1B25]/10 px-4 py-3 text-sm text-[#fca5a5]">
            {accessDeniedMessage}
          </div>
        ) : null}

        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={handleGoogleSignIn}
          className="w-full bg-[#101735]/40 border-[#26336F]/30 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl py-5 flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <FaGoogle className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-semibold font-mono">Continue with Google</span>
        </Button>
      </div>
    </div>
  );
}
