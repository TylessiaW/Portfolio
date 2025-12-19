(() => {
  const navItems = [
    { href: 'index.html', label: 'Home' },
    { href: 'about.html', label: 'About' },
    { href: 'resume.html', label: 'Resume & Skills' },
    { href: 'projects.html', label: 'Projects' },
    { href: 'store.html', label: 'Store' },
    { href: 'contact.html', label: 'Contact' },
  ];

  const navPhrases = [
    "IT Support Specialist",
    "Technical Support Technician",
    "Front-End Web Developer",
    "Freelance Website Builder"
  ];

  function currentPage() {
    return (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  }

  function buildNav() {
    const nav = document.getElementById('site-nav');
    if (!nav) return;

    const current = currentPage();

    nav.innerHTML = `
      <div class="nav-profile">
        <img class="nav-avatar" src="assets/img/profile.jpeg" alt="Profile photo" />
        <div class="nav-name">Tylessia Willis</div>

        <div class="tagline-box">
          <span id="nav-typewriter"></span>
          <span class="nav-cursor" aria-hidden="true">|</span>
        </div>
      </div>

      <ul class="nav-links">
        ${navItems.map(({ href, label }) => {
          const isActive = current === href.toLowerCase();
          return `<li><a class="nav-link${isActive ? ' active' : ''}" href="${href}">${label}</a></li>`;
        }).join('')}
      </ul>
    `;
  }

  function startNavTypewriter() {
    const el = document.getElementById("nav-typewriter");
    if (!el) return;

    let i = 0, j = 0, deleting = false;
    const typeSpeed = 70, deleteSpeed = 40, pauseTime = 900;

    function tick() {
      const current = navPhrases[i];

      if (!deleting) {
        el.textContent = current.slice(0, j + 1);
        j++;
        if (j === current.length) {
          deleting = true;
          setTimeout(tick, pauseTime);
          return;
        }
        setTimeout(tick, typeSpeed);
      } else {
        el.textContent = current.slice(0, j - 1);
        j--;
        if (j === 0) {
          deleting = false;
          i = (i + 1) % navPhrases.length;
          setTimeout(tick, 250);
          return;
        }
        setTimeout(tick, deleteSpeed);
      }
    }

    tick();
  }

  function wireNav() {
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('site-nav');
    const overlay = document.getElementById('site-overlay');
    if (!toggle || !nav || !overlay) return;

    function setOpen(isOpen) {
      toggle.setAttribute('aria-expanded', String(isOpen));
      nav.classList.toggle('show', isOpen);
      overlay.classList.toggle('show', isOpen);
      overlay.setAttribute('aria-hidden', String(!isOpen));
      document.documentElement.classList.toggle('nav-open', isOpen);
    }

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      setOpen(!isOpen);
    });

    overlay.addEventListener('click', () => setOpen(false));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') setOpen(false);
    });

    // ✅ Close nav + force navigation (fixes “link doesn’t open” issues)
    nav.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;

      const href = a.getAttribute('href');
      if (!href || href.startsWith('#')) return;

      e.preventDefault();
      setOpen(false);
      window.location.href = href;
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    buildNav();
    wireNav();
    startNavTypewriter();
  });
})();
