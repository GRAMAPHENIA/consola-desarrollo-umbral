import { render, screen, fireEvent } from '@testing-library/react';
import { CodeTab } from '../CodeTab';

// Mock del componente EditorCodigo
jest.mock('@/components/editor-codigo', () => ({
  EditorCodigo: ({ codigo, setCodigo }: { codigo: string; setCodigo: (code: string) => void }) => (
    <div 
      role="textbox" 
      contentEditable
      data-testid="editor-codigo"
      onInput={(e) => setCodigo(e.currentTarget.textContent || '')}
      dangerouslySetInnerHTML={{ __html: codigo }}
    />
  ),
}));

describe('CodeTab', () => {
  const mockSetCodigo = jest.fn();
  const props = {
    codigo: 'console.log("Hola mundo");',
    setCodigo: mockSetCodigo,
    lenguaje: 'javascript',
    lineasEditables: [1],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe renderizar el editor de código con el código proporcionado', () => {
    render(<CodeTab {...props} />);

    // Verificar que el código se muestre en el editor
    const editor = screen.getByTestId('editor-codigo');
    expect(editor).toHaveTextContent('console.log("Hola mundo")');
    
    // Verificar que el título se muestra correctamente
    // Usamos getAllByRole y tomamos el primer elemento que coincida
    const headings = screen.getAllByRole('heading', { level: 2 });
    expect(headings[0]).toHaveTextContent('Editor de Código');
  });

  it('debe llamar a setCodigo cuando se edita el código', () => {
    render(<CodeTab {...props} />);

    // Simular la edición del código
    const nuevoCodigo = 'console.log("Nuevo código");';
    const editor = screen.getByTestId('editor-codigo');
    
    fireEvent.input(editor, { 
      target: { 
        textContent: nuevoCodigo,
        innerHTML: nuevoCodigo 
      } 
    });

    // Verificar que se llamó a setCodigo con el nuevo valor
    expect(mockSetCodigo).toHaveBeenCalledWith(nuevoCodigo);
  });

  it('debe usar valores por defecto cuando no se proporcionan todas las props', () => {
    render(
      <CodeTab 
        codigo="" 
        setCodigo={mockSetCodigo} 
        lenguaje="javascript"
        lineasEditables={[1]}
      />
    );
    
    // Verificar que el editor se renderiza correctamente
    expect(screen.getByTestId('editor-codigo')).toBeInTheDocument();
  });
});
