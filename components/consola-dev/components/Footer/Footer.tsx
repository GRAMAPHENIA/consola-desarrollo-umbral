import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FooterProps } from '../../types';

/**
 * Componente Footer - Muestra la barra inferior de la consola
 * @param tipo Tipo de tarea
 * @param lenguaje Lenguaje de programación
 * @param onVerificarSolucion Función para verificar la solución
 */
export const Footer = ({ 
  tipo, 
  lenguaje, 
  onVerificarSolucion 
}: FooterProps) => {
  return (
    <div className="border-t border-dashed p-4 flex justify-between items-center">
      <div>
        <Badge variant="secondary" className="mr-2">
          {tipo}
        </Badge>
        <Badge variant="outline">{lenguaje}</Badge>
      </div>
      <Button variant="ghost" onClick={onVerificarSolucion}>
        <CheckCircle2 className="h-4 w-4 mr-2" />
        Verificar Solución
      </Button>
    </div>
  );
};
