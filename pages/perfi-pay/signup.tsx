
import { useState, type FormEvent } from "react";
import PerfiPayLayout from "../../components/perfipay/PerfiPayLayout";
import { signUp } from "../../lib/auth";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setMessage(null);
    setSuccess(false);

    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    try {
      const request = signUp(email.trim(), password);

      const timeout = new Promise<never>((_, reject) => {
        timeoutId = setTimeout(() => {
          reject(
            new Error(
              "The signup request is taking too long. Check your internet connection and Supabase settings, then try again."
            )
          );
        }, 15000);
      });

      const { error } = await Promise.race([request, timeout]);

      if (error) {
        setMessage(error.message || "Account creation failed. Please try again.");
        return;
      }

      setSuccess(true);
      setMessage(
        "Your signup request was accepted. Check your email for a verification link if email confirmation is enabled."
      );
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Something went wrong while creating your account.";

      setMessage(errorMessage);
    } finally {
      if (timeoutId) clearTimeout(timeoutId);
      setLoading(false);
    }
  }

  return (
    <PerfiPayLayout>
      <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/[0.02] p-8">
        <h2 className="text-2xl font-bold text-amber-400">
          Create account
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            autoComplete="email"
            required
            disabled={loading}
            className="rounded-md bg-slate-900 px-3 py-2"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onChangeCapture={() => {
              setMessage(null);
              setSuccess(false);
            }}
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            minLength={6}
            required
            disabled={loading}
            className="rounded-md bg-slate-900 px-3 py-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-amber-400 px-4 py-2 font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        {message && (
          <p
            role="status"
            aria-live="polite"
            className={`mt-4 text-sm ${
              success ? "text-green-400" : "text-amber-300"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </PerfiPayLayout>
  );
}
