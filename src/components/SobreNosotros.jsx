import { siteConfig } from '../config/site.config'
import { useReveal } from '../hooks/useReveal'

export default function SobreNosotros() {
  const { titulo, texto, firma } = siteConfig.sobreNosotros
  const parrafos = texto.split('\n\n')
  const [ref, visible] = useReveal()

  return (
    <section id="sobre-nosotros" className="px-6 py-16">
      <div
        ref={ref}
        className={`reveal mx-auto max-w-[640px] text-center ${visible ? 'reveal-visible' : ''}`}
      >
        <h2 className="font-heading text-3xl font-bold md:text-4xl">{titulo}</h2>

        <div className="mt-7 flex flex-col gap-4 text-left text-[15.5px] leading-relaxed text-foreground/80">
          {parrafos.map((parrafo, i) => (
            <p key={i}>{parrafo}</p>
          ))}
        </div>

        <p className="mt-6 font-heading text-lg text-foreground/60 italic">— {firma}</p>
      </div>
    </section>
  )
}
