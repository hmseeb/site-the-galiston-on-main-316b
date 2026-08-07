// =========================================================
// The Galiston on Main — Site Scripts
// =========================================================
(function () {
  'use strict';

  /* Mobile nav toggle */
  var navToggle = document.getElementById('navToggle');
  var primaryNav = document.getElementById('primaryNav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = primaryNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    primaryNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        primaryNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Back to top button */
  var backToTop = document.getElementById('backToTop');

  function toggleBackToTop() {
    if (!backToTop) return;
    if (window.scrollY > 480) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', toggleBackToTop, { passive: true });
  toggleBackToTop();

  /* Contact form handling (client-side only, no external submission) */
  var contactForm = document.getElementById('contactForm');
  var formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();

      var name = contactForm.elements['name'];
      var email = contactForm.elements['email'];
      var eventType = contactForm.elements['eventType'];

      var isValid = true;
      var errors = [];

      if (!name.value.trim()) {
        isValid = false;
        errors.push('your name');
      }

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
        isValid = false;
        errors.push('a valid email address');
      }

      if (!eventType.value) {
        isValid = false;
        errors.push('an event type');
      }

      if (!isValid) {
        formStatus.textContent = 'Please provide ' + errors.join(', ') + '.';
        formStatus.className = 'form-status error';
        return;
      }

      var firstName = name.value.trim().split(' ')[0];
      formStatus.textContent =
        'Thank you, ' + firstName + '! Your inquiry has been received. Our team will reach out to ' +
        email.value.trim() + ' shortly to confirm availability.';
      formStatus.className = 'form-status success';

      contactForm.reset();
    });
  }

  /* Set a sensible minimum date on the event date picker (today) */
  var eventDateInput = document.getElementById('eventDate');
  if (eventDateInput) {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var dd = String(today.getDate()).padStart(2, '0');
    eventDateInput.setAttribute('min', yyyy + '-' + mm + '-' + dd);
  }
})();
