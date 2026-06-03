// Mobile nav
const btn = document.querySelector('.menu-btn');
const menu = document.querySelector('nav ul');
if (btn && menu){
  btn.addEventListener('click', () => menu.classList.toggle('open'));
}

// Meta Pixel helper events
function trackLead(channel){
  try{
    if (typeof fbq === 'function'){
      fbq('track', 'Lead', { channel });
    }
  }catch(e){}
}

function trackViewContent(name){
  try{
    if (typeof fbq === 'function'){
      fbq('track', 'ViewContent', { content_name: name });
    }
  }catch(e){}
}

// Track WhatsApp/IG clicks
document.querySelectorAll('[data-track="whatsapp"]').forEach(a=>{
  a.addEventListener('click', ()=>trackLead('whatsapp'));
});
document.querySelectorAll('[data-track="instagram"]').forEach(a=>{
  a.addEventListener('click', ()=>trackLead('instagram'));
});

// Product details modal (uses <dialog>)
const dialog = document.getElementById('productModal');
if (dialog){
  const titleEl = dialog.querySelector('[data-modal-title]');
  const descEl  = dialog.querySelector('[data-modal-desc]');
  const pillsEl = dialog.querySelector('[data-modal-pills]');
  const waEl    = dialog.querySelector('[data-modal-wa]');

  document.querySelectorAll('[data-open-product]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const name = btn.getAttribute('data-name') || 'Product';
      const desc = btn.getAttribute('data-desc') || '';
      const tags = (btn.getAttribute('data-tags') || '')
        .split(',')
        .map(s=>s.trim())
        .filter(Boolean);
      const waText = btn.getAttribute('data-wa-text') || `Hi GlowIn Skincare! I want to order ${name}.`;

      titleEl.textContent = name;
      descEl.textContent = desc;

      pillsEl.innerHTML = '';
      tags.forEach(t=>{
        const span = document.createElement('span');
        span.className = 'pill';
        span.textContent = t;
        pillsEl.appendChild(span);
      });

      // Your WhatsApp number (no + in wa.me)
      waEl.href = `https://wa.me/2349034824462?text=${encodeURIComponent(waText)}`;

      trackViewContent(name);
      dialog.showModal();
    });
  });

  // Click outside modal content closes it
  dialog.addEventListener('click', (e)=>{
    const rect = dialog.getBoundingClientRect();
    const inDialog = (
      e.clientX >= rect.left && e.clientX <= rect.right &&
      e.clientY >= rect.top  && e.clientY <= rect.bottom
    );
    if (!inDialog) dialog.close();
  });

  // Close buttons
  dialog.querySelectorAll('[data-close]').forEach(b=>{
    b.addEventListener('click', ()=>dialog.close());
  });
    }
