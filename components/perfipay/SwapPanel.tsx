export default function SwapPanel() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <h3 className="text-lg font-semibold text-white">Swap</h3>
      <p className="mt-2 text-sm text-slate-400">
        Real quotes require a configured swap provider and active routing setup.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
          <label className="mb-2 block text-sm text-slate-300">From</label>
          <select className="w-full rounded-md bg-slate-900 px-3 py-2">
            <option>BNB</option>
            <option>USDT</option>
          </select>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
          <label className="mb-2 block text-sm text-slate-300">To</label>
          <select className="w-full rounded-md bg-slate-900 px-3 py-2">
            <option>USDT</option>
            <option>ETH</option>
          </select>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 text-sm text-slate-200">
        Estimated output: 214.80 USDT • Slippage: 0.8% • Provider quote expires in 60s
      </div>

      <button className="mt-5 rounded-md bg-amber-400 px-4 py-2 font-bold text-slate-950">
        Review swap
      </button>
    </section>
  );
}
