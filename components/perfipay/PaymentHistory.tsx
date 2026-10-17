const history = [
  { label: "USDT transfer", value: "- $120.00", status: "Confirmed" },
  { label: "NGN deposit", value: "+ ₦250,000", status: "Processing" },
  { label: "Bill payment", value: "- ₦3,500", status: "Pending" },
];

export default function PaymentHistory() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <h3 className="text-lg font-semibold text-white">Payment history</h3>
      <div className="mt-4 space-y-3">
        {history.map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/50 p-3">
            <div>
              <p className="font-medium text-white">{item.label}</p>
              <p className="text-xs text-slate-400">{item.status}</p>
            </div>
            <p className="font-bold text-amber-400">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
