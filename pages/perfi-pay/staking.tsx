
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import PerfiPayLayout from "../../components/perfipay/PerfiPayLayout";

const ProtectedRoute = dynamic(
  () => import("../../components/perfipay/ProtectedRoute"),
  { ssr: false }
);

const StakingPanel = dynamic(
  () => import("../../components/perfipay/StakingPanel"),
  { ssr: false }
);

const stakingOptions = [
  { symbol: "PERFI", name: "Perfi Coin", apy: 8 },
  { symbol: "BNB", name: "BNB", apy: 4 },
  { symbol: "ETH", name: "Ethereum", apy: 3 },
];

export default function StakingPage() {
  const [asset, setAsset] = useState("PERFI");
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("90");
  const [message, setMessage] = useState("");

  const selected = stakingOptions.find((item) => item.symbol === asset)!;
  const estimate = useMemo(() => {
    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0) return 0;
    return value * (selected.apy / 100) * (Number(period) / 365);
  }, [amount, period, selected.apy]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(
      "This is a preview only. No tokens have been staked and no rewards have been earned. A secure staking contract and wallet connection are required before staking can go live."
    );
  }

  return (
    <ProtectedRoute>
      <PerfiPayLayout>
        <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6">
          <header>
            <h1 className="text-2xl font-bold text-slate-900">
              PERFI Staking
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Review staking options and estimate potential rewards.
            </p>
          </header>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Staking calculator
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Example rates are for interface demonstration only, not guaranteed
              returns or live offers.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Choose asset
                <select
                  value={asset}
                  onChange={(event) => setAsset(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 p-3"
                >
                  {stakingOptions.map((item) => (
                    <option key={item.symbol} value={item.symbol}>
                      {item.name} ({item.symbol})
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Amount to stake
                <input
                  type="number"
                  min="0"
                  step="any"
                  required
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder={`Enter amount in ${asset}`}
                  className="mt-1 w-full rounded-xl border border-slate-300 p-3"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Example staking period
                <select
                  value={period}
                  onChange={(event) => setPeriod(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-300 p-3"
                >
                  <option value="30">30 days</option>
                  <option value="90">90 days</option>
                  <option value="180">180 days</option>
                  <option value="365">365 days</option>
                </select>
              </label>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-slate-600">
                  Illustrative annual rate
                </p>
                <p className="text-xl font-bold text-slate-900">
                  {selected.apy}% APY
                </p>
                <p className="mt-3 text-sm text-slate-600">
                  Estimated rewards for selected period
                </p>
                <p className="text-xl font-bold text-slate-900">
                  {estimate.toLocaleString(undefined, {
                    maximumFractionDigits: 8,
                  })}{" "}
                  {asset}
                </p>
              </div>

              <button
                type="submit"
                className="rounded-xl bg-blue-900 px-5 py-3 font-semibold text-white"
              >
                Review staking
              </button>
            </form>

            {message && (
              <p
                role="status"
                className="mt-4 rounded-xl bg-amber-50 p-4 text-sm text-amber-900"
              >
                {message}
              </p>
            )}
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              My staking activity
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              No live staking positions are connected yet. Your positions and
              rewards can appear here after wallet and staking-contract
              integration.
            </p>
          </section>

          <StakingPanel />
        </main>
      </PerfiPayLayout>
    </ProtectedRoute>
  );
}
