'use strict';

document.documentElement.classList.add('js-enabled');

// Edit these entries to customise the seasonal menu. All prices are demo USD.
const menu = {
  starters: [
    { name: 'Whipped Burrata', description: 'Heirloom tomatoes, basil oil, toasted sourdough.', price: 16, vegetarian: true },
    { name: 'Ember-Roasted Carrots', description: 'Whipped feta, toasted hazelnuts, a drizzle of honey.', price: 14, vegetarian: true },
    { name: 'Seared Scallops', description: 'Cauliflower purée, brown butter, crispy capers.', price: 19 },
    { name: 'Wild Mushroom Toast', description: 'Garlic-roasted mushrooms, thyme, sourdough.', price: 15, vegetarian: true }
  ],
  mains: [
    { name: 'Ember-Grilled Ribeye', description: 'Seasonal vegetables, peppercorn jus, sea salt.', price: 38 },
    { name: 'Pan-Roasted Salmon', description: 'Seasonal greens, lemon butter, fresh herbs.', price: 32 },
    { name: 'Roasted Cauliflower', description: 'Smoked almond cream, lentils, herb salsa.', price: 25, vegetarian: true },
    { name: 'Herb-Roasted Chicken', description: 'Creamy potato mash, charred leeks, pan jus.', price: 29 }
  ],
  pasta: [
    { name: 'Garden Pesto Pasta', description: 'Basil pesto, parmesan, garden greens.', price: 24, vegetarian: true },
    { name: 'Wild Mushroom Tagliatelle', description: 'Forest mushrooms, cream, thyme, parmesan.', price: 26, vegetarian: true },
    { name: 'Slow-Braised Beef Pappardelle', description: 'Rich tomato ragù, pecorino, fresh parsley.', price: 28 },
    { name: 'Roasted Tomato Linguine', description: 'Sweet tomatoes, garlic, olive oil, fresh basil.', price: 22, vegetarian: true }
  ],
  desserts: [
    { name: 'Dark Chocolate Tart', description: 'Silky chocolate ganache, sea salt, vanilla cream.', price: 12, vegetarian: true },
    { name: 'Vanilla Bean Panna Cotta', description: 'Seasonal berry compote, almond crumble.', price: 11 },
    { name: 'Warm Apple Crumble', description: 'Cinnamon-roasted apples, oat crumble, ice cream.', price: 12, vegetarian: true },
    { name: 'Affogato', description: 'Vanilla gelato, a warm shot of espresso.', price: 9, vegetarian: true }
  ],
  drinks: [
    { name: 'Ember Old Fashioned', description: 'Bourbon, aromatic bitters, orange peel. Contains alcohol.', price: 15, vegetarian: true },
    { name: 'Garden Spritz', description: 'Elderflower, cucumber, lime, soda. Alcohol-free.', price: 10, vegetarian: true },
    { name: 'Citrus & Rosemary Fizz', description: 'Fresh citrus, rosemary syrup, sparkling water. Alcohol-free.', price: 9, vegetarian: true },
    { name: 'Espresso & Coffee', description: 'Espresso, americano, or a creamy flat white.', price: 5, vegetarian: true }
  ]
};

// Navigation: mobile focus management and scroll position.
const header = document.querySelector('.site-header');
const navigation = document.querySelector('#primary-nav');
const menuToggle = document.querySelector('.menu-toggle');
const backToTop = document.querySelector('.back-to-top');
const reservationPanel = document.querySelector('#reservation-form');
const mobileLayout = window.matchMedia('(max-width: 900px)');
const pageContent = [...document.querySelectorAll('main, .site-footer, .site-header > .wordmark, .skip-link, .back-to-top')];

function setMobileMenu(open) {
  navigation.classList.toggle('open', open);
  // Keep closing navigation out of the tab order during its fade transition.
  navigation.inert = mobileLayout.matches && !open;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  document.body.classList.toggle('nav-open', open);
  pageContent.forEach(element => { element.inert = open; });
}
setMobileMenu(false);
menuToggle.addEventListener('click', () => setMobileMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
navigation.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link) return;
  const wasOpen = navigation.classList.contains('open');
  setMobileMenu(false);
  if (wasOpen) {
    const destination = document.querySelector(link.hash);
    destination.setAttribute('tabindex', '-1');
    destination.focus({ preventScroll: true });
  }
});
document.addEventListener('keydown', event => {
  if (menuToggle.getAttribute('aria-expanded') !== 'true') return;
  if (event.key === 'Escape') {
    setMobileMenu(false);
    menuToggle.focus();
  }
  if (event.key === 'Tab') {
    const links = [...navigation.querySelectorAll('a')];
    const lastLink = links[links.length - 1];
    if (event.shiftKey && document.activeElement === menuToggle) {
      event.preventDefault();
      lastLink.focus();
    } else if (!event.shiftKey && document.activeElement === lastLink) {
      event.preventDefault();
      menuToggle.focus();
    }
  }
});
mobileLayout.addEventListener('change', () => {
  const wasOpen = navigation.classList.contains('open');
  setMobileMenu(false);
  if (mobileLayout.matches && navigation.contains(document.activeElement)) menuToggle.focus();
  else if (!mobileLayout.matches && wasOpen) navLinks[0].focus();
});

const navLinks = [...navigation.querySelectorAll('a:not(.nav-reserve)')];
const navSections = navLinks.map(link => document.querySelector(link.getAttribute('href')))
  .sort((a, b) => a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
let scrollScheduled = false;
function updateScrollState() {
  header.classList.toggle('scrolled', window.scrollY > 60);
  const formBounds = reservationPanel.getBoundingClientRect();
  backToTop.hidden = window.scrollY < 650 || (formBounds.top < window.innerHeight && formBounds.bottom > 78);
  let current = navSections[0];
  for (const section of navSections) {
    if (section.getBoundingClientRect().top <= 150) current = section;
  }
  navLinks.forEach(link => {
    const active = link.hash === `#${current.id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scrollScheduled = false;
}
function scheduleScrollUpdate() {
  if (!scrollScheduled) {
    scrollScheduled = true;
    window.requestAnimationFrame(updateScrollState);
  }
}
window.addEventListener('scroll', scheduleScrollUpdate, { passive: true });
window.addEventListener('resize', scheduleScrollUpdate, { passive: true });
updateScrollState();

// Menu filtering uses DOM nodes so copy remains safe to customise.
const menuContainer = document.querySelector('#menu-items');
function renderMenu(category, announce = true) {
  const entries = menu[category];
  menuContainer.replaceChildren(...entries.map(item => {
    const article = document.createElement('article');
    article.className = 'menu-item';
    const title = document.createElement('div');
    title.className = 'menu-item-title';
    const heading = document.createElement('h3');
    heading.textContent = item.name;
    if (item.vegetarian) {
      const indicator = document.createElement('span');
      indicator.className = 'veg';
      indicator.textContent = 'V';
      indicator.setAttribute('aria-label', 'Vegetarian');
      heading.append(' ', indicator);
    }
    const price = document.createElement('span');
    price.className = 'menu-item-price';
    price.textContent = `$${item.price}`;
    const description = document.createElement('p');
    description.textContent = item.description;
    title.append(heading, price);
    article.append(title, description);
    return article;
  }));
  if (announce) {
    const label = document.querySelector(`[data-category="${category}"]`).textContent;
    document.querySelector('#menu-status').textContent = `Showing ${entries.length} ${label.toLowerCase()} items.`;
  }
}
const categoryButtons = [...document.querySelectorAll('.filter')];
categoryButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.getAttribute('aria-pressed') === 'true') return;
    categoryButtons.forEach(filter => {
      const active = filter === button;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    renderMenu(button.dataset.category);
  });
});
renderMenu('starters', false);

// Demo reservations validate locally and never send or store guest data.
const form = document.querySelector('#reservation-form');
form.querySelector('[type="submit"]').disabled = false;
const dateField = document.querySelector('#date');
const message = document.querySelector('#form-message');
const errorSummary = document.querySelector('#form-error-summary');
const requiredFields = [...form.querySelectorAll('[required]')];
const requiredMessages = {
  name: 'Please enter your name.',
  phone: 'Please enter your phone number.',
  email: 'Please enter your email address.',
  date: 'Please choose a date.',
  time: 'Please choose a time.',
  guests: 'Please select the number of guests.'
};
function localDateString() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}
dateField.min = localDateString();

function validateField(field) {
  let error = '';
  const value = field.value.trim();
  if (!value) error = requiredMessages[field.id];
  else if (field.id === 'name' && value.length < 2) error = 'Please enter at least two characters.';
  else if (field.id === 'phone' && (!/^[+\d\s().-]+$/.test(value) || value.replace(/\D/g, '').length < 7 || value.replace(/\D/g, '').length > 15)) error = 'Please enter a valid phone number (7–15 digits).';
  else if (!field.validity.valid && field.id !== 'date') error = field.id === 'email' ? 'Please enter a valid email address.' : 'Please check this value.';
  else if (field.id === 'date') {
    const chosen = new Date(`${value}T12:00:00`);
    if (!Number.isFinite(chosen.getTime()) || value < localDateString()) error = 'Please choose today or a future date.';
    else if (chosen.getDay() === 1) error = 'We are closed on Mondays. Please choose another day.';
  } else if (field.id === 'time' && dateField.value === localDateString()) {
    if (new Date(`${dateField.value}T${value}`) <= new Date()) error = 'Please choose a future time or another date.';
  }
  document.querySelector(`#${field.id}-error`).textContent = error;
  field.setAttribute('aria-invalid', String(Boolean(error)));
  return !error;
}
requiredFields.forEach(field => {
  field.addEventListener('blur', () => {
    if (field.value || field.getAttribute('aria-invalid') === 'true') validateField(field);
  });
  field.addEventListener('input', () => {
    if (field.getAttribute('aria-invalid') === 'true') validateField(field);
  });
});
dateField.addEventListener('change', () => {
  dateField.min = localDateString();
  const timeField = form.elements.time;
  if (timeField.value) validateField(timeField);
});
form.addEventListener('input', () => {
  message.hidden = true;
  errorSummary.hidden = true;
});
form.addEventListener('submit', event => {
  event.preventDefault();
  dateField.min = localDateString();
  const results = requiredFields.map(validateField);
  if (results.includes(false)) {
    message.hidden = true;
    const errorCount = results.filter(valid => !valid).length;
    errorSummary.textContent = `Please check ${errorCount === 1 ? 'the highlighted field' : `the ${errorCount} highlighted fields`} below. Your request has not been sent.`;
    errorSummary.hidden = false;
    requiredFields[results.indexOf(false)].focus();
    return;
  }
  errorSummary.hidden = true;
  message.textContent = 'Demo request completed. On a live website, the restaurant would receive your request and contact you to confirm availability. No information was sent or stored, and no reservation has been made.';
  message.hidden = false;
  message.focus();
});

// Progressive enhancement: content stays visible when motion is reduced.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => {
    element.classList.add('ready');
    observer.observe(element);
  });
}

const dialog = document.querySelector('#demo-dialog');
document.querySelectorAll('[data-demo]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('#dialog-description').textContent = `The ${button.dataset.demo} link is a placeholder. EMBER & PLATE is a fictional restaurant with no live social account or messaging number. A real restaurant’s details can be connected here.`;
    dialog.showModal();
  });
});
dialog.querySelectorAll('button').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', event => {
  if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();
