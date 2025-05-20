"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Brain } from "lucide-react"
import type { Tarea } from "@/types/tarea"

interface ResultadoTareaProps {
  tarea: Tarea
  onCerrar: () => void
  esUltimaTarea: boolean
  puntosNLP: number
}

export function ResultadoTarea({ tarea, onCerrar, esUltimaTarea, puntosNLP }: ResultadoTareaProps) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            ¡Tarea Completada!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>{tarea.mensajeExito}</p>

            <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-md">
              <Brain className="h-5 w-5 text-primary" />
              <p className="text-sm font-medium">
                Has ganado un punto de Programación Neurolingüística. Total: {puntosNLP}
              </p>
            </div>

            {tarea.puntoNLP && (
              <div className="border rounded-md p-4 bg-muted/30">
                <h3 className="text-sm font-medium mb-2">Punto de Programación Neurolingüística:</h3>
                <p className="text-sm italic">{tarea.puntoNLP}</p>
              </div>
            )}

            {tarea.demostracion && (
              <div className="border rounded-md p-4 bg-muted/30">
                <h3 className="text-sm font-medium mb-2">Demostración:</h3>
                <div className="p-4 bg-card rounded border">{tarea.demostracion}</div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" onClick={onCerrar}>
            {esUltimaTarea ? "Finalizar" : "Siguiente Desafío"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
