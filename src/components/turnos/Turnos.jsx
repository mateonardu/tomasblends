import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '../../config/site.config'
import { crearTurno, getServicios } from '../../services/api'
import { formatFechaISO } from '../../utils/format'
import { useReveal } from '../../hooks/useReveal'
import { useTurnos } from './TurnosContext'
import PasoCategoria from './PasoCategoria'
import PasoFecha from './PasoFecha'
import PasoHorario from './PasoHorario'
import PasoDatos, { validarDatos } from './PasoDatos'
import Confirmacion from './Confirmacion'

const PASOS = ['Categoría', 'Servicio', 'Fecha', 'Horario', 'Tus datos']
const DATOS_INICIALES = { nombre: '', telefono: '', email: '' }

function irAServicios() {
  document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function IndicadorPasos({ actual, categoria, servicio, onCambiarCategoria, onCambiarServicio }) {
  // El chip de la derecha muestra lo último confirmado: el servicio una
  // vez elegido, o la categoría mientras se está eligiendo el servicio.
  const chip =
    servicio && actual >= 3
      ? { texto: servicio.nombre, onCambiar: onCambiarServicio }
      : categoria && actual === 2
        ? { texto: categoria.nombre, onCambiar: onCambiarCategoria }
        : null

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-secondary/70">
          Paso {actual} de {PASOS.length}:{' '}
          <span className="font-semibold text-secondary">{PASOS[actual - 1]}</span>
        </p>
        {chip && (
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary py-1.5 pr-1.5 pl-3 text-sm font-medium">
            {chip.texto}
            <button
              type="button"
              onClick={chip.onCambiar}
              className="rounded-full border border-surface bg-surface px-2.5 py-1 text-xs font-bold text-primary transition-colors hover:border-primary/40"
            >
              Cambiar
            </button>
          </span>
        )}
      </div>
      <div className="mt-3 flex gap-1.5" aria-hidden="true">
        {PASOS.map((nombre, i) => (
          <span
            key={nombre}
            className={`h-1.5 flex-1 rounded-full ${
              i < actual ? 'bg-primary' : 'bg-secondary'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function EstadoServicios() {
  const { estadoVacioTitulo, estadoVacioTexto, estadoVacioBoton } = siteConfig.textos.turnos

  return (
    <div className="py-6 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary font-body text-xl text-primary">
        2
      </div>
      <p className="font-heading text-xl font-semibold text-secondary">{estadoVacioTitulo}</p>
      <p className="mx-auto mt-2 max-w-xs text-sm text-secondary/70">{estadoVacioTexto}</p>
      <button
        type="button"
        onClick={irAServicios}
        className="mt-5 rounded-full border-2 border-secondary px-6 py-2.5 text-sm font-semibold text-secondary transition-colors hover:bg-secondary hover:text-foreground"
      >
        {estadoVacioBoton}
      </button>
    </div>
  )
}

export default function Turnos() {
  const { titulo, subtitulo } = siteConfig.textos.turnos
  const { servicio, elegirServicio, categoria, elegirCategoria } = useTurnos()
  const categoriaInfo =
    siteConfig.categoriasServicios.find((c) => c.id === categoria) ?? null
  const [paso, setPaso] = useState(1)
  const [fecha, setFecha] = useState(null)
  const [hora, setHora] = useState(null)
  const [datos, setDatos] = useState(DATOS_INICIALES)
  const [errores, setErrores] = useState({})
  // 'pasos' (wizard 1-5) → 'confirmada' (solo sin seña; con seña se
  // redirige a MercadoPago y la confirmación vive en /turnos/success)
  const [etapa, setEtapa] = useState('pasos')
  const [enviando, setEnviando] = useState(false)
  const [errorEnvio, setErrorEnvio] = useState(null)
  const [avisoSlot, setAvisoSlot] = useState(null)
  const [serviciosApi, setServiciosApi] = useState(null)
  const tarjetaRef = useRef(null)
  const [seccionRef, seccionVisible] = useReveal()

  // Servicios reales de la BD: hacen falta para reconciliar el servicio
  // elegido desde una card (que viene del id string del config) con su
  // equivalente real, cuyo id numérico espera la API al crear el turno.
  useEffect(() => {
    getServicios()
      .then(setServiciosApi)
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!serviciosApi || !servicio) return
    if (serviciosApi.some((s) => s.id === servicio.id)) return
    const real = serviciosApi.find((s) => s.nombre === servicio.nombre)
    elegirServicio(real ?? null)
  }, [serviciosApi, servicio, elegirServicio])

  // Los pasos de Fecha/Horario/Datos asumen un servicio ya confirmado
  // (ej. PasoHorario lee servicio.id). Si el servicio se pierde estando
  // en uno de esos pasos —la reconciliación de arriba no encontró un
  // servicio real con ese nombre en la API y lo dejó en null—, volvemos
  // al paso de selección en vez de dejarlos renderizar con servicio nulo.
  useEffect(() => {
    if (paso >= 3 && !servicio) {
      setPaso(2)
    }
  }, [paso, servicio])

  // Al cambiar de etapa la tarjeta se achica de golpe y el scroll quedaría
  // apuntando a las secciones de abajo: re-encuadramos el wizard.
  useEffect(() => {
    if (etapa !== 'pasos') {
      tarjetaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [etapa])

  // Selección nueva de servicio (desde una card, o cambiando de una a
  // otra): arranca el wizard limpio, directo en el paso de Fecha. Se
  // dispara por nombre y no por id para no reiniciar el progreso cuando
  // lo único que cambia es el id real reconciliado arriba (mismo servicio).
  useEffect(() => {
    if (!servicio) return
    setFecha(null)
    setHora(null)
    setDatos(DATOS_INICIALES)
    setErrores({})
    setAvisoSlot(null)
    setEtapa('pasos')
    setPaso(3)
  }, [servicio?.nombre])

  const elegirFecha = (nuevaFecha) => {
    setFecha(nuevaFecha)
    setHora(null)
    setAvisoSlot(null)
  }

  const cambiarDato = (clave, valor) => {
    setDatos((d) => ({ ...d, [clave]: valor }))
    setErrores(({ [clave]: _corregido, ...resto }) => resto)
  }

  const confirmarReserva = async () => {
    const nuevosErrores = validarDatos(datos)
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return

    setEnviando(true)
    setErrorEnvio(null)
    try {
      const { mpInitPoint } = await crearTurno({
        servicioId: servicio.id,
        fecha: formatFechaISO(fecha),
        horaInicio: hora,
        nombreCliente: datos.nombre.trim(),
        telefonoCliente: datos.telefono.trim(),
        emailCliente: datos.email.trim() || undefined,
      })

      if (mpInitPoint) {
        // Con seña: checkout real de MercadoPago. La confirmación
        // sigue en /turnos/success cuando MP redirige de vuelta.
        window.location.href = mpInitPoint
        return
      }
      // Sin seña: el backend ya lo confirmó.
      setEtapa('confirmada')
    } catch (error) {
      if (error.status === 409) {
        // Otro cliente ganó el slot mientras completaba sus datos.
        setHora(null)
        setAvisoSlot('Ese horario ya fue reservado. Elegí otro horario.')
        setPaso(4)
      } else {
        setErrorEnvio('No pudimos procesar tu reserva. Intentá de nuevo.')
      }
    } finally {
      setEnviando(false)
    }
  }

  const reiniciar = () => {
    elegirServicio(null)
    setPaso(2)
    setFecha(null)
    setHora(null)
    setDatos(DATOS_INICIALES)
    setErrores({})
    setEtapa('pasos')
  }

  // Elegir categoría (paso 0/1 del wizard): avanza directo al paso de
  // servicios, donde la grilla de Servicios.jsx ya queda filtrada.
  const elegirCategoriaYContinuar = (categoriaId) => {
    elegirCategoria(categoriaId)
    setPaso(2)
  }

  // Deselecciona la categoría y vuelve al paso 1: la usa el botón
  // "Cambiar" del chip de categoría y el Volver del paso de servicios.
  const cambiarCategoria = () => {
    elegirCategoria(null)
    elegirServicio(null)
    setFecha(null)
    setHora(null)
    setDatos(DATOS_INICIALES)
    setErrores({})
    setEtapa('pasos')
    setPaso(1)
  }

  // Deselecciona el servicio y vuelve a la sección de tarjetas (misma
  // categoría): lo usan tanto el botón "Cambiar" del chip como el Volver
  // del paso de Fecha.
  const cambiarServicio = () => {
    elegirServicio(null)
    setFecha(null)
    setHora(null)
    setDatos(DATOS_INICIALES)
    setErrores({})
    setEtapa('pasos')
    setPaso(2)
    irAServicios()
  }

  const volver = () => {
    if (paso === 2) return cambiarCategoria()
    if (paso === 3) return cambiarServicio()
    setPaso(paso - 1)
  }

  const puedeContinuar =
    (paso === 3 && fecha != null) || (paso === 4 && hora != null)

  return (
    <section id="turnos" className="px-6 py-16">
      <div
        ref={seccionRef}
        className={`reveal mx-auto max-w-xl ${seccionVisible ? 'reveal-visible' : ''}`}
      >
        <header className="mb-10 text-center">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            {titulo}
          </h2>
          <p className="mt-2 opacity-80">{subtitulo}</p>
        </header>

        <div
          ref={tarjetaRef}
          className="scroll-mt-24 overflow-hidden rounded-3xl bg-surface p-5 shadow-md sm:p-8"
        >
          <div
            key={etapa === 'pasos' ? `paso-${paso}` : etapa}
            className="animate-[aura-rise_0.4s_both] [animation-timing-function:cubic-bezier(0.22,0.61,0.36,1)]"
          >
            {etapa === 'confirmada' ? (
              <Confirmacion
                servicio={servicio}
                fecha={fecha}
                hora={hora}
                datos={datos}
                onReiniciar={reiniciar}
              />
            ) : (
              <>
                <IndicadorPasos
                  actual={paso}
                  categoria={categoriaInfo}
                  servicio={servicio}
                  onCambiarCategoria={cambiarCategoria}
                  onCambiarServicio={cambiarServicio}
                />

                {paso === 1 && (
                  <PasoCategoria
                    categorias={siteConfig.categoriasServicios}
                    onElegir={elegirCategoriaYContinuar}
                  />
                )}
                {paso === 2 && <EstadoServicios />}
                {paso === 3 && (
                  <PasoFecha fecha={fecha} onElegirFecha={elegirFecha} />
                )}
                {paso === 4 && (
                  <PasoHorario
                    servicio={servicio}
                    fecha={fecha}
                    hora={hora}
                    onElegirHora={(h) => {
                      setHora(h)
                      setAvisoSlot(null)
                    }}
                    aviso={avisoSlot}
                  />
                )}
                {paso === 5 && (
                  <PasoDatos
                    servicio={servicio}
                    fecha={fecha}
                    hora={hora}
                    datos={datos}
                    errores={errores}
                    onCambiar={cambiarDato}
                  />
                )}

                {paso >= 2 && (
                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={volver}
                      className="rounded-full border-2 border-secondary px-6 py-3 font-semibold text-secondary transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      Volver
                    </button>
                    {paso >= 3 &&
                      (paso < 5 ? (
                        <button
                          type="button"
                          disabled={!puedeContinuar}
                          onClick={() => setPaso(paso + 1)}
                          className="flex-1 rounded-full bg-primary px-6 py-3 font-semibold text-white transition-all enabled:hover:-translate-y-0.5 enabled:hover:opacity-90 disabled:opacity-40"
                        >
                          Continuar
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={confirmarReserva}
                          disabled={enviando}
                          className="flex-1 rounded-full bg-primary px-6 py-3 font-semibold text-white transition-all enabled:hover:-translate-y-0.5 enabled:hover:opacity-90 disabled:opacity-70"
                        >
                          {enviando
                            ? 'Procesando...'
                            : servicio?.porcentajeSena > 0
                              ? 'Continuar al pago'
                              : 'Confirmar reserva'}
                        </button>
                      ))}
                  </div>
                )}

                {errorEnvio && (
                  <p className="mt-3 rounded-xl bg-red-50 p-3 text-center text-sm text-red-600">
                    {errorEnvio}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
