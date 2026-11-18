import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Builder() {
  return (
    <div>
      <Head><title>PERFI SITE Website Builder</title></Head>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold text-perfi-navy">PERFI SITE Website Builder</h1>
        <p className="mt-2 text-gray-600">The website builder is being redesigned and is temporarily unavailable.</p>
        <Link href="/" className="mt-6 inline-block rounded-lg bg-perfi-navy px-4 py-2 text-white">Return to home</Link>
      </main>
      <Footer />
    </div>
  );
}
