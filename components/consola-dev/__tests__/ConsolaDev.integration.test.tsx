// components/consola-dev/__tests__/ConsolaDev.integration.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import ConsolaDev from "../ConsolaDev";

// Mock de los componentes hijos
jest.mock("@/components/pantalla-inicial", () => ({
  __esModule: true,
  default: ({ onComplete }: { onComplete: () => void }) => (
    <button onClick={onComplete}>Comenzar</button>
  ),
}));

describe("ConsolaDev - Integración", () => {
  beforeEach(() => {
    // Configurar mocks necesarios
  });

  it("debe mostrar la pantalla inicial y luego la consola al hacer clic en comenzar", () => {
    render(<ConsolaDev />);

    // Verificar que se muestre la pantalla inicial
    expect(screen.getByText("Comenzar")).toBeInTheDocument();

    // Simular clic en el botón de comenzar
    fireEvent.click(screen.getByText("Comenzar"));

    // Verificar que se muestre la consola
    expect(screen.getByText("Consola de Desarrollo")).toBeInTheDocument();
  });

  // Más pruebas de integración...
});
