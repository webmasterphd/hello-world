const intercepts = [
  { label: 'Agency relationships', type: 'R2', time: '9 min', note: 'Review before it slips below confident recall.' },
  { label: 'Trust fund handling', type: 'R4', time: '12 min', note: 'One statute check, then scenario practice.' },
  { label: 'Disclosures', type: 'R1', time: '7 min', note: 'Fast reinforcement from yesterday’s lesson.' },
];

const assignments = [
  { icon: '🎯', title: 'Pacing refinement', subtitle: '15-minute session focused on property ownership questions', cta: 'Begin assignment' },
  { icon: '🎧', title: 'Listen while walking', subtitle: 'OLD CAR podcast segment prescribed for today', cta: 'Play audio' },
  { icon: '✦', title: 'Confer with Sterling', subtitle: 'Ask for a walkthrough of your two missed fiduciary duty items', cta: 'Confer in writing' },
];

const labels = ['L', 'L', 'R2', 'R1', 'R1', 'L', 'R2', 'R1', 'R2', 'L', 'R3', 'R2', 'L', 'R3', 'R1', 'R2', 'R4', 'R3', 'R2', 'R1', 'R4', 'R5', 'R3', 'R4', 'R5', 'R4', 'R3', 'R5', 'R5', 'R5'];
const examDays = new Set([7, 14, 22, 25, 28]);
let tier = 'concierge';
let selectedDay = 12;

function readinessFor(currentTier) {
  if (currentTier === 'free') return 46;
  if (currentTier === 'executive') return 68;
  return 84;
}

function render() {
  const readiness = readinessFor(tier);
  document.querySelector('#root').innerHTML = `
    <main class="dashboard-shell">
      <div class="ambient ambient-one"></div><div class="ambient ambient-two"></div>
      <nav class="topbar">
        <div><p class="eyebrow">ConciergeTestPrep.ai</p><h1>Good evening, Maria.</h1></div>
        <div class="tier-switch" aria-label="Preview dashboard tier">
          ${['free', 'executive', 'concierge'].map(item => `<button data-tier="${item}" class="${tier === item ? 'active' : ''}">${item === 'concierge' ? 'Concierge · 24-hr visit' : item[0].toUpperCase() + item.slice(1)}</button>`).join('')}
        </div>
      </nav>
      <section class="hero-panel glass">
        <div class="hero-copy">
          <span class="gold-pill">✦ Pass on your first attempt — guaranteed</span>
          <h2>Your Concierge has prepared today’s study service.</h2>
          <p>Sterling has sequenced your Ebbinghaus intercepts, pacing work, and Mastery Hub reinforcement into one calm path for the next 42 minutes.</p>
          <div class="hero-actions"><button class="gold-button">▶ Resume today’s session</button><button class="ghost-button">◌ Speak with the Concierge</button></div>
        </div>
        <div class="readiness-orb" style="--score: ${readiness}"><div class="orb-ring"><span>${readiness}%</span><small>exam readiness</small></div><p>${tier === 'concierge' ? 'Concierge trajectory: first-attempt ready' : 'Step up to unlock proactive orchestration'}</p></div>
      </section>
      <section class="grid-layout">
        <div class="left-stack">
          <section class="glass intercept-card"><div class="section-heading"><div><p class="eyebrow">Today’s intercepts</p><h3>Review at the precise moment memory can be strengthened.</h3></div><span>📅</span></div><div class="intercept-list">${intercepts.map(item => `<article class="intercept-row"><strong>${item.type}</strong><div><h4>${item.label}</h4><p>${item.note}</p></div><span>${item.time}</span></article>`).join('')}</div></section>
          <section class="glass bootcamp-card"><div class="section-heading"><div><p class="eyebrow">30-Day Bootcamp</p><h3>California curriculum, arranged by the Ebbinghaus Intercept.</h3></div><span class="progress-label">Day ${selectedDay}</span></div><div class="progress-track"><span style="width:${selectedDay / 30 * 100}%"></span></div><div class="calendar-grid">${labels.map((label, index) => { const day = index + 1; return `<button data-day="${day}" class="${label.toLowerCase()} ${day === selectedDay ? 'selected' : ''} ${examDays.has(day) ? 'exam' : ''}"><small>${day}</small>${examDays.has(day) ? 'Exam' : label}</button>`; }).join('')}</div></section>
        </div>
        <aside class="right-stack">
          <section class="glass concierge-card"><div class="sterling-badge">✦ Sterling</div><h3>Private note from your Concierge</h3><p>“Your accuracy is strong when the question names the duty directly. Today we will make the indirect scenarios feel just as familiar.”</p></section>
          <section class="glass metrics-card"><div class="metric"><p>Time bank</p><strong>+12s</strong><span>↗ banking vs target</span></div><div class="metric"><p>Weak spot cleared</p><strong>2/5</strong><span>✓ since yesterday</span></div></section>
          <section class="glass assignment-card"><p class="eyebrow">Concierge Desk assignment</p>${assignments.map(item => `<article><span class="assignment-icon">${item.icon}</span><div><h4>${item.title}</h4><p>${item.subtitle}</p><button>${item.cta}</button></div></article>`).join('')}</section>
        </aside>
      </section>
    </main>`;

  document.querySelectorAll('[data-tier]').forEach(button => button.addEventListener('click', () => { tier = button.dataset.tier; render(); }));
  document.querySelectorAll('[data-day]').forEach(button => button.addEventListener('click', () => { selectedDay = Number(button.dataset.day); render(); }));
}

render();
