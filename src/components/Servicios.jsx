import { useState } from 'react'
import { siteConfig } from '../config/site.config'
import { formatDuracion, formatPrecio } from '../utils/format'
import { useTurnos } from './turnos/TurnosContext'
import { useReveal } from '../hooks/useReveal'

function ServicioCard({ servicio, index }) {
  const { elegirServicio, elegirCategoria } = useTurnos()
  const { badgeDestacado, cta } = siteConfig.textos.servicios
  const [ref, visible] = useReveal()

  const elegir = () => {
    // Sincroniza la categoría con el servicio elegido, incluso si se
    // llegó acá sin pasar por PasoCategoria (ej. nav "Servicios" directo).
    elegirCategoria(servicio.categoria)
    elegirServicio(servicio)
  }

  return (
    <a
      ref={ref}
      href="#turnos"
      onClick={elegir}
      style={{ transitionDelay: visible ? `${index * 100}ms` : '0ms' }}
      className={`reveal flex h-full flex-col overflow-hidden rounded-[20px] border border-secondary/70 bg-surface shadow-[0_8px_26px_rgba(74,53,59,.08)] hover:-translate-y-[5px] hover:scale-[1.02] hover:border-primary hover:shadow-[0_18px_40px_rgba(74,53,59,.14)] ${
        visible ? 'reveal-visible' : ''
      }`}
    >
      <div className="relative h-52">
        <img
          src={servicio.imagen}
          alt={servicio.nombre}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        {servicio.destacado && (
          <span className="absolute top-3 right-3 rounded-full bg-promo-bar px-3 py-1 text-[10.5px] font-bold tracking-[0.08em] text-promo-bar-foreground uppercase">
            {badgeDestacado}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-heading text-xl font-semibold text-secondary">{servicio.nombre}</h3>
        <p className="flex-1 text-sm text-secondary/70">{servicio.descripcion}</p>

        <div className="mt-1 flex items-baseline justify-between gap-3">
          <span className="text-sm text-primary/80">
            {formatDuracion(servicio.duracionMin)}
          </span>
          <span className="font-body text-lg font-bold text-primary">
            {formatPrecio(servicio.precio)}
          </span>
        </div>

        <div className="mt-2 border-t border-secondary/70 pt-3 text-sm font-bold text-primary">
          {cta}
        </div>
      </div>
    </a>
  )
}

function TabCategoria({ categoria, activa, onClick }) {
  return (
    <button
      type="button"
      onClick={() => onClick(categoria.id)}
      aria-pressed={activa}
      className={`border-b-2 pb-2.5 font-body text-base transition-colors ${
        activa
          ? 'border-primary font-semibold text-foreground'
          : 'tab-categoria-inactiva border-transparent text-primary'
      }`}
    >
      {categoria.nombreCorto}
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

        <div className="mb-10 flex justify-center gap-10 border-b border-foreground/15">
          {siteConfig.categoriasServicios.map((cat) => (
            <TabCategoria
              key={cat.id}
              categoria={cat}
              activa={tabActiva === cat.id}
              onClick={elegirTab}
            />
          ))}
        </div>

        {tabActiva ? (
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(245px,1fr))] gap-[22px]">
            {servicios.map((servicio, i) => (
              <li key={servicio.id}>
                <ServicioCard servicio={servicio} index={i} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="py-12 text-center font-body text-lg text-foreground/70 italic">
            Elegí una categoría para ver los servicios
          </p>
        )}
      </div>
    </section>
  )
}
