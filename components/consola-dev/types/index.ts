// Importar tipos principales desde @/types/tarea
import type { Tarea as TareaBase, Error as ErrorBase } from '@/types/tarea';

// Re-exportar los tipos principales
export type { ErrorBase, TareaBase };

// Tipos adicionales específicos para la consola de desarrollo
export type TareaTipo = 'psicológico' | 'filológico' | 'filosófico';

export interface ToastState {
  message: string;
  type: 'success' | 'error';
  show: boolean;
}

export interface ConsolaDevProps {
  // Props del componente principal
}

export interface HeaderProps {
  nivelActual: number;
  puntosNLP: number;
}

export interface CodeTabProps {
  codigo: string;
  setCodigo: (codigo: string) => void;
  lenguaje: string;
  lineasEditables: number[];
}

export interface ErrorsTabProps {
  errores: ErrorBase[];
  erroresCorregidos: number[];
  erroresPendientes: number;
}

export interface InstructionsTabProps {
  instrucciones: string;
  objetivo: string;
}

export interface DocumentationTabProps {
  tareaActual: TareaBase;
}

export interface FooterProps {
  tipo: string;
  lenguaje: string;
  onVerificarSolucion: () => void;
}

export interface CompletionModalProps {
  puntosNLP: number;
  onClose: () => void;
  esUltimaTarea: boolean;
  onSiguienteTarea: () => void;
}
