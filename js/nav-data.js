/* ============================================================
   nav-data.js — Manifiesto de navegación del curso
   ------------------------------------------------------------
   ESTE ES EL ÚNICO ARCHIVO QUE EDITÁS PARA AGREGAR UNA UNIDAD.
   Cada entrada = un ítem del sidebar global.

   - label: texto que se ve en el sidebar.
   - href:  archivo .html (siempre ruta relativa, sin "/" inicial).

   Para sumar una unidad nueva: copiá una línea, cambiá label y href,
   y creá el .html correspondiente. El sidebar se actualiza solo.
   ============================================================ */
window.CURSO_NAV = [
  { label: "Inicio",                       href: "index.html" },
  { label: "Módulo 1: Introducción a la IA", href: "modulo1_introIA.html" },
  { label: "Módulo 2: ChatGPT",            href: "modulo2_chatgpt.html" },
  { label: "Módulo 3: GPTs",               href: "modulo3_gpts.html" },
  { label: "Módulo 4: GPTs Avanzados",     href: "modulo4_gpts_avanzados.html" },
  { label: "Herramientas",                 href: "herramientas.html" },
  { label: "Glosario",                     href: "glosario.html" },
  { label: "Noticias",                     href: "noticias.html" },
  { label: "Contacto",                     href: "contacto.html" },
  // ⚙️ TEMPORAL: demo del motor dinámico. Borrá esta línea cuando lo apruebes.
  { label: "⚙️ Demo (motor dinámico)",     href: "modulo_demo.html" },
];
