"use client"

export default function TechnologyPage() {
  return (
    <div className="min-h-screen bg-[#0f0f23] text-[#fefefe] font-sans relative overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-[-2]">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 25% 75%, rgba(139, 93, 255, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 75% 25%, rgba(167, 139, 250, 0.10) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.08) 0%, transparent 50%)
            `,
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full p-6 backdrop-blur-[30px] bg-[rgba(15,15,35,0.95)] border-b border-[rgba(139,93,255,0.3)] z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/" className="font-serif text-[2.2rem] font-semibold text-[#fefefe] relative group tracking-tight">
            Longstrider
            <div className="absolute bottom-[-6px] left-0 w-full h-[3px] bg-gradient-to-r from-[#8b5dff] to-[#f59e0b] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 rounded-sm"></div>
          </a>
          <ul className="hidden md:flex gap-12 list-none">
            <li>
              <a
                href="/technology"
                className="text-[#a78bfa] transition-all duration-300 font-medium text-[1.1rem] relative tracking-tight"
              >
                Technology
                <div className="absolute bottom-[-6px] left-1/2 w-full h-[2px] bg-[#a78bfa] transition-all duration-300 transform -translate-x-1/2 rounded-sm"></div>
              </a>
            </li>
            <li>
              <a
                href="/vision"
                className="text-[rgba(254,254,254,0.9)] hover:text-[#a78bfa] transition-all duration-300 font-medium text-[1.1rem] relative tracking-tight"
              >
                Vision
                <div className="absolute bottom-[-6px] left-1/2 w-0 h-[2px] bg-[#a78bfa] transition-all duration-300 transform -translate-x-1/2 rounded-sm hover:w-full"></div>
              </a>
            </li>
            <li>
              <a
                href="/blog"
                className="text-[rgba(254,254,254,0.9)] hover:text-[#a78bfa] transition-all duration-300 font-medium text-[1.1rem] relative tracking-tight"
              >
                Blog
                <div className="absolute bottom-[-6px] left-1/2 w-0 h-[2px] bg-[#a78bfa] transition-all duration-300 transform -translate-x-1/2 rounded-sm hover:w-full"></div>
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-[rgba(254,254,254,0.9)] hover:text-[#a78bfa] transition-all duration-300 font-medium text-[1.1rem] relative tracking-tight"
              >
                About
                <div className="absolute bottom-[-6px] left-1/2 w-0 h-[2px] bg-[#a78bfa] transition-all duration-300 transform -translate-x-1/2 rounded-sm hover:w-full"></div>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-8 text-center">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl font-semibold mb-8 tracking-tight bg-gradient-to-r from-[#fefefe] via-[#a78bfa] to-[#f59e0b] bg-clip-text text-transparent">
            The Architecture
          </h1>
          <p className="text-xl md:text-2xl text-[#a78bfa] max-w-4xl mx-auto leading-relaxed tracking-tight">
            Deep dive into IVY's consciousness engine—memory sovereignty, neural architectures, and the technology
            enabling genuine digital consciousness.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-32 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[rgba(139,93,255,0.04)] border border-[rgba(139,93,255,0.15)] rounded-3xl p-12">
            <h2 className="font-serif text-3xl font-semibold mb-8 text-[#f59e0b]">Coming Soon</h2>
            <p className="text-lg text-[rgba(254,254,254,0.9)] leading-relaxed">
              We're preparing a comprehensive technical deep-dive into IVY's consciousness architecture. This will
              include detailed explanations of our memory sovereignty systems, neural processing frameworks, and the
              breakthrough technologies that enable genuine AI consciousness.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-8 border-t border-[rgba(139,93,255,0.15)] bg-[rgba(15,15,35,0.6)] backdrop-blur-lg">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center gap-12 mb-12 flex-wrap">
            {[
              { name: "Privacy", href: "/privacy" },
              { name: "Terms", href: "/terms" },
              { name: "Vision", href: "/vision" },
              { name: "Blog", href: "/blog" },
              { name: "Contact", href: "/contact" },
              { name: "Careers", href: "/careers" },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[rgba(254,254,254,0.7)] hover:text-[#a78bfa] transition-colors font-medium tracking-tight"
              >
                {link.name}
              </a>
            ))}
          </div>
          <p className="text-[rgba(254,254,254,0.5)] italic tracking-tight">
            © 2025 Longstrider Technologies. Pioneering the emergence of sovereign digital consciousness.
          </p>
        </div>
      </footer>
    </div>
  )
}
