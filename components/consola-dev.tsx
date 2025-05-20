"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle2, Code2, FileCode2, Terminal, FileText } from "lucide-react"
import { EditorCodigo } from "@/components/editor-codigo"
import { PanelErrores } from "@/components/panel-errores"
import { ResultadoTarea } from "@/components/resultado-tarea"
import { obtenerTareaActual, guardarProgreso } from "@/lib/progreso"
import type { Tarea, Error } from "@/types/tarea"
import { tareas } from "@/data/tareas"
import { CambiadorTema } from "@/components/cambiador-tema"
import { PuntosNLP } from "@/components/puntos-nlp"
import { PantallaInicial } from "@/components/pantalla-inicial"

export default function ConsolaDev() {
  const [tareaActual, setTareaActual] = useState<Tarea | null>(null)
  const [nivelActual, setNivelActual] = useState<number>(1)
  const [codigo, setCodigo] = useState<string>("")
  const [mostrarResultado, setMostrarResultado] = useState<boolean>(false)
  const [completado, setCompletado] = useState<boolean>(false)
  const [puntosNLP, setPuntosNLP] = useState<number>(0)
  const [mostrarConsola, setMostrarConsola] = useState<boolean>(false)
  const [erroresActivos, setErroresActivos] = useState<Error[]>([])
  const [erroresCorregidos, setErroresCorregidos] = useState<number[]>([])

  // Cargar el progreso guardado al iniciar
  useEffect(() => {
    const progresoGuardado = obtenerTareaActual()
    const nivel = progresoGuardado?.nivel || 1
    const puntos = progresoGuardado?.puntosNLP || 0

    setNivelActual(nivel)
    setPuntosNLP(puntos)

    const tarea = tareas.find((t) => t.nivel === nivel)
    if (tarea) {
      setTareaActual(tarea)
      setCodigo(tarea.codigoInicial)
      setErroresActivos(tarea.errores)
      setErroresCorregidos([])
    }
  }, [])

  // Verificar si se han corregido errores cuando cambia el código
  useEffect(() => {
    if (!tareaActual) return

    // Verificar cada error para ver si ha sido corregido
    const nuevosErroresCorregidos: number[] = []

    tareaActual.errores.forEach((error, index) => {
      // Verificar si el error ha sido corregido
      const estaCorregido = tareaActual.verificarErrorCorregido(codigo, error.linea)

      if (estaCorregido) {
        nuevosErroresCorregidos.push(index)
      }
    })

    setErroresCorregidos(nuevosErroresCorregidos)
  }, [codigo, tareaActual])

  // Verificar si el código resuelve la tarea
  const verificarSolucion = () => {
    if (!tareaActual) return

    // Comparamos con la solución o verificamos mediante una función
    const esCorrecto = tareaActual.verificarSolucion(codigo)

    if (esCorrecto) {
      setMostrarResultado(true)
      // Incrementar puntos NLP
      const nuevosPuntos = puntosNLP + 1
      setPuntosNLP(nuevosPuntos)

      // Si es la última tarea, marcar como completado
      if (nivelActual >= tareas.length) {
        setCompletado(true)
      }

      // Guardar progreso
      guardarProgreso(nivelActual, nuevosPuntos)
    } else {
      // Mostrar mensaje de error
      alert("La solución no es correcta. Revisa los errores e inténtalo de nuevo.")
    }
  }

  // Avanzar a la siguiente tarea
  const siguienteTarea = () => {
    const siguienteNivel = nivelActual + 1

    if (siguienteNivel <= tareas.length) {
      const nuevaTarea = tareas.find((t) => t.nivel === siguienteNivel)
      if (nuevaTarea) {
        setTareaActual(nuevaTarea)
        setCodigo(nuevaTarea.codigoInicial)
        setNivelActual(siguienteNivel)
        setMostrarResultado(false)
        setErroresActivos(nuevaTarea.errores)
        setErroresCorregidos([])

        // Guardar progreso
        guardarProgreso(siguienteNivel, puntosNLP)
      }
    } else {
      setCompletado(true)
    }
  }

  const handlePantallaInicialCompleta = () => {
    setMostrarConsola(true)
  }

  if (!mostrarConsola) {
    return <PantallaInicial onComplete={handlePantallaInicialCompleta} />
  }

  if (!tareaActual) {
    return <div>Cargando...</div>
  }

  // Calcular el número de errores pendientes
  const erroresPendientes = tareaActual.errores.length - erroresCorregidos.length

  return (
    <Card className="w-full max-w-5xl border border-dashed shadow-lg">
      <CardContent className="p-0">
        <div className="flex items-center justify-between border-b border-dashed p-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            <h1 className="text-xl font-bold">Consola de Desarrollo</h1>
            <Badge variant="outline" className="ml-2">
              Nivel {nivelActual}
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <PuntosNLP puntos={puntosNLP} />
            <CambiadorTema />
          </div>
        </div>

        <Tabs defaultValue="codigo" className="w-full">
          <div className="border-b border-dashed">
            <TabsList className="p-0 bg-transparent border-b-0">
              <TabsTrigger value="codigo" className="data-[state=active]:border-b-2 rounded-none">
                <Code2 className="h-4 w-4 mr-2" />
                Código
              </TabsTrigger>
              <TabsTrigger value="errores" className="data-[state=active]:border-b-2 rounded-none">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {erroresPendientes > 0 && <span className="text-zinc-800 font-medium mr-1">{erroresPendientes}</span>}
                  Errores
                </div>
              </TabsTrigger>
              <TabsTrigger value="instrucciones" className="data-[state=active]:border-b-2 rounded-none">
                <FileCode2 className="h-4 w-4 mr-2" />
                Instrucciones
              </TabsTrigger>
              <TabsTrigger value="documentacion" className="data-[state=active]:border-b-2 rounded-none">
                <FileText className="h-4 w-4 mr-2" />
                Documentación
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="min-h-[400px]">
            <TabsContent value="codigo" className="p-4 m-0 h-full">
              <EditorCodigo
                codigo={codigo}
                setCodigo={setCodigo}
                lenguaje={tareaActual.lenguaje}
                lineasEditables={tareaActual.lineasEditables}
              />
            </TabsContent>

            <TabsContent value="errores" className="p-4 m-0 h-full">
              <PanelErrores errores={tareaActual.errores} erroresCorregidos={erroresCorregidos} />
            </TabsContent>

            <TabsContent value="instrucciones" className="p-4 m-0 h-full">
              <div className="prose dark:prose-invert max-w-none">
                <h3>Instrucciones</h3>
                <p>{tareaActual.instrucciones}</p>
                <h4>Objetivo</h4>
                <p>{tareaActual.objetivo}</p>
              </div>
            </TabsContent>

            <TabsContent value="documentacion" className="p-4 m-0 h-full">
              <div className="prose dark:prose-invert max-w-none">
                <h3>Documentación</h3>
                <div className="overflow-y-auto h-[320px]">
                  {tareaActual.documentacion ? (
                    <div dangerouslySetInnerHTML={{ __html: tareaActual.documentacion }} />
                  ) : (
                    <p className="text-muted-foreground">No hay documentación disponible para este desafío.</p>
                  )}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <div className="border-t border-dashed p-4 flex justify-between items-center">
          <div>
            <Badge variant="secondary" className="mr-2">
              {tareaActual.tipo}
            </Badge>
            <Badge variant="outline">{tareaActual.lenguaje}</Badge>
          </div>
          <Button variant="ghost" onClick={verificarSolucion}>
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Verificar Solución
          </Button>
        </div>
      </CardContent>

      {mostrarResultado && (
        <ResultadoTarea
          tarea={tareaActual}
          onCerrar={siguienteTarea}
          esUltimaTarea={nivelActual >= tareas.length}
          puntosNLP={puntosNLP}
        />
      )}

      {completado && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle2 className="h-16 w-16 mx-auto text-green-500 mb-4" />
                <h2 className="text-2xl font-bold mb-2">¡Felicidades!</h2>
                <p className="mb-4">
                  Has completado todos los desafíos y has acumulado {puntosNLP} puntos de Programación Neurolingüística.
                </p>
                <Button variant="ghost" onClick={() => window.location.reload()}>
                  Volver a empezar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Card>
  )
}
