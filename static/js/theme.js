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

// ============================================
// SCROLL PROGRESS BAR
// ============================================
(function () {
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.prepend(bar);
  window.addEventListener('scroll', function () {
    var pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
})();

// ============================================
// PROJECT CARD 3D TILT ON HOVER
// ============================================
(function () {
  document.querySelectorAll('.project-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = 'perspective(800px) rotateY(' + (x * 4) + 'deg) rotateX(' + (-y * 4) + 'deg)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });
})();

// ============================================
// HOMEPAGE STAGGERED SECTION REVEALS
// ============================================
(function () {
  var mainContent = document.querySelector('.main-content');
  if (!mainContent) return;

  var sections = mainContent.querySelectorAll('.section, .experience-strip');
  if (sections.length === 0) return;

  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  sections.forEach(function (s) {
    revealObs.observe(s);
  });
})();




// ============================================
// ANIMATED STAT COUNTERS
// ============================================
(function () {
  var statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length === 0) return;

  function animateCount(el) {
    var raw = el.textContent.trim();
    var numMatch = raw.match(/(\d+)/);
    if (!numMatch) return;
    var target = parseInt(numMatch[1], 10);
    var prefix = raw.slice(0, raw.indexOf(numMatch[0]));
    var suffix = raw.slice(raw.indexOf(numMatch[0]) + numMatch[0].length);
    var duration = 1200;
    var start = performance.now();

    function tick(now) {
      var t = Math.min((now - start) / duration, 1);
      var ease = 1 - Math.pow(1 - t, 3);
      el.textContent = prefix + Math.round(target * ease) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    }
    el.textContent = prefix + '0' + suffix;
    requestAnimationFrame(tick);
  }

  var counterObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var cells = entry.target.querySelectorAll('.stat-number');
        cells.forEach(function (cell, idx) {
          setTimeout(function () { animateCount(cell); }, idx * 100);
        });
        counterObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.stats-grid').forEach(function (grid) {
    counterObs.observe(grid);
  });
})();




// ============================================
// INTERACTIVE TIMELINE (about page)
// ============================================
(function () {
  var entries = document.querySelectorAll('.timeline-entry');
  if (entries.length === 0) return;

  var timelineObs = new IntersectionObserver(function (observed) {
    observed.forEach(function (entry) {
      entry.target.classList.toggle('active', entry.isIntersecting);
    });
  }, { threshold: 0.5, rootMargin: '-20% 0px' });

  entries.forEach(function (e) {
    timelineObs.observe(e);
  });
})();
