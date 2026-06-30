# Cómo crear un módulo nuevo

Esta guía es tu manual para sumar módulos al curso usando el **motor dinámico**.
Escribís **solo contenido** en un archivo de datos y el diseño se aplica solo.

## Resumen rápido (3 pasos)

1. **Copiá** `_plantilla_modulo.html` → renombralo (ej. `modulo5.html`).
2. En ese HTML, cambiá **una sola línea**: el `src` del archivo de datos.
   ```html
   <script src="data/modulo5.js" defer></script>
   ```
3. **Creá** `data/modulo5.js` (copiá `data/modulo_demo.js` de base) y agregá **una línea**
   en `js/nav-data.js`:
   ```js
   { label: "Módulo 5: Tu título", href: "modulo5.html" },
   ```

Listo. El header, el sidebar, el buscador, el footer, el tema claro/oscuro y el
responsive se arman solos.

> Para previsualizar local sin sorpresas, usá **Live Server** (no abras el `file://`
> directo desde OneDrive, que a veces sirve copias viejas).

---

## Estructura del archivo de datos

```js
window.MODULO = {
  titulo: "Módulo 5: Automatización con IA",   // sale en el header y la pestaña
  subtitulo: "Guía de IA - Curso 2025",
  secciones: [
    {
      id: "p1",                 // id ÚNICO y corto (p1, p2, p3...). Lo usa el sidebar.
      titulo: "1. Introducción", // sale como <h2> y como ítem del sidebar
      bloques: [
        { tipo: "parrafo", texto: "..." },
        // ...más bloques
      ]
    }
  ]
};
```

**Reglas:**
- Cada sección necesita un `id` único (`p1`, `p2`, ...). El sidebar arma su navegación con eso.
- Numerá los títulos (`1.`, `2.`...) para que el sidebar quede ordenado.
- En cualquier `texto` podés usar etiquetas inline: `<strong>`, `<em>`, `<a href="...">`, `<code>`.

---

## Catálogo de bloques

### Texto base

#### `parrafo`
```js
{ tipo: "parrafo", texto: "La IA es <strong>importante</strong> porque..." }
```

#### `subtitulo`
```js
{ tipo: "subtitulo", nivel: 3, texto: "3.1. Un subtítulo" }   // nivel 3 o 4
```

#### `lista`
```js
{ tipo: "lista", items: ["Uno", "Dos", "Tres"] }
{ tipo: "lista", ordenada: true, items: ["Primero", "Segundo"] }   // numerada
{ tipo: "lista", variante: "check", items: ["Item con tilde", "Otro"] }
{ tipo: "lista", variante: "key-points", items: ["Punto clave 1", "Punto clave 2"] }
```
Variantes disponibles: `check`, `key-points`, `chips`, `glosario-inline`.

#### `tabla`
```js
{
  tipo: "tabla",
  caption: "Cuadro 1 — Comparación",   // opcional
  compacta: false,                      // opcional
  encabezados: ["Columna A", "Columna B"],
  filas: [
    ["fila1-A", "fila1-B"],
    ["fila2-A", "fila2-B"]
  ]
}
```

#### `callout` (caja de idea clave / aviso)
```js
{ tipo: "callout", texto: "Una nota importante." }
{ tipo: "callout", estilo: "info", texto: "<strong>Idea clave:</strong> ..." }
```

#### `imagen`
```js
{ tipo: "imagen", src: "infografia5.png", alt: "Descripción", ancho: "700px" }
```
> La imagen va en la **raíz** del repo (no en subcarpeta). `ancho` es opcional.

#### `html` (válvula de escape)
```js
{ tipo: "html", html: "<div class='lo-que-sea'>HTML libre acá</div>" }
```
Usalo para cualquier cosa que no tenga un bloque propio.

---

### Infografías

#### `chips` / `pills`
```js
{ tipo: "chips", items: ["Supervisado", "No supervisado", "Por refuerzo"] }
{ tipo: "pills", items: ["Definir", "Datos", "Modelar", "Desplegar"] }
```

#### `linea-tiempo`
```js
{
  tipo: "linea-tiempo",
  titulo: "Hitos de la IA",
  hitos: [
    { badge: "💬", anio: "1950", label: "Test de Turing" },
    { badge: "⚡", anio: "2017", label: "Transformers" }
  ]
}
```

#### `pasos` (stepper numerado)
```js
{
  tipo: "pasos",
  titulo: "Flujo de ML",
  items: ["Recolección", "Pretratamiento", "Entrenamiento", "Evaluación"]
}
```

#### `tarjetas` (grid de tarjetas)
```js
{
  tipo: "tarjetas",
  items: [
    { titulo: "Ventaja", texto: "Diseño consistente." },
    { titulo: "Escala", items: ["Sumar módulos", "Sumar bloques"] }
  ]
}
```

#### `componentes` (grid con íconos)
```js
{
  tipo: "componentes",
  items: [
    { icono: "🎯", titulo: "Objetivo", texto: "Meta concreta." },
    { icono: "🧠", titulo: "Modelo", texto: "El cerebro." }
  ]
}
```

#### `proceso` (cadena con flechas)
```js
{
  tipo: "proceso",
  flecha: "→",            // opcional (default →). Probá "⇄"
  variante: "two-lines",  // opcional
  pasos: [
    { badge: "1", texto: "<strong>Generador</strong>: crea datos" },
    { badge: "2", texto: "<strong>Discriminador</strong>: distingue" }
  ]
}
```

#### `flujo` (flowchart)
```js
{
  tipo: "flujo",
  titulo: "Flujo de un agente",
  pasos: [
    { icono: "🎯", titulo: "Objetivo", sub: "definido" },
    { icono: "🧠", titulo: "Razona", sub: "con el modelo" }
  ]
}
```

#### `riesgos` (tarjetas con semáforo)
```js
{
  tipo: "riesgos",
  tarjetas: [
    {
      num: "1",
      titulo: "Primera ola · Manipulación",
      nivel: "low",                       // "low" | "med" | "high"
      items: ["Deepfakes", "Voz clonada"],
      mitigacion: "Legislación y detección."
    }
  ]
}
```

#### `barras` (barras de impacto)
```js
{
  tipo: "barras",
  titulo: "Impacto por ámbito",
  filas: [
    { label: "Ciencia", valor: 0.88, texto: "Alto" },   // valor entre 0 y 1
    { label: "Trabajo", valor: 0.70, texto: "Medio" }
  ]
}
```

#### `beneficios` (grid de beneficios)
```js
{
  tipo: "beneficios",
  tarjetas: [
    {
      badge: "Ciencia",
      titulo: "Investigación y medicina",
      items: ["Aceleración de fármacos", "Diagnóstico por imagen"],
      stat: "Hecho: reduce ciclos de años a semanas."   // opcional
    }
  ]
}
```

---

## Ejemplo mínimo completo

`data/modulo5.js`:
```js
window.MODULO = {
  titulo: "Módulo 5: Automatización con IA",
  subtitulo: "Guía de IA - Curso 2025",
  secciones: [
    {
      id: "p1",
      titulo: "1. ¿Qué es automatizar con IA?",
      bloques: [
        { tipo: "parrafo", texto: "Automatizar con IA es..." },
        { tipo: "lista", variante: "check", items: ["Ahorra tiempo", "Reduce errores"] },
        { tipo: "callout", estilo: "info", texto: "<strong>Idea clave:</strong> empezá simple." }
      ]
    },
    {
      id: "p2",
      titulo: "2. Flujo típico",
      bloques: [
        { tipo: "pasos", titulo: "Pasos", items: ["Detectar tarea", "Diseñar flujo", "Probar", "Medir"] }
      ]
    }
  ]
};
```

`modulo5.html`: copia de `_plantilla_modulo.html` con la línea
`<script src="data/modulo5.js" defer></script>`.

`js/nav-data.js`: agregar
`{ label: "Módulo 5: Automatización con IA", href: "modulo5.html" },`

---

## Consejos para tu primer módulo real

- **Empezá simple.** 2-3 secciones con `parrafo`, `lista`, `tabla` y `callout`. Cuando
  funcione, le sumás infografías (`linea-tiempo`, `tarjetas`, `riesgos`...).
- **Una idea por sección.** Mejor varias secciones cortas que una gigante. Así el sidebar
  queda útil y el lector no se pierde.
- **Numerá los títulos** (`1.`, `2.`, `2.1.`...) para que el sidebar quede ordenado.
- **El contenido es TUYO.** Escribí tus propios apuntes y resúmenes con tus palabras.
  No copies y pegues el material original del curso (es material con derechos de su autor);
  además, resumir con tus palabras se entiende y se recuerda mucho mejor.
- **Reutilizá** `data/modulo_demo.js` como plantilla de bloques: copiás el que necesitás y
  cambiás el contenido.

## Detalles técnicos

- **IDs:** `p1`, `p2`, `p3`... siempre únicos dentro del módulo (alimentan el sidebar).
- **Imágenes:** van en la raíz del repo, ruta relativa (`"foto.png"`, sin `/` inicial).
- **Tema:** no hardcodees colores; el diseño usa las variables de `css/style.css`.
- **Comas y llaves:** el archivo de datos es JavaScript. Una coma o `}` de menos rompe todo
  el módulo. Cuidá que cada bloque termine en `,` y que abras/cierres bien `{ }` y `[ ]`.
- **Algo muy custom:** usá el bloque `{ tipo: "html", html: "..." }` (con moderación).
- **Bloque nuevo:** si necesitás un componente que no existe, se agrega un `tipo` en el
  objeto `BLOQUES` de `js/renderer.js`.

## Checklist antes de subir

- [ ] Cada sección tiene un `id` único (`p1`, `p2`...).
- [ ] El archivo de datos no tiene errores de sintaxis (comas/llaves) — abrí la consola
      del navegador (F12) y revisá que no haya errores en rojo.
- [ ] El **sidebar** lista las secciones del módulo y resaltan al hacer scroll.
- [ ] El **buscador** interno encuentra texto del módulo.
- [ ] Se ve bien en **claro y oscuro** (botón 🌙) y en **móvil** (ventana angosta).
- [ ] Agregaste la línea en `js/nav-data.js`.
- [ ] Lo previsualizaste con **Live Server** o en Vercel (no `file://` directo desde OneDrive).

## Problemas comunes

- **"Falta el contenido del módulo"** → el HTML no cargó el `data/<modulo>.js`, o el archivo
  tiene un error de sintaxis. Revisá la línea `<script src="data/...">` y la consola (F12).
- **El sidebar no muestra las secciones** → revisá que cada sección tenga `id` y `titulo`.
- **Un bloque no aparece** → el `tipo` está mal escrito. La consola avisa
  "tipo de bloque desconocido".
- **Cambios que no se ven al previsualizar local** → es OneDrive sirviendo copias viejas.
  Usá Live Server, o probá directo en Vercel (deploy fresco).

## Cómo subirlo (deploy)

```bash
git add -A
git commit -m "feat: agregar módulo 5 (Automatización con IA)"
git push origin main
```

Cada `push` a `main` dispara el deploy automático en Vercel. En ~1 minuto está publicado.
Si tras subir algo se ve raro, hacé `Ctrl+Shift+R` (hard refresh) antes de dar nada por roto.
