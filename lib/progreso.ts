// Función para guardar el progreso en localStorage
export const guardarProgreso = (nivel: number, puntosNLP: number): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "progreso-consola-dev",
      JSON.stringify({
        nivel,
        puntosNLP,
        fecha: new Date().toISOString(),
      }),
    )
  }
}

// Función para obtener el progreso guardado
export interface ProgresoGuardado {
  nivel: number
  puntosNLP: number
  fecha: string
}

export const obtenerTareaActual = (): ProgresoGuardado | null => {
  if (typeof window !== "undefined") {
    const progreso = localStorage.getItem("progreso-consola-dev")
    if (progreso) {
      return JSON.parse(progreso) as ProgresoGuardado
    }
  }
  return null
}

// Función para reiniciar el progreso
export const reiniciarProgreso = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("progreso-consola-dev")
  }
}
