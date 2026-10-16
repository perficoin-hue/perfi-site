
import Link from "next/link";

export default function Support() {
  const items = [
    {
      title: "Company Services",
      description:
        "Questions about our technology, construction, real estate, trading, agriculture, or consultancy services.",
    },
    {
      title: "Website Builder",
      description:
        "Help with building, managing, and hosting your website.",
    },
    {
      title: "PerfiPay",
      description:
        "Questions about the PerfiPay platform and its services.",
    },
    {
      title: "Technical Support",
      description:
        "Report a website problem or request technical assistance.",
    },
  ];

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "48px 20px",
        color: "#10233f",
      }}
    >
      <p style={{ color: "#b58b35", fontWeight: 700 }}>
        PERFITECH GLOBAL VENTURE LIMITED
      </p>

      <h1>Customer Support</h1>

      <p>
        We are here to help with your questions and enquiries.
        Choose the category that best describes what you need.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "16px",
          marginTop: "28px",
        }}
      >
        {items.map((item) => (
          <section
            key={item.title}
            style={{
              border: "1px solid #e2e8f0",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <Link
              href={`/contact?service=${encodeURIComponent(item.title)}`}
            >
              Contact support →
            </Link>
          </section>
        ))}
      </div>

      <section
        style={{
          marginTop: "32px",
          padding: "24px",
          background: "#f1f5f9",
          borderRadius: "12px",
        }}
      >
        <h2>Email Support</h2>
        <p>
          You can also contact our support team directly:
        </p>
        <a href="mailto:support@perfiech.org">
          support@perfiech.org
        </a>
      </section>
    </main>
  );
}
