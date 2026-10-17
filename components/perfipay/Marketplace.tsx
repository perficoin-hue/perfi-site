const listings = [
  { title: "Home cleaning bundle", price: "₦18,500", seller: "Perfi Services", status: "Available" },
  { title: "Digital product setup", price: "₦32,000", seller: "Build local", status: "Available" },
  { title: "SEO optimization retainer", price: "₦65,000", seller: "Growth Labs", status: "Pending review" },
];

export default function Marketplace() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Marketplace</h3>
        <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
          RLS protected
        </span>
      </div>

      <div className="mb-4 flex gap-3">
        <input
          placeholder="Search listings"
          className="flex-1 rounded-md bg-slate-900 px-3 py-2"
        />
        <button className="rounded-md bg-amber-400 px-4 py-2 font-bold text-slate-950">
          Search
        </button>
      </div>

      <div className="grid gap-4">
        {listings.map((listing) => (
          <div key={listing.title} className="rounded-xl border border-white/10 bg-slate-950/60 p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold text-white">{listing.title}</h4>
                <p className="text-sm text-slate-400">by {listing.seller}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-amber-400">{listing.price}</p>
                <p className="text-xs text-slate-400">{listing.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
