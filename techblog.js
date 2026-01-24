// ===== Filter by category chips =====
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.card');
chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const key = chip.dataset.filter;
    cards.forEach(card => {
      if (key === 'all') { card.style.display = ''; return; }
      const tags = (card.dataset.tags || '').split(' ');
      card.style.display = tags.includes(key) ? '' : 'none';
    });
  });
});

// ===== Live search =====
const search = document.getElementById('search');
if (search) {
  search.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    cards.forEach(card => {
      const text = card.innerText.toLowerCase();
      card.style.display = text.includes(q) ? '' : 'none';
    });
  });
}

// ===== Reading time from data-words =====
const WPM = 220;
document.querySelectorAll('.card').forEach(card => {
  const words = parseInt(card.dataset.words || '0', 10);
  const mins = Math.max(1, Math.round(words / WPM));
  const slot = card.querySelector('.reading-time');
  if (slot) slot.textContent = `${mins} min read`;
});

// ===== Web share API (fallback copies URL) =====
document.querySelectorAll('.card .share').forEach(btn => {
  btn.addEventListener('click', async () => {
    const title = btn.closest('.card').querySelector('.title')?.innerText?.trim() || 'Tech article';
    const url = location.href.split('#')[0];
    if (navigator.share) {
      try { await navigator.share({ title, url }); } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(url);
        btn.textContent = 'Copied!';
        setTimeout(() => (btn.textContent = 'Share'), 1200);
      } catch {}
    }
  });
});

// ===== Smooth scroll for internal anchors =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


