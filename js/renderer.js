/* ============================================================
   renderer.js — Motor de módulos dinámicos
   ------------------------------------------------------------
   Lee window.MODULO (definido por data/<modulo>.js) y construye
   TODA la página: header, nav, buscador, layout y secciones.
   El sidebar (sidebar.js) y el buscador (module-search.js) se
   enganchan solos leyendo el DOM que este motor genera.

   ORDEN DE CARGA (defer, en este orden):
     nav-data.js  ->  data/<modulo>.js  ->  renderer.js
                  ->  sidebar.js  ->  module-search.js  ->  script.js

   NOTA: el texto de los bloques se inserta como HTML para permitir
   etiquetas inline (<strong>, <em>, <a>...). El contenido lo escribe
   el dueño del sitio (fuente confiable), no usuarios externos.
   ============================================================ */
(function () {
  var DATA = window.MODULO;

  /* ---------- Bloques: cada función devuelve un string HTML ---------- */
  var BLOQUES = {
    // { tipo:"parrafo", texto:"..." }
    parrafo: function (b) {
      return "<p>" + (b.texto || "") + "</p>";
    },

    // { tipo:"subtitulo", nivel:3|4, texto:"..." }
    subtitulo: function (b) {
      var n = b.nivel === 4 ? 4 : 3;
      return "<h" + n + ">" + (b.texto || "") + "</h" + n + ">";
    },

    // { tipo:"lista", ordenada:false, variante:"check"|"key-points"|..., items:[...] }
    lista: function (b) {
      var tag = b.ordenada ? "ol" : "ul";
      var cls = b.variante ? ' class="' + b.variante + '"' : "";
      var items = (b.items || [])
        .map(function (it) {
          return "<li>" + it + "</li>";
        })
        .join("");
      return "<" + tag + cls + ">" + items + "</" + tag + ">";
    },

    // { tipo:"tabla", caption:"", compacta:false, encabezados:[...], filas:[[...],[...]] }
    tabla: function (b) {
      var cap = b.caption ? "<caption>" + b.caption + "</caption>" : "";
      var th = (b.encabezados || [])
        .map(function (h) {
          return "<th>" + h + "</th>";
        })
        .join("");
      var rows = (b.filas || [])
        .map(function (r) {
          return (
            "<tr>" +
            (r || [])
              .map(function (c) {
                return "<td>" + c + "</td>";
              })
              .join("") +
            "</tr>"
          );
        })
        .join("");
      var cls = "tabla" + (b.compacta ? " tabla-compacta" : "");
      return (
        '<div class="table-responsive"><table class="' +
        cls +
        '">' +
        cap +
        "<thead><tr>" +
        th +
        "</tr></thead><tbody>" +
        rows +
        "</tbody></table></div>"
      );
    },

    // { tipo:"callout", estilo:"info"|"", texto:"..." }
    callout: function (b) {
      var cls = "callout" + (b.estilo ? " " + b.estilo : "");
      return '<div class="' + cls + '">' + (b.texto || "") + "</div>";
    },

    // { tipo:"imagen", src:"foto.png", alt:"...", ancho:"600px" }
    imagen: function (b) {
      var w = b.ancho ? ' style="max-width:' + b.ancho + ';height:auto;"' : "";
      return (
        '<img src="' +
        (b.src || "") +
        '" alt="' +
        (b.alt || "") +
        '"' +
        w +
        ' loading="lazy"/>'
      );
    },

    /* ---------- Infografías ricas (Fase 2) ---------- */

    // { tipo:"chips", items:["2015 · ResNet", ...] }
    chips: function (b) {
      var items = (b.items || [])
        .map(function (it) {
          return '<li class="chip">' + it + "</li>";
        })
        .join("");
      return '<ul class="chips">' + items + "</ul>";
    },

    // { tipo:"pills", items:["Definir problema", ...] }
    pills: function (b) {
      var items = (b.items || [])
        .map(function (it) {
          return '<span class="pill">' + it + "</span>";
        })
        .join("");
      return '<div class="pills">' + items + "</div>";
    },

    // { tipo:"pasos", titulo:"Flujo de ML", items:["Recolección", "Entrenamiento", ...] }
    pasos: function (b) {
      var aria = b.titulo ? ' aria-label="' + b.titulo + '"' : "";
      var steps = (b.items || [])
        .map(function (it, i) {
          return (
            '<div class="s-step"><span class="s-num">' +
            (i + 1) +
            '</span><span class="s-label">' +
            it +
            "</span></div>"
          );
        })
        .join("");
      return '<div class="stepper"' + aria + ">" + steps + "</div>";
    },

    // { tipo:"linea-tiempo", titulo:"...", hitos:[{badge:"💬", anio:"1950", label:"Test de Turing"}] }
    // Estilos inline para no depender de que style.css cargue bien (robustez).
    "linea-tiempo": function (b) {
      var aria = b.titulo ? ' aria-label="' + b.titulo + '"' : "";
      var nodeS =
        "display:flex;flex-direction:column;align-items:center;text-align:center;gap:.3rem;";
      var badgeS =
        "width:42px;height:42px;border-radius:50%;display:flex;align-items:center;" +
        "justify-content:center;background:var(--primary-color);color:#fff;font-size:20px;" +
        "box-shadow:0 6px 14px var(--shadow-color);";
      var yearS =
        "font-weight:800;padding:.1rem .55rem;border:1px solid var(--border-color);border-radius:10px;";
      var labelS = "font-size:.9rem;opacity:.9;line-height:1.25;";
      var nodes = (b.hitos || [])
        .map(function (h) {
          return (
            '<li class="node" style="' +
            nodeS +
            '"><div class="badge" aria-hidden="true" style="' +
            badgeS +
            '">' +
            (h.badge || "•") +
            '</div><div class="year" style="' +
            yearS +
            '">' +
            (h.anio || "") +
            '</div><div class="label" style="' +
            labelS +
            '">' +
            (h.label || "") +
            "</div></li>"
          );
        })
        .join("");
      // auto-fit: reparte parejo según la cantidad de hitos y sigue siendo responsive.
      var ulS =
        "display:grid;grid-template-columns:repeat(auto-fit,minmax(110px,1fr));" +
        "gap:.75rem;list-style:none;margin:0;padding:1rem;align-items:start;";
      return (
        '<div class="milestone-bar" role="group"' +
        aria +
        '><ul class="milestones" style="' +
        ulS +
        '">' +
        nodes +
        "</ul></div>"
      );
    },

    // { tipo:"tarjetas", items:[{titulo:"", texto:"", items:[...]}] }  -> k-cards
    tarjetas: function (b) {
      var cards = (b.items || [])
        .map(function (c) {
          var h = c.titulo ? "<h4>" + c.titulo + "</h4>" : "";
          var p = c.texto ? "<p>" + c.texto + "</p>" : "";
          var ul = c.items
            ? "<ul>" +
              c.items
                .map(function (it) {
                  return "<li>" + it + "</li>";
                })
                .join("") +
              "</ul>"
            : "";
          return '<article class="k-card">' + h + p + ul + "</article>";
        })
        .join("");
      return '<div class="k-cards">' + cards + "</div>";
    },

    // { tipo:"componentes", items:[{icono:"🎯", titulo:"Objetivo", texto:"..."}] } -> component-grid
    componentes: function (b) {
      var comps = (b.items || [])
        .map(function (c) {
          return (
            '<div class="comp"><div class="c-ico">' +
            (c.icono || "") +
            "</div><h4>" +
            (c.titulo || "") +
            "</h4><p>" +
            (c.texto || "") +
            "</p></div>"
          );
        })
        .join("");
      return '<div class="component-grid">' + comps + "</div>";
    },

    // { tipo:"proceso", flecha:"→", variante:"two-lines", pasos:[{badge:"1", texto:"..."}] } -> process-rail
    proceso: function (b) {
      var flecha = b.flecha || "→";
      var cls = "process-rail" + (b.variante ? " " + b.variante : "");
      var parts = (b.pasos || []).map(function (p) {
        return (
          '<div class="p-step"><span class="p-badge">' +
          (p.badge || "") +
          '</span><span class="p-label">' +
          (p.texto || "") +
          "</span></div>"
        );
      });
      var arrow = '<div class="p-arrow" aria-hidden="true">' + flecha + "</div>";
      return '<div class="' + cls + '">' + parts.join(arrow) + "</div>";
    },

    // { tipo:"flujo", titulo:"...", pasos:[{icono:"🎯", titulo:"Objetivo", sub:"definido"}] } -> flowchart
    flujo: function (b) {
      var aria = b.titulo ? ' aria-label="' + b.titulo + '"' : "";
      var steps = (b.pasos || [])
        .map(function (p, i) {
          return (
            '<li class="f-step">\n' +
            '<span class="f-count">' +
            (i + 1) +
            "</span>\n" +
            '<span class="f-ico" aria-hidden="true">' +
            (p.icono || "") +
            "</span>\n" +
            '<div class="f-title">' +
            (p.titulo || "") +
            "</div>\n" +
            '<div class="f-sub">' +
            (p.sub || "") +
            "</div>\n" +
            "</li>"
          );
        })
        .join("\n");
      // auto-fit: reparte parejo según la cantidad de pasos y sigue siendo responsive.
      return (
        '<div class="flowchart"><ol class="flow"' +
        aria +
        ' style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr))">' +
        steps +
        "</ol></div>"
      );
    },

    // { tipo:"riesgos", tarjetas:[{num, titulo, nivel:"low|med|high", items:[...], mitigacion}] }
    riesgos: function (b) {
      var cards = (b.tarjetas || [])
        .map(function (c) {
          var nivel = "s-" + (c.nivel || "med");
          var lista = (c.items || [])
            .map(function (it) {
              return "<li>" + it + "</li>";
            })
            .join("");
          var mitig = c.mitigacion
            ? '<div class="mitig"><strong>Mitigación:</strong> ' + c.mitigacion + "</div>"
            : "";
          return (
            '<article class="risk-card ' +
            nivel +
            '"><header class="risk-head">' +
            '<span class="risk-num">' +
            (c.num || "") +
            "</span><h3>" +
            (c.titulo || "") +
            "</h3>" +
            '<div class="semaforo ' +
            nivel +
            '"><span class="luz rojo"></span><span class="luz amarillo"></span><span class="luz verde"></span></div>' +
            "</header>" +
            '<ul class="checklist">' +
            lista +
            "</ul>" +
            mitig +
            "</article>"
          );
        })
        .join("");
      return '<div class="risk-cards">' + cards + "</div>";
    },

    // { tipo:"barras", titulo:"...", filas:[{label:"Ciencia", valor:0.88, texto:"Alto"}] }
    barras: function (b) {
      var title = b.titulo ? '<h3 class="bars-title">' + b.titulo + "</h3>" : "";
      var rows = (b.filas || [])
        .map(function (f) {
          return (
            '<div class="bar-row"><span class="b-label">' +
            (f.label || "") +
            '</span><div class="bar"><i style="--w: ' +
            (f.valor || 0) +
            '"></i></div><span class="b-val">' +
            (f.texto || "") +
            "</span></div>"
          );
        })
        .join("");
      return '<div class="bars-card">' + title + rows + "</div>";
    },

    // { tipo:"beneficios", tarjetas:[{badge, titulo, items:[...], stat}] } -> benefit-grid
    beneficios: function (b) {
      var cards = (b.tarjetas || [])
        .map(function (c) {
          var lista = (c.items || [])
            .map(function (it) {
              return "<li>" + it + "</li>";
            })
            .join("");
          var stat = c.stat ? '<div class="stat">' + c.stat + "</div>" : "";
          return (
            '<article class="benefit-card"><header class="b-head">' +
            '<span class="b-badge">' +
            (c.badge || "") +
            "</span><h3>" +
            (c.titulo || "") +
            "</h3></header><ul>" +
            lista +
            "</ul>" +
            stat +
            "</article>"
          );
        })
        .join("");
      return '<div class="benefit-grid">' + cards + "</div>";
    },

    // { tipo:"html", html:"<div>...</div>" }  -> válvula de escape
    html: function (b) {
      return b.html || "";
    },
  };

  /* ---------- Render de un bloque / sección / módulo ---------- */
  function renderBloque(b) {
    if (!b || !b.tipo) return "";
    var fn = BLOQUES[b.tipo];
    if (!fn) {
      console.warn("[renderer] tipo de bloque desconocido:", b.tipo);
      return "";
    }
    return fn(b);
  }

  function renderSeccion(s) {
    var titulo = s.titulo ? "<h2>" + s.titulo + "</h2>" : "";
    var inner = (s.bloques || []).map(renderBloque).join("\n");
    return (
      '<section class="module" id="' + (s.id || "") + '">' + titulo + inner + "</section>"
    );
  }

  /* ---------- Construir toda la página ---------- */
  function buildChrome(data) {
    document.title = data.titulo || "Curso IA";
    var secciones = (data.secciones || []).map(renderSeccion).join("\n");

    var html =
      "<header><h1>" +
      (data.titulo || "") +
      "</h1><p>" +
      (data.subtitulo || "") +
      "</p></header>" +
      '<div class="container docs-page">' +
      '<nav><ul id="main-nav-list">' +
      '<li><a href="index.html">Inicio</a></li>' +
      '<li><a href="herramientas.html">Herramientas</a></li>' +
      '<li><a href="glosario.html">Glosario</a></li>' +
      '<li><a href="contacto.html">Contacto</a></li>' +
      "</ul>" +
      '<button id="theme-toggle">🌙</button>' +
      '<button aria-label="Toggle navigation" class="hamburger-menu">☰</button></nav>' +
      '<div id="module-searchbar"><input aria-label="Buscar en este módulo" id="module-search" placeholder="Buscar en este módulo…" type="search" class="ml-search-compact"/><button id="module-clear" type="button" class="ml-clear-btn">Limpiar</button></div>' +
      '<div aria-live="polite" id="module-stats"></div>' +
      '<div class="docs-layout">' +
      '<aside class="docs-sidebar" id="docs-sidebar" aria-label="Navegación del curso"><nav id="docs-nav" class="docs-nav" role="navigation" aria-label="Contenido del curso"></nav></aside>' +
      '<main id="docs-main" class="docs-main">' +
      secciones +
      "</main>" +
      "</div>" +
      "</div>";

    // El footer lo agrega script.js al final del body, así que insertamos al inicio.
    document.body.insertAdjacentHTML("afterbegin", html);
  }

  function init() {
    if (!DATA) {
      document.body.insertAdjacentHTML(
        "afterbegin",
        '<div style="max-width:720px;margin:48px auto;padding:24px;font-family:sans-serif;line-height:1.6;">' +
          "<h1>Falta el contenido del módulo</h1>" +
          "<p>Esta página no cargó ningún <code>data/&lt;módulo&gt;.js</code> que defina " +
          "<code>window.MODULO</code>. Revisá la línea <code>&lt;script src=\"data/...\"&gt;</code> del HTML.</p>" +
          "</div>"
      );
      return;
    }
    buildChrome(DATA);
  }

  init();
})();
