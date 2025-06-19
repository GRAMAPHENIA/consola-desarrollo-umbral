// Exportar el componente principal de la consola de desarrollo
export { default as ConsolaDev } from './ConsolaDev';

// Re-exportar tipos principales
export type { Error as ErrorType, Tarea } from '@/types/tarea';

// Exportar tipos específicos de la consola
export type {
  TareaTipo,
  ToastState,
  ConsolaDevProps,
  HeaderProps,
  CodeTabProps,
  ErrorsTabProps,
  InstructionsTabProps,
  DocumentationTabProps,
  FooterProps,
  CompletionModalProps
} from './types';

// Exportar hooks para uso externo
export { useTaskProgress } from './hooks/useTaskProgress';
export { useCodeVerification } from './hooks/useCodeVerification';
export { useToast } from './hooks/useToast';
