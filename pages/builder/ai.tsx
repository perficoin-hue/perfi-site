import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AIBuilderUnavailable() {
  return (
    <div>
      <Head><title>AI Website Builder — PERFI SITE</title></Head>
      <Header />
      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-2xl font-bold text-perfi-navy">AI Website Builder</h1>
        <p className="mt-2 text-gray-600">The website builder is being redesigned and is temporarily unavailable.</p>
        <Link href="/builder" className="mt-6 inline-block text-perfi-navy underline">Back to Website Builder</Link>
      </main>
      <Footer />
    </div>
  );
}
