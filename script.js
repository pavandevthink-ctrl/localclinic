/**
 * DENTIA Dental Clinic - Interactive JavaScript Logic
 * Handles Navigation, Quick Booking, Service Filters, Smile Slider,
 * Gallery Filtering, FAQ Accordion, Booking Modal & WhatsApp integrations.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initLogoHomeAction();
  initMobileDrawer();
  initQuickBookingBar();
  initServiceFilters();
  initSmileSlider();
  initGalleryFilter();
  initFaqAccordion();
  initBookingModal();
  initDateConstraints();
});

/* ==========================================================================
   Logo Click Handler (Serves as Home button)
   ========================================================================== */
function initLogoHomeAction() {
  const brandLogos = document.querySelectorAll('.brand-logo');
  brandLogos.forEach(logo => {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      if (history.pushState) {
        history.pushState(null, null, '#home');
      }
    });
  });
}

/* ==========================================================================
   1. Sticky Header with Scroll Detection
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. Mobile Drawer Navigation
   ========================================================================== */
function initMobileDrawer() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const closeBtn = document.querySelector('.mobile-close-btn');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer .btn');

  if (!hamburgerBtn || !drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  };

  hamburgerBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   3. Quick Booking Bar on Hero Section
   ========================================================================== */
function initQuickBookingBar() {
  const quickBookBtn = document.getElementById('quick-book-submit');
  if (!quickBookBtn) return;

  quickBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const treatment = document.getElementById('quick-treatment')?.value;
    const doctor = document.getElementById('quick-doctor')?.value;
    const date = document.getElementById('quick-date')?.value;
    const time = document.getElementById('quick-time')?.value;

    openAppointmentModal({
      treatment: treatment || '',
      doctor: doctor || '',
      date: date || '',
      time: time || ''
    });
  });
}

/* ==========================================================================
   4. Dental Services Filter Tabs
   ========================================================================== */
function initServiceFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const serviceCards = document.querySelectorAll('.service-card');

  if (!filterTabs.length || !serviceCards.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterCategory = tab.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory.includes(filterCategory)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. Interactive Before & After Smile Slider
   ========================================================================== */
function initSmileSlider() {
  const container = document.querySelector('.slider-container');
  const afterWrapper = document.querySelector('.slider-img-after-wrapper');
  const handle = document.querySelector('.slider-handle');

  if (!container || !afterWrapper || !handle) return;

  let isDragging = false;

  const updateSlider = (clientX) => {
    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    const percentage = (x / rect.width) * 100;
    afterWrapper.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  };

  // Mouse Events
  handle.addEventListener('mousedown', () => isDragging = true);
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSlider(e.clientX);
  });

  window.addEventListener('mouseup', () => isDragging = false);
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });

  // Touch Events for Mobile
  handle.addEventListener('touchstart', () => isDragging = true, { passive: true });
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches[0]) updateSlider(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => isDragging = false);
  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    if (e.touches[0]) updateSlider(e.touches[0].clientX);
  }, { passive: true });
}

/* ==========================================================================
   6. Clinic Facility Gallery Category Filter
   ========================================================================== */
function initGalleryFilter() {
  const galleryTabs = document.querySelectorAll('.gallery-tab');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!galleryTabs.length || !galleryItems.length) return;

  galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      galleryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-gallery-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-gallery-cat');
        if (filter === 'all' || itemCategory === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. Frequently Asked Questions Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other FAQs for clean single-view accordion
      faqItems.forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   8. Interactive Appointment Booking Modal & Validation
   ========================================================================== */
let activeModalPrefills = {};

function initBookingModal() {
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const openModalBtns = document.querySelectorAll('.open-booking-modal');
  const closeModalBtns = document.querySelectorAll('.modal-close-btn');
  const form = document.getElementById('appointment-booking-form');
  const successBox = document.querySelector('.booking-success-box');
  const bookAnotherBtn = document.getElementById('book-another-btn');

  if (!modalBackdrop) return;

  // Open modal trigger
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTreatment = btn.getAttribute('data-treatment') || '';
      const targetDoctor = btn.getAttribute('data-doctor') || '';

      openAppointmentModal({
        treatment: targetTreatment,
        doctor: targetDoctor
      });
    });
  });

  // Close modal triggers
  closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => closeAppointmentModal());
  });

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeAppointmentModal();
    }
  });

  // Escape key closes modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeAppointmentModal();
    }
  });

  // Reset & Book Another
  if (bookAnotherBtn) {
    bookAnotherBtn.addEventListener('click', () => {
      if (form) {
        form.reset();
        form.style.display = 'flex';
      }
      if (successBox) successBox.classList.remove('show');
    });
  }

  // Handle Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('modal-patient-name').value.trim();
      const phone = document.getElementById('modal-patient-phone').value.trim();
      const email = document.getElementById('modal-patient-email').value.trim();
      const treatment = document.getElementById('modal-treatment').value;
      const doctor = document.getElementById('modal-doctor').value;
      const date = document.getElementById('modal-date').value;
      const time = document.getElementById('modal-time').value;
      const notes = document.getElementById('modal-notes').value.trim();
      const consent = document.getElementById('modal-consent').checked;

      // Basic Phone validation (10 digits for Indian mobile numbers)
      const phoneDigits = phone.replace(/\D/g, '');
      if (phoneDigits.length < 10) {
        alert('Please enter a valid 10-digit mobile number.');
        document.getElementById('modal-patient-phone').focus();
        return;
      }

      if (!consent) {
        alert('Please consent to clinic privacy and appointment confirmation policy.');
        return;
      }

      // Generate Reference Code
      const refCode = 'DENTIA-' + Math.floor(100000 + Math.random() * 900000);

      // Populate Success Box
      document.getElementById('confirm-ref-code').textContent = refCode;
      document.getElementById('confirm-patient-name').textContent = name;
      document.getElementById('confirm-treatment').textContent = treatment;
      document.getElementById('confirm-date').textContent = `${date} (${time})`;
      document.getElementById('confirm-doctor').textContent = doctor;

      // WhatsApp sync button
      const waBtn = document.getElementById('confirm-whatsapp-btn');
      if (waBtn) {
        const waMessage = encodeURIComponent(
          `Hello Dentia Clinic, I have requested an appointment.\nRef: ${refCode}\nPatient: ${name}\nPhone: ${phone}\nTreatment: ${treatment}\nDoctor: ${doctor}\nPreferred Date: ${date} (${time})`
        );
        waBtn.href = `https://wa.me/919876543210?text=${waMessage}`;
      }

      // Switch view
      form.style.display = 'none';
      if (successBox) successBox.classList.add('show');
    });
  }
}

function openAppointmentModal(prefills = {}) {
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const form = document.getElementById('appointment-booking-form');
  const successBox = document.querySelector('.booking-success-box');

  if (!modalBackdrop) return;

  // Restore form visibility if success box was shown earlier
  if (form) form.style.display = 'flex';
  if (successBox) successBox.classList.remove('show');

  // Apply prefills
  if (prefills.treatment && document.getElementById('modal-treatment')) {
    document.getElementById('modal-treatment').value = prefills.treatment;
  }
  if (prefills.doctor && document.getElementById('modal-doctor')) {
    document.getElementById('modal-doctor').value = prefills.doctor;
  }
  if (prefills.date && document.getElementById('modal-date')) {
    document.getElementById('modal-date').value = prefills.date;
  }
  if (prefills.time && document.getElementById('modal-time')) {
    document.getElementById('modal-time').value = prefills.time;
  }

  modalBackdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeAppointmentModal() {
  const modalBackdrop = document.querySelector('.modal-backdrop');
  if (modalBackdrop) {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   9. Date Constraints (Prevent past dates)
   ========================================================================== */
function initDateConstraints() {
  const today = new Date().toISOString().split('T')[0];
  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach(input => {
    input.min = today;
    if (!input.value) {
      input.value = today;
    }
  });
}
