import Head from 'next/head'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function AIBuilder(){
  return (
    <div>
      <Head><title>AI Website Builder — PERFI SITE</title></Head>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-perfi-navy">AI Website Builder (Preview)</h1>
        <p className="mt-2 text-gray-600">This is a placeholder for the AI generation workflow. When connected, users will be able to describe their website and get an editable draft. API keys must be configured on the server; no keys are exposed here.</p>
      </main>
      <Footer />
    </div>
  )
}
