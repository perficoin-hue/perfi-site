export default function Footer(){
  return (
    <footer className="mt-16 border-t">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <p className="font-semibold text-perfi-navy">Perfitech Global Venture Limited</p>
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} Perfitech. All rights reserved.</p>
        </div>
        <div className="text-sm text-gray-600">Privacy • Terms • Contact</div>
      </div>
    </footer>
  )
}
