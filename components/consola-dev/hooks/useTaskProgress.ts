import { useState, useEffect } from 'react';
import { Tarea } from '@/types/tarea';
import { obtenerTareaActual, guardarProgreso } from '@/lib/progreso';

interface UseTaskProgressProps {
  tareas: Tarea[];
}

/**
 * Hook para manejar el progreso de las tareas
 * @param tareas - Lista de tareas disponibles
 * @returns Estado y funciones para manejar el progreso de las tareas
 */
export const useTaskProgress = ({ tareas = [] }: Partial<UseTaskProgressProps> = {}) => {
  const [tareaActual, setTareaActual] = useState<Tarea | null>(null);
  const [nivelActual, setNivelActual] = useState<number>(1);
  const [puntosNLP, setPuntosNLP] = useState<number>(0);
  const [completado, setCompletado] = useState<boolean>(false);

  // Cargar el progreso guardado al iniciar
  useEffect(() => {
    const progresoGuardado = obtenerTareaActual();
    const nivel = progresoGuardado?.nivel || 1;
    const puntos = progresoGuardado?.puntosNLP || 0;

    setNivelActual(nivel);
    setPuntosNLP(puntos);

    if (tareas && tareas.length > 0) {
      const tarea = tareas.find((t) => t.nivel === nivel);
      if (tarea) {
        setTareaActual(tarea);
      } else if (tareas.length > 0) {
        // Si no se encuentra la tarea, usar la primera
        setTareaActual(tareas[0]);
        setNivelActual(tareas[0].nivel);
      }
    }
  }, [tareas]);

  /**
   * Avanzar a la siguiente tarea
   */
  const siguienteTarea = () => {
    const siguienteNivel = nivelActual + 1;

    if (siguienteNivel <= tareas.length) {
      const nuevaTarea = tareas.find((t) => t.nivel === siguienteNivel);
      if (nuevaTarea) {
        setTareaActual(nuevaTarea);
        setNivelActual(siguienteNivel);
        guardarProgreso(siguienteNivel, puntosNLP);
      }
    } else {
      setCompletado(true);
    }
  };

  /**
   * Actualizar los puntos NLP
   * @param nuevosPuntos Nuevo valor de puntos NLP
   */
  const actualizarPuntosNLP = (nuevosPuntos: number) => {
    setPuntosNLP(nuevosPuntos);
    guardarProgreso(nivelActual, nuevosPuntos);
  };

  return {
    tareaActual,
    nivelActual,
    puntosNLP,
    completado,
    siguienteTarea,
    actualizarPuntosNLP,
    setTareaActual,
  };
};
