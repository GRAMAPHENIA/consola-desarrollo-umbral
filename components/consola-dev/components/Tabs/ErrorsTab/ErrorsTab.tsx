import { AlertCircle } from "lucide-react";
import { PanelErrores } from "@/components/panel-errores";
import { ErrorsTabProps } from "@/components/consola-dev/types";

/**
 * Componente para la pestaña de errores
 * @param errores Lista de errores
 * @param erroresCorregidos Índices de errores corregidos
 * @param erroresPendientes Número de errores pendientes
 */
export const ErrorsTab = ({ 
  errores, 
  erroresCorregidos,
  erroresPendientes 
}: ErrorsTabProps) => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold flex items-center text-foreground">
          <AlertCircle className="h-5 w-5 mr-2 text-primary" />
          Panel de Errores
          {erroresPendientes > 0 && (
            <span className="ml-2 bg-destructive text-destructive-foreground text-xs font-medium px-2 py-0.5 rounded-full">
              {erroresPendientes} pendientes
            </span>
          )}
        </h3>
      </div>
      <div className="flex-1 overflow-auto">
        <PanelErrores
          errores={errores}
          erroresCorregidos={erroresCorregidos}
        />
      </div>
    </div>
  );
};

export default ErrorsTab;
