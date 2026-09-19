/* Andrej Rehak - presentation site
   i18n (HR default + EN), lightbox, gallery filter, scroll reveal */

(function () {
  'use strict';

  /* ---------------- Translations (EN) ---------------- */

  var EN = {
    'a11y.skip': 'Skip to content',
    'a11y.zoom': 'Enlarge image',
    'a11y.close': 'Close',
    'a11y.prev': 'Previous',
    'a11y.next': 'Next',

    'nav.works': 'Works',
    'nav.film': 'Film',
    'nav.science': 'Science',
    'nav.contact': 'Contact',

    'hero.kicker': 'Sculptor · animator · researcher of space and time',
    'hero.lede': 'From the expressive faces of the early eighties to animated worlds in which geometry, time and motion merge into a single pattern.',
    'hero.born': 'born 1966, Zagreb',
    'hero.lives': 'lives and works in Zagreb',
    'hero.cta1': 'View the works',
    'hero.cta2': 'Animated film',
    'hero.scroll': 'Scroll',

    'about.label': 'About',
    'about.title': 'Sculpture, animation and physics in a single gaze',
    'about.p1': 'Andrej Rehak was born in 1966 in Zagreb. He graduated from the MIOC high school of mathematics and informatics and studied piano at the Pavao Markovac Music School, and graduated in sculpture from the Academy of Fine Arts in Zagreb. At Zagreb Film, under the guidance of Dušan Vukotić, he completed the school of classical animation.',
    'about.p2': 'He has worked as a sculptor, painter, comic artist, illustrator, designer, web designer, set designer, screenwriter, animator and director - at home and abroad. He is the author of picture books, sets for media events, television and festival trailers, animated commercials and music videos.',
    'about.p3': 'Since 2005 he has been developing the Universal Principle (Principia Universi), his own mathematical model of space and time. He publishes in alternative science archives and is a reviewer for professional journals (Journal of Physics Communications, Classical and Quantum Gravity).',
    'about.fact1.k': 'Medium',
    'about.fact1.v': 'painting, animation, physics',
    'about.fact2.k': 'Born',
    'about.fact3.k': 'City',
    'about.fact4.k': 'Education',
    'about.fact4.v': 'Academy of Fine Arts, sculpture',

    'works.label': 'Early works · 1982-1995',
    'works.title': 'Erasing the layers of unrest',
    'works.intro': 'From the exhibition <em>Rehak Rani Radovi</em> (Archaeological Museum in Zagreb, 2025): fourteen paintings that trace the simplification of form - from dense expressive textures towards Klee-like abstraction, pastel figures and a pure sign.',
    'works.quote': 'Dense textures become ever simpler planes with associations of human bodies, until, at the end of the eighties, they transform into a linear subtlety and an expression that draws ever closer to a pure sign. As if the artist, erasing the layers of angst, anxiety, unrest and psychic tension, strove to gradually uncover a primary speech, a voice of harmony and peace.',
    'works.quoteAuthor': 'Feđa Gavrilović, catalogue of the exhibition <em>Rehak Rani Radovi</em>',
    'works.note': 'Shown chronologically, from the earliest to the most recent. Click an image for an enlarged view.',

    'filter.all': 'All',
    'filter.80': '1980-1989',
    'filter.90': '1990-1995',

    'medium.oil': 'oil on canvas',
    'medium.tempera': 'tempera on canvas',
    'medium.temperaWood': 'tempera on wood',

    'work.1.title': 'Face',
    'work.2.title': 'Face',
    'work.3.title': 'Faces',
    'work.4.title': 'Faces',
    'work.5.title': 'Figures',
    'work.6.title': 'Nude',
    'work.7.title': 'Nude',
    'work.8.title': 'Nude',
    'work.9.title': 'Female Figure',
    'work.10.title': 'Figures',
    'work.11.title': 'Figures',
    'work.12.title': 'House of Mist',
    'work.13.title': 'Unfolding into Archers',
    'work.14.title': 'Impression of a Face',

    'films.label': 'Animated film',
    'films.title': 'Patterns in motion and form',
    'films.intro': 'Since 2005 Rehak has been developing his own animated worlds in which speed, scale and time become building blocks. The films are produced by Zagreb Film, produced by Vinko Brešan.',
    'film.awards': 'Awards and festivals',

    'film.acc.title': 'Acceleration',
    'film.acc.meta': '11 min · 3D animation · colour',
    'film.acc.syn': 'Through a scene in which two runners move at different speeds, through the contraction and expansion of space and time as a consequence of acceleration, the film explores the relation between systems of different velocities and the difference in their perception. A rebus that joins the world of the small (quantum mechanics) and the world of the great (the theory of relativity), introducing speed as a single space-time scalar.',
    'film.acc.credit': 'Direction, script, animation, design and editing: Andrej Rehak · music: Janko Novoselić, Dubravko Lapaine, Hrvoje Nikšić · Zagreb Film',

    'film.bobo.title': 'Bobo',
    'film.bobo.meta': '13 min 40 s · digital animation · colour',
    'film.bobo.syn': 'The story of Bobo, the tiniest little boy in the world. All the little girls and all the little boys were bigger than tiny Bobo, and to him grown-ups looked like fairy-tale giants. Bobo\u2019s greatest wish was to become the biggest little boy in the world - a children\u2019s story with a universal message about acceptance and fitting in.',
    'film.bobo.credit': 'Direction, script, animation and design: Andrej Rehak · music: Anita Andreis Žganec · producer: Vinko Brešan · Zagreb Film / ANIMA',
    'film.bobo.awards': '<li>R2R International Film Festival for Youth, Vancouver 2019 - <b>Most Innovative Short Film</b></li><li>Cairo International Animation Forum 2019 - <b>Best Idea</b></li><li>CICAF, China 2020 - <b>Bronze Award</b></li><li>Days of Croatian Film 2018 - <b>Zlatna uljanica</b></li>',

    'film.para.title': 'Paradeigma',
    'film.para.meta': '8 min 8 s · 3D/2D animation · colour',
    'film.para.syn': 'A property of chaos is the emergence of pattern, independent of scale. Paradeigma is the sample of the pattern. We witness a grounded figure which, due to the fear of free fall and discomfort from the rain, has closed itself in an enchanted square it can no longer leave - a repeating sample of a self-similar pattern.',
    'film.para.credit': 'Direction, script, animation and editing: Andrej Rehak · music: Ozren Glaser · production: Zagreb Film',
    'film.para.awards': '<li>International Animation Day 2023 - <b>Special Mention for Professional Film</b></li><li>Days of Croatian Film 2023</li><li>Dalmatia Film Festival 2024</li>',

    'film.ovum.title': 'Ovum',
    'film.ovum.meta': '5 min · 3D/2D animation · in production',
    'film.ovum.syn': 'We witness a fragment of self-similar cyclical processes of entry, consumption and outgrowing of worlds bounded by shells.',
    'film.ovum.credit': 'Direction: Andrej Rehak · production: Zagreb Film',

    'science.label': 'Science',
    'science.title': 'Principia Universi',
    'science.p1': 'Alongside his work in art and film, since 2005 Rehak has been developing the Universal Principle - his own mathematical model of space and time, summed up in the relation <span class="mono">g = cd</span> that links gravity and the speed of light.',
    'science.p2': 'He publishes his papers in alternative science archives (viXra, Academia.edu) and is a reviewer for the journals <em>Journal of Physics Communications</em> and <em>Classical and Quantum Gravity</em>. He has presented the results at the Science Festival in Zagreb, alongside a screening of the film <em>Acceleration</em>.',
    'science.papers': 'Selected papers',
    'science.note': '10 papers on viXra · 18 on Academia.edu',

    'contact.label': 'Contact and credits',
    'contact.title': 'Andrej Rehak',
    'contact.lede': 'For enquiries about works, exhibitions, screenings and collaborations.',
    'contact.where': 'City',
    'contact.film': 'Film',
    'contact.online': 'Online',

    'footer.credits': 'Images of early works: catalogue of the exhibition <em>Rehak Rani Radovi</em>, Archaeological Museum in Zagreb, 2025. Film stills: Croatian Audiovisual Centre and Zagreb Film. All rights reserved.',
    'footer.note': 'Presentation site.'
  };

  var TITLES = {
    hr: 'Andrej Rehak - Rani radovi i animirani film',
    en: 'Andrej Rehak - Early Works and Animated Film'
  };

  /* ---------------- i18n ---------------- */

  var txtNodes = [];
  var ariaNodes = [];

  function collectI18n() {
    document.querySelectorAll('[data-i18n], [data-i18n-html]').forEach(function (el) {
      el._hrHTML = el.innerHTML;
      txtNodes.push(el);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(function (el) {
      el._hrAria = el.getAttribute('aria-label') || '';
      ariaNodes.push(el);
    });
  }

  function applyLang(lang) {
    if (lang !== 'en') lang = 'hr';
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);

    txtNodes.forEach(function (el) {
      var key = el.getAttribute('data-i18n') || el.getAttribute('data-i18n-html');
      if (lang === 'en' && EN[key] != null) {
        el.innerHTML = EN[key];
      } else {
        el.innerHTML = el._hrHTML;
      }
    });

    ariaNodes.forEach(function (el) {
      var key = el.getAttribute('data-i18n-aria');
      el.setAttribute('aria-label', (lang === 'en' && EN[key]) ? EN[key] : el._hrAria);
    });

    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.classList.toggle('is-active', b.getAttribute('data-set-lang') === lang);
    });

    document.title = TITLES[lang] || TITLES.hr;

    try { localStorage.setItem('rehak-lang', lang); } catch (e) {}
  }

  function initLang() {
    var saved = null;
    try { saved = localStorage.getItem('rehak-lang'); } catch (e) {}
    applyLang(saved || 'hr');

    document.querySelectorAll('[data-set-lang]').forEach(function (b) {
      b.addEventListener('click', function () {
        applyLang(b.getAttribute('data-set-lang'));
      });
    });
  }

  /* ---------------- Header ---------------- */

  function initHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------------- Reveal ---------------- */

  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- Gallery filter + lightbox ---------------- */

  function initGallery() {
    var gallery = document.getElementById('gallery');
    if (!gallery) return;
    var figures = Array.prototype.slice.call(gallery.querySelectorAll('.work'));
    var chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));
    var lightbox = document.getElementById('lightbox');
    var lbImg = lightbox.querySelector('.lb-img');
    var lbTitle = lightbox.querySelector('.lb-title');
    var lbMeta = lightbox.querySelector('.lb-meta');
    var lbCount = lightbox.querySelector('.lb-count');
    var btnClose = lightbox.querySelector('.lb-close');
    var btnPrev = lightbox.querySelector('.lb-prev');
    var btnNext = lightbox.querySelector('.lb-next');
    var list = [];
    var index = 0;

    lbImg.removeAttribute('src');

    function visible() {
      return figures.filter(function (f) { return !f.classList.contains('is-hidden'); });
    }

    function render() {
      var fig = list[index];
      if (!fig) return;
      var img = fig.querySelector('img');
      lbImg.src = img.getAttribute('src');
      lbImg.alt = img.getAttribute('alt') || '';
      lbTitle.textContent = fig.querySelector('.work-title').textContent;
      lbMeta.textContent = fig.querySelector('.work-meta').textContent;
      lbCount.textContent = (index + 1) + ' / ' + list.length;
    }

    function open(fig) {
      list = visible();
      index = Math.max(0, list.indexOf(fig));
      render();
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      btnClose.focus();
    }

    function close() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      lbImg.removeAttribute('src');
    }

    function step(dir) {
      if (!list.length) return;
      index = (index + dir + list.length) % list.length;
      render();
    }

    figures.forEach(function (fig) {
      var btn = fig.querySelector('.work-media');
      if (btn) btn.addEventListener('click', function () { open(fig); });
    });

    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', function () { step(-1); });
    btnNext.addEventListener('click', function () { step(1); });

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) close();
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
    });

    chips.forEach(function (chip) {
      var setPressed = function () {
        chips.forEach(function (c) {
          c.setAttribute('aria-pressed', c.classList.contains('is-active') ? 'true' : 'false');
        });
      };
      setPressed();
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.toggle('is-active', c === chip); });
        setPressed();
        var f = chip.getAttribute('data-filter');
        figures.forEach(function (fig) {
          var y = parseInt(fig.getAttribute('data-year'), 10);
          var show = f === 'all' || (f === '1980' && y < 1990) || (f === '1990' && y >= 1990);
          fig.classList.toggle('is-hidden', !show);
        });
      });
    });
  }

  /* ---------------- Boot ---------------- */

  function boot() {
    collectI18n();
    initLang();
    initHeader();
    initReveal();
    initGallery();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
