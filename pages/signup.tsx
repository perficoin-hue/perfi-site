
import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage(
          "Registration submitted. Check your email for a verification link before logging in."
        );
      }
    } catch {
      setMessage("Unable to register right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white">
      <div className="mx-auto max-w-md rounded-2xl border border-amber-500/30 bg-slate-900 p-8">
        <h1 className="text-3xl font-bold text-amber-400">
          Create your PerfiPay account
        </h1>
        <p className="mt-3 text-slate-300">
          Register with your email to get started.
        </p>

        <form onSubmit={handleSignup} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-800 p-3 text-white"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block">
              Password (at least 8 characters)
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-800 p-3 text-white"
              placeholder="Create a strong password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-amber-400 p-3 font-bold text-slate-950 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        {message && (
          <p role="status" className="mt-5 break-words text-sm text-slate-200">
            {message}
          </p>
        )}

        <p className="mt-6 text-sm text-slate-300">
          Already registered?{" "}
          <Link href="/login" className="text-amber-400 underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}
