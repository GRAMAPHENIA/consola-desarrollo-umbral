import { AlertCircle, XCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Error } from "@/types/tarea"

interface PanelErroresProps {
  errores: Error[]
  erroresCorregidos: number[]
}

export function PanelErrores({ errores, erroresCorregidos }: PanelErroresProps) {
  if (errores.length === 0) {
    return (
      <div className="flex items-center justify-center h-[320px] text-muted-foreground">
        No hay errores para mostrar
      </div>
    )
  }

  return (
    <ScrollArea className="h-[320px]">
      <div className="space-y-4 p-1">
        {errores.map((error, index) => {
          const estaCorregido = erroresCorregidos.includes(index)

          return (
            <Alert
              key={index}
              variant={estaCorregido ? "default" : error.tipo === "error" ? "destructive" : "default"}
              className={estaCorregido ? "border-teal-500 bg-teal-500/10" : ""}
            >
              {estaCorregido ? <CheckCircle className="h-4 w-4 text-teal-500" /> : <AlertCircle className="h-4 w-4" />}

              <AlertTitle className="flex items-center gap-2">
                {estaCorregido ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-teal-500" /> Error corregido en línea {error.linea}
                  </>
                ) : error.tipo === "error" ? (
                  <>
                    <XCircle className="h-4 w-4" /> Error en línea {error.linea}
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4" /> Advertencia en línea {error.linea}
                  </>
                )}
              </AlertTitle>
              <AlertDescription>{error.mensaje}</AlertDescription>
            </Alert>
          )
        })}
      </div>
    </ScrollArea>
  )
}
