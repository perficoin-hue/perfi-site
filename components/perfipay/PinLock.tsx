import { useState } from "react";

// WARNING: This is a UI-only placeholder for a PIN lock. Do NOT use this for production PIN storage.
// A secure implementation must use salted hashing and secure storage (IndexedDB with encryption or OS keystore)
// and provide recovery paths that do not leak secrets. This component only demonstrates the UX.
export default function PinLock() {
  const [creating, setCreating] = useState(false);
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  function createPin() {
    if (pin.length !== 4 || confirmPin.length !== 4) {
      setMessage("PIN must be 4 digits");
      return;
    }

    if (pin !== confirmPin) {
      setMessage("PINs do not match");
      return;
    }

    setMessage("PIN created (UI placeholder). Implement secure storage before enabling.");
    setPin("");
    setConfirmPin("");
  }

  return (
    <div className="rounded-xl border border-white/10 p-6">
      <h3 className="text-lg font-semibold">Screen Lock (PIN)</h3>
      <p className="mt-2 text-sm text-slate-400">
        Create a 4-digit PIN to supplement account security (UI placeholder).
      </p>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <input
          value={pin}
          onChange={(e) =>
            setPin(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))
          }
          placeholder="PIN"
          className="rounded-md bg-slate-900 px-3 py-2"
        />
        <input
          value={confirmPin}
          onChange={(e) =>
            setConfirmPin(e.target.value.replace(/[^0-9]/g, "").slice(0, 4))
          }
          placeholder="Confirm PIN"
          className="rounded-md bg-slate-900 px-3 py-2"
        />
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => createPin()}
          className="rounded-md bg-amber-400 px-4 py-2 font-bold text-slate-950"
        >
          Create PIN
        </button>
        <button
          onClick={() => setCreating((value) => !value)}
          className="rounded-md border border-amber-400/30 px-3 py-2 text-sm"
        >
          {creating ? "Cancel" : "Show guidance"}
        </button>
      </div>

      {message && <p className="mt-3 text-sm text-amber-300">{message}</p>}
    </div>
  );
}
