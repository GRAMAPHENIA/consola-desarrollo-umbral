// Tipos para la consola de desarrollo

export interface Error {
  linea: number;
  mensaje: string;
  tipo: string;
}

export interface Tarea {
  id: string;
  nivel: number;
  titulo: string;
  descripcion: string;
  instrucciones: string;
  objetivo: string;
  codigoInicial: string;
  codigoSolucion: string;
  lenguaje: string;
  tipo: string;
  puntoNLP: string;
  documentacion?: string;
  errores: Error[];
  lineasEditables: number[];
  verificarSolucion: (codigo: string) => boolean;
  verificarErrorCorregido: (codigo: string, linea: number) => boolean;
}

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
  errores: Error[];
  erroresCorregidos: number[];
  erroresPendientes: number;
}

export interface InstructionsTabProps {
  instrucciones: string;
  objetivo: string;
}

export interface DocumentationTabProps {
  tareaActual: Tarea;
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
