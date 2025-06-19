// components/consola-dev/components/Header/__tests__/Header.test.tsx
import { render, screen } from "@testing-library/react";
import { Header } from "../Header";

describe("Header", () => {
  it("debe renderizar el título y el nivel actual", () => {
    render(<Header nivelActual={1} puntosNLP={5} />);

    // Verificar que el título se muestre
    expect(screen.getByText("Consola de Desarrollo")).toBeInTheDocument();

    // Verificar que el nivel actual se muestre
    expect(screen.getByText("Nivel 1")).toBeInTheDocument();

    // Verificar que los puntos NLP se muestren
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("debe mostrar el componente CambiadorTema", () => {
    render(<Header nivelActual={1} puntosNLP={0} />);

    // Verificar que el botón de cambio de tema esté presente
    // Esto asume que CambiadorTema tiene un botón con aria-label="Cambiar tema"
    expect(
      screen.getByRole("button", { name: /cambiar tema/i })
    ).toBeInTheDocument();
  });
});
