import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import { login } from "./actions";

export default async function LoginPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Redirect if already logged in
  if (user) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-wood flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <Image src="/texture/noise.png" alt="noise" fill className="object-cover mix-blend-overlay" />
      </div>

      <div className="w-full max-w-md bg-[#1a1614] border border-white/10 p-8 relative z-10 shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-display text-cream tracking-wider uppercase">Porca & Vaca</h1>
          <p className="text-bone/60 tracking-superwide text-xs mt-3 uppercase">Admin Portal</p>
        </div>

        <form action={login} className="space-y-6">
          <div>
            <label className="block text-xs text-bone/60 tracking-superwide uppercase mb-2">Email</label>
            <input
              type="email"
              name="email"
              defaultValue="admin@porcanvaca.com"
              required
              className="w-full bg-transparent border border-white/20 p-3 text-cream focus:border-amber focus:outline-none transition-colors font-body"
            />
          </div>
          <div>
            <label className="block text-xs text-bone/60 tracking-superwide uppercase mb-2">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full bg-transparent border border-white/20 p-3 text-cream focus:border-amber focus:outline-none transition-colors font-body"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-amber text-[#1a1614] p-3 text-sm tracking-superwide uppercase font-bold hover:bg-white transition-colors duration-300 mt-4"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}
