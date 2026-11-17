import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

const serviceCards = [
  { number: '01', icon: '💻', title: 'Technology & AI', description: 'Software development, digital platforms, AI-assisted website building and technology solutions.', tag: 'Digital innovation' },
  { number: '02', icon: '📈', title: 'Investment', description: 'Investment initiatives, strategic partnerships and opportunities designed to support business growth.', tag: 'Growth opportunities' },
  { number: '03', icon: '🏗️', title: 'Construction', description: 'Construction project planning, development support and solutions for building projects.', tag: 'Build the future' },
  { number: '04', icon: '🏢', title: 'Real Estate', description: 'Property development, real estate projects and property-related business opportunities.', tag: 'Property & development' },
  { number: '05', icon: '🌐', title: 'Trading', description: 'Commodity trading, commercial partnerships and international market opportunities.', tag: 'Global commerce' },
  { number: '06', icon: '🌱', title: 'Agriculture', description: 'Modern farming, agricultural value chains and agribusiness development opportunities.', tag: 'Sustainable growth' },
  { number: '07', icon: '🚢', title: 'Import & Export', description: 'International trade support, sourcing, logistics coordination and cross-border business opportunities.', tag: 'Trade without borders' },
  { number: '08', icon: '⚡', title: 'Oil & Gas', description: 'Energy-sector initiatives, including organic-waste-to-energy biogas solutions and training.', tag: 'Energy & industry' },
  { number: '09', icon: '🤝', title: 'Consultancy', description: 'Business strategy, project planning, operational improvement and advisory support.', tag: 'Expert guidance' },
]

const processSteps = ['Organic waste', 'Biogas digester', 'Biogas production', 'Gas cleaning']

export default function Services() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Head>
        <title>Our Services | Perfitech Global Venture Limited</title>
        <meta name="description" content="Explore Perfitech Global Venture Limited services, including biogas project solutions and training for converting suitable organic waste into cooking gas and electricity." />
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
            {serviceCards.map((service) => (
              <article key={service.number} className="flex min-h-64 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-amber-400 hover:shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold tracking-widest text-slate-400">{service.number}</span>
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-amber-50 text-2xl" aria-hidden="true">{service.icon}</span>
                </div>
                <span className="mt-5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-amber-700">{service.tag}</span>
                <h3 className="mt-2 text-xl font-extrabold text-perfi-navy">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-7 text-slate-600">{service.description}</p>
                <Link href={service.title === 'Oil & Gas' ? '/biogas' : `/contact?service=${encodeURIComponent(service.title)}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-perfi-navy hover:text-amber-700">
                  {service.title === 'Oil & Gas' ? 'Explore biogas solutions' : 'Contact about this service'} <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section id="biogas" className="scroll-mt-6 bg-white px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-3xl bg-perfi-navy text-white shadow-xl">
              <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
                <div className="p-7 sm:p-10 lg:p-14">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-perfi-gold">Oil & Gas | Renewable energy</p>
                  <h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">PERFITECH BIOGAS SOLUTION</h2>
                  <p className="mt-3 text-xl font-extrabold leading-snug text-perfi-gold sm:text-3xl">TURNING YOUR WASTE INTO COOKING GAS AND ELECTRICITY.</p>
                  <p className="mt-5 leading-8 text-slate-300">Suitable organic waste can be converted into renewable biogas through anaerobic digestion. We help people explore the process, energy options and training; system design and outcomes depend on a site-specific assessment.</p>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Link href="/biogas" className="rounded-lg bg-perfi-gold px-5 py-3 font-extrabold text-perfi-navy hover:brightness-110">Explore Biogas Solutions →</Link>
                    <Link href="/contact?service=Biogas%20Project%20Consultation" className="rounded-lg border border-white/30 px-5 py-3 font-bold text-white hover:border-perfi-gold hover:text-perfi-gold">Request a Project Consultation</Link>
                  </div>
                </div>
                <div className="grid min-h-72 grid-cols-2 grid-rows-2 gap-1 bg-white/10">
                  <img className="h-40 w-full object-cover sm:h-52" src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=90" alt="Organic food waste as a potential biogas feedstock; illustrative image" loading="lazy" />
                  <img className="h-40 w-full object-cover sm:h-52" src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=90" alt="Kitchen representing a possible cooking-gas application; illustrative image" loading="lazy" />
                  <img className="h-40 w-full object-cover sm:h-52" src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=90" alt="Technical energy equipment representing generator applications; illustrative image" loading="lazy" />
                  <img className="h-40 w-full object-cover sm:h-52" src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=900&q=90" alt="Industrial equipment representing a complete energy installation; illustrative image" loading="lazy" />
                </div>
              </div>
              <div className="border-t border-white/10 px-7 py-7 sm:px-10 lg:px-14">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-perfi-gold">The process at a glance</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {processSteps.map((step, index) => <div key={step} className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/5 p-4">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-perfi-gold font-black text-perfi-navy">{index + 1}</span><span className="font-bold">{step}</span>
                  </div>)}
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-perfi-gold/60 bg-perfi-gold/10 p-5"><p className="text-xs font-extrabold uppercase tracking-wider text-perfi-gold">Energy option 1</p><p className="mt-2 text-lg font-bold">Cooking gas</p><p className="mt-1 text-sm leading-6 text-slate-300">Gas cleaned and conditioned as necessary, with properly designed storage and safe distribution for domestic or commercial cooking.</p></div>
                  <div className="rounded-xl border border-perfi-gold/60 bg-perfi-gold/10 p-5"><p className="text-xs font-extrabold uppercase tracking-wider text-perfi-gold">Energy option 2</p><p className="mt-2 text-lg font-bold">Electricity generation</p><p className="mt-1 text-sm leading-6 text-slate-300">A suitable biogas generator may serve homes, farms, businesses or other sites when project conditions support it.</p></div>
                </div>
                <div className="mt-4 rounded-xl border border-white/15 p-4 text-sm leading-6 text-slate-300"><strong className="text-white">Digestate by-product:</strong> May be suitable as a soil amendment after appropriate treatment and checks for its intended use and local requirements.</div>
                <p className="mt-4 text-xs leading-5 text-slate-400">Images are illustrative. Gas production, electricity output and potential savings are not guaranteed and require assessment of feedstock, site conditions and system design.</p>
              </div>
            </div>

            <div className="mt-8 grid gap-5 rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-8">
              <div><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-amber-800">Build practical know-how</p><h3 className="mt-2 text-2xl font-extrabold text-perfi-navy">Biogas Training</h3><p className="mt-2 max-w-3xl leading-7 text-slate-700">Explore introductory, practical training in feedstock selection, anaerobic digestion fundamentals, system components, basic operation and maintenance, safe gas handling, digestate management and project planning. Training scope and hands-on activities are subject to confirmation.</p></div>
              <Link href="/contact?service=Biogas%20Training" className="inline-flex shrink-0 items-center justify-center rounded-lg bg-perfi-navy px-6 py-4 font-extrabold text-white hover:bg-slate-800">Enquire About Biogas Training →</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
