import { Info, BookOpen, Lightbulb } from "lucide-react";
import { DocumentationTabProps } from "@/components/consola-dev/types";

/**
 * Componente para la pestaña de documentación
 * @param tareaActual Tarea actual
 */
export const DocumentationTab = ({ tareaActual }: DocumentationTabProps) => {
  if (!tareaActual.documentacion) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-6 max-w-md">
          <Info className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-3 text-lg font-medium text-foreground">
            Sin documentación disponible
          </h3>
          <p className="mt-2 text-foreground/70">
            Este desafío no tiene documentación adicional. Revisa las
            instrucciones y los errores para completarlo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-6 text-foreground">
        Documentación de Ayuda
      </h2>
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center text-foreground border-b pb-2">
              <Info className="w-5 h-5 mr-2 text-primary" />
              Sobre el Desafío
            </h3>
            <div className="space-y-3 pl-2">
              <p className="flex items-start">
                <span className="font-medium text-foreground/90 min-w-[60px]">
                  Tipo:
                </span>
                <span className="text-foreground/80">
                  {tareaActual.tipo.charAt(0).toUpperCase() +
                    tareaActual.tipo.slice(1)}
                </span>
              </p>
              <p className="flex items-start">
                <span className="font-medium text-foreground/90 min-w-[60px]">
                  Objetivo:
                </span>
                <span className="text-foreground/80">
                  {tareaActual.objetivo}
                </span>
              </p>
              <p className="flex items-start">
                <span className="font-medium text-foreground/90 min-w-[60px]">
                  Punto NLP:
                </span>
                <span className="text-foreground/80">
                  {tareaActual.puntoNLP}
                </span>
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center text-foreground border-b pb-2">
              <BookOpen className="w-5 h-5 mr-2 text-primary" />
              Guía de Solución
            </h3>
            <div
              className="prose dark:prose-invert max-w-none text-foreground/90 space-y-4 pl-2"
              dangerouslySetInnerHTML={{
                __html: tareaActual.documentacion.replace(
                  /<p>/g,
                  '<p class="mb-4 last:mb-0">'
                ),
              }}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center text-foreground border-b pb-2">
              <Lightbulb className="w-5 h-5 mr-2 text-primary" />
              Consejos Rápidos
            </h3>
            <ul className="space-y-3 text-foreground/80 pl-2">
              {tareaActual.errores.map((error, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2 mt-1">•</span>
                  <span>
                    <span className="font-medium">Línea {error.linea}:</span>{" "}
                    {error.mensaje}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-sm text-foreground/70 text-center">
          ¿Necesitas más ayuda? Intenta revisar la pestaña de instrucciones o
          los mensajes de error.
        </p>
      </div>
    </div>
  );
};
