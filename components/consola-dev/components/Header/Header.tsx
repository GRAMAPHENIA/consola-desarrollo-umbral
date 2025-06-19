import { Terminal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CambiadorTema } from '@/components/cambiador-tema';

interface HeaderProps {
  titulo: string;
  nivel: number;
  puntosNLP: number;
}

/**
 * Componente Header - Muestra la barra superior de la consola
 */
export const Header = ({ titulo, nivel, puntosNLP }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div className="flex items-center gap-2">
        <Terminal className="h-5 w-5" />
        <h1 className="text-xl font-bold">{titulo}</h1>
        <Badge variant="outline" className="ml-2 bg-yellow-500 text-black">
          Nivel {nivel}
        </Badge>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm">Puntos: {puntosNLP}</span>
        <CambiadorTema />
      </div>
    </div>
  );
};
