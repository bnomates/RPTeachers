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
  } finally {
    document.body.classList.remove('js-loading');
  }
}

// --- 2. Helper: Walk the JSON Tree ---
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

// --- 6. REAL Form Submission ---
document
  .getElementById('contactForm')
  .addEventListener('submit', async function (e) {
    e.preventDefault();

    if (!translations[currentLang]) return;

    const btn = document.getElementById('submitBtn');
    const responseDiv = document.getElementById('formResponse');

    // 1. Set Loading State
    const originalBtnText = btn.innerText;
    btn.innerText = resolvePath(
      translations[currentLang],
      'contact.form.sending'
    );
    btn.disabled = true;

    // 2. Gather Data
    const formData = new FormData(this);
    const jsonData = Object.fromEntries(formData.entries());

    try {
      // 3. Send to PHP
      const response = await fetch('mail.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      // 4. Handle Result
      if (response.ok) {
        // Success
        const successMsg = resolvePath(
          translations[currentLang],
          'contact.form.success'
        );
        responseDiv.innerHTML = `<span class="text-success fw-bold">${successMsg}</span>`;
        this.reset();
      } else {
        // Server Error
        responseDiv.innerHTML = `<span class="text-danger fw-bold">Error sending message. Please try again.</span>`;
      }
    } catch (error) {
      // Network Error
      console.error('Error:', error);
      responseDiv.innerHTML = `<span class="text-danger fw-bold">Network error. Please check your connection.</span>`;
    } finally {
      // 5. Reset Button
      btn.innerText = resolvePath(
        translations[currentLang],
        'contact.form.btn'
      ); // Reset to correct language text
      btn.disabled = false;

      // Clear message after 5 seconds
      setTimeout(() => {
        responseDiv.innerHTML = '';
      }, 5000);
    }
  });
