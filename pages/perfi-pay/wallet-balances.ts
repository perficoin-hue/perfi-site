import React from "react";

export default function WalletBalancesPage() {
  return React.createElement(
    "main",
    {
      style: {
        maxWidth: "720px",
        margin: "0 auto",
        padding: "48px 20px",
        color: "#e2e8f0",
        fontFamily: "Arial, sans-serif",
      },
    },
    React.createElement("p", { style: { color: "#fbbf24", fontWeight: 700 } }, "PERFIPAY WALLET"),
    React.createElement("h1", null, "Wallet balances"),
    React.createElement(
      "p",
      { style: { color: "#94a3b8", lineHeight: 1.7 } },
      "Live wallet balance services are not currently available. Please return to your PerfiPay dashboard."
    ),
    React.createElement(
      "a",
      { href: "/perfi-pay/dashboard", style: { color: "#fbbf24" } },
      "Back to dashboard"
    )
  );
}
