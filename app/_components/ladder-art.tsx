/**
 * The Ladder — five ascending rungs from hosted to air-gapped, drawn as SVG
 * in the site's house style: ivory paper, fine ink lines, gold accents.
 * Pure vector so it stays crisp at any width, no image request.
 */
export function LadderArt() {
  const rungs = [
    { x: 40, y: 470, w: 190, label: "Hosted" },
    { x: 250, y: 390, w: 200, label: "Your keys" },
    { x: 470, y: 310, w: 210, label: "Your model" },
    { x: 700, y: 230, w: 220, label: "Private cloud" },
    { x: 940, y: 150, w: 230, label: "Air-gapped" },
  ]
  return (
    <figure className="lx-wrap lx-art" data-reveal>
      <svg
        viewBox="0 0 1400 650"
        role="img"
        aria-label="Five ascending steps rising from hosted to air-gapped, topped by a gold light"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        {/* drift particles */}
        {[
          [120, 180, 2.5], [340, 120, 2], [520, 200, 3], [760, 90, 2.5], [980, 60, 2],
          [1180, 140, 2.5], [1300, 300, 2], [200, 320, 2], [620, 430, 2], [860, 350, 2.5],
        ].map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="var(--lx-gold)" opacity={i % 2 ? 0.5 : 0.75} />
        ))}

        {/* rising gold thread connecting the rungs */}
        <path
          d="M 60 440 C 300 400, 520 330, 760 250 S 1150 140, 1330 96"
          fill="none"
          stroke="var(--lx-gold)"
          strokeWidth="1.4"
          opacity="0.8"
        />
        <path
          d="M 60 452 C 310 412, 530 342, 770 262 S 1155 152, 1336 106"
          fill="none"
          stroke="var(--lx-ink)"
          strokeWidth="0.8"
          opacity="0.28"
          strokeDasharray="2 6"
        />

        {rungs.map((r, i) => {
          const last = i === rungs.length - 1
          return (
            <g key={r.label}>
              {/* slab */}
              <rect
                x={r.x}
                y={r.y}
                width={r.w}
                height={30}
                rx={4}
                fill={last ? "var(--lx-gold-wash)" : "var(--lx-surface)"}
                stroke={last ? "var(--lx-gold-line)" : "var(--lx-line)"}
                strokeWidth={last ? 1.5 : 1}
              />
              {/* hatching under the slab, etching style */}
              {Array.from({ length: 7 }).map((_, k) => (
                <line
                  key={k}
                  x1={r.x + 8 + k * 5}
                  y1={r.y + 34 + k * 4}
                  x2={r.x + r.w - 8 - k * 5}
                  y2={r.y + 34 + k * 4}
                  stroke="var(--lx-ink)"
                  strokeWidth="0.6"
                  opacity={0.16 - k * 0.015}
                />
              ))}
              {/* rung number in gold ink */}
              <text
                x={r.x + 14}
                y={r.y - 14}
                fontSize="15"
                fill="var(--lx-gold-ink)"
                fontFamily="var(--lx-display)"
                letterSpacing="2"
              >
                {String(i + 1).padStart(2, "0")}
              </text>
              <text
                x={r.x + 48}
                y={r.y - 14}
                fontSize="15"
                fill="var(--lx-ink-primary)"
                fontFamily="var(--lx-display)"
              >
                {r.label}
              </text>
            </g>
          )
        })}

        {/* the crowning light on the last rung */}
        <g>
          <circle cx="1055" cy="96" r="26" fill="var(--lx-gold)" opacity="0.16" />
          <circle cx="1055" cy="96" r="13" fill="var(--lx-gold)" opacity="0.35" />
          <circle cx="1055" cy="96" r="5" fill="var(--lx-gold-light)" />
          <line x1="1055" y1="140" x2="1055" y2="96" stroke="var(--lx-gold)" strokeWidth="1.2" opacity="0.8" />
        </g>
      </svg>
      <figcaption className="lx-illustrative">Five rungs, one record. Moving up never moves the memory.</figcaption>
    </figure>
  )
}
