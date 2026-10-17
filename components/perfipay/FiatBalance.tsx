const balances = [
  { label: "Crypto balance", value: "$4,250.00", tone: "amber" },
  { label: "Fiat balance", value: "₦1,750,000", tone: "sky" },
  { label: "Pending deposits", value: "₦175,000", tone: "emerald" },
  { label: "Pending conversions", value: "$120.40", tone: "violet" },
];

export default function FiatBalance() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Balances</h3>
        <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
          Verified only
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {balances.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-white/10 bg-slate-950/60 p-4"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              {item.label}
            </p>
            <p className="mt-4 text-2xl font-bold text-amber-400">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
