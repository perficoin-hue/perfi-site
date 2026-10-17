export default function KYCStatus() {
  const status = "Pending";

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">KYC status</h3>
        <span className="rounded-full border border-amber-400/40 px-3 py-1 text-xs uppercase tracking-[0.2em] text-amber-400">
          {status}
        </span>
      </div>

      <p className="mt-3 text-sm text-slate-400">
        Verification is governed by the selected provider and must be approved
        before account features are enabled.
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <button className="rounded-md bg-amber-400 px-4 py-2 font-bold text-slate-950">
          Start verification
        </button>
        <button className="rounded-md border border-white/10 px-4 py-2 text-sm text-slate-200">
          View requirements
        </button>
      </div>
    </section>
  );
}
