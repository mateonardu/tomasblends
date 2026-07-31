import { siteConfig } from '../config/site.config'

function IconoGoogle({ className }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
        c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
        c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039
        l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
        c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      />
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
        c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </svg>
  )
}

export default function ResenasGoogle() {
  const { rating, cantidad, link } = siteConfig.resenasGoogle

  return (
    <section id="resenas-google" className="bg-surface px-6 py-[60px] md:py-[100px]">
      <div className="mx-auto flex max-w-[600px] flex-col items-center text-center">
        <span
          aria-hidden="true"
          className="text-[16px] leading-none tracking-[3px] text-estrellas md:text-[19px]"
        >
          ★★★★★
        </span>

        <p className="mt-4 text-[11.5px] font-bold tracking-[0.04em] text-accent uppercase md:mt-5 md:text-[14.5px]">
          {rating} · {cantidad} reseñas en Google
        </p>

        <h2 className="mt-3 font-heading text-[29px] font-medium leading-[1.15] text-background md:mt-4 md:text-[48px]">
          ¿Ya pasaste por Look & Arte?
        </h2>

        <p className="mt-3 text-[14px] text-background/65 md:mt-4 md:text-[17px]">
          Tu opinión ayuda a que más personas nos encuentren.
        </p>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Dejar una reseña de Look & Arte en Google (se abre en una pestaña nueva)"
          className="mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-background px-5 py-3 text-[14px] font-bold text-primary transition-[filter] duration-200 hover:brightness-125 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:mt-8 md:w-auto md:px-8 md:py-4 md:text-[15px]"
        >
          <IconoGoogle className="h-[18px] w-[18px] shrink-0" />
          <span className="md:hidden">Dejar mi reseña</span>
          <span className="hidden md:inline">Dejar mi reseña en Google</span>
        </a>
      </div>
    </section>
  )
}
