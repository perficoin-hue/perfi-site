export default function FiatDeposit() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <h3 className="text-lg font-semibold text-white">Fiat deposit</h3>
      <p className="mt-2 text-sm text-slate-400">
        Deposit methods require provider approval and server-side verification.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
          <label className="mb-2 block text-sm text-slate-300">Method</label>
          <select className="w-full rounded-md bg-slate-900 px-3 py-2">
            <option>Bank transfer</option>
            <option>Virtual account</option>
            <option>Card</option>
          </select>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
          <label className="mb-2 block text-sm text-slate-300">Currency</label>
          <select className="w-full rounded-md bg-slate-900 px-3 py-2">
            <option>NGN</option>
            <option>USD</option>
          </select>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 text-sm text-slate-200">
        <p>Provider-generated account details will appear after onboarding.</p>
        <p className="mt-2 text-slate-400">Limits and fees are provided by the payment provider.</p>
      </div>
    </section>
  );
}
