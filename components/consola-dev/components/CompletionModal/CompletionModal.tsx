import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CompletionModalProps } from '../../types';

/**
 * Componente para mostrar el modal de finalización
 * @param puntosNLP Puntos NLP acumulados
 * @param esUltimaTarea Indica si es la última tarea
 * @param onCerrar Función para cerrar el modal
 * @param onSiguienteTarea Función para ir a la siguiente tarea
 */
export const CompletionModal = ({
  puntosNLP,
  esUltimaTarea,
  onCerrar,
  onSiguienteTarea,
}: CompletionModalProps) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center">
            <CheckCircle2 className="h-16 w-16 mx-auto text-green-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">¡Felicidades!</h2>
            <p className="mb-4">
              {esUltimaTarea
                ? `Has completado todos los desafíos y has acumulado ${puntosNLP} puntos de Programación Neurolingüística.`
                : '¡Has completado este desafío exitosamente! ¿Listo para el siguiente?'}
            </p>
            
            {esUltimaTarea ? (
              <Button onClick={onCerrar}>
                Volver a empezar
              </Button>
            ) : (
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={onCerrar}>
                  Seguir practicando
                </Button>
                <Button onClick={onSiguienteTarea}>
                  Siguiente desafío
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
