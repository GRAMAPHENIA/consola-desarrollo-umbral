import { Terminal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PuntosNLP } from '@/components/puntos-nlp';
import { CambiadorTema } from '@/components/cambiador-tema';
import { HeaderProps } from '../../types';

/**
 * Componente Header - Muestra la barra superior de la consola
 * @param nivelActual Nivel actual de la tarea
 * @param puntosNLP Puntos NLP acumulados
 */
export const Header = ({ nivelActual, puntosNLP }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b border-dashed p-4">
      <div className="flex items-center gap-2">
        <Terminal className="h-5 w-5" />
        <h1 className="text-xl font-bold">Consola de Desarrollo</h1>
        <Badge variant="outline" className="ml-2">
          Nivel {nivelActual}
        </Badge>
      </div>
      <div className="flex items-center gap-4">
        <PuntosNLP puntos={puntosNLP} />
        <CambiadorTema />
      </div>
    </div>
  );
};
