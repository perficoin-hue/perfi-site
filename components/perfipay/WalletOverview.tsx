import { useEffect, useState } from "react";

async function hashPasscode(pass: string) {
  if (typeof window === "undefined" || !pass) return null;
  const enc = new TextEncoder();
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", enc.encode(pass));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function WalletOverview() {
  const [connected, setConnected] = useState(false);
  const [hasPasscode, setHasPasscode] = useState(false);
  const [locked, setLocked] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [confirmInput, setConfirmInput] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const STORAGE_KEY = "perfi-screenlock-hash";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORAGE_KEY);
    setHasPasscode(Boolean(stored));
    setLocked(Boolean(stored));
  }, []);

  async function handleSetPasscode() {
    setMessage(null);
    if (!/^[0-9]{4}$/.test(passInput)) {
      setMessage("Passcode must be exactly 4 digits.");
      return;
    }
    if (passInput !== confirmInput) {
      setMessage("Passcodes do not match.");
      return;
    }

    const hash = await hashPasscode(passInput);
    if (!hash) {
      setMessage("Unable to set passcode in this environment.");
      return;
    }

    localStorage.setItem(STORAGE_KEY, hash);
    setHasPasscode(true);
    setLocked(true);
    setPassInput("");
    setConfirmInput("");
    setMessage("Passcode set. The wallet is locked now.");
  }

  async function handleUnlock() {
    setMessage(null);
    if (!/^[0-9]{4}$/.test(passInput)) {
      setMessage("Enter a 4-digit passcode.");
      return;
    }

    const hash = await hashPasscode(passInput);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (hash && stored && hash === stored) {
      setLocked(false);
      setPassInput("");
      setMessage(null);
    } else {
      setMessage("Incorrect passcode.");
    }
  }

  function handleDisablePasscode() {
    localStorage.removeItem(STORAGE_KEY);
    setHasPasscode(false);
    setLocked(false);
    setPassInput("");
    setConfirmInput("");
    setMessage("Passcode removed. Wallet unlocked.");
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <h2 className="text-lg font-semibold text-white">Wallet Overview</h2>
      <p className="mt-2 text-sm text-slate-400">
        This is a placeholder for wallet connections, addresses and balances.
        Wallet integrations must use audited libraries (ethers.js, wallet
        connect) and never store private keys or seed phrases in plain text.
        Connect a wallet in a secure environment.
      </p>

      <div className="mt-4">
        {hasPasscode && locked ? (
          <div className="space-y-3">
            <p className="text-sm text-amber-300">Enter your 4-digit screenlock to unlock the wallet.</p>
            <input
              value={passInput}
              onChange={(e) => setPassInput(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
              type="password"
              inputMode="numeric"
              maxLength={4}
              placeholder="••••"
              className="w-32 rounded-md bg-slate-900 px-3 py-2"
            />
            <div className="flex items-center gap-4">
              <button
                onClick={handleUnlock}
                className="rounded-md bg-amber-400 px-4 py-2 font-bold text-slate-950"
              >
                Unlock
              </button>
              <button
                onClick={() => { setPassInput(""); setMessage(null); }}
                className="rounded-md border border-amber-400/20 px-4 py-2 text-sm text-amber-300"
              >
                Clear
              </button>
            </div>
            {message && <p className="text-sm text-amber-300">{message}</p>}
          </div>
        ) : (
          <>
            {!hasPasscode && (
              <div className="mb-4 space-y-3">
                <p className="text-sm text-amber-300">Set a 4-digit screenlock for quick access to your wallet.</p>
                <div className="flex gap-2">
                  <input
                    value={passInput}
                    onChange={(e) => setPassInput(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
                    type="password"
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="New passcode"
                    className="w-40 rounded-md bg-slate-900 px-3 py-2"
                  />
                  <input
                    value={confirmInput}
                    onChange={(e) => setConfirmInput(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))}
                    type="password"
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="Confirm"
                    className="w-40 rounded-md bg-slate-900 px-3 py-2"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleSetPasscode}
                    className="rounded-md bg-amber-400 px-4 py-2 font-bold text-slate-950"
                  >
                    Set passcode
                  </button>
                </div>
                {message && <p className="text-sm text-amber-300">{message}</p>}
              </div>
            )}

            {hasPasscode && !locked && (
              <div className="mb-4">
                <p className="text-sm text-slate-300">Wallet unlocked with screenlock.</p>
                <button
                  onClick={handleDisablePasscode}
                  className="mt-2 rounded-md border border-amber-400/20 px-4 py-2 text-sm text-amber-300"
                >
                  Disable passcode
                </button>
                {message && <p className="mt-2 text-sm text-amber-300">{message}</p>}
              </div>
            )}

            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={() => setConnected((value) => !value)}
                className={`rounded-md px-4 py-2 font-bold text-slate-950 ${locked ? "pointer-events-none bg-slate-700 opacity-50" : "bg-amber-400"}`}
                disabled={locked}
              >
                {connected ? "Disconnect" : "Connect Wallet"}
              </button>
              <span className="text-sm text-slate-300">
                {locked ? "Locked" : connected ? "Connected" : "Not connected"}
              </span>
            </div>

            {!locked && (
              <div className="mt-4 grid gap-2">
                <div className="text-sm text-slate-300">Address: {connected ? "0x1234...abcd" : "—"}</div>
                <div className="text-sm text-slate-300">Balance: {connected ? "100.00 PERFI" : "—"}</div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
