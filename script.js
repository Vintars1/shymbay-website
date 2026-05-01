// ===========================
//  ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКА
// ===========================
let currentLang = 'ru';

function setLang(lang) {
  currentLang = lang;

  // Обновляем все элементы с data-ru / data-en
  document.querySelectorAll('[data-ru]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text) el.innerHTML = text;
  });

  // Обновляем placeholder у инпутов
  document.querySelectorAll('[data-placeholder-ru]').forEach(el => {
    el.placeholder = el.getAttribute('data-placeholder-' + lang) || '';
  });

  // Кнопки языка — активная
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent === lang.toUpperCase());
  });

  // Меняем lang у <html>
  document.documentElement.lang = lang;
}

// ===========================
//  МОБИЛЬНОЕ МЕНЮ
// ===========================
function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('open');
}

// Закрываем меню при клике вне его
document.addEventListener('click', function (e) {
  const menu   = document.getElementById('mobile-menu');
  const burger = document.getElementById('burger');
  if (!menu.contains(e.target) && !burger.contains(e.target)) {
    menu.classList.remove('open');
  }
});

// ===========================
//  NAVBAR — тень при скролле
// ===========================
window.addEventListener('scroll', function () {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// ===========================
//  АНИМАЦИЯ появления секций
// ===========================
function initReveal() {
  const targets = document.querySelectorAll(
    '.product-card, .stat-item, .about-points li, .contact-item, .section-title, .section-tag, .section-sub'
  );

  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Небольшая задержка для каждого элемента — красивый каскад
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 60);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach(el => observer.observe(el));
}

// ===========================
//  ФОРМА — обработка отправки
// ===========================
function handleSubmit(event) {
  event.preventDefault();

  const form    = event.target;
  const btn     = form.querySelector('.btn-submit');
  const success = document.getElementById('form-success');

  // Показываем загрузку
  btn.textContent = currentLang === 'ru' ? 'Отправляем...' : 'Sending...';
  btn.disabled = true;

  // Симуляция отправки (можно заменить на fetch к реальному API)
  setTimeout(() => {
    form.reset();
    btn.textContent = currentLang === 'ru' ? 'Отправить заявку' : 'Send Request';
    btn.disabled = false;

    success.textContent = currentLang === 'ru'
      ? '✅ Заявка отправлена! Свяжемся с вами скоро.'
      : '✅ Request sent! We\'ll contact you soon.';

    // Убираем сообщение через 5 секунд
    setTimeout(() => { success.textContent = ''; }, 5000);
  }, 1200);
}

// ===========================
//  ПЛАВНЫЙ СКРОЛЛ для ссылок
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===========================
//  ЗАПУСК
// ===========================
document.addEventListener('DOMContentLoaded', function () {
  setLang('ru');
  initReveal();
});
