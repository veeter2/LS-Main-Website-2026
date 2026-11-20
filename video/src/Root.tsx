import { Composition } from "remotion"
import { Connect, CONNECT_SECONDS } from "./Connect"
import { Cost, COST_SECONDS } from "./Cost"
import { Film, FILM_FPS, FILM_SECONDS } from "./Film"

const frames = Math.round(FILM_SECONDS * FILM_FPS)
const connectFrames = Math.round(CONNECT_SECONDS * FILM_FPS)
const costFrames = Math.round(COST_SECONDS * FILM_FPS)

/** Each film at 1920x1080, and again at 1280x720 with larger captions for phones. */
export const Root = () => (
  <>
    <Composition id="film" component={Film} durationInFrames={frames} fps={FILM_FPS} width={1920} height={1080} />
    <Composition id="film720" component={Film} defaultProps={{ phone: true }} durationInFrames={frames} fps={FILM_FPS} width={1280} height={720} />
    <Composition id="cost" component={Cost} durationInFrames={costFrames} fps={FILM_FPS} width={1920} height={1080} />
    <Composition id="cost720" component={Cost} defaultProps={{ phone: true }} durationInFrames={costFrames} fps={FILM_FPS} width={1280} height={720} />
    <Composition id="connect" component={Connect} durationInFrames={connectFrames} fps={FILM_FPS} width={1920} height={1080} />
    <Composition id="connect720" component={Connect} defaultProps={{ phone: true }} durationInFrames={connectFrames} fps={FILM_FPS} width={1280} height={720} />
  </>
)
