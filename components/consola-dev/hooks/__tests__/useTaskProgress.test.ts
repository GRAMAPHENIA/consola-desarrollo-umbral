import { renderHook, act } from '@testing-library/react';
import { useTaskProgress } from '../useTaskProgress';
import { Tarea } from '@/types/tarea';

// Mock de las dependencias
jest.mock('@/lib/progreso', () => ({
  obtenerTareaActual: jest.fn(),
  guardarProgreso: jest.fn(),
}));

// Datos de prueba
const mockTareas: Tarea[] = [
  {
    id: '1',
    nivel: 1,
    tipo: 'psicológico',
    titulo: 'Tarea 1',
    instrucciones: 'Instrucciones para la tarea 1',
    objetivo: 'Objetivo de la tarea 1',
    lenguaje: 'javascript',
    codigoInicial: 'console.log("Hola mundo");',
    codigoSolucion: 'console.log("Hola mundo");',
    errores: [],
    mensajeExito: '¡Tarea completada!',
    puntoNLP: 'punto1',
    documentacion: 'Documentación de la tarea 1',
    lineasEditables: [1],
    verificarSolucion: (codigo: string) => codigo.includes('Hola mundo'),
    verificarErrorCorregido: (_codigo: string, _linea: number) => true,
    demostracion: null,
  },
  {
    id: '2',
    nivel: 2,
    tipo: 'psicológico',
    titulo: 'Tarea 2',
    instrucciones: 'Instrucciones para la tarea 2',
    objetivo: 'Objetivo de la tarea 2',
    lenguaje: 'javascript',
    codigoInicial: 'function suma(a, b) { return a + b; }',
    codigoSolucion: 'function suma(a, b) { return a + b; }',
    errores: [],
    mensajeExito: '¡Tarea completada!',
    puntoNLP: 'punto2',
    documentacion: 'Documentación de la tarea 2',
    lineasEditables: [1],
    verificarSolucion: (codigo: string) => codigo.includes('suma'),
    verificarErrorCorregido: (_codigo: string, _linea: number) => true,
    demostracion: null,
  },
];

describe('useTaskProgress', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe cargar el progreso guardado al inicio', () => {
    // Configurar el mock para obtenerTareaActual
    require('@/lib/progreso').obtenerTareaActual.mockReturnValue({
      nivel: 2,
      puntosNLP: 3,
    });

    const { result } = renderHook(() => useTaskProgress({ tareas: mockTareas }));

    // Verificar que se carguen los valores iniciales
    expect(result.current.nivelActual).toBe(2);
    expect(result.current.puntosNLP).toBe(3);
    expect(result.current.tareaActual).toEqual(mockTareas[1]);
  });

  it('debe usar la primera tarea si no hay progreso guardado', () => {
    require('@/lib/progreso').obtenerTareaActual.mockReturnValue(null);

    const { result } = renderHook(() => useTaskProgress({ tareas: mockTareas }));

    expect(result.current.nivelActual).toBe(1);
    expect(result.current.tareaActual).toEqual(mockTareas[0]);
  });

  it('debe avanzar a la siguiente tarea', () => {
    require('@/lib/progreso').obtenerTareaActual.mockReturnValue({
      nivel: 1,
      puntosNLP: 0,
    });

    const { result } = renderHook(() => useTaskProgress({ tareas: mockTareas }));

    act(() => {
      result.current.siguienteTarea();
    });

    // Verificar que se actualice el nivel y la tarea actual
    expect(result.current.nivelActual).toBe(2);
    expect(result.current.tareaActual).toEqual(mockTareas[1]);
    
    // Verificar que se llame a guardarProgreso con los valores correctos
    expect(require('@/lib/progreso').guardarProgreso).toHaveBeenCalledWith(2, 0);
  });

  it('debe marcar como completado al llegar al final', () => {
    require('@/lib/progreso').obtenerTareaActual.mockReturnValue({
      nivel: 2, // Última tarea
      puntosNLP: 0,
    });

    const { result } = renderHook(() => useTaskProgress({ tareas: mockTareas }));

    act(() => {
      result.current.siguienteTarea();
    });

    expect(result.current.completado).toBe(true);
  });
});
