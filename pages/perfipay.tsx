
import Head from "next/head";
import { useEffect, useState } from "react";

export default function PerfiPay() {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [installMessage, setInstallMessage] = useState("");

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function installApp() {
    if (!installPrompt) {
      setInstallMessage(
        "If supported, use your browser menu and choose Install app or Add to Home Screen."
      );
      return;
    }

    installPrompt.prompt();
    const result = await installPrompt.userChoice;
    setInstallMessage(
      result.outcome === "accepted"
        ? "Installation accepted."
        : "Installation cancelled."
    );
    setInstallPrompt(null);
  }

  return (
    <>
      <Head>
        <title>PerfiPay | PERFI SITE</title>
        <meta
          name="description"
          content="PerfiPay digital wallet and payment platform."
        />
        <meta name="theme-color" content="#08152f" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-slate-950 text-white">
        <header className="border-b border-white/10 bg-slate-950/95">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5">
            <a href="/" className="text-xl font-black tracking-wide">
              PERFI<span className="text-amber-400">PAY</span>
            </a>
            <nav className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
              <a href="#wallet" className="hover:text-amber-400">Wallet</a>
              <a href="#bills" className="hover:text-amber-400">Pay Bills</a>
              <a href="#download" className="hover:text-amber-400">Download</a>
              <a href="/support" className="hover:text-amber-400">Support</a>
            </nav>
          </div>
        </header>

        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-amber-400">
              Your digital finance hub
            </p>
            <h1 className="text-4xl font-black leading-tight sm:text-6xl">
              Your assets.
              <span className="block text-amber-400">Your possibilities.</span>
            </h1>
            <p className="mt-6 max-w-xl leading-7 text-slate-300">
              Explore the PerfiPay experience for digital assets, payments,
              and the PERFI ecosystem in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#wallet"
                className="rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-950 hover:bg-amber-300"
              >
                Explore PerfiPay
              </a>
              <a
                href="#download"
                className="rounded-xl border border-white/20 px-6 py-3 font-bold hover:border-amber-400"
              >
                Get the app
              </a>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              Preview interface only. Connect and verify production services
              before handling real funds.
            </p>
          </div>

          <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-2xl sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Wallet overview</p>
                <h2 className="mt-1 text-2xl font-bold">Welcome to PerfiPay</h2>
              </div>
              <span className="rounded-full border border-amber-400/40 px-3 py-1 text-xs text-amber-300">
                Preview
              </span>
            </div>

            <div className="mt-7 rounded-2xl bg-slate-950 p-5">
              <p className="text-sm text-slate-400">Portfolio balance</p>
              <p className="mt-2 text-3xl font-black">Not connected</p>
              <p className="mt-2 text-xs text-slate-500">
                Real balances will appear only after secure wallet integration.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
              {["Receive", "Send", "Swap"].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-white/10 px-2 py-4 text-slate-300"
                >
                  <div className="mb-2 text-xl text-amber-400">
                    {item === "Receive" ? "↓" : item === "Send" ? "↑" : "⇄"}
                  </div>
                  {item}
                  <p className="mt-1 text-[10px] text-slate-500">Coming soon</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="wallet" className="border-y border-white/10 bg-slate-900/60">
          <div className="mx-auto max-w-7xl px-5 py-14">
            <h2 className="text-3xl font-black">Explore the ecosystem</h2>
            <p className="mt-3 text-slate-400">
              Planned asset support is subject to network and provider integration.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["BTC", "Bitcoin"],
                ["ETH", "Ethereum"],
                ["BNB", "BNB Smart Chain"],
                ["SOL", "Solana"],
                ["USDT", "Tether"],
                ["USDC", "USD Coin"],
                ["PERFI", "PERFI Token"],
                ["USDTz", "USDTz"],
              ].map(([symbol, name]) => (
                <div
                  key={symbol}
                  className="rounded-2xl border border-white/10 bg-slate-950 p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{symbol}</span>
                    <span className="text-xs text-amber-400">Planned</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="bills" className="mx-auto max-w-7xl px-5 py-14">
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-7 sm:p-10">
            <p className="text-sm font-bold uppercase tracking-widest text-amber-400">
              Everyday payments
            </p>
            <h2 className="mt-3 text-3xl font-black">Pay bills with PerfiPay</h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-300">
              The planned bill-payment service will support eligible fiat
              payments such as airtime, mobile data, electricity and TV
              subscriptions through approved payment providers.
            </p>
            <p className="mt-4 text-sm text-slate-400">
              Bill payments are not active yet. No payment will be processed
              by this preview page.
            </p>
          </div>
        </section>

        <section id="download" className="bg-amber-400 text-slate-950">
          <div className="mx-auto max-w-7xl px-5 py-14">
            <h2 className="text-3xl font-black">Take PerfiPay with you</h2>
            <p className="mt-3 max-w-2xl">
              Install the website as an app where your browser supports it.
              Official Android and iPhone releases will be published after
              they have been built, signed, and tested.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={installApp}
                className="rounded-xl bg-slate-950 px-6 py-3 font-bold text-white hover:bg-slate-800"
              >
                Install web app
              </button>
              <a
                href="/downloads/perfipay.apk"
                className="rounded-xl border-2 border-slate-950/30 px-6 py-3 font-bold hover:bg-amber-300"
              >
                Android APK
              </a>
            </div>
            <p className="mt-3 text-sm">
              The APK link will work only after a genuine signed APK is uploaded
              to the website at the specified path.
            </p>
            {installMessage && (
              <p role="status" className="mt-3 text-sm font-semibold">
                {installMessage}
              </p>
            )}
            <p className="mt-5 text-xs">
              iPhone: an installable iOS release needs Apple-approved signing
              and distribution. A downloadable APK does not work on iPhone.
            </p>
          </div>
        </section>

        <footer className="px-5 py-8 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} PERFITECH GLOBAL VENTURE LIMITED.
          <p className="mt-2">INNOVATION | INVEST | BUILD | GROW | GLOBAL</p>
          <p className="mt-3">
            <a href="/" className="hover:text-amber-400">PERFI SITE</a>
            {" · "}
            <a href="/contact" className="hover:text-amber-400">Contact</a>
            {" · "}
            <a href="/support" className="hover:text-amber-400">Support</a>
          </p>
        </footer>
      </main>
    </>
  );
}
