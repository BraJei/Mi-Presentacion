/**
 * Portafolio Personal — Jack Bradly Urcuhuaranga
 * Vanilla JavaScript: Interacciones, Menú Responsive, Scroll Reveal, Typing Effect y Social Links
 */

// 9. Enlaces de Redes Sociales (Placeholders configurables)
const socialLinks = {
  instagram: "#",
  facebook: "#",
  linkedin: "#"
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Asignar enlaces de redes sociales
  const igEl = document.getElementById('link-instagram');
  const fbEl = document.getElementById('link-facebook');
  const inEl = document.getElementById('link-linkedin');

  if (igEl) igEl.href = socialLinks.instagram;
  if (fbEl) fbEl.href = socialLinks.facebook;
  if (inEl) inEl.href = socialLinks.linkedin;

  // 2. Menú Responsive (Mobile Drawer Toggle)
  const mobileToggle = document.getElementById('mobile-toggle');
  const navbarMenu = document.getElementById('navbar-menu');
  const navItems = document.querySelectorAll('.nav-item');

  if (mobileToggle && navbarMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpened = navbarMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpened);
    });

    // Cerrar menú al hacer clic en cualquier enlace
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navbarMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Scroll suave y resaltado de enlaces activos
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -65% 0px',
    threshold: 0
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navItems.forEach(link => {
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => navObserver.observe(section));

  // 4. Animaciones al hacer scroll (Scroll Reveal / Fade-in)
  const animatableCards = document.querySelectorAll(
    '.tech-card, .skill-card, .highlight-card, .timeline-card, .experience-card, .project-featured-card, .volunteer-box, .participation-card'
  );

  animatableCards.forEach(card => card.classList.add('fade-element'));

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animatableCards.forEach(card => fadeObserver.observe(card));

  // 5. Typing Effect en Hero (> Software Developer_)
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const roles = [
      'Software Developer',
      'Ingeniería Informática PUCP',
      'Lead Dev @ PachinkoStudio',
      'C / C++ / C# / Python'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeLoop() {
      const currentRole = roles[roleIndex];

      if (!isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentRole.length) {
          isDeleting = true;
          typingSpeed = 2000; // Pausa al completar la palabra
        } else {
          typingSpeed = 80 + Math.random() * 40;
        }
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          typingSpeed = 400; // Pausa antes de la siguiente palabra
        } else {
          typingSpeed = 40;
        }
      }

      setTimeout(typeLoop, typingSpeed);
    }

    setTimeout(typeLoop, 800);
  }
});
