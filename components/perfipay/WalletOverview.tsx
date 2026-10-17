import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

// Server-backed 4-digit screenlock stored in Supabase user_metadata.
// - Stores: screenlock_hash, screenlock_failed_attempts, screenlock_locked_until
// - Basic brute-force protection: lock after MAX_ATTEMPTS for LOCK_DURATION_MIN minutes
// Notes: This is an improvement over localStorage; consider stronger KDFs and server-side protections for production.

async function hashPasscode(pass: string) {
  if (typeof window === "undefined" || !pass) return null;
  const enc = new TextEncoder();
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", enc.encode(pass));
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function WalletOverview() {
  const [connected, setConnected] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [hasPasscode, setHasPasscode] = useState(false);
  const [locked, setLocked] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [confirmInput, setConfirmInput] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const MAX_ATTEMPTS = 5;
  const LOCK_DURATION_MIN = 5;

  useEffect(() => {
    let mounted = true;

    async function init() {
      const { data } = await supabase.auth.getUser();
      const u = data?.user ?? null;
      if (!mounted) return;
      setUser(u);

      const metadata = u?.user_metadata ?? {};
      const hash = metadata?.screenlock_hash ?? null;
      const failed = Number(metadata?.screenlock_failed_attempts ?? 0);
      const lockedUntil = metadata?.screenlock_locked_until ? new Date(metadata.screenlock_locked_until) : null;

      setHasPasscode(Boolean(hash));

      if (lockedUntil && lockedUntil > new Date()) {
        setLocked(true);
        setMessage(`Screenlock locked until ${lockedUntil.toLocaleTimeString()}`);
      } else {
        setLocked(Boolean(hash));
      }
    }

    init();

    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      // refresh on auth changes
      init();
    });

    return () => {
      mounted = false;
      try {
        sub?.subscription.unsubscribe();
      } catch {}
    };
  }, []);

  async function refreshUserMetadata() {
    const { data } = await supabase.auth.getUser();
    const u = data?.user ?? null;
    setUser(u);
    return u?.user_metadata ?? {};
  }

  async function handleSetPasscode() {
    setMessage(null);
    if (!user) {
      setMessage("Please sign in to set a passcode.");
      return;
    }
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

    const { error } = await supabase.auth.updateUser({
      data: {
        screenlock_hash: hash,
        screenlock_failed_attempts: 0,
        screenlock_locked_until: null,
      },
    });

    if (error) {
      setMessage("Failed to save passcode: " + error.message);
      return;
    }

    await refreshUserMetadata();
    setHasPasscode(true);
    setLocked(true);
    setPassInput("");
    setConfirmInput("");
    setMessage("Passcode set. The wallet is locked now.");
  }

  async function handleUnlock() {
    setMessage(null);
    if (!user) {
      setMessage("Please sign in to unlock.");
      return;
    }
    if (!/^[0-9]{4}$/.test(passInput)) {
      setMessage("Enter a 4-digit passcode.");
      return;
    }

    const metadata = await refreshUserMetadata();
    const storedHash = metadata?.screenlock_hash ?? null;
    const failed = Number(metadata?.screenlock_failed_attempts ?? 0);
    const lockedUntil = metadata?.screenlock_locked_until ? new Date(metadata.screenlock_locked_until) : null;

    if (lockedUntil && lockedUntil > new Date()) {
      setLocked(true);
      setMessage(`Screenlock locked until ${lockedUntil.toLocaleTimeString()}`);
      return;
    }

    const hash = await hashPasscode(passInput);

    if (hash && storedHash && hash === storedHash) {
      // success: reset failed attempts
      const { error } = await supabase.auth.updateUser({
        data: { screenlock_failed_attempts: 0, screenlock_locked_until: null },
      });
      if (error) {
        setMessage("Unlocked locally but failed to reset server metadata: " + error.message);
      }
      setLocked(false);
      setPassInput("");
      setMessage(null);
      return;
    }

    // failure: increment attempts
    const newFailed = failed + 1;
    let lockedUntilIso = null;
    if (newFailed >= MAX_ATTEMPTS) {
      const until = new Date(Date.now() + LOCK_DURATION_MIN * 60 * 1000);
      lockedUntilIso = until.toISOString();
    }

    const { error } = await supabase.auth.updateUser({
      data: {
        screenlock_failed_attempts: newFailed,
        screenlock_locked_until: lockedUntilIso,
      },
    });

    if (error) {
      setMessage("Error updating attempt count: " + error.message);
      return;
    }

    if (lockedUntilIso) {
      setLocked(true);
      setMessage(`Too many attempts. Locked until ${new Date(lockedUntilIso).toLocaleTimeString()}`);
    } else {
      setMessage(`Incorrect passcode. ${MAX_ATTEMPTS - newFailed} attempts left.`);
    }
  }

  async function handleDisablePasscode() {
    setMessage(null);
    if (!user) {
      setMessage("Please sign in to disable passcode.");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      data: {
        screenlock_hash: null,
        screenlock_failed_attempts: 0,
        screenlock_locked_until: null,
      },
    });

    if (error) {
      setMessage("Unable to remove passcode: " + error.message);
      return;
    }

    await refreshUserMetadata();
    setHasPasscode(false);
    setLocked(false);
    setPassInput("");
    setConfirmInput("");
    setMessage("Passcode removed. Wallet unlocked.");
  }

  if (!user) {
    return (
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="text-lg font-semibold text-white">Wallet Overview</h2>
        <p className="mt-2 text-sm text-slate-400">
          You must be signed in to set or use a screenlock. Sign in or create an account to continue.
        </p>
        <div className="mt-4 flex gap-3">
          <a href="/perfi-pay/login" className="rounded-md bg-amber-400 px-4 py-2 font-bold text-slate-950">Sign in</a>
          <a href="/perfi-pay/signup" className="rounded-md border border-amber-400/20 px-4 py-2 text-amber-300">Create account</a>
        </div>
      </section>
    );
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
