import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

const services = [
  {
    number: '01',
    icon: '💻',
    title: 'Technology & AI',
    desc: 'Build smarter with software development, digital platforms, AI-assisted website building and technology solutions.',
    tag: 'Digital innovation',
  },
  {
    number: '02',
    icon: '📈',
    title: 'Investment',
    desc: 'Explore investment initiatives, strategic partnerships and opportunities designed to support business growth.',
    tag: 'Growth opportunities',
  },
  {
    number: '03',
    icon: '🏗️',
    title: 'Construction',
    desc: 'Discover construction project planning, development support and solutions for building projects.',
    tag: 'Build the future',
  },
  {
    number: '04',
    icon: '🏢',
    title: 'Real Estate',
    desc: 'Explore property development, real estate projects and property-related business opportunities.',
    tag: 'Property & development',
  },
  {
    number: '05',
    icon: '🌐',
    title: 'Trading',
    desc: 'Connect with opportunities in commodity trading, commercial partnerships and international markets.',
    tag: 'Global commerce',
  },
  {
    number: '06',
    icon: '🌱',
    title: 'Agriculture',
    desc: 'Discover modern farming, agricultural value chains and agribusiness development opportunities.',
    tag: 'Sustainable growth',
  },
  {
    number: '07',
    icon: '🚢',
    title: 'Import & Export',
    desc: 'Explore international trade support, sourcing, logistics coordination and cross-border business opportunities.',
    tag: 'Trade without borders',
  },
  {
    number: '08',
    icon: '⚡',
    title: 'Oil & Gas',
    desc: 'Explore energy-sector business initiatives, project opportunities and potential industry partnerships.',
    tag: 'Energy & industry',
  },
  {
    number: '09',
    icon: '🤝',
    title: 'Consultancy',
    desc: 'Get in touch to discuss business strategy, project planning, operational improvement and advisory needs.',
    tag: 'Expert guidance',
  },
]

export default function Services() {
  return (
    <div className="services-page">
      <Head>
        <title>Our Services | Perfitech Global Venture Limited</title>
        <meta
          name="description"
          content="Explore technology, investment, construction, real estate, trading, agriculture, import and export, oil and gas, and consultancy services from Perfitech Global Venture Limited."
        />
      </Head>

      <Header />

      <main>
        <section className="services-hero">
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />

          <div className="hero-content">
            <span className="hero-label">
              INNOVATION | INVEST | BUILD | GROW | GLOBAL
            </span>

            <h1>
              One Vision.
              <br />
              <span>Multiple Industries.</span>
              <br />
              Limitless Possibilities.
            </h1>

            <p>
              Discover connected services, fresh opportunities and practical
              solutions to help move your next idea forward.
            </p>

            <div className="hero-actions">
              <a href="#explore-services" className="gold-button">
                Explore Our Services <span>↘</span>
              </a>
              <Link href="/contact" className="outline-button">
                Talk to Our Team
              </Link>
            </div>

            <div className="hero-footnote">
              <span className="status-dot" />
              Technology · Business · Development · Global Trade
            </div>
          </div>

          <div className="hero-orbit" aria-hidden="true">
            <div className="orbit orbit-outer" />
            <div className="orbit orbit-inner" />
            <div className="orbit-center">
              <span>PGV</span>
              <small>GLOBAL VISION</small>
            </div>
            <span className="orbit-node node-one">✦</span>
            <span className="orbit-node node-two">↗</span>
            <span className="orbit-node node-three">◎</span>
          </div>
        </section>

        <section id="explore-services" className="services-section">
          <div className="section-heading">
            <div>
              <span className="section-kicker">WHAT WE DO</span>
              <h2>
                Explore our <span>industries</span>
              </h2>
            </div>
            <p>
              Find the service that matches your ambition. Choose a category
              to learn more or contact us about your project.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <article
                key={service.number}
                className="service-card"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className="card-topline">
                  <span className="service-number">{service.number}</span>
                  <span className="service-icon" aria-hidden="true">
                    {service.icon}
                  </span>
                </div>

                <span className="service-tag">{service.tag}</span>

                <h3>{service.title}</h3>
                <p>{service.desc}</p>

                <Link
                  href={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="service-link"
                  aria-label={`Enquire about ${service.title}`}
                >
                  Explore service <span>↗</span>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="services-cta">
          <div>
            <span className="section-kicker">YOUR NEXT MOVE STARTS HERE</span>
            <h2>Have an idea worth building?</h2>
            <p>
              Tell us what you want to achieve. Let's discuss your goals
              and identify the right way to move forward.
            </p>
          </div>

          <Link href="/contact" className="gold-button">
            Start a Conversation <span>↗</span>
          </Link>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .services-page {
          background: #f7f8fb;
          color: #12243a;
          overflow: hidden;
        }

        .services-hero {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          min-height: 490px;
          display: flex;
          align-items: center;
          padding: 76px max(24px, calc((100vw - 1152px) / 2));
          background: linear-gradient(120deg, #06182d, #01294a 60%, #102b46);
          color: #fff;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 700px;
          animation: reveal-up 800ms ease both;
        }

        .hero-label,
        .section-kicker {
          display: inline-block;
          color: #c79a2f;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .services-hero h1 {
          margin: 22px 0 18px;
          font-size: clamp(38px, 5.5vw, 66px);
          line-height: 1.08;
          letter-spacing: -2px;
          font-weight: 800;
        }

        .services-hero h1 span {
          color: #e2bd63;
        }

        .services-hero p {
          max-width: 540px;
          color: #d0dbe8;
          font-size: 16px;
          line-height: 1.8;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 13px;
          margin-top: 28px;
        }

        .gold-button,
        .outline-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-height: 48px;
          padding: 0 20px;
          border-radius: 6px;
          font-weight: 700;
          text-decoration: none;
          transition: transform 220ms ease, background 220ms ease,
            box-shadow 220ms ease;
        }

        .gold-button {
          background: #c79a2f;
          color: #071a2e;
        }

        .gold-button:hover {
          transform: translateY(-3px);
          background: #e2bd63;
          box-shadow: 0 10px 28px #0003;
        }

        .outline-button {
          color: #fff;
          border: 1px solid #ffffff55;
        }

        .outline-button:hover {
          transform: translateY(-3px);
          border-color: #e2bd63;
          background: #ffffff0c;
        }

        .hero-footnote {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-top: 28px;
          color: #bdcbd9;
          font-size: 12px;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #e2bd63;
          box-shadow: 0 0 12px #e2bd63;
        }

        .hero-glow {
          position: absolute;
          z-index: -1;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          filter: blur(85px);
          opacity: 0.2;
          animation: glow-pulse 6s ease-in-out infinite alternate;
        }

        .hero-glow-one {
          top: -120px;
          right: 8%;
          background: #c79a2f;
        }

        .hero-glow-two {
          bottom: -200px;
          left: 35%;
          background: #3185bb;
          animation-delay: 2s;
        }

        .hero-orbit {
          position: absolute;
          right: max(5%, calc((100vw - 1200px) / 2));
          top: 50%;
          width: 310px;
          height: 310px;
          transform: translateY(-50%);
          opacity: 0.8;
        }

        .orbit {
          position: absolute;
          inset: 0;
          border: 1px solid #c79a2f50;
          border-radius: 50%;
        }

        .orbit-outer {
          animation: rotate-orbit 30s linear infinite;
        }

        .orbit-inner {
          inset: 35px;
          border-style: dashed;
          border-color: #ffffff40;
          animation: rotate-orbit 24s linear infinite reverse;
        }

        .orbit-center {
          position: absolute;
          inset: 83px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 1px solid #c79a2f;
          border-radius: 50%;
          background: #ffffff08;
          box-shadow: 0 0 55px #c79a2f16;
        }

        .orbit-center span {
          color: #e2bd63;
          font-size: 36px;
          font-weight: 900;
        }

        .orbit-center small {
          font-size: 8px;
          letter-spacing: 2px;
        }

        .orbit-node {
          position: absolute;
          display: grid;
          place-items: center;
          width: 39px;
          height: 39px;
          border: 1px solid #c79a2f99;
          border-radius: 50%;
          background: #0b2945;
          color: #e2bd63;
          font-size: 20px;
          animation: float 4s ease-in-out infinite;
        }

        .node-one {
          top: 23px;
          left: 48px;
        }

        .node-two {
          top: 110px;
          right: -5px;
          animation-delay: 1s;
        }

        .node-three {
          bottom: 15px;
          left: 76px;
          animation-delay: 2s;
        }

        .services-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 80px 24px;
          scroll-margin-top: 25px;
        }

        .section-heading {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 28px;
          margin-bottom: 34px;
        }

        .section-heading h2,
        .services-cta h2 {
          margin: 10px 0 0;
          color: #082744;
          font-size: clamp(30px, 4vw, 43px);
          line-height: 1.15;
          letter-spacing: -1px;
          font-weight: 800;
        }

        .section-heading h2 span {
          color: #bd8e22;
        }

        .section-heading > p {
          max-width: 400px;
          margin: 0;
          color: #637184;
          line-height: 1.8;
          font-size: 14px;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
        }

        .service-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-height: 295px;
          padding: 25px;
          overflow: hidden;
          border: 1px solid #e3e8ef;
          border-radius: 12px;
          background: #fff;
          box-shadow: 0 5px 20px #10274406;
          animation: reveal-up 650ms ease both;
          transition: transform 260ms ease, box-shadow 260ms ease,
            border-color 260ms ease;
        }

        .service-card::before {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          content: '';
          background: linear-gradient(90deg, #c79a2f, #f0d88f);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 260ms ease;
        }

        .service-card:hover {
          transform: translateY(-7px);
          border-color: #d9bd77;
          box-shadow: 0 18px 40px #10274412;
        }

        .service-card:hover::before {
          transform: scaleX(1);
        }

        .card-topline {
          display: flex;
          width: 100%;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 22px;
        }

        .service-number {
          color: #a1adba;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .service-icon {
          display: grid;
          place-items: center;
          width: 51px;
          height: 51px;
          border-radius: 11px;
          background: #f4f0e5;
          font-size: 25px;
          transition: transform 260ms ease;
        }

        .service-card:hover .service-icon {
          transform: scale(1.09) rotate(-4deg);
        }

        .service-tag {
          color: #a17a1e;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }

        .service-card h3 {
          margin: 10px 0 8px;
          color: #082744;
          font-size: 21px;
          font-weight: 800;
        }

        .service-card p {
          margin: 0 0 23px;
          color: #647184;
          font-size: 13px;
          line-height: 1.8;
        }

        .service-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: auto;
          color: #082744;
          font-size: 13px;
          font-weight: 800;
          text-decoration: none;
        }

        .service-link span {
          color: #b58a27;
          transition: transform 200ms ease;
        }

        .service-link:hover span {
          transform: translate(3px, -3px);
        }

        .services-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          max-width: 1152px;
          margin: 0 auto 75px;
          padding: 38px;
          border: 1px solid #dbe1e9;
          border-radius: 14px;
          background: linear-gradient(115deg, #fff, #f4f0e5);
        }

        .services-cta h2 {
          font-size: clamp(26px, 3vw, 36px);
        }

        .services-cta p {
          max-width: 610px;
          margin: 12px 0 0;
          color: #647184;
          line-height: 1.8;
          font-size: 14px;
        }

        @keyframes reveal-up {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes rotate-orbit {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-9px);
          }
        }

        @keyframes glow-pulse {
          from {
            opacity: 0.12;
            transform: scale(0.9);
          }
          to {
            opacity: 0.27;
            transform: scale(1.1);
          }
        }

        @media (max-width: 900px) {
          .hero-orbit {
            right: -100px;
            opacity: 0.25;
          }

          .services-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .services-cta {
            margin-right: 24px;
            margin-left: 24px;
          }
        }

        @media (max-width: 600px) {
          .services-hero {
            min-height: 480px;
            padding: 64px 22px;
          }

          .services-hero h1 {
            font-size: clamp(37px, 10vw, 51px);
            letter-spacing: -1.5px;
          }

          .hero-label {
            font-size: 9px;
            letter-spacing: 1.1px;
          }

          .hero-orbit {
            top: auto;
            right: -120px;
            bottom: -125px;
            transform: none;
          }

          .hero-footnote {
            align-items: flex-start;
            font-size: 11px;
          }

          .services-section {
            padding: 56px 18px;
          }

          .section-heading {
            align-items: flex-start;
            flex-direction: column;
            gap: 15px;
          }

          .services-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .service-card {
            min-height: 260px;
            padding: 23px;
          }

          .services-cta {
            align-items: flex-start;
            flex-direction: column;
            margin: 0 18px 48px;
            padding: 27px 22px;
          }

          .gold-button,
          .outline-button {
            font-size: 13px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .services-page *,
          .services-page *::before,
          .services-page *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  )
}
