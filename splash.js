/* ═══════════════════════════════════════════════════════
   WATCHAI — SPLASH + LANG SWITCHER
   Ajout non-destructif — ne modifie pas index.html
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── TRADUCTIONS ─────────────────────────────────────── */
  const i18n = {
    fr: {
      tagline: 'Market Intelligence pilotée par l\'IA',
      startBtn: 'Commencer',
      badgeLabel: 'v6 · ENTERPRISE',
      resetBtn: '↺ Reset',
      historyBtn: '🗑 Historique',
      pdfBtn: '⎙ PDF',
      baselineLabel: '🏠 Ma marque / Mon entreprise (Référence)',
      baselineUrlLbl: 'URL de ma marque',
      baselineUrlPh: 'ex: fiducial-office.fr',
      sectorLbl: 'Secteur d\'activité',
      sectorPh: 'ex: Fournitures bureau B2B',
      chips: ['Fournitures B2B', 'Mode', 'Restauration', 'Immobilier', 'SaaS', 'Sport'],
      chipValues: ['Fournitures bureau B2B', 'Mode & textile e-commerce', 'Restauration rapide', 'Immobilier en ligne', 'SaaS & outils digitaux', 'Sport & fitness'],
      card01: '01 — Concurrents à surveiller',
      compLbl: 'Ajouter un concurrent',
      compPh: 'ex: bruneau.fr',
      addBtn: '+ Ajouter',
      skuLbl: 'Références / SKU à benchmarker',
      skuPh: 'Une ref par ligne :\nRamette A4 80g\nStylo Bic Cristal\nToner HP 26A',
      card02: '02 — Profondeur & Modules',
      depthRapidT: '⚡ Rapide',
      depthRapidD: 'Analyse IA immédiate. ~15s par concurrent.',
      depthDeepT: '🔬 Profonde',
      depthDeepD: 'Audit pages clés + tunnel d\'achat. ~45s.',
      launchBtn: '🚀 Lancer l\'analyse Market Intelligence Enterprise',
      initText: 'Initialisation...',
      qwTitle: '⚡ Quick Wins — Actions prioritaires pour battre la concurrence aujourd\'hui',
      deltasHd: 'Deltas vs Ma Marque',
      scoresHd: 'Scores de menace concurrentielle',
      sovHd: 'Share of Voice estimé & Santé des Stocks',
      sovVisib: 'VISIBILITÉ DIGITALE',
      sovStocks: 'SANTÉ DES STOCKS',
      radarHd: 'Radar multi-piliers comparatif',
      tmHd: '⏱ Time Machine — Historique des analyses',
      tblHd: 'Tableau comparatif haute densité',
      filterPh: 'Filtrer...',
      sortMenace: 'Trier : Menace',
      sortPrix: 'Trier : Prix',
      sortUX: 'Trier : UX',
      sortSEO: 'Trier : SEO',
      sortTech: 'Trier : Tech',
      sortMkt: 'Trier : Marketing',
      analysesHd: 'Analyses détaillées par concurrent',
      attackHd: '⚔️ Plan d\'attaque stratégique',
      tFilterPh: 'Filtrer tableau...',
    },
    en: {
      tagline: 'AI-powered Market Intelligence',
      startBtn: 'Get Started',
      badgeLabel: 'v6 · ENTERPRISE',
      resetBtn: '↺ Reset',
      historyBtn: '🗑 History',
      pdfBtn: '⎙ PDF',
      baselineLabel: '🏠 My brand / My company (Reference)',
      baselineUrlLbl: 'My brand URL',
      baselineUrlPh: 'e.g. my-company.com',
      sectorLbl: 'Industry / Sector',
      sectorPh: 'e.g. B2B Office Supplies',
      chips: ['B2B Office', 'Fashion', 'Food & Drink', 'Real Estate', 'SaaS', 'Sports'],
      chipValues: ['B2B Office Supplies', 'Fashion & Apparel e-commerce', 'Fast Food & Restaurants', 'Online Real Estate', 'SaaS & Digital Tools', 'Sports & Fitness'],
      card01: '01 — Competitors to monitor',
      compLbl: 'Add a competitor',
      compPh: 'e.g. competitor.com',
      addBtn: '+ Add',
      skuLbl: 'References / SKUs to benchmark',
      skuPh: 'One ref per line:\nA4 80g Ream\nBic Cristal Pen\nHP 26A Toner',
      card02: '02 — Depth & Modules',
      depthRapidT: '⚡ Quick',
      depthRapidD: 'Instant AI analysis. ~15s per competitor.',
      depthDeepT: '🔬 Deep',
      depthDeepD: 'Key pages audit + purchase funnel. ~45s.',
      launchBtn: '🚀 Run Enterprise Market Intelligence Analysis',
      initText: 'Initializing...',
      qwTitle: '⚡ Quick Wins — Priority actions to beat competitors today',
      deltasHd: 'Deltas vs My Brand',
      scoresHd: 'Competitive threat scores',
      sovHd: 'Estimated Share of Voice & Stock Health',
      sovVisib: 'DIGITAL VISIBILITY',
      sovStocks: 'STOCK HEALTH',
      radarHd: 'Multi-pillar comparative radar',
      tmHd: '⏱ Time Machine — Analysis history',
      tblHd: 'High-density comparison table',
      filterPh: 'Filter...',
      sortMenace: 'Sort: Threat',
      sortPrix: 'Sort: Price',
      sortUX: 'Sort: UX',
      sortSEO: 'Sort: SEO',
      sortTech: 'Sort: Tech',
      sortMkt: 'Sort: Marketing',
      analysesHd: 'Detailed analyses per competitor',
      attackHd: '⚔️ Strategic attack plan',
      tFilterPh: 'Filter table...',
    }
  };

  let currentLang = localStorage.getItem('watchai-lang') || 'fr';

  /* ── BUILD SPLASH ────────────────────────────────────── */
  function buildSplash() {
    const t = i18n[currentLang];
    const el = document.createElement('div');
    el.id = 'splash-screen';
    el.innerHTML = `
      <div class="splash-bg">
        <div class="splash-orb splash-orb-1"></div>
        <div class="splash-orb splash-orb-2"></div>
        <div class="splash-orb splash-orb-3"></div>
      </div>
      <div class="splash-badge">v6 · ENTERPRISE</div>
      <div class="splash-logo-wrap">
        <div class="splash-logo">
          <span class="splash-logo-letter" style="animation-delay:0.15s">W</span><span class="splash-logo-letter" style="animation-delay:0.25s">a</span><span class="splash-logo-letter" style="animation-delay:0.35s">t</span><span class="splash-logo-letter" style="animation-delay:0.45s">c</span><span class="splash-logo-letter" style="animation-delay:0.55s">h</span><em><span class="splash-logo-letter" style="animation-delay:0.68s">A</span><span class="splash-logo-letter" style="animation-delay:0.78s">I</span></em>
        </div>
        <div class="splash-tagline">${t.tagline}</div>
      </div>
      <div class="splash-progress">
        <div class="splash-progress-fill"></div>
      </div>
      <button class="splash-btn" id="splashStartBtn">
        ${t.startBtn} <span class="splash-btn-arrow">→</span>
      </button>
    `;
    document.body.prepend(el);

    // Show button after progress bar completes
    setTimeout(() => {
      const btn = document.getElementById('splashStartBtn');
      if (btn) btn.classList.add('visible');
    }, 2300);

    document.getElementById('splashStartBtn').addEventListener('click', dismissSplash);
  }

  function dismissSplash() {
    const splash = document.getElementById('splash-screen');
    if (splash) splash.classList.add('hidden');
    // Reveal app content
    const content = document.querySelector('.app-content');
    if (content) content.classList.add('revealed');
    // If no .app-content wrapper, reveal body children
    document.body.style.overflow = '';
  }

  /* ── BUILD LANG SWITCHER ─────────────────────────────── */
  function buildLangSwitcher() {
    const switcher = document.createElement('div');
    switcher.id = 'lang-switcher';
    switcher.innerHTML = `
      <button class="lang-btn ${currentLang === 'fr' ? 'active' : ''}" data-lang="fr">FR</button>
      <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
    `;
    switcher.addEventListener('click', (e) => {
      const btn = e.target.closest('.lang-btn');
      if (!btn) return;
      const lang = btn.dataset.lang;
      if (lang === currentLang) return;
      currentLang = lang;
      localStorage.setItem('watchai-lang', lang);
      applyLang();
      // Update active state
      switcher.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    });

    // Insert before the topbar-r div
    const topbarR = document.querySelector('.topbar-r');
    if (topbarR) topbarR.parentNode.insertBefore(switcher, topbarR);
  }

  /* ── APPLY TRANSLATIONS ──────────────────────────────── */
  function applyLang() {
    const t = i18n[currentLang];

    // Helpers
    const setText = (sel, txt) => { const el = document.querySelector(sel); if (el) el.textContent = txt; };
    const setPh = (sel, txt) => { const el = document.querySelector(sel); if (el) el.placeholder = txt; };
    const setHtml = (sel, html) => { const el = document.querySelector(sel); if (el) el.innerHTML = html; };

    // Topbar
    setText('.badge', t.badgeLabel);
    // Reset / History / PDF buttons
    const btns = document.querySelectorAll('.topbar-r .btn-sm');
    if (btns[0]) btns[0].textContent = t.resetBtn;
    if (btns[1]) btns[1].textContent = t.historyBtn;
    if (btns[2]) btns[2].textContent = t.pdfBtn;

    // Baseline card
    const baselineLabel = document.querySelector('.baseline-label');
    if (baselineLabel) baselineLabel.textContent = t.baselineLabel;
    const baselineLbls = document.querySelectorAll('.baseline-card .lbl');
    if (baselineLbls[0]) baselineLbls[0].textContent = t.baselineUrlLbl;
    if (baselineLbls[1]) baselineLbls[1].textContent = t.sectorLbl;
    setPh('#baselineUrl', t.baselineUrlPh);
    setPh('#sector', t.sectorPh);

    // Chips — rebuild with correct labels/onclick values
    const chipsEl = document.querySelector('.chips');
    if (chipsEl) {
      chipsEl.innerHTML = t.chips.map((label, i) =>
        `<span class="chip" onclick="setSector('${t.chipValues[i]}')">${label}</span>`
      ).join('');
    }

    // Card 01
    const hds = document.querySelectorAll('.hd');
    hds.forEach(hd => {
      if (hd.textContent.includes('01') || hd.textContent.includes('Concurrents') || hd.textContent.includes('Competitors')) {
        hd.innerHTML = t.card01 + '<span style="flex:1;height:1px;background:var(--border);margin-left:10px;display:inline-block"></span>';
        // Since ::after is used via CSS, keep as text
        hd.textContent = t.card01;
      }
      if (hd.textContent.includes('02') || hd.textContent.includes('Profondeur') || hd.textContent.includes('Depth')) {
        hd.textContent = t.card02;
      }
    });

    // Competitor input
    const compLbls = document.querySelectorAll('.card .lbl');
    compLbls.forEach(lbl => {
      if (lbl.textContent.includes('concurrent') || lbl.textContent.includes('competitor') || lbl.textContent.includes('Ajouter') || lbl.textContent.includes('Add')) {
        lbl.textContent = t.compLbl;
      }
      if (lbl.textContent.includes('SKU') || lbl.textContent.includes('réf') || lbl.textContent.includes('Réf') || lbl.textContent.includes('Ref') || lbl.textContent.includes('bench')) {
        lbl.textContent = t.skuLbl;
      }
    });
    setPh('#compInput', t.compPh);
    setPh('#skuInput', t.skuPh);

    const addBtn = document.querySelector('button[onclick="addComp()"]');
    if (addBtn) addBtn.textContent = t.addBtn;

    // Depth cards
    const dRapid = document.getElementById('dRapid');
    if (dRapid) {
      dRapid.querySelector('.dcrd-t').textContent = t.depthRapidT;
      dRapid.querySelector('.dcrd-d').textContent = t.depthRapidD;
    }
    const dDeep = document.getElementById('dDeep');
    if (dDeep) {
      dDeep.querySelector('.dcrd-t').textContent = t.depthDeepT;
      dDeep.querySelector('.dcrd-d').textContent = t.depthDeepD;
    }

    // Launch button
    const launchBtn = document.getElementById('launchBtn');
    if (launchBtn) launchBtn.textContent = t.launchBtn;

    // Progress text
    const progTxt = document.getElementById('progTxt');
    if (progTxt && (progTxt.textContent.includes('Initialisation') || progTxt.textContent.includes('Initializing'))) {
      progTxt.textContent = t.initText;
    }

    // Results section labels
    const qwTitle = document.querySelector('.qw-title');
    if (qwTitle) qwTitle.textContent = t.qwTitle;

    // Search / sort
    setPh('#tSearch', t.filterPh);
    const tSort = document.getElementById('tSort');
    if (tSort) {
      const opts = tSort.querySelectorAll('option');
      const keys = [t.sortMenace, t.sortPrix, t.sortUX, t.sortSEO, t.sortTech, t.sortMkt];
      opts.forEach((opt, i) => { if (keys[i]) opt.textContent = keys[i]; });
    }

    // Update html lang attribute
    document.documentElement.lang = currentLang;
  }

  /* ── WRAP BODY CONTENT ───────────────────────────────── */
  function wrapContent() {
    // Hide scrollbar until splash dismissed
    document.body.style.overflow = 'hidden';
    // Wrap existing body children in .app-content (except splash)
    const children = Array.from(document.body.children);
    const wrapper = document.createElement('div');
    wrapper.className = 'app-content';
    children.forEach(c => wrapper.appendChild(c));
    document.body.appendChild(wrapper);
  }

  /* ── INIT ────────────────────────────────────────────── */
  function init() {
    wrapContent();
    buildSplash();
    buildLangSwitcher();
    applyLang();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
