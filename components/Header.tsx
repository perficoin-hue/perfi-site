mkdir -p components
cat > components/Header.tsx <<'EOF'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <a className="text-xl font-bold text-perfi-navy">PERFI SITE</a>
        </Link>
        <nav className="flex gap-4 items-center">
          <Link href="/"><a className="text-sm text-gray-700">Home</a></Link>
          <Link href="/builder/editor"><a className="text-sm text-gray-700">Editor</a></Link>
          <Link href="/admin/takedown"><a className="text-sm text-gray-700">Admin</a></Link>
        </nav>
      </div>
    </header>
  )
}
EOF
