import { useState } from 'react'
import { Camera, CheckCircle2, ChevronRight, Globe2, MessageSquare, Paintbrush, X } from 'lucide-react'
import './App.css'

const tiers = [
  { name: 'Standard', price: '30,000', usd: '25', description: 'Perfect for getting your trade online quickly and professionally.', features: ['Pick a template, theme & layout', 'Up to 7 gallery pictures', 'Standard contact form', 'Basic blog functionality', 'Mobile responsive design'], button: 'Start Standard' },
  { name: 'Premium', price: '50,000', usd: '35', popular: true, description: 'Ideal for growing businesses needing a tailored look and more content.', features: ['Template, theme & layout modifications', 'Up to 20 gallery pictures', 'Advanced contact form', 'Blog functionality', '1 Custom Service Integration'], button: 'Get Premium' },
  { name: 'Enterprise', description: 'For established firms needing custom development and hands-on support.', features: ['Everything in Premium', 'Unlimited gallery pictures', 'Custom feature development', 'Priority 24/7 support', 'Dedicated account manager'], button: 'Contact Us' },
]

const templates = [
  { name: 'FixIt Pro', trade: 'Plumbing & Repairs', color: 'blue' },
  { name: 'Luxe Salon', trade: 'Beauty & Hair', color: 'rose' },
  { name: 'GreenYard', trade: 'Landscaping', color: 'green' },
  { name: 'Spark Electric', trade: 'Electricians', color: 'amber' },
]

function IntakeModal({ selectedPlan, onClose }) {
  const [submitted, setSubmitted] = useState(false)
  if (!selectedPlan) return null

  function closeModal() {
    setSubmitted(false)
    onClose()
  }

  return (
    <div className="modal-backdrop" onMouseDown={closeModal}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="close-button" type="button" aria-label="Close request form" onClick={closeModal}><X size={20} /></button>
        <h2 id="modal-title">{submitted ? 'Request received' : "Let's get started"}</h2>
        {submitted ? (
          <div className="confirmation"><span><CheckCircle2 size={34} /></span><p>Thank you. The HagumaTech team will contact you shortly to begin building your {selectedPlan} website.</p><button className="primary-button" type="button" onClick={closeModal}>Done</button></div>
        ) : (
          <form className="intake-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
            <label>Selected plan<input value={selectedPlan} disabled /></label>
            <label>Full name<input required placeholder="Jane Doe" /></label>
            <label>Email address<input required type="email" placeholder="jane@example.com" /></label>
            <label>Phone number<input required type="tel" placeholder="+250 788 000 000" /></label>
            <label>Your trade / business type<input required placeholder="e.g. Electrician, Bakery, Consulting" /></label>
            <button className="primary-button" type="submit">Submit request</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState('')

  return (
    <main>
      <nav className="site-nav">
        <a className="brand" href="#top"><Globe2 size={27} /><span>Web<span>Yacu</span></span></a>
        <div className="nav-links"><a href="#features">Features</a><a href="#templates">Templates</a><a href="#pricing">Pricing</a></div>
        <button className="nav-contact" type="button" onClick={() => setSelectedPlan('Consultation')}>Contact HagumaTech</button>
      </nav>
      <section id="top" className="hero-section"><div className="hero-grid" /><div className="hero-copy"><p className="eyebrow">Websites built for local business</p><h1>Own your digital space.<br /><strong>Grow your trade.</strong></h1><p>WebYacu by <a href="https://www.tech.haguma.com/" target="_blank" rel="noreferrer">HagumaTech</a> creates clean, professional, easy-to-manage websites for tradespeople and growing businesses.</p><button className="primary-button hero-button" type="button" onClick={() => document.querySelector('#pricing').scrollIntoView({ behavior: 'smooth' })}>View pricing <ChevronRight size={18} /></button></div></section>
      <section id="features" className="section feature-section"><div className="section-intro"><p className="eyebrow">Made for momentum</p><h2>Everything you need to succeed online</h2><p>Built-in tools to help your customers find and contact you easily.</p></div><div className="feature-grid"><article><span className="feature-icon blue"><Paintbrush size={29} /></span><h3>Beautiful templates</h3><p>Choose from modern layouts and themes suited to your specific trade.</p></article><article><span className="feature-icon green"><Camera size={29} /></span><h3>Updateable galleries</h3><p>Showcase past projects with easy-to-update image galleries that build trust.</p></article><article><span className="feature-icon coral"><MessageSquare size={29} /></span><h3>Direct contact forms</h3><p>Capture leads instantly with forms that send inquiries directly to your inbox.</p></article></div></section>
      <section id="templates" className="section template-section"><div className="section-intro"><p className="eyebrow">A confident first impression</p><h2>Professional themes for every trade</h2><p>Start with a polished template and tailor it to fit your brand.</p></div><div className="template-grid">{templates.map((template) => <article className="template" key={template.name}><div className="browser-preview"><div className="browser-bar"><i /><i /><i /></div><div className={`template-banner ${template.color}`} /><div className="preview-lines"><b /><b /><span><i /><i /></span></div></div><h3>{template.name}</h3><p>{template.trade}</p></article>)}</div></section>
      <section id="pricing" className="section pricing-section"><div className="section-intro"><p className="eyebrow">Straightforward investment</p><h2>Simple, transparent pricing</h2><p>Choose a plan for your business. All prices are per year.</p></div><div className="pricing-grid">{tiers.map((tier) => <article className={`pricing-card${tier.popular ? ' popular' : ''}`} key={tier.name}>{tier.popular && <span className="popular-label">Most popular</span>}<div><h3>{tier.name}</h3><p className="description">{tier.description}</p></div><div className="price">{tier.price ? <><strong>Rwf {tier.price}</strong><span>/ year<br />(USD {tier.usd})</span></> : <strong>Custom</strong>}</div><ul>{tier.features.map((feature) => <li key={feature}><CheckCircle2 size={19} />{feature}</li>)}</ul><button className={tier.popular ? 'primary-button' : 'secondary-button'} type="button" onClick={() => setSelectedPlan(tier.name)}>{tier.button}</button></article>)}</div></section>
      <footer><a className="brand" href="#top"><Globe2 size={24} /><span>Web<span>Yacu</span></span></a><p>&copy; {new Date().getFullYear()} <a href="https://www.tech.haguma.com/" target="_blank" rel="noreferrer">HagumaTech</a>. Building the digital foundation for modern trades.</p><div><a href="#top">Terms</a><a href="#top">Privacy</a></div></footer>
      <IntakeModal selectedPlan={selectedPlan} onClose={() => setSelectedPlan('')} />
    </main>
  )
}
