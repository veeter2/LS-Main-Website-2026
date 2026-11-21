import Image from "next/image"

/**
 * A still from the concept film as a quiet section opener, for pages and
 * sections that are all words. Static; the moving version is the hero on
 * the home page. Frames are taken at caption seams so no words are baked in.
 */
export function FilmStill({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="lx-wrap lx-still" data-reveal>
      <Image src={src} alt={alt} width={1920} height={1080} sizes="(max-width: 1240px) 100vw, 1240px" />
    </figure>
  )
}
