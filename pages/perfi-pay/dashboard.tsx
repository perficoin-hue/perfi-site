import PerfiPayLayout from "../../components/perfipay/PerfiPayLayout";
import ProtectedRoute from "../../components/perfipay/ProtectedRoute";
import WalletOverview from "../../components/perfipay/WalletOverview";
import PinLock from "../../components/perfipay/PinLock";
import NetworkSelector from "../../components/perfipay/NetworkSelector";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <PerfiPayLayout>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="col-span-2 space-y-6">
            <WalletOverview />
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
              <h3 className="text-lg font-semibold text-white">Transactions</h3>
              <p className="mt-2 text-sm text-slate-400">
                Transaction history will appear here when connected.
              </p>
            </div>
          </div>

          <aside className="space-y-6">
            <NetworkSelector />
            <PinLock />
          </aside>
        </div>
      </PerfiPayLayout>
    </ProtectedRoute>
  );
}
