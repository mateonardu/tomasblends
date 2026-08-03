import { useEffect, useState } from 'react'
import { siteConfig } from '../config/site.config'
import { linkConsultaGeneral } from '../utils/whatsapp'
import PromoBar from './PromoBar'

export const LINKS_NAV = [
  { etiqueta: 'Servicios', ancla: '#servicios' },
  ...(siteConfig.secciones.turnos ? [{ etiqueta: 'Turnos', ancla: '#turnos' }] : []),
  ...(siteConfig.secciones.reels ? [{ etiqueta: 'Trabajos', ancla: '#reels' }] : []),
  { etiqueta: 'Ubicación', ancla: '#ubicacion' },
]

export default function Header() {
  const { marca } = siteConfig
  const turnosActivo = siteConfig.secciones.turnos
  const ctaReserva = turnosActivo
    ? { href: '#turnos', texto: 'Reservar online' }
    : { href: linkConsultaGeneral(), texto: 'Reservar por WhatsApp', target: '_blank', rel: 'noopener noreferrer' }
  const [scrolleado, setScrolleado] = useState(false)
  const [menuAbierto, setMenuAbierto] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolleado(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const cerrarMenu = () => setMenuAbierto(false)

  return (
    <header className="sticky top-0 z-40">
      <PromoBar />

      <div
        className={`text-foreground transition-all duration-300 ${
          scrolleado
            ? 'border-b border-secondary bg-background/90 shadow-sm backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 md:h-28">
          <a href="#inicio" onClick={cerrarMenu} className="flex items-center gap-2.5">
            <img src={marca.logo} alt="" className="h-14 w-auto object-contain md:h-24" />
            <span className="font-heading text-xl font-bold md:text-2xl">{marca.nombre}</span>
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-7 font-ui md:flex">
            {LINKS_NAV.map(({ etiqueta, ancla }) => (
              <a
                key={ancla}
                href={ancla}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                {etiqueta}
              </a>
            ))}
            <a
              href={ctaReserva.href}
              target={ctaReserva.target}
              rel={ctaReserva.rel}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-md"
            >
              {ctaReserva.texto}
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-expanded={menuAbierto}
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`h-0.5 w-6 bg-current transition-transform ${
                menuAbierto ? 'translate-y-2 rotate-45' : ''
              }`}
            />
            <span className={`h-0.5 w-6 bg-current ${menuAbierto ? 'opacity-0' : ''}`} />
            <span
              className={`h-0.5 w-6 bg-current transition-transform ${
                menuAbierto ? '-translate-y-2 -rotate-45' : ''
              }`}
            />
          </button>
        </div>

        {menuAbierto && (
          <nav
            aria-label="Principal"
            className="border-t border-secondary bg-background px-6 py-3 font-ui text-foreground shadow-md md:hidden"
          >
            {LINKS_NAV.map(({ etiqueta, ancla }) => (
              <a
                key={ancla}
                href={ancla}
                onClick={cerrarMenu}
                className="block py-3 font-medium"
              >
                {etiqueta}
              </a>
            ))}
            <a
              href={ctaReserva.href}
              target={ctaReserva.target}
              rel={ctaReserva.rel}
              onClick={cerrarMenu}
              className="mt-2 mb-3 block rounded-full bg-primary px-5 py-3 text-center font-semibold text-white"
            >
              {ctaReserva.texto}
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
