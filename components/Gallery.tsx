"use client"
import { useRef } from "react"

export function Gallery() {
  const galleryRef = useRef<HTMLDivElement>(null)

  // Array de 6 espacios para fotos - el usuario puede personalizar
  const photoSlots = Array.from({ length: 6 }, (_, i) => i + 1)

  return (
    <section id="gallery" className="min-h-screen bg-zinc-950 py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-zinc-100 mb-4">
            Gallery
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Reference images
          </p>
        </div>

        {/* Gallery Grid */}
        <div
          ref={galleryRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {photoSlots.map((slot) => (
            <div
              key={slot}
              className="group relative aspect-square overflow-hidden rounded-xl bg-zinc-900/50 border border-zinc-700/50 hover:border-zinc-600/80 transition-all duration-300 hover:shadow-lg"
            >
              {/* Placeholder for image */}
              {/* <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
                <div className="text-center">
                  <div className="text-6xl text-zinc-700 mb-4">📸</div>
                  <p className="text-zinc-500 font-mono text-sm">Foto {slot}</p>
                  <p className="text-zinc-600 text-xs mt-2">Reemplaza con tu imagen</p>
                </div>
              </div> */}

              <img
                src={`./src/img/image-${slot}.png`}
                alt={`Gallery image ${slot}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="px-4 py-2 bg-zinc-100 text-zinc-900 font-medium rounded-full hover:bg-zinc-200 transition-colors">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        {/* <div className="mt-20 p-8 bg-zinc-900/30 border border-zinc-700/50 rounded-xl text-center">
          <h3 className="text-xl font-serif text-zinc-100 mb-3">¿Cómo agregar tus fotos?</h3>
          <p className="text-zinc-400 font-mono text-sm">
            Reemplaza las rutas de las imágenes en el componente Gallery.tsx con tus imágenes.
            <br />
            Coloca tus imágenes en la carpeta <code className="bg-zinc-800 px-2 py-1 rounded mx-1">public/gallery/</code>
          </p>
        </div> */}
      </div>
    </section>
  )
}
