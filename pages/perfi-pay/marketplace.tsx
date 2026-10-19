
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import PerfiPayLayout from "../../components/perfipay/PerfiPayLayout";

const ProtectedRoute = dynamic(
  () => import("../../components/perfipay/ProtectedRoute"),
  { ssr: false }
);

type Listing = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  seller: string;
  type: "goods" | "services";
};

const starterListings: Listing[] = [
  {
    id: 1,
    title: "Digital Design Service",
    description: "Logo and basic brand design service.",
    category: "Services",
    price: 250,
    seller: "Perfi Seller",
    type: "services",
  },
  {
    id: 2,
    title: "Website Development",
    description: "A simple business website development service.",
    category: "Services",
    price: 1500,
    seller: "Perfi Seller",
    type: "services",
  },
  {
    id: 3,
    title: "Digital Product",
    description: "A sample digital product listing.",
    category: "Digital",
    price: 100,
    seller: "Perfi Seller",
    type: "goods",
  },
];

export default function MarketplacePage() {
  const [listings, setListings] = useState<Listing[]>(starterListings);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [view, setView] = useState<"buy" | "sell">("buy");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [itemType, setItemType] = useState<"goods" | "services">("goods");
  const [message, setMessage] = useState("");

  const filteredListings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return listings.filter((item) => {
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.seller.toLowerCase().includes(query);

      const matchesCategory =
        category === "All" || item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [listings, search, category]);

  function createListing(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const amount = Number(price);
    if (!Number.isFinite(amount) || amount <= 0) {
      setMessage("Enter a valid price in PERFI.");
      return;
    }

    const listing: Listing = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      category: itemType === "goods" ? "Goods" : "Services",
      price: amount,
      seller: "Current user",
      type: itemType,
    };

    setListings((previous) => [listing, ...previous]);
    setTitle("");
    setDescription("");
    setPrice("");
    setMessage(
      "Listing added to this browser session. It is not yet saved to a shared marketplace."
    );
    setView("buy");
  }

  function startPurchase(item: Listing) {
    setMessage(
      `You selected "${item.title}" for ${item.price.toLocaleString()} PERFI. No payment has been made. Connect the PERFI wallet and a secure order/payment system to complete purchases.`
    );
  }

  return (
    <ProtectedRoute>
      <PerfiPayLayout>
        <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6">
          <header>
            <h1 className="text-2xl font-bold text-slate-900">
              PerfiPay Marketplace
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Buy and sell goods and services using PERFI Coin.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                setView("buy");
                setMessage("");
              }}
              className={`rounded-xl border p-4 text-left ${
                view === "buy"
                  ? "border-blue-800 bg-blue-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <span className="text-lg font-semibold text-slate-900">
                Buy with PERFI
              </span>
              <p className="mt-1 text-sm text-slate-600">
                Browse listings and select an item to purchase.
              </p>
            </button>

            <button
              type="button"
              onClick={() => {
                setView("sell");
                setMessage("");
              }}
              className={`rounded-xl border p-4 text-left ${
                view === "sell"
                  ? "border-blue-800 bg-blue-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <span className="text-lg font-semibold text-slate-900">
                Sell with PERFI
              </span>
              <p className="mt-1 text-sm text-slate-600">
                Create a listing and set your price in PERFI.
              </p>
            </button>
          </div>

          {view === "sell" && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">
                Create a listing
              </h2>

              <form onSubmit={createListing} className="mt-4 space-y-4">
                <label className="block text-sm font-medium text-slate-700">
                  Listing title
                  <input
                    required
                    maxLength={100}
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="What are you selling?"
                    className="mt-1 w-full rounded-xl border border-slate-300 p-3"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Description
                  <textarea
                    required
                    maxLength={1000}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Describe the item or service"
                    rows={4}
                    className="mt-1 w-full rounded-xl border border-slate-300 p-3"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Listing type
                  <select
                    value={itemType}
                    onChange={(event) =>
                      setItemType(event.target.value as "goods" | "services")
                    }
                    className="mt-1 w-full rounded-xl border border-slate-300 p-3"
                  >
                    <option value="goods">Goods</option>
                    <option value="services">Services</option>
                  </select>
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Price in PERFI
                  <input
                    required
                    type="number"
                    min="0.00000001"
                    step="any"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    placeholder="Enter PERFI price"
                    className="mt-1 w-full rounded-xl border border-slate-300 p-3"
                  />
                </label>

                <button
                  type="submit"
                  className="rounded-xl bg-blue-900 px-5 py-3 font-semibold text-white"
                >
                  Publish listing
                </button>
              </form>
            </section>
          )}

          {view === "buy" && (
            <section className="space-y-4">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search marketplace"
                  className="rounded-xl border border-slate-300 bg-white p-3 sm:col-span-2"
                />

                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="rounded-xl border border-slate-300 bg-white p-3"
                >
                  <option value="All">All categories</option>
                  <option value="Goods">Goods</option>
                  <option value="Services">Services</option>
                  <option value="Digital">Digital</option>
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredListings.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                        {item.category}
                      </span>
                      <span className="text-xs text-slate-500">
                        {item.seller}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 min-h-12 text-sm text-slate-600">
                      {item.description}
                    </p>
                    <p className="mt-4 text-xl font-bold text-slate-900">
                      {item.price.toLocaleString()} PERFI
                    </p>

                    <button
                      type="button"
                      onClick={() => startPurchase(item)}
                      className="mt-4 w-full rounded-xl bg-blue-900 px-4 py-3 font-semibold text-white"
                    >
                      Select to buy
                    </button>
                  </article>
                ))}
              </div>

              {filteredListings.length === 0 && (
                <p className="rounded-xl bg-white p-6 text-center text-slate-600">
                  No matching listings found.
                </p>
              )}
            </section>
          )}

          {message && (
            <p
              role="status"
              className="whitespace-pre-wrap rounded-xl bg-amber-50 p-4 text-sm text-amber-900"
            >
              {message}
            </p>
          )}

          <p className="text-xs text-slate-500">
            Demo interface: listings are temporary and purchases do not transfer
            tokens. Live trading requires user accounts, persistent listing
            storage, moderation, and secure PERFI payment integration.
          </p>
        </main>
      </PerfiPayLayout>
    </ProtectedRoute>
  );
}
