export default function StakingPanel() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <h3 className="text-lg font-semibold text-white">Staking</h3>
      <p className="mt-2 text-sm text-slate-400">
        Staking requires verified contracts and provider configuration. Not connected yet.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Available</p>
          <p className="mt-3 text-2xl font-bold text-amber-400">Not connected yet</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Lock period</p>
          <p className="mt-3 text-2xl font-bold text-amber-400">N/A</p>
        </div>
      </div>
    </section>
  );
}
