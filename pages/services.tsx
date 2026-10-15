import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

const services = [
  {title: 'Technology', desc: 'Software, platforms and digital transformation solutions.'},
  {title: 'Investment', desc: 'Strategic investment opportunities and capital partnerships.'},
  {title: 'Construction', desc: 'Construction project management and delivery.'},
  {title: 'Real Estate', desc: 'Property development and asset management.'},
  {title: 'Trading', desc: 'International commodity trading services.'},
  {title: 'Agriculture', desc: 'Modern agricultural projects and value chains.'},
  {title: 'Import and Export', desc: 'Customs, logistics and global trade solutions.'},
  {title: 'Oil and Gas', desc: 'Energy sector projects and partnerships.'},
  {title: 'Consultancy', desc: 'Business strategy, advisory and compliance services.'}
]

export default function Services(){
  return (
    <div>
      <Head>
        <title>Our Services — Perfitech</title>
      </Head>
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-perfi-navy">Our Services</h1>
        <p className="mt-2 text-gray-600">We provide a broad range of services across multiple industries. Contact us to discuss your project.</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(s => (
            <div key={s.title} className="p-6 border rounded-lg">
              <h3 className="font-semibold text-perfi-navy">{s.title}</h3>
              <p className="mt-2 text-gray-600">{s.desc}</p>
              <button className="mt-4 px-4 py-2 bg-perfi-gold text-white rounded">Enquire</button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
