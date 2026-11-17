import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

const services = [
  { number: '01', icon: '💻', title: 'Technology & AI', desc: 'Build smarter with software development, digital platforms, AI-assisted website building and technology solutions.', tag: 'Digital innovation' },
  { number: '02', icon: '📈', title: 'Investment', desc: 'Explore investment initiatives, strategic partnerships and opportunities designed to support business growth.', tag: 'Growth opportunities' },
  { number: '03', icon: '🏗️', title: 'Construction', desc: 'Discover construction project planning, development support and solutions for building projects.', tag: 'Build the future' },
  { number: '04', icon: '🏢', title: 'Real Estate', desc: 'Explore property development, real estate projects and property-related business opportunities.', tag: 'Property & development' },
  { number: '05', icon: '🌐', title: 'Trading', desc: 'Connect with opportunities in commodity trading, commercial partnerships and international markets.', tag: 'Global commerce' },
  { number: '06', icon: '🌱', title: 'Agriculture', desc: 'Discover modern farming, agricultural value chains and agribusiness development opportunities.', tag: 'Sustainable growth' },
  { number: '07', icon: '🚢', title: 'Import & Export', desc: 'Explore international trade support, sourcing, logistics coordination and cross-border business opportunities.', tag: 'Trade without borders' },
  { number: '08', icon: '⚡', title: 'Oil & Gas', desc: 'Explore energy-sector initiatives, including our organic-waste-to-energy biogas solutions.', tag: 'Energy & industry' },
  { number: '09', icon: '🤝', title: 'Consultancy', desc: 'Get in touch to discuss business strategy, project planning, operational improvement and advisory needs.', tag: 'Expert guidance' },
]

const processSteps = ['Organic waste', 'Biogas digester', 'Biogas production', 'Gas cleaning']

export default function Services() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Head>
        <title>Our Services | Perfitech Global Venture Limited</title>
        <meta name="description" content="Explore Perfitech Global Venture Limited services, including oil and gas initiatives and biogas solutions that can turn suitable organic waste into cooking gas and electricity." />
      </Head>
      <Header />
      <main>
        <section className="bg-perfi-navy px-5 py-20 text-white sm:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-perfi-gold">Innovation | Invest | Build | Grow | Global</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl">One Vision.<br /><span className="text-perfi-gold">Multiple Industries.</span></h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">Discover connected services, fresh opportunities and practical solutions to help move your next idea forward.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#explore-services" className="rounded-lg bg-perfi-gold px-6 py-3 font-bold text-perfi-navy hover:brightness-110">Explore Our Services ↓</a>
              <Link href="/contact" className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white hover:border-perfi-gold hover:text-perfi-gold">Talk to Our Team</Link>
            </div>
          </div>
        </section>

        <section id="explore-services" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">What we do</p>
              <h2 className="mt-2 text-3xl font-extrabold text-perfi-navy sm:text-4xl">Explore our industries</h2>
            </div>
            <p className="max-w-lg leading-7 text-slate-600">Find the service that matches your ambition. Choose a category to learn more or contact us about your project.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article key={service.number} className="flex min-h-64 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-amber-400 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold tracking-widest text-slate-400">{service.number}</span>
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-amber-50 text-2xl" aria-hidden="true">{service.icon}</span>
                </div>
                <span className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-amber-700">{service.tag}</span>
                <h3 className="mt-2 text-xl font-extrabold text-perfi-navy">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-7 text-slate-600">{service.desc}</p>
                <Link href={service.title === 'Oil & Gas' ? '/services#biogas' : `/contact?service=${encodeURIComponent(service.title)}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-perfi-navy hover:text-amber-700">
                  {service.title === 'Oil & Gas' ? 'Explore biogas solutions' : 'Explore service'} <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section id="biogas" className="scroll-mt-6 bg-white px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-3xl bg-perfi-navy p-7 text-white sm:p-10 lg:p-14">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-perfi-gold">Oil & Gas | Renewable energy</p>
              <h2 className="mt-4 max-w-4xl text-3xl font-black leading-tight sm:text-5xl">PERFITECH BIOGAS SOLUTION</h2>
              <p className="mt-3 max-w-4xl text-xl font-extrabold leading-snug text-perfi-gold sm:text-3xl">TURNING YOUR WASTE INTO COOKING GAS AND ELECTRICITY.</p>
              <p className="mt-5 max-w-3xl leading-8 text-slate-300">We develop biogas project concepts that convert suitable organic waste into renewable biogas through anaerobic digestion. System design and energy use depend on a site-specific assessment.</p>
              <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {processSteps.map((step, index) => <div key={step} className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-4">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-perfi-gold font-black text-perfi-navy">{index + 1}</span>
                  <span className="font-bold">{step}</span>
                </div>)}
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-perfi-gold/60 bg-perfi-gold/10 p-5"><p className="text-sm font-extrabold uppercase tracking-wider text-perfi-gold">Option 1</p><p className="mt-2 text-lg font-bold">Cooking gas</p><p className="mt-1 text-sm leading-6 text-slate-300">Cleaned and conditioned gas can be supplied for cooking through a properly designed storage and distribution system.</p></div>
                <div className="rounded-xl border border-perfi-gold/60 bg-perfi-gold/10 p-5"><p className="text-sm font-extrabold uppercase tracking-wider text-perfi-gold">Option 2</p><p className="mt-2 text-lg font-bold">Electricity generation</p><p className="mt-1 text-sm leading-6 text-slate-300">Suitable biogas generators can produce electricity where the gas quality, demand and project design are appropriate.</p></div>
              </div>
              <div className="mt-4 rounded-xl border border-white/15 p-4 text-sm leading-6 text-slate-300"><strong className="text-white">By-product:</strong> Digestate may be suitable as a soil amendment after appropriate treatment and subject to local requirements.</div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/services#biogas" className="rounded-lg bg-perfi-gold px-6 py-3 font-bold text-perfi-navy hover:brightness-110">Explore Our Biogas Solutions →</Link>
                <Link href="/contact?service=Biogas%20Project%20Consultation" className="rounded-lg border border-white/30 px-6 py-3 font-bold text-white hover:border-perfi-gold hover:text-perfi-gold">Request a Project Consultation</Link>
              </div>
              <p className="mt-5 text-xs leading-5 text-slate-400">Gas production, electricity output and potential savings are not guaranteed and require assessment of feedstock, site conditions and system design.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
