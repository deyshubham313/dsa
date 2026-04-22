/* ═══════════════════════════════════════
   MODAL CONTROLLER — DSA Learning Platform
═══════════════════════════════════════ */

const Modal = (() => {
  let currentTopic = null;
  let activeTab = 'learn';

  function open(topicId) {
    currentTopic = DSA_TOPICS.find(t => t.id === topicId);
    if (!currentTopic) return;
    activeTab = 'learn';

    const overlay = document.getElementById('modal-overlay');
    const titleEl = document.getElementById('modal-topic-title');
    if (titleEl) titleEl.textContent = currentTopic.title;

    renderTabContent('learn');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    document.getElementById('modal-overlay').classList.remove('open');
    document.body.style.overflow = '';
    currentTopic = null;
  }

  function switchTab(tab) {
    activeTab = tab;
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(t => {
      t.classList.toggle('active', t.dataset.tab === tab);
    });
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    // Show active
    const activeContent = document.getElementById(`tab-${tab}`);
    if (activeContent) activeContent.classList.add('active');

    renderTabContent(tab);
  }

  function renderTabContent(tab) {
    if (tab === 'learn') renderLearn();
    if (tab === 'demo')  renderDemo();
    if (tab === 'quiz')  renderQuiz();
  }

  /* ── LEARN TAB ── */
  function renderLearn() {
    const container = document.getElementById('learn-tab-content');
    if (!container || !currentTopic) return;
    const L = currentTopic.learn;

    container.innerHTML = `
      <div class="learn-section">
        <h3>📖 Overview</h3>
        <p>${L.overview}</p>
      </div>

      <div class="learn-section">
        <h3>⚡ Time & Space Complexity</h3>
        <div class="complexity-row">
          ${L.complexity.map(c => `
            <div class="complexity-chip">${c.op}: <span>${c.val}</span></div>
          `).join('')}
        </div>
      </div>

      <div class="learn-section">
        <h3>💡 When to Use</h3>
        <p>${L.useCases}</p>
      </div>

      <div class="learn-section">
        <h3>👨‍💻 Implementation</h3>
        <div class="code-block">${L.code}</div>
      </div>

      <div style="margin-top:24px;display:flex;gap:12px;flex-wrap:wrap">
        <button class="btn btn-primary" onclick="Modal.switchTab('demo')">🎮 Try Demo →</button>
        <button class="btn btn-gold" onclick="Modal.switchTab('quiz')">📝 Take Quiz →</button>
      </div>
    `;
  }

  /* ── DEMO TAB ── */
  function renderDemo() {
    const container = document.getElementById('demo-tab-content');
    if (!container || !currentTopic) return;

    container.innerHTML = `
      <div style="margin-bottom:16px;color:var(--text-muted);font-size:0.88rem;line-height:1.6">
        Interact with the live visualization below. Click the buttons to see operations in real time.
      </div>
      <div class="viz-container" id="viz-main-container"></div>
      <div style="margin-top:20px;display:flex;gap:12px;flex-wrap:wrap">
        <button class="btn btn-gold" onclick="Modal.switchTab('quiz')">📝 Take Quiz →</button>
      </div>
    `;

    const vizEl = document.getElementById('viz-main-container');
    vizEl.id = `viz-${currentTopic.id}-main`;
    Viz.render(currentTopic.learn.vizType, vizEl);
  }

  /* ── QUIZ TAB ── */
  function renderQuiz() {
    const container = document.getElementById('quiz-tab-content');
    if (!container || !currentTopic) return;
    // QuizEngine will fill this container
    QuizEngine.start(currentTopic.id, currentTopic.quiz);
  }

  return { open, close, switchTab, renderTabContent };
})();
