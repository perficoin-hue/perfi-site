
import dynamic from "next/dynamic";
import { useState } from "react";
import PerfiPayLayout from "../../components/perfipay/PerfiPayLayout";

const ProtectedRoute = dynamic(
  () => import("../../components/perfipay/ProtectedRoute"),
  { ssr: false }
);

const FiatBalance = dynamic(
  () => import("../../components/perfipay/FiatBalance"),
  { ssr: false }
);

const FiatConversion = dynamic(
  () => import("../../components/perfipay/FiatConversion"),
  { ssr: false }
);

const FiatDeposit = dynamic(
  () => import("../../components/perfipay/FiatDeposit"),
  { ssr: false }
);

export default function ConversionPage() {
  const [direction, setDirection] = useState<"fiat-to-crypto" | "crypto-to-fiat">(
    "fiat-to-crypto"
  );

  return (
    <ProtectedRoute>
      <PerfiPayLayout>
        <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6">
          <header>
            <h1 className="text-2xl font-bold text-slate-900">
              Fiat &amp; Crypto Conversion
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Convert between fiat currencies and supported cryptocurrencies.
            </p>
          </header>

          <FiatBalance />

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Choose conversion direction
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setDirection("fiat-to-crypto")}
                className={`rounded-xl border p-4 text-left ${
                  direction === "fiat-to-crypto"
                    ? "border-blue-700 bg-blue-50"
                    : "border-slate-200"
                }`}
              >
                <span className="block font-semibold text-slate-900">
                  Fiat → Crypto
                </span>
                <span className="mt-1 block text-sm text-slate-600">
                  Use fiat money to buy cryptocurrency.
                </span>
              </button>

              <button
                type="button"
                onClick={() => setDirection("crypto-to-fiat")}
                className={`rounded-xl border p-4 text-left ${
                  direction === "crypto-to-fiat"
                    ? "border-blue-700 bg-blue-50"
                    : "border-slate-200"
                }`}
              >
                <span className="block font-semibold text-slate-900">
                  Crypto → Fiat
                </span>
                <span className="mt-1 block text-sm text-slate-600">
                  Sell cryptocurrency and receive fiat money.
                </span>
              </button>
            </div>

            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900">
                {direction === "fiat-to-crypto"
                  ? "Buy crypto with fiat"
                  : "Sell crypto for fiat"}
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                {direction === "fiat-to-crypto"
                  ? "Select your fiat currency, enter an amount, and choose the cryptocurrency you want to buy."
                  : "Select your cryptocurrency, enter an amount, and choose the fiat currency you want to receive."}
              </p>
              <p className="mt-3 text-sm text-amber-800">
                Conversion execution must be connected to a supported exchange
                or payment provider before real transactions can take place.
              </p>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <FiatDeposit />
            <FiatConversion />
          </section>
        </main>
      </PerfiPayLayout>
    </ProtectedRoute>
  );
}
