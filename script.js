'use strict';

const header = document.getElementById('site-header');
const navToggle = document.getElementById('nav-toggle');
const siteNav = document.getElementById('site-nav');
const revealEls = document.querySelectorAll('.reveal');
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (header) {
  window.addEventListener(
    'scroll',
    () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    },
    { passive: true }
  );
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));

    const bars = navToggle.querySelectorAll('span');
    bars[0].style.transform = isOpen ? 'translateY(6px) rotate(45deg)' : '';
    bars[1].style.opacity = isOpen ? '0' : '1';
    bars[2].style.transform = isOpen ? 'translateY(-6px) rotate(-45deg)' : '';
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');

      const bars = navToggle.querySelectorAll('span');
      bars[0].style.transform = '';
      bars[1].style.opacity = '1';
      bars[2].style.transform = '';
    });
  });

  document.addEventListener('click', (event) => {
    if (!siteNav.classList.contains('open')) return;
    if (siteNav.contains(event.target) || navToggle.contains(event.target)) return;

    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    const bars = navToggle.querySelectorAll('span');
    bars[0].style.transform = '';
    bars[1].style.opacity = '1';
    bars[2].style.transform = '';
  });
}

if (revealEls.length) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
}

if (form && formStatus) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');
    if (!name || !email || !message) return;

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      formStatus.textContent = 'Please fill in your name, email, and message.';
      return;
    }

    form.reset();
    formStatus.textContent = 'Message received. We will reach out shortly.';
    setTimeout(() => {
      formStatus.textContent = '';
    }, 4000);
  });
}
