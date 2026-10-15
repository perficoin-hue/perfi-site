import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function PerfiPay(){
  return (
    <div>
      <Head>
        <title>PerfiPay — Perfitech</title>
      </Head>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-perfi-navy">PerfiPay</h1>
        <p className="mt-2 text-gray-600">PerfiPay is our payments and wallet service under development. This page contains product overview, security information and announcements. Live wallet or trading features will only be shown when implemented and authorised.</p>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-perfi-navy">Overview</h2>
          <p className="mt-2 text-gray-600">PerfiPay aims to provide secure payments, invoicing and merchant tools. Further details will be published as features are released.</p>
        </section>

      </main>
      <Footer />
    </div>
  )
}
