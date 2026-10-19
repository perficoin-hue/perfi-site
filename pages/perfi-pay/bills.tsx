
import dynamic from "next/dynamic";
import { useState } from "react";
import PerfiPayLayout from "../../components/perfipay/PerfiPayLayout";

const ProtectedRoute = dynamic(
  () => import("../../components/perfipay/ProtectedRoute"),
  { ssr: false }
);

const BillPayments = dynamic(
  () => import("../../components/perfipay/BillPayments"),
  { ssr: false }
);

type Service = "bills" | "flights";

export default function BillsPage() {
  const [service, setService] = useState<Service>("bills");

  return (
    <ProtectedRoute>
      <PerfiPayLayout>
        <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6">
          <header>
            <h1 className="text-2xl font-bold text-slate-900">
              Bills & Travel
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Manage everyday bills and explore air-ticket bookings with
              PerfiPay.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setService("bills")}
              className={`rounded-2xl border p-5 text-left ${
                service === "bills"
                  ? "border-blue-700 bg-blue-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <span className="text-2xl">🧾</span>
              <h2 className="mt-3 font-semibold text-slate-900">
                Pay Bills
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Electricity, airtime, data and other supported services.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setService("flights")}
              className={`rounded-2xl border p-5 text-left ${
                service === "flights"
                  ? "border-blue-700 bg-blue-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <span className="text-2xl">✈️</span>
              <h2 className="mt-3 font-semibold text-slate-900">
                Air Tickets
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Search flights and prepare your ticket booking.
              </p>
            </button>
          </div>

          {service === "bills" ? (
            <BillPayments />
          ) : (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">
                Book an Air Ticket
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Enter your travel details to prepare a flight search.
              </p>

              <FlightSearchForm />
            </section>
          )}
        </main>
      </PerfiPayLayout>
    </ProtectedRoute>
  );
}

function FlightSearchForm() {
  const [trip, setTrip] = useState("round-trip");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [message, setMessage] = useState("");

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (from.trim().toLowerCase() === to.trim().toLowerCase()) {
      setMessage("Choose different departure and destination airports.");
      return;
    }

    if (trip === "round-trip" && returnDate && returnDate < departure) {
      setMessage("Return date cannot be before the departure date.");
      return;
    }

    const details = [
      `Trip: ${trip === "round-trip" ? "Round trip" : "One way"}`,
      `From: ${from.trim()}`,
      `To: ${to.trim()}`,
      `Departure: ${departure}`,
      ...(trip === "round-trip" ? [`Return: ${returnDate || "Not selected"}`] : []),
      `Passengers: ${passengers}`,
    ];

    setMessage(
      "Your flight-search details are ready. Live fares and ticket purchases " +
        "are not connected yet.\n\n" +
        details.join("\n")
    );
  }

  return (
    <form onSubmit={handleSearch} className="mt-5 space-y-4">
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setTrip("round-trip")}
          className={`rounded-full border px-4 py-2 text-sm ${
            trip === "round-trip"
              ? "border-blue-700 bg-blue-50"
              : "border-slate-300"
          }`}
        >
          Round trip
        </button>
        <button
          type="button"
          onClick={() => setTrip("one-way")}
          className={`rounded-full border px-4 py-2 text-sm ${
            trip === "one-way"
              ? "border-blue-700 bg-blue-50"
              : "border-slate-300"
          }`}
        >
          One way
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          From (city or airport)
          <input
            required
            value={from}
            onChange={(event) => setFrom(event.target.value)}
            placeholder="e.g. Lagos (LOS)"
            className="mt-1 w-full rounded-xl border border-slate-300 p-3"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          To (city or airport)
          <input
            required
            value={to}
            onChange={(event) => setTo(event.target.value)}
            placeholder="e.g. Abuja (ABV)"
            className="mt-1 w-full rounded-xl border border-slate-300 p-3"
          />
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Departure date
          <input
            required
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={departure}
            onChange={(event) => setDeparture(event.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 p-3"
          />
        </label>

        {trip === "round-trip" && (
          <label className="block text-sm font-medium text-slate-700">
            Return date
            <input
              required
              type="date"
              min={departure || new Date().toISOString().split("T")[0]}
              value={returnDate}
              onChange={(event) => setReturnDate(event.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 p-3"
            />
          </label>
        )}

        <label className="block text-sm font-medium text-slate-700">
          Passengers
          <select
            value={passengers}
            onChange={(event) => setPassengers(event.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-300 p-3"
          >
            <option value="1">1 passenger</option>
            <option value="2">2 passengers</option>
            <option value="3">3 passengers</option>
            <option value="4">4 passengers</option>
            <option value="5">5 passengers</option>
            <option value="6">6 passengers</option>
            <option value="7">7 passengers</option>
            <option value="8">8 passengers</option>
            <option value="9">9 passengers</option>
          </select>
        </label>
      </div>

      <button
        type="submit"
        className="rounded-xl bg-blue-900 px-5 py-3 font-semibold text-white"
      >
        Prepare Flight Search
      </button>

      {message && (
        <pre
          aria-live="polite"
          className="whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm text-slate-700"
        >
          {message}
        </pre>
      )}
    </form>
  );
}
