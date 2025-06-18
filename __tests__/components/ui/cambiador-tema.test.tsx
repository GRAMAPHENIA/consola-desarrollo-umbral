import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CambiadorTema } from '@/components/cambiador-tema';

// Mock de next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
  }),
}));

describe('CambiadorTema', () => {
  it('debe renderizar el botón de cambio de tema', () => {
    render(<CambiadorTema />);
    
    // Verificar que el botón está presente
    const button = screen.getByRole('button', { name: /cambiar tema/i });
    expect(button).toBeInTheDocument();
    
    // Verificar que el ícono de sol está visible (tema claro por defecto)
    const sunIcon = screen.getByTestId('sun-icon');
    expect(sunIcon).toBeInTheDocument();
    expect(sunIcon).toHaveClass('scale-100');
  });

  it('debe cambiar el ícono al hacer clic', () => {
    const mockSetTheme = jest.fn();
    
    // Sobrescribir el mock para este test
    jest.requireMock('next-themes').useTheme.mockImplementation(() => ({
      theme: 'light',
      setTheme: mockSetTheme,
    }));
    
    render(<CambiadorTema />);
    
    // Simular clic en el botón
    const button = screen.getByRole('button', { name: /cambiar tema/i });
    fireEvent.click(button);
    
    // Verificar que setTheme fue llamado con el valor correcto
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });
});
