import { useState } from "react";
import { useRouter } from "next/router";
import PerfiPayLayout from "../../components/perfipay/PerfiPayLayout";
import { signIn } from "../../lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    router.push("/perfi-pay/dashboard");
  }

  return (
    <PerfiPayLayout>
      <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/[0.02] p-8">
        <h2 className="text-2xl font-bold text-amber-400">Sign in</h2>
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
            className="rounded-md bg-slate-900 px-3 py-2"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
            className="rounded-md bg-slate-900 px-3 py-2"
          />
          <button
            type="submit"
            className="rounded-xl bg-amber-400 px-4 py-2 font-bold text-slate-950"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-4 flex justify-between text-sm">
          <a href="/perfi-pay/forgot-password" className="text-amber-400">
            Forgot password?
          </a>
        </div>

        {message && <p className="mt-4 text-sm text-amber-300">{message}</p>}
      </div>
    </PerfiPayLayout>
  );
}
