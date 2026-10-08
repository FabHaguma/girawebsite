import {
  ArrowRight,
  Car,
  Droplets,
  Hammer,
  Mail,
  Newspaper,
  Phone,
  Plus,
  Scissors,
  Sprout,
  Wrench,
  Zap,
} from 'lucide-react'
import './Features.css'

const galleryTiles = [
  { label: 'Bathroom refit', Icon: Droplets, tone: 'blue' },
  { label: 'Full rewiring', Icon: Zap, tone: 'amber' },
  { label: 'Garden makeover', Icon: Sprout, tone: 'green' },
  { label: 'Bridal styling', Icon: Scissors, tone: 'rose' },
  { label: 'Roof repair', Icon: Hammer, tone: 'slate' },
]

const trades = [
  { label: 'Plumbing', Icon: Droplets },
  { label: 'Electrical', Icon: Zap },
  { label: 'Landscaping', Icon: Sprout },
  { label: 'Salon & beauty', Icon: Scissors },
  { label: 'Auto repair', Icon: Car },
  { label: 'Handyman', Icon: Wrench },
]

const growthSteps = [
  { name: 'Standard', note: 'Launch fast' },
  { name: 'Premium', note: 'Custom integrations' },
  { name: 'Enterprise', note: 'Bespoke build' },
]

export default function Features() {
  return (
    <section id="features" className="section feature-section">
      <div className="section-intro">
        <p className="eyebrow">Built for the trades</p>
        <h2>A website that works as hard as you do</h2>
        <p>
          Show off your finished jobs, earn trust before the first call, and
          turn visitors into paying customers, with no technical skills
          needed.
        </p>
      </div>

      <div className="bento">
        <article className="bento-card bento-gallery">
          <div className="bento-copy">
            <span className="bento-tag">Image galleries</span>
            <h3>Let your finished work do the talking</h3>
            <p>
              Customers hire people they trust. Put your best projects up
              front and keep them fresh by adding new photos whenever you
              finish a job.
            </p>
          </div>
          <div className="gallery-mock" aria-hidden="true">
            {galleryTiles.map(({ label, Icon, tone }) => (
              <div className={`gallery-tile tone-${tone}`} key={label}>
                <Icon size={26} />
                <span>{label}</span>
              </div>
            ))}
            <div className="gallery-tile gallery-add">
              <Plus size={22} />
              <span>Add photo</span>
            </div>
          </div>
        </article>

        <article className="bento-card bento-leads">
          <div className="bento-copy">
            <span className="bento-tag">Contact forms</span>
            <h3>Every inquiry lands in your inbox</h3>
            <p>
              No missed calls, no lost leads. Customers fill in a simple form
              and the message goes straight to you.
            </p>
          </div>
          <div className="leads-mock" aria-hidden="true">
            <div className="mock-form">
              <i />
              <i />
              <i className="tall" />
              <b>Send message</b>
            </div>
            <div className="mock-link">
              <ArrowRight size={16} />
            </div>
            <div className="mock-inbox">
              <span className="mock-inbox-icon">
                <Mail size={17} />
              </span>
              <div>
                <strong>New inquiry</strong>
                <small>Jane M. needs a plumber for a leaking tap</small>
              </div>
              <em>Just now</em>
            </div>
          </div>
        </article>

        <article className="bento-card bento-trades">
          <div className="bento-copy">
            <span className="bento-tag">Trade themes</span>
            <h3>Designed around your trade</h3>
            <p>
              Clean, modern layouts and themes made for the way local
              businesses actually work.
            </p>
          </div>
          <ul className="trade-chips" aria-label="Example trades">
            {trades.map(({ label, Icon }) => (
              <li key={label}>
                <Icon size={15} />
                {label}
              </li>
            ))}
          </ul>
        </article>

        <article className="bento-card bento-blog">
          <div className="bento-copy">
            <span className="bento-tag">Blog</span>
            <h3>Share tips, stay visible</h3>
            <p>
              Post advice, offers and news with built-in blogging, so
              customers see you are active and know your business.
            </p>
          </div>
          <div className="blog-mock" aria-hidden="true">
            <div className="blog-post">
              <Newspaper size={16} />
              <div>
                <b />
                <i />
              </div>
            </div>
            <div className="blog-post">
              <Newspaper size={16} />
              <div>
                <b />
                <i />
              </div>
            </div>
          </div>
        </article>

        <article className="bento-card bento-mobile">
          <div className="phone-mock" aria-hidden="true">
            <div className="phone-notch" />
            <div className="phone-hero">
              <Wrench size={20} />
            </div>
            <div className="phone-lines">
              <b />
              <i />
            </div>
            <div className="phone-actions">
              <span>
                <Phone size={11} /> Call
              </span>
              <span>
                <Mail size={11} /> Message
              </span>
            </div>
          </div>
          <div className="bento-copy">
            <span className="bento-tag">Mobile ready</span>
            <h3>Sharp on every screen</h3>
            <p>
              Your customers search on their phones. Every site is
              responsive, so you look professional everywhere.
            </p>
          </div>
        </article>

        <article className="bento-card bento-grow">
          <div className="bento-copy">
            <span className="bento-tag">Room to grow</span>
            <h3>Start simple. Scale when you are ready.</h3>
            <p>
              Launch quickly on a standard plan, add custom service
              integrations and more media as you grow, or request bespoke
              development for larger needs.
            </p>
            <a className="bento-link" href="#pricing">
              Compare plans <ArrowRight size={16} />
            </a>
          </div>
          <ol className="grow-steps" aria-label="Plan progression">
            {growthSteps.map((step, index) => (
              <li key={step.name} style={{ '--step': index }}>
                <strong>{step.name}</strong>
                <span>{step.note}</span>
              </li>
            ))}
          </ol>
        </article>
      </div>
    </section>
  )
}
