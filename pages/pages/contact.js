
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "Company Services",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setStatus("");
    setSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Message could not be sent.");
      }

      setStatus("Thank you! Your enquiry has been submitted.");
      setForm({
        name: "",
        email: "",
        service: "Company Services",
        subject: "",
        message: "",
      });
    } catch (error) {
      setStatus(
        error.message ||
          "Unable to send your message. Please try again."
      );
    } finally {
      setSending(false);
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    marginTop: "6px",
    boxSizing: "border-box",
    fontSize: "16px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "16px",
    fontWeight: 600,
  };

  return (
    <main
      style={{
        maxWidth: "760px",
        margin: "0 auto",
        padding: "48px 20px",
        color: "#10233f",
      }}
    >
      <p style={{ color: "#b58b35", fontWeight: 700 }}>
        PERFITECH GLOBAL VENTURE LIMITED
      </p>

      <h1>Contact Us</h1>
      <p>
        Tell us how we can help with our services, website
        building, technology, investment, or PerfiPay enquiries.
      </p>

      <form
        onSubmit={submit}
        style={{
          marginTop: "28px",
          padding: "24px",
          border: "1px solid #e2e8f0",
          borderRadius: "14px",
        }}
      >
        <label style={labelStyle}>
          Full name
          <input
            style={inputStyle}
            name="name"
            value={form.name}
            onChange={update}
            required
            maxLength={100}
            autoComplete="name"
          />
        </label>

        <label style={labelStyle}>
          Email address
          <input
            style={inputStyle}
            type="email"
            name="email"
            value={form.email}
            onChange={update}
            required
            maxLength={254}
            autoComplete="email"
          />
        </label>

        <label style={labelStyle}>
          Enquiry category
          <select
            style={inputStyle}
            name="service"
            value={form.service}
            onChange={update}
          >
            <option>Company Services</option>
            <option>Website Builder</option>
            <option>Technical Support</option>
            <option>PerfiPay</option>
            <option>Investment</option>
            <option>Other Enquiry</option>
          </select>
        </label>

        <label style={labelStyle}>
          Subject
          <input
            style={inputStyle}
            name="subject"
            value={form.subject}
            onChange={update}
            required
            maxLength={150}
          />
        </label>

        <label style={labelStyle}>
          Your message
          <textarea
            style={{ ...inputStyle, minHeight: "150px" }}
            name="message"
            value={form.message}
            onChange={update}
            required
            maxLength={5000}
          />
        </label>

        <button
          type="submit"
          disabled={sending}
          style={{
            background: "#10233f",
            color: "white",
            border: 0,
            borderRadius: "8px",
            padding: "14px 22px",
            cursor: sending ? "wait" : "pointer",
          }}
        >
          {sending ? "Sending..." : "Submit Enquiry"}
        </button>

        {status && (
          <p role="status" aria-live="polite">{status}</p>
        )}
      </form>

      <p style={{ marginTop: "24px" }}>
        Prefer email? Contact us at{" "}
        <a href="mailto:support@perfiech.org">
          support@perfiech.org
        </a>
      </p>
    </main>
  );
}
