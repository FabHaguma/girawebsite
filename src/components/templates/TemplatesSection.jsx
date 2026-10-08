import { useState } from 'react'
import TemplateStudio from './TemplateStudio'
import './TemplateStudio.css'

export default function TemplatesSection({ onStart }) {
  const [structureId, setStructureId] = useState('showcase')
  const [themeId, setThemeId] = useState('fixit-pro')

  return (
    <section id="templates" className="section studio-section">
      <div className="section-intro">
        <p className="eyebrow">Templates &amp; themes</p>
        <h2>Pick a structure. Then make it yours.</h2>
        <p>
          Start from a proven page layout, then dress it in a theme made for
          your trade. Preview it on desktop or phone to see exactly how your
          site is built.
        </p>
      </div>

      <TemplateStudio
        variant="home"
        structureId={structureId}
        themeId={themeId}
        onStructure={setStructureId}
        onTheme={setThemeId}
        onStart={onStart}
        browseHref={`#/templates/${structureId}/${themeId}`}
      />
    </section>
  )
}
