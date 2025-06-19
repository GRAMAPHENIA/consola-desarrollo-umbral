'use client';

import { useState, useEffect } from 'react';
import { PantallaInicial } from '@/components/pantalla-inicial';
import { tareas } from '@/data/tareas';

// Versión simplificada de los componentes
const Header = ({ titulo, nivel }: { titulo: string; nivel: number }) => (
  <header className="bg-gray-800 text-white p-4">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-xl font-bold">{titulo}</h1>
      <span className="bg-yellow-500 text-black px-2 py-1 rounded">Nivel {nivel}</span>
    </div>
  </header>
);

const CodeTab = ({ codigo, setCodigo }: { codigo: string; setCodigo: (code: string) => void }) => (
  <div className="bg-gray-900 text-white p-4 h-64">
    <textarea
      className="w-full h-full bg-gray-800 text-green-400 font-mono p-2 rounded"
      value={codigo}
      onChange={(e) => setCodigo(e.target.value)}
    />
  </div>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white p-4 text-center">
    <p>Consola de Desarrollo - {new Date().getFullYear()}</p>
  </footer>
);

export default function ConsolaDev() {
  console.log('=== INICIO ConsolaDev ===');
  
  // Estados simplificados
  const [estado, setEstado] = useState<'inicio' | 'cargando' | 'editor'>('inicio');
  const [tareaActual, setTareaActual] = useState<any>(null);
  const [codigo, setCodigo] = useState('');

  // Función para manejar la selección de tarea
  const handleTaskSelect = (taskId: string) => {
    console.log('Seleccionada tarea:', taskId);
    
    // Buscar la tarea
    const tarea = tareas.find(t => t.id === taskId);
    
    if (tarea) {
      console.log('Tarea encontrada:', tarea.titulo);
      setEstado('cargando');
      
      // Pequeño retraso para mostrar el estado de carga
      setTimeout(() => {
        setTareaActual(tarea);
        setCodigo(tarea.codigoInicial || '// Escribe tu código aquí');
        setEstado('editor');
      }, 500);
    } else {
      console.error('Tarea no encontrada:', taskId);
    }
  };

  // Renderizado condicional
  if (estado === 'inicio') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <PantallaInicial onTaskSelect={handleTaskSelect} />
      </div>
    );
  }

  if (estado === 'cargando') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-lg">Cargando tarea...</p>
        </div>
      </div>
    );
  }

  // Estado: editor
  return (
    <div className="min-h-screen flex flex-col">
      <Header titulo={tareaActual.titulo} nivel={tareaActual.nivel} />
      
      <main className="flex-1 p-4 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-xl font-bold">Editor de Código</h2>
              </div>
              <CodeTab codigo={codigo} setCodigo={setCodigo} />
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-xl font-bold">Instrucciones</h2>
              </div>
              <div className="p-4">
                <p className="text-gray-700">{tareaActual.objetivo}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
