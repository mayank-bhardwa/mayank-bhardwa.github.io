(function () {
  var root = document.documentElement;
  root.classList.add('js');

  var nav = document.getElementById('nav');
  var links = document.getElementById('links');
  var menu = document.getElementById('menu');
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  document.getElementById('theme').addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  function closeMenu() {
    links.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  }
  menu.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', function (e) { if (e.target.tagName === 'A') closeMenu(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });

  // Reveal on scroll
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // Count-up stats
  function animate(el) {
    var target = +el.dataset.count, suffix = el.dataset.suffix || '';
    if (reduce) { el.textContent = target.toLocaleString() + suffix; return; }
    var start = null, dur = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { animate(en.target); co.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { co.observe(c); });
  } else {
    counters.forEach(animate);
  }

  // Active nav link
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var navLinks = {};
  links.querySelectorAll('a').forEach(function (a) { navLinks[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          Object.keys(navLinks).forEach(function (k) { navLinks[k].classList.remove('active'); });
          if (navLinks[en.target.id]) navLinks[en.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { so.observe(s); });
  }
})();
