
import Link from "next/link";

export default function PerfiPayHome() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-amber-400/20">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/perfi-pay" className="text-2xl font-black text-amber-400">
            PERFI<span className="text-white">PAY</span>
          </Link>
          <Link href="/" className="text-sm text-slate-300 hover:text-amber-400">
            Main Website
          </Link>
        </nav>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
        <div>
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-amber-400">
            Payments • Wallet • Marketplace
          </p>

          <h1 className="text-5xl font-black leading-tight sm:text-6xl">
            Your money.
            <span className="block text-amber-400">Your possibilities.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            Discover the PerfiPay vision: a connected platform for digital
            payments, wallet services and future financial tools.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/perfi-pay/signup"
              className="rounded-xl bg-amber-400 px-7 py-4 font-bold text-slate-950 transition hover:bg-amber-300"
            >
              Create Account
            </Link>
            <Link
              href="/perfi-pay/login"
              className="rounded-xl border border-amber-400/70 px-7 py-4 font-bold text-amber-400 transition hover:bg-amber-400/10"
            >
              Sign In
            </Link>
          </div>

          <p className="mt-5 text-sm text-slate-500">
            Under development. Availability depends on feature release and
            authorisation.
          </p>
        </div>

        <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl shadow-amber-400/5 sm:p-10">
          <div className="mb-8 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-300">
              THE PERFI ECOSYSTEM
            </span>
            <span className="rounded-full border border-amber-400/30 px-3 py-1 text-xs text-amber-400">
              INNOVATION
            </span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm text-slate-400">Built for more possibilities</p>
            <p className="mt-2 text-3xl font-bold text-amber-400">
              PERFI PAY
            </p>
            <div className="mt-6 h-px bg-amber-400/20" />
            <div className="mt-5 grid grid-cols-2 gap-4">
              {[
                "Digital payments",
                "Wallet services",
                "Merchant tools",
                "Marketplace",
              ].map((feature) => (
                <div
                  key={feature}
                  className="rounded-xl border border-white/10 p-4 text-sm text-slate-200"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 text-sm leading-6 text-slate-400">
            Wallet, trading and other financial features will only be offered
            when implemented, tested and authorised.
          </p>
        </div>
      </section>

      <footer className="border-t border-amber-400/20 px-6 py-8 text-center">
        <p className="font-semibold text-white">
          PERFITECH GLOBAL VENTURE LIMITED
        </p>
        <p className="mt-3 text-sm tracking-wide text-amber-400">
          INNOVATION | INVEST | BUILD | GROW | GLOBAL
        </p>
        <p className="mt-3 text-xs text-slate-500">
          © {new Date().getFullYear()} Perfitech. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
