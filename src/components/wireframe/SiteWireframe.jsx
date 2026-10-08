import { useLayoutEffect, useRef, useState } from 'react'
import {
  Calendar,
  Check,
  ChevronDown,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
} from 'lucide-react'
import { themeVars } from '../../data/templateData'
import './SiteWireframe.css'

/* ---------- Scales a fixed-width page down to fit its container ---------- */

export function ScaledFrame({ baseWidth, maxHeight, className = '', children }) {
  const outer = useRef(null)
  const inner = useRef(null)
  const [dims, setDims] = useState({ scale: 1, height: 0 })

  useLayoutEffect(() => {
    const measure = () => {
      if (!outer.current || !inner.current) return
      const scale = outer.current.clientWidth / baseWidth
      const height = inner.current.offsetHeight * scale
      setDims((prev) =>
        Math.abs(prev.scale - scale) < 0.0005 && Math.abs(prev.height - height) < 0.5
          ? prev
          : { scale, height },
      )
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(outer.current)
    observer.observe(inner.current)
    return () => observer.disconnect()
  }, [baseWidth])

  const height = maxHeight ? Math.min(dims.height, maxHeight) : dims.height

  return (
    <div ref={outer} className={`scaled-frame ${className}`} style={{ height }}>
      <div
        ref={inner}
        className="scaled-inner"
        style={{ width: baseWidth, transform: `scale(${dims.scale})` }}
      >
        {children}
      </div>
    </div>
  )
}

/* ---------- Small building pieces ---------- */

function Bars({ widths = [82, 56] }) {
  return (
    <>
      {widths.map((w, i) => (
        <i key={i} className="wf-bar" style={{ width: `${w}%` }} />
      ))}
    </>
  )
}

function Stars() {
  return (
    <span className="wf-stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={14} fill="currentColor" />
      ))}
    </span>
  )
}

function Sec({ eyebrow, title }) {
  return (
    <div className="wf-sec">
      <span className="wf-eyebrow">{eyebrow}</span>
      <strong className="wf-h">{title}</strong>
    </div>
  )
}

const quotes = [
  ['Quick, tidy and fairly priced. Would hire again.', 'Jane M.'],
  ['Turned up on time and explained everything clearly.', 'Eric K.'],
  ['The finished result looks fantastic. Thank you!', 'Aline U.'],
]

/* ---------- Page sections ---------- */

const sections = {
  nav: ({ t, s }) => {
    const Icon = t.Icon
    return (
      <div className="wf-nav">
        <span className="wf-logo">
          <Icon size={18} />
        </span>
        <b className="wf-biz">{t.sample.biz}</b>
        <span className="wf-navlinks">
          {s.pages.map((p) => (
            <i key={p}>{p}</i>
          ))}
        </span>
        <span className="wf-btn wf-btn-sm wf-nav-cta">{t.sample.cta}</span>
        <span className="wf-burger">
          <i />
          <i />
          <i />
        </span>
      </div>
    )
  },

  heroCenter: ({ t }) => (
    <div className="wf-hero-center">
      <span className="wf-pill">{t.trade}</span>
      <strong className="wf-h">{t.sample.headline}</strong>
      <p>{t.sample.tagline}</p>
      <div className="wf-row">
        <span className="wf-btn">{t.sample.cta}</span>
        <span className="wf-btn wf-btn-ghost">See our work</span>
      </div>
    </div>
  ),

  heroForm: ({ t }) => (
    <div className="wf-hero-form">
      <div className="wf-hf-text">
        <span className="wf-pill">{t.trade}</span>
        <strong className="wf-h">{t.sample.headline}</strong>
        <p>{t.sample.tagline}</p>
        <div className="wf-checks">
          <span>
            <Check size={14} /> Free quotes
          </span>
          <span>
            <Check size={14} /> Same-day reply
          </span>
        </div>
      </div>
      <div className="wf-formcard">
        <strong className="wf-fc-title">Get your free quote</strong>
        <span className="wf-input">Your name</span>
        <span className="wf-input">Phone number</span>
        <span className="wf-input wf-input-tall">What do you need done?</span>
        <span className="wf-btn wf-btn-block">{t.sample.cta}</span>
      </div>
    </div>
  ),

  heroFull: ({ t }) => {
    const Icon = t.Icon
    return (
      <div className="wf-hero-full">
        <Icon className="wf-bgicon" size={300} strokeWidth={1} />
        <div className="wf-hf-copy">
          <span className="wf-pill">{t.trade}</span>
          <strong className="wf-h">{t.sample.headline}</strong>
          <p>{t.sample.tagline}</p>
          <span className="wf-btn">{t.sample.cta}</span>
        </div>
      </div>
    )
  },

  heroSlim: ({ t }) => (
    <div className="wf-hero-slim">
      <div>
        <strong className="wf-h">{t.sample.headline}</strong>
        <p>{t.sample.tagline}</p>
      </div>
      <span className="wf-chip">
        <Phone size={15} /> +250 788 000 000
      </span>
    </div>
  ),

  trust: () => (
    <div className="wf-trust">
      {[
        [ShieldCheck, 'Licensed & insured', 'Work you can rely on'],
        [Clock, 'Fast response', 'Replies within hours'],
        [Star, '4.9 customer rating', 'From 200+ reviews'],
      ].map(([Icon, title, sub]) => (
        <div key={title} className="wf-trust-item">
          <span className="wf-ico">
            <Icon size={18} />
          </span>
          <div>
            <b>{title}</b>
            <small>{sub}</small>
          </div>
        </div>
      ))}
    </div>
  ),

  services: ({ t }) => {
    const Icon = t.Icon
    return (
      <div className="wf-pad">
        <Sec eyebrow="Services" title="What we do best" />
        <div className="wf-grid3">
          {t.sample.services.map((name) => (
            <div key={name} className="wf-card">
              <span className="wf-ico wf-ico-lg">
                <Icon size={22} />
              </span>
              <strong className="wf-card-title">{name}</strong>
              <Bars widths={[88, 64, 40]} />
            </div>
          ))}
        </div>
      </div>
    )
  },

  gallery: ({ t }) => {
    const Icon = t.Icon
    const labels = [...t.sample.services, 'Before & after', 'Recent job', 'Client favourite']
    return (
      <div className="wf-pad">
        <Sec eyebrow="Our work" title="Recent projects" />
        <div className="wf-gallery">
          {labels.map((label, i) => (
            <div key={label} className="wf-tile" style={{ '--m': `${14 + i * 7}%` }}>
              <Icon size={i === 0 ? 40 : 26} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    )
  },

  menu: ({ t }) => (
    <div className="wf-pad">
      <Sec eyebrow="Prices" title="Services & prices" />
      <div className="wf-menu">
        {[...t.sample.services, 'Consultation'].map((name, i) => (
          <div key={name} className="wf-menu-row">
            <b>{name}</b>
            <span className="wf-leader" />
            <em>Rwf {[5, 12, 20, 3][i]},000</em>
          </div>
        ))}
      </div>
    </div>
  ),

  booking: () => (
    <div className="wf-booking">
      <span className="wf-bk-title">
        <Calendar size={18} /> Book your visit
      </span>
      <span className="wf-days">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => (
          <i key={d} className={i === 2 ? 'on' : ''}>
            {d}
          </i>
        ))}
      </span>
      <span className="wf-btn wf-btn-sm">Confirm</span>
    </div>
  ),

  steps: () => (
    <div className="wf-pad wf-tinted">
      <Sec eyebrow="Process" title="How it works" />
      <div className="wf-grid3">
        {['Tell us what you need', 'Receive a clear quote', 'We get the job done'].map(
          (name, i) => (
            <div key={name} className="wf-step">
              <span className="wf-num">{i + 1}</span>
              <strong className="wf-card-title">{name}</strong>
              <Bars widths={[84, 52]} />
            </div>
          ),
        )}
      </div>
    </div>
  ),

  reviews: () => (
    <div className="wf-pad">
      <Sec eyebrow="Reviews" title="Loved by local customers" />
      <div className="wf-grid3">
        {quotes.map(([text, name]) => (
          <div key={name} className="wf-card">
            <Stars />
            <p className="wf-quote">{text}</p>
            <div className="wf-person">
              <span className="wf-avatar" />
              <b>{name}</b>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),

  about: ({ t }) => {
    const Icon = t.Icon
    return (
      <div className="wf-about">
        <div className="wf-about-media">
          <Icon size={84} strokeWidth={1.25} />
        </div>
        <div className="wf-about-copy">
          <span className="wf-eyebrow">Our story</span>
          <strong className="wf-h">Hands-on since day one</strong>
          <Bars widths={[96, 90, 70]} />
          <div className="wf-stats">
            {[
              ['12 yrs', 'in business'],
              ['300+', 'jobs done'],
              ['4.9', 'avg. rating'],
            ].map(([n, l]) => (
              <div key={l}>
                <b>{n}</b>
                <small>{l}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },

  blog: ({ t }) => {
    const Icon = t.Icon
    return (
      <div className="wf-pad wf-tinted">
        <Sec eyebrow="Blog" title="Tips & news" />
        <div className="wf-grid3">
          {['Seasonal checklist for your home', '3 signs it is time to call a pro', 'What a fair quote includes'].map(
            (title) => (
              <div key={title} className="wf-post">
                <div className="wf-post-thumb">
                  <Icon size={30} />
                </div>
                <strong className="wf-card-title">{title}</strong>
                <Bars widths={[90, 60]} />
              </div>
            ),
          )}
        </div>
      </div>
    )
  },

  faq: () => (
    <div className="wf-pad wf-tinted">
      <Sec eyebrow="FAQ" title="Good to know" />
      <div className="wf-faq">
        {['How long does a job usually take?', 'Do you offer a warranty?', 'Which areas do you cover?'].map(
          (q, i) => (
            <div key={q} className="wf-faq-row">
              <div className="wf-faq-q">
                <b>{q}</b>
                <ChevronDown size={18} />
              </div>
              {i === 0 && <Bars widths={[92, 60]} />}
            </div>
          ),
        )}
      </div>
    </div>
  ),

  categories: ({ t }) => {
    const Icon = t.Icon
    return (
      <div className="wf-pad">
        <Sec eyebrow="Browse" title="Shop by category" />
        <div className="wf-grid4">
          {['Popular', 'New in', 'Best sellers', 'Special offers'].map((name, i) => (
            <div key={name} className="wf-tile wf-tile-sq" style={{ '--m': `${16 + i * 8}%` }}>
              <Icon size={28} />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
    )
  },

  products: ({ t }) => {
    const Icon = t.Icon
    return (
      <div className="wf-pad wf-tinted">
        <Sec eyebrow="Featured" title="Customer favourites" />
        <div className="wf-grid4">
          {[18, 24, 12, 30].map((price) => (
            <div key={price} className="wf-card wf-product">
              <div className="wf-product-img">
                <Icon size={34} />
              </div>
              <Bars widths={[80, 50]} />
              <div className="wf-product-foot">
                <b>Rwf {price},000</b>
                <span className="wf-btn wf-btn-sm">Add</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },

  cta: ({ t }) => (
    <div className="wf-cta">
      <strong className="wf-h">Ready to get started?</strong>
      <p>Tell us about your project and we will get back to you today.</p>
      <span className="wf-btn">{t.sample.cta}</span>
    </div>
  ),

  contact: () => (
    <div className="wf-contact">
      <div className="wf-map">
        <MapPin size={34} />
      </div>
      <div className="wf-contact-form">
        <strong className="wf-h">Visit or message us</strong>
        <span className="wf-input">Your name</span>
        <span className="wf-input">Email address</span>
        <span className="wf-input wf-input-tall">How can we help?</span>
        <span className="wf-btn wf-btn-block">Send message</span>
      </div>
    </div>
  ),

  footer: ({ t }) => {
    const Icon = t.Icon
    return (
      <div className="wf-footer">
        <div className="wf-ft-brand">
          <span className="wf-logo">
            <Icon size={16} />
          </span>
          <b>{t.sample.biz}</b>
        </div>
        <div className="wf-ft-cols">
          {[0, 1, 2].map((i) => (
            <div key={i}>
              <Bars widths={[70, 48, 60]} />
            </div>
          ))}
        </div>
        <small>&copy; {t.sample.biz}. Built with WebYacu.</small>
      </div>
    )
  },
}

/* ---------- The wireframe itself ---------- */

export default function SiteWireframe({
  structure,
  theme,
  device = 'desktop',
  activeIndex = null,
}) {
  return (
    <div
      className={`wf wf-${device}${activeIndex !== null ? ' has-active' : ''}`}
      data-flair={theme.flair}
      style={themeVars(theme)}
      aria-hidden="true"
    >
      {structure.blocks.map((block, i) => {
        const Section = sections[block.type]
        return (
          <div
            key={`${block.type}-${i}`}
            className={`wf-block${activeIndex === i ? ' is-active' : ''}`}
            data-label={block.label}
          >
            <Section t={theme} s={structure} />
          </div>
        )
      })}
    </div>
  )
}
