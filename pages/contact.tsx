import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Header from '../components/Header'
import Footer from '../components/Footer'

const inputClass = 'mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200'
const labelClass = 'block text-sm font-semibold text-slate-700'

export default function Contact() {
  const router = useRouter()
  const [service, setService] = useState('Company Services')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [location, setLocation] = useState('')
  const [feedstock, setFeedstock] = useState('')
  const [energyUse, setEnergyUse] = useState('')
  const [details, setDetails] = useState('')

  useEffect(() => {
    if (!router.isReady) return
    const requestedService = router.query.service
    if (typeof requestedService === 'string' && requestedService.trim()) {
      setService(requestedService)
    }
  }, [router.isReady, router.query.service])

  function submitConsultation(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const message = [
      'Biogas Project Consultation Request',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email || 'Not provided'}`,
      `Project location: ${location}`,
      `Organic waste/feedstock: ${feedstock || 'Not sure yet'}`,
      `Intended energy use: ${energyUse || 'Not decided yet'}`,
      `Additional details: ${details || 'None'}`,
    ].join('\n')

    window.open(`https://wa.me/2348069387275?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Head>
        <title>Request a Project Consultation | Perfitech</title>
        <meta name="description" content="Contact Perfitech Global Venture Limited to discuss a biogas project consultation." />
      </Head>
      <Header />
      <main className="px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="h-fit rounded-3xl bg-perfi-navy p-7 text-white sm:p-9">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-perfi-gold">Let’s discuss your project</p>
            <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">Request a Project Consultation</h1>
            <p className="mt-4 leading-7 text-slate-300">Tell us a little about your site, available organic waste and energy needs. Your details will open in a WhatsApp message addressed to our team.</p>
            <a href="https://wa.me/2348069387275" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex rounded-lg bg-perfi-gold px-5 py-3 font-bold text-perfi-navy hover:brightness-110">WhatsApp +234 806 938 7275</a>
            <p className="mt-5 text-sm text-slate-400">Project outputs and feasibility are determined through assessment; no fixed gas production, electricity output or savings are guaranteed.</p>
            <Link href="/biogas" className="mt-6 inline-block text-sm font-semibold text-perfi-gold hover:underline">← Back to biogas solutions</Link>
          </aside>

          <form onSubmit={submitConsultation} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
            <div className="mb-6">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-700">Enquiry type</p>
              <p className="mt-1 text-slate-600">{service}</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className={labelClass}>Full name<input className={inputClass} value={name} onChange={(event) => setName(event.target.value)} required maxLength={100} autoComplete="name" /></label>
              <label className={labelClass}>Phone number<input className={inputClass} type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} required maxLength={30} autoComplete="tel" /></label>
              <label className={labelClass}>Email address <span className="font-normal text-slate-500">(optional)</span><input className={inputClass} type="email" value={email} onChange={(event) => setEmail(event.target.value)} maxLength={254} autoComplete="email" /></label>
              <label className={labelClass}>Project location<input className={inputClass} value={location} onChange={(event) => setLocation(event.target.value)} required maxLength={150} placeholder="Town/city and state" /></label>
              <label className={labelClass}>Organic waste available <span className="font-normal text-slate-500">(if known)</span><input className={inputClass} value={feedstock} onChange={(event) => setFeedstock(event.target.value)} maxLength={300} placeholder="e.g. livestock manure, food waste" /></label>
              <label className={labelClass}>Main energy need <select className={inputClass} value={energyUse} onChange={(event) => setEnergyUse(event.target.value)}><option value="">Choose if known</option><option>Cooking gas</option><option>Electricity generation</option><option>Both cooking gas and electricity</option><option>Not sure yet</option></select></label>
            </div>
            <label className={`${labelClass} mt-5`}>Tell us about your project <span className="font-normal text-slate-500">(optional)</span><textarea className={`${inputClass} min-h-32`} value={details} onChange={(event) => setDetails(event.target.value)} maxLength={2000} placeholder="Approximate quantity of waste, site type, or questions you have" /></label>
            <button type="submit" className="mt-6 w-full rounded-lg bg-perfi-gold px-6 py-4 font-extrabold text-perfi-navy transition hover:brightness-110 sm:w-auto">Continue to WhatsApp →</button>
            <p className="mt-3 text-xs leading-5 text-slate-500">Your browser will open WhatsApp with your message ready to review and send. Nothing is sent until you confirm it in WhatsApp.</p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
