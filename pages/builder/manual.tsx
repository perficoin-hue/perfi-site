import Head from 'next/head'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function ManualBuilder(){
  return (
    <div>
      <Head><title>Manual Website Builder — PERFI SITE</title></Head>
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold text-perfi-navy">Manual Website Builder (Preview)</h1>
        <p className="mt-2 text-gray-600">This is a placeholder for the visual editor. Features will include drag-and-drop sections, templates, and device previews.</p>
      </main>
      <Footer />
    </div>
  )
}
