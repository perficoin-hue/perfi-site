import { useState } from "react";

export default function SendReceive() {
  const [amount, setAmount] = useState("0.25");

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Send & receive</h3>
        <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Network verified</span>
      </div>

      <div className="mt-4 space-y-4">
        <div className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
          <label className="mb-2 block text-sm text-slate-300">Asset</label>
          <select className="w-full rounded-md bg-slate-900 px-3 py-2">
            <option>BNB</option>
            <option>USDT</option>
            <option>ETH</option>
          </select>
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
          <label className="mb-2 block text-sm text-slate-300">Amount</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-md bg-slate-900 px-3 py-2"
          />
        </div>

        <div className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
          <label className="mb-2 block text-sm text-slate-300">To address</label>
          <input
            placeholder="0x..."
            className="w-full rounded-md bg-slate-900 px-3 py-2"
          />
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <button className="rounded-md bg-amber-400 px-4 py-2 font-bold text-slate-950">Send</button>
        <button className="rounded-md border border-white/10 px-4 py-2 text-sm text-slate-200">Receive</button>
      </div>
    </section>
  );
}
