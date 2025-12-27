const translations = {
  en: {
    nav_method: 'Methodology',
    nav_reading: 'Reading List',
    nav_teachers: 'The Teachers',
    nav_contact: 'Contact',
    hero_title: 'British Education in La Palma',
    hero_subtitle:
      'Preparing ages 8–19 for UK Universities using the Cambridge Curriculum.',
    hero_cta: 'Join Waiting List',
    method_title: 'The CEQ Roadmap',
    method_sub: 'A guided journey from Primary to University.',
    card1_title: 'Foundation',
    card1_age: 'Ages 8-12',
    card1_text:
      'Building confidence in English literacy and numeracy. We turn curiosity into structured learning habits.',
    card2_title: 'The Core',
    card2_age: 'Ages 13-16',
    card2_text:
      'IGCSE preparation. Deep diving into sciences, humanities, and critical thinking required for global exams.',
    card3_title: 'University Ready',
    card3_age: 'Ages 17-19',
    card3_text:
      'A-Levels and university applications. We guide students into top UK institutions.',

    // READING LIST (Awaiting your input)
    read_title: 'Reading List',
    read_sub: 'Our curated selection for students.',
    read_card1_title: 'Foundation Titles',
    read_card1_age: 'Ages 8-12',
    read_card1_text: '[Awaiting Text]',
    read_card2_title: 'Core Titles',
    read_card2_age: 'Ages 13-16',
    read_card2_text: '[Awaiting Text]',
    read_card3_title: 'University Prep',
    read_card3_age: 'Ages 17-19',
    read_card3_text: '[Awaiting Text]',

    teacher_title: 'Meet Paul & Rebeca',
    teacher_intro: 'Bridging the cultural gap between Spain and the UK.',
    teacher_desc:
      "With Paul's British academic background and Rebeca's local Spanish roots, we understand the challenges your children face. We provide a disciplined yet nurturing environment where bilingualism is a superpower, not a hurdle.",
    testimonial:
      '"R&P Teachers completely changed our son\'s outlook on school. He is now confident, English-fluent, and excited about university."',
    contact_title: 'Get in Touch',
    form_name: 'Name',
    form_email: 'Email',
    form_msg: 'Message',
    form_btn: 'Send Message',
    sent: 'Message sent!',
  },
  es: {
    nav_method: 'Metodología',
    nav_reading: 'Lecturas',
    nav_teachers: 'Los Profesores',
    nav_contact: 'Contacto',
    hero_title: 'Educación Británica en La Palma',
    hero_subtitle:
      'Preparando a alumnos de 8 a 19 años para universidades británicas con el currículo de Cambridge.',
    hero_cta: 'Lista de Espera',
    method_title: 'La Ruta CEQ',
    method_sub: 'Un viaje guiado desde Primaria hasta la Universidad.',
    card1_title: 'Base',
    card1_age: '8-12 años',
    card1_text:
      'Fomentando la confianza en lectoescritura y matemáticas en inglés. Transformamos la curiosidad en hábitos de estudio.',
    card2_title: 'El Núcleo',
    card2_age: '13-16 años',
    card2_text:
      'Preparación para IGCSE. Profundizando en ciencias, humanidades y pensamiento crítico para exámenes globales.',
    card3_title: 'Rumbo Universidad',
    card3_age: '17-19 años',
    card3_text:
      'A-Levels y solicitudes universitarias. Guiamos a los estudiantes hacia las mejores instituciones del Reino Unido.',

    read_title: 'Lista de Lectura',
    read_sub: 'Nuestra selección curada para estudiantes.',
    read_card1_title: 'Títulos Base',
    read_card1_age: '8-12 años',
    read_card1_text: '[Pendiente]',
    read_card2_title: 'Títulos Núcleo',
    read_card2_age: '13-16 años',
    read_card2_text: '[Pendiente]',
    read_card3_title: 'Prep Universitaria',
    read_card3_age: '17-19 años',
    read_card3_text: '[Pendiente]',

    teacher_title: 'Conoce a Paul y Rebeca',
    teacher_intro: 'Uniendo la brecha cultural entre España y el Reino Unido.',
    teacher_desc:
      'Con la formación académica británica de Paul y las raíces palmeras de Rebeca, entendemos los retos de sus hijos. Ofrecemos un entorno disciplinado pero enriquecedor donde el bilingüismo es un superpoder.',
    testimonial:
      '"R&P Teachers cambió por completo la actitud de nuestro hijo hacia los estudios. Ahora tiene confianza, fluidez y está motivado por la universidad."',
    contact_title: 'Contacta con Nosotros',
    form_name: 'Nombre',
    form_email: 'Correo',
    form_msg: 'Mensaje',
    form_btn: 'Enviar Mensaje',
    sent: '¡Mensaje enviado!',
  },
};

function updateContent() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang][key]) {
      el.innerText = translations[currentLang][key];
    }
  });
}

let currentLang = 'en';
// Initial call to populate empty HTML
updateContent();

document.getElementById('lang-toggle').addEventListener('click', function () {
  currentLang = currentLang === 'en' ? 'es' : 'en';
  this.innerText = currentLang === 'en' ? 'ES' : 'EN';
  updateContent();
});

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.innerText = currentLang === 'en' ? 'Sending...' : 'Enviando...';
  btn.disabled = true;

  setTimeout(() => {
    document.getElementById(
      'formResponse'
    ).innerHTML = `<span class="text-success fw-bold">${translations[currentLang].sent}</span>`;
    this.reset();
    btn.innerText = translations[currentLang].form_btn;
    btn.disabled = false;
  }, 1500);
});
