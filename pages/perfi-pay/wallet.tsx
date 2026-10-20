
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import PerfiPayLayout from "../../components/perfipay/PerfiPayLayout";
import ProtectedRoute from "../../components/perfipay/ProtectedRoute";
import { getSupabaseClient } from "../../lib/supabaseClient";

const networks = [
  { id: "BTC", name: "Bitcoin", symbol: "BTC" },
  { id: "ETH", name: "Ethereum", symbol: "ETH" },
  { id: "BSC", name: "BNB Smart Chain", symbol: "BNB" },
  { id: "POL", name: "Polygon", symbol: "POL" },
  { id: "SOL", name: "Solana", symbol: "SOL" },
  { id: "OTHER", name: "Other networks", symbol: "Other" },
];

const assetsByNetwork: Record<
  string,
  { symbol: string; name: string }[]
> = {
  BTC: [{ symbol: "BTC", name: "Bitcoin" }],
  ETH: [
    { symbol: "ETH", name: "Ether" },
    { symbol: "USDT", name: "Tether USD (Ethereum)" },
    { symbol: "USDC", name: "USD Coin (Ethereum)" },
  ],
  BSC: [
    { symbol: "BNB", name: "BNB" },
    { symbol: "USDT", name: "Tether USD (BSC)" },
    { symbol: "USDC", name: "USD Coin (BSC)" },
  ],
  POL: [
    { symbol: "POL", name: "POL" },
    { symbol: "USDT", name: "Tether USD (Polygon)" },
    { symbol: "USDC", name: "USD Coin (Polygon)" },
  ],
  SOL: [
    { symbol: "SOL", name: "Solana" },
    { symbol: "USDT", name: "Tether USD (Solana)" },
    { symbol: "USDC", name: "USD Coin (Solana)" },
  ],
  OTHER: [],
};

type Action = "send" | "receive" | "swap";

export default function WalletPage() {
  const [network, setNetwork] = useState("BSC");
  const [search, setSearch] = useState("");
  const [action, setAction] = useState<Action>("send");
  const [asset, setAsset] = useState("BNB");
  const [toAsset, setToAsset] = useState("USDT");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [notice, setNotice] = useState("");

  // Wallet creation and backup state.
  const [recoveryPhrase, setRecoveryPhrase] = useState<string | null>(null);
  const [pendingAddress, setPendingAddress] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [wordThree, setWordThree] = useState("");
  const [wordEight, setWordEight] = useState("");
  const [walletBusy, setWalletBusy] = useState(false);
  const [walletMessage, setWalletMessage] = useState("");
  const [walletLoading, setWalletLoading] = useState(true);

  const assets = assetsByNetwork[network] ?? [];
  const isEvmNetwork = ["ETH", "BSC", "POL"].includes(network);

  const filteredAssets = useMemo(
    () =>
      assets.filter((item) =>
        `${item.symbol} ${item.name}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [assets, search]
  );

  // Load the signed-in user's saved public address from Supabase.
  useEffect(() => {
    let cancelled = false;

    async function loadSavedWallet() {
      try {
        const supabase = getSupabaseClient();

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          if (!cancelled) {
            setWalletMessage(
              "Please sign in to load your saved wallet."
            );
          }
          return;
        }

        const { data, error } = await supabase
          .from("perfi_wallets")
          .select("public_address")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          if (!cancelled) {
            setWalletMessage(
              "Could not load your saved wallet. Check the Supabase table permissions."
            );
          }
          return;
        }

        if (!cancelled && data?.public_address) {
          setWalletAddress(data.public_address);
          setWalletMessage("Your saved wallet address has been loaded.");
        }
      } catch {
        if (!cancelled) {
          setWalletMessage(
            "Unable to load your wallet. Please refresh and try again."
          );
        }
      } finally {
        if (!cancelled) {
          setWalletLoading(false);
        }
      }
    }

    void loadSavedWallet();

    return () => {
      cancelled = true;
    };
  }, []);

  function changeNetwork(nextNetwork: string) {
    setNetwork(nextNetwork);
    setSearch("");
    setAsset(assetsByNetwork[nextNetwork]?.[0]?.symbol ?? "");
    setToAsset(assetsByNetwork[nextNetwork]?.[1]?.symbol ?? "");
    setNotice("");
  }

  function selectAction(nextAction: Action) {
    setAction(nextAction);
    setNotice("");
  }

  async function createWallet() {
    if (walletLoading) {
      setWalletMessage("Please wait while we check for your saved wallet.");
      return;
    }

    if (walletAddress) {
      setWalletMessage(
        "A saved wallet address is already available. Use that wallet instead of creating another one."
      );
      return;
    }

    setWalletBusy(true);
    setWalletMessage("");

    try {
      const { Wallet } = await import("ethers");
      const created = Wallet.createRandom();
      const phrase = created.mnemonic?.phrase;

      if (!phrase) {
        throw new Error("Wallet recovery phrase could not be created.");
      }

      setRecoveryPhrase(phrase);
      setPendingAddress(created.address);
      setWordThree("");
      setWordEight("");
      setWalletMessage(
        "Write down all 12 words in the correct order on paper. Never share your phrase with anyone."
      );
    } catch {
      setWalletMessage(
        "Wallet creation failed. Check that ethers is installed, then try again."
      );
    } finally {
      setWalletBusy(false);
    }
  }

  // Verify the backup, then save only the public address.
  async function confirmWalletBackup() {
    if (!recoveryPhrase || !pendingAddress) return;

    const words = recoveryPhrase.trim().split(/\s+/);

    const thirdMatches =
      wordThree.trim().toLowerCase() === words[2]?.toLowerCase();

    const eighthMatches =
      wordEight.trim().toLowerCase() === words[7]?.toLowerCase();

    if (!thirdMatches || !eighthMatches) {
      setWalletMessage(
        "The words do not match. Check word 3 and word 8 on your written backup."
      );
      return;
    }

    setWalletBusy(true);
    setWalletMessage("");

    try {
      const supabase = getSupabaseClient();

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setWalletMessage(
          "Please sign in again before saving your wallet address. Keep your written backup safe."
        );
        return;
      }

      // Do not overwrite an existing wallet for this account.
      const { data: existingWallet, error: lookupError } = await supabase
        .from("perfi_wallets")
        .select("public_address")
        .eq("user_id", user.id)
        .maybeSingle();

      if (lookupError) {
        setWalletMessage(
          "Could not check your existing wallet. Your recovery phrase remains on this page. Please try again."
        );
        return;
      }

      if (existingWallet?.public_address) {
        setWalletAddress(existingWallet.public_address);
        setWalletMessage(
          "This account already has a saved wallet. The existing address was kept, and the new address was not saved. Do not discard the new recovery phrase until you have safely resolved this."
        );
        return;
      }

      const { error: saveError } = await supabase
        .from("perfi_wallets")
        .insert({
          user_id: user.id,
          public_address: pendingAddress,
          chain_family: "EVM",
        });

      if (saveError) {
        setWalletMessage(
          "Could not save your wallet address. Your recovery phrase remains on this page. Check the table permissions and try again."
        );
        return;
      }

      setWalletAddress(pendingAddress);
      setRecoveryPhrase(null);
      setPendingAddress("");
      setWordThree("");
      setWordEight("");

      setWalletMessage(
        "Backup check passed. Your public wallet address is saved to your account. Your recovery phrase was not saved."
      );
    } catch {
      setWalletMessage(
        "Something went wrong while saving your wallet. Your recovery phrase remains on this page. Please try again."
      );
    } finally {
      setWalletBusy(false);
    }
  }

  function handleReview() {
    if (network === "OTHER") {
      setNotice("Choose a supported network before continuing.");
      return;
    }

    if (!asset) {
      setNotice("Select an asset on the chosen network.");
      return;
    }

    if (
      action === "send" &&
      (!address.trim() || !amount || Number(amount) <= 0)
    ) {
      setNotice("Enter a valid recipient address and amount.");
      return;
    }

    if (action === "swap" && (!toAsset || toAsset === asset)) {
      setNotice("Select two different assets supported by this network.");
      return;
    }

    if (action === "swap" && (!amount || Number(amount) <= 0)) {
      setNotice("Enter a valid amount to review.");
      return;
    }

    if (action === "receive" && !walletAddress) {
      setNotice(
        "Create and back up an EVM wallet first. Other network wallets are not implemented yet."
      );
      return;
    }

    if (
      action === "send" &&
      isEvmNetwork &&
      walletAddress &&
      !/^0x[a-fA-F0-9]{40}$/.test(address.trim())
    ) {
      setNotice("Enter a valid EVM recipient address beginning with 0x.");
      return;
    }

    setNotice(
      "Review only: live balances, blockchain signing, and provider quotes are not connected. No transaction has been sent."
    );
  }

  return (
    <ProtectedRoute>
      <PerfiPayLayout>
        <div className="space-y-6">
          <div>
            <Link
              href="/perfi-pay/dashboard"
              className="text-sm text-amber-400 hover:text-amber-300"
            >
              ← Dashboard
            </Link>

            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.2em] text-amber-400">
              MENU 01
            </p>

            <h1 className="mt-2 text-3xl font-bold">Crypto Wallet</h1>

            <p className="mt-2 text-slate-400">
              Create an EVM wallet, verify your backup, and explore supported
              network assets.
            </p>
          </div>

          {/* Wallet creation and recovery phrase backup */}
          <section className="space-y-4 rounded-2xl border border-amber-400/30 bg-slate-900 p-5">
            <div>
              <h2 className="text-xl font-bold">Create your PerfiPay wallet</h2>
              <p className="mt-2 text-sm text-slate-400">
                Generate a wallet for Ethereum, BNB Smart Chain, and Polygon.
                These networks use the same EVM address for this wallet.
              </p>
            </div>

            <div className="rounded-xl border border-red-500/30 bg-red-950/30 p-4">
              <p className="font-semibold text-red-300">
                Important security warning
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Your recovery phrase controls your wallet funds. Anyone who
                gets it may take your assets. Never share it with anyone,
                including PerfiPay support. Do not use this prototype wallet
                to store real funds until the wallet has been independently
                security-reviewed.
              </p>
            </div>

            {walletLoading && (
              <p className="text-sm text-slate-400">
                Checking for your saved wallet...
              </p>
            )}

            {!walletLoading && !walletAddress && !recoveryPhrase && (
              <button
                type="button"
                onClick={createWallet}
                disabled={walletBusy}
                className="w-full rounded-xl bg-amber-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {walletBusy ? "Creating wallet..." : "Create new EVM wallet"}
              </button>
            )}

            {recoveryPhrase && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-amber-300">
                    Your 12-word recovery phrase
                  </h3>
                  <p className="mt-2 text-sm text-slate-300">
                    Write the words down in order on paper. Do not take a
                    screenshot, send them in a message, or store them online.
                    Confirm the requested words below before leaving this page.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {recoveryPhrase.split(" ").map((word, index) => (
                    <div
                      key={`${index}-${word}`}
                      className="rounded-lg border border-white/10 bg-slate-950 p-3"
                    >
                      <span className="block text-xs text-slate-500">
                        Word {index + 1}
                      </span>
                      <span className="mt-1 block break-words font-semibold text-white">
                        {word}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-amber-400/20 bg-slate-950 p-4">
                  <label
                    htmlFor="backup-word-three"
                    className="block text-sm text-slate-300"
                  >
                    Enter word 3 from your written backup
                  </label>
                  <input
                    id="backup-word-three"
                    type="password"
                    autoComplete="off"
                    spellCheck={false}
                    value={wordThree}
                    onChange={(event) => setWordThree(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-amber-400"
                    placeholder="Word 3"
                  />

                  <label
                    htmlFor="backup-word-eight"
                    className="mt-4 block text-sm text-slate-300"
                  >
                    Enter word 8 from your written backup
                  </label>
                  <input
                    id="backup-word-eight"
                    type="password"
                    autoComplete="off"
                    spellCheck={false}
                    value={wordEight}
                    onChange={(event) => setWordEight(event.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-amber-400"
                    placeholder="Word 8"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => void confirmWalletBackup()}
                  disabled={walletBusy}
                  className="w-full rounded-xl bg-amber-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {walletBusy ? "Saving wallet..." : "Confirm written backup"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setRecoveryPhrase(null);
                    setPendingAddress("");
                    setWordThree("");
                    setWordEight("");
                    setWalletMessage(
                      "The displayed phrase has been cleared from this page. Only do this after safely backing it up."
                    );
                  }}
                  className="w-full rounded-xl border border-white/10 px-5 py-3 font-semibold text-slate-300 hover:border-red-400/50"
                >
                  Clear phrase from page
                </button>
              </div>
            )}

            {walletAddress && (
              <div className="space-y-3 rounded-xl border border-emerald-400/20 bg-slate-950 p-4">
                <p className="font-semibold text-emerald-300">
                  EVM public address
                </p>
                <p className="break-all font-mono text-sm text-white">
                  {walletAddress}
                </p>
                <p className="text-xs text-slate-400">
                  This public address is saved in your PerfiPay account.
                  Ethereum, BNB Smart Chain, and Polygon use this same EVM
                  address. Saving the address does not save your recovery
                  phrase or enable transaction signing.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    void navigator.clipboard
                      .writeText(walletAddress)
                      .then(() =>
                        setWalletMessage("Public address copied.")
                      )
                      .catch(() =>
                        setWalletMessage(
                          "Could not copy automatically. Select and copy the public address manually."
                        )
                      );
                  }}
                  className="rounded-xl border border-amber-400/30 px-4 py-2 text-sm font-semibold text-amber-300 hover:bg-amber-400/10"
                >
                  Copy public address
                </button>
              </div>
            )}

            {walletMessage && (
              <p
                role="status"
                className="rounded-xl border border-amber-400/20 bg-slate-950 p-3 text-sm text-amber-200"
              >
                {walletMessage}
              </p>
            )}

            {!isEvmNetwork && (
              <p className="text-sm text-amber-200">
                The generated wallet does not support {network} addresses.
                Bitcoin and Solana wallet creation must be implemented
                separately. Do not send funds to the EVM address from these
                networks.
              </p>
            )}
          </section>

          <section className="rounded-2xl border border-amber-400/20 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Total crypto balance</p>
            <p className="mt-2 text-2xl font-bold text-amber-400">
              Not connected
            </p>
            <p className="mt-2 text-xs text-slate-500">
              A verified blockchain balance provider is needed to display real
              funds.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Select network</h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {networks.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => changeNetwork(item.id)}
                  className={`rounded-xl border p-3 text-left transition ${
                    network === item.id
                      ? "border-amber-400 bg-amber-400/10 text-amber-300"
                      : "border-white/10 bg-slate-900 text-slate-300 hover:border-amber-400/40"
                  }`}
                >
                  <span className="block font-semibold">{item.id}</span>
                  <span className="mt-1 block text-xs">{item.name}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-slate-900 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-semibold">Assets on {network}</h2>
              <span className="text-xs text-slate-400">
                {assets.length} listed
              </span>
            </div>

            <label
              htmlFor="token-search"
              className="mt-4 block text-sm text-slate-400"
            >
              Search this network&apos;s assets
            </label>
            <input
              id="token-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={`Search ${network} tokens...`}
              className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none focus:border-amber-400"
            />

            {network === "OTHER" ? (
              <p className="mt-4 text-sm text-slate-400">
                Other networks require configuration before their assets can
                be displayed.
              </p>
            ) : filteredAssets.length === 0 ? (
              <p className="mt-4 text-sm text-slate-400">
                No matching asset in this list.
              </p>
            ) : (
              <div className="mt-4 divide-y divide-white/10">
                {filteredAssets.map((item) => (
                  <button
                    key={`${network}-${item.symbol}`}
                    type="button"
                    onClick={() => {
                      setAsset(item.symbol);
                      setNotice("");
                    }}
                    className={`flex w-full items-center justify-between gap-3 py-4 text-left ${
                      asset === item.symbol ? "text-amber-300" : "text-white"
                    }`}
                  >
                    <span>
                      <span className="block font-semibold">{item.symbol}</span>
                      <span className="mt-1 block text-xs text-slate-400">
                        {item.name}
                      </span>
                    </span>
                    <span className="text-xs text-slate-400">
                      {asset === item.symbol ? "Selected" : "Select"}
                    </span>
                  </button>
                ))}
              </div>
            )}

            <p className="mt-3 text-xs text-slate-500">
              Starter token list only. A verified token registry is needed for
              a complete list and real balances.
            </p>
          </section>

          <section className="rounded-2xl border border-amber-400/20 bg-slate-900 p-4 sm:p-5">
            <div className="grid grid-cols-3 gap-2">
              {(["send", "receive", "swap"] as Action[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => selectAction(item)}
                  className={`rounded-xl px-3 py-3 text-sm font-semibold capitalize ${
                    action === item
                      ? "bg-amber-400 text-slate-950"
                      : "border border-white/10 text-slate-300 hover:border-amber-400/40"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <h2 className="mt-6 text-xl font-bold capitalize">
              {action} {action === "swap" ? "assets" : asset}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Network: {networks.find((item) => item.id === network)?.name}
            </p>

            {action === "receive" ? (
              <div className="mt-5 rounded-xl border border-white/10 bg-slate-950 p-4">
                <p className="text-sm text-slate-300">
                  Receiving asset: {asset || "Select an asset"}
                </p>

                {isEvmNetwork && walletAddress ? (
                  <>
                    <p className="mt-3 break-all font-mono text-sm text-white">
                      {walletAddress}
                    </p>
                    <p className="mt-3 text-xs text-amber-300">
                      Verify the network carefully before receiving assets.
                      Only use this address for supported EVM networks.
                    </p>
                  </>
                ) : (
                  <p className="mt-2 text-sm text-slate-400">
                    {isEvmNetwork
                      ? "Create an EVM wallet above to display your receiving address."
                      : "A wallet for this network has not been implemented yet."}
                  </p>
                )}

                <p className="mt-3 text-xs text-amber-300">
                  Never deposit using an address from a different network.
                </p>
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                {action === "swap" && (
                  <div>
                    <label
                      htmlFor="swap-to"
                      className="block text-sm text-slate-400"
                    >
                      Swap to
                    </label>
                    <select
                      id="swap-to"
                      value={toAsset}
                      onChange={(event) => setToAsset(event.target.value)}
                      className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white"
                    >
                      <option value="">Select destination asset</option>
                      {assets
                        .filter((item) => item.symbol !== asset)
                        .map((item) => (
                          <option key={item.symbol} value={item.symbol}>
                            {item.symbol} — {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="send-amount"
                    className="block text-sm text-slate-400"
                  >
                    Amount ({asset || "asset"})
                  </label>
                  <input
                    id="send-amount"
                    type="number"
                    min="0"
                    step="any"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    placeholder="Enter amount"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white"
                  />
                </div>

                {action === "send" && (
                  <div>
                    <label
                      htmlFor="recipient"
                      className="block text-sm text-slate-400"
                    >
                      Recipient address
                    </label>
                    <input
                      id="recipient"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      placeholder="Enter the recipient address"
                      autoComplete="off"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white"
                    />
                  </div>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={handleReview}
              className="mt-5 w-full rounded-xl bg-amber-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-amber-300"
            >
              {action === "send"
                ? "Review transfer"
                : action === "receive"
                  ? "Check receiving setup"
                  : "Review swap"}
            </button>

            {notice && (
              <p
                role="status"
                className="mt-4 rounded-xl border border-amber-400/20 bg-slate-950 p-3 text-sm text-amber-200"
              >
                {notice}
              </p>
            )}
          </section>
        </div>
      </PerfiPayLayout>
    </ProtectedRoute>
  );
}
