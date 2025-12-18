/* ==========================================================
   site.js — Global behavior (slide navigation)

   This file is used on every page.
   - Builds the shared slide-out nav inside #site-nav
   - Handles open/close for the menu button + overlay
   - Runs the nav typewriter safely on every page

   Note: Page-specific behavior (ex: homepage typing) should
   live in separate files (ex: assets/js/home.js).
   ========================================================== */

(() => {
  // Update these links in one place.
  const navItems = [
    { href: 'index.html', label: 'Home' },
    { href: 'about.html', label: 'About' },
    { href: 'resume.html', label: 'Resume & Skills' },
    { href: 'projects.html', label: 'Projects' },
    { href: 'services.html', label: 'Services' },
    { href: 'contact.html', label: 'Contact' },
  ];

  // Nav typewriter phrases (global)
  const navPhrases = [
    "IT Support Specialist",
    "Technical Support Technician",
    "Front-End Web Developer",
    "Freelance Website Builder"
  ];

  function currentPage() {
    const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    return file;
  }

  function buildNav() {
    const nav = document.getElementById('site-nav');
    if (!nav) return;

    const current = currentPage();

    nav.innerHTML = `
      <div class="nav-profile">
        <img class="nav-avatar" src="assets/img/profile.jpeg" alt="Profile photo" />
        <div class="nav-name">Tylessia Willis</div>

        <!-- Typewriter target -->
        <div class="tagline-box">
          <span id="nav-typewriter"></span>
          <span class="nav-cursor" aria-hidden="true">|</span>
        </div>
      </div>

      <ul class="nav-links">
        ${navItems
          .map(({ href, label }) => {
            const isActive = current === href.toLowerCase();
            return `<li><a class="nav-link${isActive ? ' active' : ''}" href="${href}">${label}</a></li>`;
          })
          .join('')}
      </ul>
    `;
  }

  function startNavTypewriter() {
    const el = document.getElementById("nav-typewriter");
    if (!el) return;

    const phrases = navPhrases;
    let i = 0;
    let j = 0;
    let deleting = false;

    const typeSpeed = 70;
    const deleteSpeed = 40;
    const pauseTime = 900;

    function tick() {
      const current = phrases[i];

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
          i = (i + 1) % phrases.length;
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

    // Close nav after clicking a link (nice on mobile)
    nav.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (a) setOpen(false);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    buildNav();
    wireNav();
    startNavTypewriter(); // ✅ run after nav is built
  });
})();
