"use client"
import { useRef, useState, useEffect } from "react"
import { gsap } from "gsap"
import { Shield, Lock, Eye, Download } from "lucide-react"

export function Hero() {
  const cardRef = useRef<HTMLDivElement>(null)
  const pixelGridRef = useRef<HTMLDivElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)
  const customCursorRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showCustomCursor, setShowCustomCursor] = useState(false)
  const [activeTab, setActiveTab] = useState<"general" | "help" | "download">("general")

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const characters = "01+x×ABCDEF0123456789+×01xABCDEF"
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)

    interface Drop {
      y: number
      speed: number
      opacity: number
      char: string
      direction: "vertical" | "horizontal"
      x: number
    }

    const drops: Drop[] = []

    // Vertical drops
    for (let i = 0; i < columns; i++) {
      drops.push({
        y: Math.random() * canvas.height,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        char: characters[Math.floor(Math.random() * characters.length)],
        direction: "vertical",
        x: i * fontSize,
      })
    }

    // Horizontal drops
    const rows = Math.floor(canvas.height / fontSize)
    for (let i = 0; i < rows / 3; i++) {
      drops.push({
        y: Math.random() * rows * fontSize,
        speed: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.2 + 0.05,
        char: characters[Math.floor(Math.random() * characters.length)],
        direction: "horizontal",
        x: Math.random() * canvas.width,
      })
    }

    let animationId: number

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.02)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px monospace`

      drops.forEach((drop) => {
        // Change character occasionally
        if (Math.random() < 0.01) {
          drop.char = characters[Math.floor(Math.random() * characters.length)]
        }

        // Light white/gray color
        ctx.fillStyle = `rgba(255, 255, 255, ${drop.opacity})`

        if (drop.direction === "vertical") {
          ctx.fillText(drop.char, drop.x, drop.y)
          drop.y += drop.speed

          if (drop.y > canvas.height) {
            drop.y = 0
            drop.opacity = Math.random() * 0.3 + 0.1
          }
        } else {
          ctx.fillText(drop.char, drop.x, drop.y)
          drop.x += drop.speed

          if (drop.x > canvas.width) {
            drop.x = 0
            drop.opacity = Math.random() * 0.2 + 0.05
          }
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  useEffect(() => {
    const tagsElement = tagsRef.current
    const cursorElement = customCursorRef.current

    if (!tagsElement || !cursorElement) return

    let cursorX = 0
    let cursorY = 0

    const handleMouseMove = (e: MouseEvent) => {
      cursorX = e.clientX
      cursorY = e.clientY

      gsap.to(cursorElement, {
        x: cursorX - 15,
        y: cursorY - 15,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleMouseEnter = () => {
      setShowCustomCursor(true)
    }

    const handleMouseLeave = () => {
      setShowCustomCursor(false)
    }

    tagsElement.addEventListener("mouseenter", handleMouseEnter)
    tagsElement.addEventListener("mouseleave", handleMouseLeave)
    tagsElement.addEventListener("mousemove", handleMouseMove)

    return () => {
      tagsElement.removeEventListener("mouseenter", handleMouseEnter)
      tagsElement.removeEventListener("mouseleave", handleMouseLeave)
      tagsElement.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const handleMouseLeaveAnimation = () => {
    if (!cardRef.current || !pixelGridRef.current) return

    const gridSize = 4
    const pixelSize = 100 / gridSize

    pixelGridRef.current.innerHTML = ""

    const totalPixels = gridSize * gridSize
    const clearIndices = new Set<number>()
    while (clearIndices.size < 3) {
      clearIndices.add(Math.floor(Math.random() * totalPixels))
    }

    let pixelIndex = 0
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (clearIndices.has(pixelIndex)) {
          pixelIndex++
          continue
        }

        const pixel = document.createElement("div")
        const isWhite = Math.random() < 0.5

        const normalizedPosition = (col + (gridSize - 1 - row)) / ((gridSize - 1) * 2)
        const targetOpacity = 0.5 + normalizedPosition * 0.5

        pixel.className = `absolute ${isWhite ? "bg-white" : "bg-zinc-800"}`
        pixel.style.width = `${pixelSize}%`
        pixel.style.height = `${pixelSize}%`
        pixel.style.left = `${col * pixelSize}%`
        pixel.style.top = `${row * pixelSize}%`
        pixel.style.opacity = "0"
        pixel.style.display = "block"
        pixel.setAttribute("data-target-opacity", targetOpacity.toString())
        pixelGridRef.current.appendChild(pixel)

        pixelIndex++
      }
    }

    const pixels = Array.from(pixelGridRef.current.children)
    const animationStepDuration = 0.45
    const actualPixelCount = pixels.length
    const staggerDuration = animationStepDuration / actualPixelCount

    const tl = gsap.timeline()

    tl.to(cardRef.current, {
      scale: 0.995,
      duration: 0.2,
      ease: "power2.in",
    })

    tl.to(
      pixels,
      {
        opacity: (index, target) => {
          const el = target as HTMLElement
          return el.getAttribute("data-target-opacity") || "1"
        },
        duration: 0.45,
        ease: "power2.in",
        stagger: {
          each: staggerDuration,
          from: "random",
        },
      },
      "<",
    )

    tl.to(
      pixels,
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      },
      `+=${animationStepDuration}`,
    )

    tl.to(
      cardRef.current,
      {
        scale: 1,
        duration: 0.3,
        ease: "power2.in",
      },
      "<",
    )

    tl.set(pixels, {
      display: "none",
    })
  }

  return (
    <section className="p-[1.5%] bg-zinc-950">
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <mask id="heroMask" maskContentUnits="objectBoundingBox">
            <rect width="1" height="1" fill="black" />
            <path
              d="M0 0.1474 V0.9863 C0 0.9938 0.0038 0.9996 0.0085 0.9996 H0.9912 C0.9958 0.9996 1 0.9863 1 0.9863 V0.0581 C1 0.0506 0.9958 0.0444 0.9912 0.0444 H0.9255 C0.9208 0.0444 0.9165 0.0383 0.9165 0.0307 V0.0149 C0.9165 0.0074 0.9132 0.0013 0.9084 0.0013 L0.2060 0.0000 C0.2012 -0.0000 0.1975 0.0061 0.1975 0.0137 V0.0312 C0.1975 0.0387 0.1936 0.0448 0.1889 0.0448 H0.0915 C0.0868 0.0448 0.0830 0.0510 0.0830 0.0585 V0.1201 C0.0830 0.1276 0.0792 0.1337 0.0745 0.1337 H0.0085 C0.0038 0.1337 0 0.1399 0 0.1474 Z"
              fill="white"
            />
          </mask>
        </defs>
      </svg>

      <div className="relative isolate w-full min-h-[calc(100svh-3vh)] sm:min-h-[calc(100svh-3vh)]">
        <header className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex justify-between items-start z-50">
          <img src="/logo.png" alt="GIE" className="w-16 h-16 max-w-full" />

          <nav ref={tagsRef} className="flex gap-2 sm:gap-3">
              <button
                onClick={() => setActiveTab("general")}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-full border backdrop-blur transition-all ${
                  activeTab === "general"
                    ? "bg-zinc-100 text-zinc-900 border-zinc-100"
                    : "bg-zinc-900/50 text-zinc-300 border-zinc-600/50 hover:bg-zinc-800/60 hover:border-zinc-500/60"
                }`}
              >
                HOME
              </button>
              <button
                onClick={() => setActiveTab("help")}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-full border backdrop-blur transition-all ${
                  activeTab === "help"
                    ? "bg-zinc-100 text-zinc-900 border-zinc-100"
                    : "bg-zinc-900/50 text-zinc-300 border-zinc-600/50 hover:bg-zinc-800/60 hover:border-zinc-500/60"
                }`}
              >
                HELP
              </button>
              <a
                href="#gallery"
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-full border backdrop-blur transition-all bg-zinc-900/50 text-zinc-300 border-zinc-600/50 hover:bg-zinc-800/60 hover:border-zinc-500/60`}
              >
                GALLERY
              </a>
              <button
                onClick={() => setActiveTab("download")}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-full border backdrop-blur transition-all ${
                  activeTab === "download"
                    ? "bg-zinc-100 text-zinc-900 border-zinc-100"
                    : "bg-zinc-900/50 text-zinc-300 border-zinc-600/50 hover:bg-zinc-800/60 hover:border-zinc-500/60"
                }`}
              >
                DOWNLOAD
              </button>
            </nav>
          </header>

        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            mask: "url(#heroMask)",
            WebkitMask: "url(#heroMask)",
          }}
        >
          {/* Background image with dark overlay */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: "url('/bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 z-[1] bg-black/30" />

          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-[2]" style={{ background: "transparent" }} />

          <div className="pointer-events-none absolute inset-0 z-0 top-20">
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/30 via-transparent to-zinc-950/60" />
            <div className="absolute inset-0 [background:radial-gradient(90%_60%_at_10%_70%,rgba(0,0,0,.5)_0%,transparent_70%)]" />
          </div>

          {/* Custom cursor */}
          <div
            ref={customCursorRef}
            className={`fixed w-[30px] h-[30px] rounded-full bg-zinc-300/20 border border-zinc-400/40 pointer-events-none z-50 transition-opacity duration-300 ${
              showCustomCursor ? "opacity-100" : "opacity-0"
            }`}
            style={{ transform: "translate(-50%, -50%)" }}
          />

          <div className="absolute bottom-6 left-6 right-6 max-w-[min(46rem,92vw)] md:bottom-8 md:left-8 z-20">
            <div
              ref={cardRef}
              onMouseLeave={handleMouseLeaveAnimation}
              className="relative overflow-hidden backdrop-blur-md bg-black/50 border border-zinc-700/50 rounded-2xl p-6 md:p-8 transition-transform duration-500 ease-in hover:scale-[1.01]"
            >
              <div ref={pixelGridRef} className="absolute inset-0 pointer-events-none z-0" />

              {activeTab === "general" ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <Lock className="w-6 h-6 text-zinc-400" />
                  </div>
                  <h1 className="text-balance text-3xl/tight sm:text-4xl/tight md:text-5xl/tight tracking-tight text-zinc-50 font-serif">
                    GIE Encryptor
                  </h1>
                  <p className="mt-3 text-sm/6 text-zinc-300/80 max-w-prose font-sans">
                    Military-grade encryption. Protect your files from attacks and unsecure networks.
                  </p>
                  <button
                    onClick={() => setActiveTab("download")}
                    className="mt-4 inline-flex items-center rounded-full border border-zinc-500/50 bg-zinc-800/40 px-4 py-2 text-sm font-medium text-zinc-100 backdrop-blur hover:bg-zinc-700/50 hover:border-zinc-400/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400 transition-all"
                  >
                    DOWNLOAD
                  </button>
                </>
              ) : activeTab === "help" ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <Eye className="w-8 h-8 text-zinc-300" />
                  </div>
                  <h1 className="text-balance text-2xl/tight sm:text-3xl/tight md:text-4xl/tight tracking-tight text-zinc-50 font-serif">
                    HELP
                  </h1>
                  <p className="mt-3 text-sm/6 text-zinc-300/80 max-w-prose font-sans">
                    <strong className="text-zinc-100">Step I:</strong> Select your files or folders to GIE.
                    <br />
                    <strong className="text-zinc-100">Step II:</strong> Enter a password, select a method and channel.
                    <br />
                    <strong className="text-zinc-100">Step III:</strong> The seal will be applied. Only you will be able to break it.
                    Don't forget your password and channel.
                  </p>
                  <p className="mt-2 text-xs text-zinc-400 font-mono">Lightweight | Easy to use | Zero-Knowledge</p>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <Download className="w-8 h-8 text-zinc-300" />
                  </div>
                  <h1 className="text-balance text-2xl/tight sm:text-3xl/tight md:text-4xl/tight tracking-tight text-zinc-50 font-serif">
                    DOWNLOADS
                  </h1>
                  <p className="mt-3 text-sm/6 text-zinc-300/80 max-w-prose font-sans mb-4">
                    Select your platform to invoke GIE on your machine. Not avaliable on mobile devices and mac.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://github.com/aiskoa/GIE/releases/download/version1.2.5/GIE_SETUP.exe"
                      className="inline-flex items-center gap-2 rounded-lg border border-zinc-600/50 bg-zinc-800/60 px-4 py-2.5 text-sm font-medium text-zinc-100 backdrop-blur hover:bg-zinc-700/70 hover:border-zinc-500/60 transition-all"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                      </svg>
                      Windows
                    </a>
                    <a
                      href="https://github.com/aiskoa/GIE/releases/download/version1.2.5/Linux.Ubuntu.zip"
                      className="inline-flex items-center gap-2 rounded-lg border border-zinc-600/50 bg-zinc-800/60 px-4 py-2.5 text-sm font-medium text-zinc-100 backdrop-blur hover:bg-zinc-700/70 hover:border-zinc-500/60 transition-all"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                      </svg>
                      Linux
                    </a>
                    <a
                      href="https://github.com/aiskoa/GIE/releases/download/versions/gie-encrypt.apk"
                      className="inline-flex items-center gap-2 rounded-lg border border-zinc-600/50 bg-zinc-800/60 px-4 py-2.5 text-sm font-medium text-zinc-100 backdrop-blur hover:bg-zinc-700/70 hover:border-zinc-500/60 transition-all"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.25 2.5c.41 0 .75.34.75.75v1.5c0 .41-.34.75-.75.75h-1.5c-.41 0-.75-.34-.75-.75V3.25c0-.41.34-.75.75-.75h1.5zM6.75 2.5c.41 0 .75.34.75.75v1.5c0 .41-.34.75-.75.75H5.25c-.41 0-.75-.34-.75-.75V3.25c0-.41.34-.75.75-.75h1.5zM18 6h-3c.55 0 1 .45 1 1v11c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1H3c-.55 0-1 .45-1 1v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-.55-.45-1-1-1z" />
                      </svg>
                      Android
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
