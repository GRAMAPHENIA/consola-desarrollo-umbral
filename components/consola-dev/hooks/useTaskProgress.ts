import { useState, useEffect } from 'react';
import { Tarea } from '../types';
import { tareas } from '@/data/tareas';
import { obtenerTareaActual, guardarProgreso } from '@/lib/progreso';

/**
 * Hook para manejar el progreso de las tareas
 * @returns Estado y funciones para manejar el progreso de las tareas
 */
export const useTaskProgress = () => {
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

    const tarea = tareas.find((t) => t.nivel === nivel);
    if (tarea) {
      setTareaActual(tarea);
    }
  }, []);

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
