import { createContext, useContext, useState } from 'react'

/**
 * Comparte el servicio (y su categoría) elegidos entre las cards de
 * Servicios y el wizard de Turnos: el botón "Reservar" de una card
 * preselecciona el servicio y ancla a #turnos, donde el wizard lo
 * muestra ya resaltado. La categoría permite filtrar la grilla de
 * Servicios desde el paso 1 del wizard (PasoCategoria).
 */
const TurnosContext = createContext(null)

export function TurnosProvider({ children }) {
  const [servicio, setServicio] = useState(null)
  const [categoria, setCategoria] = useState(null)

  return (
    <TurnosContext.Provider
      value={{
        servicio,
        elegirServicio: setServicio,
        categoria,
        elegirCategoria: setCategoria,
      }}
    >
      {children}
    </TurnosContext.Provider>
  )
}

export function useTurnos() {
  return useContext(TurnosContext)
}
