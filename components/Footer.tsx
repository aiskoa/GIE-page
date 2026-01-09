"use client"

export function Footer() {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800/60 text-zinc-300 py-10">
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <p className="text-sm text-zinc-400">© {new Date().getFullYear()} Arcanum. Todos los derechos reservados.</p>
        </div>

        <nav className="flex gap-4">
          <a href="#" className="text-sm hover:text-zinc-100">Página principal</a>
          <a href="#gallery" className="text-sm hover:text-zinc-100">Galería</a>
          <a href="#" className="text-sm hover:text-zinc-100">Privacidad</a>
          <a href="#" className="text-sm hover:text-zinc-100">TOS</a>
          <a href="#" className="text-sm hover:text-zinc-100">Contacto</a>
        </nav>
      </div>
    </footer>
  )
}
