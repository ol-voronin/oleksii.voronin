// reveal on scroll with stagger
const io = new IntersectionObserver(es => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: .1 });
document.querySelectorAll('.rv').forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 60 + 'ms'; io.observe(el);
});

// count-up numbers (data-count)
const cu = new IntersectionObserver(es => {
  es.forEach(e => {
    if (!e.isIntersecting) return; cu.unobserve(e.target);
    const el = e.target, end = parseFloat(el.dataset.count), suf = el.dataset.suffix || '';
    const t0 = performance.now(), dur = 1100;
    const step = t => {
      const p = Math.min((t - t0) / dur, 1), v = end * (1 - Math.pow(1 - p, 3));
      el.textContent = (end % 1 ? v.toFixed(1) : Math.round(v)) + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}, { threshold: .6 });
document.querySelectorAll('[data-count]').forEach(el => cu.observe(el));

// portfolio filters
const fbtns = document.querySelectorAll('.fbtn');
if (fbtns.length) {
  fbtns.forEach(b => b.addEventListener('click', () => {
    fbtns.forEach(x => x.classList.remove('on')); b.classList.add('on');
    const f = b.dataset.filter;
    document.querySelectorAll('.work').forEach((w, i) => {
      const show = f === 'all' || w.dataset.type === f;
      w.style.transitionDelay = (i % 6) * 40 + 'ms';
      w.classList.toggle('hide', !show);
    });
  }));
}

// reading progress on case pages
const pb = document.querySelector('.progress');
if (pb) {
  addEventListener('scroll', () => {
    const h = document.documentElement;
    pb.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
  }, { passive: true });
}
