/* ============================================================
   data/modulo_demo.js — Módulo de DEMOSTRACIÓN del motor dinámico
   ------------------------------------------------------------
   Este archivo es SOLO contenido. El diseño lo aplica el renderer.
   Copialo como base para tus módulos reales.

   Estructura:
     window.MODULO = {
       titulo, subtitulo,
       secciones: [ { id, titulo, bloques: [ {tipo, ...} ] } ]
     }

   Tipos de bloque disponibles (Fase 1 - base):
     parrafo, subtitulo, lista, tabla, callout, imagen, html
   ============================================================ */
window.MODULO = {
  titulo: "Demo: Motor de Módulos Dinámicos",
  subtitulo: "Guía de Inteligencia Artificial - Curso 2025",
  secciones: [
    {
      id: "p1",
      titulo: "1. Cómo funciona este módulo",
      bloques: [
        {
          tipo: "parrafo",
          texto:
            "Esta página <strong>no tiene HTML de contenido escrito a mano</strong>. " +
            "Todo lo que ves se generó a partir de un archivo de datos " +
            "(<code>data/modulo_demo.js</code>) que el motor convierte en la página, " +
            "respetando el diseño del curso.",
        },
        {
          tipo: "lista",
          variante: "check",
          items: [
            "El <strong>sidebar</strong> de la izquierda se arma solo con estas secciones.",
            "El <strong>buscador</strong> de arriba funciona sobre el contenido generado.",
            "El <strong>tema claro/oscuro</strong> y el modo móvil andan sin tocar nada.",
          ],
        },
        {
          tipo: "callout",
          estilo: "info",
          texto:
            "<strong>Idea clave:</strong> para crear un módulo nuevo solo escribís un " +
            "archivo de datos como este y agregás una línea en <code>nav-data.js</code>.",
        },
      ],
    },
    {
      id: "p2",
      titulo: "2. Bloques de contenido",
      bloques: [
        {
          tipo: "subtitulo",
          nivel: 3,
          texto: "2.1. Listas y texto",
        },
        {
          tipo: "parrafo",
          texto:
            "Podés escribir párrafos con <em>énfasis</em>, <strong>negritas</strong> y " +
            "enlaces. Las listas soportan variantes de estilo del curso.",
        },
        {
          tipo: "subtitulo",
          nivel: 3,
          texto: "2.2. Tablas",
        },
        {
          tipo: "tabla",
          caption: "Cuadro — Tipos de bloque base",
          encabezados: ["Bloque", "Para qué sirve"],
          filas: [
            ["parrafo", "Texto con etiquetas inline"],
            ["lista", "Listas con o sin numeración y variantes"],
            ["tabla", "Cuadros con encabezados y filas"],
            ["callout", "Cajas de idea clave / aviso"],
            ["imagen", "Imágenes responsivas"],
            ["html", "Válvula de escape para cualquier HTML"],
          ],
        },
      ],
    },
    {
      id: "p3",
      titulo: "3. Buenas prácticas",
      bloques: [
        {
          tipo: "lista",
          variante: "key-points",
          items: [
            "Usá un <code>id</code> corto y único por sección (p1, p2, p3...).",
            "Numerá los títulos para que el sidebar quede ordenado.",
            "Para algo muy custom, usá el bloque <code>html</code>.",
          ],
        },
        {
          tipo: "callout",
          texto:
            "Todas las infografías de abajo se generaron desde datos, sin HTML a mano.",
        },
      ],
    },
    {
      id: "p4",
      titulo: "4. Línea de tiempo, pasos y chips",
      bloques: [
        {
          tipo: "linea-tiempo",
          titulo: "Hitos de ejemplo",
          hitos: [
            { badge: "💬", anio: "1950", label: "Inicio" },
            { badge: "🧠", anio: "1980s", label: "Aprendizaje" },
            { badge: "⚡", anio: "2017", label: "Transformers" },
            { badge: "🤖", anio: "2022", label: "Era generativa" },
          ],
        },
        {
          tipo: "pasos",
          titulo: "Flujo de ejemplo",
          items: ["Recolección", "Pretratamiento", "Entrenamiento", "Evaluación", "Mejora"],
        },
        {
          tipo: "chips",
          items: ["Supervisado", "No supervisado", "Por refuerzo"],
        },
      ],
    },
    {
      id: "p5",
      titulo: "5. Tarjetas, proceso, componentes y flujo",
      bloques: [
        {
          tipo: "tarjetas",
          items: [
            { titulo: "Ventaja", texto: "Diseño siempre consistente." },
            { titulo: "Escala", items: ["Sumar módulos", "Sumar bloques"] },
          ],
        },
        {
          tipo: "proceso",
          pasos: [
            { badge: "1", texto: "<strong>Datos</strong>: defino el contenido" },
            { badge: "2", texto: "<strong>Motor</strong>: lo convierte en página" },
          ],
        },
        {
          tipo: "componentes",
          items: [
            { icono: "🎯", titulo: "Objetivo", texto: "Meta del bloque." },
            { icono: "🧩", titulo: "Reuso", texto: "Mismo estilo en todos." },
          ],
        },
        {
          tipo: "flujo",
          titulo: "Flujo de ejemplo",
          pasos: [
            { icono: "📝", titulo: "Escribís", sub: "los datos" },
            { icono: "⚙️", titulo: "Renderiza", sub: "el motor" },
            { icono: "✅", titulo: "Listo", sub: "se acomoda" },
          ],
        },
      ],
    },
    {
      id: "p6",
      titulo: "6. Riesgos, barras y beneficios",
      bloques: [
        {
          tipo: "riesgos",
          tarjetas: [
            {
              num: "1",
              titulo: "Ejemplo de riesgo bajo",
              nivel: "low",
              items: ["Punto A", "Punto B"],
              mitigacion: "Acción de ejemplo.",
            },
            {
              num: "2",
              titulo: "Ejemplo de riesgo alto",
              nivel: "high",
              items: ["Punto C"],
              mitigacion: "Otra acción.",
            },
          ],
        },
        {
          tipo: "barras",
          titulo: "Impacto de ejemplo",
          filas: [
            { label: "Ciencia", valor: 0.88, texto: "Alto" },
            { label: "Educación", valor: 0.7, texto: "Medio" },
          ],
        },
        {
          tipo: "beneficios",
          tarjetas: [
            {
              badge: "Ciencia",
              titulo: "Ejemplo de beneficio",
              items: ["Beneficio 1", "Beneficio 2"],
              stat: "Dato destacado de ejemplo.",
            },
          ],
        },
      ],
    },
  ],
};
