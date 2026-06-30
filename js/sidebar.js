/* ============================================================
   sidebar.js — Construye el sidebar global tipo "docs"
   - Lee window.CURSO_NAV (nav-data.js) para listar los módulos.
   - Detecta la página actual y despliega sus secciones debajo.
   - Resalta la sección activa al hacer scroll (scrollspy).
   - Modo móvil: sidebar off-canvas con botón y backdrop.

   Requisitos en el HTML:
     <aside class="docs-sidebar" id="docs-sidebar">
       <nav id="docs-nav" class="docs-nav"></nav>
     </aside>
     <main id="docs-main" class="docs-main"> ...secciones... </main>
   Cada sección navegable: <section class="module" id="..."><h2>Título</h2>
   ============================================================ */
(function () {
  function init() {
    var nav = document.getElementById("docs-nav");
    var sidebar = document.getElementById("docs-sidebar");
    var main =
      document.getElementById("docs-main") ||
      document.querySelector(".docs-main") ||
      document.querySelector("main");
    var items = window.CURSO_NAV || [];
    if (!nav || !sidebar || !main || !items.length) return;

    var current = (location.pathname.split("/").pop() || "index.html").toLowerCase();

    /* --- Título del sidebar --- */
    var title = document.createElement("div");
    title.className = "docs-sidebar-title";
    title.textContent = "Contenido del curso";
    nav.appendChild(title);

    /* --- Secciones de la página actual (section.module con id + h2) --- */
    var sections = Array.prototype.slice
      .call(main.querySelectorAll("section.module[id]"))
      .map(function (s) {
        var h = s.querySelector("h2");
        return h ? { id: s.id, text: h.textContent.trim() } : null;
      })
      .filter(Boolean);

    /* --- Construir la navegación --- */
    items.forEach(function (item) {
      var group = document.createElement("div");
      group.className = "docs-module";
      var isCurrent = item.href.toLowerCase() === current;
      if (isCurrent) group.classList.add("is-current");

      var a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.label;
      if (isCurrent) a.setAttribute("aria-current", "page");
      group.appendChild(a);

      if (isCurrent && sections.length) {
        var ul = document.createElement("ul");
        ul.className = "docs-sections";
        sections.forEach(function (sec) {
          var li = document.createElement("li");
          var sa = document.createElement("a");
          sa.href = "#" + sec.id;
          sa.textContent = sec.text;
          sa.dataset.target = sec.id;
          li.appendChild(sa);
          ul.appendChild(li);
        });
        group.appendChild(ul);
      }
      nav.appendChild(group);
    });

    var sectionLinks = Array.prototype.slice.call(
      nav.querySelectorAll(".docs-sections a")
    );
    var sectionEls = sections
      .map(function (s) {
        return document.getElementById(s.id);
      })
      .filter(Boolean);

    /* --- Offset por header + buscador sticky --- */
    function headerOffset() {
      var cs = getComputedStyle(document.documentElement);
      var navH = parseInt(cs.getPropertyValue("--nav-h"), 10) || 0;
      var sbH = parseInt(cs.getPropertyValue("--searchbar-h"), 10) || 0;
      return navH + sbH + 16;
    }

    /* --- Scroll suave al hacer click (gana sobre el handler base) --- */
    sectionLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        var el = document.getElementById(link.dataset.target);
        if (!el) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        var y =
          el.getBoundingClientRect().top + window.pageYOffset - headerOffset();
        window.scrollTo({ top: y, behavior: "smooth" });
        history.replaceState(null, "", "#" + link.dataset.target);
        closeMobile();
      });
    });

    /* --- Scrollspy: marcar sección activa --- */
    function ensureVisible(link) {
      var lr = link.getBoundingClientRect();
      var sr = sidebar.getBoundingClientRect();
      if (lr.top < sr.top + 8) {
        sidebar.scrollTop += lr.top - sr.top - 8;
      } else if (lr.bottom > sr.bottom - 8) {
        sidebar.scrollTop += lr.bottom - sr.bottom + 8;
      }
    }
    function setActive() {
      if (!sectionEls.length) return;
      var y = window.pageYOffset + headerOffset() + 4;
      var activeId = sectionEls[0].id;
      for (var i = 0; i < sectionEls.length; i++) {
        if (sectionEls[i].offsetTop <= y) activeId = sectionEls[i].id;
        else break;
      }
      sectionLinks.forEach(function (l) {
        var on = l.dataset.target === activeId;
        l.classList.toggle("is-active", on);
        if (on) ensureVisible(l);
      });
    }
    var ticking = false;
    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          setActive();
          ticking = false;
        });
      },
      { passive: true }
    );
    window.addEventListener("resize", setActive);
    setActive();

    /* --- Modo móvil: botón + backdrop --- */
    var toggle = document.createElement("button");
    toggle.className = "docs-sidebar-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-label", "Mostrar contenido del curso");
    toggle.innerHTML = "☰ Contenido";

    var layout = document.querySelector(".docs-layout");
    if (layout && layout.parentNode) {
      layout.parentNode.insertBefore(toggle, layout);
    }

    var backdrop = document.createElement("div");
    backdrop.className = "docs-backdrop";
    document.body.appendChild(backdrop);

    function openMobile() {
      sidebar.classList.add("is-open");
      backdrop.classList.add("is-open");
    }
    function closeMobile() {
      sidebar.classList.remove("is-open");
      backdrop.classList.remove("is-open");
    }
    toggle.addEventListener("click", function () {
      if (sidebar.classList.contains("is-open")) closeMobile();
      else openMobile();
    });
    backdrop.addEventListener("click", closeMobile);

    /* --- Si entramos con #hash, marcar la sección correspondiente --- */
    if (location.hash) {
      var hid = location.hash.slice(1);
      var hlink = sectionLinks.filter(function (l) {
        return l.dataset.target === hid;
      })[0];
      if (hlink) {
        sectionLinks.forEach(function (l) {
          l.classList.toggle("is-active", l === hlink);
        });
        ensureVisible(hlink);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
