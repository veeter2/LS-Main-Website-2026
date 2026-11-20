import { SiteFilm } from "./site-film"

/** The home film as the hero. See SiteFilm for how it loads and plays. */
export function HeroVideo() {
  return (
    <SiteFilm
      name="hero"
      posterAlt="A landscape of sand and gold at night: the company's memory, kept with you."
      caption="Where the memory lives, in half a minute."
      label="Where the memory lives: kept with the model, it stays behind when the model changes; kept with you it grows, and the model can change without losing any of it."
    />
  )
}
