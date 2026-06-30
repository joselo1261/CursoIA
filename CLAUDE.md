# CLAUDE.md

Guía para trabajar en este repositorio. Léela antes de modificar archivos.

## Qué es este proyecto

**Curso IA** — "Guía Completa de Inteligencia Artificial". Un sitio web educativo
**estático** en español sobre IA (introducción, ChatGPT, GPTs, herramientas, glosario,
noticias). Público general / principiantes.

- **Sin framework, sin build step.** Es HTML + CSS + JavaScript vanilla.
  Se editan los archivos directamente; no hay `npm install`, ni bundler, ni transpilación.
- Para previsualizar: abrí el `.html` en el navegador (o usá un Live Server).

## Estructura

```
index.html                 # Portada / hub de navegación
modulo1_introIA.html       # Módulo 1: Introducción a la IA
modulo2_chatgpt.html       # Módulo 2: ChatGPT
modulo3_gpts.html          # Módulo 3: GPTs
modulo4_gpts_avanzados.html  # Módulo 4: GPTs avanzados
herramientas.html          # Catálogo de herramientas de IA
glosario.html              # Glosario de términos
noticias.html              # Noticias de IA
contacto.html / contacto_dark.html  # Formulario de contacto (CSS/JS inline)

_plantilla_modulo.html     # Plantilla para crear un módulo dinámico nuevo
modulo_demo.html           # Demo del motor dinámico (TEMPORAL, borrar al terminar)
COMO-CREAR-UN-MODULO.md    # Guía: cómo crear módulos con el motor dinámico

css/                       # TODO el CSS vive acá
  style.css                # Estilos base + componentes/infografías (tema claro/oscuro)
  sidebar.css              # Sidebar global tipo "docs" (sistema nuevo)
  module.css               # Buscador interno de módulos
  style_ML.css             # Capa legacy (sidebar viejo, aún usada por mód. 2-4 + herramientas)

js/                        # TODO el JS vive acá
  script.js                # JS base (navegación, buscador, tema, footer)
  nav-data.js              # Manifiesto: lista de módulos/unidades del sidebar global
  sidebar.js               # Construye el sidebar global tipo "docs"
  renderer.js              # MOTOR dinámico: convierte data/<modulo>.js en página
  module-search.js         # Buscador interno de módulos
  script_ML.js             # Capa legacy (sidebar viejo, aún usada por mód. 2-4 + herramientas)

data/                      # Contenido de los módulos dinámicos (solo datos, sin diseño)
  modulo_demo.js           # Ejemplo de referencia

favicon.svg                # Favicon (chispa de IA, degradé azul marino → azul)
*.png / *.svg              # Imágenes (InoTech, portada, infografías) — siguen en la raíz
```

> **Migración en curso:** se está reemplazando el sidebar viejo (`_ML`) por un
> **sidebar global tipo docs** (`css/sidebar.css` + `js/sidebar.js` + `js/nav-data.js`).
> El **Módulo 1 ya está migrado** (no carga `_ML`). El resto (mód. 2-4 + `herramientas.html`)
> todavía usa la capa `_ML` hasta replicar el patrón.

## Sidebar global (sistema nuevo)

El sistema nuevo es un **sidebar tipo "docs"**: una sola barra lateral persistente que
lista todos los módulos/unidades, con las secciones del módulo actual desplegadas debajo.

- **`js/nav-data.js`** es el ÚNICO archivo que se edita para agregar una unidad: una
  entrada `{ label, href }` por módulo. El sidebar se arma solo a partir de esa lista.
- **`js/sidebar.js`** lee el manifiesto, detecta la página actual, lista sus secciones
  (`<section class="module" id="...">` con su `<h2>`), resalta la activa al hacer scroll
  y maneja el modo móvil (off-canvas).
- **`css/sidebar.css`** estiliza el sidebar usando las variables de tema de `style.css`
  (claro/oscuro automático).
- Markup requerido en la página: `<div class="container docs-page">` y dentro
  `<div class="docs-layout"> <aside id="docs-sidebar"><nav id="docs-nav"></nav></aside>
  <main id="docs-main">…secciones…</main> </div>`.

## Motor de módulos dinámicos

Para los módulos NUEVOS hay un motor que separa **contenido** de **diseño**: escribís
solo datos y la página se arma sola. Ver la guía completa en
[`COMO-CREAR-UN-MODULO.md`](COMO-CREAR-UN-MODULO.md).

- **`data/<modulo>.js`** define `window.MODULO = { titulo, subtitulo, secciones: [...] }`.
  Cada sección tiene `id`, `titulo` y `bloques` (bloques tipados: `parrafo`, `lista`,
  `tabla`, `callout`, `imagen`, `linea-tiempo`, `pasos`, `tarjetas`, `riesgos`, etc.).
- **`js/renderer.js`** lee `window.MODULO` y construye TODO (header, nav, buscador,
  sidebar y secciones). Genera las mismas clases que `css/style.css` ya estiliza.
- **`_plantilla_modulo.html`** es el shell a copiar. La ÚNICA línea que cambia por módulo
  es `<script src="data/<modulo>.js" defer></script>`.
- **Orden de carga (defer):** `nav-data.js` → `data/<modulo>.js` → `renderer.js` →
  `sidebar.js` → `module-search.js` → `script.js`. El orden importa: el renderer arma el
  DOM antes de que el sidebar y el buscador lo lean.
- **Crear un módulo:** copiar la plantilla, apuntar el `src` de datos, crear `data/<modulo>.js`
  y agregar una línea en `js/nav-data.js`. Nada de tocar HTML de estructura.
- **Para un componente nuevo:** agregar un `tipo` en el objeto `BLOQUES` de `js/renderer.js`.
- Los módulos 1-4 actuales son HTML hecho a mano (no usan el motor); conviven sin problema
  porque el sidebar y el buscador leen el DOM, sin importar cómo se generó.

> **Cuidado (bug ya resuelto):** el buscador (`module-search.js`) no debe reescribir el
> `innerHTML` de elementos que contienen otros elementos; los aplanaba (rompía la línea de
> tiempo). El guard `if (el.children.length > 0) return;` en `hi()` lo evita. No lo quites.

## Capa legacy `_ML` (en retirada)

El sidebar viejo se servía con la capa `_ML` (`css/style_ML.css` + `js/script_ML.js`).

- **Módulo 1 ya NO usa `_ML`**: migrado al sidebar global. Es la página de referencia.
- Todavía cargan `_ML`: **módulos 2-4 + `herramientas.html`** (pendientes de migrar).
- `index`, `glosario`, `noticias`, `contacto` nunca usaron `_ML` (solo capa base).
- No recrees versiones duplicadas de los módulos salvo pedido explícito.

## Estilos y diseño

- Tema **claro/oscuro** vía variables CSS (`:root` y selector de tema en `style.css`).
- Paleta de marca: azul marino `#0B2341` (primario), azul `#1976d2` y `#42a5f5` (acentos),
  azul claro `#e3f2fd` (nav). Modo oscuro usa `#121212`, violeta `#bb86fc`, celeste `#90caf9`.
- Reutilizá las variables CSS existentes; no hardcodees colores nuevos sin necesidad.

## Reglas técnicas (no romper)

- **Rutas siempre relativas** (`href="css/style.css"`, `src="js/script.js"`,
  `href="favicon.svg"`). Nunca uses rutas absolutas con `/` inicial: el sitio debe
  funcionar tanto en Vercel como abriendo el archivo.
- **CSS** vive en `css/` y **JS** en `js/`. **Sin CSS/JS inline en las páginas**: extraé
  todo a un archivo dentro de `css/` o `js/`.
- Las **imágenes y el favicon** siguen en la **raíz** del repo. Ojo: las rutas dentro de un
  `.css` se resuelven relativas al `.css`; las rutas dentro de un `.js` se resuelven
  relativas al HTML que lo carga.
- El `<link rel="icon" type="image/svg+xml" href="favicon.svg">` va en el `<head>` de cada
  página. Si creás una página nueva, agregalo.

## Deploy

- **Hosting: Vercel** (sitio estático, sin build). Cada `git push` a `main` dispara un
  deploy automático.
- Repo: `https://github.com/joselo1261/CursoIA` (rama `main`).
- GitHub Pages está **desactivado** a propósito (Vercel es la única fuente de publicación).
- Los favicons/imágenes se cachean fuerte en el navegador: tras un cambio, probá con
  hard refresh (`Ctrl+Shift+R`) o ventana de incógnito antes de dar algo por roto.

## Git

- Commits en español, formato `tipo: descripción` (ej. `feat: agregar favicon`,
  `fix: corregir enlace del módulo 3`, `docs: ...`).
- **No commitear ni pushear sin que el usuario lo pida.**
- Trabajar siempre sobre `main` salvo indicación distinta.
