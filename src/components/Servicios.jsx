import { useState } from 'react'
import { siteConfig } from '../config/site.config'
import { useTurnos } from './turnos/TurnosContext'
import { linkConsultaServicio } from '../utils/whatsapp'
import { useReveal } from '../hooks/useReveal'

function ServicioCard({ servicio, index }) {
  const { elegirServicio, elegirCategoria } = useTurnos()
  const { badgeDestacado, cta } = siteConfig.textos.servicios
  const [ref, visible] = useReveal()
  const turnosActivo = siteConfig.secciones.turnos

  // Con espacios normales, en mobile el CTA rompe en una palabra por
  // linea ("Consultar" / "por" / "WhatsApp" / flecha). Uniendo
  // "Consultar" con "por" y "WhatsApp" con la flecha con espacios
  // irrompibles, el unico punto de quiebre posible queda entre esos
  // dos grupos.
  const NBSP = '\u00A0'
  const palabrasCta = cta.split(' ')
  const ctaConQuiebreControlado =
    palabrasCta.length === 4
      ? palabrasCta[0] + NBSP + palabrasCta[1] + ' ' + palabrasCta[2] + NBSP + palabrasCta[3]
      : cta

  const elegir = () => {
    // Sincroniza la categoría con el servicio elegido, incluso si se
    // llegó acá sin pasar por PasoCategoria (ej. nav "Servicios" directo).
    elegirCategoria(servicio.categoria)
    elegirServicio(servicio)
  }

  // Sin wizard de turnos, cada card va directo a WhatsApp con el
  // servicio pre-armado en el mensaje.
  const propsCta = turnosActivo
    ? { href: '#turnos', onClick: elegir }
    : {
        href: linkConsultaServicio(servicio.nombre),
        target: '_blank',
        rel: 'noopener noreferrer',
      }

  return (
    <a
      ref={ref}
      {...propsCta}
      style={{ transitionDelay: visible ? `${index * 100}ms` : '0ms' }}
      className={`reveal group flex h-full flex-col overflow-hidden rounded-2xl border border-secondary/70 bg-surface shadow-[0_10px_28px_rgba(0,0,0,.35)] hover:-translate-y-[5px] hover:scale-[1.02] hover:border-primary hover:shadow-[0_20px_46px_rgba(0,0,0,.5)] ${
        visible ? 'reveal-visible' : ''
      }`}
    >
      <div className="relative">
        {/* aspect-ratio en la propia img (no en el div contenedor): con
            height:100% en un hijo, el div terminaba tomando el aspect
            ratio real de cada foto en vez del 4/5 fijo, así que cada
            card quedaba con un alto de imagen distinto. */}
        <img
          src={servicio.imagen}
          alt={servicio.nombre}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover object-top"
        />
        {servicio.destacado && (
          <span className="absolute top-3 left-3 rounded-full bg-primary px-3 py-1 text-[10.5px] font-bold tracking-[0.08em] text-secondary uppercase shadow-sm">
            {badgeDestacado}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-heading text-xl font-semibold text-secondary">{servicio.nombre}</h3>
        <p className="flex-1 text-sm text-secondary/70">{servicio.descripcion}</p>

        <span className="mt-3 inline-flex w-fit items-center rounded-full bg-primary px-4 py-2 text-sm font-bold text-secondary transition-colors group-hover:bg-primary-hover">
          {ctaConQuiebreControlado}
        </span>
      </div>
    </a>
  )
}

function TileCategoria({ categoria, activa, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(categoria.id)}
      aria-pressed={activa}
      className={`group flex flex-col gap-3 rounded-2xl px-5 py-5 text-left transition-colors duration-300 sm:px-7 sm:py-6 ${
        activa
          ? 'border-[1.5px] border-primary bg-primary/14'
          : 'border border-white/10 bg-white/4 hover:border-primary/50 hover:bg-white/8'
      }`}
    >
      <span className="flex items-center justify-between gap-3">
        <span
          className={`font-heading text-xl font-semibold sm:text-2xl ${
            activa ? 'text-foreground' : 'text-foreground/85'
          }`}
        >
          {categoria.nombreCorto}
        </span>
        <span
          aria-hidden="true"
          className={`font-body text-lg transition-transform duration-300 group-hover:translate-x-1 ${
            activa ? 'text-primary' : 'text-foreground/50'
          }`}
        >
          →
        </span>
      </span>
      <span className={`font-body text-xs ${activa ? 'text-primary' : 'text-foreground/50'}`}>
        {activa ? 'Categoría seleccionada' : 'Tocá para ver los servicios'}
      </span>
    </button>
  )
}

export default function Servicios() {
  const { titulo, subtitulo } = siteConfig.textos.servicios
  // Estado propio de esta sección: independiente del wizard de turnos, no
  // se sincroniza con siteConfig/TurnosContext (ver PasoCategoria).
  const [tabActiva, setTabActiva] = useState(null)
  const [headerRef, headerVisible] = useReveal()

  // Un click sobre la tab ya activa no hace nada (no se deselecciona).
  const elegirTab = (id) => {
    setTabActiva((actual) => (actual === id ? actual : id))
  }

  const servicios = tabActiva
    ? siteConfig.servicios.filter((s) => s.categoria === tabActiva)
    : []

  return (
    <section id="servicios" className="bg-secondary px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <header
          ref={headerRef}
          className={`reveal mb-10 text-center ${headerVisible ? 'reveal-visible' : ''}`}
        >
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            {titulo}
          </h2>
          <p className="mt-2 opacity-80">{subtitulo}</p>
        </header>

        <div className="mx-auto mb-4 grid max-w-xl grid-cols-2 gap-4 sm:gap-5">
          {siteConfig.categoriasServicios.map((cat) => (
            <TileCategoria
              key={cat.id}
              categoria={cat}
              activa={tabActiva === cat.id}
              onClick={elegirTab}
            />
          ))}
        </div>

        {tabActiva ? (
          <ul className="servicios-grid">
            {servicios.map((servicio, i) => (
              <li key={servicio.id}>
                <ServicioCard servicio={servicio} index={i} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="servicio-empty-state flex flex-col items-center gap-3 py-14 text-center">
            <span aria-hidden="true" className="servicio-empty-arrow font-body text-2xl text-primary">
              ↑
            </span>
            <p className="font-body text-lg text-foreground/70 italic">
              Elegí una de las dos categorías para ver los servicios
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
