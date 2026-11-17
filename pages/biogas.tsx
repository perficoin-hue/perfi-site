import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

const processSteps = [
  ['01', 'ORGANIC WASTE', 'Suitable, prepared biodegradable feedstock'],
  ['02', 'BIOGAS DIGESTER', 'Oxygen-free digestion in a designed system'],
  ['03', 'BIOGAS PRODUCTION', 'Biogas captured and managed safely'],
  ['04', 'GAS CLEANING', 'Gas conditioned as required for its application'],
]

const photos = {
  feedstock: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1400&q=90',
  cooking: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1400&q=90',
  generator: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1400&q=90',
  installation: 'https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=1600&q=90',
}

const trainingModules = [
  ['01', 'Feedstock & preparation', 'Assess suitable organic materials, handling and basic preparation.'],
  ['02', 'Digestion fundamentals', 'Understand anaerobic digestion, key system components and process stages.'],
  ['03', 'Safe operation', 'Learn introductory operating checks, gas safety and maintenance principles.'],
  ['04', 'Energy & digestate use', 'Explore cooking and generator options plus responsible digestate management.'],
]

export default function Biogas() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Head>
        <title>PERFITECH BIOGAS SOLUTION | Cooking Gas & Electricity</title>
        <meta name="description" content="Explore PERFITECH BIOGAS SOLUTION: illustrative project visuals, a biogas process video, renewable cooking gas and electricity options, and introductory biogas training." />
        <meta name="theme-color" content="#0B1730" />
      </Head>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-perfi-navy text-white">
          <div className="absolute inset-0 opacity-25" aria-hidden="true"><img src={photos.installation} alt="" className="h-full w-full object-cover" /></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#06182d] via-[#06182d]/95 to-[#06182d]/50" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:px-12">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-perfi-gold">PERFITECH GLOBAL VENTURE LIMITED</p>
              <h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">PERFITECH BIOGAS SOLUTION</h1>
              <p className="mt-5 text-2xl font-extrabold leading-tight text-perfi-gold sm:text-4xl">TURNING YOUR WASTE INTO COOKING GAS AND ELECTRICITY.</p>
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">Transforming suitable organic waste into clean, renewable energy for homes, farms, businesses and industries. Explore project solutions, visual learning and biogas training.</p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a href="#solutions" className="rounded-lg bg-perfi-gold px-7 py-4 text-center font-extrabold text-perfi-navy transition hover:brightness-110">EXPLORE OUR BIOGAS SOLUTIONS ↓</a>
                <Link href="/contact?service=Biogas%20Project%20Consultation" className="rounded-lg border border-white/40 px-7 py-4 text-center font-bold text-white transition hover:border-perfi-gold hover:text-perfi-gold">Request a Project Consultation</Link>
              </div>
              <p className="mt-5 text-xs text-slate-300">Project feasibility and expected outputs depend on site assessment and system design.</p>
            </div>
            <figure className="overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl">
              <img src={photos.feedstock} alt="Organic food materials illustrating biodegradable biogas feedstock" className="h-72 w-full object-cover sm:h-[420px]" fetchPriority="high" />
              <figcaption className="bg-perfi-navy/90 px-5 py-3 text-xs text-slate-300">Illustrative photo — actual feedstock and installation vary by project.</figcaption>
            </figure>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">Our core innovation</p>
              <h2 className="mt-3 text-3xl font-extrabold text-perfi-navy sm:text-4xl">Organic waste, put to work.</h2>
              <p className="mt-5 leading-8 text-slate-600">Anaerobic digestion uses microorganisms in an oxygen-free environment to break down suitable biodegradable materials and produce biogas. Feedstock selection and system design need to match the site and intended use.</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">{['Animal dung and livestock manure', 'Food leftovers and kitchen waste', 'Agricultural waste', 'Market organic waste', 'Other suitable biodegradable materials'].map(item => <li key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">{item}</li>)}</ul>
            </div>
            <figure className="overflow-hidden rounded-3xl bg-slate-100 shadow-xl">
              <img src={photos.installation} alt="Industrial energy equipment illustrating a possible biogas installation" className="h-72 w-full object-cover sm:h-96" loading="lazy" />
              <figcaption className="px-5 py-3 text-xs text-slate-500">Illustrative industrial-energy image, not a PERFITECH installation.</figcaption>
            </figure>
          </div>
        </section>

        <section className="bg-slate-50 px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center"><p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">From organic material to useful energy</p><h2 className="mt-3 text-3xl font-extrabold text-perfi-navy sm:text-4xl">A connected biogas process</h2><p className="mt-4 leading-7 text-slate-600">The equipment and treatment steps are selected for the feedstock and intended end use.</p></div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map(([number, title, detail], index) => <div key={number} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><span className="text-xs font-black tracking-widest text-amber-700">STEP {number}</span>{index < processSteps.length - 1 && <span className="hidden text-xl text-amber-600 lg:inline" aria-hidden="true">→</span>}</div><h3 className="mt-3 text-lg font-extrabold text-perfi-navy">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p></div>)}
            </div>
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <article className="overflow-hidden rounded-2xl bg-perfi-navy text-white shadow-lg"><img src={photos.cooking} alt="Kitchen scene illustrating a potential biogas cooking application" className="h-60 w-full object-cover sm:h-72" loading="lazy" /><div className="p-6 sm:p-8"><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-perfi-gold">Energy option 1</p><h3 className="mt-2 text-2xl font-extrabold">Waste to cooking gas</h3><p className="mt-3 leading-7 text-slate-300">Biogas can be cleaned and conditioned as necessary, then supplied through a properly designed storage and safe distribution system for domestic or commercial cooking.</p><p className="mt-3 text-sm font-semibold text-perfi-gold">Illustrative photo — appliance and installation requirements vary.</p></div></article>
              <article className="overflow-hidden rounded-2xl bg-perfi-navy text-white shadow-lg"><img src={photos.generator} alt="Technical equipment illustrating a possible biogas generator application" className="h-60 w-full object-cover sm:h-72" loading="lazy" /><div className="p-6 sm:p-8"><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-perfi-gold">Energy option 2</p><h3 className="mt-2 text-2xl font-extrabold">Waste to electricity</h3><p className="mt-3 leading-7 text-slate-300">A suitable biogas generator may produce electricity for homes, farms, hotels, restaurants, commercial buildings or industrial uses when technical conditions support it, including backup and off-grid applications.</p><p className="mt-3 text-sm font-semibold text-perfi-gold">Illustrative photo — not a specific biogas generator model.</p></div></article>
            </div>
            <div className="mt-5 grid items-center gap-6 rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:grid-cols-[1fr_auto] sm:p-8"><div><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-amber-800">Useful by-product</p><h3 className="mt-2 text-xl font-extrabold text-perfi-navy">Digestate and soil health</h3><p className="mt-2 max-w-3xl leading-7 text-slate-700">Digestate may be used as a soil amendment after appropriate treatment and checks for intended use, feedstock quality and applicable local requirements.</p></div><span className="text-5xl" aria-hidden="true">🌱</span></div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div><p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">See how the process works</p><h2 className="mt-3 text-3xl font-extrabold text-perfi-navy sm:text-4xl">Biogas explained</h2><p className="mt-4 leading-7 text-slate-600">Watch this third-party educational explainer about biogas plants and anaerobic digestion. Video availability is controlled by its publisher.</p><a href="https://www.youtube.com/watch?v=p_r_Wez7bE0" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex font-bold text-perfi-navy underline decoration-amber-500 decoration-2 underline-offset-4">Open video on YouTube ↗</a></div>
            <div className="overflow-hidden rounded-2xl bg-black shadow-xl"><div className="aspect-video"><iframe className="h-full w-full" src="https://www.youtube-nocookie.com/embed/p_r_Wez7bE0" title="Educational explainer: How a biogas plant works" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div></div>
          </div>
        </section>

        <section id="training" className="scroll-mt-6 bg-slate-50 px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div><p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">Learn the fundamentals</p><h2 className="mt-3 text-3xl font-extrabold text-perfi-navy sm:text-4xl">Biogas Training</h2><p className="mt-4 leading-7 text-slate-600">Build practical understanding of biogas systems through an introductory training pathway. Ask us about the delivery format, audience, schedule and any hands-on component.</p></div>
              <div className="grid gap-3 sm:grid-cols-2">{trainingModules.map(([number, title, detail]) => <article key={number} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><span className="text-xs font-black tracking-widest text-amber-700">MODULE {number}</span><h3 className="mt-2 font-extrabold text-perfi-navy">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p></article>)}</div>
            </div>
            <div className="mt-8 flex flex-col gap-5 rounded-2xl bg-perfi-navy p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8"><div><h3 className="text-xl font-extrabold">Interested in biogas training?</h3><p className="mt-2 text-sm leading-6 text-slate-300">Tell us whether you are an individual, farmer, business or organization and what you hope to learn.</p></div><Link href="/contact?service=Biogas%20Training" className="shrink-0 rounded-lg bg-perfi-gold px-6 py-4 text-center font-extrabold text-perfi-navy hover:brightness-110">Enquire About Training →</Link></div>
            <p className="mt-4 text-xs leading-5 text-slate-500">Training is educational and does not replace site-specific engineering, operational safety instruction or applicable professional approvals.</p>
          </div>
        </section>

        <section id="solutions" className="bg-perfi-navy px-5 py-14 text-white sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-perfi-gold">Take the next step</p><h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">Explore a biogas project for your site.</h2><p className="mt-2 max-w-2xl text-slate-300">Share your feedstock, location and energy goals so the project requirements can be discussed.</p></div><Link href="/contact?service=Biogas%20Project%20Consultation" className="shrink-0 rounded-lg bg-perfi-gold px-6 py-4 text-center font-extrabold text-perfi-navy hover:brightness-110">Request a Project Consultation →</Link></div>
          <p className="mx-auto mt-6 max-w-7xl text-xs leading-5 text-slate-400">Gas output, electricity production and savings vary with feedstock, location, operation and system design; no fixed figures are guaranteed without a project assessment. Photos are illustrative; the video is third-party educational content.</p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
