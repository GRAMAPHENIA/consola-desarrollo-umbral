import { useState, useEffect } from 'react';
import { Tarea, Error } from '../types';

/**
 * Hook para manejar la verificación de código y detección de errores
 * @param tareaActual Tarea actual
 * @param codigo Código actual del editor
 * @returns Estado y funciones para verificación de código
 */
export const useCodeVerification = (tareaActual: Tarea | null, codigo: string) => {
  const [erroresActivos, setErroresActivos] = useState<Error[]>([]);
  const [erroresCorregidos, setErroresCorregidos] = useState<number[]>([]);
  const [mostrarResultado, setMostrarResultado] = useState<boolean>(false);

  // Inicializar errores activos cuando cambia la tarea
  useEffect(() => {
    if (tareaActual) {
      setErroresActivos(tareaActual.errores);
      setErroresCorregidos([]);
      setMostrarResultado(false);
    }
  }, [tareaActual]);

  // Verificar errores corregidos cuando cambia el código
  useEffect(() => {
    if (!tareaActual) return;

    const nuevosErroresCorregidos: number[] = [];

    tareaActual.errores.forEach((error, index) => {
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

  /**
   * Verifica si la solución es correcta
   * @returns true si la solución es correcta, false en caso contrario
   */
  const verificarSolucion = (): boolean => {
    if (!tareaActual) return false;
    
    const esCorrecto = tareaActual.verificarSolucion(codigo);
    setMostrarResultado(esCorrecto);
    
    return esCorrecto;
  };

  return {
    erroresActivos,
    erroresCorregidos,
    mostrarResultado,
    verificarSolucion,
    setMostrarResultado,
  };
};
