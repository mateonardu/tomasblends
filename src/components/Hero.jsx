import { siteConfig } from '../config/site.config'

// Tailwind extrae clases del texto fuente tal cual está escrito, así que los
// delays van como literales completos (no se pueden armar con template
// strings interpoladas: Tailwind no vería la clase resultante).
const ANIM_TIMING =
  'animate-[aura-rise_0.55s_both] [animation-timing-function:cubic-bezier(0.22,0.61,0.36,1)]'
const ANIM_0 = `${ANIM_TIMING} [animation-delay:0s]`
const ANIM_12 = `${ANIM_TIMING} [animation-delay:0.08s]`
const ANIM_24 = `${ANIM_TIMING} [animation-delay:0.16s]`
const ANIM_36 = `${ANIM_TIMING} [animation-delay:0.24s]`
const ANIM_50 = `${ANIM_TIMING} [animation-delay:0.32s]`
const ANIM_IMAGEN =
  'animate-[aura-rise_0.6s_both] [animation-timing-function:cubic-bezier(0.22,0.61,0.36,1)]'

export default function Hero() {
  const { marca, textos } = siteConfig
  const { hero } = textos

  return (
    <section
      id="inicio"
      aria-label={marca.nombre}
      className="relative min-h-[clamp(560px,88vh,860px)] overflow-hidden bg-background"
    >
      {/* Hero split: la imagen vive en su propia franja a la derecha, nunca
          debajo de la columna de texto. object-fit:cover en un contenedor
          full-bleed no garantiza eso (con cajas muy anchas el navegador no
          tiene margen horizontal para recortar y el sujeto queda centrado,
          justo donde está el texto) — por eso el corte es un límite real,
          no un degradado sobre la imagen entera.
          Cortes en px fijos entre md y xl (1280px, ya pasado el ancho del
          contenedor de 1240px); de ahí en adelante ya es seguro usar %
          porque el contenedor deja de crecer. Se usa el breakpoint `xl`
          de Tailwind (no uno arbitrario `min-[]`) porque un arbitrario no
          siempre gana la cascada frente a `md` al mismo ancho. Margen de
          ~90-100px después del borde real de la columna de texto en
          todos los anchos. */}
      <div className="absolute inset-y-0 left-0 right-0 md:left-[610px] xl:left-[50%]">
        <img
          src={marca.heroImagen}
          alt=""
          className={`h-full w-full object-cover object-[46%_20%] md:object-[48%_50%] ${ANIM_IMAGEN}`}
        />
        {/* velo sólido: en mobile la franja ocupa todo el ancho, así que hace
            falta para que el texto siga siendo legible sobre la foto */}
        <div className="absolute inset-0 bg-background/85 md:hidden" aria-hidden="true" />
        {/* fundido suave en el borde de la franja, ya con la imagen acotada.
            Dos stops (opaco → transparente) se leían como corte duro contra
            zonas claras de la foto (la capa blanca), así que el fundido usa
            un stop intermedio (curva ease-out). El ancho es en % del propio
            ancho de la franja (no px fijo): la franja va de ~158px en md a
            varios cientos de px en desktop ancho, y un ancho fijo quedaba
            perceptible como corte duro en las pantallas grandes (donde antes
            era una fracción mínima de la franja) o tapaba toda la franja en
            las chicas. clamp() mantiene el mismo comportamiento de antes en
            el extremo angosto (96px mínimo) y crece proporcional arriba de
            eso, con un tope para no lavar demasiada foto en monitores muy
            anchos. */}
        <div
          className="absolute inset-y-0 left-0 hidden w-[clamp(96px,32%,320px)] bg-[linear-gradient(to_right,var(--color-background)_0%,var(--color-background)_15%,color-mix(in_oklab,var(--color-background)_45%,transparent)_55%,transparent_100%)] md:block"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto flex min-h-[clamp(560px,88vh,860px)] max-w-[1240px] items-center px-[clamp(20px,5vw,64px)] py-[clamp(40px,7vh,84px)]">
        <div className="flex max-w-[440px] flex-col justify-center">
          <p
            className={`mb-[18px] text-[12.5px] font-bold tracking-[0.22em] text-primary uppercase ${ANIM_0}`}
          >
            {hero.eyebrow}
          </p>

          <h1
            className={`mb-5 font-heading text-[clamp(36px,5vw,58px)] leading-[1.12] font-semibold tracking-[-0.01em] text-foreground text-balance ${ANIM_12}`}
          >
            {hero.tituloPrincipal}
            <br />
            <em className="text-primary italic">{hero.tituloEnfasis}</em>
          </h1>

          <p
            className={`mb-8 max-w-[48ch] text-[clamp(15.5px,1.4vw,18px)] leading-[1.65] text-foreground/65 text-pretty ${ANIM_24}`}
          >
            {hero.subcopy}
          </p>

          <div className={`flex flex-wrap items-center gap-[18px] ${ANIM_36}`}>
            <a
              href="#turnos"
              className="inline-flex items-center gap-2.5 rounded-full bg-primary px-[34px] py-[17px] text-[16.5px] font-bold text-white shadow-[0_10px_28px_rgba(138,113,72,.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-[0_14px_34px_rgba(138,113,72,.42)]"
            >
              {hero.ctaPrimario}
            </a>
          </div>

          <div className={`mt-[34px] flex items-center gap-2.5 text-[13.5px] text-foreground/60 ${ANIM_50}`}>
            <span className="text-sm tracking-[2px] text-estrellas">★★★★★</span>
            <span>
              <strong className="text-foreground">{hero.ratingValor}</strong> {hero.ratingTexto}
            </span>
          </div>
        </div>
      </div>

      <div
        className={`absolute right-[clamp(20px,5vw,64px)] bottom-[clamp(88px,12vh,120px)] flex items-center gap-2 rounded-full bg-surface/90 px-4 py-[9px] text-[13px] font-semibold whitespace-nowrap text-secondary shadow-[0_6px_20px_rgba(61,50,54,.12)] backdrop-blur-sm ${ANIM_50}`}
      >
        <span className="h-2 w-2 rounded-full bg-exito" />
        {hero.disponibilidad}
      </div>
    </section>
  )
}
