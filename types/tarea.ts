import type React from "react"
export interface Error {
  tipo: "error" | "advertencia"
  linea: number
  mensaje: string
}

export interface Tarea {
  id: string
  nivel: number
  tipo: "psicológico" | "filológico" | "filosófico"
  titulo: string
  instrucciones: string
  objetivo: string
  lenguaje: string
  codigoInicial: string
  codigoSolucion: string
  errores: Error[]
  mensajeExito: string
  puntoNLP: string
  documentacion: string
  demostracion: React.ReactNode | null
  lineasEditables: number[]
  verificarSolucion: (codigo: string) => boolean
  verificarErrorCorregido: (codigo: string, linea: number) => boolean
}
