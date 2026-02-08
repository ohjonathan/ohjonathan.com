// ============================================
// THEME PERSISTENCE (runs immediately)
// ============================================
(function () {
  const saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }
})();

// ============================================
// MATRIX RAIN
// ============================================
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let columns, drops;
const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';
const fontSize = 14;

function initMatrix() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
  for (let i = 0; i < drops.length; i++) {
    drops[i] = Math.floor(Math.random() * -50);
  }
}

function drawMatrix() {
  if (document.documentElement.getAttribute('data-theme') !== 'terminal') {
    requestAnimationFrame(drawMatrix);
    return;
  }

  ctx.fillStyle = 'rgba(10, 15, 13, 0.08)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    if (drops[i] < 0) {
      drops[i]++;
      continue;
    }
    const char = chars[Math.floor(Math.random() * chars.length)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    // Brighter head character occasionally
    if (Math.random() > 0.95) {
      ctx.fillStyle = 'rgba(60, 236, 106, 0.3)';
    } else {
      ctx.fillStyle = 'rgba(60, 236, 106, 0.1)';
    }

    ctx.fillText(char, x, y);

    if (y > canvas.height && Math.random() > 0.985) {
      drops[i] = Math.floor(Math.random() * -20);
    }
    drops[i]++;
  }

  requestAnimationFrame(drawMatrix);
}

initMatrix();
drawMatrix();
window.addEventListener('resize', initMatrix);

// ============================================
// THEME TOGGLE
// ============================================
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next = current === 'editorial' ? 'terminal' : 'editorial';
  const wrapper = document.querySelector('.page-wrapper');

  if (next === 'terminal') {
    // CRT turn-on effect
    wrapper.classList.remove('crt-off');
    wrapper.classList.add('crt-on');
    setTimeout(() => wrapper.classList.remove('crt-on'), 350);
  } else {
    // CRT turn-off effect (shorter on mobile to match CSS override)
    const offDuration = window.matchMedia('(max-width: 768px)').matches ? 150 : 200;
    wrapper.classList.add('crt-off');
    setTimeout(() => {
      wrapper.classList.remove('crt-off');
    }, offDuration);
  }

  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);

  // Clear matrix canvas when switching to editorial
  if (next === 'editorial') {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// Keyboard support for toggle
document.querySelector('.theme-toggle').addEventListener('keydown', function (e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleTheme();
  }
});
