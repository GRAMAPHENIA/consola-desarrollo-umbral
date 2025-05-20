"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Terminal } from "lucide-react"

export function PantallaInicial({ onComplete }: { onComplete: () => void }) {
  const [estado, setEstado] = useState<"cargando" | "mensaje" | "comandos">("cargando")
  const [textoTipeado, setTextoTipeado] = useState("")
  const mensajeCompleto = "Las funciones que escribís modifican la realidad."

  // Efecto para manejar la secuencia de carga
  useEffect(() => {
    // Paso 1: Mostrar "Cargando..." durante 5 segundos
    const timerCarga = setTimeout(() => {
      setEstado("mensaje")
    }, 5000)

    return () => clearTimeout(timerCarga)
  }, [])

  // Efecto para el tipeo del mensaje
  useEffect(() => {
    if (estado === "mensaje") {
      let index = 0
      const intervaloTipeo = setInterval(() => {
        if (index < mensajeCompleto.length) {
          setTextoTipeado(mensajeCompleto.substring(0, index + 1))
          index++
        } else {
          clearInterval(intervaloTipeo)

          // Mantener el mensaje visible durante 3 segundos
          const timerMensaje = setTimeout(() => {
            setEstado("comandos")
          }, 3000)

          return () => clearTimeout(timerMensaje)
        }
      }, 50) // Velocidad de tipeo

      return () => clearInterval(intervaloTipeo)
    }
  }, [estado, mensajeCompleto])

  // Efecto para manejar las teclas presionadas
  useEffect(() => {
    if (estado === "comandos") {
      const handleKeyPress = (event: KeyboardEvent) => {
        // Solo activar la tecla "c" para cognitiveBiases
        if (event.key.toLowerCase() === "c") {
          onComplete()
        }
      }

      window.addEventListener("keydown", handleKeyPress)
      return () => {
        window.removeEventListener("keydown", handleKeyPress)
      }
    }
  }, [estado, onComplete])

  // Función para manejar el clic en "Cognitive biases"
  const handleCognitiveBiasesClick = () => {
    onComplete()
  }

  // Renderizar las funciones con sus teclas rápidas
  const renderFuncion = (letra: string, nombre: string, activa: boolean, onClick: () => void = () => {}) => {
    return (
      <div className="flex items-center mb-2">
        <div
          className={`w-8 h-8 flex items-center justify-center mr-4 border rounded-lg ${
            activa ? "border-zinc-700 text-primary font-medium" : "border-zinc-500/30 text-muted-foreground/50"
          }`}
        >
          {letra}
        </div>
        <p
          className={
            activa
              ? "text-primary cursor-pointer hover:underline font-medium"
              : "text-muted-foreground/70 cursor-not-allowed"
          }
          onClick={activa ? onClick : undefined}
        >
          {nombre}
        </p>
      </div>
    )
  }

  return (
    <Card className="w-full max-w-5xl border border-dashed shadow-lg">
      <CardContent className="p-6 min-h-[400px] flex flex-col items-center justify-center">
        <Terminal className="h-10 w-10 mb-4" />

        {estado === "cargando" && <div className="text-xl font-mono animate-pulse">Cargando...</div>}

        {estado === "mensaje" && (
          <div className="text-xl font-mono">
            {textoTipeado}
            <span className="animate-blink">_</span>
          </div>
        )}

        {estado === "comandos" && (
          <div className="font-mono text-left w-full max-w-md">
            <p className="mb-4">Funciones disponibles:</p>
            {renderFuncion("C", "cognitiveBiases()", true, handleCognitiveBiasesClick)}
            {renderFuncion("I", "ignoreReality()", false)}
            {renderFuncion("D", "debugSelf()", false)}
            {renderFuncion("A", "accessPhilosophicalLayer()", false)}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
