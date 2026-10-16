import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/perfitech%20logo.png"
            alt="Perfitech Global Venture Limited logo"
            className="h-14 w-auto max-w-[180px] object-contain"
          />
          <div className="flex flex-col">
            <span className="font-bold text-perfi-navy">
              PERFITECH
            </span>
            <span className="text-xs text-gray-600">
              GLOBAL VENTURE LIMITED
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex gap-4 items-center">
          <Link href="/about" className="text-gray-700 hover:text-perfi-navy">
            About
          </Link>
          <Link href="/services" className="text-gray-700 hover:text-perfi-navy">
            Services
          </Link>
          <Link href="/perfipay" className="text-gray-700 hover:text-perfi-navy">
            PerfiPay
          </Link>
          <Link href="/builder" className="text-perfi-navy font-semibold">
            Builder
          </Link>
        </nav>

        <div className="md:hidden">
          <span className="text-sm text-gray-600">Menu</span>
        </div>
      </div>
    </header>
  )
}
