import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

const industries = [
  { icon: '💻', title: 'Technology', desc: 'Digital platforms, software and AI-powered solutions.' },
  { icon: '📈', title: 'Investment', desc: 'Investment initiatives and strategic partnerships.' },
  { icon: '🏗️', title: 'Construction', desc: 'Building projects and development solutions.' },
  { icon: '🏢', title: 'Real Estate', desc: 'Property development and real estate opportunities.' },
  { icon: '🌐', title: 'Trading', desc: 'Commercial connections and international markets.' },
  { icon: '🌱', title: 'Agriculture', desc: 'Agribusiness and agricultural value chains.' },
  { icon: '🚢', title: 'Import & Export', desc: 'Cross-border trade and global commerce.' },
  { icon: '⚡', title: 'Oil & Gas', desc: 'Energy-sector initiatives and partnerships.' },
  { icon: '🤝', title: 'Consultancy', desc: 'Business strategy and professional advisory.' },
]

export default function About() {
  return (
    <div className="about-page">
      <Head>
        <title>About Us | Perfitech Global Venture Limited</title>
        <meta
          name="description"
          content="Discover the vision, mission and diverse industry services of Perfitech Global Venture Limited."
        />
      </Head>

      <Header />

      <main>
        <section className="about-hero">
          <div className="hero-glow" />
          <div className="hero-content">
            <span className="eyebrow">
              ABOUT PERFITECH GLOBAL VENTURE LIMITED
            </span>

            <h1>
              Ideas into action.
              <br />
              <span>Possibilities into progress.</span>
            </h1>

            <p>
              We are building a connected business platform across technology,
              investment, development and global commerce — bringing ideas,
              services and opportunities together.
            </p>

            <div className="hero-actions">
              <a href="#our-story" className="gold-button">
                Discover Our Story <span>↘</span>
              </a>
              <Link href="/services" className="outline-button">
                Explore Services
              </Link>
            </div>

            <div className="brand-slogan">
              INNOVATION <span>|</span> INVEST <span>|</span> BUILD
              <span>|</span> GROW <span>|</span> GLOBAL
            </div>
          </div>

          <div className="hero-emblem" aria-hidden="true">
            <div className="emblem-ring ring-one" />
            <div className="emblem-ring ring-two" />
            <div className="emblem-core">
              <span>P</span>
              <small>GLOBAL VISION</small>
            </div>
            <i className="emblem-dot dot-one" />
            <i className="emblem-dot dot-two" />
            <i className="emblem-dot dot-three" />
          </div>
        </section>

        <section id="our-story" className="story-section">
          <div className="story-mark">
            <span>PGV</span>
            <div />
            <small>ONE PLATFORM.<br />MANY POSSIBILITIES.</small>
          </div>

          <div className="story-copy">
            <span className="section-label">WHO WE ARE</span>
            <h2>
              A broader vision for
              <span> business and innovation.</span>
            </h2>
            <p>
              Perfitech Global Venture Limited is developing a multi-industry
              business platform designed to bring services and opportunities
              together in one place.
            </p>
            <p>
              From technology and AI to construction, agriculture, real estate,
              trading and consultancy, our goal is to make it easier for people
              and businesses to discover solutions, explore partnerships and
              move their ideas forward.
            </p>
            <p>
              Through our wider digital vision, including the dedicated
              PerfiPay initiative, we aim to connect technology with everyday
              business needs.
            </p>
            <Link href="/services" className="text-link">
              Discover what we do <span>↗</span>
            </Link>
          </div>
        </section>

        <section className="purpose-section">
          <div className="purpose-heading">
            <span className="section-label">OUR PURPOSE</span>
            <h2>Driven by a vision. Guided by purpose.</h2>
            <p>
              Our direction is built around creating useful connections,
              supporting growth and exploring better ways to do business.
            </p>
          </div>

          <div className="purpose-grid">
            <article className="purpose-card mission-card">
              <div className="purpose-icon">◎</div>
              <span className="purpose-number">01 / OUR MISSION</span>
              <h3>Make opportunities more accessible.</h3>
              <p>
                To develop practical services and connected business solutions
                that help individuals, entrepreneurs and organizations pursue
                their goals across multiple industries.
              </p>
            </article>

            <article className="purpose-card vision-card">
              <div className="purpose-icon">✧</div>
              <span className="purpose-number">02 / OUR VISION</span>
              <h3>Build for a connected global future.</h3>
              <p>
                To grow into a trusted, multi-industry platform where innovation,
                investment, development and commerce can create new possibilities
                for businesses and communities.
              </p>
            </article>
          </div>
        </section>

        <section className="values-section">
          <div className="values-intro">
            <span className="section-label">WHAT GUIDES US</span>
            <h2>Our principles</h2>
            <p>
              The values we aim to bring into our services, partnerships and
              future development.
            </p>
          </div>

          <div className="values-list">
            <article>
              <span>01</span>
              <div>
                <h3>Innovation</h3>
                <p>Exploring better ideas, tools and ways to solve problems.</p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>Integrity</h3>
                <p>Working toward clear communication and responsible business.</p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>Growth</h3>
                <p>Creating room for learning, development and new opportunities.</p>
              </div>
            </article>
            <article>
              <span>04</span>
              <div>
                <h3>Global thinking</h3>
                <p>Connecting local ambition with wider business possibilities.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="industries-section">
          <div className="industries-heading">
            <span className="section-label">OUR BUSINESS LANDSCAPE</span>
            <h2>One company. <span>Multiple industries.</span></h2>
            <p>
              Explore the sectors represented in our wider business vision.
            </p>
          </div>

          <div className="industry-grid">
            {industries.map((industry, index) => (
              <Link
                href="/services"
                key={industry.title}
                className="industry-card"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <span className="industry-icon">{industry.icon}</span>
                <h3>{industry.title}</h3>
                <p>{industry.desc}</p>
                <span className="industry-arrow">↗</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="about-cta">
          <span className="section-label">LET'S BUILD WHAT'S NEXT</span>
          <h2>Your vision deserves a place to grow.</h2>
          <p>
            Whether you have a business idea, a project or a partnership in
            mind, we welcome you to start a conversation with our team.
          </p>
          <div className="cta-actions">
            <Link href="/contact" className="gold-button">
              Contact Our Team <span>↗</span>
            </Link>
            <Link href="/services" className="cta-secondary">
              View All Services
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .about-page {
          color: #12243a;
          background: #f7f8fb;
          overflow: hidden;
        }

        .about-hero {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          display: flex;
          align-items: center;
          min-height: 470px;
          padding: 78px max(24px, calc((100vw - 1152px) / 2));
          background: linear-gradient(120deg, #06182d, #01294a 65%, #102b46);
          color: white;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 760px;
          animation: rise-in 800ms ease both;
        }

        .eyebrow,
        .section-label {
          color: #c79a2f;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .about-hero h1 {
          margin: 22px 0 18px;
          font-size: clamp(38px, 5.5vw, 64px);
          line-height: 1.09;
          letter-spacing: -2px;
          font-weight: 800;
        }

        .about-hero h1 span,
        .industries-heading h2 span {
          color: #e2bd63;
        }

        .about-hero p {
          max-width: 580px;
          color: #d0dbe8;
          font-size: 15px;
          line-height: 1.9;
        }

        .hero-actions,
        .cta-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 13px;
          margin-top: 27px;
        }

        .gold-button,
        .outline-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-height: 47px;
          padding: 0 20px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 800;
          text-decoration: none;
          transition: transform 220ms ease, background 220ms ease,
            box-shadow 220ms ease;
        }

        .gold-button {
          color: #071a2e;
          background: #c79a2f;
        }

        .gold-button:hover {
          transform: translateY(-3px);
          background: #e2bd63;
          box-shadow: 0 10px 28px #0003;
        }

        .outline-button {
          border: 1px solid #ffffff55;
          color: #fff;
        }

        .outline-button:hover {
          border-color: #e2bd63;
          transform: translateY(-3px);
        }

        .brand-slogan {
          margin-top: 32px;
          color: #d0dbe8;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.2px;
          line-height: 2;
        }

        .brand-slogan span {
          padding: 0 5px;
          color: #c79a2f;
        }

        .hero-glow {
          position: absolute;
          z-index: -1;
          top: -100px;
          right: 10%;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: #c79a2f;
          filter: blur(95px);
          opacity: 0.18;
          animation: glow 6s ease-in-out infinite alternate;
        }

        .hero-emblem {
          position: absolute;
          top: 50%;
          right: max(5%, calc((100vw - 1200px) / 2));
          width: 300px;
          height: 300px;
          transform: translateY(-50%);
          opacity: 0.75;
        }

        .emblem-ring {
          position: absolute;
          inset: 0;
          border: 1px solid #c79a2f70;
          border-radius: 50%;
          animation: orbit 30s linear infinite;
        }

        .ring-two {
          inset: 32px;
          border-style: dashed;
          border-color: #ffffff40;
          animation-direction: reverse;
          animation-duration: 25s;
        }

        .emblem-core {
          position: absolute;
          inset: 77px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 1px solid #c79a2f;
          border-radius: 50%;
          background: #ffffff08;
        }

        .emblem-core span {
          color: #e2bd63;
          font-size: 66px;
          font-weight: 900;
        }

        .emblem-core small {
          font-size: 8px;
          letter-spacing: 2px;
        }

        .emblem-dot {
          position: absolute;
          width: 15px;
          height: 15px;
          border: 2px solid #e2bd63;
          border-radius: 50%;
          background: #0b2945;
          animation: bob 4s ease-in-out infinite;
        }

        .dot-one { top: 30px; left: 55px; }
        .dot-two { top: 125px; right: -5px; animation-delay: 1s; }
        .dot-three { bottom: 18px; left: 85px; animation-delay: 2s; }

        .story-section {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          align-items: center;
          gap: 75px;
          max-width: 1152px;
          margin: 0 auto;
          padding: 90px 24px;
        }

        .story-mark {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          min-height: 290px;
          padding: 40px;
          border: 1px solid #d7c28a;
          border-radius: 14px;
          background: linear-gradient(145deg, #092b49, #06182d);
          box-shadow: 0 20px 50px #08274412;
        }

        .story-mark span {
          color: #e2bd63;
          font-size: clamp(68px, 9vw, 105px);
          font-weight: 900;
          letter-spacing: -6px;
        }

        .story-mark div {
          width: 75px;
          height: 3px;
          margin: 10px 0 22px;
          background: #c79a2f;
        }

        .story-mark small {
          color: #d0dbe8;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
          line-height: 2;
        }

        .story-copy h2,
        .purpose-heading h2,
        .values-intro h2,
        .industries-heading h2,
        .about-cta h2 {
          margin: 12px 0 18px;
          color: #082744;
          font-size: clamp(30px, 4vw, 43px);
          font-weight: 800;
          line-height: 1.18;
          letter-spacing: -1px;
        }

        .story-copy h2 span {
          color: #b58a27;
        }

        .story-copy p,
        .purpose-heading > p,
        .values-intro > p,
        .industries-heading > p,
        .about-cta > p {
          color: #647184;
          font-size: 14px;
          line-height: 1.9;
        }

        .text-link {
          display: inline-flex;
          gap: 10px;
          margin-top: 12px;
          color: #082744;
          font-size: 13px;
          font-weight: 800;
          text-decoration: none;
        }

        .text-link span {
          color: #b58a27;
        }

        .purpose-section {
          padding: 80px 24px;
          background: #edf1f6;
        }

        .purpose-heading,
        .industries-heading {
          max-width: 700px;
          margin: 0 auto 36px;
          text-align: center;
        }

        .purpose-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
          max-width: 1152px;
          margin: 0 auto;
        }

        .purpose-card {
          padding: 34px;
          border: 1px solid #e0e5ec;
          border-radius: 12px;
          background: white;
          transition: transform 250ms ease, box-shadow 250ms ease;
        }

        .purpose-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 35px #10274410;
        }

        .vision-card {
          border-top: 3px solid #c79a2f;
        }

        .mission-card {
          border-top: 3px solid #082744;
        }

        .purpose-icon {
          display: grid;
          place-items: center;
          width: 49px;
          height: 49px;
          margin-bottom: 23px;
          border-radius: 10px;
          background: #f5f0e3;
          color: #a17a1e;
          font-size: 29px;
        }

        .purpose-number {
          color: #a17a1e;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        .purpose-card h3 {
          margin: 13px 0;
          color: #082744;
          font-size: 23px;
          line-height: 1.35;
        }

        .purpose-card p {
          margin: 0;
          color: #647184;
          font-size: 14px;
          line-height: 1.9;
        }

        .values-section {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 75px;
          max-width: 1152px;
          margin: 0 auto;
          padding: 90px 24px;
        }

        .values-list article {
          display: flex;
          gap: 22px;
          padding: 19px 0;
          border-bottom: 1px solid #e0e5ec;
        }

        .values-list article:first-child {
          padding-top: 0;
        }

        .values-list article > span {
          color: #b58a27;
          font-size: 12px;
          font-weight: 800;
        }

        .values-list h3 {
          margin: 0 0 7px;
          color: #082744;
          font-size: 17px;
        }

        .values-list p {
          margin: 0;
          color: #647184;
          font-size: 13px;
          line-height: 1.8;
        }

        .industries-section {
          padding: 80px 24px;
          background: #fff;
        }

        .industries-heading h2 span {
          color: #b58a27;
        }

        .industry-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
          max-width: 1152px;
          margin: 0 auto;
        }

        .industry-card {
          position: relative;
          min-height: 190px;
          padding: 23px;
          border: 1px solid #e3e8ef;
          border-radius: 10px;
          background: #fafbfd;
          text-decoration: none;
          animation: rise-in 650ms ease both;
          transition: transform 250ms ease, border-color 250ms ease,
            box-shadow 250ms ease;
        }

        .industry-card:hover {
          transform: translateY(-5px);
          border-color: #d9bd77;
          box-shadow: 0 14px 32px #1027440c;
        }

        .industry-icon {
          display: block;
          margin-bottom: 17px;
          font-size: 25px;
        }

        .industry-card h3 {
          margin: 0 0 8px;
          color: #082744;
          font-size: 17px;
          font-weight: 800;
        }

        .industry-card p {
          max-width: 290px;
          margin: 0;
          color: #647184;
          font-size: 12px;
          line-height: 1.8;
        }

        .industry-arrow {
          position: absolute;
          top: 22px;
          right: 22px;
          color: #b58a27;
          transition: transform 200ms ease;
        }

        .industry-card:hover .industry-arrow {
          transform: translate(3px, -3px);
        }

        .about-cta {
          margin: 70px auto;
          max-width: 1152px;
          padding: 50px 30px;
          border-radius: 14px;
          background: linear-gradient(120deg, #06182d, #01294a);
          text-align: center;
          color: white;
        }

        .about-cta h2 {
          max-width: 700px;
          margin: 13px auto;
          color: white;
        }

        .about-cta > p {
          max-width: 650px;
          margin: 0 auto;
          color: #d0dbe8;
        }

        .cta-actions {
          justify-content: center;
        }

        .cta-secondary {
          padding: 12px;
          color: white;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
        }

        @keyframes rise-in {
          from { opacity: 0; transform: translateY(22px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes orbit {
          to { transform: rotate(360deg); }
        }

        @keyframes bob {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -9px; }
        }

        @keyframes glow {
          from { opacity: 0.1; scale: 0.9; }
          to { opacity: 0.25; scale: 1.1; }
        }

        @media (max-width: 900px) {
          .hero-emblem {
            right: -100px;
            opacity: 0.22;
          }

          .story-section,
          .values-section {
            gap: 35px;
          }

          .industry-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .about-cta {
            margin-right: 24px;
            margin-left: 24px;
          }
        }

        @media (max-width: 600px) {
          .about-hero {
            min-height: 470px;
            padding: 65px 22px;
          }

          .eyebrow {
            font-size: 9px;
            letter-spacing: 1px;
          }

          .about-hero h1 {
            font-size: clamp(36px, 9.5vw, 48px);
            letter-spacing: -1.5px;
          }

          .hero-emblem {
            top: auto;
            right: -130px;
            bottom: -130px;
            transform: none;
          }

          .story-section,
          .values-section {
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 58px 20px;
          }

          .story-mark {
            min-height: 220px;
          }

          .purpose-section,
          .industries-section {
            padding: 60px 18px;
          }

          .purpose-grid,
          .industry-grid {
            grid-template-columns: 1fr;
          }

          .purpose-card {
            padding: 26px;
          }

          .industry-card {
            min-height: 160px;
          }

          .about-cta {
            margin: 0 18px 48px;
            padding: 36px 20px;
          }

          .brand-slogan {
            font-size: 9px;
            letter-spacing: 0.5px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .about-page *,
          .about-page *::before,
          .about-page *::after {
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
