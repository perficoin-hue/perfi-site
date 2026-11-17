import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

const photoClass = 'h-64 w-full object-cover sm:h-80'

export default function Biogas() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Head>
        <title>PERFITECH BIOGAS SOLUTION | Cooking Gas & Electricity</title>
        <meta
          name="description"
          content="Discover PERFITECH BIOGAS SOLUTION: converting suitable organic waste into renewable biogas for cooking and electricity, subject to project assessment."
        />
        <meta name="theme-color" content="#0B1730" />
      </Head>
      <Header />
      <main>
        <section className="relative overflow-hidden bg-perfi-navy px-5 py-20 text-white sm:px-8 sm:py-28">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full border border-perfi-gold/30" />
          <div className="relative mx-auto max-w-7xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-perfi-gold">PERFITECH GLOBAL VENTURE LIMITED</p>
            <h1 className="mt-5 max-w-5xl text-4xl font-black leading-tight sm:text-6xl">PERFITECH BIOGAS SOLUTION</h1>
            <p className="mt-5 max-w-5xl text-2xl font-extrabold leading-tight text-perfi-gold sm:text-4xl">TURNING YOUR WASTE INTO COOKING GAS AND ELECTRICITY.</p>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">Transforming organic waste into clean, renewable energy for homes, farms, businesses and industries. We provide innovative biogas solutions that turn waste into valuable energy while supporting environmental sustainability.</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a href="#solutions" className="rounded-lg bg-perfi-gold px-7 py-4 text-center font-extrabold text-perfi-navy transition hover:brightness-110">EXPLORE OUR BIOGAS SOLUTIONS <span aria-hidden="true">→</span></a>
              <Link href="/contact?service=Biogas%20Project%20Consultation" className="rounded-lg border border-white/40 px-7 py-4 text-center font-bold text-white transition hover:border-perfi-gold hover:text-perfi-gold">Request a Project Consultation</Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">Our core innovation</p>
              <h2 className="mt-3 text-3xl font-extrabold text-perfi-navy sm:text-4xl">Organic waste, put to work.</h2>
              <p className="mt-5 leading-8 text-slate-600">Anaerobic digestion uses microorganisms in an oxygen-free environment to break down suitable biodegradable materials and produce biogas. Waste streams may include animal dung and livestock manure, food leftovers and kitchen waste, agricultural waste, market organic waste and other suitable biodegradable materials.</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {['Animal dung and livestock manure', 'Food leftovers and kitchen waste', 'Agricultural waste', 'Market organic waste', 'Other suitable biodegradable materials'].map(item => <li key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">{item}</li>)}
              </ul>
            </div>
            <figure className="overflow-hidden rounded-3xl bg-slate-100 shadow-xl">
              <img className={photoClass} src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85" alt="Fresh organic food materials that illustrate potential feedstock for a biogas digester" loading="lazy" />
              <figcaption className="px-5 py-3 text-xs text-slate-500">Illustrative image. Feedstock suitability is confirmed during project assessment.</figcaption>
            </figure>
          </div>
        </section>

        <section className="bg-slate-50 px-5 py-16 sm:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">From organic material to useful energy</p>
              <h2 className="mt-3 text-3xl font-extrabold text-perfi-navy sm:text-4xl">A connected biogas process</h2>
              <p className="mt-4 leading-7 text-slate-600">The equipment and treatment steps are selected for the feedstock and intended end use.</p>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ['01', 'ORGANIC WASTE', 'Suitable biodegradable feedstock'],
                ['02', 'BIOGAS DIGESTER', 'Controlled oxygen-free digestion'],
                ['03', 'BIOGAS PRODUCTION', 'Gas generated and captured safely'],
                ['04', 'GAS CLEANING', 'Conditioned for use as required'],
              ].map(([number, title, detail]) => <div key={number} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="text-xs font-black tracking-widest text-amber-700">STEP {number}</span>
                <h3 className="mt-3 text-lg font-extrabold text-perfi-navy">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>
              </div>)}
            </div>
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              <article className="overflow-hidden rounded-2xl bg-perfi-navy text-white">
                <img className="h-56 w-full object-cover" src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85" alt="Domestic kitchen representing a cooking-gas application for biogas" loading="lazy" />
                <div className="p-6 sm:p-8"><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-perfi-gold">Energy option 1</p><h3 className="mt-2 text-2xl font-extrabold">Waste to cooking gas</h3><p className="mt-3 leading-7 text-slate-300">Biogas can be cleaned and conditioned as necessary and supplied through a properly designed system for cooking, offering a renewable alternative to conventional cooking fuels.</p></div>
              </article>
              <article className="overflow-hidden rounded-2xl bg-perfi-navy text-white">
                <img className="h-56 w-full object-cover" src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=85" alt="Technical equipment representing a biogas generator for electricity generation" loading="lazy" />
                <div className="p-6 sm:p-8"><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-perfi-gold">Energy option 2</p><h3 className="mt-2 text-2xl font-extrabold">Waste to electricity</h3><p className="mt-3 leading-7 text-slate-300">Biogas can power suitable generators for electricity at homes, farms, hotels, commercial facilities and industrial sites where project design and site conditions support it.</p></div>
              </article>
            </div>
            <div className="mt-5 grid items-center gap-6 rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:grid-cols-[1fr_auto] sm:p-8">
              <div><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-amber-800">Useful by-product</p><h3 className="mt-2 text-xl font-extrabold text-perfi-navy">Digestate and soil health</h3><p className="mt-2 max-w-3xl leading-7 text-slate-700">Digestate may be used as a soil amendment after appropriate treatment and checks for its intended use, feedstock quality and applicable local requirements.</p></div>
              <span className="text-5xl" aria-hidden="true">🌱</span>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="overflow-hidden rounded-3xl bg-slate-100 shadow-xl">
              <img className="h-72 w-full object-cover sm:h-96" src="https://images.unsplash.com/photo-1516937941344-00b4e0337589?auto=format&fit=crop&w=1400&q=85" alt="Industrial energy equipment illustrating a complete biogas installation" loading="lazy" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">Designed around your project</p>
              <h2 className="mt-3 text-3xl font-extrabold text-perfi-navy sm:text-4xl">A complete installation starts with a careful assessment.</h2>
              <p className="mt-5 leading-8 text-slate-600">We consider feedstock type and availability, daily quantities, location, energy needs, gas treatment, storage, safe distribution and relevant operating requirements. No fixed gas output, electricity production or savings can be promised without a detailed project assessment.</p>
              <Link href="/contact?service=Biogas%20Project%20Consultation" className="mt-7 inline-flex rounded-lg bg-perfi-gold px-6 py-4 font-extrabold text-perfi-navy hover:brightness-110">Request a Project Consultation <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>

        <section id="solutions" className="bg-perfi-navy px-5 py-14 text-white sm:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-perfi-gold">Take the next step</p>
              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">Explore a biogas project for your site.</h2>
              <p className="mt-2 max-w-2xl text-slate-300">Share your feedstock, location and energy goals so the project requirements can be discussed.</p>
            </div>
            <Link href="/contact?service=Biogas%20Project%20Consultation" className="shrink-0 rounded-lg bg-perfi-gold px-6 py-4 text-center font-extrabold text-perfi-navy hover:brightness-110">Request a Project Consultation <span aria-hidden="true">→</span></Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
