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
style.css                  # Estilos base (tema claro/oscuro con variables CSS)
style_ML.css               # Capa de estilos adicional (sidebar de módulos)
script.js                  # JS base (navegación, buscador, tema)
script_ML.js               # JS adicional (sidebar de módulos)
favicon.svg                # Favicon (chispa de IA, degradé azul marino → azul)
*.png / *.svg              # Imágenes (InoTech, portada, infografías)
```

## Capas de estilos/JS (`_ML`)

Los módulos y `herramientas.html` cargan **dos capas**: la base (`style.css` + `script.js`)
y una capa adicional con el sufijo `_ML` (`style_ML.css` + `script_ML.js`) que aporta el
sidebar y funciones extra de los módulos.

- El sufijo `_ML` **solo sobrevive en los assets** (`style_ML.css`, `script_ML.js`).
  Las páginas HTML ya NO lo usan: tienen nombres limpios (`modulo1_introIA.html`, etc.).
- Antes existían "versiones simples" duplicadas de cada módulo; **fueron eliminadas** y las
  `_ML` se renombraron a los nombres limpios. No recrees duplicados salvo pedido explícito.
- Páginas que cargan la capa `_ML`: los 4 módulos + `herramientas.html`. El resto
  (`index`, `glosario`, `noticias`, `contacto`) usan solo la capa base.

## Estilos y diseño

- Tema **claro/oscuro** vía variables CSS (`:root` y selector de tema en `style.css`).
- Paleta de marca: azul marino `#0B2341` (primario), azul `#1976d2` y `#42a5f5` (acentos),
  azul claro `#e3f2fd` (nav). Modo oscuro usa `#121212`, violeta `#bb86fc`, celeste `#90caf9`.
- Reutilizá las variables CSS existentes; no hardcodees colores nuevos sin necesidad.

## Reglas técnicas (no romper)

- **Rutas siempre relativas** (`href="style.css"`, `href="favicon.svg"`). Nunca uses rutas
  absolutas con `/` inicial: el sitio debe funcionar tanto en Vercel como abriendo el archivo.
- Todos los assets viven en la **raíz** del repo (no hay subcarpetas).
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
