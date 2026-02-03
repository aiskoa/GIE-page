"use client"
import { useRef } from "react"

export function Gallery() {
  const galleryRef = useRef<HTMLDivElement>(null)

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

        <div
          ref={galleryRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {photoSlots.map((slot) => (
            <div
              key={slot}
              className="group relative aspect-square overflow-hidden rounded-xl bg-zinc-900/50 border border-zinc-700/50 hover:border-zinc-600/80 transition-all duration-300 hover:shadow-lg"
            >

              <img
                src={`/image-${slot}.png`}
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

      </div>
    </section>
  )
}
