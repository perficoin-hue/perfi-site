import Link from 'next/link'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

const services = [
  {
    number: '01',
    icon: '✳',
    title: 'Technology',
    description:
      'Digital platforms, software solutions and technology that help businesses move forward.',
  },
  {
    number: '02',
    icon: '↗',
    title: 'Investment',
    description:
      'Explore strategic opportunities, business partnerships and long-term growth initiatives.',
  },
  {
    number: '03',
    icon: '⌂',
    title: 'Construction & Real Estate',
    description:
      'Property, infrastructure, construction projects and real estate development.',
  },
  {
    number: '04',
    icon: '◇',
    title: 'Trading & Agriculture',
    description:
      'Trading opportunities, agricultural development and commodity solutions.',
  },
  {
    number: '05',
    icon: '⇄',
    title: 'Import, Export & Energy',
    description:
      'International trade, import and export services, and oil and gas sector projects.',
  },
  {
    number: '06',
    icon: '◎',
    title: 'Consultancy',
    description:
      'Business advisory, strategic planning and practical support for business growth.',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>PERFI SITE | Innovation. Investment. Global Growth.</title>
        <meta
          name="description"
          content="PERFI SITE by Perfitech Global Venture Limited. Explore technology, investment, construction, real estate, trading, agriculture, consultancy and PerfiPay."
        />
        <meta name="theme-color" content="#0B1730" />
      </Head>

      <Header />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-perfi-navy text-white">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full border border-perfi-gold/30" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-1 w-40 bg-perfi-gold" />

          <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:px-12 lg:py-32">
            <div>
              <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-perfi-gold" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                  Welcome to PERFI SITE
                </span>
              </div>

              <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-perfi-gold">
                Perfitech Global Venture Limited
              </p>

              <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Building ideas.
                <span className="block text-perfi-gold">
                  Creating possibilities.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                One platform. Multiple opportunities. Discover business
                services, digital solutions and innovative ideas designed to
                help people and businesses grow.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-3 rounded-lg bg-perfi-gold px-7 py-4 font-bold text-perfi-navy transition hover:brightness-110"
                >
                  Explore Our Services <span aria-hidden="true">→</span>
                </Link>

                <Link
                  href="/perfi-pay"
                  className="inline-flex items-center justify-center gap-3 rounded-lg border border-white/30 px-7 py-4 font-semibold text-white transition hover:border-perfi-gold hover:text-perfi[...]
                >
                  Discover PerfiPay <span aria-hidden="true">↗</span>
                </Link>
              </div>

              <div className="mt-10 border-t border-white/15 pt-6">
                <p className="text-xs font-semibold uppercase leading-7 tracking-[0.12em] text-slate-300 sm:text-sm sm:tracking-[0.16em]">
                  Innovation <span className="px-1 text-perfi-gold">|</span>
                  Invest <span className="px-1 text-perfi-gold">|</span>
                  Build <span className="px-1 text-perfi-gold">|</span>
                  Grow <span className="px-1 text-perfi-gold">|</span>
                  Global
                </p>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute -inset-4 rounded-3xl border border-perfi-gold/20" />
              <div className="relative rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur sm:p-9">
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-perfi-gold">
                      Our vision
                    </p>
                    <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                      Growth without borders.
                    </h2>
                  </div>
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-perfi-gold/40 bg-perfi-gold/10 text-3xl font-black text-perfi-gold">
                    P
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-6">
                  {[
                    ['TECH', 'Digital solutions'],
                    ['INVEST', 'Growth opportunities'],
                    ['BUILD', 'Projects & property'],
                    ['GLOBAL', 'Business connections'],
                  ].map(([title, description]) => (
                    <div
                      key={title}
                      className="rounded-xl border border-white/10 bg-black/10 p-4"
                    >
                      <p className="text-sm font-extrabold tracking-wider text-perfi-gold">
                        {title}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-xl bg-perfi-gold p-4 text-perfi-navy">
                  <p className="text-sm font-bold">
                    Your next opportunity starts here.
                  </p>
                  <p className="mt-1 text-sm">
                    Explore the PERFI SITE ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-perfi-gold">
                What we do
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-perfi-navy sm:text-4xl">
                Diverse services. One vision.
              </h2>
              <p className="mt-4 leading-7 text-gray-600">
                We bring different sectors together through business services,
                practical solutions and opportunities for development.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-bold text-perfi-navy hover:text-amber-700"
            >
              View all services <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.number}
                className="group rounded-2xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-perfi-gold hover:shadow-xl sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-perfi-navy text-2xl text-perfi-gold transition group-hover:bg-perfi-gold group-hover:text-perfi-navy">
                    {service.icon}
                  </div>
                  <span className="text-sm font-bold tracking-widest text-gray-300">
                    {service.number}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold text-perfi-navy">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-gray-600">
                  {service.description}
                </p>
                <Link
                  href="/services"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-perfi-navy hover:text-amber-700"
                >
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* WEBSITE BUILDER */}
        <section className="bg-slate-50">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
            <div className="grid grid-cols-1 items-center gap-10 rounded-3xl bg-perfi-navy p-7 text-white sm:p-10 lg:grid-cols-2 lg:p-14">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-perfi-gold">
                  Create something new
                </p>
                <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
                  Your idea deserves a website.
                </h2>
                <p className="mt-5 max-w-xl leading-8 text-slate-300">
                  Explore the PERFI SITE website builder concept. Choose an
                  AI-assisted starting point or begin with manual building to
                  shape your online presence.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
                <Link
                  href="/builder/ai"
                  className="inline-flex items-center justify-center rounded-lg bg-perfi-gold px-6 py-4 font-bold text-perfi-navy transition hover:brightness-110"
                >
                  Build with AI <span className="ml-3">✦</span>
                </Link>
                <Link
                  href="/builder/manual"
                  className="inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-4 font-semibold text-white transition hover:border-perfi-gold hover:text-perfi-gold"
                >
                  Build Manually <span className="ml-3">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* PERFIPAY */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-perfi-gold">
                Introducing PerfiPay
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-perfi-navy sm:text-4xl">
                A digital payment vision for a connected world.
              </h2>
              <p className="mt-5 leading-8 text-gray-600">
                Discover our PerfiPay project and its vision for digital
                payments, crypto assets and marketplace experiences. Explore
                the project as it develops.
              </p>
              <Link
                href="/perfi-pay"
                className="mt-7 inline-flex items-center justify-center rounded-lg bg-perfi-navy px-7 py-4 font-bold text-white transition hover:bg-slate-800"
              >
                Explore PerfiPay <span className="ml-3 text-perfi-gold">→</span>
              </Link>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-slate-50 to-white p-6 sm:p-10">
              <div className="rounded-2xl bg-perfi-navy p-7 text-white sm:p-9">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-perfi-gold text-3xl font-black text-perfi-navy">
                    P
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold">PerfiPay</p>
                    <p className="mt-1 text-sm text-slate-300">
                      Payments. Possibilities.
                    </p>
                  </div>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 p-4">
                    <p className="text-sm text-slate-300">Digital finance</p>
                    <p className="mt-2 font-bold text-perfi-gold">
                      Explore
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/10 p-4">
                    <p className="text-sm text-slate-300">Marketplace</p>
                    <p className="mt-2 font-bold text-perfi-gold">
                      Discover
                    </p>
                  </div>
                </div>
                <p className="mt-5 text-xs leading-6 text-slate-400">
                  Product features and availability depend on development and
                  applicable requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT CTA */}
        <section className="border-t border-gray-100 bg-white px-5 py-16 sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-2xl border border-perfi-gold/40 p-7 sm:p-10 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-perfi-gold">
                Let us connect
              </p>
              <h2 className="mt-3 text-2xl font-extrabold text-perfi-navy sm:text-3xl">
                Let’s build the future together.
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-gray-600">
                Have a question, a business idea or a project to discuss? Get
                in touch with our team.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-perfi-gold px-7 py-4 font-bold text-perfi-navy transition hover:brightness-110"
            >
              Contact Us <span className="ml-3">→</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
