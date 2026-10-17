export default function NetworkSelector() {
  return (
    <div className="rounded-xl border border-white/10 p-4">
      <h4 className="font-semibold text-white">Network</h4>
      <p className="mt-2 text-sm text-slate-400">
        Select a network (placeholder). Add verified RPC endpoints and network
        configuration before enabling.
      </p>

      <div className="mt-3 flex items-center gap-2">
        <select className="rounded-md bg-slate-900 px-3 py-2">
          <option>BNB Smart Chain (testnet)</option>
          <option>Ethereum (goerli)</option>
        </select>
      </div>
    </div>
  );
}
