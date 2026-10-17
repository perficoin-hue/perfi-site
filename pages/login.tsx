
import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setMessage(error.message);
        return;
      }

      if (!data.user) {
        setMessage("Login could not be completed. Please try again.");
        return;
      }

      if (!data.user.email_confirmed_at) {
        await supabase.auth.signOut();
        setMessage("Please verify your email address before continuing.");
        return;
      }

      await router.push("/perfipay");
    } catch {
      setMessage("Unable to log in right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white">
      <div className="mx-auto max-w-md rounded-2xl border border-amber-500/30 bg-slate-900 p-8">
        <h1 className="text-3xl font-bold text-amber-400">
          Log in to PerfiPay
        </h1>

        <p className="mt-3 text-slate-300">
          Sign in with your registered email address.
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
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
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-800 p-3 text-white"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-amber-400 p-3 font-bold text-slate-950 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        {message && (
          <p role="status" className="mt-5 break-words text-sm text-slate-200">
            {message}
          </p>
        )}

        <p className="mt-6 text-sm text-slate-300">
          New to PerfiPay?{" "}
          <Link href="/signup" className="text-amber-400 underline">
            Create an account
          </Link>
        </p>

        <p className="mt-4 text-sm text-slate-400">
          Forgot your password? Password reset will be added next.
        </p>
      </div>
    </main>
  );
}
