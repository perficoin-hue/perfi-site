import Link from 'next/link'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home(){
  return (
    <div>
      <Head>
        <title>PERFI SITE — Perfitech Global Venture Limited</title>
        <meta name="description" content="Perfitech Global Venture Limited — INNOVATION | INVEST | BUILD | GROW | GLOBAL" />
      </Head>

      <Header />

      <main className="max-w-6xl mx-auto px-4 py-16">
        <section className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-perfi-navy">Perfitech Global Venture Limited</h1>
          <p className="mt-4 text-lg text-gray-700">INNOVATION | INVEST | BUILD | GROW | GLOBAL</p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/builder" className="inline-block px-6 py-3 rounded-md text-white bg-perfi-gold font-semibold">PERFI SITE Website Builder</Link>
            <Link href="/perfipay" className="inline-block px-6 py-3 rounded-md text-perfi-navy border border-perfi-gold font-semibold">PerfiPay</Link>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-perfi-navy">Our Services</h2>
          <p className="mt-2 text-gray-600">We provide a wide range of services across multiple industries. Learn more on our Services page.</p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold text-perfi-navy">Technology</h3>
              <p className="mt-2 text-sm text-gray-600">Software, platforms and digital transformation solutions.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold text-perfi-navy">Investment</h3>
              <p className="mt-2 text-sm text-gray-600">Strategic investment opportunities and capital partnerships.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold text-perfi-navy">Construction & Real Estate</h3>
              <p className="mt-2 text-sm text-gray-600">Development, projects and property management services.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold text-perfi-navy">Trading & Agriculture</h3>
              <p className="mt-2 text-sm text-gray-600">Commodity trading and modern agricultural solutions.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold text-perfi-navy">Import, Export & Oil/Gas</h3>
              <p className="mt-2 text-sm text-gray-600">International trade and energy sector projects.</p>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="font-semibold text-perfi-navy">Consultancy</h3>
              <p className="mt-2 text-sm text-gray-600">Business strategy, compliance and advisory services.</p>
            </div>
          </div>
        </section>

        <section className="mt-16 bg-gradient-to-r from-perfi-navy/5 to-white border rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-perfi-navy">PERFI SITE Website Builder</h2>
          <p className="mt-2 text-gray-600">Create and host your website with our builder. Choose AI-powered generation or manual editing.</p>
          <div className="mt-4 flex gap-4">
            <Link href="/builder/ai" className="px-5 py-3 bg-perfi-gold text-white rounded-md">Build with AI</Link>
            <Link href="/builder/manual" className="px-5 py-3 border border-perfi-gold text-perfi-navy rounded-md">Build Manually</Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
