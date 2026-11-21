import { SiteFilm } from "./site-film"

/** The cost film: what an answer costs, and why the bill stays flat here. */
export function CostFilm() {
  return (
    <SiteFilm
      name="cost"
      posterAlt="A dark sky and one falling spark: a question, about to be answered."
      caption="What an answer costs, in half a minute."
      label="What an answer costs: most AI sends the model everything on every question, so each answer burns more as you know more. LongStrider keeps the memory on your side and each question takes only what it needs, so answers come fast, the bill stays flat, and a smaller model can do the job."
    />
  )
}
