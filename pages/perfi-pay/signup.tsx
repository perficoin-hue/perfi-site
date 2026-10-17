import { useState } from "react";
import PerfiPayLayout from "../../components/perfipay/PerfiPayLayout";
import { signUp } from "../../lib/auth";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await signUp(email, password);
    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Check your email for a verification link if required by Supabase.");
  }

  return (
    <PerfiPayLayout>
      <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/[0.02] p-8">
        <h2 className="text-2xl font-bold text-amber-400">Create account</h2>
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
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-amber-300">{message}</p>}
      </div>
    </PerfiPayLayout>
  );
}
