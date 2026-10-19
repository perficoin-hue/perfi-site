
import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

type PerfiPayLayoutProps = {
  children: ReactNode;
};

const menuItems = [
  { label: "Dashboard", href: "/perfi-pay", icon: "⌂" },
  { label: "Balances & Wallet", href: "/perfi-pay/wallet", icon: "◈" },
  { label: "Send & Receive", href: "/perfi-pay/send-receive", icon: "⇄" },
  { label: "Swap", href: "/perfi-pay/swap", icon: "⇅" },
  { label: "Staking", href: "/perfi-pay/staking", icon: "◇" },
  { label: "Convert to Fiat", href: "/perfi-pay/conversion", icon: "↔" },
  { label: "Fiat Deposit", href: "/perfi-pay/deposit", icon: "▤" },
  { label: "Bill Payments", href: "/perfi-pay/bills", icon: "▣" },
  { label: "KYC Verification", href: "/perfi-pay/verification", icon: "✓" },
  { label: "Marketplace", href: "/perfi-pay/marketplace", icon: "▦" },
  { label: "Payment History", href: "/perfi-pay/history", icon: "◷" },
  { label: "Profile & Security", href: "/perfi-pay/profile", icon: "◎" },
];

export default function PerfiPayLayout({
  children,
}: PerfiPayLayoutProps) {
  const router = useRouter();

  function isActive(href: string) {
    if (href === "/perfi-pay") {
      return router.pathname === href || router.pathname === "/perfi-pay/index";
    }

    return router.pathname === href;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-30 border-b border-amber-400/20 bg-slate-950/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <Link
            href="/perfi-pay"
            className="text-2xl font-extrabold tracking-tight text-amber-400"
          >
            PERFI<span className="text-white">PAY</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="hidden text-xs text-slate-400 sm:inline">
              Secure payment dashboard
            </span>
            <Link
              href="/"
              className="text-sm text-slate-300 transition hover:text-amber-400"
            >
              Main Website
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1600px]">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-amber-400/15 bg-slate-950 p-4 lg:block">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Main menu
          </p>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                  isActive(item.href)
                    ? "bg-amber-400/10 font-semibold text-amber-300 ring-1 ring-amber-400/20"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span className="w-5 text-center text-lg" aria-hidden="true">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-8 rounded-xl border border-amber-400/20 bg-slate-900 p-4">
            <p className="text-sm font-semibold text-amber-300">
              Stay secure
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              Never share your password, private key or wallet recovery phrase.
            </p>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-4 py-6 pb-24 sm:px-6 sm:py-8 lg:px-8 lg:pb-10">
          {children}
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-amber-400/20 bg-slate-950/95 px-1 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-xl grid-cols-5">
          {[
            menuItems[0],
            menuItems[1],
            menuItems[2],
            menuItems[3],
            menuItems[11],
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`flex min-h-16 flex-col items-center justify-center gap-1 px-1 text-center text-[10px] ${
                isActive(item.href)
                  ? "text-amber-300"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span className="text-xl" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.label === "Balances & Wallet" ? "Wallet" : item.label === "Send & Receive" ? "Send" : item.label === "Profile & Security" ? "Profile" : item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      <footer className="border-t border-amber-400/15 px-4 py-6 text-center text-xs text-slate-500 lg:pl-64">
        <p>
          © {new Date().getFullYear()} PERFITECH GLOBAL VENTURE LIMITED
        </p>
        <p className="mt-2 text-amber-400/80">
          INNOVATION | INVEST | BUILD | GROW | GLOBAL
        </p>
      </footer>
    </div>
  );
}
