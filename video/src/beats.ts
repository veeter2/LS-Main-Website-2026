/** Timing for the whole film. Seconds, not frames, so the script's timecodes read straight across. */
export const FPS = 24
export const TOTAL_SECONDS = 115

/** The gap map's Part 4 captions, word for word. Start times are the script's shot list. */
export const BEATS: { at: number; text: string }[] = [
  { at: 0, text: "Stop teaching AI your business every morning." },
  { at: 5, text: "Your company’s memory. Yours, not rented." },
  { at: 12, text: "Pick the model for each job. Frontier or your own machine." },
  { at: 20, text: "Every morning: what moved, what’s waiting on you." },
  { at: 27, text: "Ask. It answers from everything you know." },
  { at: 33, text: "Click any answer. See where it came from, what it cost." },
  { at: 41, text: "Highlight an answer. Make it a rule." },
  { at: 47, text: "Every fact, dated and sourced, filed on its own." },
  { at: 52, text: "Topics form themselves as you work." },
  { at: 57, text: "What you promised, pulled from the conversation." },
  { at: 63, text: "Hire an expert by interview. Seat it in any chat." },
  { at: 70, text: "Teammates with a job description and a schedule." },
  { at: 75, text: "They find things. You keep, teach, or skip." },
  { at: 79, text: "Nothing goes out in your name until you say yes." },
  { at: 85, text: "Your memory is yours. The company’s is shared." },
  { at: 91, text: "Your CRM, payments, forms, files. Plugged in once." },
  { at: 97, text: "At night it reads the week and writes you a letter." },
  { at: 104, text: "Tomorrow it knows more. So does your team." },
  { at: 110, text: "One mind your company trains. Everyone’s best teammate." },
]

/** The site's tokens (app/site.css). Same hex, so the film and the page cannot drift. */
export const C = {
  paper: "#f1ecdf",
  surface: "#faf7f0",
  ink: "#1f1b14",
  gold: "#c8a96e",
  goldLight: "#e8cd96",
  goldInk: "#7e5e26",
  dusk1: "#2a2540",
  dusk2: "#3b3358",
  ramp: ["#57492E", "#6B5A38", "#8A7347", "#A78B54", "#C8A96E", "#E8CD96"],
}
