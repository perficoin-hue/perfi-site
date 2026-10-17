
import Head from "next/head";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";

type MarketItem = {
  id: number;
  name: string;
  description: string;
  price: string;
  seller: string;
  category: string;
};

const INITIAL_ITEMS: MarketItem[] = [
  {
    id: 1,
    name: "PERFI Branded T-shirt",
    description: "Example marketplace product listing.",
    price: "25",
    seller: "Demo seller",
    category: "Fashion",
  },
  {
    id: 2,
    name: "Website Design Service",
    description: "Example digital service listing.",
    price: "100",
    seller: "Demo seller",
    category: "Digital Services",
  },
];

const ASSETS = [
  ["BTC", "Bitcoin"],
  ["ETH", "Ethereum"],
  ["BNB", "BNB Smart Chain"],
  ["SOL", "Solana"],
  ["USDT", "Tether"],
  ["USDC", "USD Coin"],
  ["PERFI", "PERFI Token"],
  ["USDTz", "USDTz"],
];

export default function PerfiPay() {
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [installMessage, setInstallMessage] = useState("");

  const [marketItems, setMarketItems] =
    useState<MarketItem[]>(INITIAL_ITEMS);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemCategory, setItemCategory] = useState("Products");
  const [marketMessage, setMarketMessage] = useState("");

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  async function installApp() {
    if (!installPrompt) {
      setInstallMessage(
        "If supported, open your browser menu and select Install app or Add to Home Screen."
      );
      return;
    }

    try {
      await installPrompt.prompt();
      const result = await installPrompt.userChoice;

      setInstallMessage(
        result.outcome === "accepted"
          ? "Installation accepted by your browser."
          : "Installation cancelled."
      );
    } catch {
      setInstallMessage(
        "Installation is unavailable in this browser. Try its Install or Add to Home Screen option."
      );
    }

    setInstallPrompt(null);
  }

  function listMarketItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const price = Number(itemPrice);

    if (
      !itemName.trim() ||
      !itemDescription.trim() ||
      !Number.isFinite(price) ||
      price <= 0
    ) {
      setMarketMessage(
        "Enter a product name, description and valid PERFI price."
      );
      return;
    }

    setMarketItems((items) => [
      {
        id: Date.now(),
        name: itemName.trim(),
        description: itemDescription.trim(),
        price: price.toString(),
        seller: "Demo seller",
        category: itemCategory,
      },
      ...items,
    ]);

    setItemName("");
    setItemDescription("");
    setItemPrice("");
    setMarketMessage(
      "Demo listing added. It is visible only on this page and is not published to other users."
    );
  }

  function buyMarketItem(item: MarketItem) {
    setMarketMessage(
      `Demo only: ${item.name} is listed for ${item.price} PERFI. No order was placed and no payment was made.`
    );
  }

  return (
    <>
      <Head>
        <title>PerfiPay | PERFI SITE</title>
        <meta
          name="description"
          content="Explore PerfiPay, the planned digital wallet, PERFI marketplace and payment platform."
        />
        <meta name="theme-color" content="#08152f" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </Head>

      <main className="min-h-screen bg-slate-950 text-white">
        {/* NAVIGATION */}
        <header className="border-b border-white/10 bg-slate-950">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5">
            <a href="/" className="text-xl font-black tracking-wide">
              PERFI<span className="text-amber-400">PAY</span>
            </a>

            <nav className="flex flex-wrap gap-4 text-sm text-slate-300">
              <a href="#wallet" className="hover:text-amber-400">
                Wallet
              </a>
              <a href="#marketplace" className="hover:text-amber-400">
                Marketplace
              </a>
              <a href="#bills" className="hover:text-amber-400">
                Pay Bills
              </a>
              <a href="#download" className="hover:text-amber-400">
                Download
              </a>
              <a href="/support" className="hover:text-amber-400">
                Support
              </a>
            </nav>
          </div>
        </header>

        {/* HERO */}
        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-amber-400">
              Your digital finance hub
            </p>

            <h1 className="text-4xl font-black leading-tight sm:text-6xl">
              Your assets.
              <span className="block text-amber-400">
                Your possibilities.
              </span>
            </h1>

            <p className="mt-6 max-w-xl leading-7 text-slate-300">
              Explore digital assets, the PERFI ecosystem, online shopping
              and planned payment services in one place.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#wallet"
                className="rounded-xl bg-amber-400 px-6 py-3 font-bold text-slate-950 hover:bg-amber-300"
              >
                Explore PerfiPay
              </a>
              <a
                href="#marketplace"
                className="rounded-xl border border-white/20 px-6 py-3 font-bold hover:border-amber-400"
              >
                Shop with PERFI
              </a>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              Preview interface. Real wallet, payment and trading services
              are not connected by this page.
            </p>
          </div>

          <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-2xl sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-slate-400">Wallet overview</p>
                <h2 className="mt-1 text-2xl font-bold">
                  Welcome to PerfiPay
                </h2>
              </div>
              <span className="rounded-full border border-amber-400/40 px-3 py-1 text-xs text-amber-300">
                Preview
              </span>
            </div>

            <div className="mt-7 rounded-2xl bg-slate-950 p-5">
              <p className="text-sm text-slate-400">
                Portfolio balance
              </p>
              <p className="mt-2 text-3xl font-black">
                Not connected
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Real balances require secure wallet integration.
              </p>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
              {["Receive", "Send", "Swap"].map((action) => (
                <div
                  key={action}
                  className="rounded-xl border border-white/10 px-2 py-4 text-slate-300"
                >
                  <div className="mb-2 text-xl text-amber-400">
                    {action === "Receive"
                      ? "↓"
                      : action === "Send"
                      ? "↑"
                      : "⇄"}
                  </div>
                  {action}
                  <p className="mt-1 text-[10px] text-slate-500">
                    Coming soon
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WALLET ASSETS */}
        <section
          id="wallet"
          className="scroll-mt-6 border-y border-white/10 bg-slate-900/60"
        >
          <div className="mx-auto max-w-7xl px-5 py-14">
            <h2 className="text-3xl font-black">
              Explore the ecosystem
            </h2>
            <p className="mt-3 text-slate-400">
              Planned asset support depends on verified network and wallet
              integrations.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ASSETS.map(([symbol, name]) => (
                <div
                  key={symbol}
                  className="rounded-2xl border border-white/10 bg-slate-950 p-5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold">{symbol}</span>
                    <span className="text-xs text-amber-400">
                      Planned
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MARKETPLACE */}
        <section
          id="marketplace"
          className="scroll-mt-6 border-b border-white/10"
        >
          <div className="mx-auto max-w-7xl px-5 py-14">
            <p className="text-sm font-bold uppercase tracking-widest text-amber-400">
              Shop and sell with PERFI
            </p>

            <h2 className="mt-3 text-3xl font-black">
              PerfiPay Marketplace
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-slate-300">
              Discover products and services and explore a marketplace
              designed for payments using PERFI Coin.
            </p>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
              {/* SELL FORM */}
              <form
                onSubmit={listMarketItem}
                className="rounded-2xl border border-white/10 bg-slate-900 p-6"
              >
                <h3 className="text-xl font-bold">Sell on PerfiPay</h3>

                <label className="mt-5 block text-sm text-slate-300">
                  Product or service name
                  <input
                    required
                    value={itemName}
                    onChange={(event) =>
                      setItemName(event.target.value)
                    }
                    maxLength={100}
                    placeholder="What are you selling?"
                    className="mt-2 w-full rounded-lg border border-white/20 bg-slate-950 px-3 py-3 text-white"
                  />
                </label>

                <label className="mt-4 block text-sm text-slate-300">
                  Description
                  <textarea
                    required
                    value={itemDescription}
                    onChange={(event) =>
                      setItemDescription(event.target.value)
                    }
                    maxLength={500}
                    placeholder="Describe your item or service"
                    rows={3}
                    className="mt-2 w-full rounded-lg border border-white/20 bg-slate-950 px-3 py-3 text-white"
                  />
                </label>

                <label className="mt-4 block text-sm text-slate-300">
                  Price in PERFI
                  <input
                    required
                    type="number"
                    min="0.00000001"
                    step="any"
                    value={itemPrice}
                    onChange={(event) =>
                      setItemPrice(event.target.value)
                    }
                    placeholder="Enter price in PERFI"
                    className="mt-2 w-full rounded-lg border border-white/20 bg-slate-950 px-3 py-3 text-white"
                  />
                </label>

                <label className="mt-4 block text-sm text-slate-300">
                  Category
                  <select
                    value={itemCategory}
                    onChange={(event) =>
                      setItemCategory(event.target.value)
                    }
                    className="mt-2 w-full rounded-lg border border-white/20 bg-slate-950 px-3 py-3 text-white"
                  >
                    <option>Products</option>
                    <option>Fashion</option>
                    <option>Electronics</option>
                    <option>Food and Agriculture</option>
                    <option>Digital Services</option>
                    <option>Real Estate</option>
                    <option>Other Services</option>
                  </select>
                </label>

                <button
                  type="submit"
                  className="mt-5 w-full rounded-xl bg-amber-400 px-5 py-3 font-bold text-slate-950 hover:bg-amber-300"
                >
                  Add demo listing
                </button>

                <p className="mt-3 text-xs leading-5 text-slate-400">
                  Listings are temporary and local to this page. They
                  are not published to other users.
                </p>
              </form>

              {/* PRODUCT LISTINGS */}
              <div>
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-xl font-bold">
                    Explore listings
                  </h3>
                  <span className="text-sm text-slate-400">
                    {marketItems.length} demo items
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {marketItems.map((item) => (
                    <article
                      key={item.id}
                      className="rounded-2xl border border-white/10 bg-slate-900 p-5"
                    >
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                        {item.category}
                      </span>

                      <h4 className="mt-3 text-lg font-bold">
                        {item.name}
                      </h4>

                      <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">
                        {item.description}
                      </p>

                      <p className="mt-4 break-words text-2xl font-black text-amber-400">
                        {item.price} PERFI
                      </p>

                      <p className="mt-2 text-xs text-slate-500">
                        Seller: {item.seller}
                      </p>

                      <button
                        type="button"
                        onClick={() => buyMarketItem(item)}
                        className="mt-5 w-full rounded-xl border border-amber-400 px-4 py-3 font-bold text-amber-400 hover:bg-amber-400 hover:text-slate-950"
                      >
                        View purchase demo
                      </button>
                    </article>
                  ))}
                </div>

                {marketItems.length === 0 && (
                  <p className="text-slate-400">
                    No listings yet. Be the first to list an item.
                  </p>
                )}

                {marketMessage && (
                  <p
                    role="status"
                    className="mt-5 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200"
                  >
                    {marketMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* BILL PAYMENTS */}
        <section
          id="bills"
          className="scroll-mt-6 mx-auto max-w-7xl px-5 py-14"
        >
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-7 sm:p-10">
            <p className="text-sm font-bold uppercase tracking-widest text-amber-400">
              Everyday payments
            </p>

            <h2 className="mt-3 text-3xl font-black">
              Pay Bills with PerfiPay
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-slate-300">
              The planned bill-payment service will support eligible
              fiat payments, including airtime, mobile data, electricity
              and TV subscriptions through approved providers.
            </p>

            <p className="mt-4 text-sm text-slate-400">
              Bill payments are not active yet. This page does not
              process payments.
            </p>
          </div>
        </section>

        {/* APP DOWNLOAD */}
        <section
          id="download"
          className="scroll-mt-6 bg-amber-400 text-slate-950"
        >
          <div className="mx-auto max-w-7xl px-5 py-14">
            <h2 className="text-3xl font-black">
              Take PerfiPay with you
            </h2>

            <p className="mt-3 max-w-2xl leading-7">
              Install the website as an app where your browser supports
              it. Official Android and iPhone apps require separate
              builds and testing.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
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

            {installMessage && (
              <p role="status" className="mt-4 text-sm font-semibold">
                {installMessage}
              </p>
            )}

            <p className="mt-4 text-sm">
              The APK link works only after a genuine, signed APK is
              uploaded to public/downloads/perfipay.apk.
            </p>

            <p className="mt-3 text-xs">
              iPhone requires an iOS build and Apple-approved signing
              and distribution. An APK cannot be installed on an iPhone.
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="px-5 py-8 text-center text-sm text-slate-400">
          <p>
            © {new Date().getFullYear()} PERFITECH GLOBAL VENTURE LIMITED.
          </p>

          <p className="mt-2">
            INNOVATION | INVEST | BUILD | GROW | GLOBAL
          </p>

          <p className="mt-3">
            <a href="/" className="hover:text-amber-400">
              PERFI SITE
            </a>
            {" · "}
            <a href="/contact" className="hover:text-amber-400">
              Contact
            </a>
            {" · "}
            <a href="/support" className="hover:text-amber-400">
              Support
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}
