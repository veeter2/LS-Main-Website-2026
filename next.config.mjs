import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    // Old dark-site addresses that search engines and links still hold.
    const r = (source, destination) => ({ source, destination, permanent: true })
    return [
      r("/about", "/company"),
      r("/technology", "/for/technology"),
      r("/technology/:path*", "/for/technology"),
      r("/agents", "/product"),
      r("/contact", "/book"),
      r("/pilot", "/book"),
      r("/briefs", "/"),
      r("/briefs/:path*", "/"),
      r("/field-notes", "/"),
      r("/field-notes/:path*", "/"),
      r("/case-studies", "/industries"),
      r("/blog", "/"),
      r("/labs", "/"),
      r("/archive", "/"),
      r("/cookies", "/privacy"),
      r("/concepts", "/"),
      r("/concepts/home", "/"),
      r("/concepts/:path*", "/:path*"),
    ]
  },
}

export default nextConfig
