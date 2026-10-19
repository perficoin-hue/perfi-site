
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import PerfiPayLayout from "../../components/perfipay/PerfiPayLayout";

const ProtectedRoute = dynamic(
  () => import("../../components/perfipay/ProtectedRoute"),
  { ssr: false }
);

const ProfileSettings = dynamic(
  () => import("../../components/perfipay/ProfileSettings"),
  { ssr: false }
);

const KYCStatus = dynamic(
  () => import("../../components/perfipay/KYCStatus"),
  { ssr: false }
);

export default function ProfilePage() {
  const [referralLink, setReferralLink] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const origin = window.location.origin;
    const referralCode = localStorage.getItem("perfi_referral_code");

    if (referralCode) {
      setReferralLink(
        `${origin}/perfi-pay?ref=${encodeURIComponent(referralCode)}`
      );
    }
  }, []);

  async function createReferralLink() {
    let code = localStorage.getItem("perfi_referral_code");

    if (!code) {
      code =
        "PERFI-" +
        Math.random().toString(36).slice(2, 10).toUpperCase();

      localStorage.setItem("perfi_referral_code", code);
    }

    const link =
      `${window.location.origin}/perfi-pay?ref=${encodeURIComponent(code)}`;

    setReferralLink(link);

    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  async function copyReferralLink() {
    if (!referralLink) return;

    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <ProtectedRoute>
      <PerfiPayLayout>
        <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6">
          <header>
            <h1 className="text-2xl font-bold text-slate-900">
              Profile &amp; Verification
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Manage your account, identity verification and referral link.
            </p>
          </header>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Your Referral Link
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Invite people to discover PerfiPay by sharing your personal link.
            </p>

            {referralLink ? (
              <div className="mt-4 space-y-3">
                <input
                  readOnly
                  value={referralLink}
                  aria-label="Your referral link"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm"
                  onFocus={(event) => event.currentTarget.select()}
                />
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={copyReferralLink}
                    className="rounded-xl bg-blue-900 px-4 py-3 font-semibold text-white"
                  >
                    {copied ? "Copied!" : "Copy referral link"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const text = encodeURIComponent(
                        `Join me on PerfiPay: ${referralLink}`
                      );
                      window.open(
                        `https://wa.me/?text=${text}`,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                    className="rounded-xl border border-slate-300 px-4 py-3 font-semibold text-slate-800"
                  >
                    Share on WhatsApp
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={createReferralLink}
                className="mt-4 rounded-xl bg-blue-900 px-5 py-3 font-semibold text-white"
              >
                Generate my referral link
              </button>
            )}

            <p className="mt-4 text-xs text-slate-500">
              Referral links are currently generated in this browser.
              Referral tracking, rewards and commissions require a secure
              backend integration.
            </p>
          </section>

          <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <h2 className="mb-3 text-lg font-semibold text-slate-900">
                Identity Verification (KYC)
              </h2>
              <KYCStatus />
            </div>

            <div>
              <h2 className="mb-3 text-lg font-semibold text-slate-900">
                Profile Settings
              </h2>
              <ProfileSettings />
            </div>
          </section>
        </main>
      </PerfiPayLayout>
    </ProtectedRoute>
  );
}
