import { useState } from "react";

export default function WalletOverview() {
  const [connected, setConnected] = useState(false);

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="text-lg font-semibold text-white">Wallet Overview</h2>
      <p className="mt-2 text-sm text-slate-400">
        This is a placeholder for wallet connections, addresses and balances.
        Wallet integrations must use audited libraries (ethers.js, wallet
        connect) and never store private keys or seed phrases in plain text.
        Connect a wallet in a secure environment.
      </p>

      <div className="mt-4 flex items-center gap-4">
        <button
          onClick={() => setConnected((value) => !value)}
          className="rounded-md bg-amber-400 px-4 py-2 font-bold text-slate-950"
        >
          {connected ? "Disconnect" : "Connect Wallet"}
        </button>
        <span className="text-sm text-slate-300">
          {connected ? "Connected" : "Not connected"}
        </span>
      </div>
    </section>
  );
}
