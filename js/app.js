/* ═══════════════════════════════════════
   APP CONTROLLER — DSA Learning Platform
═══════════════════════════════════════ */

const App = (() => {
  function init() {
    renderCards();
    bindEvents();
    animateHero();
    updateStats();
  }

  function renderCards() {
    const grid = document.getElementById('topics-grid');
    if (!grid) return;
    grid.innerHTML = DSA_TOPICS.map(topic => cardHTML(topic)).join('');

    // Stagger card animation
    document.querySelectorAll('.card-3d').forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
        card.style.opacity = '1';
        card.style.transform = '';
      }, i * 90 + 200);
    });
  }

  function cardHTML(t) {
    return `
      <div class="card-3d" onclick="Modal.open('${t.id}')" role="button" tabindex="0">
        <div class="card-inner">
          <div class="card-icon" style="background:${t.iconBg};color:${t.color};font-size:1.5rem">
            ${t.icon}
          </div>
          <div class="card-title">${t.title}</div>
          <div class="card-desc">${t.desc}</div>
          <div class="card-badge badge-${t.difficulty}">${t.difficulty}</div>
          <div class="progress-bar">
            <div class="progress-fill" id="progress-${t.id}" style="width:${t.progress}%"></div>
          </div>
        </div>
      </div>
    `;
  }

  function bindEvents() {
    // Close modal on overlay click
    document.getElementById('modal-overlay')?.addEventListener('click', (e) => {
      if (e.target.id === 'modal-overlay') Modal.close();
    });

    // Keyboard close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') Modal.close();
    });

    // 3D tilt effect on cards
    document.addEventListener('mousemove', (e) => {
      document.querySelectorAll('.card-inner').forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const inBounds = x > 0 && x < rect.width && y > 0 && y < rect.height;
        if (inBounds) {
          const rx = ((y / rect.height) - 0.5) * 12;
          const ry = ((x / rect.width) - 0.5) * -12;
          card.style.transform = `translateY(-8px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        }
      });
    });
  }

  function animateHero() {
    const h1 = document.querySelector('.hero h1');
    if (!h1) return;
    const text = h1.textContent;
    h1.innerHTML = text.split('').map((ch, i) =>
      `<span style="display:inline-block;animation:letterDrop 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.04}s both">${ch === ' ' ? '&nbsp;' : ch}</span>`
    ).join('');
  }

  function updateStats() {
    const totalEl = document.getElementById('stat-total');
    const doneEl  = document.getElementById('stat-done');
    if (totalEl) totalEl.textContent = DSA_TOPICS.length;
    setInterval(() => {
      const done = DSA_TOPICS.filter(t => t.progress > 0).length;
      if (doneEl) doneEl.textContent = done;
    }, 1000);
  }

  return { init };
})();

// ── BOOT ──
document.addEventListener('DOMContentLoaded', App.init);

// CSS keyframe for letter drop (injected)
const style = document.createElement('style');
style.textContent = `
@keyframes letterDrop {
  from { opacity:0; transform:translateY(-20px) scale(0.8); }
  to   { opacity:1; transform:translateY(0)     scale(1); }
}`;
document.head.appendChild(style);

// ── TOAST UTILITY ──
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}
