import { Code2 } from 'lucide-react';
import { EditorCodigo } from '@/components/editor-codigo';
import { CodeTabProps } from '@/components/consola-dev/types';

/**
 * Componente para la pestaña de código
 * @param codigo Código actual
 * @param setCodigo Función para actualizar el código
 * @param lenguaje Lenguaje de programación
 * @param lineasEditables Array con los números de línea editables
 */
export const CodeTab = ({
  codigo,
  setCodigo,
  lenguaje = 'javascript',
  lineasEditables = [],
}: CodeTabProps) => {
  const handleCodeChange = (newCode: string) => {
    setCodigo(newCode);
  };

  return (
    <div 
      className="h-full flex flex-col"
      role="region" 
      aria-label="Editor de código"
    >
      <div 
        className="p-4 border-b"
        role="heading" 
        aria-level={2}
      >
        <h2 className="text-lg font-semibold flex items-center text-foreground m-0">
          <Code2 className="h-5 w-5 mr-2 text-primary" aria-hidden="true" />
          Editor de Código
        </h2>
      </div>
      <div 
        className="flex-1 overflow-auto"
        role="application"
        aria-label={`Editor de ${lenguaje}`}
      >
        <EditorCodigo
          codigo={codigo}
          setCodigo={handleCodeChange}
          lenguaje={lenguaje}
          lineasEditables={lineasEditables}
        />
      </div>
    </div>
  );
};

export default CodeTab;
