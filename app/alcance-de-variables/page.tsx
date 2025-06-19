"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { tareas } from "@/data/tareas";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Moon, Sun, ArrowLeft, BookOpen, Book, X } from "lucide-react";
import { useTheme } from "next-themes";

// Componente de botón para cambiar el tema
function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="ml-4"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Cambiar tema</span>
    </Button>
  );
}

// Componente de diccionario técnico
function DictionaryModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-background z-10">
          <h2 className="text-xl font-bold">📚 Diccionario Técnico</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Cerrar diccionario</span>
          </Button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">📖 ¿Qué es el hoisting?</h3>
            <p className="text-sm">
              En JavaScript, el hoisting (elevación) es el comportamiento por el cual ciertas declaraciones son movidas al inicio de su contexto de ejecución (ya sea una función o el ámbito global) antes de que el código se ejecute.
            </p>
            
            <div className="space-y-4 mt-6">
              <div>
                <h4 className="font-medium mb-2">🧪 Con var</h4>
                <pre className="bg-black/80 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`console.log(x); // undefined
var x = 10;`}
                </pre>
                <p className="text-xs mt-2 text-muted-foreground">
                  Aunque parece que accedés a x antes de declararla, no da error. ¿Por qué?
                  Porque JavaScript internamente hace algo como esto:
                </p>
                <pre className="bg-black/80 text-green-400 p-3 rounded text-xs overflow-x-auto mt-2">
{`var x;        // hoisting de la declaración (no del valor)
console.log(x); // undefined
x = 10;`}
                </pre>
              </div>

              <div>
                <h4 className="font-medium mb-2">🚫 Con let y const</h4>
                <pre className="bg-black/80 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`console.log(x); // ❌ ReferenceError
let x = 10;`}
                </pre>
                <p className="text-xs mt-2 text-muted-foreground">
                  Acá no hay hoisting disponible para el uso temprano. La variable x está en lo que se llama el "temporal dead zone" (zona muerta temporal), desde el inicio del bloque hasta la línea donde se declara.
                </p>
              </div>

              <div className="p-3 bg-yellow-500/10 border-l-4 border-yellow-500/50">
                <h5 className="font-medium text-yellow-500">✅ Entonces: ¿es real?</h5>
                <p className="text-xs mt-1">
                  Sí. El hoisting es un comportamiento real del lenguaje, definido en la especificación de ECMAScript.
                  La explicación que usa Vero es una analogía, pero la mecánica es técnica y exacta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente de navegación
function NavBar({ onBack, onToggleDocumentation }: { onBack: () => void, onToggleDocumentation: () => void }) {
  const [showDictionary, setShowDictionary] = useState(false);

  const toggleDictionary = () => {
    setShowDictionary(!showDictionary);
  };

  return (
    <>
      <nav className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleDocumentation}
            title="Ver documentación"
          >
            <BookOpen className="h-5 w-5" />
            <span className="sr-only">Documentación</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDictionary}
            title="Abrir diccionario"
          >
            <Book className="h-5 w-5" />
            <span className="sr-only">Diccionario</span>
          </Button>
          <ThemeToggle />
        </div>
      </nav>
      <DictionaryModal isOpen={showDictionary} onClose={toggleDictionary} />
    </>
  );
}

// Componente principal de la página
export default function AlcanceDeVariablesPage() {
  const router = useRouter();
  const [tarea, setTarea] = useState<any>(null);
  const [codigo, setCodigo] = useState("");
  const [showDocumentation, setShowDocumentation] = useState(false);

  // Cargar la tarea al montar el componente
  useEffect(() => {
    const tareaEncontrada = tareas.find((t) => t.id === "tarea-var-let");
    if (tareaEncontrada) {
      setTarea(tareaEncontrada);
      setCodigo(tareaEncontrada.codigoInicial || "");
    } else {
      // Si no se encuentra la tarea, redirigir al inicio
      router.push("/");
    }
  }, [router]);

  const handleBack = () => {
    router.push("/");
  };

  const toggleDocumentation = () => {
    setShowDocumentation(!showDocumentation);
  };

  // Si no hay tarea, no renderizar nada o un mensaje de error
  if (!tarea) {
    return null; // O podrías devolver un mensaje de error
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-background text-foreground">
        <NavBar onBack={handleBack} onToggleDocumentation={toggleDocumentation} />
        
        {/* Diálogo de documentación */}
        {showDocumentation && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-background z-10">
                <h2 className="text-xl font-bold">Alcance de Variables: var vs let</h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleDocumentation}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Cerrar</span>
                </Button>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">🎯 Tema del debate: var vs let en JavaScript</h2>
                    <p className="text-muted-foreground">Un diálogo sobre sesgos técnicos y evolución del código</p>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-card p-5 rounded-lg border">
                      <h3 className="font-mono text-sm text-muted-foreground mb-3">ESCENA 1 — LA CREENCIA INFLEXIBLE</h3>
                      
                      <div className="space-y-4">
                        <div className="pl-4 border-l-4 border-yellow-500/70">
                          <p className="font-medium text-foreground">Nico:</p>
                          <p>No entiendo por qué todos usan let ahora. Para mí, var siempre fue suficiente. No hay razón real para cambiarlo.</p>
                        </div>

                        <div className="pl-4 border-l-4 border-blue-500/70">
                          <p className="font-medium text-foreground">Vero:</p>
                          <p>¿Creés que es por moda o por algo técnico?</p>
                        </div>

                        <div className="pl-4 border-l-4 border-yellow-500/70">
                          <p className="font-medium text-foreground">Nico:</p>
                          <p>Seguro que es una moda. Al final, var siempre funcionó bien. ¿Para qué complicarlo?</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-card p-5 rounded-lg border">
                      <h3 className="font-mono text-sm text-muted-foreground mb-3">ESCENA 2 — PLANTEANDO LA DUDA</h3>
                      
                      <div className="space-y-4">
                        <div className="pl-4 border-l-4 border-blue-500/70">
                          <p className="font-medium text-foreground">Vero:</p>
                          <p>Te entiendo. Pero, ¿te puedo mostrar una diferencia práctica entre var y let?</p>
                        </div>

                        <div className="pl-4 border-l-4 border-yellow-500/70">
                          <p className="font-medium text-foreground">Nico:</p>
                          <p>Dale, pero seguro no es tan grave como dicen.</p>
                        </div>

                        <div className="pl-4 border-l-4 border-blue-500/70">
                          <p className="font-medium text-foreground">Vero:</p>
                          <div className="mt-2 bg-black/80 p-3 rounded text-sm">
                            <pre className="text-green-400 overflow-x-auto">
{`function test() {
  if (true) {
    var x = 10;
  }
  console.log(x); // ¿Qué creés que pasa?
}
test();`}
                            </pre>
                          </div>
                        </div>

                        <div className="pl-4 border-l-4 border-yellow-500/70">
                          <p className="font-medium text-foreground">Nico:</p>
                          <p>Imprime 10. var se mueve al principio, ¿no?</p>
                        </div>

                        <div className="pl-4 border-l-4 border-blue-500/70">
                          <p className="font-medium text-foreground">Vero:</p>
                          <p>Exacto. ¿Y si en vez de eso esperabas que x sólo exista dentro del if?</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-card p-5 rounded-lg border">
                      <h3 className="font-mono text-sm text-muted-foreground mb-3">ESCENA 3 — LA LÓGICA SIMPLE</h3>
                      
                      <div className="space-y-4">
                        <div className="pl-4 border-l-4 border-blue-500/70">
                          <p className="font-medium text-foreground">Vero:</p>
                          <p>Ahora con let, mirá lo mismo:</p>
                          <div className="mt-2 bg-black/80 p-3 rounded text-sm">
                            <pre className="text-green-400 overflow-x-auto">
{`function test() {
  if (true) {
    let x = 10;
  }
  console.log(x); // ReferenceError
}
test();`}
                            </pre>
                          </div>
                        </div>

                        <div className="pl-4 border-l-4 border-yellow-500/70">
                          <p className="font-medium text-foreground">Nico:</p>
                          <p>Uh... eso es más intuitivo en realidad. x debería morir con el bloque.</p>
                        </div>

                        <div className="pl-4 border-l-4 border-blue-500/70">
                          <p className="font-medium text-foreground">Vero:</p>
                          <p>Claro. let respeta el alcance de bloque. var no. Es como tener una puerta cerrada vs una cortina floja.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-card p-5 rounded-lg border">
                      <h3 className="font-mono text-sm text-muted-foreground mb-3">ESCENA 4 — EL MOMENTO DE CLARIDAD</h3>
                      
                      <div className="space-y-4">
                        <div className="pl-4 border-l-4 border-yellow-500/70">
                          <p className="font-medium text-foreground">Nico (pensativo):</p>
                          <p>Entonces, quizás estoy apegado a var solo porque lo conozco, no porque sea mejor.</p>
                        </div>

                        <div className="pl-4 border-l-4 border-blue-500/70">
                          <p className="font-medium text-foreground">Vero:</p>
                          <p>No pasa nada. A todos nos cuesta soltar lo familiar. Pero cuando entendemos la lógica, todo se acomoda.</p>
                        </div>

                        <div className="pl-4 border-l-4 border-yellow-500/70">
                          <p className="font-medium text-foreground">Nico (pausado):</p>
                          <p>¿Y si ese apego es lo que me hace discutir sin ver la razón?</p>
                        </div>

                        <div className="pl-4 border-l-4 border-blue-500/70">
                          <p className="font-medium text-foreground">Vero (sonriendo):</p>
                          <p>Eso es un sesgo. Y lo estás reconociendo. Esa es la parte difícil.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-card p-5 rounded-lg border">
                      <h3 className="font-mono text-sm text-muted-foreground mb-3">ESCENA 5 — TRANSFORMACIÓN</h3>
                      
                      <div className="space-y-4">
                        <div className="pl-4 border-l-4 border-yellow-500/70">
                          <p className="font-medium text-foreground">Nico:</p>
                          <p>Gracias. No era solo sobre let o var. Era sobre cómo pienso.<br/>
                          Me aferré a algo sin querer ver más allá.</p>
                        </div>

                        <div className="pl-4 border-l-4 border-blue-500/70">
                          <p className="font-medium text-foreground">Vero:</p>
                          <p>Esa es la trampa del sesgo: nos hace sentir que cuestionarnos es perder, cuando en realidad es crecer.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-primary/5 p-5 rounded-lg border border-primary/20">
                      <h3 className="font-semibold text-primary flex items-center mb-3">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Reflexión final
                      </h3>
                      <p className="text-sm text-foreground/90">
                        El sesgo no se vence con gritos ni verdades absolutas, sino con lógica simple, ejemplos concretos y paciencia.
                        Cuando la realidad se vuelve más clara que la creencia, la mente se abre sola.
                      </p>
                    </div>
                  </div>

                    <div className="mt-8 border-t pt-6">
                      <details className="group">
                        <summary className="flex items-center cursor-pointer text-foreground font-medium">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2 text-yellow-500">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                            <path d="m9 12 2 2 4-4"/>
                          </svg>
                          <span>📚 Diccionario Técnico</span>
                          <svg className="w-4 h-4 ml-auto transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </summary>
                        <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                          <h4 className="font-semibold mb-3">📖 ¿Qué es el hoisting?</h4>
                          <p className="text-sm mb-4">
                            En JavaScript, el hoisting (elevación) es el comportamiento por el cual ciertas declaraciones son movidas al inicio de su contexto de ejecución (ya sea una función o el ámbito global) antes de que el código se ejecute.
                          </p>
                          
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-medium mb-2">🧪 Con var</h5>
                              <pre className="bg-black/80 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`console.log(x); // undefined
var x = 10;`}
                              </pre>
                              <p className="text-xs mt-2 text-muted-foreground">
                                Aunque parece que accedés a x antes de declararla, no da error. ¿Por qué?
                                Porque JavaScript internamente hace algo como esto:
                              </p>
                              <pre className="bg-black/80 text-green-400 p-3 rounded text-xs overflow-x-auto mt-2">
{`var x;        // hoisting de la declaración (no del valor)
console.log(x); // undefined
x = 10;`}
                              </pre>
                            </div>

                            <div>
                              <h5 className="font-medium mb-2">🚫 Con let y const</h5>
                              <pre className="bg-black/80 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`console.log(x); // ❌ ReferenceError
let x = 10;`}
                              </pre>
                              <p className="text-xs mt-2 text-muted-foreground">
                                Acá no hay hoisting disponible para el uso temprano. La variable x está en lo que se llama el "temporal dead zone" (zona muerta temporal), desde el inicio del bloque hasta la línea donde se declara.
                              </p>
                            </div>

                            <div className="p-3 bg-yellow-500/10 border-l-4 border-yellow-500/50">
                              <h5 className="font-medium text-yellow-500">✅ Entonces: ¿es real?</h5>
                              <p className="text-xs mt-1">
                                Sí. El hoisting es un comportamiento real del lenguaje, definido en la especificación de ECMAScript.
                                La explicación que usa Vero es una analogía, pero la mecánica es técnica y exacta.
                              </p>
                            </div>
                          </div>
                        </div>
                      </details>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t flex justify-end">
                  <Button onClick={toggleDocumentation}>Cerrar</Button>
                </div>
              </div>
            </div>
          
        )}

        <header className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold tracking-tight">{tarea.titulo}</h1>
          <p className="text-muted-foreground mt-2">{tarea.objetivo}</p>
        </header>

        <main className="container mx-auto p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Panel de código */}
            <div className="lg:col-span-2">
              <div className="bg-card text-card-foreground rounded-lg border shadow-sm h-full flex flex-col">
                <div className="p-4 border-b">
                  <h2 className="text-xl font-semibold">Editor de Código</h2>
                </div>
                <div className="flex-1 flex flex-col p-4">
                  <div className="flex-1 min-h-[200px] bg-background rounded-md border overflow-hidden">
                    <textarea
                      className="w-full h-full font-mono p-4 resize-none focus:outline-none bg-background text-foreground"
                      value={codigo}
                      onChange={(e) => setCodigo(e.target.value)}
                      spellCheck="false"
                      style={{
                        lineHeight: "1.5",
                        tabSize: 2,
                        minHeight: "110%",
                      }}
                    />
                  </div>
                  <div className="mt-4">
                    <Button
                      className="bg-zinc-900/40 hover:bg-zinc-900 text-foreground font-bold"
                      onClick={() => {
                        // Aquí iría la lógica para verificar la solución
                        alert("Verificando solución...");
                      }}
                    >
                      Verificar Solución
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel de información */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-card text-card-foreground rounded-lg border shadow-sm">
                <div className="p-4 border-b">
                  <h2 className="text-xl font-semibold">Instrucciones</h2>
                </div>
                <div className="p-4 prose dark:prose-invert max-w-none">
                  <div
                    dangerouslySetInnerHTML={{ __html: tarea.instrucciones }}
                  />
                </div>
              </div>

              <div className="bg-card text-card-foreground rounded-lg border shadow-sm">
                <div className="p-4 border-b">
                  <h2 className="text-xl font-semibold">Objetivo</h2>
                </div>
                <div className="p-4">
                  <p className="text-muted-foreground">{tarea.objetivo}</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="border-t py-6 mt-8">
          <div className="container mx-auto text-center text-muted-foreground">
            <p>Consola de Desarrollo - {new Date().getFullYear()}</p>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
