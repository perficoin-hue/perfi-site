
import dynamic from "next/dynamic";
import Link from "next/link";
import PerfiPayLayout from "../../components/perfipay/PerfiPayLayout";

const ProtectedRoute = dynamic(
  () => import("../../components/perfipay/ProtectedRoute"),
  { ssr: false }
);

const FiatBalance = dynamic(
  () => import("../../components/perfipay/FiatBalance"),
  { ssr: false }
);

const menuItems = [
  {
    number: "01",
    title: "Crypto Wallet",
    description: "View crypto assets and total crypto balance.",
    href: "/perfi-pay/wallet",
    icon: "◈",
  },
  {
    number: "02",
    title: "Fiat & Crypto Conversion",
    description: "Fiat balance, deposits and currency conversion.",
    href: "/perfi-pay/conversion",
    icon: "⇄",
  },
  {
    number: "03",
    title: "Pay Bills",
    description: "Manage supported airtime, data and bill payments.",
    href: "/perfi-pay/bills",
    icon: "▤",
  },
  {
    number: "04",
    title: "Profile & KYC",
    description: "Manage your profile and identity verification.",
    href: "/perfi-pay/profile",
    icon: "◎",
  },
  {
    number: "05",
    title: "Staking",
    description: "View staking options, lock periods and rewards.",
    href: "/perfi-pay/staking",
    icon: "◇",
  },
  {
    number: "06",
    title: "Marketplace",
    description: "Explore listings, purchases and sales.",
    href: "/perfi-pay/marketplace",
    icon: "▦",
  },
];

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <PerfiPayLayout>
        <div className="space-y-8">
          <section>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
              PERFIPAY ACCOUNT
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              Your Dashboard
            </h1>
            <p className="mt-2 text-slate-400">
              Manage your wallet and PerfiPay services from one place.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-semibold">Fiat balance</h2>
            <FiatBalance />
          </section>

          <section>
            <div className="mb-4">
              <h2 className="text-xl font-bold">Your services</h2>
              <p className="mt-1 text-sm text-slate-400">
                Select a menu to open its dedicated page.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {menuItems.map((item) => (
                <Link
                  key={item.number}
                  href={item.href}
                  className="group rounded-2xl border border-amber-400/20 bg-slate-900 p-5 transition hover:-translate-y-1 hover:border-amber-400/60 hover:bg-slate-900/80"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/10 text-2xl text-amber-400">
                      {item.icon}
                    </span>
                    <span className="text-xs text-slate-500">
                      {item.number}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold group-hover:text-amber-400">
                    {item.title}
                  </h3>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">
                    {item.description}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-amber-400">
                    Open section →
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <p className="text-xs leading-5 text-slate-500">
            Some services require identity verification and approved provider
            integrations. Balances and transaction statuses must be verified
            against their actual data source.
          </p>
        </div>
      </PerfiPayLayout>
    </ProtectedRoute>
  );
}
