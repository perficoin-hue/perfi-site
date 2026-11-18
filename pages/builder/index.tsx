import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const builderOptions = [
  {
    title: 'Build with AI',
    description: 'Describe your website in plain language and our AI will generate an editable draft.',
    href: '/builder/ai',
    label: 'Explore AI builder',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" className="h-8 w-8">
        <path d="M24 4.5 28.7 18l13.8 6-13.8 5L24 43.5 19.3 29l-13.8-5 13.8-6L24 4.5Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="m38 4 1.5 4.5L44 10l-4.5 1.5L38 16l-1.5-4.5L32 10l4.5-1.5L38 4Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Build Manually',
    description: 'Use our visual editor to add sections and customise your site.',
    href: '/builder/manual',
    label: 'Explore manual builder',
    icon: (
      <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" className="h-8 w-8">
        <rect x="6" y="7" width="36" height="34" rx="5" stroke="currentColor" strokeWidth="2.5" />
        <path d="M6 17h36M14 12h.02M19 12h.02M14 24h10M14 30h20M14 36h13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Builder() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f7f8fa]">
      <Head>
        <title>PERFI SITE Website Builder</title>
        <meta name="description" content="Choose how you would like to create your website with PERFI SITE." />
      </Head>
      <Header />
      <main className="relative flex-1 overflow-hidden px-4 py-14 sm:px-6 sm:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-amber-100/70 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="relative mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-amber-800 shadow-sm">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#c79a2f]" />
              PERFI SITE Studio
            </span>
            <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-perfi-navy sm:text-4xl md:text-5xl">
              PERFI SITE Website Builder
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
              Choose how you&apos;d like to create your website.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2 md:gap-6">
            {builderOptions.map((option, index) => (
              <article
                key={option.title}
                className="group flex h-full flex-col rounded-3xl border border-slate-200/90 bg-white p-6 shadow-[0_12px_40px_-24px_rgba(1,41,74,0.28)] transition duration-200 hover:-translate-y-1 hover:border-amber-300 hover:shadow-[0_20px_50px_-25px_rgba(1,41,74,0.35)] sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-perfi-navy text-[#e2bd65] ring-4 ring-blue-50 transition group-hover:bg-[#0b3a63]">
                    {option.icon}
                  </span>
                  <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-800">
                    OPTION 0{index + 1}
                  </span>
                </div>
                <h2 className="mt-7 text-2xl font-bold tracking-tight text-perfi-navy">{option.title}</h2>
                <p className="mt-3 min-h-[3.5rem] text-base leading-7 text-slate-600">{option.description}</p>
                <Link
                  href={option.href}
                  className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-perfi-navy px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0b3a63] focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-200"
                >
                  {option.label}
                  <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4 transition-transform group-hover:translate-x-1">
                    <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-slate-500">Start with the approach that works best for you. You can shape your site at your own pace.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
