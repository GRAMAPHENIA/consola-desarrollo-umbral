import { FileText, Info, BookOpen, Lightbulb } from 'lucide-react';
import { InstructionsTabProps } from '@/components/consola-dev/types';

/**
 * Componente para la pestaña de instrucciones
 * @param instrucciones Instrucciones de la tarea
 * @param objetivo Objetivo de aprendizaje
 */
export const InstructionsTab = ({ instrucciones, objetivo }: InstructionsTabProps) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold flex items-center text-foreground">
          <FileText className="h-5 w-5 mr-2 text-primary" />
          Instrucciones del Desafío
        </h3>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center text-foreground border-b pb-2">
              <Info className="w-5 h-5 mr-2 text-primary" />
              Descripción
            </h3>
            <div className="prose dark:prose-invert max-w-none text-foreground/90 space-y-4 pl-2">
              <p>{instrucciones}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center text-foreground border-b pb-2">
              <BookOpen className="w-5 h-5 mr-2 text-primary" />
              Objetivos de Aprendizaje
            </h3>
            <div className="prose dark:prose-invert max-w-none text-foreground/90 space-y-4 pl-2">
              <p>{objetivo}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center text-foreground border-b pb-2">
              <Lightbulb className="w-5 h-5 mr-2 text-primary" />
              Consejos Útiles
            </h3>
            <ul className="space-y-3 text-foreground/80 pl-2">
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-1">•</span>
                <span>
                  Revisa la pestaña de errores para ver los problemas
                  detectados
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-1">•</span>
                <span>
                  Haz clic en "Verificar Solución" para validar tus
                  cambios
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2 mt-1">•</span>
                <span>
                  Utiliza la documentación como referencia cuando lo
                  necesites
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsTab;
