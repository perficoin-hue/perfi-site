export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-perfi-navy">Perfitech Global Venture Limited</p>
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} Perfitech. All rights reserved.</p>
        </div>
        <div className="flex flex-col gap-2 text-sm sm:items-end">
          <a
            href="tel:+2348069387275"
            className="font-semibold text-perfi-navy hover:text-amber-700"
          >
            Call: +234 806 938 7275
          </a>
          <a
            href="https://wa.me/2348069387275"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-green-700 hover:text-green-800"
            aria-label="Chat with Perfitech on WhatsApp at +234 806 938 7275"
          >
            <span aria-hidden="true">☏</span> WhatsApp: +234 806 938 7275
          </a>
        </div>
      </div>
    </footer>
  )
}
