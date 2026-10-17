import Link from "next/link";

export default function PerfiPayHeader() {
  return (
    <header className="border-b border-amber-400/20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/perfi-pay" className="text-2xl font-bold text-amber-400">
          PERFI<span className="text-white">PAY</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/perfi-pay/dashboard"
            className="text-sm text-slate-300 hover:text-amber-400"
          >
            Dashboard
          </Link>
          <Link
            href="/perfi-pay/login"
            className="text-sm text-slate-300 hover:text-amber-400"
          >
            Sign in
          </Link>
        </nav>
      </div>
    </header>
  );
}
