import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const networks = [
  { name: 'BNB Smart Chain', symbol: 'BNB', color: '#e7b94b' },
  { name: 'Ethereum', symbol: 'ETH', color: '#8295db' },
  { name: 'Bitcoin', symbol: 'BTC', color: '#f7931a' },
  { name: 'Polygon', symbol: 'POL', color: '#9565db' },
]

const actions = [
  { icon: '↗', label: 'Send', detail: 'Transfer crypto' },
  { icon: '↙', label: 'Receive', detail: 'Get crypto' },
  { icon: '⇄', label: 'Swap', detail: 'Exchange tokens' },
  { icon: '＋', label: 'Buy', detail: 'Buy crypto' },
]

const features = [
  { icon: '◈', title: 'Multi-chain wallet', text: 'A single interface for supported blockchain networks.' },
  { icon: '⇄', title: 'Buy and sell', text: 'Crypto purchase and sale services when integrations are enabled.' },
  { icon: '✧', title: 'PERFI staking', text: 'Access staking information and supported staking opportunities.' },
  { icon: '▤', title: 'Payments and bills', text: 'A planned hub for digital payments and bill services.' },
]

export default function PerfiPay() {
  const [network, setNetwork] = useState('BNB Smart Chain')
  const [activeTab, setActiveTab] = useState('Wallet')
  const [authMode, setAuthMode] = useState('Sign up')
  const [email, setEmail] = useState('')
  const [pin, setPin] = useState('')
  const [notice, setNotice] = useState('')
  const [showAuth, setShowAuth] = useState(false)

  function submitDemo(event: { preventDefault: () => void }) {
    event.preventDefault()
    setNotice(
      'Interface preview only. Email verification and secure account authentication must be connected before account access is enabled.'
    )
  }

  return (
    <div className="perfi-pay">
      <Head>
        <title>PerfiPay | Multi-Chain Crypto Wallet</title>
        <meta
          name="description"
          content="Explore PerfiPay, the planned multi-chain crypto wallet and digital payments platform from Perfitech Global Venture Limited."
        />
      </Head>

      <Header />

      <main>
        <section className="pp-hero">
          <div className="hero-light" />
          <div className="hero-copy">
            <span className="pp-kicker">THE DIGITAL WALLET EXPERIENCE</span>
            <h1>Your crypto.<br /><span>Your possibilities.</span></h1>
            <p>
              Discover PerfiPay — a planned multi-chain wallet experience
              designed to bring digital assets, payments and the PERFI
              ecosystem together.
            </p>
            <div className="hero-buttons">
              <button className="gold-btn" onClick={() => {
                setAuthMode('Sign up')
                setShowAuth(true)
                setNotice('')
              }}>
                Get started <span>↗</span>
              </button>
              <a className="light-link" href="#wallet-preview">Explore wallet ↓</a>
            </div>
            <div className="hero-tags">
              <span>◈ Multi-chain vision</span>
              <span>⌑ PIN-ready design</span>
              <span>◇ PERFI ecosystem</span>
            </div>
          </div>

          <div className="hero-wallet" aria-label="Illustration of a PerfiPay wallet">
            <div className="wallet-top">
              <div className="mini-brand"><span className="brand-symbol">P</span><span>PerfiPay</span></div>
              <span className="live-pill"><i /> PREVIEW</span>
            </div>
            <div className="wallet-label">TOTAL PORTFOLIO</div>
            <div className="wallet-balance">— — —</div>
            <div className="wallet-note">Connect a wallet to view real balances</div>
            <div className="wallet-line" />
            <div className="wallet-bottom">
              <div><small>NETWORK</small><strong>BNB Chain</strong></div>
              <div><small>ASSETS</small><strong>PERFI + more</strong></div>
            </div>
            <div className="coin coin-one">P</div>
            <div className="coin coin-two">₿</div>
            <div className="coin coin-three">Ξ</div>
          </div>
        </section>

        <section className="wallet-section" id="wallet-preview">
          <div className="section-heading">
            <span className="pp-kicker">YOUR WALLET HUB</span>
            <h2>A clearer view of your <span>crypto world.</span></h2>
            <p>Explore the planned dashboard. No real funds or transactions are connected in this preview.</p>
          </div>

          <div className="dashboard">
            <div className="dashboard-head">
              <div className="dash-brand"><span className="brand-symbol">P</span><div><strong>PerfiPay Wallet</strong><small>Multi-chain dashboard</small></div></div>
              <span className="preview-label">DEMO PREVIEW</span>
            </div>

            <div className="dashboard-tabs">
              {['Wallet', 'Activity', 'Staking'].map(tab => (
                <button key={tab} className={activeTab === tab ? 'tab active' : 'tab'} onClick={() => setActiveTab(tab)}>{tab}</button>
              ))}
            </div>

            {activeTab === 'Wallet' && (
              <div className="dash-content">
                <div className="balance-card">
                  <div><span className="muted-label">TOTAL BALANCE</span><div className="balance-placeholder">Not connected</div></div>
                  <span className="balance-mark">◈</span>
                  <p>Connect a secure wallet integration to display balances.</p>
                </div>

                <div className="network-row">
                  <label htmlFor="network">Selected network</label>
                  <select id="network" value={network} onChange={event => setNetwork(event.target.value)}>
                    {networks.map(item => <option key={item.name} value={item.name}>{item.name}</option>)}
                  </select>
                </div>
                <div className="network-info"><span className="network-dot" /> Selected: <strong>{network}</strong></div>

                <div className="action-grid">
                  {actions.map(action => (
                    <button className="action-tile" key={action.label} onClick={() => setNotice(`${action.label} is a preview feature. Connect and audit the required wallet or provider integration before using real funds.`)}>
                      <span className="action-icon">{action.icon}</span><strong>{action.label}</strong><small>{action.detail}</small>
                    </button>
                  ))}
                </div>

                <div className="asset-heading"><strong>Your assets</strong><span>Network: {networks.find(item => item.name === network)?.symbol}</span></div>
                <div className="asset-row"><span className="asset-icon perfi-icon">P</span><div className="asset-name"><strong>PERFI</strong><small>PERFI Token</small></div><div className="asset-value"><strong>— PERFI</strong><small>Balance unavailable</small></div></div>
                <div className="asset-row"><span className="asset-icon bnb-icon">◆</span><div className="asset-name"><strong>{networks.find(item => item.name === network)?.symbol}</strong><small>{network}</small></div><div className="asset-value"><strong>—</strong><small>Balance unavailable</small></div></div>
              </div>
            )}

            {activeTab === 'Activity' && (
              <div className="empty-state"><span>▤</span><strong>Transaction history</strong><p>Your transactions will appear here after a secure wallet connection is implemented.</p></div>
            )}

            {activeTab === 'Staking' && (
              <div className="empty-state"><span>✧</span><strong>PERFI staking</strong><p>Staking options, lock periods, rewards and withdrawal rules will be shown when the staking contracts and integrations are ready.</p></div>
            )}
            {notice && <div className="notice" role="status">{notice}<button onClick={() => setNotice('')} aria-label="Dismiss message">×</button></div>}
          </div>
        </section>

        <section className="security-section">
          <div className="security-copy">
            <span className="pp-kicker">ACCESS BUILT AROUND SECURITY</span>
            <h2>Your account.<br /><span>Your control.</span></h2>
            <p>
              PerfiPay is planned to support email verification and a
              four-digit app PIN, alongside appropriate wallet security and
              account recovery.
            </p>
            <ul>
              <li><span>✓</span> Email verification during registration</li>
              <li><span>✓</span> Four-digit PIN for convenient app access</li>
              <li><span>✓</span> Separate wallet recovery and key protection</li>
              <li><span>✓</span> Clear confirmations before transactions</li>
            </ul>
            <p className="security-warning">
              A four-digit PIN alone is not sufficient to secure a crypto wallet.
              Real account access requires server-side authentication, secure
              PIN handling, rate limits and recovery safeguards.
            </p>
          </div>

          <div className="auth-card">
            <div className="auth-logo"><span className="brand-symbol">P</span><div><strong>Welcome to PerfiPay</strong><small>Your digital wallet starts here</small></div></div>
            <div className="auth-switch">
              {['Sign up', 'Log in'].map(mode => (
                <button key={mode} className={authMode === mode ? 'auth-selected' : ''} onClick={() => {
                  setAuthMode(mode)
                  setNotice('')
                }}>{mode}</button>
              ))}
            </div>
            <form onSubmit={submitDemo}>
              <label htmlFor="pp-email">Email address</label>
              <input id="pp-email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={event => setEmail(event.target.value)} required />
              <label htmlFor="pp-pin">{authMode === 'Sign up' ? 'Create a 4-digit app PIN' : 'Enter your 4-digit app PIN'}</label>
              <input id="pp-pin" type="password" inputMode="numeric" autoComplete="off" pattern="[0-9]{4}" minLength={4} maxLength={4} placeholder="••••" value={pin} onChange={event => setPin(event.target.value.replace(/\D/g, '').slice(0, 4))} required />
              <p className="pin-hint">Use a PIN you do not use for your bank card. Never share your recovery phrase.</p>
              <button className="gold-btn auth-submit" type="submit">{authMode === 'Sign up' ? 'Create account' : 'Continue'} <span>→</span></button>
              <p className="demo-disclaimer">Demo form only. This does not create an account, send a verification email or authenticate a user yet.</p>
              {notice && <div className="notice" role="status">{notice}<button type="button" onClick={() => setNotice('')} aria-label="Dismiss message">×</button></div>}
            </form>
          </div>
        </section>

        <section className="features-section">
          <div className="section-heading">
            <span className="pp-kicker">THE PERFIPAY ECOSYSTEM</span>
            <h2>More than a <span>wallet.</span></h2>
            <p>A foundation for connected digital finance and everyday commerce.</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <article className="feature-card" key={feature.title}>
                <span className="feature-icon">{feature.icon}</span>
                <span className="feature-index">0{index + 1}</span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="pp-cta">
          <span className="pp-kicker">PERFITECH GLOBAL VENTURE LIMITED</span>
          <h2>Building a more connected financial future.</h2>
          <p>PerfiPay is part of our vision to connect innovation, investment and digital commerce.</p>
          <Link href="/contact" className="gold-btn">Contact our team <span>↗</span></Link>
        </section>
      </main>

      {showAuth && (
        <div className="auth-overlay" onClick={() => setShowAuth(false)}>
          <div className="auth-modal" onClick={event => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAuth(false)} aria-label="Close sign-up">×</button>
            <span className="brand-symbol">P</span>
            <h2>Start with PerfiPay</h2>
            <p>Choose an account option below. Secure sign-up is not enabled in this preview.</p>
            <button className="gold-btn modal-option" onClick={() => {
              setAuthMode('Sign up')
              setShowAuth(false)
              setNotice('')
              document.getElementById('pp-email')?.focus()
            }}>Create an account <span>→</span></button>
            <button className="modal-secondary" onClick={() => {
              setAuthMode('Log in')
              setShowAuth(false)
              setNotice('')
              document.getElementById('pp-email')?.focus()
            }}>I already have an account</button>
          </div>
        </div>
      )}

      <Footer />

      <style jsx>{`
        .perfi-pay{color:#15283e;background:#f5f7fb;overflow:hidden}
        .pp-hero{position:relative;isolation:isolate;display:grid;grid-template-columns:1.1fr .9fr;align-items:center;gap:45px;min-height:530px;padding:76px max(24px,calc((100vw - 1152px)/2));background:linear-gradient(120deg,#06182d,#082b49 65%,#102b46);color:white}
        .hero-light{position:absolute;z-index:-1;right:12%;top:-90px;width:360px;height:360px;border-radius:50%;background:#c79a2f;filter:blur(110px);opacity:.18}
        .hero-copy{animation:rise-in .7s ease both}
        .pp-kicker{color:#bd922f;font-size:10px;font-weight:800;letter-spacing:2px}
        .pp-hero h1{margin:20px 0;font-size:clamp(43px,5.3vw,66px);line-height:1.04;letter-spacing:-2px}
        .pp-hero h1 span,.section-heading h2 span,.security-copy h2 span{color:#e2bd63}
        .pp-hero p{max-width:540px;color:#d1dce8;font-size:14px;line-height:1.9}
        .hero-buttons{display:flex;align-items:center;gap:22px;flex-wrap:wrap;margin-top:25px}
        .gold-btn{display:inline-flex;align-items:center;justify-content:center;gap:14px;min-height:46px;padding:0 20px;border:0;border-radius:6px;background:#c79a2f;color:#071a2e;font-weight:800;font-size:13px;text-decoration:none;cursor:pointer;transition:transform .2s,background .2s}
        .gold-btn:hover{transform:translateY(-2px);background:#e2bd63}
        .light-link{color:white;font-size:13px;text-decoration:none}
        .hero-tags{display:flex;flex-wrap:wrap;gap:17px;margin-top:30px;color:#cbd7e3;font-size:10px}
        .hero-wallet{position:relative;max-width:410px;width:100%;justify-self:end;min-height:310px;padding:26px;border:1px solid #ffffff25;border-radius:18px;background:linear-gradient(145deg,#ffffff12,#ffffff04);box-shadow:0 30px 90px #0003;backdrop-filter:blur(8px);animation:rise-in .9s ease both}
        .wallet-top,.wallet-bottom,.dashboard-head,.asset-row,.asset-heading,.network-row{display:flex;align-items:center;justify-content:space-between;gap:12px}
        .mini-brand,.dash-brand,.auth-logo{display:flex;align-items:center;gap:10px}
        .brand-symbol{display:inline-grid;place-items:center;flex-shrink:0;width:34px;height:34px;border:1px solid #c79a2f;border-radius:10px;color:#e2bd63;font-weight:900;font-size:20px}
        .live-pill,.preview-label{padding:6px 8px;border:1px solid #ffffff25;border-radius:20px;color:#e2bd63;font-size:8px;font-weight:800;letter-spacing:1px}
        .live-pill i{display:inline-block;width:6px;height:6px;margin-right:5px;border-radius:50%;background:#e2bd63}
        .wallet-label,.muted-label{display:block;margin-top:35px;color:#bac8d7;font-size:9px;letter-spacing:1.5px}
        .wallet-balance{margin:9px 0;font-size:37px;font-weight:800;letter-spacing:3px}
        .wallet-note{color:#b7c6d5;font-size:10px}
        .wallet-line{height:1px;margin:25px 0;background:#ffffff20}
        .wallet-bottom small,.wallet-bottom strong{display:block}
        .wallet-bottom small{margin-bottom:8px;color:#b7c6d5;font-size:8px;letter-spacing:1px}
        .wallet-bottom strong{font-size:11px}
        .coin{position:absolute;display:grid;place-items:center;width:43px;height:43px;border:1px solid #e2bd6380;border-radius:50%;background:#0b2d4b;color:#e2bd63;font-size:21px;font-weight:800;box-shadow:0 8px 25px #0003}
        .coin-one{right:-15px;top:60px}.coin-two{right:27px;bottom:-17px;color:#f6a623}.coin-three{left:-16px;bottom:45px;color:#c1caff}
        .wallet-section,.features-section{padding:85px 24px}
        .section-heading{max-width:680px;margin:0 auto 35px;text-align:center}
        .section-heading h2,.security-copy h2,.pp-cta h2{margin:13px 0;color:#092744;font-size:clamp(30px,4vw,43px);line-height:1.2;letter-spacing:-1px}
        .section-heading h2 span{color:#b58a27}
        .section-heading p{color:#68778a;font-size:13px;line-height:1.8}
        .dashboard{max-width:790px;margin:0 auto;padding:26px;border:1px solid #e2e7ee;border-radius:15px;background:white;box-shadow:0 25px 65px #0b29450b}
        .dashboard-head{padding-bottom:20px}
        .dash-brand strong,.dash-brand small,.auth-logo strong,.auth-logo small{display:block}
        .dash-brand strong,.auth-logo strong{color:#092744;font-size:13px}
        .dash-brand small,.auth-logo small{margin-top:4px;color:#8490a0;font-size:10px}
        .preview-label{border-color:#e9dfc4;color:#99721c;background:#faf7ef}
        .dashboard-tabs{display:flex;gap:25px;border-bottom:1px solid #e9edf2}
        .tab{padding:12px 2px;border:0;border-bottom:2px solid transparent;background:transparent;color:#7b8797;font-size:12px;cursor:pointer}
        .tab.active{border-bottom-color:#c79a2f;color:#092744;font-weight:800}
        .dash-content{padding-top:22px}
        .balance-card{position:relative;padding:22px;border-radius:10px;background:linear-gradient(120deg,#071d34,#103958);color:white}
        .balance-card .muted-label{margin:0;color:#c5d1dd}
        .balance-placeholder{margin:10px 0;font-size:26px;font-weight:800}
        .balance-card p{margin:0;color:#c5d1dd;font-size:10px}
        .balance-mark{position:absolute;top:20px;right:22px;color:#e2bd63;font-size:29px}
        .network-row{margin-top:23px}
        .network-row label{color:#596a7e;font-size:11px;font-weight:700}
        .network-row select{max-width:60%;padding:10px;border:1px solid #e0e5ec;border-radius:6px;background:#fff;color:#14283e;font-size:11px}
        .network-info{margin-top:10px;color:#8792a0;font-size:10px}
        .network-info strong{color:#3e5065}
        .network-dot{display:inline-block;width:7px;height:7px;margin-right:6px;border-radius:50%;background:#c79a2f}
        .action-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin:22px 0}
        .action-tile{display:flex;flex-direction:column;align-items:center;gap:7px;padding:15px 5px;border:1px solid #e7ebf1;border-radius:9px;background:#fff;cursor:pointer;transition:border-color .2s,transform .2s}
        .action-tile:hover{transform:translateY(-3px);border-color:#c79a2f}
        .action-icon{display:grid;place-items:center;width:37px;height:37px;border-radius:10px;background:#f7f1e3;color:#a17a1e;font-size:22px}
        .action-tile strong{color:#19334e;font-size:11px}
        .action-tile small{color:#8994a3;font-size:9px}
        .asset-heading{margin:27px 0 10px;font-size:12px}
        .asset-heading span{color:#8792a0;font-size:10px}
        .asset-row{justify-content:flex-start;padding:14px 0;border-top:1px solid #edf0f4}
        .asset-icon{display:grid;place-items:center;width:38px;height:38px;border-radius:50%;font-weight:900}
        .perfi-icon{background:#092744;color:#e2bd63}.bnb-icon{background:#fbf1d8;color:#b58a27}
        .asset-name strong,.asset-name small,.asset-value strong,.asset-value small{display:block}
        .asset-name strong,.asset-value strong{color:#19334e;font-size:11px}
        .asset-name small,.asset-value small{margin-top:4px;color:#8994a3;font-size:9px}
        .asset-value{margin-left:auto;text-align:right}
        .empty-state{display:flex;flex-direction:column;align-items:center;gap:12px;min-height:210px;justify-content:center;text-align:center}
        .empty-state>span{color:#bd922f;font-size:32px}
        .empty-state strong{color:#092744;font-size:15px}
        .empty-state p{max-width:400px;color:#748194;font-size:12px;line-height:1.8}
        .notice{position:relative;margin-top:15px;padding:13px 35px 13px 14px;border:1px solid #e8d7a9;border-radius:7px;background:#fff9e9;color:#6f571e;font-size:11px;line-height:1.7}
        .notice button{position:absolute;top:7px;right:9px;border:0;background:transparent;color:#6f571e;font-size:18px;cursor:pointer}
        .security-section{display:grid;grid-template-columns:1fr .85fr;align-items:center;gap:65px;padding:85px max(24px,calc((100vw - 1050px)/2));background:#eaf0f6}
        .security-copy h2{margin-bottom:15px}
        .security-copy h2 span{color:#b58a27}
        .security-copy>p{color:#66768a;font-size:13px;line-height:1.9}
        .security-copy ul{display:grid;gap:15px;margin:25px 0;padding:0;list-style:none}
        .security-copy li{display:flex;gap:11px;color:#2e435a;font-size:12px}
        .security-copy li span{color:#a17a1e;font-weight:900}
        .security-copy .security-warning{padding:13px;border-left:3px solid #c79a2f;background:#ffffff90;font-size:11px}
        .auth-card{padding:27px;border:1px solid #e1e6ed;border-radius:13px;background:white;box-shadow:0 20px 50px #0b294508}
        .auth-switch{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin:25px 0 22px;padding:4px;border-radius:7px;background:#f1f4f8}
        .auth-switch button{padding:11px;border:0;border-radius:5px;background:transparent;color:#748194;font-size:12px;cursor:pointer}
        .auth-switch button.auth-selected{background:white;color:#092744;font-weight:800;box-shadow:0 2px 7px #0b29450c}
        .auth-card form>label{display:block;margin:15px 0 8px;color:#30465d;font-size:11px;font-weight:700}
        .auth-card input{box-sizing:border-box;width:100%;height:43px;padding:0 12px;border:1px solid #dfe5ed;border-radius:6px;background:#fff;color:#12243a;font-size:13px;outline:none}
        .auth-card input:focus{border-color:#c79a2f;box-shadow:0 0 0 3px #c79a2f20}
        .auth-card input#pp-pin{letter-spacing:8px}
        .pin-hint,.demo-disclaimer{color:#8792a0;font-size:10px;line-height:1.7}
        .auth-submit{width:100%;margin-top:13px}
        .demo-disclaimer{text-align:center}
        .features-section{background:white}
        .features-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;max-width:1152px;margin:0 auto}
        .feature-card{position:relative;min-height:190px;padding:23px;border:1px solid #e5e9ef;border-radius:10px;background:#fafbfd;transition:transform .2s,border-color .2s}
        .feature-card:hover{transform:translateY(-4px);border-color:#d8bd78}
        .feature-icon{display:grid;place-items:center;width:42px;height:42px;border-radius:10px;background:#f6efdc;color:#a17a1e;font-size:23px}
        .feature-index{position:absolute;top:26px;right:22px;color:#c4ccd6;font-size:10px}
        .feature-card h3{margin:20px 0 9px;color:#092744;font-size:14px}
        .feature-card p{color:#758296;font-size:11px;line-height:1.8}
        .pp-cta{max-width:1104px;margin:0 auto 70px;padding:52px 25px;border-radius:14px;background:linear-gradient(120deg,#06182d,#0c3454);text-align:center;color:white}
        .pp-cta h2{max-width:600px;margin:15px auto;color:white}
        .pp-cta p{max-width:570px;margin:0 auto 25px;color:#d0dbe8;font-size:13px;line-height:1.8}
        .auth-overlay{position:fixed;z-index:1000;inset:0;display:grid;place-items:center;padding:20px;background:#06182ddd}
        .auth-modal{position:relative;width:min(100%,390px);padding:32px;border:1px solid #ffffff25;border-radius:15px;background:white;text-align:center;box-shadow:0 25px 80px #0005}
        .auth-modal h2{margin:18px 0 8px;color:#092744;font-size:24px}
        .auth-modal p{color:#738195;font-size:12px;line-height:1.8}
        .modal-close{position:absolute;top:10px;right:13px;border:0;background:transparent;color:#68778a;font-size:24px;cursor:pointer}
        .modal-option{width:100%;margin-top:12px}
        .modal-secondary{width:100%;padding:14px;border:0;background:transparent;color:#19334e;font-size:12px;font-weight:700;cursor:pointer}
        @keyframes rise-in{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:900px){.pp-hero{grid-template-columns:1fr;gap:40px;padding-top:65px;padding-bottom:65px}.hero-wallet{justify-self:start;max-width:470px}.security-section{gap:30px}.features-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.pp-cta{margin-right:24px;margin-left:24px}}
        @media(max-width:600px){.pp-hero{padding:55px 21px}.pp-hero h1{font-size:45px}.hero-tags{gap:12px}.hero-wallet{box-sizing:border-box;min-height:285px;padding:22px}.wallet-balance{font-size:31px}.wallet-section,.features-section{padding:60px 16px}.dashboard{padding:16px}.action-grid{gap:6px}.action-tile{padding:12px 2px}.action-tile small{font-size:8px}.network-row select{max-width:62%;font-size:10px}.security-section{grid-template-columns:1fr;padding:60px 20px}.features-grid{grid-template-columns:1fr}.feature-card{min-height:150px}.pp-cta{margin:0 16px 45px;padding:38px 20px}.section-heading h2,.security-copy h2{font-size:32px}.auth-card{padding:21px}}
        @media(prefers-reduced-motion:reduce){.perfi-pay *,.perfi-pay *::before,.perfi-pay *::after{animation-duration:.01ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition-duration:.01ms!important}}
      `}</style>
    </div>
  )
}
