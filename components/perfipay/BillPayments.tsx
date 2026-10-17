export default function BillPayments() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <h3 className="text-lg font-semibold text-white">Bill payments</h3>
      <p className="mt-2 text-sm text-slate-400">
        Provider connection required before live utility payments are enabled.
      </p>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-slate-300">Service</label>
          <select className="w-full rounded-md bg-slate-900 px-3 py-2">
            <option>Airtime</option>
            <option>Data bundle</option>
            <option>Electricity</option>
            <option>TV subscription</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">Payment method</label>
          <select className="w-full rounded-md bg-slate-900 px-3 py-2">
            <option>Wallet balance</option>
            <option>Fiat balance</option>
          </select>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 text-sm text-slate-200">
        Provider connection required.
      </div>
    </section>
  );
}
