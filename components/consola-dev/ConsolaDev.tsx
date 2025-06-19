'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PantallaInicial } from '@/components/pantalla-inicial';
import { Toast } from '@/components/toast';
import { ResultadoTarea } from '@/components/resultado-tarea';
import { useTaskProgress } from './hooks/useTaskProgress';
import { useCodeVerification } from './hooks/useCodeVerification';
import { useToast } from './hooks/useToast';
import type { Error as ErrorType } from '@/types/tarea';
// Componentes de la interfaz
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { CompletionModal } from './components/CompletionModal/CompletionModal';

// Componentes de pestañas
import { CodeTab } from './components/Tabs/CodeTab/CodeTab';
import { ErrorsTab } from './components/Tabs/ErrorsTab/ErrorsTab';
import { InstructionsTab } from './components/Tabs/InstructionsTab/InstructionsTab';
import { DocumentationTab } from './components/Tabs/DocumentationTab/DocumentationTab';
import { tareas } from '@/data/tareas';

/**
 * Componente principal de la consola de desarrollo
 */
export default function ConsolaDev() {
  // Estados
  const [codigo, setCodigo] = useState('');
  const [mostrarConsola, setMostrarConsola] = useState(false);
  const [tareaCargada, setTareaCargada] = useState(false);
  
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

  const { toast, showError, hideToast } = useToast();

  // Efecto para cargar la tarea actual al montar el componente
  useEffect(() => {
    if (tareaActual && tareaCargada) {
      setCodigo(tareaActual.codigoInicial || '');
      setMostrarConsola(true);
    }
  }, [tareaActual, tareaCargada]);

  // Función para manejar la selección de tarea
  const handleTaskSelect = (taskId: string) => {
    const tarea = tareas.find(t => t.id === taskId);
    if (tarea) {
      setTareaActual(tarea);
      setTareaCargada(true);
    }
  };

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

  // Si no se ha mostrado la consola, mostrar pantalla inicial
  if (!mostrarConsola) {
    return <PantallaInicial onTaskSelect={handleTaskSelect} />;
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
          onClose={() => window.location.reload()}
          onSiguienteTarea={siguienteTarea}
        />
      )}
    </>
  );
}
