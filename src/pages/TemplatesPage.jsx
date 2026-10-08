import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, LayoutTemplate, Palette, Rocket } from 'lucide-react'
import SiteWireframe, { ScaledFrame } from '../components/wireframe/SiteWireframe'
import TemplateStudio from '../components/templates/TemplateStudio'
import useMediaQuery from '../hooks/useMediaQuery'
import { getStructure, structures, themes, trades } from '../data/templateData'
import '../components/templates/TemplateStudio.css'
import './TemplatesPage.css'

const steps = [
  {
    Icon: LayoutTemplate,
    title: 'Choose a structure',
    text: 'Pick the page layout that matches what you want your website to do for you.',
  },
  {
    Icon: Palette,
    title: 'Choose a theme',
    text: 'Select a look made for your trade. Colours, fonts and shapes are tailored to match your brand.',
  },
  {
    Icon: Rocket,
    title: 'We build and launch',
    text: 'HagumaTech adds your content, photos and domain, then hands you a site that is easy to manage.',
  },
]

export default function TemplatesPage({ initialStructure, initialTheme, onStart }) {
  const [structureId, setStructureId] = useState(initialStructure)
  const [themeId, setThemeId] = useState(initialTheme)
  const [trade, setTrade] = useState('all')
  // Phones get phone-format previews in the theme gallery: a scaled-down desktop page is unreadable there.
  const narrow = useMediaQuery('(max-width: 620px)')

  const structure = getStructure(structureId)

  // Keep the URL shareable without adding history entries.
  useEffect(() => {
    window.history.replaceState(null, '', `#/templates/${structureId}/${themeId}`)
  }, [structureId, themeId])

  const recommended =
    trade === 'all'
      ? []
      : structures.filter((s) => s.bestFor.includes(trade)).map((s) => s.id)

  const shownThemes = themes.filter((t) => trade === 'all' || t.tradeKey === trade)

  function pickTrade(key) {
    setTrade(key)
    if (key === 'all') return
    const matchTheme = themes.find((t) => t.tradeKey === key)
    const matchStructure = structures.find((s) => s.bestFor.includes(key))
    if (matchTheme) setThemeId(matchTheme.id)
    if (matchStructure) setStructureId(matchStructure.id)
  }

  function chooseTheme(id) {
    setThemeId(id)
    document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <header className="tp-hero">
        <div className="hero-grid" />
        <div className="tp-hero-inner">
          <a className="tp-back" href="#top">
            <ArrowLeft size={16} /> Back to home
          </a>
          <p className="eyebrow">Templates &amp; themes</p>
          <h1>
            Pick a structure. Pick a mood.
            <br />
            <strong>Make it yours.</strong>
          </h1>
          <p className="tp-lead">
            {structures.length} page structures and {themes.length} themes, mixed
            and matched to fit your trade. Preview every combination before you
            commit.
          </p>

          <div className="tp-trades" role="group" aria-label="Filter by trade">
            <button
              type="button"
              aria-pressed={trade === 'all'}
              onClick={() => pickTrade('all')}
            >
              All trades
            </button>
            {trades.map(({ key, label, Icon }) => (
              <button
                key={key}
                type="button"
                aria-pressed={trade === key}
                onClick={() => pickTrade(key)}
              >
                <Icon size={15} /> {label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section id="studio" className="section studio-section tp-studio">
        <TemplateStudio
          variant="page"
          structureId={structureId}
          themeId={themeId}
          onStructure={setStructureId}
          onTheme={setThemeId}
          onStart={onStart}
          recommended={recommended}
        />
      </section>

      <section className="section tp-themes">
        <div className="section-intro">
          <p className="eyebrow">Every theme, one structure</p>
          <h2>
            See the {structure.name} layout in{' '}
            {trade === 'all' ? 'every theme' : 'matching themes'}
          </h2>
          <p>Select a theme to load it into the preview above.</p>
        </div>

        <div className="tp-theme-grid">
          {shownThemes.map((t) => {
            const active = t.id === themeId
            return (
              <button
                key={t.id}
                type="button"
                className={`tp-theme${active ? ' is-active' : ''}`}
                aria-pressed={active}
                onClick={() => chooseTheme(t.id)}
              >
                <span className="tp-frame">
                  <span className="browser-bar">
                    <i />
                    <i />
                    <i />
                  </span>
                  <ScaledFrame baseWidth={narrow ? 390 : 1000} maxHeight={narrow ? 250 : 300}>
                    <SiteWireframe
                      structure={structure}
                      theme={t}
                      device={narrow ? 'mobile' : 'desktop'}
                    />
                  </ScaledFrame>
                  <span className="tp-frame-fade" />
                </span>
                <span className="tp-theme-meta">
                  <span className="tp-theme-style" style={{ background: t.colors.soft, color: t.colors.ink }}>
                    {t.style}
                  </span>
                  <strong>{t.name}</strong>
                  <small>{t.trade}</small>
                  <span className="tp-theme-pick">
                    {active ? (
                      <>
                        <Check size={15} /> Selected
                      </>
                    ) : (
                      <>
                        Preview this theme <ArrowRight size={15} />
                      </>
                    )}
                  </span>
                </span>
              </button>
            )
          })}
        </div>
      </section>

      <section className="section tp-how">
        <div className="section-intro">
          <p className="eyebrow">How it works</p>
          <h2>From idea to live website</h2>
        </div>
        <ol className="tp-steps">
          {steps.map(({ Icon, title, text }, i) => (
            <li key={title}>
              <span className="tp-step-icon">
                <Icon size={22} />
              </span>
              <small>Step {i + 1}</small>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="tp-cta">
        <h2>Not sure which direction fits?</h2>
        <p>
          Tell us about your trade and we will recommend a structure and theme,
          with no obligation.
        </p>
        <button
          type="button"
          className="primary-button hero-button"
          onClick={() => onStart('Consultation')}
        >
          Talk to HagumaTech <ArrowRight size={18} />
        </button>
      </section>
    </>
  )
}
