export default function ProfileSettings() {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <h3 className="text-lg font-semibold text-white">Profile & account</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
          <label className="mb-2 block text-sm text-slate-300">Full name</label>
          <input className="w-full rounded-md bg-slate-900 px-3 py-2" defaultValue="Perfi User" />
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
          <label className="mb-2 block text-sm text-slate-300">Mobile</label>
          <input className="w-full rounded-md bg-slate-900 px-3 py-2" defaultValue="+234 800 000 0000" />
        </div>
      </div>
      <div className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 text-sm text-slate-200">
        Account security is augmented with Supabase auth and additional screen-lock protection.
      </div>
    </section>
  );
}
