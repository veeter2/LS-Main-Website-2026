import type { Metadata } from "next"
import { Doors } from "../_components/doors"
import { ModelSwitch } from "./model-switch"

export const metadata: Metadata = { title: "Concept C — Owned Memory" }

export default function OwnedConcept() {
  return (
    <main>
      <section className="lx-hero">
        <div className="lx-wrap lx-hero-grid">
          <div>
            <p className="lx-eyebrow" data-rise="0">Model-agnostic memory</p>
            <h1 className="lx-display lx-h1 ox-h1" data-rise="1">
              The model is rented.
              <br />
              The memory is <em>yours</em>.
            </h1>
            <p className="lx-lead" data-rise="2">
              Models change every few months. What your company has learned shouldn&rsquo;t change with them. LongStrider
              keeps your memory in one place you control and lets the model you choose do the talking. Switch, and
              nothing has to be re-taught.
            </p>
            <div className="lx-cta-row" data-rise="3">
              <a className="lx-btn lx-btn-primary" href="/pilot">
                Book a working session <span className="lx-arrow" aria-hidden>→</span>
              </a>
              <a className="lx-btn lx-btn-ghost" href="#security">
                Read the architecture
              </a>
            </div>
            <div className="lx-assure" data-rise="4">
              <span>Your keys</span>
              <span>Your choice of model</span>
              <span>Scoped to each person</span>
            </div>
          </div>

          <div data-rise="2">
            <ModelSwitch />
            <p className="lx-illustrative">Illustrative example — try switching the model</p>
          </div>
        </div>
      </section>
      <Doors />
    </main>
  )
}
