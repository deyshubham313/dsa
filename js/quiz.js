/* ═══════════════════════════════════════
   QUIZ ENGINE — DSA Learning Platform
═══════════════════════════════════════ */

const QuizEngine = (() => {
  let state = {
    topicId: null,
    questions: [],
    current: 0,
    score: 0,
    answered: false,
    history: [],   // { q, chosen, correct }
  };

  function start(topicId, questions) {
    state = {
      topicId,
      questions,
      current: 0,
      score: 0,
      answered: false,
      history: [],
    };
    render();
  }

  function render() {
    const container = document.getElementById('quiz-tab-content');
    if (!container) return;

    if (state.current >= state.questions.length) {
      renderScore(container);
      return;
    }

    const q = state.questions[state.current];
    const labels = ['A', 'B', 'C', 'D'];

    container.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px">
        <div style="font-size:0.75rem;color:var(--text-muted);letter-spacing:1px">
          QUESTION <span style="color:var(--accent-cyan)">${state.current + 1}</span> / ${state.questions.length}
        </div>
        <div style="display:flex;gap:6px">
          ${state.questions.map((_, i) => `
            <div style="width:8px;height:8px;border-radius:50%;background:${
              i < state.current ? 'var(--accent-green)' :
              i === state.current ? 'var(--accent-cyan)' :
              'rgba(255,255,255,0.15)'
            }"></div>
          `).join('')}
        </div>
        <div style="font-family:'Orbitron',monospace;font-size:0.85rem;color:var(--accent-gold)">
          ⭐ ${state.score}/${state.questions.length}
        </div>
      </div>

      <div class="quiz-question">${q.q}</div>

      <div class="quiz-options" id="quiz-options">
        ${q.options.map((opt, i) => `
          <div class="quiz-option" onclick="QuizEngine.answer(${i})" data-idx="${i}">
            <div class="option-label">${labels[i]}</div>
            <div>${opt}</div>
          </div>
        `).join('')}
      </div>

      <div class="quiz-result" id="quiz-result"></div>

      <div style="display:flex;justify-content:flex-end;margin-top:20px">
        <button class="btn btn-primary" id="quiz-next-btn" onclick="QuizEngine.next()" style="display:none">
          ${state.current < state.questions.length - 1 ? 'Next Question →' : 'See Results'}
        </button>
      </div>
    `;
  }

  function answer(chosenIdx) {
    if (state.answered) return;
    state.answered = true;

    const q = state.questions[state.current];
    const correct = chosenIdx === q.answer;
    if (correct) state.score++;

    state.history.push({ q: q.q, chosen: chosenIdx, correct: q.answer, wasCorrect: correct });

    // Style options
    const opts = document.querySelectorAll('.quiz-option');
    opts.forEach((el, i) => {
      el.classList.add('disabled');
      if (i === q.answer) el.classList.add('correct');
      else if (i === chosenIdx && !correct) el.classList.add('wrong');
    });

    // Show result
    const resultEl = document.getElementById('quiz-result');
    if (resultEl) {
      resultEl.className = `quiz-result show ${correct ? 'success' : 'fail'}`;
      resultEl.innerHTML = `
        <strong>${correct ? '✅ Correct!' : '❌ Incorrect'}</strong>
        <div style="margin-top:6px;opacity:0.9;font-size:0.85rem">${q.explanation}</div>
      `;
    }

    // Show next btn
    const nextBtn = document.getElementById('quiz-next-btn');
    if (nextBtn) nextBtn.style.display = 'inline-flex';
  }

  function next() {
    state.current++;
    state.answered = false;
    render();
  }

  function renderScore(container) {
    const pct = Math.round((state.score / state.questions.length) * 100);
    const grade = pct >= 90 ? { label: 'EXPERT', color: 'var(--accent-cyan)' }
                : pct >= 70 ? { label: 'PROFICIENT', color: 'var(--accent-green)' }
                : pct >= 50 ? { label: 'LEARNING', color: 'var(--accent-gold)' }
                :             { label: 'KEEP GOING', color: 'var(--accent-red)' };

    container.innerHTML = `
      <div class="quiz-score">
        <div class="score-circle" style="border-color:${grade.color}">
          <div class="score-num" style="color:${grade.color}">${state.score}</div>
          <div class="score-total">/ ${state.questions.length}</div>
        </div>

        <div style="font-family:'Orbitron',monospace;font-size:1.2rem;color:${grade.color};margin-bottom:8px;letter-spacing:2px">
          ${grade.label}
        </div>
        <div style="color:var(--text-muted);margin-bottom:28px">${pct}% accuracy</div>

        <div style="text-align:left;margin-bottom:24px">
          ${state.history.map((h, i) => `
            <div style="display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06)">
              <span style="font-size:1rem">${h.wasCorrect ? '✅' : '❌'}</span>
              <div>
                <div style="font-size:0.82rem;color:var(--text-primary);margin-bottom:4px">${state.questions[i].q}</div>
                ${!h.wasCorrect ? `<div style="font-size:0.78rem;color:var(--accent-green)">✓ Correct: ${state.questions[i].options[h.correct]}</div>` : ''}
              </div>
            </div>
          `).join('')}
        </div>

        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
          <button class="btn btn-primary" onclick="QuizEngine.restart()">🔄 Retake Quiz</button>
          <button class="btn btn-outline" onclick="Modal.switchTab('learn')">📚 Review Topic</button>
        </div>
      </div>
    `;

    // Update topic progress
    updateProgress(state.topicId, pct);
  }

  function updateProgress(topicId, pct) {
    const topic = DSA_TOPICS.find(t => t.id === topicId);
    if (topic) {
      topic.progress = Math.max(topic.progress, pct);
      // Update card progress bar
      const bar = document.getElementById(`progress-${topicId}`);
      if (bar) bar.style.width = topic.progress + '%';
    }
  }

  function restart() {
    start(state.topicId, state.questions);
  }

  return { start, answer, next, restart };
})();
