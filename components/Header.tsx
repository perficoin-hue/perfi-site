import Link from 'next/link'

export default function Header(){
  return (
    <header className="border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="4" fill="#01294A" />
            <path d="M6 12h12" stroke="#C79A2F" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M6 8h12" stroke="#C79A2F" strokeWidth="1.5" strokeLinecap="round" transform="translate(0,6) rotate(0)" />
          </svg>
          <span className="font-bold text-perfi-navy">Perfitech</span>
        </Link>

        <nav className="hidden md:flex gap-4 items-center">
          <Link href="/about" className="text-gray-700 hover:text-perfi-navy">About</Link>
          <Link href="/services" className="text-gray-700 hover:text-perfi-navy">Services</Link>
          <Link href="/perfipay" className="text-gray-700 hover:text-perfi-navy">PerfiPay</Link>
          <Link href="/builder" className="text-perfi-navy font-semibold">Builder</Link>
        </nav>

        <div className="md:hidden">
          <span className="text-sm text-gray-600">Menu</span>
        </div>
      </div>
    </header>
  )
}
