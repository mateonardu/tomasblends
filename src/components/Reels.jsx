import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '../config/site.config'
import { useReveal } from '../hooks/useReveal'

function IconoPlay() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 -translate-x-0.5">
      <path d="M8 5.14v13.72c0 .84.93 1.35 1.64.9l10.86-6.86a1.07 1.07 0 0 0 0-1.8L9.64 4.24A1.07 1.07 0 0 0 8 5.14Z" />
    </svg>
  )
}

// Distancia con signo más corta al activo (con wraparound), p.ej. con
// 6 reels: 0 = al frente, ±1 = al costado, ±2/±3 = fuera de vista.
function offsetDesdeActivo(indice, activo, total) {
  const diff = (indice - activo + total) % total
  return diff > total / 2 ? diff - total : diff
}

function TarjetaReel({ reel, offset, onSeleccionar }) {
  const videoRef = useRef(null)
  const [reproduciendo, setReproduciendo] = useState(false)
  const esCentro = offset === 0

  useEffect(() => {
    if (!esCentro && videoRef.current) {
      videoRef.current.pause()
      setReproduciendo(false)
    }
  }, [esCentro])

  const alternarPlay = () => {
    if (!esCentro) {
      onSeleccionar()
      return
    }
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().catch(() => {})
      setReproduciendo(true)
    } else {
      video.pause()
      setReproduciendo(false)
    }
  }

  const esVecino = Math.abs(offset) === 1
  const posicion =
    offset === 0
      ? 'z-30 translate-x-0 rotate-0 scale-100'
      : offset === -1
        ? 'z-10 -translate-x-[68%] -rotate-[8deg] scale-[0.82]'
        : offset === 1
          ? 'z-10 translate-x-[68%] rotate-[8deg] scale-[0.82]'
          : offset < 0
            ? 'z-0 -translate-x-[68%] -rotate-[8deg] scale-[0.82]'
            : 'z-0 translate-x-[68%] rotate-[8deg] scale-[0.82]'
  const visibilidad = esCentro
    ? 'opacity-100 cursor-pointer'
    : esVecino
      ? 'opacity-90 cursor-pointer'
      : 'opacity-0 pointer-events-none'

  return (
    <button
      type="button"
      onClick={alternarPlay}
      aria-hidden={!esCentro && !esVecino}
      tabIndex={!esCentro && !esVecino ? -1 : undefined}
      aria-label={
        esCentro
          ? reproduciendo
            ? 'Pausar video'
            : 'Reproducir video'
          : `Ver reel de ${reel.descripcion}`
      }
      className={`absolute inset-0 m-auto h-full w-[240px] overflow-hidden rounded-[28px] shadow-[0_20px_45px_rgba(0,0,0,.45)] transition-all duration-500 ease-out sm:w-[270px] md:w-[300px] lg:w-[330px] ${posicion} ${visibilidad}`}
    >
      <video
        ref={videoRef}
        src={reel.video}
        poster={reel.thumbnail}
        playsInline
        loop
        className="h-full w-full bg-secondary object-cover"
      />

      <span
        aria-hidden="true"
        className={`absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-sm transition-opacity duration-300 ${
          esCentro && reproduciendo ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <IconoPlay />
      </span>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 rounded-b-[28px] bg-gradient-to-t from-black/85 via-black/35 to-transparent p-4 pt-12 text-left"
      >
        {reel.nombre && (
          <p className="text-sm font-semibold text-foreground">{reel.nombre}</p>
        )}
        <p className="text-xs leading-snug text-foreground/80">{reel.descripcion}</p>
      </div>
    </button>
  )
}

export default function Reels() {
  const { titulo, subtitulo } = siteConfig.textos.reels
  const { reels } = siteConfig
  const [activo, setActivo] = useState(0)
  const [headerRef, headerVisible] = useReveal()

  const anterior = () => setActivo((a) => (a - 1 + reels.length) % reels.length)
  const siguiente = () => setActivo((a) => (a + 1) % reels.length)

  return (
    <section id="reels" className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <header
          ref={headerRef}
          className={`reveal mb-9 text-center ${headerVisible ? 'reveal-visible' : ''}`}
        >
          <h2 className="font-heading text-3xl font-bold md:text-4xl lg:text-5xl">{titulo}</h2>
          <p className="mt-2 text-foreground/80 md:text-lg">{subtitulo}</p>
        </header>

        <div className="relative mx-auto flex h-[420px] max-w-md items-center justify-center sm:h-[460px] md:h-[500px] md:max-w-lg lg:h-[560px] lg:max-w-xl">
          <button
            type="button"
            onClick={anterior}
            aria-label="Reel anterior"
            className="absolute left-0 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-xl text-foreground transition-colors hover:bg-primary hover:text-white sm:-left-4"
          >
            ‹
          </button>

          {reels.map((reel, i) => (
            <TarjetaReel
              key={i}
              reel={reel}
              offset={offsetDesdeActivo(i, activo, reels.length)}
              onSeleccionar={() => setActivo(i)}
            />
          ))}

          <button
            type="button"
            onClick={siguiente}
            aria-label="Reel siguiente"
            className="absolute right-0 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-xl text-foreground transition-colors hover:bg-primary hover:text-white sm:-right-4"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  )
}
