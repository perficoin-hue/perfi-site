
import type { ReactNode } from "react";

type PerfiPayLayoutProps = {
  children: ReactNode;
};

export default function PerfiPayLayout({
  children,
}: PerfiPayLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-amber-400/20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a
            href="/perfi-pay"
            className="text-2xl font-bold text-amber-400"
          >
            PERFI<span className="text-white">PAY</span>
          </a>

          <a
            href="/"
            className="text-sm text-slate-300 hover:text-amber-400"
          >
            Main Website
          </a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 py-12">
        {children}
      </main>

      <footer className="border-t border-amber-400/20 px-6 py-6 text-center text-sm text-slate-400">
        <p>
          © {new Date().getFullYear()} PERFITECH GLOBAL VENTURE LIMITED
        </p>
        <p className="mt-2 text-amber-400">
          INNOVATION | INVEST | BUILD | GROW | GLOBAL
        </p>
      </footer>
    </div>
  );
}
