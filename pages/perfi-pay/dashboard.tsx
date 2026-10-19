
import dynamic from "next/dynamic";
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

const BillPayments = dynamic(
  () => import("../../components/perfipay/BillPayments"),
  { ssr: false }
);

const KYCStatus = dynamic(
  () => import("../../components/perfipay/KYCStatus"),
  { ssr: false }
);

const Marketplace = dynamic(
  () => import("../../components/perfipay/Marketplace"),
  { ssr: false }
);

const PaymentHistory = dynamic(
  () => import("../../components/perfipay/PaymentHistory"),
  { ssr: false }
);

const ProfileSettings = dynamic(
  () => import("../../components/perfipay/ProfileSettings"),
  { ssr: false }
);

const SendReceive = dynamic(
  () => import("../../components/perfipay/SendReceive"),
  { ssr: false }
);

const StakingPanel = dynamic(
  () => import("../../components/perfipay/StakingPanel"),
  { ssr: false }
);

const SwapPanel = dynamic(
  () => import("../../components/perfipay/SwapPanel"),
  { ssr: false }
);

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <PerfiPayLayout>
        <main className="space-y-6">
          <FiatBalance />

          <div className="grid gap-6 xl:grid-cols-2">
            <SendReceive />
            <SwapPanel />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <StakingPanel />
            <ProfileSettings />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <FiatConversion />
            <FiatDeposit />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <BillPayments />
            <KYCStatus />
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <Marketplace />
            <PaymentHistory />
          </div>
        </main>
      </PerfiPayLayout>
    </ProtectedRoute>
  );
}
