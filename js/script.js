let currentLang = 'en';
let translations = {};

async function initI18n() {
  try {
    // Points back to your Hostinger folder structure
    const response = await fetch('js/translations.json');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    translations = await response.json();
    updatePage();
  } catch (error) {
    console.error('Could not load translation file from assets folder:', error);
  }
}

function updatePage() {
  const langData = translations[currentLang];
  if (!langData) return;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const path = el.getAttribute('data-i18n').split('.');
    let text = langData;

    // Traverse the hierarchical JSON
    for (const key of path) {
      if (text && text[key] !== undefined) {
        text = text[key];
      } else {
        text = null;
        break;
      }
    }

    if (text) {
      el.innerText = text;
    }
  });
}

document.getElementById('lang-toggle').addEventListener('click', function () {
  currentLang = currentLang === 'en' ? 'es' : 'en';
  this.innerText = currentLang === 'en' ? 'ES' : 'EN';
  updatePage();
});

document.addEventListener('DOMContentLoaded', initI18n);
