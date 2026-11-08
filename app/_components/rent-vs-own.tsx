/**
 * Rent versus own, in one picture. Left: on a rented platform the model, the
 * memory and the keys all sit inside the vendor's box, and the vendor sets
 * the price. Right: in LongStrider the memory and the keys sit in your box,
 * and models plug in from outside, so the model can change and the memory
 * stays. Two panels so the type stays readable on a phone. Illustration only.
 */
const W = 540
const H = 380

function Chip({ x, y, w, label, ghost }: { x: number; y: number; w: number; label: string; ghost?: boolean }) {
  return (
    <g className={ghost ? "ro-chip ro-chip-ghost" : "ro-chip"}>
      <rect x={x} y={y} width={w} height={44} rx={4} />
      <text x={x + w / 2} y={y + 28} textAnchor="middle">
        {label}
      </text>
    </g>
  )
}

function Rented() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
      <text className="ro-title" x={0} y={24}>
        On a rented platform
      </text>
      <rect className="ro-box" x={0} y={50} width={540} height={238} rx={6} />
      <text className="ro-box-label" x={20} y={80}>
        The vendor&rsquo;s box
      </text>
      <Chip x={24} y={104} w={154} label="Model" />
      <Chip x={193} y={104} w={154} label="Memory" />
      <Chip x={362} y={104} w={154} label="Keys" />
      <g className="ro-tag">
        <path d="M24 186 h196 l16 16 l-16 16 h-196 z" />
        <text x={36} y={207}>Price: theirs to change</text>
      </g>
      <g className="ro-lock" transform="translate(482 180)">
        <rect x={0} y={14} width={34} height={26} rx={4} />
        <path d="M7 14 v-5 a10 10 0 0 1 20 0 v5" fill="none" />
      </g>
      <text className="ro-you" x={24} y={266}>
        You
      </text>
      <path className="ro-line" d="M64 260 H 516" />
      <path className="ro-line-x" d="M283 248 l14 24 M297 248 l-14 24" />
      <text className="ro-note" x={0} y={330}>
        Leave, and the memory stays in their box.
      </text>
      <text className="ro-note" x={0} y={358}>
        Switch models, and it starts from zero.
      </text>
    </svg>
  )
}

function Owned() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
      <text className="ro-title" x={0} y={24}>
        In LongStrider
      </text>
      <Chip x={0} y={50} w={160} label="A cloud model" ghost />
      <Chip x={190} y={50} w={160} label="Another one" ghost />
      <Chip x={380} y={50} w={160} label="One you run" ghost />
      <path className="ro-swap" d="M166 72 h18 M356 72 h18" />
      <path className="ro-plug" d="M80 94 V 118 M270 94 V 118 M460 94 V 118" />
      <rect className="ro-box ro-box-yours" x={0} y={118} width={540} height={170} rx={6} />
      <text className="ro-box-label ro-box-label-yours" x={20} y={148}>
        Your box. Your Postgres.
      </text>
      <Chip x={24} y={172} w={240} label="Memory" />
      <Chip x={276} y={172} w={240} label="Keys" />
      <text className="ro-you ro-you-owned" x={24} y={266}>
        You hold the license, the rows and the keys.
      </text>
      <text className="ro-note" x={0} y={330}>
        Swap the model next year. Nothing is taught twice.
      </text>
      <text className="ro-note" x={0} y={358}>
        Leave, and you take the rows with you.
      </text>
    </svg>
  )
}

export function RentVsOwn() {
  return (
    <figure
      className="ro-figure lx-card"
      role="img"
      aria-label="Illustration. On a rented platform, the model, the memory and the keys all sit inside the vendor's box and the vendor sets the price. In LongStrider, the memory and the keys sit in your box; models plug in from outside and can be swapped, and the memory stays."
    >
      <div className="ro-panel">
        <Rented />
      </div>
      <div className="ro-panel">
        <Owned />
      </div>
    </figure>
  )
}
