'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PantallaInicial } from '@/components/pantalla-inicial';
import { Toast } from '@/components/toast';
import { ResultadoTarea } from '@/components/resultado-tarea';
import { useTaskProgress } from './hooks';
import { useCodeVerification } from './hooks/useCodeVerification';
import { useToast } from './hooks/useToast';
import { Header, Footer, CompletionModal } from './components';
import { CodeTab, ErrorsTab, InstructionsTab, DocumentationTab } from './components/Tabs';
import { tareas } from '@/data/tareas';

/**
 * Componente principal de la consola de desarrollo
 */
export default function ConsolaDev() {
  // Estado del código y la interfaz
  const [codigo, setCodigo] = useState<string>('');
  const [mostrarConsola, setMostrarConsola] = useState<boolean>(false);
  
  // Hooks personalizados
  const {
    tareaActual,
    nivelActual,
    puntosNLP,
    completado,
    siguienteTarea,
    actualizarPuntosNLP,
    setTareaActual,
  } = useTaskProgress();

  const {
    erroresActivos,
    erroresCorregidos,
    mostrarResultado,
    verificarSolucion,
    setMostrarResultado,
  } = useCodeVerification(tareaActual, codigo);

  const { toast, hideToast } = useToast();

  // Inicializar el código cuando cambia la tarea actual
  useEffect(() => {
    if (tareaActual) {
      setCodigo(tareaActual.codigoInicial);
    }
  }, [tareaActual]);

  // Manejar la verificación de la solución
  const handleVerificarSolucion = () => {
    if (!tareaActual) return;

    const esCorrecto = verificarSolucion();
    
    if (esCorrecto) {
      // Incrementar puntos NLP
      actualizarPuntosNLP(puntosNLP + 1);
    } else {
      // Mostrar mensaje de error
      showError('La solución no es correcta. Revisa los errores e inténtalo de nuevo.');
    }
  };

  // Mostrar mensajes de error
  const showError = (message: string) => {
    hideToast();
    setTimeout(() => {
      // Usar el hook de toast para mostrar el mensaje
      // Esto es un ejemplo, ajusta según tu implementación real
      console.error(message);
    }, 100);
  };

  // Si no se ha mostrado la consola, mostrar pantalla inicial
  if (!mostrarConsola) {
    return <PantallaInicial onComplete={() => setMostrarConsola(true)} />;
  }

  // Si no hay tarea actual, mostrar carga
  if (!tareaActual) {
    return <div>Cargando...</div>;
  }

  // Calcular el número de errores pendientes
  const erroresPendientes = tareaActual.errores.length - erroresCorregidos.length;

  return (
    <>
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={hideToast}
          duration={5000}
        />
      )}
      
      <Card className="w-full max-w-5xl border border-dashed shadow-lg">
        <CardContent className="p-0">
          <Header nivelActual={nivelActual} puntosNLP={puntosNLP} />

          <Tabs defaultValue="codigo" className="w-full">
            <div className="border-b border-dashed">
              <TabsList className="p-0 bg-transparent border-b-0">
                <TabsTrigger value="codigo" className="data-[state=active]:border-b-2 rounded-none">
                  <span className="flex items-center">
                    <span className="mr-2">💻</span>
                    Código
                  </span>
                </TabsTrigger>
                <TabsTrigger value="errores" className="data-[state=active]:border-b-2 rounded-none">
                  <div className="flex items-center">
                    <span className="mr-2">⚠️</span>
                    {erroresPendientes > 0 && (
                      <span className="text-zinc-800 font-medium mr-1">
                        {erroresPendientes}
                      </span>
                    )}
                    Errores
                  </div>
                </TabsTrigger>
                <TabsTrigger value="instrucciones" className="data-[state=active]:border-b-2 rounded-none">
                  <span className="flex items-center">
                    <span className="mr-2">📝</span>
                    Instrucciones
                  </span>
                </TabsTrigger>
                <TabsTrigger value="documentacion" className="data-[state=active]:border-b-2 rounded-none">
                  <span className="flex items-center">
                    <span className="mr-2">📚</span>
                    Documentación
                  </span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="min-h-[500px] max-h-[500px] overflow-hidden">
              <TabsContent value="codigo" className="p-0 m-0 h-full">
                <CodeTab 
                  codigo={codigo}
                  setCodigo={setCodigo}
                  lenguaje={tareaActual.lenguaje}
                  lineasEditables={tareaActual.lineasEditables}
                />
              </TabsContent>

              <TabsContent value="errores" className="p-0 m-0 h-full">
                <ErrorsTab 
                  errores={erroresActivos}
                  erroresCorregidos={erroresCorregidos}
                  erroresPendientes={erroresPendientes}
                />
              </TabsContent>

              <TabsContent value="instrucciones" className="p-0 m-0 h-full">
                <InstructionsTab 
                  instrucciones={tareaActual.instrucciones}
                  objetivo={tareaActual.objetivo}
                />
              </TabsContent>

              <TabsContent value="documentacion" className="p-0 m-0 h-[500px] overflow-hidden">
                <DocumentationTab tareaActual={tareaActual} />
              </TabsContent>
            </div>
          </Tabs>

          <Footer 
            tipo={tareaActual.tipo}
            lenguaje={tareaActual.lenguaje}
            onVerificarSolucion={handleVerificarSolucion}
          />
        </CardContent>
      </Card>

      {mostrarResultado && (
        <ResultadoTarea
          tarea={tareaActual}
          onCerrar={() => setMostrarResultado(false)}
          esUltimaTarea={nivelActual >= tareas.length}
          puntosNLP={puntosNLP}
        />
      )}

      {completado && (
        <CompletionModal 
          puntosNLP={puntosNLP}
          esUltimaTarea={true}
          onCerrar={() => window.location.reload()}
          onSiguienteTarea={siguienteTarea}
        />
      )}
    </>
  );
}
