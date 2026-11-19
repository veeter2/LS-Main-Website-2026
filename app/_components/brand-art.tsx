import Image from "next/image"

/**
 * A wide brand illustration between two sections. Decorative: empty alt, lazy,
 * sized up front so the page never jumps. Files live in public/art.
 */
export function BrandArt({ name, caption }: { name: "arch" | "orbit" | "steps"; caption?: string }) {
  return (
    <figure className="lx-wrap lx-art" data-reveal>
      <Image src={`/art/${name}.webp`} alt="" width={1400} height={650} sizes="(max-width: 1200px) 100vw, 1120px" />
      {caption ? <figcaption className="lx-illustrative">{caption}</figcaption> : null}
    </figure>
  )
}
