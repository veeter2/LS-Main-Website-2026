import { Composition } from "remotion"
import { Hero } from "./Hero"
import { Film, FILM_FPS, FILM_SECONDS } from "./Film"
import { FPS, TOTAL_SECONDS } from "./beats"

const frames = Math.round(TOTAL_SECONDS * FPS)

/** The film at 1920x1080, and the same film at 1280x720 for phones (the world is drawn at 1080 and scaled). */
export const Root = () => (
  <>
    <Composition id="hero" component={Hero} durationInFrames={frames} fps={FPS} width={1920} height={1080} />
    <Composition id="film" component={Film} durationInFrames={Math.round(FILM_SECONDS * FILM_FPS)} fps={FILM_FPS} width={1920} height={1080} />
    <Composition id="film720" component={Film} defaultProps={{ phone: true }} durationInFrames={Math.round(FILM_SECONDS * FILM_FPS)} fps={FILM_FPS} width={1280} height={720} />
    <Composition id="hero720" component={Hero} durationInFrames={frames} fps={FPS} width={1280} height={720} />
  </>
)
