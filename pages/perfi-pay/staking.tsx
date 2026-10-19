
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import PerfiPayLayout from "../../components/perfipay/PerfiPayLayout";

const ProtectedRoute = dynamic(
  () => import("../../components/perfipay/ProtectedRoute"),
  { ssr: false }
);

export default function StakingPage() {
  const [amount, setAmount] = useState("");
  const [period, setPeriod] = useState("90");
  const [message, setMessage] = useState("");

  // Illustrative rate only; replace with the actual approved PERFI staking rate.
  const exampleApy = 8;

  const estimatedRewards = useMemo(() => {
    const value = Number(amount);
    if (!Number.isFinite(value) || value <= 0) return 0;

    return value * (exampleApy / 100) * (Number(period) / 365);
  }, [amount, period]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage(
      "Preview only: no PERFI has been staked and no rewards have been earned. Connect a secure PERFI staking contract and wallet before enabling real staking."
    );
  }

  return (
    <ProtectedRoute>
      <PerfiPayLayout>
        <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-6">
          <header>
            <h1 className="text-2xl font-bold text-slate-900">
              PERFI Coin Staking
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Stake PERFI Coin and review an estimate of potential rewards.
            </p>
          </header>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-900 font-bold text-white">
                P
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  PERFI Coin
                </h2>
                <p className="text-sm text-slate-500">
                  Only supported staking asset
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Amount of PERFI to stake
                <input
                  type="number"
                  min="0"
                  step="any"
                  required
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="Enter PERFI amount"
                  className="mt-1 w-full rounded-xl border border-slate-300 p-3"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Staking period
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
                  Illustrative APY — not a live offer
                </p>
                <p className="text-xl font-bold text-slate-900">
                  {exampleApy}%
                </p>

                <p className="mt-3 text-sm text-slate-600">
                  Estimated rewards for the selected period
                </p>
                <p className="text-xl font-bold text-slate-900">
                  {estimatedRewards.toLocaleString(undefined, {
                    maximumFractionDigits: 8,
                  })}{" "}
                  PERFI
                </p>
              </div>

              <button
                type="submit"
                className="rounded-xl bg-blue-900 px-5 py-3 font-semibold text-white"
              >
                Review PERFI staking
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
              My PERFI staking activity
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Your active stakes, unlock dates and rewards will appear here
              after the PERFI staking contract is connected.
            </p>
          </section>
        </main>
      </PerfiPayLayout>
    </ProtectedRoute>
  );
}
