import { auth, signIn, signOut } from "@/auth";
import { Lock, Unlock, User, Shield, LogOut, KeyRound } from "lucide-react";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function AuthDemoPage() {
  const session = await auth();
  console.log(session)

  return (
    <main className="flex-1 min-h-[80vh] bg-gradient-to-b from-[#050711] via-[#0b0e26] to-[#050711] flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background Decorative Blur Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#26336F]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] bg-[#DF1B25]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-2xl z-10">
        {/* Page Header */}
        <div className="text-center mb-10">
          <span className="text-[#DF1B25] text-xs font-semibold tracking-[0.25em] uppercase bg-[#DF1B25]/10 px-3 py-1.5 rounded-full border border-[#DF1B25]/20">
            Security Sandbox
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-4 mb-3 font-sans">
            Authentication Layer
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-md mx-auto">
            Secure token verification & role authorization using NextAuth.js and Prisma Client.
          </p>
        </div>

        {/* Auth Status Card */}
        <div className="bg-[#101735]/40 backdrop-blur-xl border border-[#26336F]/20 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-[#26336F]/40">
          {session ? (
            <div>
              {/* Authenticated State */}
              <div className="flex items-center justify-between border-b border-[#26336F]/20 pb-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/30 text-emerald-400">
                    <Unlock className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-white font-semibold text-lg">Access Granted</h2>
                    <p className="text-emerald-400 text-xs font-medium">Session token active</p>
                  </div>
                </div>
                <div className="bg-[#26336F]/20 text-[#26336F] text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-[#26336F]/30 flex items-center gap-1.5 text-slate-300">
                  <Shield className="w-3.5 h-3.5 text-[#DF1B25]" />
                  Secure Context
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col md:flex-row items-center gap-6 bg-[#050711]/50 border border-[#26336F]/10 p-6 rounded-2xl">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-[#26336F]/30 bg-[#101735] flex items-center justify-center">
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || "User Avatar"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <User className="w-10 h-10 text-slate-500" />
                    )}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {session.user?.name || "Anonymous User"}
                    </h3>
                    <p className="text-slate-400 text-sm font-mono mb-2">
                      {session.user?.email}
                    </p>
                    <div className="inline-flex items-center gap-1.5 bg-[#DF1B25]/10 border border-[#DF1B25]/20 text-[#DF1B25] text-xs font-bold px-2.5 py-1 rounded-md">
                      role: {(session.user as any)?.role || "Unknown"}
                    </div>
                  </div>
                </div>

                <div className="bg-[#050711]/30 rounded-xl p-4 border border-[#26336F]/10">
                  <h4 className="text-slate-400 text-xs font-mono uppercase tracking-wider mb-2">
                    Session Metadata
                  </h4>
                  <pre className="text-xs text-slate-300 font-mono overflow-x-auto p-2 bg-slate-950/40 rounded-lg">
                    {JSON.stringify({ expires: session.expires, user: { name: session.user?.name, email: session.user?.email } }, null, 2)}
                  </pre>
                </div>

                {/* Sign Out Button */}
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/auth-demo" });
                  }}
                >
                  <button
                    type="submit"
                    className="w-full bg-[#101735] hover:bg-[#DF1B25] border border-[#26336F]/30 hover:border-[#DF1B25]/50 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors duration-300" />
                    Sign Out Session
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div>
              {/* Unauthenticated State */}
              <div className="flex items-center justify-between border-b border-[#26336F]/20 pb-6 mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-[#DF1B25]/10 p-2.5 rounded-xl border border-[#DF1B25]/30 text-[#DF1B25]">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-white font-semibold text-lg">Access Denied</h2>
                    <p className="text-[#DF1B25] text-xs font-medium">Session token missing</p>
                  </div>
                </div>
                <div className="bg-[#DF1B25]/5 text-[#DF1B25] text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-[#DF1B25]/10 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  Public Context
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-8">
                You are currently accessing this route as an anonymous visitor. Please authenticate with Google to initialize a secure session.
              </p>

              <div className="space-y-4">
                <form
                  action={async () => {
                    "use server";
                    await signIn("google", { redirectTo: "/auth-demo" });
                  }}
                >
                  <button
                    type="submit"
                    className="w-full bg-[#050711] hover:bg-[#101735] border border-[#26336F]/30 hover:border-[#26336F]/70 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group"
                  >
                    <svg className="w-5 h-5 group-hover:scale-105 transition-transform duration-300" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-1.14 2.78-2.4 3.63v3.02h3.87c2.26-2.08 3.58-5.14 3.58-8.5Z"/>
                      <path fill="#34A853" d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.87-3.02c-1.08.72-2.45 1.16-4.09 1.16-3.15 0-5.81-2.13-6.76-5.01H1.27v3.13C3.25 21.24 7.37 24 12 24Z"/>
                      <path fill="#FBBC05" d="M5.24 14.22c-.25-.72-.39-1.49-.39-2.22s.14-1.5.39-2.22V6.65H1.27C.46 8.27 0 10.08 0 12s.46 3.73 1.27 5.35l3.97-3.13Z"/>
                      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.96 1.19 15.24 0 12 0 7.37 0 3.25 2.76 1.27 6.65l3.97 3.13c.95-2.88 3.61-5.03 6.76-5.03Z"/>
                    </svg>
                    Continue with Google
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* Extra Technical Architecture Info Footer */}
        <div className="mt-8 flex justify-center items-center gap-6 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-1.5">
            <KeyRound className="w-3.5 h-3.5" />
            JWT Session Strategy
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
          <div>
            Prisma Adapter Enabled
          </div>
        </div>
      </div>
    </main>
  );
}
