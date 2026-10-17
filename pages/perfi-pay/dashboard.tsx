import FiatBalance from "../../components/perfipay/FiatBalance";
import FiatConversion from "../../components/perfipay/FiatConversion";
import FiatDeposit from "../../components/perfipay/FiatDeposit";
import BillPayments from "../../components/perfipay/BillPayments";
import KYCStatus from "../../components/perfipay/KYCStatus";
import Marketplace from "../../components/perfipay/Marketplace";
import PaymentHistory from "../../components/perfipay/PaymentHistory";
import PerfiPayLayout from "../../components/perfipay/PerfiPayLayout";
import ProtectedRoute from "../../components/perfipay/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <PerfiPayLayout>
        <div className="space-y-6">
          <FiatBalance />

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
        </div>
      </PerfiPayLayout>
    </ProtectedRoute>
  );
}
