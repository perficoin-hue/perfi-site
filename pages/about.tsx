import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function About(){
  return (
    <div>
      <Head>
        <title>About Us — Perfitech Global Venture Limited</title>
      </Head>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-perfi-navy">About Perfitech Global Venture Limited</h1>
        <p className="mt-4 text-gray-700">Perfitech Global Venture Limited is a diversified company focused on technology, investment, construction, real estate and more. We combine industry expertise with innovation to deliver value and growth.</p>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-perfi-navy">Our Mission</h2>
          <p className="mt-2 text-gray-600">To empower businesses and communities through technology-driven solutions and strategic investments.</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
