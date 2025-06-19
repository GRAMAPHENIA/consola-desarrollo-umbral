"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  CheckCircle2,
  Code2,
  FileCode2,
  Terminal,
  FileText,
  Info,
  BookOpen,
  Lightbulb,
} from "lucide-react";
import { EditorCodigo } from "@/components/editor-codigo";
import { PanelErrores } from "@/components/panel-errores";
import { ResultadoTarea } from "@/components/resultado-tarea";
import { obtenerTareaActual, guardarProgreso } from "@/lib/progreso";
import type { Tarea, Error } from "@/types/tarea";
import { tareas } from "@/data/tareas";
import { CambiadorTema } from "@/components/ui/cambiador-tema";
import { PuntosNLP } from "@/components/puntos-nlp";
import { PantallaInicial } from "@/components/pantalla-inicial";
import { Toast } from "@/components/toast";

export default function ConsolaDev() {
  const [tareaActual, setTareaActual] = useState<Tarea | null>(null);
  const [nivelActual, setNivelActual] = useState<number>(1);
  const [codigo, setCodigo] = useState<string>("");
  const [mostrarResultado, setMostrarResultado] = useState<boolean>(false);
  const [completado, setCompletado] = useState<boolean>(false);
  const [puntosNLP, setPuntosNLP] = useState<number>(0);
  const [mostrarConsola, setMostrarConsola] = useState<boolean>(false);
  const [erroresActivos, setErroresActivos] = useState<Error[]>([]);
  const [erroresCorregidos, setErroresCorregidos] = useState<number[]>([]);
  const [toast, setToast] = useState<{message: string; type: 'success' | 'error'; show: boolean}>({message: '', type: 'success', show: false});

  // Cargar el progreso guardado al iniciar
  useEffect(() => {
    const progresoGuardado = obtenerTareaActual();
    const nivel = progresoGuardado?.nivel || 1;
    const puntos = progresoGuardado?.puntosNLP || 0;

    setNivelActual(nivel);
    setPuntosNLP(puntos);

    const tarea = tareas.find((t) => t.nivel === nivel);
    if (tarea) {
      setTareaActual(tarea);
      setCodigo(tarea.codigoInicial);
      setErroresActivos(tarea.errores);
      setErroresCorregidos([]);
    }
  }, []);

  // Verificar si se han corregido errores cuando cambia el código
  useEffect(() => {
    if (!tareaActual) return;

    // Verificar cada error para ver si ha sido corregido
    const nuevosErroresCorregidos: number[] = [];

    tareaActual.errores.forEach((error, index) => {
      // Verificar si el error ha sido corregido
      const estaCorregido = tareaActual.verificarErrorCorregido(
        codigo,
        error.linea
      );

      if (estaCorregido) {
        nuevosErroresCorregidos.push(index);
      }
    });

    setErroresCorregidos(nuevosErroresCorregidos);
  }, [codigo, tareaActual]);

  // Verificar si el código resuelve la tarea
  const verificarSolucion = () => {
    if (!tareaActual) return;

    // Comparamos con la solución o verificamos mediante una función
    const esCorrecto = tareaActual.verificarSolucion(codigo);

    if (esCorrecto) {
      setMostrarResultado(true);
      // Incrementar puntos NLP
      const nuevosPuntos = puntosNLP + 1;
      setPuntosNLP(nuevosPuntos);

      // Si es la última tarea, marcar como completado
      if (nivelActual >= tareas.length) {
        setCompletado(true);
      }

      // Guardar progreso
      guardarProgreso(nivelActual, nuevosPuntos);
    } else {
      // Mostrar mensaje de error con toast
      setToast({
        message: 'La solución no es correcta. Revisa los errores e inténtalo de nuevo.',
        type: 'error',
        show: true
      });
    }
  };

  // Avanzar a la siguiente tarea
  const siguienteTarea = () => {
    const siguienteNivel = nivelActual + 1;

    if (siguienteNivel <= tareas.length) {
      const nuevaTarea = tareas.find((t) => t.nivel === siguienteNivel);
      if (nuevaTarea) {
        setTareaActual(nuevaTarea);
        setCodigo(nuevaTarea.codigoInicial);
        setNivelActual(siguienteNivel);
        setMostrarResultado(false);
        setErroresActivos(nuevaTarea.errores);
        setErroresCorregidos([]);

        // Guardar progreso
        guardarProgreso(siguienteNivel, puntosNLP);
      }
    } else {
      setCompletado(true);
    }
  };

  const handlePantallaInicialCompleta = () => {
    setMostrarConsola(true);
  };

  if (!mostrarConsola) {
    return <PantallaInicial onTaskSelect={handlePantallaInicialCompleta} />;
  }

  if (!tareaActual) {
    return <div>Cargando...</div>;
  }

  // Calcular el número de errores pendientes
  const erroresPendientes =
    tareaActual.errores.length - erroresCorregidos.length;

  const closeToast = () => {
    setToast(prev => ({...prev, show: false}));
  };

  return (
    <>
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={closeToast}
          duration={5000}
        />
      )}
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
              <TabsTrigger
                value="codigo"
                className="data-[state=active]:border-b-2 rounded-none"
              >
                <Code2 className="h-4 w-4 mr-2" />
                Código
              </TabsTrigger>
              <TabsTrigger
                value="errores"
                className="data-[state=active]:border-b-2 rounded-none"
              >
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {erroresPendientes > 0 && (
                    <span className="text-zinc-800 font-medium mr-1">
                      {erroresPendientes}
                    </span>
                  )}
                  Errores
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="instrucciones"
                className="data-[state=active]:border-b-2 rounded-none"
              >
                <FileCode2 className="h-4 w-4 mr-2" />
                Instrucciones
              </TabsTrigger>
              <TabsTrigger
                value="documentacion"
                className="data-[state=active]:border-b-2 rounded-none"
              >
                <FileText className="h-4 w-4 mr-2" />
                Documentación
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="min-h-[500px] max-h-[500px] overflow-hidden">
            <TabsContent value="codigo" className="p-0 m-0 h-full">
              <div className="h-full flex flex-col">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold flex items-center text-foreground">
                    <Code2 className="h-5 w-5 mr-2 text-primary" />
                    Editor de Código
                  </h3>
                </div>
                <div className="flex-1 overflow-auto">
                  <EditorCodigo
                    codigo={codigo}
                    setCodigo={setCodigo}
                    lenguaje={tareaActual.lenguaje}
                    lineasEditables={tareaActual.lineasEditables}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="errores" className="p-0 m-0 h-full">
              <div className="h-full flex flex-col">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold flex items-center text-foreground">
                    <AlertCircle className="h-5 w-5 mr-2 text-primary" />
                    Panel de Errores
                    {erroresPendientes > 0 && (
                      <span className="ml-2 bg-destructive text-destructive-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                        {erroresPendientes} pendientes
                      </span>
                    )}
                  </h3>
                </div>
                <div className="flex-1 overflow-auto">
                  <PanelErrores
                    errores={tareaActual.errores}
                    erroresCorregidos={erroresCorregidos}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="instrucciones" className="p-0 m-0 h-full">
              <div className="h-full flex flex-col">
                <div className="p-4 border-b">
                  <h3 className="text-lg font-semibold flex items-center text-foreground">
                    <FileText className="h-5 w-5 mr-2 text-primary" />
                    Instrucciones del Desafío
                  </h3>
                </div>
                <div className="flex-1 overflow-auto p-6">
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center text-foreground border-b pb-2">
                        <Info className="w-5 h-5 mr-2 text-primary" />
                        Descripción
                      </h3>
                      <div className="prose dark:prose-invert max-w-none text-foreground/90 space-y-4 pl-2">
                        <p>{tareaActual.instrucciones}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center text-foreground border-b pb-2">
                        <BookOpen className="w-5 h-5 mr-2 text-primary" />
                        Objetivos de Aprendizaje
                      </h3>
                      <div className="prose dark:prose-invert max-w-none text-foreground/90 space-y-4 pl-2">
                        <p>{tareaActual.objetivo}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center text-foreground border-b pb-2">
                        <Lightbulb className="w-5 h-5 mr-2 text-primary" />
                        Consejos Útiles
                      </h3>
                      <ul className="space-y-3 text-foreground/80 pl-2">
                        <li className="flex items-start">
                          <span className="text-primary mr-2 mt-1">•</span>
                          <span>
                            Revisa la pestaña de errores para ver los problemas
                            detectados
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2 mt-1">•</span>
                          <span>
                            Haz clic en "Verificar Solución" para validar tus
                            cambios
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2 mt-1">•</span>
                          <span>
                            Utiliza la documentación como referencia cuando lo
                            necesites
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              value="documentacion"
              className="p-0 m-0 h-[500px] overflow-hidden"
            >
              <div className="h-full flex flex-col p-6">
                <h2 className="text-2xl font-bold mb-6 text-foreground">
                  Documentación de Ayuda
                </h2>
                <div className="flex-1 overflow-y-auto pr-2">
                  {tareaActual.documentacion ? (
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center text-foreground border-b pb-2">
                          <Info className="w-5 h-5 mr-2 text-primary" />
                          Sobre el Desafío
                        </h3>
                        <div className="space-y-3 pl-2">
                          <p className="flex items-start">
                            <span className="font-medium text-foreground/90 min-w-[60px]">
                              Tipo:
                            </span>
                            <span className="text-foreground/80">
                              {tareaActual.tipo.charAt(0).toUpperCase() +
                                tareaActual.tipo.slice(1)}
                            </span>
                          </p>
                          <p className="flex items-start">
                            <span className="font-medium text-foreground/90 min-w-[60px]">
                              Objetivo:
                            </span>
                            <span className="text-foreground/80">
                              {tareaActual.objetivo}
                            </span>
                          </p>
                          <p className="flex items-start">
                            <span className="font-medium text-foreground/90 min-w-[60px]">
                              Punto NLP:
                            </span>
                            <span className="text-foreground/80">
                              {tareaActual.puntoNLP}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center text-foreground border-b pb-2">
                          <BookOpen className="w-5 h-5 mr-2 text-primary" />
                          Guía de Solución
                        </h3>
                        <div className="prose dark:prose-invert max-w-none text-foreground/90 space-y-4 pl-2">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: tareaActual.documentacion
                                ? tareaActual.documentacion.replace(
                                    /<p>/g,
                                    '<p class="mb-4 last:mb-0">'
                                  )
                                : "",
                            }}
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center text-foreground border-b pb-2">
                          <Lightbulb className="w-5 h-5 mr-2 text-primary" />
                          Consejos Rápidos
                        </h3>
                        <ul className="space-y-3 text-foreground/80 pl-2">
                          {tareaActual.errores.map((error, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-primary mr-2 mt-1">•</span>
                              <span>
                                <span className="font-medium">
                                  Línea {error.linea}:
                                </span>{" "}
                                {error.mensaje}
                              </span>
                            </li>
                          ))}
                          <li className="flex items-start">
                            <span className="text-primary mr-2 mt-1">•</span>
                            <span>
                              Revisa la pestaña de errores para ver los
                              problemas detectados
                            </span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-primary mr-2 mt-1">•</span>
                            <span>
                              Haz clic en "Verificar Solución" para validar tus
                              cambios
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center p-6 max-w-md">
                        <Info className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-3 text-lg font-medium text-foreground">
                          Sin documentación disponible
                        </h3>
                        <p className="mt-2 text-foreground/70">
                          Este desafío no tiene documentación adicional. Revisa
                          las instrucciones y los errores para completarlo.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-sm text-foreground/70 text-center">
                    ¿Necesitas más ayuda? Intenta revisar la pestaña de
                    instrucciones o los mensajes de error.
                  </p>
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
                  Has completado todos los desafíos y has acumulado {puntosNLP}{" "}
                  puntos de Programación Neurolingüística.
                </p>
                <Button
                  variant="ghost"
                  onClick={() => window.location.reload()}
                >
                  Volver a empezar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Card>
    </>
  );
}
