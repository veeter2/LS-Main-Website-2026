import { Composition } from "remotion"
import { Film, FILM_FPS, FILM_SECONDS } from "./Film"

const frames = Math.round(FILM_SECONDS * FILM_FPS)

/** The home film at 1920x1080, and the same film at 1280x720 with larger captions for phones. */
export const Root = () => (
  <>
    <Composition id="film" component={Film} durationInFrames={frames} fps={FILM_FPS} width={1920} height={1080} />
    <Composition id="film720" component={Film} defaultProps={{ phone: true }} durationInFrames={frames} fps={FILM_FPS} width={1280} height={720} />
  </>
)
