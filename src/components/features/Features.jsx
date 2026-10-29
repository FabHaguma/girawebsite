import { useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import useMediaQuery from '../../hooks/useMediaQuery'
import './Features.css'

const services = [
  {
    id: 'gallery',
    name: 'Image galleries',
    note: 'Let your work do the talking.',
    description:
      'Give your projects, products, and best moments a home. Beautiful galleries make it easy for customers to see what you do.',
  },
  {
    id: 'shop',
    name: 'Online shopping',
    note: 'Turn a browse into a basket.',
    description:
      'Bring your products online with a storefront that makes browsing and choosing feel effortless.',
  },
  {
    id: 'booking',
    name: 'Slot scheduling',
    note: 'Make room for your next customer.',
    description:
      'Let customers choose an available time for a visit, appointment, or service, right from your website.',
  },
  {
    id: 'blog',
    name: 'Blogging',
    note: 'Your story, in your own words.',
    description:
      'Share useful advice, fresh ideas, and business updates with a blog that keeps your customers coming back.',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp ordering',
    note: 'From your website to a conversation.',
    description:
      'Let customers choose what they want and continue their order on WhatsApp, where the conversation already happens.',
  },
]

export function MiniCalendar({ compact = false }) {
  const [selected, setSelected] = useState('10:30')
  return (
    <div className={`mini-calendar${compact ? ' is-compact' : ''}`}>
      <div className="calendar-heading">
        <span>Choose your time</span>
        <span>30 min</span>
      </div>
      <div className="calendar-date">
        <span>Mon, 09 November</span>
        <span aria-hidden="true">
          <ChevronLeft size={13} />
          <ChevronRight size={13} />
        </span>
      </div>
      <div className="calendar-slots">
        {['09:00', '10:30', '14:00'].map((time) =>
          compact ? (
            <span key={time} className={time === selected ? 'selected' : ''}>
              {time}
            </span>
          ) : (
            <button
              key={time}
              type="button"
              aria-pressed={time === selected}
              onClick={() => setSelected(time)}
            >
              {time}
              {time === selected && <Check size={12} />}
            </button>
          ),
        )}
      </div>
    </div>
  )
}

function ServicePreview({ id }) {
  const [cart, setCart] = useState(0)
  const [ordered, setOrdered] = useState(false)
  if (id === 'gallery')
    return (
      <div className="gallery-demo">
        <div className="demo-wordmark">
          forma<span>®</span>
        </div>
        <div className="demo-heading">
          <h3>
            Spaces worth
            <br />
            <em>slowing down for.</em>
          </h3>
          <span>
            Selected spaces
            <br />
            01 — 03
          </span>
        </div>
        <div className="gallery-images">
          <img
            src="/images/interior-living.jpg"
            alt="Warm living room with a curved sofa and natural finishes"
            width="1400"
            height="934"
            loading="lazy"
          />
          <img
            src="/images/interior-detail.jpg"
            alt="Thoughtful interior details and natural materials"
            width="800"
            height="1000"
            loading="lazy"
          />
          <img
            src="/images/interior-shelf.jpg"
            alt="Books and objects arranged on an open shelf"
            width="700"
            height="933"
            loading="lazy"
          />
        </div>
        <div className="demo-footer">
          <span>Thoughtful spaces. Everyday living.</span>
          <ArrowUpRight size={18} />
        </div>
      </div>
    )
  if (id === 'shop')
    return (
      <div className="shop-demo">
        <div className="demo-wordmark">
          the everyday store
          <span className="demo-cart" aria-live="polite">
            Bag ({cart})
          </span>
        </div>
        <img
          src="/images/interior-shelf.jpg"
          alt="Curated objects and books for the home"
          width="700"
          height="933"
          loading="lazy"
        />
        <div className="shop-product">
          <div>
            <small>THE HOME EDIT</small>
            <h3>A little more considered.</h3>
            <p>Objects for the spaces you love.</p>
          </div>
          <button
            className="demo-dark-button"
            onClick={() => setCart(cart + 1)}
            type="button"
          >
            {cart ? 'Add another' : 'Add to bag'} <ArrowRight size={15} />
          </button>
        </div>
        <p className="demo-feedback" aria-live="polite">
          {cart
            ? `${cart} ${cart === 1 ? 'item' : 'items'} in your example bag.`
            : 'Try adding an item to the example bag.'}
        </p>
      </div>
    )
  if (id === 'booking')
    return (
      <div className="booking-demo">
        <span className="demo-kicker">A LITTLE TIME FOR YOU</span>
        <h3>
          Your next visit,
          <br />
          <em>one click closer.</em>
        </h3>
        <p>Studio consultation · 30 minutes</p>
        <MiniCalendar />
        <span className="demo-caption">
          An example of your customer’s booking experience.
        </span>
      </div>
    )
  if (id === 'blog')
    return (
      <div className="blog-demo">
        <div className="demo-wordmark">
          the journal <span>STORIES & IDEAS</span>
        </div>
        <img
          src="/images/interior-detail.jpg"
          alt="A welcoming room with natural textures"
          width="800"
          height="1000"
          loading="lazy"
        />
        <div>
          <span className="demo-kicker">DESIGN NOTES · 4 MIN READ</span>
          <h3>
            Finding a little calm
            <br />
            in the everyday.
          </h3>
          <p>
            A place for the ideas, stories, and expertise that make your
            business yours.
          </p>
        </div>
      </div>
    )
  return (
    <div className="whatsapp-demo">
      <div className="chat-top">
        <span className="chat-avatar">f.</span>
        <div>
          <strong>forma store</strong>
          <span>Usually replies during business hours</span>
        </div>
      </div>
      <div className="chat-body">
        <span className="chat-date">EXAMPLE CONVERSATION</span>
        <div className="chat-message outgoing">
          Hi! I’d like to order the home edit I found on your website.
          <small>
            10:42 <Check size={12} />
          </small>
        </div>
        <div className="chat-message">
          Hi there! Of course. Let’s help you find the right piece.
          <small>10:43</small>
        </div>
        {ordered && (
          <div className="chat-message outgoing">
            I’d love to know more about delivery.
            <small>
              10:44 <Check size={12} />
            </small>
          </div>
        )}
      </div>
      <button
        className="demo-dark-button"
        type="button"
        onClick={() => setOrdered(true)}
        disabled={ordered}
      >
        {ordered ? 'Example message added' : 'Try the conversation'}{' '}
        <ArrowRight size={15} />
      </button>
    </div>
  )
}

export default function Features() {
  const [active, setActive] = useState('gallery')
  const narrow = useMediaQuery('(max-width: 620px)')
  const service = services.find((item) => item.id === active)
  return (
    <section
      id="features"
      className="section services-section"
      aria-labelledby="services-heading"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">MORE THAN A GOOD-LOOKING WEBSITE</p>
          <h2 id="services-heading">
            Built to look good.
            <br />
            <span>Made to do more.</span>
          </h2>
        </div>
        <p>
          Your website should be part of your business.
          <br className="desktop-break" /> Choose the services that make it work
          for you.
        </p>
      </div>
      <div className="services-layout">
        <div
          className="services-list"
          role="tablist"
          aria-label="Explore website services"
          aria-orientation={narrow ? 'horizontal' : 'vertical'}
        >
          {services.map((item, index) => (
            <button
              key={item.id}
              id={`service-${item.id}`}
              role="tab"
              type="button"
              aria-selected={active === item.id}
              aria-controls="service-preview"
              tabIndex={active === item.id ? 0 : -1}
              onKeyDown={(event) => {
                const direction =
                  event.key === 'ArrowDown' || event.key === 'ArrowRight'
                    ? 1
                    : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
                      ? -1
                      : 0
                if (direction || event.key === 'Home' || event.key === 'End') {
                  event.preventDefault()
                  const next =
                    event.key === 'Home'
                      ? 0
                      : event.key === 'End'
                        ? services.length - 1
                        : (index + direction + services.length) %
                          services.length
                  setActive(services[next].id)
                  document
                    .getElementById(`service-${services[next].id}`)
                    ?.focus()
                }
              }}
              onClick={() => setActive(item.id)}
              className={`service-tab${active === item.id ? ' is-active' : ''}`}
            >
              <span className="service-number">0{index + 1}</span>
              <span className="service-tab-copy">
                <strong>{item.name}</strong>
                <span>{active === item.id ? item.description : item.note}</span>
              </span>
              <ArrowUpRight size={20} strokeWidth={1.5} />
            </button>
          ))}
        </div>
        <div className="mobile-service-intro">
          <h3>{service.name}</h3>
          <p>{service.description}</p>
        </div>
        <div
          className={`service-preview preview-${active}`}
          id="service-preview"
          role="tabpanel"
          aria-labelledby={`service-${active}`}
          tabIndex={0}
        >
          <ServicePreview key={active} id={active} />
          <div className="preview-caption">
            <span className="status-dot" />
            {service.name} · an illustrative preview
          </div>
        </div>
      </div>
      <p className="services-note">
        Start with what you need. Add more as your business grows.{' '}
        <a href="#pricing">
          Find your plan <ArrowRight size={14} />
        </a>
      </p>
    </section>
  )
}
