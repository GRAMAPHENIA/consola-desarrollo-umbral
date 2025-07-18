"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface EditorCodigoProps {
  codigo: string;
  setCodigo: (codigo: string) => void;
  lenguaje: string;
  lineasEditables?: number[];
}

export function EditorCodigo({
  codigo,
  setCodigo,
  lenguaje,
  lineasEditables = [],
}: EditorCodigoProps) {
  const [lineas, setLineas] = useState<string[]>([]);
  const editorRef = useRef<HTMLPreElement>(null);
  const numerosRef = useRef<HTMLDivElement>(null);

  // Actualizar las líneas numeradas cuando cambia el código
  useEffect(() => {
    const lineasCodigo = codigo.split("\n");
    setLineas(
      Array.from({ length: lineasCodigo.length }, (_, i) => String(i + 1))
    );
  }, [codigo]);

  // Sincronizar el scroll entre el editor y los números de línea
  useEffect(() => {
    const editorElement = editorRef.current;
    const numerosElement = numerosRef.current;

    if (!editorElement || !numerosElement) return;

    const handleScroll = () => {
      numerosElement.scrollTop = editorElement.scrollTop;
    };

    editorElement.addEventListener("scroll", handleScroll);
    return () => {
      editorElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Separar código y comentarios en una línea
  const separarComentarios = (linea: string) => {
    // Buscar el inicio de un comentario (//), ignorando // dentro de strings
    let enString = false;
    let stringDelimiter = "";
    let posComentario = -1;

    for (let i = 0; i < linea.length - 1; i++) {
      const char = linea[i];
      const nextChar = linea[i + 1];

      // Manejar strings
      if (
        (char === '"' || char === "'") &&
        (i === 0 || linea[i - 1] !== "\\")
      ) {
        if (!enString) {
          enString = true;
          stringDelimiter = char;
        } else if (char === stringDelimiter) {
          enString = false;
        }
      }

      // Detectar inicio de comentario (solo si no estamos dentro de un string)
      if (!enString && char === "/" && nextChar === "/") {
        posComentario = i;
        break;
      }
    }

    // Si no hay comentario, devolver toda la línea como código
    if (posComentario === -1) {
      return { codigo: linea, comentario: "" };
    }

    // Separar código y comentario
    return {
      codigo: linea.substring(0, posComentario),
      comentario: linea.substring(posComentario),
    };
  };

  // Manejar cambios en el editor con restricciones
  const handleInput = (e: React.FormEvent<HTMLPreElement>) => {
    const contenidoActual = e.currentTarget.textContent || "";
    const lineasActuales = contenidoActual.split("\n");
    const lineasOriginales = codigo.split("\n");

    // Crear un nuevo array de líneas, reemplazando solo las partes editables
    const nuevasLineas = lineasOriginales.map((lineaOriginal, index) => {
      // Los índices de línea en el código empiezan en 0, pero visualmente empiezan en 1
      const lineaVisual = index + 1;

      // Si la línea no es editable, mantener la línea original
      if (
        !lineasEditables.includes(lineaVisual) ||
        index >= lineasActuales.length
      ) {
        return lineaOriginal;
      }

      // Para líneas editables, preservar los comentarios
      const { codigo: codigoOriginal, comentario: comentarioOriginal } =
        separarComentarios(lineaOriginal);
      const { codigo: codigoActual } = separarComentarios(
        lineasActuales[index]
      );

      // Combinar el nuevo código con el comentario original
      return codigoActual + comentarioOriginal;
    });

    setCodigo(nuevasLineas.join("\n"));
  };

  // Prevenir la edición de líneas no editables y comentarios
  const handleKeyDown = (e: React.KeyboardEvent<HTMLPreElement>) => {
    const selection = window.getSelection();
    if (!selection || !selection.anchorNode) return;

    // Obtener la línea actual donde está el cursor
    const cursorPosition = selection.anchorOffset;
    const contenido = e.currentTarget.textContent || "";
    const lineasHastaAnchor = contenido
      .substring(0, cursorPosition)
      .split("\n");
    const lineaActual = lineasHastaAnchor.length;

    // Verificar si la línea actual está en la lista de líneas editables
    const esEditable = lineasEditables.includes(lineaActual);

    // Definir teclas de navegación
    const teclaNavegacion =
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "Home" ||
      e.key === "End" ||
      e.key === "PageUp" ||
      e.key === "PageDown" ||
      (e.ctrlKey && e.key === "a"); // Ctrl+A para seleccionar todo

    // Si es una tecla de navegación o la línea es editable, permitir la acción
    if (teclaNavegacion || esEditable) return;

    // Si llegamos aquí, la línea no es editable y no es una tecla de navegación
    e.preventDefault();
    return;

    // Para líneas editables, verificar si el cursor está en un comentario
    if (esEditable) {
      const lineaTexto = codigo.split("\n")[lineaActual - 1] || "";
      const { codigo: codigoParte, comentario } =
        separarComentarios(lineaTexto);

      // Si hay comentario y el cursor está dentro o después del comentario
      if (comentario && cursorPosition >= codigoParte.length) {
        // Permitir navegación pero no edición en comentarios
        if (!teclaNavegacion) {
          e.preventDefault();
        }
      }
    }
  };

  return (
    <div className="flex flex-col w-full bg-background text-foreground font-mono text-sm">
      {/* Números de línea */}
      <div
        ref={numerosRef}
        className="flex select-none text-right pr-4 py-2 text-muted-foreground bg-muted/50 overflow-x-auto"
        style={{
          minHeight: "2rem",
          scrollbarWidth: "thin",
        }}
      >
        {lineas.map((linea, index) => {
          const lineaVisual = index + 1;
          const esEditable =
            lineasEditables.includes(lineaVisual) ||
            lineasEditables.length === 0;

          return (
            <div
              key={index}
              className={cn(
                "h-6 leading-6 pr-2 relative",
                esEditable &&
                  "bg-amber-100/80 dark:bg-amber-900/30 border-r-2 border-amber-400 font-medium"
              )}
            >
              {linea}
            </div>
          );
        })}
      </div>

      {/* Editor de código */}
      <div className="w-full">
        <pre
          ref={editorRef}
          spellCheck="false"
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          className="w-full p-2 outline-none select-text whitespace-pre-wrap break-words"
          style={{
            tabSize: 2,
            WebkitUserModify: "read-write-plaintext-only",
            minHeight: "auto",
          }}
        >
          {codigo.split("\n").map((linea, index) => {
            // Los índices de línea en el código empiezan en 0, pero visualmente empiezan en 1
            const lineaVisual = index + 1;
            const esEditable =
              lineasEditables.includes(lineaVisual) ||
              lineasEditables.length === 0;
            const { codigo: codigoParte, comentario } =
              separarComentarios(linea);

            return (
              <div
                key={index}
                className={cn(
                  "min-h-6 px-2 py-1 relative group flex items-start",
                  esEditable
                    ? "bg-amber-100/70 dark:bg-amber-900/30 hover:bg-amber-200/70 dark:hover:bg-amber-800/40 border-l-4 border-amber-500 rounded-r font-medium"
                    : "text-muted-foreground select-none"
                )}
              >
                <span
                  className={
                    esEditable ? "font-medium" : "text-muted-foreground"
                  }
                >
                  {codigoParte}
                </span>
                {comentario && (
                  <span
                    className={
                      esEditable ? "text-amber-600/80" : "text-muted-foreground"
                    }
                  >
                    {comentario}
                  </span>
                )}
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}
