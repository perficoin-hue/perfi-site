import Head from 'next/head'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Link from 'next/link'

export default function Builder(){
  return (
    <div>
      <Head>
        <title>PERFI SITE Builder</title>
      </Head>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-perfi-navy">PERFI SITE Website Builder</h1>
        <p className="mt-2 text-gray-600">Choose how you'd like to create your website.</p>

        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <Link href="/builder/ai" className="flex-1 p-6 border rounded-lg hover:shadow">
            <h2 className="font-semibold text-perfi-navy">Build with AI</h2>
            <p className="mt-2 text-gray-600">Describe your website in plain language and our AI will generate an editable draft.</p>
          </Link>

          <Link href="/builder/manual" className="flex-1 p-6 border rounded-lg hover:shadow">
            <h2 className="font-semibold text-perfi-navy">Build Manually</h2>
            <p className="mt-2 text-gray-600">Use our visual editor to drag-and-drop sections and customise your site.</p>
          </Link>
        </div>

      </main>
      <Footer />
    </div>
  )
}
