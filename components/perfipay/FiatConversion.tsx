import { useState } from "react";

export default function FiatConversion() {
  const [amount, setAmount] = useState("250000");
  const [quote, setQuote] = useState("₦1,260,000");

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <h3 className="text-lg font-semibold text-white">Crypto to fiat conversion</h3>
      <p className="mt-2 text-sm text-slate-400">
        Real quotes require a verified provider and liquidity. This is a safe,
        provider-based UI placeholder.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-slate-300">Crypto asset</label>
          <select className="w-full rounded-md bg-slate-900 px-3 py-2 text-white">
            <option>USDT</option>
            <option>BNB</option>
            <option>ETH</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">Fiat currency</label>
          <select className="w-full rounded-md bg-slate-900 px-3 py-2 text-white">
            <option>NGN</option>
            <option>USD</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-sm text-slate-300">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-md bg-slate-900 px-3 py-2"
        />
      </div>

      <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 text-sm text-slate-200">
        <p>Estimated quote: {quote}</p>
        <p className="mt-2 text-slate-400">Fee: 0.5% • Rate updated 2 mins ago</p>
      </div>

      <button className="mt-5 rounded-md bg-amber-400 px-4 py-2 font-bold text-slate-950">
        Confirm conversion
      </button>
    </section>
  );
}
