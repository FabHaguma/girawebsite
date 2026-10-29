import { ArrowUpRight } from 'lucide-react'
import { structures, themes } from '../../data/templateData'

export default function TemplatesSection() {
  return (
    <section id="templates" className="section templates-teaser">
      <div className="teaser-copy">
        <p className="eyebrow">A STARTING POINT, NOT A LIMIT</p>
        <h2>
          A look that feels
          <br />
          <em>like your business.</em>
        </h2>
        <p>
          Explore {structures.length} layouts and {themes.length} themes in our
          template studio. Try a combination, find your direction, and we’ll
          make it yours.
        </p>
        <a className="text-link" href="#/templates/showcase/fixit-pro">
          Explore templates & themes <ArrowUpRight size={19} />
        </a>
      </div>
      <div className="theme-samples" aria-hidden="true">
        <div className="sample sample-salon">
          <div>maison rosé</div>
          <p>
            A moment
            <br />
            <em>just for you.</em>
          </p>
          <div className="sample-arch" />
        </div>
        <div className="sample sample-garden">
          <div>greenyard</div>
          <p>
            A little closer
            <br />
            to nature.
          </p>
          <div className="sample-leaf" />
        </div>
        <div className="theme-sample-label">
          <span className="color-dots">
            <i />
            <i />
            <i />
            <i />
          </span>
          Your layout. Your colours. Your personality.
        </div>
      </div>
    </section>
  )
}
