if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('js');
  const reveal = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach((element) => reveal.observe(element));
}

const header = document.querySelector('.site-header');
const toggle = header?.querySelector('.nav-toggle');
const menu = toggle ? document.getElementById(toggle.getAttribute('aria-controls')) : null;

if (header && toggle && menu) {
  const label = toggle.querySelector('.sr-only');
  const setOpen = (open) => {
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    if (label) label.textContent = open ? 'Menü schließen' : 'Menü öffnen';
  };

  header.classList.add('has-menu-toggle');
  toggle.hidden = false;
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !header.classList.contains('is-open')) return;
    setOpen(false);
    toggle.focus();
  });
  window.matchMedia('(min-width: 821px)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}
