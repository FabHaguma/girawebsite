import {
  Car,
  Droplets,
  Gem,
  Hammer,
  PaintRoller,
  Scissors,
  Sprout,
  Wrench,
  Zap,
} from 'lucide-react'

const SANS = "'Outfit', system-ui, sans-serif"
const SERIF = "'Iowan Old Style', 'Palatino Linotype', Palatino, Georgia, serif"

/* ---------- Trades (used for filtering + "best for" tags) ---------- */

export const trades = [
  { key: 'plumbing', label: 'Plumbing', Icon: Droplets },
  { key: 'electrical', label: 'Electrical', Icon: Zap },
  { key: 'landscaping', label: 'Landscaping', Icon: Sprout },
  { key: 'beauty', label: 'Beauty & hair', Icon: Scissors },
  { key: 'auto', label: 'Auto repair', Icon: Car },
  { key: 'handyman', label: 'Handyman', Icon: Wrench },
  { key: 'building', label: 'Building & painting', Icon: Hammer },
  { key: 'shop', label: 'Shops & retail', Icon: Gem },
]

export const tradeByKey = Object.fromEntries(trades.map((t) => [t.key, t]))

/* ---------- Themes: colour, shape and personality ---------- */

export const themes = [
  {
    id: 'fixit-pro',
    name: 'FixIt Pro',
    trade: 'Plumbing & repairs',
    tradeKey: 'plumbing',
    style: 'Bold & reliable',
    flair: 'classic',
    Icon: Droplets,
    radius: 8,
    font: SANS,
    colors: { bg: '#ffffff', accent: '#1261c9', ink: '#18273b', soft: '#e6eff9' },
    sample: {
      biz: 'BlueFlow Plumbing',
      headline: 'Leaks fixed fast. Done right.',
      tagline: 'Trusted local plumbers, on call when you need them.',
      cta: 'Get a free quote',
      services: ['Leak repair', 'Bathroom fitting', 'Water heaters'],
    },
  },
  {
    id: 'luxe-salon',
    name: 'Luxe Salon',
    trade: 'Beauty & hair',
    tradeKey: 'beauty',
    style: 'Soft & elegant',
    flair: 'arch',
    Icon: Scissors,
    radius: 16,
    font: SERIF,
    colors: { bg: '#fff8f9', accent: '#c94f6d', ink: '#3b2a33', soft: '#f4dbe2' },
    sample: {
      biz: 'Maison Rosé',
      headline: 'Your best look, beautifully done.',
      tagline: 'Hair, makeup and care in a calm, welcoming space.',
      cta: 'Book a visit',
      services: ['Hair styling', 'Bridal makeup', 'Nails & care'],
    },
  },
  {
    id: 'greenyard',
    name: 'GreenYard',
    trade: 'Landscaping',
    tradeKey: 'landscaping',
    style: 'Fresh & natural',
    flair: 'blob',
    Icon: Sprout,
    radius: 18,
    font: SANS,
    colors: { bg: '#f6faf3', accent: '#207a5d', ink: '#1d3a2d', soft: '#d5eadf' },
    sample: {
      biz: 'GreenYard Gardens',
      headline: 'Outdoor spaces that grow with you.',
      tagline: 'Design, planting and care for homes and businesses.',
      cta: 'Plan my garden',
      services: ['Garden design', 'Lawn care', 'Trees & hedges'],
    },
  },
  {
    id: 'spark-electric',
    name: 'Spark Electric',
    trade: 'Electricians',
    tradeKey: 'electrical',
    style: 'Dark & energetic',
    flair: 'neon',
    Icon: Zap,
    radius: 10,
    font: SANS,
    colors: { bg: '#121b2b', accent: '#38d0f0', ink: '#f2f6fa', soft: '#22304a' },
    sample: {
      biz: 'Spark Electric',
      headline: 'Power you can rely on.',
      tagline: 'Wiring, solar and fault-finding by certified electricians.',
      cta: 'Call an electrician',
      services: ['Full rewiring', 'Solar & backup', 'Fault finding'],
    },
  },
  {
    id: 'ironside-auto',
    name: 'Ironside Auto',
    trade: 'Auto repair',
    tradeKey: 'auto',
    style: 'Rugged & bold',
    flair: 'stripe',
    Icon: Car,
    radius: 2,
    font: SANS,
    colors: { bg: '#f2f2f0', accent: '#f2b233', ink: '#262a31', soft: '#dedcd6' },
    sample: {
      biz: 'Ironside Auto',
      headline: 'Back on the road, no surprises.',
      tagline: 'Honest diagnostics, clear prices and fast turnaround.',
      cta: 'Book a service',
      services: ['Engine repair', 'Full servicing', 'Brakes & tyres'],
    },
  },
  {
    id: 'homestead',
    name: 'Homestead',
    trade: 'Handyman',
    tradeKey: 'handyman',
    style: 'Warm & homely',
    flair: 'split',
    Icon: Wrench,
    radius: 6,
    font: SERIF,
    colors: { bg: '#fbf6ee', accent: '#2f7f7a', ink: '#3a2f25', soft: '#eadcc7' },
    sample: {
      biz: 'Homestead Fixes',
      headline: 'Small jobs. Big difference.',
      tagline: 'Repairs, carpentry and odd jobs, handled with care.',
      cta: 'Request a visit',
      services: ['Home repairs', 'Carpentry', 'Painting'],
    },
  },
  {
    id: 'copperline',
    name: 'Copperline',
    trade: 'Roofing & metalwork',
    tradeKey: 'building',
    style: 'Crafted & sturdy',
    flair: 'classic',
    Icon: Hammer,
    radius: 4,
    font: SANS,
    colors: { bg: '#fdf7f2', accent: '#b4562c', ink: '#2c1d16', soft: '#f1dccd' },
    sample: {
      biz: 'Copperline Roofing',
      headline: 'Built tough. Finished clean.',
      tagline: 'Roofs, gates and metalwork made to last decades.',
      cta: 'Request a site visit',
      services: ['Roof repair', 'Steel gates', 'Guttering'],
    },
  },
  {
    id: 'sage-brush',
    name: 'Sage & Brush',
    trade: 'Painters & decorators',
    tradeKey: 'building',
    style: 'Calm & airy',
    flair: 'blob',
    Icon: PaintRoller,
    radius: 20,
    font: SERIF,
    colors: { bg: '#f7f7f2', accent: '#5d7a5a', ink: '#2b3329', soft: '#e1e8dc' },
    sample: {
      biz: 'Sage & Brush',
      headline: 'Colour that makes a house a home.',
      tagline: 'Interior and exterior painting with a flawless finish.',
      cta: 'Get a colour consult',
      services: ['Interior paint', 'Exterior paint', 'Wall finishes'],
    },
  },
  {
    id: 'noir-barber',
    name: 'Noir Barber',
    trade: 'Barbers & grooming',
    tradeKey: 'beauty',
    style: 'Dark & refined',
    flair: 'neon',
    Icon: Scissors,
    radius: 3,
    font: SERIF,
    colors: { bg: '#14120f', accent: '#d4a23c', ink: '#f4efe6', soft: '#2a251d' },
    sample: {
      biz: 'Noir Barber Co.',
      headline: 'Sharp cuts. Sharper service.',
      tagline: 'Classic barbering for the modern gentleman.',
      cta: 'Reserve a chair',
      services: ['Signature cut', 'Beard sculpt', 'Hot towel shave'],
    },
  },
  {
    id: 'atelier-nova',
    name: 'Atelier Nova',
    trade: 'Boutiques & shops',
    tradeKey: 'shop',
    style: 'Polished & premium',
    flair: 'split',
    Icon: Gem,
    radius: 2,
    font: SERIF,
    colors: { bg: '#fbf8f3', accent: '#8a6d3b', ink: '#26211a', soft: '#eee3d0' },
    sample: {
      biz: 'Atelier Nova',
      headline: 'Pieces made to be kept.',
      tagline: 'Handpicked collections and custom orders, delivered.',
      cta: 'Shop the collection',
      services: ['Rings & bands', 'Necklaces', 'Custom pieces'],
    },
  },
]

/* ---------- Structures: how the site is laid out ---------- */

const b = (type, label) => ({ type, label })

export const structures = [
  {
    id: 'showcase',
    name: 'Showcase',
    goal: 'Show my work',
    tagline: 'Let your finished jobs do the talking',
    blurb:
      'A photo-led home page that opens with your best projects, so customers trust you before the first call.',
    bestFor: ['landscaping', 'beauty', 'building'],
    pages: ['Home', 'Projects', 'About', 'Contact'],
    blocks: [
      b('nav', 'Navigation'),
      b('heroCenter', 'Hero statement'),
      b('gallery', 'Project gallery'),
      b('services', 'Services'),
      b('reviews', 'Customer reviews'),
      b('cta', 'Call to action'),
      b('footer', 'Footer'),
    ],
  },
  {
    id: 'quote',
    name: 'Quick Quote',
    goal: 'Get more quotes',
    tagline: 'Turn visitors into enquiries',
    blurb:
      'A quote form sits right in the hero, backed by trust signals and a simple three-step process.',
    bestFor: ['plumbing', 'electrical', 'handyman'],
    pages: ['Home', 'Services', 'Get a quote', 'Contact'],
    blocks: [
      b('nav', 'Navigation'),
      b('heroForm', 'Hero + quote form'),
      b('trust', 'Trust strip'),
      b('services', 'Services'),
      b('steps', 'How it works'),
      b('reviews', 'Customer reviews'),
      b('footer', 'Footer'),
    ],
  },
  {
    id: 'story',
    name: 'Storyteller',
    goal: 'Tell my story',
    tagline: 'Let people meet the person behind the trade',
    blurb:
      'A warm, full-bleed opening followed by your story, services and helpful tips that keep you visible.',
    bestFor: ['handyman', 'building', 'landscaping'],
    pages: ['Home', 'About', 'Services', 'Blog', 'Contact'],
    blocks: [
      b('nav', 'Navigation'),
      b('heroFull', 'Full-bleed hero'),
      b('about', 'Your story'),
      b('services', 'Services'),
      b('blog', 'Tips & news'),
      b('contact', 'Map & contact form'),
      b('footer', 'Footer'),
    ],
  },
  {
    id: 'menu',
    name: 'Service Menu',
    goal: 'Take bookings',
    tagline: 'Clear prices, easy booking',
    blurb:
      'Services and prices up front, with a booking bar, FAQs and a map. Made for appointment-based businesses.',
    bestFor: ['beauty', 'auto'],
    pages: ['Home', 'Services & prices', 'Book', 'Contact'],
    blocks: [
      b('nav', 'Navigation'),
      b('heroSlim', 'Compact hero'),
      b('menu', 'Price menu'),
      b('booking', 'Booking bar'),
      b('gallery', 'Photo gallery'),
      b('faq', 'FAQ'),
      b('contact', 'Map & contact form'),
      b('footer', 'Footer'),
    ],
  },
  {
    id: 'catalog',
    name: 'Catalog',
    goal: 'Sell products',
    tagline: 'A tidy shelf for what you sell',
    blurb:
      'Categories and a product grid lead the page, with trust signals and easy ways to reach you.',
    bestFor: ['shop', 'auto'],
    pages: ['Home', 'Shop', 'About', 'Contact'],
    blocks: [
      b('nav', 'Navigation'),
      b('heroSlim', 'Compact hero'),
      b('categories', 'Categories'),
      b('products', 'Product grid'),
      b('trust', 'Trust strip'),
      b('contact', 'Map & contact form'),
      b('footer', 'Footer'),
    ],
  },
]

/* ---------- Helpers ---------- */

export const getStructure = (id) =>
  structures.find((s) => s.id === id) || structures[0]

export const getTheme = (id) => themes.find((t) => t.id === id) || themes[0]

function luminance(hex) {
  const n = parseInt(hex.slice(1), 16)
  const [r, g, bl] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * bl
}

/** Readable text colour for content sitting on the accent colour. */
export const onColor = (hex) => (luminance(hex) > 0.2 ? '#14181f' : '#ffffff')

/** CSS custom properties that skin a wireframe. */
export function themeVars(theme) {
  const { bg, accent, ink, soft } = theme.colors
  return {
    '--t-bg': bg,
    '--t-accent': accent,
    '--t-ink': ink,
    '--t-soft': soft,
    '--t-on': onColor(accent),
    '--t-r': `${theme.radius}px`,
    '--t-font': theme.font,
  }
}
