
import Link from "next/link";
import PerfiPayLayout from "../../components/perfipay/PerfiPayLayout";

export default function PerfiPayHome() {
  return (
    <PerfiPayLayout>
      <section className="grid items-center gap-12 py-10 md:grid-cols-2 md:py-20">
        <div>
          <p className="mb-4 font-semibold uppercase tracking-[0.2em] text-amber-400">
            Welcome to PerfiPay
          </p>

          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Your digital finance journey starts here.
          </h1>

          <p className="mt-6 max-w-xl leading-7 text-slate-300">
            Explore the future of digital payments, crypto assets,
            staking, marketplace services and more through PerfiPay.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/perfi-pay/signup"
              className="rounded-lg bg-amber-400 px-6 py-3 font-bold text-slate-950 hover:bg-amber-300"
            >
              Create Account
            </Link>

            <Link
              href="/perfi-pay/login"
              className="rounded-lg border border-amber-400 px-6 py-3 font-semibold text-amber-400 hover:bg-amber-400/10"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="rounded-3xl border border-amber-400/20 bg-slate-900 p-8 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">
            The PerfiPay vision
          </p>

          <h2 className="mt-4 text-3xl font-bold">
            One platform. More possibilities.
          </h2>

          <ul className="mt-6 space-y-4 text-slate-300">
            <li>01 — Digital wallet</li>
            <li>02 — Staking and mining</li>
            <li>03 — Crypto marketplace</li>
            <li>04 — Bill payments</li>
            <li>05 — Secure user accounts</li>
          </ul>

          <p className="mt-8 text-sm text-slate-400">
            These are planned features. Financial functions will be
            connected and tested before being offered to users.
          </p>
        </div>
      </section>
    </PerfiPayLayout>
  );
}
