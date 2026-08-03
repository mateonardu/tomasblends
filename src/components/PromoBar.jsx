import { useEffect, useState } from 'react'
import { siteConfig } from '../config/site.config'
import { linkConsultaGeneral } from '../utils/whatsapp'

const DURACION_TRANSICION_MS = 380

export default function PromoBar() {
  const { promoBar } = siteConfig
  const mensajes = promoBar?.mensajes ?? []
  const [indice, setIndice] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (mensajes.length < 2) return undefined

    const rotar = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndice((i) => (i + 1) % mensajes.length)
        setVisible(true)
      }, DURACION_TRANSICION_MS)
    }, (promoBar.rotarCadaSegundos ?? 5) * 1000)

    return () => clearInterval(rotar)
  }, [mensajes.length, promoBar?.rotarCadaSegundos])

  if (!promoBar?.activa || mensajes.length === 0) return null

  const mensaje = mensajes[indice]

  return (
    <div className="relative flex h-11 items-center justify-center overflow-hidden bg-promo-bar px-4 font-ui text-promo-bar-foreground">
      <div
        className="flex min-w-0 items-center gap-2.5 transition-[opacity,transform] duration-[380ms] ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(-8px)',
        }}
      >
        <span className="truncate text-[13px] tracking-wide">{mensaje.texto}</span>
      </div>

      <a
        href={linkConsultaGeneral()}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-4 hidden text-xs text-promo-bar-foreground/75 underline decoration-1 underline-offset-4 transition-colors hover:text-promo-bar-foreground md:inline"
      >
        WhatsApp
      </a>
    </div>
  )
}
