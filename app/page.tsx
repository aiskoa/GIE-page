import { Hero } from "@/components/Hero"
import { Gallery } from "@/components/Gallery"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <Gallery />
      <Footer />
    </div>
  )
}
