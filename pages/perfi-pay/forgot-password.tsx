import { useState } from "react";
import PerfiPayLayout from "../../components/perfipay/PerfiPayLayout";
import { resetPassword } from "../../lib/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await resetPassword(email);
    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("If your email exists you will receive a password reset link.");
  }

  return (
    <PerfiPayLayout>
      <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/[0.02] p-8">
        <h2 className="text-2xl font-bold text-amber-400">Reset password</h2>
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
            className="rounded-md bg-slate-900 px-3 py-2"
          />
          <button
            type="submit"
            className="rounded-xl bg-amber-400 px-4 py-2 font-bold text-slate-950"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send password reset"}
          </button>
        </form>

        {message && <p className="mt-4 text-sm text-amber-300">{message}</p>}
      </div>
    </PerfiPayLayout>
  );
}
