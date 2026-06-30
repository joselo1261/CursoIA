/* ============================================================
   module-search.js — Buscador interno de un módulo
   Resalta coincidencias y filtra secciones del contenido.
   Extraído del inline de los módulos para centralizarlo.
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('module-search');
  const clearBtn = document.getElementById('module-clear');
  const stats = document.getElementById('module-stats');
  if (!input || !clearBtn || !stats) return;
  const container =
    document.getElementById('docs-main') ||
    document.getElementById('ml-main') ||
    document.getElementById('module-container') ||
    document.querySelector('main') ||
    document.body;
  const navEl = document.querySelector('nav');

  function updateOffsets() {
    const navH = navEl ? navEl.offsetHeight : 0;
    const sb = document.getElementById('module-searchbar');
    const sbH = sb ? sb.offsetHeight : 0;
    document.documentElement.style.setProperty('--nav-h', navH + 'px');
    document.documentElement.style.setProperty('--searchbar-h', sbH + 'px');
  }
  updateOffsets();
  window.addEventListener('resize', updateOffsets);

  // Target: bloques del módulo (secciones + tarjetas conocidas)
  let blocks = Array.from(new Set([
    ...container.querySelectorAll('section'),
    ...container.querySelectorAll('article, .card, .module-block, .content-block')
  ]));
  if (blocks.length === 0) blocks = [container];

  const total = blocks.length;
  const strip = s => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '');

  function buildMap(s) {
    const map = []; const norm = []; let i = 0;
    for (const ch of s) { const st = strip(ch); norm.push(st); for (let k = 0; k < st.length; k++) map.push(i); i += ch.length; }
    return { norm: norm.join(''), map };
  }
  function hi(el, q) {
    if (!el) return;
    if (!el.dataset.orig) el.dataset.orig = el.textContent;
    const orig = el.dataset.orig;
    if (!q) { el.innerHTML = orig; return; }
    const { norm, map } = buildMap(orig); const qn = strip(q).toLowerCase();
    let from = 0, out = '', last = 0;
    while (true) {
      const idx = norm.toLowerCase().indexOf(qn, from);
      if (idx === -1) break;
      const start = map[idx];
      const end = (idx + qn.length < map.length) ? map[idx + qn.length] : orig.length;
      out += orig.slice(last, start) + '<mark>' + orig.slice(start, end) + '</mark>';
      last = end; from = idx + qn.length;
    }
    out += orig.slice(last); el.innerHTML = out;
  }

  function scrollToFirstMatch() {
    const first = container.querySelector('mark');
    if (first) {
      first.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const cs = getComputedStyle(document.documentElement);
      const navH = parseInt(cs.getPropertyValue('--nav-h')) || 0;
      const sbH = parseInt(cs.getPropertyValue('--searchbar-h')) || 0;
      window.scrollBy({ top: -(navH + sbH + 8), left: 0, behavior: 'smooth' });
    }
  }

  function apply(scroll) {
    const q = input.value.trim();
    let visible = 0;
    blocks.forEach(b => {
      const hay = strip(b.textContent).toLowerCase();
      const ok = !q || hay.includes(strip(q).toLowerCase());
      b.querySelectorAll('h1,h2,h3,h4,h5,h6,p,li').forEach(el => hi(el, ok ? q : ''));
      if (blocks.length > 1) b.style.display = ok ? '' : 'none';
      if (ok) visible++;
    });
    stats.textContent = `Mostrando ${visible} de ${total} secciones`;
    if (scroll && q) scrollToFirstMatch();
  }

  input.addEventListener('input', () => apply(true));
  clearBtn.addEventListener('click', () => { input.value = ''; input.focus(); apply(true); });
  apply(false);
});
