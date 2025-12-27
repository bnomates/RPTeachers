let translations = {};
let currentLang = 'en';

// --- 1. Fetch Translations ---
async function loadTranslations() {
  try {
    const response = await fetch('js/translations.json');
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    translations = await response.json();
    updatePageContent(currentLang);
  } catch (e) {
    console.error('Translation error:', e);
    // If it fails, users will see the empty placeholders,
    // but at least the page won't be stuck on white.
  } finally {
    // ALWAYS reveal the page, success or failure
    document.body.classList.remove('js-loading');
  }
}

// --- 2. Helper: Walk the JSON Tree ---
// Converts "navbar.contact" into translations[lang]['navbar']['contact']
function resolvePath(obj, path) {
  return path.split('.').reduce((prev, curr) => {
    return prev ? prev[curr] : null;
  }, obj);
}

// --- 3. Update DOM ---
function updatePageContent(lang) {
  if (!translations[lang]) return;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const keyPath = el.getAttribute('data-i18n');
    const text = resolvePath(translations[lang], keyPath);

    if (text) {
      el.innerText = text;
    } else {
      console.warn(`Missing translation key: ${keyPath}`);
    }
  });
}

// --- 4. Initialization ---
document.addEventListener('DOMContentLoaded', loadTranslations);

// --- 5. Language Toggle ---
document.getElementById('lang-toggle').addEventListener('click', function () {
  if (Object.keys(translations).length === 0) return;

  currentLang = currentLang === 'en' ? 'es' : 'en';
  this.innerText = currentLang === 'en' ? 'ES' : 'EN';
  updatePageContent(currentLang);
});

// --- 6. Form Submission ---
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  if (!translations[currentLang]) return;

  const btn = document.getElementById('submitBtn');

  // Use nested keys for button states
  btn.innerText = resolvePath(
    translations[currentLang],
    'contact.form.sending'
  );
  btn.disabled = true;

  setTimeout(() => {
    const responseDiv = document.getElementById('formResponse');
    const successMsg = resolvePath(
      translations[currentLang],
      'contact.form.success'
    );

    responseDiv.innerHTML = `<span class="text-success fw-bold">${successMsg}</span>`;

    this.reset();

    const originalBtnText = resolvePath(
      translations[currentLang],
      'contact.form.btn'
    );
    btn.innerText = originalBtnText;
    btn.disabled = false;

    setTimeout(() => {
      responseDiv.innerHTML = '';
    }, 5000);
  }, 1500);
});
