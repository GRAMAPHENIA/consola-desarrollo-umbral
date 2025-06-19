import { useState, useEffect } from 'react';

interface CodeTabProps {
  codigo: string;
  setCodigo: (codigo: string) => void;
}

/**
 * Componente para la pestaña de código
 */
export const CodeTab = ({
  codigo,
  setCodigo,
}: CodeTabProps) => {
  const [localCodigo, setLocalCodigo] = useState(codigo);

  // Sincronizar cambios del padre
  useEffect(() => {
    setLocalCodigo(codigo);
  }, [codigo]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setLocalCodigo(newCode);
    setCodigo(newCode);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 bg-gray-100 dark:bg-gray-700 border-b">
        <h2 className="text-lg font-medium">Editor de Código</h2>
      </div>
      <div className="flex-1 overflow-auto">
        <textarea
          value={localCodigo}
          onChange={handleChange}
          className="w-full h-full p-4 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          spellCheck="false"
          style={{
            minHeight: '300px',
            lineHeight: '1.5',
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
};

export default CodeTab;
