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
  sidebar.css              # Sidebar global tipo "docs"
  module.css               # Buscador interno de módulos / catálogo de herramientas
  home.css                 # Tarjetas de bienvenida del index

js/                        # TODO el JS vive acá
  script.js                # JS base (navegación, buscador, tema, footer)
  nav-data.js              # Manifiesto: lista de módulos/unidades del sidebar global
  sidebar.js               # Construye el sidebar global tipo "docs"
  renderer.js              # MOTOR dinámico: convierte data/<modulo>.js en página
  module-search.js         # Buscador interno de módulos (y de tarjetas en herramientas.html)

data/                      # Contenido de los módulos dinámicos (solo datos, sin diseño)
  modulo_demo.js           # Ejemplo de referencia

favicon.svg                # Favicon (chispa de IA, degradé azul marino → azul)
*.png / *.svg              # Imágenes (InoTech, portada, infografías) — siguen en la raíz
```

## Sidebar global (todas las páginas de contenido)

Todas las páginas de contenido (`index`, módulos 1-4, `herramientas.html`, `glosario.html`,
`noticias.html`) usan un **sidebar tipo "docs"**: una sola barra lateral persistente que
lista todos los módulos/unidades del curso, con las secciones de la página actual
desplegadas debajo. La migración desde el sidebar viejo (capa `_ML`) ya se completó; esos
archivos (`css/style_ML.css`, `js/script_ML.js`) fueron borrados.

- **`contacto.html` / `contacto_dark.html` quedan afuera a propósito**: tienen un diseño
  propio standalone (tarjeta oscura con degradé, tipografía y layout distintos a la base
  del sitio) sin la estructura `.container`/header estándar. No les agregues el sidebar
  salvo pedido explícito del usuario.

- **`js/nav-data.js`** es el ÚNICO archivo que se edita para agregar una unidad: una
  entrada `{ label, href }` por módulo. El sidebar se arma solo a partir de esa lista.
- **`js/sidebar.js`** lee el manifiesto, detecta la página actual, lista sus secciones
  y maneja el modo móvil (off-canvas). Reconoce dos formas de sección navegable:
  `<section class="module" id="..."><h2>` (módulos de texto largo) y
  `<div class="category-section" id="..."><h3>` (páginas de catálogo, como
  `herramientas.html`).
- **`css/sidebar.css`** estiliza el sidebar usando las variables de tema de `style.css`
  (claro/oscuro automático).
- Markup requerido en la página: `<div class="container docs-page">` y dentro
  `<div class="docs-layout"> <aside id="docs-sidebar"><nav id="docs-nav"></nav></aside>
  <main id="docs-main">…secciones…</main> </div>`.
- La barra superior (`<nav>`) de estas páginas ya **no repite** los links del sidebar
  (Inicio/Módulos/Herramientas/etc.) — solo queda el botón de tema. Todo el listado de
  contenido vive en el sidebar para no duplicar navegación.
- **`js/module-search.js`** es el buscador compartido: filtra por `<section class="module">`
  en los módulos, o tarjeta por tarjeta (`.tool-card`) en `herramientas.html`, ocultando
  además `.category-section`/`section` que se quedan sin resultados visibles.

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

## Capa legacy `_ML` (retirada)

El sidebar viejo se servía con la capa `_ML` (`css/style_ML.css` + `js/script_ML.js`).
Ya **no existe**: todas las páginas de contenido (`index`, módulos 1-4,
`herramientas.html`, `glosario.html`, `noticias.html`) migraron al sidebar global tipo
docs. `contacto.html`/`contacto_dark.html` nunca usaron `_ML` y quedan con su diseño
propio (ver arriba). No recrees versiones duplicadas de los módulos salvo pedido explícito.

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
