"use client";

import type { Tarea } from "@/types/tarea";

// Tarea 0: Comportamiento de var vs let
const tareaVarLet: Tarea = {
  id: "tarea-var-let",
  nivel: 0,
  tipo: "psicológico",
  titulo: "Alcance de Variables: var vs let",
  instrucciones: "Observa el siguiente código y corrige el uso de 'var' por 'let' para entender la diferencia en el alcance de las variables.",
  objetivo: "Entender la diferencia en el alcance de las variables declaradas con 'var' y 'let'.",
  lenguaje: "JavaScript",
  codigoInicial: `function test() {
  if (true) {
    var x = 10; // Intenta cambiar 'var' por 'let'
  }
  console.log(x); // ¿Por qué x es accesible aquí?
}
test();`,
  codigoSolucion: `function test() {
  if (true) {
    let x = 10; // 'let' limita el alcance al bloque
  }
  console.log(x); // ReferenceError: x is not defined
}
test();`,
  errores: [
    {
      tipo: "error",
      linea: 3,
      mensaje: "Uso de 'var' que permite el hoisting y tiene alcance de función, no de bloque.",
    },
  ],
  mensajeExito: "¡Perfecto! Has entendido la diferencia entre 'var' y 'let'. El uso de 'let' restringe el alcance de la variable al bloque donde fue declarada, lo que evita errores sutiles en el código.",
  puntoNLP: "El uso de 'let' en lugar de 'var' promueve un código más predecible y menos propenso a errores.",
  demostracion: (
    <div className="text-sm">
      <p>Comportamiento de las variables:</p>
      <ul className="list-disc pl-5 mt-2">
        <li><code>var</code>: Tiene alcance de función y sufre hoisting, permitiendo acceder a la variable fuera del bloque donde fue declarada.</li>
      <li><code>let</code>: Tiene alcance de bloque, lo que significa que solo existe dentro del bloque donde fue declarada (entre llaves {}).</li>
      </ul>
    </div>
  ),
  lineasEditables: [3],
  verificarSolucion: (codigo: string) => {
    return codigo.includes("let x = 10") && !codigo.includes("var x = 10");
  },
  verificarErrorCorregido: (codigo: string, linea: number) => {
    return codigo.includes("let x = 10");
  },
  documentacion: `
    <h4>El Caso de la Variable Fantasma</h4>
    
    <p>Diálogo técnico entre agentes del Umbral — Caso: La Variable Fantasma</p>
    
    <h5>🎭 Personajes:</h5>
    <p><strong>León Marechal</strong>: detective veterano, aferrado a lo conocido. Todavía cree que var es suficiente.</p>
    <p><strong>Lúa Ferré</strong>: agente lógico, perfil bajo, mirada quirúrgica. Ve más allá del código y detecta los sesgos como si fueran espectros.</p>
    
    <h5>🔍 EL DESCUBRIMIENTO</h5>
    
    <p><strong>León Marechal</strong> (resoplando frente al monitor):</p>
    <p>No entiendo la obsesión con let. var siempre funcionó. Cualquiera que haya sobrevivido al caso ParseFloat-72 sabe que no hace falta cambiar lo que ya sirve.</p>
    
    <p><strong>Lúa Ferré</strong> (desde la sombra, sin levantar la voz):</p>
    <p>El código que "sirve" no siempre es el que dice la verdad, Marechal.</p>
    
    <h5>🧪 PRUEBA A — El Comportamiento de var</h5>
    <pre><code>function test() {
  if (true) {
    var x = 10;
  }
  console.log(x); // Imprime 10
}
test();</code></pre>
    
    <p><strong>Lúa</strong>:</p>
    <p>Acá x sobrevive fuera del bloque. Como un archivo filtrado por accidente. Nadie lo invitó a salir, pero igual cruzó la línea.</p>
    
    <p><strong>León</strong> (cruzado de brazos):</p>
    <p>Sí. Lo conozco. "Hoisting". Un clásico. ¿Y?</p>
    
    <h5>🧪 PRUEBA B — El Alcance de let</h5>
    <pre><code>function test() {
  if (true) {
    let x = 10;
  }
  console.log(x); // ReferenceError
}
test();</code></pre>
    
    <p><strong>Lúa</strong> (apuntando el error con calma):</p>
    <p>Ahora el archivo queda contenido. No escapa del bloque. No hay rastro fuera del límite lógico.</p>
    
    <p><strong>León</strong> (más callado):</p>
    <p>Entonces... let es más... predecible.</p>
    
    <p><strong>Lúa</strong>:</p>
    <p>Es más honesto. El var te hace creer que las reglas son claras, pero juega a escondidas con el compilador.</p>
    
    <h5>🧠 EPÍLOGO DE ARCHIVO</h5>
    <p>Conclusión del caso:</p>
    <ul>
      <li>El sesgo técnico se disfrazó de experiencia.</li>
      <li>Fue vencido con evidencia clara y estructura lógica.</li>
      <li>El agente afectado reconoció la distorsión sin resistencia.</li>
      <li>Nivel de contaminación ideológica: neutralizado.</li>
    </ul>
    
    <h4>¿Qué es el hoisting?</h4>
    <p>En JavaScript, el hoisting (elevación) es el comportamiento por el cual ciertas declaraciones son movidas al inicio de su contexto de ejecución (ya sea una función o el ámbito global) antes de que el código se ejecute.</p>
    
    <h5>🧪 Con var</h5>
    <pre><code>console.log(x); // undefined
var x = 10;</code></pre>
    
    <p>➡️ Aunque parece que accedés a x antes de declararla, no da error. ¿Por qué?</p>
    <p>Porque JavaScript internamente hace algo como esto:</p>
    
    <pre><code>var x;        // hoisting de la declaración (no del valor)
console.log(x); // undefined
x = 10;</code></pre>
    
    <h5>🚫 Con let y const</h5>
    <pre><code>console.log(x); // ❌ ReferenceError
let x = 10;</code></pre>
    
    <p>➡️ Acá no hay hoisting disponible para el uso temprano. La variable x está en lo que se llama el "temporal dead zone" (zona muerta temporal), desde el inicio del bloque hasta la línea donde se declara.</p>
    
    <h5>✅ Entonces: ¿es real?</h5>
    <p>Sí. El hoisting es un comportamiento real del lenguaje, definido en la especificación de ECMAScript.</p>
  `,
};

// Tarea 1: Desafío Psicológico
const tarea1: Tarea = {
  id: "tarea-1",
  nivel: 1,
  tipo: "psicológico",
  titulo: "Sesgos Cognitivos",
  instrucciones:
    "Identifica y corrige los sesgos cognitivos en el siguiente código que representa un proceso de toma de decisiones.",
  objetivo:
    "El código debe representar un proceso de toma de decisiones libre de sesgos cognitivos comunes.",
  lenguaje: "JavaScript",
  codigoInicial: `function tomarDecision(opciones) {
  // Elegimos la primera opción que vimos (sesgo de anclaje)
  let mejorOpcion = opciones[0];
  
  // Solo consideramos información que confirma nuestra elección inicial
  for (let i = 1; i < opciones.length; i++) {
    if (opciones[i].ventajas > mejorOpcion.ventajas) {
      // Ignoramos las desventajas (sesgo de confirmación)
      mejorOpcion = opciones[i];
    }
  }
  
  // Si la decisión la tomó un experto antes, la seguimos sin cuestionar
  if (opciones.algunaRecomendadaPorExperto) {
    return opciones.recomendadaPorExperto;
  }
  
  return mejorOpcion;
}`,
  codigoSolucion: `function tomarDecision(opciones) {
  // Evaluamos todas las opciones sin preferencia por la primera
  let mejorOpcion = null;
  let mejorPuntuacion = -Infinity;
  
  // Consideramos tanto ventajas como desventajas de cada opción
  for (let i = 0; i < opciones.length; i++) {
    const puntuacionTotal = opciones[i].ventajas - opciones[i].desventajas;
    
    if (puntuacionTotal > mejorPuntuacion) {
      mejorPuntuacion = puntuacionTotal;
      mejorOpcion = opciones[i];
    }
  }
  
  // Evaluamos críticamente incluso las recomendaciones de expertos
  if (opciones.algunaRecomendadaPorExperto) {
    const opcionExperto = opciones.recomendadaPorExperto;
    const puntuacionExperto = opcionExperto.ventajas - opcionExperto.desventajas;
    
    if (puntuacionExperto > mejorPuntuacion) {
      return opcionExperto;
    }
  }
  
  return mejorOpcion;
}`,
  errores: [
    {
      tipo: "error",
      linea: 3,
      mensaje:
        "Sesgo de anclaje: Se está eligiendo automáticamente la primera opción como punto de referencia.",
    },
    {
      tipo: "error",
      linea: 7,
      mensaje:
        "Sesgo de confirmación: Solo se consideran las ventajas e ignoran las desventajas.",
    },
    {
      tipo: "error",
      linea: 13,
      mensaje:
        "Sesgo de autoridad: Se acepta ciegamente la recomendación de un experto sin evaluación crítica.",
    },
  ],
  mensajeExito:
    "¡Excelente! Has identificado y corregido los sesgos cognitivos en el proceso de toma de decisiones. Ahora el código representa un enfoque más equilibrado y racional.",
  puntoNLP:
    "La conciencia de nuestros sesgos cognitivos es el primer paso para tomar decisiones más racionales y equilibradas.",
  demostracion: (
    <div className="text-sm">
      <p>Sesgos cognitivos corregidos:</p>
      <ul className="list-disc pl-5 mt-2">
        <li>Sesgo de anclaje: Ahora evaluamos todas las opciones por igual</li>
        <li>
          Sesgo de confirmación: Consideramos tanto ventajas como desventajas
        </li>
        <li>
          Sesgo de autoridad: Evaluamos críticamente las recomendaciones de
          expertos
        </li>
      </ul>
    </div>
  ),
  lineasEditables: [3, 7, 13], // Solo estas líneas serán editables
  verificarSolucion: (codigo: string) => {
    return (
      codigo.includes("opciones[i].desventajas") &&
      !codigo.includes("mejorOpcion = opciones[0]") &&
      codigo.includes("puntuacionExperto > mejorPuntuacion")
    );
  },
  verificarErrorCorregido: (codigo: string, linea: number) => {
    const lineasCodigo = codigo.split("\n");

    // Verificar corrección según la línea
    switch (linea) {
      case 3:
        // Verificar si se corrigió el sesgo de anclaje
        return (
          !lineasCodigo[2].includes("mejorOpcion = opciones[0]") &&
          (lineasCodigo[2].includes("null") ||
            lineasCodigo[2].includes("-Infinity"))
        );
      case 7:
        // Verificar si se corrigió el sesgo de confirmación
        return (
          (codigo.includes("desventajas") &&
            codigo.includes("puntuacionTotal")) ||
          codigo.includes("ventajas - ")
        );
      case 13:
        // Verificar si se corrigió el sesgo de autoridad
        return (
          codigo.includes("puntuacionExperto") &&
          codigo.includes("mejorPuntuacion")
        );
      default:
        return false;
    }
  },
  documentacion: `
    <h4>Desarrollo de la solución: Sesgos Cognitivos</h4>
    
    <p>Este desafío aborda tres sesgos cognitivos comunes que afectan nuestra toma de decisiones:</p>
    
    <h5>1. Sesgo de anclaje</h5>
    <p>El sesgo de anclaje ocurre cuando dependemos demasiado de la primera información que encontramos (el "ancla"). En el código original, automáticamente elegimos la primera opción como punto de referencia:</p>
    <pre><code>let mejorOpcion = opciones[0];</code></pre>
    
    <p>La solución es evaluar todas las opciones sin preferencia por la primera:</p>
    <pre><code>let mejorOpcion = null;
let mejorPuntuacion = -Infinity;</code></pre>
    
    <h5>2. Sesgo de confirmación</h5>
    <p>El sesgo de confirmación es la tendencia a buscar, interpretar y recordar información que confirma nuestras creencias existentes. En el código original, solo consideramos las ventajas e ignoramos las desventajas:</p>
    <pre><code>if (opciones[i].ventajas > mejorOpcion.ventajas) {
  // Ignoramos las desventajas
  mejorOpcion = opciones[i];
}</code></pre>
    
    <p>La solución es considerar tanto ventajas como desventajas:</p>
    <pre><code>const puntuacionTotal = opciones[i].ventajas - opciones[i].desventajas;
    
if (puntuacionTotal > mejorPuntuacion) {
  mejorPuntuacion = puntuacionTotal;
  mejorOpcion = opciones[i];
}</code></pre>
    
    <h5>3. Sesgo de autoridad</h5>
    <p>El sesgo de autoridad es la tendencia a atribuir mayor precisión a la opinión de una figura de autoridad. En el código original, seguimos ciegamente la recomendación de un experto:</p>
    <pre><code>if (opciones.algunaRecomendadaPorExperto) {
  return opciones.recomendadaPorExperto;
}</code></pre>
    
    <p>La solución es evaluar críticamente incluso las recomendaciones de expertos:</p>
    <pre><code>if (opciones.algunaRecomendadaPorExperto) {
  const opcionExperto = opciones.recomendadaPorExperto;
  const puntuacionExperto = opcionExperto.ventajas - opcionExperto.desventajas;
  
  if (puntuacionExperto > mejorPuntuacion) {
    return opcionExperto;
  }
}</code></pre>
    
    <p>Al corregir estos sesgos, creamos un proceso de toma de decisiones más racional y equilibrado.</p>
  `,
};

// Tarea 2: Desafío Filológico
const tarea2: Tarea = {
  id: "tarea-2",
  nivel: 2,
  tipo: "filológico",
  titulo: "Análisis Lingüístico",
  instrucciones:
    "Corrige los errores lingüísticos en el siguiente código que implementa un analizador de texto básico.",
  objetivo:
    "El código debe analizar correctamente las estructuras lingüísticas del texto proporcionado.",
  lenguaje: "JavaScript",
  codigoInicial: `function analizarTexto(texto) {
  // Dividir en palabras (incorrecto: ignora signos de puntuación)
  const palabras = texto.split(" ");
  
  // Contar frecuencia (error: no normaliza las palabras)
  const frecuencia = {};
  for (let i = 0; i < palabras.length; i++) {
    const palabra = palabras[i];
    if (frecuencia[palabra]) {
      frecuencia[palabra]++;
    } else {
      frecuencia[palabra] = 1;
    }
  }
  
  // Identificar verbos (error: método simplista)
  const verbos = palabras.filter(p => 
    p.endsWith("ar") || p.endsWith("er") || p.endsWith("ir")
  );
  
  // Identificar sustantivos (error: método incorrecto)
  const sustantivos = palabras.filter(p => 
    p.length > 3 && !verbos.includes(p)
  );
  
  return {
    totalPalabras: palabras.length,
    frecuencia,
    verbos,
    sustantivos
  };
}`,
  codigoSolucion: `function analizarTexto(texto) {
  // Dividir en palabras considerando signos de puntuación
  const palabras = texto.toLowerCase()
    .replace(/[.,;:!?()]/g, " ")
    .split(/\\s+/)
    .filter(p => p.length > 0);
  
  // Contar frecuencia normalizando las palabras
  const frecuencia = {};
  for (let i = 0; i < palabras.length; i++) {
    const palabra = palabras[i].toLowerCase();
    if (frecuencia[palabra]) {
      frecuencia[palabra]++;
    } else {
      frecuencia[palabra] = 1;
    }
  }
  
  // Identificar verbos con enfoque más preciso
  const terminacionesVerbales = ["ar", "er", "ir", "aba", "ía", "ando", "endo", "ado", "ido"];
  const verbos = palabras.filter(p => {
    // Verificar terminaciones verbales
    return terminacionesVerbales.some(term => p.endsWith(term)) &&
      // Excluir palabras que terminan igual pero no son verbos
      !["mar", "mujer", "taller", "zafir"].includes(p);
  });
  
  // Identificar sustantivos con enfoque más preciso
  const articulos = ["el", "la", "los", "las", "un", "una", "unos", "unas"];
  const posiblesSustantivos = [];
  
  for (let i = 0; i < palabras.length - 1; i++) {
    if (articulos.includes(palabras[i])) {
      posiblesSustantivos.push(palabras[i + 1]);
    }
  }
  
  return {
    totalPalabras: palabras.length,
    frecuencia,
    verbos,
    sustantivos: [...new Set(posiblesSustantivos)]
  };
}`,
  errores: [
    {
      tipo: "error",
      linea: 3,
      mensaje:
        "Error en tokenización: split(' ') no maneja correctamente los signos de puntuación.",
    },
    {
      tipo: "error",
      linea: 7,
      mensaje:
        "Error de normalización: no se convierten las palabras a minúsculas para el conteo de frecuencia.",
    },
    {
      tipo: "error",
      linea: 15,
      mensaje:
        "Error lingüístico: identificar verbos solo por terminaciones 'ar', 'er', 'ir' es impreciso.",
    },
    {
      tipo: "error",
      linea: 20,
      mensaje:
        "Error lingüístico: identificar sustantivos por longitud y exclusión de verbos es incorrecto.",
    },
  ],
  mensajeExito:
    "¡Muy bien! Has corregido los errores lingüísticos en el analizador de texto. Ahora el código implementa un enfoque más preciso para el análisis lingüístico.",
  puntoNLP:
    "El lenguaje es la herramienta más poderosa para estructurar nuestro pensamiento y comunicar ideas complejas.",
  demostracion: (
    <div className="text-sm">
      <p>Mejoras implementadas:</p>
      <ul className="list-disc pl-5 mt-2">
        <li>Tokenización correcta considerando signos de puntuación</li>
        <li>Normalización de palabras para conteo de frecuencia</li>
        <li>Identificación de verbos con múltiples terminaciones</li>
        <li>Identificación de sustantivos basada en patrones gramaticales</li>
      </ul>
    </div>
  ),
  lineasEditables: [2, 3, 7, 15, 16, 20, 21],
  verificarSolucion: (codigo: string) => {
    return (
      codigo.includes("toLowerCase()") &&
      codigo.includes("replace(/[.,;:!?()]/g") &&
      codigo.includes("terminacionesVerbales") &&
      codigo.includes("articulos")
    );
  },
  verificarErrorCorregido: (codigo: string, linea: number) => {
    const lineasCodigo = codigo.split("\n");

    // Verificar corrección según la línea
    switch (linea) {
      case 3:
        // Verificar si se corrigió la tokenización
        return (
          codigo.includes("replace(/[") && codigo.includes("split(/\\s+/)")
        );
      case 7:
        // Verificar si se corrigió la normalización
        return lineasCodigo[6].includes("toLowerCase()");
      case 15:
        // Verificar si se mejoró la identificación de verbos
        return (
          codigo.includes("terminacionesVerbales") ||
          codigo.includes("aba") ||
          codigo.includes("ando")
        );
      case 20:
        // Verificar si se mejoró la identificación de sustantivos
        return (
          codigo.includes("articulos") || codigo.includes("posiblesSustantivos")
        );
      default:
        return false;
    }
  },
  documentacion: `
    <h4>Desarrollo de la solución: Análisis Lingüístico</h4>
    
    <p>Este desafío aborda varios errores comunes en el procesamiento de lenguaje natural:</p>
    
    <h5>1. Tokenización incorrecta</h5>
    <p>La tokenización es el proceso de dividir un texto en unidades más pequeñas (tokens). El código original usa un método simplista que no maneja correctamente los signos de puntuación:</p>
    <pre><code>const palabras = texto.split(" ");</code></pre>
    
    <p>La solución implementa una tokenización más robusta:</p>
    <pre><code>const palabras = texto.toLowerCase()
  .replace(/[.,;:!?()]/g, " ")
  .split(/\\s+/)
  .filter(p => p.length > 0);</code></pre>
    
    <p>Esta solución:</p>
    <ul>
      <li>Convierte todo el texto a minúsculas para normalización</li>
      <li>Reemplaza los signos de puntuación con espacios</li>
      <li>Divide por cualquier cantidad de espacios en blanco</li>
      <li>Filtra tokens vacíos</li>
    </ul>
    
    <h5>2. Falta de normalización</h5>
    <p>El código original no normaliza las palabras al contar frecuencias, lo que significa que "Casa" y "casa" se contarían como palabras diferentes:</p>
    <pre><code>const palabra = palabras[i];</code></pre>
    
    <p>La solución normaliza las palabras a minúsculas:</p>
    <pre><code>const palabra = palabras[i].toLowerCase();</code></pre>
    
    <h5>3. Identificación simplista de verbos</h5>
    <p>El código original identifica verbos solo por tres terminaciones, lo que es muy impreciso:</p>
    <pre><code>const verbos = palabras.filter(p => 
  p.endsWith("ar") || p.endsWith("er") || p.endsWith("ir")
);</code></pre>
    
    <p>La solución utiliza un enfoque más completo:</p>
    <pre><code>const terminacionesVerbales = ["ar", "er", "ir", "aba", "ía", "ando", "endo", "ado", "ido"];
const verbos = palabras.filter(p => {
  return terminacionesVerbales.some(term => p.endsWith(term)) &&
    !["mar", "mujer", "taller", "zafir"].includes(p);
});</code></pre>
    
    <h5>4. Identificación incorrecta de sustantivos</h5>
    <p>El código original identifica sustantivos por longitud y exclusión de verbos, lo cual es lingüísticamente incorrecto:</p>
    <pre><code>const sustantivos = palabras.filter(p => 
  p.length > 3 && !verbos.includes(p)
);</code></pre>
    
    <p>La solución utiliza un enfoque basado en patrones gramaticales, identificando palabras que siguen a artículos:</p>
    <pre><code>const articulos = ["el", "la", "los", "las", "un", "una", "unos", "unas"];
const posiblesSustantivos = [];

for (let i = 0; i < palabras.length - 1; i++) {
  if (articulos.includes(palabras[i])) {
    posiblesSustantivos.push(palabras[i + 1]);
  }
}</code></pre>
    
    <p>Este enfoque, aunque no es perfecto, es lingüísticamente más fundamentado que el original.</p>
  `,
};

// Tarea 3: Desafío Filosófico
const tarea3: Tarea = {
  id: "tarea-3",
  nivel: 3,
  tipo: "filosófico",
  titulo: "Dilemas Éticos en IA",
  instrucciones:
    "Refactoriza el siguiente código que implementa un sistema de toma de decisiones éticas para una IA, corrigiendo los problemas filosóficos y éticos.",
  objetivo:
    "El código debe implementar un enfoque ético más equilibrado y considerar múltiples perspectivas filosóficas.",
  lenguaje: "JavaScript",
  codigoInicial: `function evaluarDecisionEtica(accion, contexto) {
  // Enfoque puramente utilitarista: solo importa maximizar la utilidad total
  let puntuacionEtica = 0;
  
  // Calcular beneficios para la mayoría
  const beneficioTotal = accion.beneficioPromedio * accion.personasAfectadas;
  
  // Ignorar completamente los daños a minorías si el beneficio total es alto
  if (beneficioTotal > 1000) {
    return {
      esEtica: true,
      puntuacion: beneficioTotal,
      justificacion: "Maximiza el bien para la mayoría"
    };
  }
  
  // Ignorar completamente los derechos individuales
  // No hay consideración de justicia o equidad
  
  // Ignorar el consentimiento de los afectados
  
  return {
    esEtica: beneficioTotal > 0,
    puntuacion: beneficioTotal,
    justificacion: "Basado únicamente en cálculo utilitarista"
  };
}`,
  codigoSolucion: `function evaluarDecisionEtica(accion, contexto) {
  // Enfoque multi-perspectiva que considera diferentes teorías éticas
  let puntuacionEtica = 0;
  let justificaciones = [];
  
  // 1. Perspectiva utilitarista: considera beneficios y daños
  const beneficioTotal = accion.beneficioPromedio * accion.personasAfectadas;
  const dañoTotal = accion.dañoPromedio * accion.personasAfectadasNegativamente;
  const utilidadNeta = beneficioTotal - dañoTotal;
  
  if (utilidadNeta > 0) {
    puntuacionEtica += utilidadNeta / 1000; // Normalizado
    justificaciones.push("Produce más beneficio que daño en total");
  } else {
    puntuacionEtica -= Math.abs(utilidadNeta) / 1000;
    justificaciones.push("Produce más daño que beneficio en total");
  }
  
  // 2. Perspectiva deontológica: respeto a derechos y dignidad
  if (accion.respetaDerechosIndividuales) {
    puntuacionEtica += 30;
    justificaciones.push("Respeta los derechos fundamentales de los individuos");
  } else {
    puntuacionEtica -= 30;
    justificaciones.push("Viola derechos fundamentales de los individuos");
  }
  
  // 3. Ética de la virtud: intenciones y carácter
  if (accion.intencionBeneficiosa) {
    puntuacionEtica += 15;
    justificaciones.push("La intención detrás de la acción es virtuosa");
  }
  
  // 4. Ética del cuidado: consideración de relaciones y vulnerabilidades
  if (accion.protegeVulnerables) {
    puntuacionEtica += 25;
    justificaciones.push("Protege a los más vulnerables");
  } else if (accion.dañaVulnerables) {
    puntuacionEtica -= 40;
    justificaciones.push("Daña a personas en situación vulnerable");
  }
  
  // 5. Justicia y equidad
  if (accion.distribuyeBeneficiosEquitativamente) {
    puntuacionEtica += 20;
    justificaciones.push("Distribuye beneficios de manera equitativa");
  }
  
  // 6. Consentimiento informado
  if (accion.tieneConsentimiento) {
    puntuacionEtica += 20;
    justificaciones.push("Cuenta con el consentimiento de los afectados");
  } else {
    puntuacionEtica -= 15;
    justificaciones.push("No cuenta con el consentimiento de los afectados");
  }
  
  return {
    esEtica: puntuacionEtica > 0,
    puntuacion: puntuacionEtica,
    justificacion: justificaciones.join(". "),
    perspectivasConsideradas: [
      "utilitarista", "deontológica", "virtud", 
      "cuidado", "justicia", "consentimiento"
    ]
  };
}`,
  errores: [
    {
      tipo: "error",
      linea: 2,
      mensaje:
        "Reduccionismo ético: El código solo implementa una perspectiva utilitarista, ignorando otras teorías éticas importantes.",
    },
    {
      tipo: "error",
      linea: 8,
      mensaje:
        "Falacia utilitarista: Ignora completamente los daños a minorías si el beneficio total es alto.",
    },
    {
      tipo: "error",
      linea: 16,
      mensaje:
        "Omisión ética: No considera los derechos individuales (perspectiva deontológica).",
    },
    {
      tipo: "error",
      linea: 18,
      mensaje:
        "Omisión ética: Ignora el consentimiento de los afectados por la decisión.",
    },
  ],
  mensajeExito:
    "¡Excelente trabajo! Has refactorizado el sistema de evaluación ética para incluir múltiples perspectivas filosóficas, creando un enfoque más equilibrado y completo.",
  puntoNLP:
    "La ética no es monolítica; al considerar múltiples perspectivas filosóficas, podemos tomar decisiones más sabias y equilibradas.",
  demostracion: (
    <div className="text-sm">
      <p>Perspectivas éticas incorporadas:</p>
      <ul className="list-disc pl-5 mt-2">
        <li>Utilitarismo: Balance de beneficios y daños</li>
        <li>Deontología: Respeto a derechos y dignidad</li>
        <li>Ética de la virtud: Intenciones y carácter</li>
        <li>Ética del cuidado: Consideración de vulnerabilidades</li>
        <li>Justicia: Distribución equitativa de beneficios</li>
        <li>Consentimiento: Respeto a la autonomía</li>
      </ul>
    </div>
  ),
  lineasEditables: [2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 16, 18, 22, 23, 24],
  verificarSolucion: (codigo: string) => {
    return (
      codigo.includes("dañoTotal") &&
      codigo.includes("respetaDerechosIndividuales") &&
      codigo.includes("consentimiento") &&
      codigo.includes("justicia")
    );
  },
  verificarErrorCorregido: (codigo: string, linea: number) => {
    // Verificar corrección según la línea
    switch (linea) {
      case 2:
        // Verificar si se corrigió el reduccionismo ético
        return (
          codigo.includes("multi-perspectiva") ||
          codigo.includes("diferentes teorías éticas")
        );
      case 8:
        // Verificar si se corrigió la falacia utilitarista
        return (
          codigo.includes("dañoTotal") ||
          codigo.includes("personasAfectadasNegativamente")
        );
      case 16:
        // Verificar si se añadió consideración de derechos individuales
        return (
          codigo.includes("deontológica") ||
          codigo.includes("respetaDerechosIndividuales")
        );
      case 18:
        // Verificar si se añadió consideración de consentimiento
        return (
          codigo.includes("tieneConsentimiento") ||
          codigo.includes("consentimiento")
        );
      default:
        return false;
    }
  },
  documentacion: `
    <h4>Desarrollo de la solución: Dilemas Éticos en IA</h4>
    
    <p>Este desafío aborda las limitaciones de un enfoque ético unidimensional en la toma de decisiones de IA. El código original implementa un enfoque puramente utilitarista, que tiene varias deficiencias filosóficas:</p>
    
    <h5>1. Reduccionismo ético</h5>
    <p>El código original reduce toda la ética al utilitarismo (maximizar el bien para la mayoría):</p>
    <pre><code>// Enfoque puramente utilitarista: solo importa maximizar la utilidad total</code></pre>
    
    <p>La solución implementa un enfoque multi-perspectiva que considera diferentes teorías éticas:</p>
    <pre><code>// Enfoque multi-perspectiva que considera diferentes teorías éticas</code></pre>
    
    <h5>2. Falacia utilitarista</h5>
    <p>El código original ignora completamente los daños a minorías si el beneficio total es alto:</p>
    <pre><code>// Ignorar completamente los daños a minorías si el beneficio total es alto
if (beneficioTotal > 1000) {
  return {
    esEtica: true,
    puntuacion: beneficioTotal,
    justificacion: "Maximiza el bien para la mayoría"
  };
}</code></pre>
    
    <p>La solución considera tanto beneficios como daños:</p>
    <pre><code>const beneficioTotal = accion.beneficioPromedio * accion.personasAfectadas;
const dañoTotal = accion.dañoPromedio * accion.personasAfectadasNegativamente;
const utilidadNeta = beneficioTotal - dañoTotal;</code></pre>
    
    <h5>3. Omisión de derechos individuales</h5>
    <p>El código original ignora completamente los derechos individuales:</p>
    <pre><code>// Ignorar completamente los derechos individuales</code></pre>
    
    <p>La solución incorpora una perspectiva deontológica (basada en deberes y derechos):</p>
    <pre><code>// 2. Perspectiva deontológica: respeto a derechos y dignidad
if (accion.respetaDerechosIndividuales) {
  puntuacionEtica += 30;
  justificaciones.push("Respeta los derechos fundamentales de los individuos");
} else {
  puntuacionEtica -= 30;
  justificaciones.push("Viola derechos fundamentales de los individuos");
}</code></pre>
    
    <h5>4. Omisión del consentimiento</h5>
    <p>El código original ignora el consentimiento de los afectados:</p>
    <pre><code>// Ignorar el consentimiento de los afectados</code></pre>
    
    <p>La solución incorpora el consentimiento como factor ético:</p>
    <pre><code>// 6. Consentimiento informado
if (accion.tieneConsentimiento) {
  puntuacionEtica += 20;
  justificaciones.push("Cuenta con el consentimiento de los afectados");
} else {
  puntuacionEtica -= 15;
  justificaciones.push("No cuenta con el consentimiento de los afectados");
}</code></pre>
    
    <h5>Perspectivas éticas adicionales</h5>
    <p>La solución también incorpora:</p>
    <ul>
      <li><strong>Ética de la virtud:</strong> Considera las intenciones y el carácter detrás de las acciones</li>
      <li><strong>Ética del cuidado:</strong> Considera las relaciones y la protección de los vulnerables</li>
      <li><strong>Justicia y equidad:</strong> Considera la distribución equitativa de beneficios</li>
    </ul>
    
    <p>Este enfoque multi-perspectiva proporciona una evaluación ética más completa y equilibrada, reconociendo que diferentes tradiciones filosóficas ofrecen perspectivas valiosas sobre cuestiones éticas complejas.</p>
  `,
};

// Exportar todas las tareas
export const tareas: Tarea[] = [tareaVarLet, tarea1, tarea2, tarea3];
