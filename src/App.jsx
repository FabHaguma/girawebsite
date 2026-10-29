import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Menu,
  MessageCircle,
  Phone,
  X,
} from 'lucide-react'
import Features from './components/features/Features'
import TemplatesSection from './components/templates/TemplatesSection'
import TemplatesPage from './pages/TemplatesPage'
import { structures, themes } from './data/templateData'
import WhatsAppMessenger from './services/whatsapp/whatsapp.config'
import './styles/App.css'

const CONTACT_PHONE = { tel: '+250786072607', display: '+250 786 072 607' }
const CONTACT_PLAN = 'Consultation'
const POCKETBASE_URL = 'https://pb.haguma.com'
const tiers = [
  {
    name: 'Standard',
    price: '30,000',
    usd: '25',
    description: 'A confident first step for your business online.',
    features: [
      'Your choice of template & theme',
      'Up to 7 gallery pictures',
      'Standard contact form',
      'Basic blog functionality',
      'Mobile responsive design',
    ],
    button: 'Start with Standard',
  },
  {
    name: 'Premium',
    price: '50,000',
    usd: '35',
    popular: true,
    description: 'More room to make it yours. More ways to grow.',
    features: [
      'Template & layout modifications',
      'Up to 20 gallery pictures',
      'Advanced contact form',
      'Blog functionality',
      '1 custom service integration',
    ],
    button: 'Choose Premium',
  },
  {
    name: 'Enterprise',
    description: 'Something bigger in mind? Let’s build around it.',
    features: [
      'Everything in Premium',
      'Unlimited gallery pictures',
      'Custom feature development',
      'Priority 24/7 support',
      'Dedicated account manager',
    ],
    button: 'Let’s talk about it',
  },
]
const questions = [
  [
    'Can I sell products or take bookings?',
    'Yes. We can add online shopping, slot scheduling, and WhatsApp ordering to your website. Premium includes one custom service integration; we’ll help you work out the right plan and scope for your needs.',
  ],
  [
    'Do I have to use a template?',
    'Templates are a starting point. Choose a structure and theme, ask for modifications on Premium, or talk to us about a custom build with Enterprise.',
  ],
  [
    'Will my website work on a phone?',
    'Yes. Every website is responsive, so your pages, galleries, and customer actions adapt to phones, tablets, and desktop screens.',
  ],
  [
    'How do we get started?',
    'Tell us about your business and what you want your website to do. We’ll help you choose a plan, a design direction, and the services that fit.',
  ],
]

async function fetchWebsites(signal) {
  const websites = []
  const params = new URLSearchParams({
    perPage: '200',
    filter: 'for_who = "webyacu_list"',
    sort: 'cardinal',
    fields: 'id,collectionId,name,for_who,url,description,cardinal,thumbnail',
  })
  let page = 1
  let totalPages = 1
  while (page <= totalPages) {
    params.set('page', String(page))
    const response = await fetch(
      `${POCKETBASE_URL}/api/collections/website_links/records?${params}`,
      { signal },
    )
    if (!response.ok) throw new Error('Unable to load project previews.')
    const result = await response.json()
    websites.push(...(result.items || []))
    totalPages = result.totalPages
    page += 1
  }
  return websites
}

function parseRoute() {
  const hash = window.location.hash
  if (hash.startsWith('#/templates')) {
    const [, , structure, theme] = hash.split('/')
    return {
      page: 'templates',
      structure: structures.some((s) => s.id === structure)
        ? structure
        : structures[0].id,
      theme: themes.some((t) => t.id === theme) ? theme : themes[0].id,
    }
  }
  return { page: 'home' }
}

function useRoute() {
  const [route, setRoute] = useState(parseRoute)
  useEffect(() => {
    const onChange = () => setRoute(parseRoute())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  useEffect(() => {
    if (route.page === 'templates') {
      window.scrollTo(0, 0)
      return
    }
    const id = window.location.hash.slice(1)
    if (id && !id.startsWith('/'))
      requestAnimationFrame(() =>
        document.getElementById(id)?.scrollIntoView({ behavior: 'auto' }),
      )
  }, [route.page])
  return route
}

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="WebYacu home">
      <img src="/webyacu-logo.png" alt="" width="36" height="35" />
      <span>
        WebYacu<span className="brand-dot">.</span>
      </span>
    </a>
  )
}

function SiteNav({ onContact, page }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  useEffect(() => {
    if (!menuOpen) return
    const close = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        navRef.current?.querySelector('.menu-toggle')?.focus()
      }
      if (
        event.type === 'pointerdown' &&
        !navRef.current?.contains(event.target)
      )
        setMenuOpen(false)
    }
    document.addEventListener('keydown', close)
    document.addEventListener('pointerdown', close)
    return () => {
      document.removeEventListener('keydown', close)
      document.removeEventListener('pointerdown', close)
    }
  }, [menuOpen])
  return (
    <nav className="site-nav" ref={navRef} aria-label="Main navigation">
      <Brand />
      <div
        id="main-navigation"
        className={`nav-links${menuOpen ? ' is-open' : ''}`}
        onClick={() => setMenuOpen(false)}
      >
        <a href="#features">What we do</a>
        <a href="#websites">Our work</a>
        <a href="#pricing">Pricing</a>
        <a
          href="#/templates/showcase/fixit-pro"
          aria-current={page === 'templates' ? 'page' : undefined}
        >
          Templates <ArrowUpRight size={13} />
        </a>
      </div>
      <div className="nav-actions">
        <button
          className="nav-contact"
          onClick={() => {
            setMenuOpen(false)
            onContact()
          }}
          type="button"
        >
          Let’s talk <ArrowUpRight size={16} />
        </button>
        <button
          className="menu-toggle"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
    </nav>
  )
}

function Hero({ onStart }) {
  return (
    <section id="top" className="hero-section">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-eyebrow">
            <span className="status-dot" /> YOUR NEXT CHAPTER STARTS HERE
          </p>
          <h1>
            Your business.
            <br />
            Looking its
            <br />
            <em>best online.</em>
          </h1>
          <p className="hero-description">
            From your first impression to your next order. We build websites
            that help your business get seen, get booked, and get growing.
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={onStart} type="button">
              Let’s build your website <ArrowUpRight size={18} />
            </button>
            <a className="text-link" href="#websites">
              See our work <ArrowRight size={17} />
            </a>
          </div>
          <div className="hero-details">
            <span>
              <Check size={16} /> Made for your business
            </span>
            <span>
              <Check size={16} /> Ready for every screen
            </span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-orbit" aria-hidden="true" />
          <div
            className="hero-browser"
            role="img"
            aria-label="WebYacu builds websites with image galleries, online shopping, scheduling, blogging, and WhatsApp ordering."
          >
            <div className="preview-browser-bar">
              <span className="browser-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>your next big thing, online.</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </div>
            <div className="hero-platform-header">
              <span className="hero-platform-brand">
                WebYacu<span>.</span>
              </span>
              <span>BUILT AROUND YOU</span>
            </div>
            <div className="hero-platform-intro">
              <span>GOOD WEBSITES. REAL POSSIBILITIES.</span>
              <h2>
                Your ideas.
                <br />
                <em>Online, working.</em>
              </h2>
              <span className="hero-platform-mark" aria-hidden="true">
                w.
              </span>
            </div>
            <div className="hero-platform-services">
              {[
                'Image galleries',
                'Online shopping',
                'Slot scheduling',
                'Blogging',
                'WhatsApp ordering',
              ].map((service, index) => (
                <div key={service}>
                  <span className="hero-service-index">0{index + 1}</span>
                  <span>{service}</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
          <div className="floating-order">
            <span className="order-check">
              <Check size={20} />
            </span>
            <div>
              <strong>Your business, ready for more.</strong>
              <span>Made to sell, book, share, and connect.</span>
            </div>
          </div>
          <p className="hero-visual-caption">
            Your services. One connected website.
          </p>
        </div>
      </div>
      <a href="#features" className="hero-bottom">
        <span>GOOD DESIGN. REAL POSSIBILITIES.</span>
        <span>
          Discover what your website can do <ChevronDown size={17} />
        </span>
      </a>
    </section>
  )
}

function WebsiteCard({ web, index }) {
  const [imageFailed, setImageFailed] = useState(false)
  const thumbnail = web.thumbnail
    ? `${POCKETBASE_URL}/api/files/${web.collectionId}/${web.id}/${encodeURIComponent(web.thumbnail)}`
    : `https://image.thum.io/get/width/800/crop/650/${web.url}`
  const safeUrl = /^https?:\/\//i.test(web.url) ? web.url : null
  if (!safeUrl) return null
  return (
    <article className="work-card">
      <a
        href={safeUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={`Visit ${web.name} (opens in a new tab)`}
      >
        <div className={`work-image work-image-${index % 3}`}>
          <div className="work-browser">
            <div className="browser-bar">
              <i />
              <i />
              <i />
              <span>{web.name}</span>
            </div>
            {imageFailed ? (
              <div className="work-fallback">
                <span>BUILT WITH WEBYACU</span>
                <strong>{web.name}</strong>
                <span>
                  Visit the live website <ArrowUpRight size={18} />
                </span>
              </div>
            ) : (
              <img
                src={thumbnail}
                alt={`Website designed for ${web.name}`}
                loading="lazy"
                width="800"
                height="650"
                onError={() => setImageFailed(true)}
              />
            )}
          </div>
          <span className="work-visit">
            <ArrowUpRight size={21} />
          </span>
        </div>
        <div className="work-meta">
          <h3>{web.name}</h3>
          <ArrowUpRight size={19} />
        </div>
        <p>{web.description}</p>
      </a>
    </article>
  )
}

function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () =>
      setVisible(
        window.scrollY > 700 &&
          document.querySelector('footer')?.getBoundingClientRect().top >=
            window.innerHeight,
      )
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return (
    <button
      type="button"
      className={`back-to-top${visible ? ' is-visible' : ''}`}
      tabIndex={visible ? 0 : -1}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        document
          .querySelector('.site-nav .brand')
          ?.focus({ preventScroll: true })
      }}
      aria-label="Back to top"
    >
      <ArrowUp size={19} />
    </button>
  )
}

function IntakeModal({ selectedPlan, onClose }) {
  const [submitted, setSubmitted] = useState(false)
  const [formChosen, setFormChosen] = useState(false)
  const [fields, setFields] = useState(null)
  const dialogRef = useRef(null)
  const closeRef = useRef(onClose)
  useEffect(() => {
    closeRef.current = onClose
  }, [onClose])
  const showChoice = selectedPlan === CONTACT_PLAN && !formChosen
  useEffect(() => {
    if (submitted) dialogRef.current?.querySelector('.confirmation a')?.focus()
    else if (formChosen)
      dialogRef.current?.querySelector('input[name=name]')?.focus()
  }, [formChosen, submitted])
  useEffect(() => {
    const previous = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.querySelector('button')?.focus()
    const handleKey = (event) => {
      if (event.key === 'Escape') closeRef.current()
      if (event.key !== 'Tab') return
      const items = Array.from(
        dialogRef.current?.querySelectorAll(
          'button:not(:disabled), a[href], input:not(:disabled)',
        ) || [],
      )
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first?.focus()
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKey)
      previous?.focus({ preventScroll: true })
    }
  }, [])
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className="modal"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <button
          className="close-button"
          type="button"
          aria-label="Close request form"
          onClick={onClose}
        >
          <X size={21} />
        </button>
        <p className="eyebrow">YOUR NEXT CHAPTER</p>
        <h2 id="modal-title">
          {submitted
            ? 'Ready when you are.'
            : showChoice
              ? 'Let’s make it happen.'
              : 'Tell us a little about you.'}
        </h2>
        {submitted ? (
          <div className="confirmation">
            <span className="confirmation-icon">
              <CheckCircle2 size={32} />
            </span>
            <p>
              Your request is ready in WhatsApp. Send the message there to share
              it with HagumaTech.
            </p>
            <a
              className="primary-button"
              href={WhatsAppMessenger.buildUrlFromTemplate('intake', {
                ...fields,
                plan: selectedPlan,
              })}
              target="_blank"
              rel="noreferrer"
            >
              Open WhatsApp again <ArrowUpRight size={16} />
            </a>
            <button className="text-link" type="button" onClick={onClose}>
              Done
            </button>
          </div>
        ) : showChoice ? (
          <div className="contact-choice">
            <p>
              A new idea, a growing business, or a website that needs a fresh
              start. Let’s talk about it.
            </p>
            <a
              className="primary-button contact-option"
              href={WhatsAppMessenger.buildUrl(
                'Hi HagumaTech, I would like to talk about a website for my business.',
              )}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} /> Chat on WhatsApp{' '}
              <ArrowUpRight size={16} />
            </a>
            <button
              className="secondary-button contact-option"
              type="button"
              onClick={() => setFormChosen(true)}
            >
              <ClipboardList size={18} /> Tell us about your project
            </button>
            <a className="contact-phone" href={`tel:${CONTACT_PHONE.tel}`}>
              <Phone size={15} /> Or call {CONTACT_PHONE.display}
            </a>
          </div>
        ) : (
          <form
            className="intake-form"
            onSubmit={(event) => {
              event.preventDefault()
              const data = Object.fromEntries(new FormData(event.currentTarget))
              setFields(data)
              WhatsAppMessenger.send('intake', { ...data, plan: selectedPlan })
              setSubmitted(true)
            }}
          >
            <p className="form-intro">
              We’ll open WhatsApp with your details ready to send.
            </p>
            <label>
              You’re interested in
              <input value={selectedPlan} disabled />
            </label>
            <label>
              Full name
              <input
                name="name"
                autoComplete="name"
                required
                placeholder="Your name"
                maxLength={120}
              />
            </label>
            <label>
              Email address <span>(optional)</span>
              <input
                name="email"
                autoComplete="email"
                type="email"
                placeholder="you@yourbusiness.com"
                maxLength={180}
              />
            </label>
            <label>
              Phone number <span>(optional)</span>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+250 7xx xxx xxx"
                maxLength={40}
              />
            </label>
            <label>
              Your business
              <input
                name="trade"
                required
                placeholder="What do you do, and what do you have in mind?"
                maxLength={600}
              />
            </label>
            <button className="primary-button" type="submit">
              Continue on WhatsApp <ArrowUpRight size={17} />
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

function SiteFooter({ onContact }) {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Brand />
          <p>
            A little local.
            <br />A world of possibilities.
          </p>
        </div>
        <div className="footer-links">
          <a href="#features">What we do</a>
          <a href="#websites">Our work</a>
          <a href="#pricing">Pricing</a>
          <a href="#/templates/showcase/fixit-pro">
            Template studio <ArrowUpRight size={12} />
          </a>
        </div>
        <div className="footer-contact">
          <span>HAVE SOMETHING IN MIND?</span>
          <button className="text-link" type="button" onClick={onContact}>
            Let’s make it real <ArrowUpRight size={21} />
          </button>
          <a href={`tel:${CONTACT_PHONE.tel}`}>{CONTACT_PHONE.display}</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} WebYacu. All rights reserved.</p>
        <p className="site-credit">
          Built by{' '}
          <a
            href="https://www.tech.haguma.com/"
            target="_blank"
            rel="noreferrer"
          >
            HagumaTech
          </a>
          , powered by{' '}
          <a href="https://www.webyacu.com/" target="_blank" rel="noreferrer">
            WebYacu
          </a>
        </p>
        <a href="#top">
          Back to the top <ArrowUpRight size={13} />
        </a>
      </div>
    </footer>
  )
}

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState('')
  const [webList, setWebList] = useState([])
  const [webListLoading, setWebListLoading] = useState(true)
  const [webListError, setWebListError] = useState('')
  const [webListRequest, setWebListRequest] = useState(0)
  const [showAllWork, setShowAllWork] = useState(false)
  const route = useRoute()
  useEffect(() => {
    document.title =
      route.page === 'templates'
        ? 'Template Studio — WebYacu'
        : 'WebYacu — Your business, looking its best online'
  }, [route.page])
  useEffect(() => {
    const controller = new AbortController()
    fetchWebsites(controller.signal)
      .then(setWebList)
      .catch((error) => {
        if (error.name !== 'AbortError') setWebListError(error.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setWebListLoading(false)
      })
    return () => controller.abort()
  }, [webListRequest])
  const onContact = () => setSelectedPlan(CONTACT_PLAN)
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteNav page={route.page} onContact={onContact} />
      <main id="main-content" tabIndex={-1}>
        {route.page === 'templates' ? (
          <TemplatesPage
            key={`${route.structure}-${route.theme}`}
            initialStructure={route.structure}
            initialTheme={route.theme}
            onStart={setSelectedPlan}
          />
        ) : (
          <>
            <Hero onStart={onContact} />
            <div className="capabilities-strip">
              <span>ONE WEBSITE. SO MUCH POSSIBILITY.</span>
              <div>
                <span>Show your work</span>
                <i />
                <span>Sell your products</span>
                <i />
                <span>Fill your calendar</span>
                <i />
                <span>Tell your story</span>
              </div>
            </div>
            <Features />
            <section id="websites" className="section work-section">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">IDEAS, BROUGHT TO LIFE</p>
                  <h2>
                    Different businesses.
                    <br />
                    <span>Same attention to detail.</span>
                  </h2>
                </div>
                <p>
                  Real websites for real businesses.
                  <br />
                  Take a look around. Yours could be next.
                </p>
              </div>
              <div className="work-grid">
                {webListLoading ? (
                  <div className="work-status" role="status">
                    <span className="status-dot" /> Bringing our work into view…
                  </div>
                ) : webListError ? (
                  <div className="work-status" role="alert">
                    <p>Our project previews couldn’t load right now.</p>
                    <button
                      className="secondary-button"
                      type="button"
                      onClick={() => {
                        setWebListLoading(true)
                        setWebListError('')
                        setWebListRequest((value) => value + 1)
                      }}
                    >
                      Try again <ArrowRight size={15} />
                    </button>
                  </div>
                ) : webList.length ? (
                  (showAllWork ? webList : webList.slice(0, 3)).map(
                    (web, index) => (
                      <WebsiteCard key={web.id} web={web} index={index} />
                    ),
                  )
                ) : (
                  <div className="work-status">
                    <p>Want to see what we could build for your business?</p>
                    <button
                      className="text-link"
                      type="button"
                      onClick={onContact}
                    >
                      Talk to HagumaTech <ArrowUpRight size={17} />
                    </button>
                  </div>
                )}
              </div>
              {webList.length > 3 && (
                <button
                  className="text-link work-more"
                  type="button"
                  aria-expanded={showAllWork}
                  onClick={() => setShowAllWork(!showAllWork)}
                >
                  {showAllWork ? 'Show fewer projects' : 'More of our work'}{' '}
                  <ArrowRight size={17} />
                </button>
              )}
            </section>
            <TemplatesSection />
            <section className="section process-section">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">A SIMPLE WAY FORWARD</p>
                  <h2>
                    Big step for your business.
                    <br />
                    <span>Simple steps to get there.</span>
                  </h2>
                </div>
                <button className="text-link" type="button" onClick={onContact}>
                  Start the conversation <ArrowUpRight size={18} />
                </button>
              </div>
              <ol className="process-grid">
                <li>
                  <span>01 /</span>
                  <h3>Tell us your story.</h3>
                  <p>
                    Your business, your customers, your next big idea. We start
                    by understanding what you need.
                  </p>
                </li>
                <li>
                  <span>02 /</span>
                  <h3>Find your direction.</h3>
                  <p>
                    Choose a look and the services that fit. We bring your
                    content, photos, and personality together.
                  </p>
                </li>
                <li>
                  <span>03 /</span>
                  <h3>Make your entrance.</h3>
                  <p>
                    We build and launch your website, ready for customers to
                    discover you and take the next step.
                  </p>
                </li>
              </ol>
            </section>
            <section id="pricing" className="section pricing-section">
              <div className="section-intro">
                <p className="eyebrow">YOUR NEXT INVESTMENT IN YOU</p>
                <h2>
                  Good websites.
                  <br />
                  <span>Sensible starting points.</span>
                </h2>
                <p>
                  Choose the space your business needs. All plans are billed
                  yearly.
                </p>
              </div>
              <div className="pricing-grid">
                {tiers.map((tier) => (
                  <article
                    key={tier.name}
                    className={`pricing-card${tier.popular ? ' popular' : ''}`}
                  >
                    <div className="pricing-name">
                      <h3>{tier.name}</h3>
                      {tier.popular && (
                        <span className="popular-label">
                          A little more possibility
                        </span>
                      )}
                    </div>
                    <p className="description">{tier.description}</p>
                    <div className="price">
                      {tier.price ? (
                        <>
                          <span className="price-currency">Rwf</span>
                          <strong>{tier.price}</strong>
                          <span className="price-period">/ year</span>
                        </>
                      ) : (
                        <strong>Let’s talk.</strong>
                      )}
                    </div>
                    <p className="price-note">
                      {tier.usd
                        ? `USD ${tier.usd} / year`
                        : 'A plan shaped around your project.'}
                    </p>
                    <button
                      className={
                        tier.popular ? 'primary-button' : 'secondary-button'
                      }
                      type="button"
                      onClick={() => setSelectedPlan(tier.name)}
                    >
                      {tier.button}
                      <ArrowUpRight size={17} />
                    </button>
                    <div className="pricing-includes">WHAT’S INCLUDED</div>
                    <ul>
                      {tier.features.map((feature) => (
                        <li key={feature}>
                          <Check size={16} strokeWidth={1.8} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
              <p className="pricing-footnote">
                Need online shopping, scheduling, or something specific?{' '}
                <button type="button" className="text-link" onClick={onContact}>
                  Let’s find your fit <ArrowUpRight size={14} />
                </button>
              </p>
            </section>
            <section className="section faq-section">
              <div>
                <p className="eyebrow">A FEW GOOD QUESTIONS</p>
                <h2>Glad you asked.</h2>
                <p>Something else on your mind?</p>
                <button className="text-link" type="button" onClick={onContact}>
                  We’re a conversation away <ArrowUpRight size={17} />
                </button>
              </div>
              <div className="faq-list">
                {questions.map(([question, answer]) => (
                  <details key={question}>
                    <summary>
                      {question}
                      <span aria-hidden="true">+</span>
                    </summary>
                    <p>{answer}</p>
                  </details>
                ))}
              </div>
            </section>
            <section className="closing-section">
              <div>
                <p className="eyebrow">
                  YOU’VE GOT THE BUSINESS. LET’S BUILD THE WEBSITE.
                </p>
                <h2>
                  Ready for your
                  <br />
                  <em>next chapter?</em>
                </h2>
                <p>
                  Your ideas. Our craft. A website you’ll be proud to share.
                </p>
                <button
                  className="primary-button"
                  type="button"
                  onClick={onContact}
                >
                  Let’s make something great <ArrowUpRight size={18} />
                </button>
              </div>
              <span className="closing-mark" aria-hidden="true">
                w.
              </span>
            </section>
          </>
        )}
      </main>
      <SiteFooter onContact={onContact} />
      <BackToTop />
      {selectedPlan && (
        <IntakeModal
          key={selectedPlan}
          selectedPlan={selectedPlan}
          onClose={() => setSelectedPlan('')}
        />
      )}
    </>
  )
}
