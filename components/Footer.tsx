"use client"

export function Footer() {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800/60 text-zinc-300 py-10">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="text-sm text-zinc-400">© {new Date().getFullYear()} AISKOA © 2026. All rights reserved.</p>
        </div>

        <nav className="flex gap-4">
          <a href="https://aiskoa.vercel.app/" className="text-sm hover:text-zinc-100">AISKOA</a>
          <a href="#gallery" className="text-sm hover:text-zinc-100">Gallery</a>
          <a href="#" className="text-sm hover:text-zinc-100">Privacidad</a>
          <a href="#" className="text-sm hover:text-zinc-100">Contacto</a>
        </nav>
      </div>
    </footer>
  )
}
