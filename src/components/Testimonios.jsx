import { siteConfig } from '../config/site.config'
import { useReveal } from '../hooks/useReveal'

const CARD_ANCHO_ESTIMADO = 340 // 320px de tarjeta + 20px de gap
const MEDIO_ANCHO_MINIMO = 2600 // más ancho que cualquier viewport real
const VELOCIDAD_PX_POR_SEG = 27

export default function Testimonios() {
  const { titulo, subtitulo } = siteConfig.textos.testimonios
  const { testimonios } = siteConfig
  const [headerRef, headerVisible] = useReveal()
  const [trackRef, trackVisible] = useReveal()

  // El marquee duplica el set y anima -50% del ancho total: para que
  // nunca se vea el final del track antes de que vuelva a arrancar,
  // cada mitad tiene que ser más ancha que el viewport. Con pocos
  // testimonios un solo set no alcanza, así que se repite las veces
  // que hagan falta (y la duración escala con el ancho para que la
  // velocidad de desplazamiento se sienta igual sea cual sea el largo).
  const repeticionesPorMitad = Math.max(
    2,
    Math.ceil(MEDIO_ANCHO_MINIMO / (testimonios.length * CARD_ANCHO_ESTIMADO)),
  )
  const mitadAnchoEstimado =
    repeticionesPorMitad * testimonios.length * CARD_ANCHO_ESTIMADO
  const duracionSeg = Math.round(mitadAnchoEstimado / VELOCIDAD_PX_POR_SEG)
  const tarjetas = Array.from(
    { length: repeticionesPorMitad * 2 },
    () => testimonios,
  ).flat()

  return (
    <section id="testimonios" className="overflow-hidden py-16">
      <header
        ref={headerRef}
        className={`reveal mb-9 px-6 text-center ${headerVisible ? 'reveal-visible' : ''}`}
      >
        <h2 className="font-heading text-3xl font-bold md:text-4xl">
          {titulo}
        </h2>
        <p className="mt-2 opacity-80">{subtitulo}</p>
      </header>

      <div
        ref={trackRef}
        className={`reveal [-webkit-mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)] [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)] ${
          trackVisible ? 'reveal-visible' : ''
        }`}
      >
        <ul
          className="marquee-track animate-[aura-marquee_1s_linear_infinite] flex w-max gap-5 py-1.5"
          style={{ animationDuration: `${duracionSeg}s` }}
        >
          {tarjetas.map((testimonio, i) => (
            <li
              key={`${testimonio.nombre}-${i}`}
              className="w-[min(320px,78vw)] flex-none rounded-2xl border border-secondary bg-surface p-6 shadow-[0_8px_26px_rgba(74,53,59,.06)]"
            >
              <figure className="flex h-full flex-col gap-4">
                <span aria-hidden="true" className="text-sm tracking-[2px] text-estrellas">
                  ★★★★★
                </span>
                <blockquote className="flex-1 font-heading text-[16.5px] leading-relaxed text-secondary italic">
                  “{testimonio.texto}”
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary font-heading text-primary"
                  >
                    {testimonio.nombre[0]}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold text-secondary">{testimonio.nombre}</span>
                    {testimonio.servicio && (
                      <span className="text-xs text-accent">{testimonio.servicio}</span>
                    )}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
