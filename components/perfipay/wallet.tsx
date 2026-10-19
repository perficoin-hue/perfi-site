
import { useMemo, useState } from "react";
import Link from "next/link";
import PerfiPayLayout from "../../components/perfipay/PerfiPayLayout";
import ProtectedRoute from "../../components/perfipay/ProtectedRoute";

const networks = [
  { id: "BTC", name: "Bitcoin", symbol: "BTC" },
  { id: "ETH", name: "Ethereum", symbol: "ETH" },
  { id: "BSC", name: "BNB Smart Chain", symbol: "BNB" },
  { id: "POL", name: "Polygon", symbol: "POL" },
  { id: "SOL", name: "Solana", symbol: "SOL" },
  { id: "OTHER", name: "Other networks", symbol: "Other" },
];

const assetsByNetwork: Record<
  string,
  { symbol: string; name: string }[]
> = {
  BTC: [
    { symbol: "BTC", name: "Bitcoin" },
  ],
  ETH: [
    { symbol: "ETH", name: "Ether" },
    { symbol: "USDT", name: "Tether USD (Ethereum)" },
    { symbol: "USDC", name: "USD Coin (Ethereum)" },
  ],
  BSC: [
    { symbol: "BNB", name: "BNB" },
    { symbol: "USDT", name: "Tether USD (BSC)" },
    { symbol: "USDC", name: "USD Coin (BSC)" },
  ],
  POL: [
    { symbol: "POL", name: "POL" },
    { symbol: "USDT", name: "Tether USD (Polygon)" },
    { symbol: "USDC", name: "USD Coin (Polygon)" },
  ],
  SOL: [
    { symbol: "SOL", name: "Solana" },
    { symbol: "USDT", name: "Tether USD (Solana)" },
    { symbol: "USDC", name: "USD Coin (Solana)" },
  ],
  OTHER: [],
};

type Action = "send" | "receive" | "swap";

export default function WalletPage() {
  const [network, setNetwork] = useState("BSC");
  const [search, setSearch] = useState("");
  const [action, setAction] = useState<Action>("send");
  const [asset, setAsset] = useState("BNB");
  const [toAsset, setToAsset] = useState("USDT");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [notice, setNotice] = useState("");

  const assets = assetsByNetwork[network] ?? [];

  const filteredAssets = useMemo(
    () =>
      assets.filter((item) =>
        `${item.symbol} ${item.name}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [assets, search]
  );

  function changeNetwork(nextNetwork: string) {
    setNetwork(nextNetwork);
    setSearch("");
    setAsset(assetsByNetwork[nextNetwork]?.[0]?.symbol ?? "");
    setToAsset(assetsByNetwork[nextNetwork]?.[1]?.symbol ?? "");
    setNotice("");
  }

  function selectAction(nextAction: Action) {
    setAction(nextAction);
    setNotice("");
  }

  function handleReview() {
    if (network === "OTHER") {
      setNotice("Choose a supported network before continuing.");
      return;
    }

    if (!asset) {
      setNotice("Select an asset on the chosen network.");
      return;
    }

    if (action === "send" && (!address.trim() || !amount || Number(amount) <= 0)) {
      setNotice("Enter a valid recipient address and amount.");
      return;
    }

    if (action === "swap" && (!toAsset || toAsset === asset)) {
      setNotice("Select two different assets supported by this network.");
      return;
    }

    setNotice(
      "Review only: live wallet signing, balances, and provider quotes are not connected yet. No transaction has been sent."
    );
  }

  return (
    <ProtectedRoute>
      <PerfiPayLayout>
        <div className="space-y-6">
          <div>
            <Link
              href="/perfi-pay/dashboard"
              className="text-sm text-amber-400 hover:text-amber-300"
            >
              ← Dashboard
            </Link>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
              MENU 01
            </p>
            <h1 className="mt-2 text-3xl font-bold">Crypto Wallet</h1>
            <p className="mt-2 text-slate-400">
              Select a chain to view its assets and wallet actions.
            </p>
          </div>

          <section className="rounded-2xl border border-amber-400/20 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Total crypto balance</p>
            <p className="mt-2 text-2xl font-bold text-amber-400">
              Not connected
            </p>
            <p className="mt-2 text-xs text-slate-500">
              A verified wallet balance provider is needed to display real funds.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Select network</h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {networks.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => changeNetwork(item.id)}
                  className={`rounded-xl border p-3 text-left transition ${
                    network === item.id
                      ? "border-amber-400 bg-amber-400/10 text-amber-300"
                      : "border-white/10 bg-slate-900 text-slate-300 hover:border-amber-400/40"
                  }`}
                >
                  <span className="block font-semibold">{item.id}</span>
                  <span className="mt-1 block text-xs">{item.name}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-slate-900 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-semibold">Assets on {network}</h2>
              <span className="text-xs text-slate-400">
                {assets.length} listed
              </span>
            </div>

            <label htmlFor="token-search" className="mt-4 block text-sm text-slate-400">
              Search this network's assets
            </label>
            <input
              id="token-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={`Search ${network} tokens...`}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-400"
            />

            {network === "OTHER" ? (
              <p className="mt-4 text-sm text-slate-400">
                Other networks require configuration before their assets can be displayed.
              </p>
            ) : filteredAssets.length === 0 ? (
              <p className="mt-4 text-sm text-slate-400">
                No matching asset in this list.
              </p>
            ) : (
              <div className="mt-4 divide-y divide-white/10">
                {filteredAssets.map((item) => (
                  <button
                    key={`${network}-${item.symbol}`}
                    type="button"
                    onClick={() => {
                      setAsset(item.symbol);
                      setNotice("");
                    }}
                    className={`flex w-full items-center justify-between gap-3 py-4 text-left ${
                      asset === item.symbol ? "text-amber-300" : "text-white"
                    }`}
                  >
                    <span>
                      <span className="block font-semibold">{item.symbol}</span>
                      <span className="mt-1 block text-xs text-slate-400">
                        {item.name}
                      </span>
                    </span>
                    <span className="text-xs text-slate-400">
                      {asset === item.symbol ? "Selected" : "Select"}
                    </span>
                  </button>
                ))}
              </div>
            )}
            <p className="mt-3 text-xs text-slate-500">
              Starter token list only. A verified token registry is needed for a complete list and real balances.
            </p>
          </section>

          <section className="rounded-2xl border border-amber-400/20 bg-slate-900 p-4 sm:p-5">
            <div className="grid grid-cols-3 gap-2">
              {(["send", "receive", "swap"] as Action[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => selectAction(item)}
                  className={`rounded-xl px-3 py-3 text-sm font-semibold capitalize ${
                    action === item
                      ? "bg-amber-400 text-slate-950"
                      : "border border-white/10 text-slate-300 hover:border-amber-400/40"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <h2 className="mt-6 text-xl font-bold capitalize">
              {action} {action === "swap" ? "assets" : asset}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Network: {networks.find((item) => item.id === network)?.name}
            </p>

            {action === "receive" ? (
              <div className="mt-5 rounded-xl border border-white/10 bg-slate-950 p-4">
                <p className="text-sm text-slate-300">Receiving asset: {asset || "Select an asset"}</p>
                <p className="mt-2 text-sm text-slate-400">
                  Your receiving address will appear here when a wallet for this network is connected.
                </p>
                <p className="mt-3 text-xs text-amber-300">
                  Never deposit using an address from a different network.
                </p>
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                {action === "swap" && (
                  <div>
                    <label htmlFor="swap-to" className="block text-sm text-slate-400">
                      Swap to
                    </label>
                    <select
                      id="swap-to"
                      value={toAsset}
                      onChange={(event) => setToAsset(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white"
                    >
                      <option value="">Select destination asset</option>
                      {assets
                        .filter((item) => item.symbol !== asset)
                        .map((item) => (
                          <option key={item.symbol} value={item.symbol}>
                            {item.symbol} — {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                <div>
                  <label htmlFor="send-amount" className="block text-sm text-slate-400">
                    Amount ({asset || "asset"})
                  </label>
                  <input
                    id="send-amount"
                    type="number"
                    min="0"
                    step="any"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    placeholder="Enter amount"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white"
                  />
                </div>

                {action === "send" && (
                  <div>
                    <label htmlFor="recipient" className="block text-sm text-slate-400">
                      Recipient address
                    </label>
                    <input
                      id="recipient"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      placeholder="Enter the recipient address"
                      autoComplete="off"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white"
                    />
                  </div>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={handleReview}
              className="mt-5 w-full rounded-xl bg-amber-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-amber-300"
            >
              {action === "send"
                ? "Review transfer"
                : action === "receive"
                  ? "Check receiving setup"
                  : "Review swap"}
            </button>

            {notice && (
              <p
                role="status"
                className="mt-4 rounded-xl border border-amber-400/20 bg-slate-950 p-3 text-sm text-amber-200"
              >
                {notice}
              </p>
            )}
          </section>
        </div>
      </PerfiPayLayout>
    </ProtectedRoute>
  );
}
