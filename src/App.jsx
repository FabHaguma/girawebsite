import { useEffect, useState } from 'react'
import {
  ArrowUp,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Phone,
  X,
} from 'lucide-react'
import Features from './components/features/Features'
import TemplatesSection from './components/templates/TemplatesSection'
import TemplatesPage from './pages/TemplatesPage'
import { structures, themes } from './data/templateData'
import WhatsAppMessenger from './services/whatsapp/whatsapp.config'
import './styles/App.css'

// Rendered directly rather than through data-phone-* hydration, which runs before React mounts.
const CONTACT_PHONE = { tel: '+250786072607', display: '+250 786 072 607' }
const CONTACT_PLAN = 'Consultation'

const tiers = [
  {
    name: 'Standard',
    price: '30,000',
    usd: '25',
    description:
      'Perfect for getting your trade online quickly and professionally.',
    features: [
      'Pick a template, theme & layout',
      'Up to 7 gallery pictures',
      'Standard contact form',
      'Basic blog functionality',
      'Mobile responsive design',
    ],
    button: 'Start Standard',
  },
  {
    name: 'Premium',
    price: '50,000',
    usd: '35',
    popular: true,
    description:
      'Ideal for growing businesses needing a tailored look and more content.',
    features: [
      'Template, theme & layout modifications',
      'Up to 20 gallery pictures',
      'Advanced contact form',
      'Blog functionality',
      '1 Custom Service Integration',
    ],
    button: 'Get Premium',
  },
  {
    name: 'Enterprise',
    description:
      'For established firms needing custom development and hands-on support.',
    features: [
      'Everything in Premium',
      'Unlimited gallery pictures',
      'Custom feature development',
      'Priority 24/7 support',
      'Dedicated account manager',
    ],
    button: 'Contact Us',
  },
]

const webList = [
  {
    name: 'Afazari Parts',
    trade: 'Cars Spare Parts and Fitting',
    url: 'https://www.afazari.webyacu.com/',
  },
  {
    name: 'Lustrelle',
    trade: 'Jewelry store',
    url: 'https://www.lustrelle.webyacu.com/',
  },
  {
    name: 'Fabrice HAGUMA',
    trade: 'Solution engineer portfolio',
    url: 'https://portfolio.haguma.com/',
  },
  {
    name: 'Ngwino Mechanic',
    trade: 'Car repair and maintenance',
    url: 'https://www.ngwinochris.webyacu.com/',
  },
]

/* ---------- Tiny hash router: #/templates/<structure>/<theme> ---------- */

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

  // Scroll sensibly after the page swaps (anchors don't exist until render).
  useEffect(() => {
    if (route.page === 'templates') {
      window.scrollTo(0, 0)
      return
    }
    const id = window.location.hash.slice(1)
    if (id && !id.startsWith('/')) {
      requestAnimationFrame(() =>
        document.getElementById(id)?.scrollIntoView({ behavior: 'auto' }),
      )
    }
  }, [route.page])

  return route
}

function SiteNav({ onContact }) {
  return (
    <nav className="site-nav">
      <a className="brand" href="#top">
        <img src="/webyacu-logo.png" alt="" />
        <span>
          Web<span>Yacu</span>
        </span>
      </a>
      <div className="nav-links">
        <a href="#features">Features</a>
        <a href="#templates">Templates</a>
        <a href="#websites">Websites</a>
        <a href="#pricing">Pricing</a>
      </div>
      <button className="nav-contact" type="button" onClick={onContact}>
        Contact HagumaTech
      </button>
    </nav>
  )
}

function SiteFooter() {
  return (
    <footer>
      <a className="brand" href="#top">
        <img src="/webyacu-logo.png" alt="" />
        <span>
          Web<span>Yacu</span>
        </span>
      </a>
      <p>
        &copy; {new Date().getFullYear()}{' '}
        <a
          href="https://www.tech.haguma.com/"
          target="_blank"
          rel="noreferrer"
        >
          HagumaTech
        </a>
        . Building the digital foundation for modern trades.
      </p>
      <div>
        <a href="#top">Terms</a>
        <a href="#top">Privacy</a>
      </div>
    </footer>
  )
}

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // Hidden over the footer, which already links back to the top.
      const footer = document.querySelector('footer')
      const footerInView =
        footer && footer.getBoundingClientRect().top < window.innerHeight
      setVisible(window.scrollY > 500 && !footerInView)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // Move focus to the navigation so keyboard and screen reader users land there.
    document.querySelector('.site-nav .brand')?.focus({ preventScroll: true })
  }

  return (
    <button
      type="button"
      className={`back-to-top${visible ? ' is-visible' : ''}`}
      onClick={goToTop}
      aria-label="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  )
}

function IntakeModal({ selectedPlan, onClose }) {
  const [submitted, setSubmitted] = useState(false)
  const [formChosen, setFormChosen] = useState(false)
  const showChoice = selectedPlan === CONTACT_PLAN && !formChosen

  if (!selectedPlan) return null

  function closeModal() {
    setSubmitted(false)
    setFormChosen(false)
    onClose()
  }

  return (
    <div className="modal-backdrop" onMouseDown={closeModal}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          className="close-button"
          type="button"
          aria-label="Close request form"
          onClick={closeModal}
        >
          <X size={20} />
        </button>
        <h2 id="modal-title">
          {submitted
            ? 'Request received'
            : showChoice
              ? 'Contact HagumaTech'
              : "Let's get started"}
        </h2>
        {submitted ? (
          <div className="confirmation">
            <span>
              <CheckCircle2 size={34} />
            </span>
            <p>
              Thank you. The HagumaTech team will contact you shortly to get
              started on your website: {selectedPlan}.
            </p>
            <button
              className="primary-button"
              type="button"
              onClick={closeModal}
            >
              Done
            </button>
          </div>
        ) : showChoice ? (
          <div className="contact-choice">
            <p className="contact-intro">
              Choose how you would like to reach us.
            </p>
            <a
              className="primary-button contact-option"
              href={`tel:${CONTACT_PHONE.tel}`}
            >
              <Phone size={18} /> Call us
            </a>
            <button
              className="secondary-button contact-option"
              type="button"
              onClick={() => setFormChosen(true)}
            >
              <ClipboardList size={18} /> Request Form
            </button>
          </div>
        ) : (
          <form
            className="intake-form"
            onSubmit={(event) => {
              event.preventDefault()
              const fields = Object.fromEntries(
                new FormData(event.currentTarget),
              )
              WhatsAppMessenger.send('intake', {
                ...fields,
                plan: selectedPlan,
              })
              setSubmitted(true)
            }}
          >
            <label>
              You selected
              <input value={selectedPlan} disabled />
            </label>
            <label>
              Full name
              <input name="name" required placeholder="Jane Doe" />
            </label>
            <label>
              Email address (optional)
              <input
                name="email"
                type="email"
                placeholder="jane@example.com"
              />
            </label>
            <label>
              Phone number (optional)
              <input
                name="phone"
                type="tel"
                placeholder="+250 788 000 000"
              />
            </label>
            <label>
              Your trade / business type
              <input
                name="trade"
                required
                placeholder="e.g. Electrician, Bakery, Consulting"
              />
            </label>
            <button className="primary-button" type="submit">
              Submit request
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState('')
  const route = useRoute()

  return (
    <main>
      <SiteNav onContact={() => setSelectedPlan(CONTACT_PLAN)} />

      {route.page === 'templates' ? (
        <TemplatesPage
          key={`${route.structure}-${route.theme}`}
          initialStructure={route.structure}
          initialTheme={route.theme}
          onStart={setSelectedPlan}
        />
      ) : (
        <>
          <section id="top" className="hero-section">
            <div className="hero-grid" />
            <div className="hero-copy">
              <p className="eyebrow">Websites built for local business</p>
              <h1>
                Own your digital space.
                <br />
                <strong>Grow your trade.</strong>
              </h1>
              <p>
                WebYacu by{' '}
                <a
                  href="https://www.tech.haguma.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  HagumaTech
                </a>{' '}
                creates clean, professional, easy-to-manage websites for
                tradespeople and growing businesses.
              </p>
              <button
                className="primary-button hero-button"
                type="button"
                onClick={() =>
                  document
                    .querySelector('#pricing')
                    .scrollIntoView({ behavior: 'smooth' })
                }
              >
                View pricing <ChevronRight size={18} />
              </button>
            </div>
          </section>

          <Features />

          <TemplatesSection onStart={setSelectedPlan} />

          <section id="websites" className="section template-section">
            <div className="section-intro">
              <p className="eyebrow">Work already delivered</p>
              <h2>Explore websites we have built</h2>
              <p>
                A selection of live HagumaTech projects. Select a preview to
                visit the website.
              </p>
            </div>
            <div className="template-grid">
              {webList.map((web) => (
                <article className="template" key={web.name}>
                  <a
                    href={web.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit ${web.name}`}
                  >
                    <div className="browser-preview">
                      <div className="browser-bar">
                        <i />
                        <i />
                        <i />
                      </div>
                      <img
                        src={`https://image.thum.io/get/width/400/crop/800/${web.url}`}
                        alt={`Preview of ${web.name}`}
                      />
                    </div>
                    <h3>{web.name}</h3>
                    <p>{web.trade}</p>
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section id="pricing" className="section pricing-section">
            <div className="section-intro">
              <p className="eyebrow">Straightforward investment</p>
              <h2>Simple, transparent pricing</h2>
              <p>Choose a plan for your business. All prices are per year.</p>
            </div>
            <div className="pricing-grid">
              {tiers.map((tier) => (
                <article
                  className={`pricing-card${tier.popular ? ' popular' : ''}`}
                  key={tier.name}
                >
                  {tier.popular && (
                    <span className="popular-label">Most popular</span>
                  )}
                  <div>
                    <h3>{tier.name}</h3>
                    <p className="description">{tier.description}</p>
                  </div>
                  <div className="price">
                    {tier.price ? (
                      <>
                        <strong>Rwf {tier.price}</strong>
                        <span>
                          / year
                          <br />
                          (USD {tier.usd})
                        </span>
                      </>
                    ) : (
                      <strong>Custom</strong>
                    )}
                  </div>
                  <ul>
                    {tier.features.map((feature) => (
                      <li key={feature}>
                        <CheckCircle2 size={19} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={
                      tier.popular ? 'primary-button' : 'secondary-button'
                    }
                    type="button"
                    onClick={() => setSelectedPlan(tier.name)}
                  >
                    {tier.button}
                  </button>
                </article>
              ))}
            </div>
          </section>
        </>
      )}

      <SiteFooter />

      <BackToTop />

      <IntakeModal
        selectedPlan={selectedPlan}
        onClose={() => setSelectedPlan('')}
      />
    </main>
  )
}
