import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Monitor,
  Smartphone,
} from 'lucide-react'
import SiteWireframe, { ScaledFrame } from '../wireframe/SiteWireframe'
import useMediaQuery from '../../hooks/useMediaQuery'
import {
  getStructure,
  getTheme,
  structures,
  themes,
  tradeByKey,
} from '../../data/templateData'
import './TemplateStudio.css'

const slug = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '')

function Swatches({ colors }) {
  return (
    <span className="swatches" aria-hidden="true">
      {[colors.accent, colors.soft, colors.ink].map((c) => (
        <i key={c} style={{ background: c }} />
      ))}
    </span>
  )
}

/**
 * Controlled studio: pick a structure, pick a theme, preview on desktop or
 * phone, hover the page flow to see where each section lives.
 */
export default function TemplateStudio({
  variant = 'home',
  structureId,
  themeId,
  onStructure,
  onTheme,
  onStart,
  browseHref,
  recommended = [],
}) {
  const isPage = variant === 'page'
  const structure = getStructure(structureId)
  const theme = getTheme(themeId)

  const narrow = useMediaQuery('(max-width: 620px)')
  const short = useMediaQuery('(max-height: 500px)')
  const canHover = useMediaQuery('(hover: hover)')

  // A phone-sized screen can't show a desktop page legibly, so start on the phone preview.
  const [device, setDevice] = useState(() =>
    window.matchMedia('(max-width: 620px)').matches ? 'phone' : 'desktop',
  )
  const [expanded, setExpanded] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [showAllThemes, setShowAllThemes] = useState(isPage)
  const [locate, setLocate] = useState(null)
  const stageRef = useRef(null)
  const chipsRef = useRef(null)

  // Hovering a flow item opens the preview so the highlighted section is always visible.
  const open = expanded || hovered !== null
  const collapsedHeight = short ? 340 : narrow ? (isPage ? 560 : 440) : isPage ? 720 : 640
  const baseWidth = device === 'phone' ? 390 : 1000

  // Without hover, tapping a flow item scrolls the preview to the section it highlights.
  useEffect(() => {
    if (!locate) return
    stageRef.current
      ?.querySelector('.wf-block.is-active')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [locate])

  function locateBlock(i) {
    setExpanded(true)
    setHovered(i)
    if (!canHover) setLocate({ i })
  }

  // Keep the selected theme in view when the chips scroll sideways. Only the row
  // itself scrolls, so the page never jumps.
  useEffect(() => {
    const row = chipsRef.current
    const chip = row?.querySelector('.theme-chip.is-active')
    if (!row || !chip || row.scrollWidth <= row.clientWidth) return
    const offset = chip.getBoundingClientRect().left - row.getBoundingClientRect().left
    row.scrollTo({
      left: row.scrollLeft + offset - (row.clientWidth - chip.offsetWidth) / 2,
      behavior: 'smooth',
    })
  }, [theme.id, narrow])

  // On phones themes sit in a swipeable row, so every theme is always available.
  const listAllThemes = showAllThemes || narrow
  const firstThemes = themes.slice(0, 6)
  const visibleThemes = listAllThemes
    ? themes
    : firstThemes.some((t) => t.id === theme.id)
      ? firstThemes
      : [...firstThemes, theme]
  const hiddenCount = themes.length - visibleThemes.length

  return (
    <div className={`studio studio-${variant}`}>
      {/* Step 1 — structures */}
      <div className="studio-step">
        <p className="step-label">
          <span>1</span> Pick a site structure
        </p>
        <div className="strip" role="radiogroup" aria-label="Site structure">
          {structures.map((s) => {
            const active = s.id === structure.id
            return (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={active}
                className={`strip-card${active ? ' is-active' : ''}`}
                onClick={() => onStructure(s.id)}
              >
                <span className="strip-goal">{s.goal}</span>
                <span className="strip-thumb">
                  <ScaledFrame baseWidth={1000} maxHeight={250}>
                    <SiteWireframe structure={s} theme={theme} />
                  </ScaledFrame>
                </span>
                <strong>{s.name}</strong>
                <small>{s.tagline}</small>
                {recommended.includes(s.id) && (
                  <em className="strip-rec">Recommended</em>
                )}
                {active && (
                  <span className="strip-check">
                    <Check size={14} strokeWidth={3} />
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Step 2 — preview + details */}
      <div className="studio-step">
        <p className="step-label">
          <span>2</span> Preview it, then choose a theme
        </p>
        <div className="studio-main">
          <div className="stage" ref={stageRef}>
            <div className="stage-bar">
              <span className="stage-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className="stage-url">{slug(theme.sample.biz)}.webyacu.com</span>
              <div className="device-toggle" role="group" aria-label="Preview device">
                <button
                  type="button"
                  aria-label="Desktop"
                  aria-pressed={device === 'desktop'}
                  onClick={() => setDevice('desktop')}
                >
                  <Monitor size={15} /> <span>Desktop</span>
                </button>
                <button
                  type="button"
                  aria-label="Phone"
                  aria-pressed={device === 'phone'}
                  onClick={() => setDevice('phone')}
                >
                  <Smartphone size={15} /> <span>Phone</span>
                </button>
              </div>
            </div>

            <div className={`stage-body is-${device}`}>
              {device === 'phone' ? (
                <div className="phone-shell" style={{ background: theme.colors.bg }}>
                  <span className="phone-island" />
                  <ScaledFrame
                    key="phone"
                    baseWidth={baseWidth}
                    maxHeight={open ? undefined : collapsedHeight}
                  >
                    <SiteWireframe
                      structure={structure}
                      theme={theme}
                      device="mobile"
                      activeIndex={hovered}
                    />
                  </ScaledFrame>
                </div>
              ) : (
                <ScaledFrame
                  key="desktop"
                  baseWidth={baseWidth}
                  maxHeight={open ? undefined : collapsedHeight}
                >
                  <SiteWireframe
                    structure={structure}
                    theme={theme}
                    activeIndex={hovered}
                  />
                </ScaledFrame>
              )}
              {!open && <div className="stage-fade" />}
            </div>

            <button
              type="button"
              className="stage-expand"
              aria-expanded={expanded}
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? (
                <>
                  Collapse preview <ChevronUp size={16} />
                </>
              ) : (
                <>
                  Expand full page <ChevronDown size={16} />
                </>
              )}
            </button>
          </div>

          <aside className="panel">
            <div className="panel-block panel-info">
              <span className="panel-eyebrow">Structure &middot; {structure.goal}</span>
              <h3>{structure.name}</h3>
              <p>{structure.blurb}</p>
              <div className="tags">
                {structure.bestFor.map((k) => (
                  <span key={k} className="tag tag-soft">
                    {tradeByKey[k].label}
                  </span>
                ))}
              </div>
            </div>

            <div className="panel-block panel-detail panel-pages">
              <span className="panel-eyebrow">Pages included</span>
              <div className="tags">
                {structure.pages.map((p) => (
                  <span key={p} className="tag">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="panel-block panel-detail panel-flow">
              <span className="panel-eyebrow">
                Home page flow{' '}
                <small className="hint-hover">hover to locate</small>
                <small className="hint-tap">tap to locate</small>
              </span>
              <ol className="flow" onMouseLeave={() => setHovered(null)}>
                {structure.blocks.map((block, i) => (
                  <li key={`${block.type}-${i}`}>
                    <button
                      type="button"
                      className={hovered === i ? 'is-hot' : ''}
                      onMouseEnter={() => setHovered(i)}
                      onFocus={() => setHovered(i)}
                      onBlur={() => setHovered(null)}
                      onClick={() => locateBlock(i)}
                    >
                      <span>{i + 1}</span>
                      {block.label}
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            <div className="panel-block panel-themes">
              <span className="panel-eyebrow">Theme &middot; {theme.style}</span>
              <div className="theme-chips" ref={chipsRef}>
                {visibleThemes.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`theme-chip${t.id === theme.id ? ' is-active' : ''}`}
                    aria-pressed={t.id === theme.id}
                    onClick={() => onTheme(t.id)}
                  >
                    <Swatches colors={t.colors} />
                    <span>
                      <strong>{t.name}</strong>
                      <small>{t.trade}</small>
                    </span>
                  </button>
                ))}
              </div>
              {!isPage && !narrow && (
                <button
                  type="button"
                  className="text-link"
                  onClick={() => setShowAllThemes((v) => !v)}
                >
                  {listAllThemes
                    ? 'Show fewer themes'
                    : `Show ${hiddenCount} more themes`}
                  {listAllThemes ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </button>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Step 3 — action */}
      <div className="studio-action">
        <div className="action-summary">
          <Swatches colors={theme.colors} />
          <div>
            <small>Your direction</small>
            <strong>
              {structure.name} <span>&times;</span> {theme.name}
            </strong>
          </div>
        </div>
        <div className="action-buttons">
          {browseHref && (
            <a className="action-link" href={browseHref}>
              Browse all templates &amp; themes <ArrowRight size={16} />
            </a>
          )}
          <button
            type="button"
            className="primary-button"
            onClick={() => onStart(`${structure.name} structure · ${theme.name} theme`)}
          >
            Start with this direction <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
