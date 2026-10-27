/**
 * ====================================================
 * CHANGING SENTENCES EXAM ENGINE - CLASS 2
 * Full Interactive Logic, Timer, LocalStorage Database
 * ====================================================
 */

// LocalStorage Keys
const STORAGE_KEY_DB = 'CHANGING_SENTENCES_EXAM_DB';
const STORAGE_KEY_SETTINGS = 'CHANGING_SENTENCES_SETTINGS';

// State Management
const state = {
  studentName: '',
  examMode: 'mixed', // 'mixed' | 'assertive_to_interrogative' | 'interrogative_to_assertive'
  questionCount: 20,
  timerMode: 'standard', // 'standard' | 'speed' | 'notimer'
  soundEnabled: true,
  
  // Active Exam
  activeQuestions: [],
  userAnswers: {}, // { [qIndex]: selectedOptionIndex }
  currentQuestionIndex: 0,
  timerInterval: null,
  totalSecondsAllotted: 0,
  secondsRemaining: 0,
  secondsElapsed: 0,
  isExamSubmitted: false,
  examStartTime: null,

  // Last Result
  lastResultData: null
};

// Web Audio API Sound Synthesizer (Zero external dependencies)
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(freq, type, duration, delay = 0) {
  if (!state.soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
    
    gain.gain.setValueAtTime(0.12, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
  } catch (e) {
    console.warn("Audio not supported or blocked", e);
  }
}

function playSound(name) {
  if (!state.soundEnabled) return;
  if (name === 'click') {
    playTone(520, 'sine', 0.08);
  } else if (name === 'select') {
    playTone(659.25, 'triangle', 0.12);
  } else if (name === 'complete') {
    // Cheerful arpeggio: C5 -> E5 -> G5 -> C6
    playTone(523.25, 'triangle', 0.2, 0.0);
    playTone(659.25, 'triangle', 0.2, 0.12);
    playTone(783.99, 'triangle', 0.2, 0.24);
    playTone(1046.50, 'sine', 0.45, 0.36);
  } else if (name === 'warning') {
    playTone(330, 'square', 0.2);
  }
}

// Confetti Particle System
class ConfettiCannon {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  fire(duration = 3500) {
    this.particles = [];
    const colors = ['#2563eb', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#eab308'];
    const count = 120;

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: this.canvas.width / 2,
        y: this.canvas.height / 2 + 50,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.75) * 18,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        alpha: 1
      });
    }

    if (this.animationId) cancelAnimationFrame(this.animationId);
    const startTime = Date.now();

    const loop = () => {
      const elapsed = Date.now() - startTime;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let p of this.particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.rotation += p.rotationSpeed;
        p.alpha = Math.max(0, 1 - elapsed / duration);

        this.ctx.save();
        this.ctx.globalAlpha = p.alpha;
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        this.ctx.restore();
      }

      if (elapsed < duration) {
        this.animationId = requestAnimationFrame(loop);
      } else {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    };

    loop();
  }
}

let confetti = null;

// ====================================================
// DOM Elements
// ====================================================
const DOM = {
  // Screens
  screenSetup: document.getElementById('screen-setup'),
  screenExam: document.getElementById('screen-exam'),
  screenResult: document.getElementById('screen-result'),
  screenDashboard: document.getElementById('screen-dashboard'),

  // Header
  brandHomeBtn: document.getElementById('brand-home-btn'),
  soundToggleBtn: document.getElementById('sound-toggle-btn'),
  soundIcon: document.getElementById('sound-icon'),
  navDashboardBtn: document.getElementById('nav-dashboard-btn'),

  // Setup Form
  studentNameInput: document.getElementById('student-name'),
  modeRadios: document.querySelectorAll('input[name="exam-mode"]'),
  modeOptions: document.querySelectorAll('.mode-option'),
  countButtons: document.querySelectorAll('.count-btn'),
  timeButtons: document.querySelectorAll('.time-btn'),
  standardTimePreview: document.getElementById('standard-time-preview'),
  speedTimePreview: document.getElementById('speed-time-preview'),
  startExamBtn: document.getElementById('start-exam-btn'),
  homeHistorySummary: document.getElementById('home-history-summary'),
  shortcutOpenDb: document.getElementById('shortcut-open-db'),

  // Active Exam
  examDisplayName: document.getElementById('exam-display-name'),
  currentQIndex: document.getElementById('current-q-index'),
  totalQCount: document.getElementById('total-q-count'),
  timerBadge: document.getElementById('timer-badge'),
  timerDisplay: document.getElementById('timer-display'),
  examProgressBar: document.getElementById('exam-progress-bar'),
  qCategoryLabel: document.getElementById('q-category-label'),
  qCategoryIcon: document.getElementById('q-category-icon'),
  qCategoryText: document.getElementById('q-category-text'),
  qInstructionText: document.getElementById('q-instruction-text'),
  qSentenceText: document.getElementById('q-sentence-text'),
  optionsGrid: document.getElementById('options-grid'),
  btnPrevQ: document.getElementById('btn-prev-q'),
  btnClearChoice: document.getElementById('btn-clear-choice'),
  btnNextQ: document.getElementById('btn-next-q'),
  btnFinishExam: document.getElementById('btn-finish-exam'),
  btnPaletteToggle: document.getElementById('btn-palette-toggle'),
  paletteAnsweredCount: document.getElementById('palette-answered-count'),
  paletteTotalCount: document.getElementById('palette-total-count'),
  paletteDrawer: document.getElementById('palette-drawer'),
  btnClosePalette: document.getElementById('btn-close-palette'),
  paletteButtonsGrid: document.getElementById('palette-buttons-grid'),

  // Results
  resultStars: document.getElementById('result-stars'),
  resultGreeting: document.getElementById('result-greeting'),
  resultSubtitle: document.getElementById('result-subtitle'),
  resultScoreFraction: document.getElementById('result-score-fraction'),
  resultPercentage: document.getElementById('result-percentage'),
  statCorrectCount: document.getElementById('stat-correct-count'),
  statWrongCount: document.getElementById('stat-wrong-count'),
  statSkippedCount: document.getElementById('stat-skipped-count'),
  statTimeTaken: document.getElementById('stat-time-taken'),
  btnRetryExam: document.getElementById('btn-retry-exam'),
  btnViewDashboardFromRes: document.getElementById('btn-view-dashboard-from-res'),
  btnNewExam: document.getElementById('btn-new-exam'),
  filterTabs: document.querySelectorAll('.filter-tab'),
  filterCntAll: document.getElementById('filter-cnt-all'),
  filterCntWrong: document.getElementById('filter-cnt-wrong'),
  filterCntCorrect: document.getElementById('filter-cnt-correct'),
  reviewCardsContainer: document.getElementById('review-cards-container'),

  // Dashboard
  btnDbBackHome: document.getElementById('btn-db-back-home'),
  dbTotalTests: document.getElementById('db-total-tests'),
  dbBestScore: document.getElementById('db-best-score'),
  dbAvgAccuracy: document.getElementById('db-avg-accuracy'),
  btnClearDb: document.getElementById('btn-clear-db'),
  historyTableBody: document.getElementById('history-table-body'),
  dbEmptyState: document.getElementById('db-empty-state'),
  btnDbEmptyStart: document.getElementById('btn-db-empty-start'),

  // Modal
  confirmModal: document.getElementById('confirm-modal'),
  modalTitle: document.getElementById('modal-title'),
  modalMessage: document.getElementById('modal-message'),
  modalBtnCancel: document.getElementById('modal-btn-cancel'),
  modalBtnConfirm: document.getElementById('modal-btn-confirm')
};

// ====================================================
// INITIALIZATION
// ====================================================
function init() {
  confetti = new ConfettiCannon('confetti-canvas');
  loadSettings();
  updateTimePreviews();
  updateHomeHistorySummary();
  bindEvents();
}

function loadSettings() {
  const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.studentName) {
        state.studentName = parsed.studentName;
        DOM.studentNameInput.value = parsed.studentName;
      }
      if (typeof parsed.soundEnabled === 'boolean') {
        state.soundEnabled = parsed.soundEnabled;
        updateSoundUI();
      }
    } catch (e) {
      console.warn("Could not parse settings", e);
    }
  }
}

function saveSettings() {
  const settings = {
    studentName: state.studentName,
    soundEnabled: state.soundEnabled
  };
  localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
}

function updateSoundUI() {
  DOM.soundIcon.textContent = state.soundEnabled ? '🔊' : '🔇';
  DOM.soundToggleBtn.title = state.soundEnabled ? 'Mute Sound' : 'Enable Sound';
}

// Update time preview labels on setup screen
function updateTimePreviews() {
  const q = state.questionCount;
  DOM.standardTimePreview.textContent = `${q} মিনিট (${q} mins)`;
  DOM.speedTimePreview.textContent = `${Math.ceil(q / 2)} মিনিট (${Math.ceil(q / 2)} mins)`;
}

// Update quick history summary on home card
function updateHomeHistorySummary() {
  const db = getExamDatabase();
  if (db.length === 0) {
    DOM.homeHistorySummary.textContent = 'এখনো কোনো পরীক্ষা দেওয়া হয়নি। প্রথম পরীক্ষা শুরু করো!';
  } else {
    const last = db[db.length - 1];
    DOM.homeHistorySummary.textContent = `সর্বশেষ পরীক্ষা #${last.serial}: ${last.score}/${last.totalQuestions} (${last.percentage}%) • তারিখ: ${last.date}`;
  }
}

// ====================================================
// NAVIGATION & SCREEN SWITCHING
// ====================================================
function showScreen(screenId) {
  const screens = [DOM.screenSetup, DOM.screenExam, DOM.screenResult, DOM.screenDashboard];
  screens.forEach(s => s.classList.remove('active-screen'));

  if (screenId === 'setup') {
    DOM.screenSetup.classList.add('active-screen');
    updateHomeHistorySummary();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (screenId === 'exam') {
    DOM.screenExam.classList.add('active-screen');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (screenId === 'result') {
    DOM.screenResult.classList.add('active-screen');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (screenId === 'dashboard') {
    DOM.screenDashboard.classList.add('active-screen');
    renderDashboard();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ====================================================
// EVENT HANDLERS
// ====================================================
function bindEvents() {
  // Brand Logo Click -> Go Home
  DOM.brandHomeBtn.addEventListener('click', () => {
    if (DOM.screenExam.classList.contains('active-screen') && !state.isExamSubmitted) {
      showModal({
        title: 'পরীক্ষা চলমান রয়েছে!',
        message: 'তুমি কি পরীক্ষাটি বাতিল করে হোম পেইজে ফিরে যেতে চাও? বর্তমান অগ্রগতি হারিয়ে যাবে।',
        onConfirm: () => {
          stopTimer();
          showScreen('setup');
        }
      });
    } else {
      showScreen('setup');
    }
  });

  // Sound Toggle
  DOM.soundToggleBtn.addEventListener('click', () => {
    state.soundEnabled = !state.soundEnabled;
    updateSoundUI();
    saveSettings();
    if (state.soundEnabled) playSound('click');
  });

  // Dashboard Nav Button
  DOM.navDashboardBtn.addEventListener('click', () => {
    if (DOM.screenExam.classList.contains('active-screen') && !state.isExamSubmitted) {
      showModal({
        title: 'পরীক্ষা ছেড়ে ড্যাশবোর্ডে যাবে?',
        message: 'বর্তমান পরীক্ষা বাতিল না করে ড্যাশবোর্ডে যাওয়া সম্ভব নয়। বাতিল করতে চাও?',
        onConfirm: () => {
          stopTimer();
          showScreen('dashboard');
        }
      });
    } else {
      showScreen('dashboard');
    }
  });

  DOM.shortcutOpenDb.addEventListener('click', () => showScreen('dashboard'));
  DOM.btnDbBackHome.addEventListener('click', () => showScreen('setup'));
  DOM.btnDbEmptyStart.addEventListener('click', () => showScreen('setup'));

  // Setup Form - Student Name
  DOM.studentNameInput.addEventListener('input', (e) => {
    state.studentName = e.target.value.trim();
    saveSettings();
  });

  // Setup Form - Mode Selection
  DOM.modeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      DOM.modeOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      const radio = opt.querySelector('input');
      radio.checked = true;
      state.examMode = radio.value;
      playSound('click');
    });
  });

  // Setup Form - Question Count Buttons
  DOM.countButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.countButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.questionCount = parseInt(btn.dataset.count, 10);
      updateTimePreviews();
      playSound('click');
    });
  });

  // Setup Form - Timer Mode Buttons
  DOM.timeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      DOM.timeButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.timerMode = btn.dataset.timeMode;
      playSound('click');
    });
  });

  // Start Exam Button
  DOM.startExamBtn.addEventListener('click', () => {
    startExam();
  });

  // Exam Controls
  DOM.btnPrevQ.addEventListener('click', () => {
    if (state.currentQuestionIndex > 0) {
      state.currentQuestionIndex--;
      renderActiveQuestion();
      playSound('click');
    }
  });

  DOM.btnNextQ.addEventListener('click', () => {
    if (state.currentQuestionIndex < state.activeQuestions.length - 1) {
      state.currentQuestionIndex++;
      renderActiveQuestion();
      playSound('click');
    }
  });

  DOM.btnClearChoice.addEventListener('click', () => {
    delete state.userAnswers[state.currentQuestionIndex];
    renderActiveQuestion();
    updatePaletteStatus();
    playSound('click');
  });

  // Palette Toggle
  DOM.btnPaletteToggle.addEventListener('click', () => {
    DOM.paletteDrawer.classList.toggle('hidden');
    playSound('click');
  });

  DOM.btnClosePalette.addEventListener('click', () => {
    DOM.paletteDrawer.classList.add('hidden');
  });

  // Finish Exam Button
  DOM.btnFinishExam.addEventListener('click', () => {
    const answeredCount = Object.keys(state.userAnswers).length;
    const total = state.activeQuestions.length;
    const unanswered = total - answeredCount;

    let message = `তুমি ${total}টি প্রশ্নের মধ্যে ${answeredCount}টির উত্তর দিয়েছো।`;
    if (unanswered > 0) {
      message += ` এখনো ${unanswered}টি প্রশ্নের উত্তর দেওয়া বাকি আছে!`;
    }
    message += ` এখনই পরীক্ষা শেষ করে সাবমিট করতে চাও?`;

    showModal({
      title: 'পরীক্ষা সাবমিট করবে?',
      message: message,
      onConfirm: () => {
        submitExam();
      }
    });
  });

  // Result Actions
  DOM.btnRetryExam.addEventListener('click', () => {
    startExam();
  });

  DOM.btnViewDashboardFromRes.addEventListener('click', () => {
    showScreen('dashboard');
  });

  DOM.btnNewExam.addEventListener('click', () => {
    showScreen('setup');
  });

  // Result Review Filter Tabs
  DOM.filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      DOM.filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      filterReviewItems(tab.dataset.filter);
      playSound('click');
    });
  });

  // Clear Database
  DOM.btnClearDb.addEventListener('click', () => {
    showModal({
      title: 'সকল রেকর্ড মুছে ফেলবে?',
      message: 'ড্যাশবোর্ডের সংরক্ষিত সব পরীক্ষার তথ্য চিরতরে মুছে যাবে। তুমি কি নিশ্চিত?',
      onConfirm: () => {
        clearExamDatabase();
        renderDashboard();
        updateHomeHistorySummary();
      }
    });
  });
}

// ====================================================
// MODAL LOGIC
// ====================================================
let modalConfirmCallback = null;

function showModal({ title, message, onConfirm }) {
  DOM.modalTitle.textContent = title;
  DOM.modalMessage.textContent = message;
  modalConfirmCallback = onConfirm;
  DOM.confirmModal.classList.remove('hidden');
}

DOM.modalBtnCancel.addEventListener('click', () => {
  DOM.confirmModal.classList.add('hidden');
  modalConfirmCallback = null;
  playSound('click');
});

DOM.modalBtnConfirm.addEventListener('click', () => {
  DOM.confirmModal.classList.add('hidden');
  if (modalConfirmCallback) {
    modalConfirmCallback();
    modalConfirmCallback = null;
  }
});

// ====================================================
// EXAM ENGINE
// ====================================================
function startExam() {
  playSound('click');
  const nameInput = DOM.studentNameInput.value.trim();
  state.studentName = nameInput || 'Student';
  saveSettings();

  // Filter questions based on mode
  let pool = [];
  if (state.examMode === 'assertive_to_interrogative') {
    pool = rawQuestions.filter(q => q.type === 'assertive_to_interrogative');
  } else if (state.examMode === 'interrogative_to_assertive') {
    pool = rawQuestions.filter(q => q.type === 'interrogative_to_assertive');
  } else {
    // Mixed: balance both types
    const p1 = shuffleArray([...rawQuestions.filter(q => q.type === 'assertive_to_interrogative')]);
    const p2 = shuffleArray([...rawQuestions.filter(q => q.type === 'interrogative_to_assertive')]);
    pool = [];
    const maxLen = Math.max(p1.length, p2.length);
    for (let i = 0; i < maxLen; i++) {
      if (p1[i]) pool.push(p1[i]);
      if (p2[i]) pool.push(p2[i]);
    }
  }

  // Shuffle pool
  pool = shuffleArray(pool);

  // Take requested count (or maximum available if user chose 100 and pool has slightly different count)
  const targetCount = Math.min(state.questionCount, pool.length);
  const selectedQuestions = pool.slice(0, targetCount);

  // For each question, also shuffle options to prevent pattern memorization
  state.activeQuestions = selectedQuestions.map((q, qIndex) => {
    const originalOptions = q.options.map((optText, origIdx) => ({
      text: optText,
      isCorrect: origIdx === q.answer
    }));

    const shuffledOptions = shuffleArray(originalOptions);
    const newCorrectIdx = shuffledOptions.findIndex(o => o.isCorrect);

    return {
      id: qIndex + 1,
      type: q.type,
      sentence: q.sentence,
      prompt: q.prompt,
      options: shuffledOptions.map(o => o.text),
      answer: newCorrectIdx,
      explanation: q.explanation
    };
  });

  // Reset exam state
  state.userAnswers = {};
  state.currentQuestionIndex = 0;
  state.isExamSubmitted = false;
  state.examStartTime = Date.now();
  state.secondsElapsed = 0;

  // Setup Timer
  setupTimer(targetCount);

  // Update UI Elements
  DOM.examDisplayName.textContent = state.studentName;
  DOM.totalQCount.textContent = state.activeQuestions.length;
  DOM.paletteTotalCount.textContent = state.activeQuestions.length;

  renderPaletteButtons();
  renderActiveQuestion();
  showScreen('exam');
}

function setupTimer(questionCount) {
  stopTimer();
  DOM.timerBadge.classList.remove('timer-warning');

  if (state.timerMode === 'notimer') {
    DOM.timerBadge.style.display = 'flex';
    DOM.timerDisplay.textContent = '00:00';
    state.secondsElapsed = 0;

    state.timerInterval = setInterval(() => {
      state.secondsElapsed++;
      DOM.timerDisplay.textContent = formatTime(state.secondsElapsed);
    }, 1000);

  } else {
    // Countdown timer
    let minutesAllotted = questionCount; // standard: 1 min per question
    if (state.timerMode === 'speed') {
      minutesAllotted = Math.ceil(questionCount / 2); // 30 sec per question
    }

    state.totalSecondsAllotted = minutesAllotted * 60;
    state.secondsRemaining = state.totalSecondsAllotted;
    DOM.timerDisplay.textContent = formatTime(state.secondsRemaining);

    state.timerInterval = setInterval(() => {
      state.secondsRemaining--;
      state.secondsElapsed++;

      if (state.secondsRemaining <= 120 && state.secondsRemaining > 0) {
        DOM.timerBadge.classList.add('timer-warning');
        if (state.secondsRemaining === 60 || state.secondsRemaining === 30) {
          playSound('warning');
        }
      }

      if (state.secondsRemaining <= 0) {
        stopTimer();
        DOM.timerDisplay.textContent = '00:00';
        playSound('warning');
        alert('⏱️ পরীক্ষার নির্ধারিত সময় শেষ হয়েছে! তোমার উত্তরগুলো স্বয়ংক্রিয়ভাবে সাবমিট করা হলো।');
        submitExam();
        return;
      }

      DOM.timerDisplay.textContent = formatTime(state.secondsRemaining);
    }, 1000);
  }
}

function stopTimer() {
  if (state.timerInterval) {
    clearInterval(state.timerInterval);
    state.timerInterval = null;
  }
}

// Render the active question on screen
function renderActiveQuestion() {
  const q = state.activeQuestions[state.currentQuestionIndex];
  if (!q) return;

  // Question Index & Progress Bar
  const currentNum = state.currentQuestionIndex + 1;
  const total = state.activeQuestions.length;
  DOM.currentQIndex.textContent = currentNum;
  DOM.examProgressBar.style.width = `${Math.round((currentNum / total) * 100)}%`;

  // Question Type Tag
  if (q.type === 'assertive_to_interrogative') {
    DOM.qCategoryIcon.textContent = '➡️';
    DOM.qCategoryText.textContent = 'Assertive to Interrogative';
    DOM.qInstructionText.textContent = 'Change into Interrogative (প্রশ্নবোধক বাক্য):';
  } else {
    DOM.qCategoryIcon.textContent = '⬅️';
    DOM.qCategoryText.textContent = 'Interrogative to Assertive';
    DOM.qInstructionText.textContent = 'Change into Assertive (বর্ণনামূলক বাক্য):';
  }

  DOM.qSentenceText.textContent = q.sentence;

  // Render 4 Options
  DOM.optionsGrid.innerHTML = '';
  const badges = ['A', 'B', 'C', 'D'];

  q.options.forEach((optText, optIdx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option-btn';
    if (state.userAnswers[state.currentQuestionIndex] === optIdx) {
      btn.classList.add('selected');
    }

    btn.innerHTML = `
      <span class="option-badge">${badges[optIdx]}</span>
      <span class="option-text">${escapeHtml(optText)}</span>
    `;

    btn.addEventListener('click', () => {
      state.userAnswers[state.currentQuestionIndex] = optIdx;
      playSound('select');
      renderActiveQuestion();
      updatePaletteStatus();
    });

    DOM.optionsGrid.appendChild(btn);
  });

  // Navigation Button States
  DOM.btnPrevQ.disabled = state.currentQuestionIndex === 0;
  if (state.currentQuestionIndex === total - 1) {
    DOM.btnNextQ.style.display = 'none';
  } else {
    DOM.btnNextQ.style.display = 'inline-flex';
  }

  updatePaletteStatus();
}

// Question Palette Management
function renderPaletteButtons() {
  DOM.paletteButtonsGrid.innerHTML = '';
  state.activeQuestions.forEach((_, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'palette-num-btn';
    btn.textContent = idx + 1;
    btn.dataset.index = idx;

    btn.addEventListener('click', () => {
      state.currentQuestionIndex = idx;
      renderActiveQuestion();
      DOM.paletteDrawer.classList.add('hidden');
      playSound('click');
    });

    DOM.paletteButtonsGrid.appendChild(btn);
  });
}

function updatePaletteStatus() {
  const answeredCount = Object.keys(state.userAnswers).length;
  DOM.paletteAnsweredCount.textContent = answeredCount;

  const buttons = DOM.paletteButtonsGrid.querySelectorAll('.palette-num-btn');
  buttons.forEach((btn, idx) => {
    btn.classList.remove('current', 'answered');

    if (state.userAnswers[idx] !== undefined) {
      btn.classList.add('answered');
    }
    if (idx === state.currentQuestionIndex) {
      btn.classList.add('current');
    }
  });
}

// ====================================================
// SUBMIT EXAM & EVALUATION
// ====================================================
function submitExam() {
  stopTimer();
  state.isExamSubmitted = true;
  playSound('complete');

  const totalQuestions = state.activeQuestions.length;
  let correctCount = 0;
  let wrongCount = 0;
  let skippedCount = 0;

  const detailedQuestions = state.activeQuestions.map((q, idx) => {
    const userSelected = state.userAnswers[idx];
    const isAnswered = userSelected !== undefined;
    const isCorrect = isAnswered && userSelected === q.answer;

    if (isAnswered) {
      if (isCorrect) correctCount++;
      else wrongCount++;
    } else {
      skippedCount++;
    }

    return {
      ...q,
      userAnswer: userSelected,
      isCorrect: isCorrect,
      isSkipped: !isAnswered
    };
  });

  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const grade = calculateGrade(percentage);
  const timeTakenFormatted = formatTime(state.secondsElapsed);

  // Create Record for Database
  const now = new Date();
  const dateFormatted = now.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  const timeFormatted = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const db = getExamDatabase();
  const nextSerial = db.length > 0 ? db[db.length - 1].serial + 1 : 1;

  const examRecord = {
    serial: nextSerial,
    timestamp: now.getTime(),
    date: dateFormatted,
    time: timeFormatted,
    studentName: state.studentName,
    mode: formatModeName(state.examMode),
    totalQuestions: totalQuestions,
    score: correctCount,
    wrong: wrongCount,
    skipped: skippedCount,
    percentage: percentage,
    grade: grade,
    timeTaken: timeTakenFormatted
  };

  // Save to Database
  saveExamToDatabase(examRecord);

  // Present Results
  displayResults({
    examRecord,
    detailedQuestions
  });

  // Launch celebration confetti if good score!
  if (percentage >= 50) {
    confetti.fire(3500);
  }

  showScreen('result');
}

// Calculate Grade and Stars
function calculateGrade(pct) {
  if (pct >= 90) return 'A+';
  if (pct >= 80) return 'A';
  if (pct >= 70) return 'B';
  if (pct >= 50) return 'C';
  return 'F';
}

function formatModeName(mode) {
  if (mode === 'assertive_to_interrogative') return 'Assertive ➔ Interrogative';
  if (mode === 'interrogative_to_assertive') return 'Interrogative ➔ Assertive';
  return 'Mixed (উভয় ধরণ)';
}

// ====================================================
// DISPLAY RESULTS & REVIEW
// ====================================================
function displayResults({ examRecord, detailedQuestions }) {
  state.lastResultData = { examRecord, detailedQuestions };

  // Stars & Encouragement
  const pct = examRecord.percentage;
  if (pct >= 85) {
    DOM.resultStars.textContent = '⭐⭐⭐';
    DOM.resultGreeting.textContent = `অসাধারণ ফলাফল, ${examRecord.studentName}! 🎉`;
    DOM.resultSubtitle.textContent = 'তুমি চমৎকার দক্ষতা দেখিয়েছ! প্রতিটি নিয়ম তোমার দারুণ মনে আছে।';
  } else if (pct >= 60) {
    DOM.resultStars.textContent = '⭐⭐';
    DOM.resultGreeting.textContent = `খুব সুন্দর হয়েছে, ${examRecord.studentName}! 👍`;
    DOM.resultSubtitle.textContent = 'ভালো হয়েছে! নিচে ভুলগুলো দেখে নাও, পরের বার ৩টি স্টার পাবে।';
  } else {
    DOM.resultStars.textContent = '⭐';
    DOM.resultGreeting.textContent = `ভালো চেষ্টা করেছ, ${examRecord.studentName}! 💪`;
    DOM.resultSubtitle.textContent = 'মন খারাপ করো না! নিচের সঠিক উত্তরগুলো ভালো করে পড়ে আবার চেষ্টা করো।';
  }

  DOM.resultScoreFraction.textContent = `${examRecord.score}/${examRecord.totalQuestions}`;
  DOM.resultPercentage.textContent = `${examRecord.percentage}%`;

  DOM.statCorrectCount.textContent = examRecord.score;
  DOM.statWrongCount.textContent = examRecord.wrong;
  DOM.statSkippedCount.textContent = examRecord.skipped;
  DOM.statTimeTaken.textContent = examRecord.timeTaken;

  // Filter tab counts
  DOM.filterCntAll.textContent = detailedQuestions.length;
  DOM.filterCntWrong.textContent = examRecord.wrong;
  DOM.filterCntCorrect.textContent = examRecord.score;

  // Reset tab to "All"
  DOM.filterTabs.forEach(t => t.classList.remove('active'));
  DOM.filterTabs[0].classList.add('active');

  renderReviewCards(detailedQuestions, 'all');
}

function renderReviewCards(questions, filter) {
  DOM.reviewCardsContainer.innerHTML = '';

  const filtered = questions.filter(q => {
    if (filter === 'wrong') return !q.isCorrect && !q.isSkipped;
    if (filter === 'correct') return q.isCorrect;
    return true; // 'all'
  });

  if (filtered.length === 0) {
    DOM.reviewCardsContainer.innerHTML = `
      <div style="text-align:center; padding: 30px; color: var(--text-muted); font-weight:700;">
        এই ক্যাটাগরিতে কোনো প্রশ্ন নেই! ✨
      </div>
    `;
    return;
  }

  const optionLabels = ['A', 'B', 'C', 'D'];

  filtered.forEach(q => {
    const card = document.createElement('div');
    card.className = 'review-item-card';

    let statusClass = 'skipped';
    let statusText = '⚪ উত্তর দেওয়া হয়নি';

    if (!q.isSkipped) {
      if (q.isCorrect) {
        statusClass = 'correct';
        statusText = '✅ সঠিক হয়েছে';
        card.classList.add('is-correct');
      } else {
        statusClass = 'wrong';
        statusText = '❌ ভুল উত্তর';
        card.classList.add('is-wrong');
      }
    }

    const userAnsText = q.isSkipped 
      ? 'উত্তর দেয়নি (Skipped)' 
      : `${optionLabels[q.userAnswer]}: ${q.options[q.userAnswer]}`;

    const correctAnsText = `${optionLabels[q.answer]}: ${q.options[q.answer]}`;

    card.innerHTML = `
      <div class="review-card-top">
        <span class="q-no">প্রশ্ন #${q.id} • ${q.type === 'assertive_to_interrogative' ? 'Assertive ➔ Interrogative' : 'Interrogative ➔ Assertive'}</span>
        <span class="status-badge ${statusClass}">${statusText}</span>
      </div>

      <div class="review-given-sentence">
        “${escapeHtml(q.sentence)}”
      </div>

      <div class="review-answers-box">
        <div class="r-ans-line ${q.isCorrect ? 'user-correct' : (q.isSkipped ? '' : 'user-wrong')}">
          <span class="label">তোমার উত্তর:</span>
          <span class="val">${escapeHtml(userAnsText)}</span>
        </div>
        ${!q.isCorrect ? `
          <div class="r-ans-line correct-key">
            <span class="label">সঠিক উত্তর:</span>
            <span class="val">${escapeHtml(correctAnsText)}</span>
          </div>
        ` : ''}
      </div>

      <div class="review-tip">
        <strong>💡 ব্যাকরণ টিপস:</strong> ${escapeHtml(q.explanation)}
      </div>
    `;

    DOM.reviewCardsContainer.appendChild(card);
  });
}

function filterReviewItems(filter) {
  if (!state.lastResultData) return;
  renderReviewCards(state.lastResultData.detailedQuestions, filter);
}

// ====================================================
// DATABASE & DASHBOARD LOGIC (LocalStorage)
// ====================================================
function getExamDatabase() {
  const data = localStorage.getItem(STORAGE_KEY_DB);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error("Database reading error", e);
    return [];
  }
}

function saveExamToDatabase(record) {
  const db = getExamDatabase();
  db.push(record);
  localStorage.setItem(STORAGE_KEY_DB, JSON.stringify(db));
}

function clearExamDatabase() {
  localStorage.removeItem(STORAGE_KEY_DB);
}

function renderDashboard() {
  const db = getExamDatabase();

  if (db.length === 0) {
    DOM.dbEmptyState.classList.remove('hidden');
    DOM.historyTableBody.innerHTML = '';
    DOM.dbTotalTests.textContent = '0';
    DOM.dbBestScore.textContent = '--';
    DOM.dbAvgAccuracy.textContent = '--';
    return;
  }

  DOM.dbEmptyState.classList.add('hidden');
  DOM.dbTotalTests.textContent = db.length;

  // Best score
  let maxPct = 0;
  let totalPctSum = 0;

  db.forEach(item => {
    if (item.percentage > maxPct) maxPct = item.percentage;
    totalPctSum += item.percentage;
  });

  DOM.dbBestScore.textContent = `${maxPct}%`;
  DOM.dbAvgAccuracy.textContent = `${Math.round(totalPctSum / db.length)}%`;

  // Render rows in reverse order (most recent first)
  DOM.historyTableBody.innerHTML = '';
  const reversed = [...db].reverse();

  reversed.forEach(record => {
    const tr = document.createElement('tr');

    let gradeClass = 'grade-B';
    if (record.grade === 'A+' || record.grade === 'A') gradeClass = 'grade-A';
    else if (record.grade === 'C') gradeClass = 'grade-C';
    else if (record.grade === 'F') gradeClass = 'grade-F';

    tr.innerHTML = `
      <td><span class="serial-pill">#${record.serial}</span></td>
      <td>${escapeHtml(record.date)} <br><small style="color:var(--text-muted);">${escapeHtml(record.time)}</small></td>
      <td><strong>${escapeHtml(record.studentName || 'Student')}</strong></td>
      <td>${escapeHtml(record.mode)}</td>
      <td>${record.totalQuestions} টি</td>
      <td><strong>${record.score} / ${record.totalQuestions}</strong></td>
      <td>${record.percentage}%</td>
      <td>${escapeHtml(record.timeTaken)}</td>
      <td><span class="grade-badge ${gradeClass}">${record.grade}</span></td>
    `;

    DOM.historyTableBody.appendChild(tr);
  });
}

// ====================================================
// UTILITY FUNCTIONS
// ====================================================
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Bootstrap on DOM Ready
document.addEventListener('DOMContentLoaded', init);
