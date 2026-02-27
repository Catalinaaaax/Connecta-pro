// Variables DOM
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
const year = document.getElementById('year');
const modal = document.getElementById('modal');
const modalClose = document.querySelector('.modal-close');
const modalForm = document.getElementById('modalForm');
const modalMsg = document.getElementById('modalMsg');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');
const modalServiceInput = document.getElementById('mservice');
const modalOpenBtns = document.querySelectorAll('.modal-open');
const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');

// Año dinámico en footer
if(year) year.textContent = new Date().getFullYear();

// Toggle menú responsive
if(navToggle){
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    navToggle.classList.toggle('active');
    // show nav for small screens
    if(mainNav.style.display === 'block') mainNav.style.display = '';
    else mainNav.style.display = 'block';
  });
}

// Abrir modal y set service
modalOpenBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const svc = btn.dataset.service || 'Consulta';
    openModal(svc);
  });
});

function openModal(service){
  modalServiceInput.value = service;
  modalTitle.textContent = `Solicitar Información — ${service}`;
  modalText.textContent = 'Completa tus datos y nos pondremos en contacto contigo.';
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
  modalMsg.textContent = '';
  if(modalForm) modalForm.reset();
}
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{
  if(e.target === modal || e.target.classList.contains('modal-backdrop')) closeModal();
});

// Modal form (simulado)
if(modalForm){
  modalForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    const name = document.getElementById('mname').value;
    const email = document.getElementById('memail').value;
    const service = document.getElementById('mservice').value;

    modalMsg.textContent = 'Redirigiendo a WhatsApp...';
    
    const text = `Hola, estoy interesado en: *${service}*%0A%0AMi nombre es: ${name}%0ACorreo: ${email}`;

    setTimeout(()=>{
      window.open(`https://wa.me/573233170626?text=${text}`, '_blank');
      modalMsg.textContent = '¡Gracias! Revisa la ventana de chat.';
      modalForm.reset();
      setTimeout(closeModal, 1800);
    }, 1200);
  });
}

// Contact form (validación sencilla)
if(contactForm){
  contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();

    if(!name || !email || !phone || service === ""){
      formMsg.textContent = 'Por favor completa todos los campos obligatorios.';
      return;
    }
    
    formMsg.textContent = 'Redirigiendo a WhatsApp...';

    // Construir el mensaje para WhatsApp
    const text = `Hola Connecta Pro, nuevo contacto desde la web:%0A%0A` +
                 `👤 *Nombre:* ${name}%0A` +
                 `📱 *Teléfono:* ${phone}%0A` +
                 `📧 *Correo:* ${email}%0A` +
                 `🚀 *Interés:* ${service}%0A` +
                 `📝 *Mensaje:* ${message}`;

    setTimeout(()=>{
      window.open(`https://wa.me/573233170626?text=${text}`, '_blank');
      formMsg.textContent = '¡Gracias! Si no se abrió WhatsApp, verifica tus ventanas emergentes.';
      contactForm.reset();
    }, 1200);
  });
}

// Small scroll reveal effect
const revealEls = document.querySelectorAll('.card, .package, .section-header, .hero-inner');
const revealOnScroll = () => {
  const top = window.innerHeight * 0.85;
  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < top) el.style.opacity = 1, el.style.transform = 'translateY(0)';
  });
};
revealEls.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'all .6s ease';
});
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Lógica para el acordeón de FAQ
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  item.addEventListener('toggle', event => {
    // Si el <details> se está abriendo
    if (item.open) {
      // Cerrar todos los demás <details>
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.open) {
          otherItem.open = false;
        }
      });
    }
  });
});

// Animación de scroll suave para enlaces de anclaje
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Cerrar el menú móvil si está abierto antes de desplazarse
      if (mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        navToggle.classList.remove('active');
      }

      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
