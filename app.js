/**
 * ====================================================
 * CHANGING SENTENCES EXAM ENGINE - MULTI-USER PORTAL
 * Supports Mugdho (Class 4), Topu (SSC), Tonmoy (BCS),
 * Maliha (BCS), & Custom Family Accounts
 * ====================================================
 */

// Storage Keys
const STORAGE_KEY_USERS = 'EXAM_USERS_REGISTRY';
const STORAGE_KEY_ACTIVE_USER = 'ACTIVE_USER_ID';
const STORAGE_KEY_SETTINGS = 'CHANGING_SENTENCES_SETTINGS';
const STORAGE_LEGACY_DB = 'CHANGING_SENTENCES_EXAM_DB';

// Predefined Family Users
const DEFAULT_USERS = [
  { id: 'mugdho', name: 'Mugdho', role: 'Class Four', level: 'class4', avatar: '👦' },
  { id: 'topu',   name: 'Topu',   role: 'SSC Exam',   level: 'ssc',    avatar: '🧑‍🎓' },
  { id: 'tonmoy', name: 'Tonmoy', role: 'BCS Exam',   level: 'bcs',    avatar: '👨‍💼' },
  { id: 'maliha', name: 'Maliha', role: 'BCS Exam',   level: 'bcs',    avatar: '👩‍💼' }
];

// App State
const state = {
  activeUser: null,
  targetLevel: 'all', // 'class4' | 'ssc' | 'bcs' | 'all'
  examMode: 'mixed',   // 'mixed' | 'assertive_to_interrogative' | 'interrogative_to_assertive'
  questionCount: 20,
  timerMode: 'standard', // 'standard' | 'speed' | 'notimer'
  soundEnabled: true,
  
  // Active Exam Run
  activeQuestions: [],
  userAnswers: {},
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

// Web Audio API Sound Synthesizer
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
        p.vy += 0.35;
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

  // Header & User Badge
  brandHomeBtn: document.getElementById('brand-home-btn'),
  headerUserBtn: document.getElementById('header-user-btn'),
  headerUserAvatar: document.getElementById('header-user-avatar'),
  headerUserName: document.getElementById('header-user-name'),
  headerUserRole: document.getElementById('header-user-role'),
  soundToggleBtn: document.getElementById('sound-toggle-btn'),
  soundIcon: document.getElementById('sound-icon'),
  navDashboardBtn: document.getElementById('nav-dashboard-btn'),

  // Setup Form
  stripUserAvatar: document.getElementById('strip-user-avatar'),
  stripUserName: document.getElementById('strip-user-name'),
  stripUserRole: document.getElementById('strip-user-role'),
  stripUserId: document.getElementById('strip-user-id'),
  btnSwitchUserStrip: document.getElementById('btn-switch-user-strip'),
  levelCards: document.querySelectorAll('.level-card'),
  modeRadios: document.querySelectorAll('input[name="exam-mode"]'),
  modeOptions: document.querySelectorAll('.mode-option'),
  countButtons: document.querySelectorAll('.count-btn'),
  timeButtons: document.querySelectorAll('.time-btn'),
  standardTimePreview: document.getElementById('standard-time-preview'),
  speedTimePreview: document.getElementById('speed-time-preview'),
  startExamBtn: document.getElementById('start-exam-btn'),
  homeUserHistoryTitle: document.getElementById('home-user-history-title'),
  homeHistorySummary: document.getElementById('home-history-summary'),
  shortcutOpenDb: document.getElementById('shortcut-open-db'),

  // Active Exam
  examDisplayAvatar: document.getElementById('exam-display-avatar'),
  examDisplayName: document.getElementById('exam-display-name'),
  examDisplayRole: document.getElementById('exam-display-role'),
  currentQIndex: document.getElementById('current-q-index'),
  totalQCount: document.getElementById('total-q-count'),
  timerBadge: document.getElementById('timer-badge'),
  timerDisplay: document.getElementById('timer-display'),
  examProgressBar: document.getElementById('exam-progress-bar'),
  qCategoryLabel: document.getElementById('q-category-label'),
  qCategoryIcon: document.getElementById('q-category-icon'),
  qCategoryText: document.getElementById('q-category-text'),
  qLevelBadge: document.getElementById('q-level-badge'),
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
  dbActiveAvatar: document.getElementById('db-active-avatar'),
  dbActiveUsername: document.getElementById('db-active-username'),
  dbActiveRoleTag: document.getElementById('db-active-role-tag'),
  btnDbSwitchUser: document.getElementById('btn-db-switch-user'),
  btnDbBackHome: document.getElementById('btn-db-back-home'),
  dashboardTabs: document.querySelectorAll('.d-tab-btn'),
  tabMyHistory: document.getElementById('tab-content-my-history'),
  tabLeaderboard: document.getElementById('tab-content-family-leaderboard'),
  dbTotalTests: document.getElementById('db-total-tests'),
  dbBestScore: document.getElementById('db-best-score'),
  dbAvgAccuracy: document.getElementById('db-avg-accuracy'),
  btnClearDb: document.getElementById('btn-clear-db'),
  historyTableBody: document.getElementById('history-table-body'),
  leaderboardTableBody: document.getElementById('leaderboard-table-body'),
  dbEmptyState: document.getElementById('db-empty-state'),
  btnDbEmptyStart: document.getElementById('btn-db-empty-start'),

  // User Switcher Modal
  userModal: document.getElementById('user-modal'),
  userModalClose: document.getElementById('user-modal-close'),
  modalUserCardsGrid: document.getElementById('modal-user-cards-grid'),
  directLoginForm: document.getElementById('direct-login-form'),
  directUserIdInput: document.getElementById('direct-user-id-input'),
  btnToggleCreateUser: document.getElementById('btn-toggle-create-user'),
  createUserForm: document.getElementById('create-user-form'),
  newUserName: document.getElementById('new-user-name'),
  newUserId: document.getElementById('new-user-id'),
  newUserRole: document.getElementById('new-user-role'),

  // Confirmation Modal
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
  initUsersRegistry();
  resolveActiveUserFromURLOrStorage();
  migrateLegacyDatabaseIfNeeded();
  loadSettings();
  updateTimePreviews();
  updateHomeHistorySummary();
  bindEvents();
}

// User Registry in LocalStorage
function getUsersRegistry() {
  const data = localStorage.getItem(STORAGE_KEY_USERS);
  if (!data) {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(DEFAULT_USERS));
    return [...DEFAULT_USERS];
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return [...DEFAULT_USERS];
  }
}

function saveUsersRegistry(users) {
  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
}

function initUsersRegistry() {
  const users = getUsersRegistry();
  // Ensure default users exist
  DEFAULT_USERS.forEach(defUser => {
    if (!users.some(u => u.id === defUser.id)) {
      users.push(defUser);
    }
  });
  saveUsersRegistry(users);
}

// Resolve user from URL query param: ?user=topu or storage
function resolveActiveUserFromURLOrStorage() {
  const urlParams = new URLSearchParams(window.location.search);
  const paramUser = urlParams.get('user') || urlParams.get('u') || urlParams.get('id');

  const users = getUsersRegistry();
  let userToSet = null;

  if (paramUser) {
    userToSet = users.find(u => u.id.toLowerCase() === paramUser.trim().toLowerCase());
  }

  if (!userToSet) {
    const savedId = localStorage.getItem(STORAGE_KEY_ACTIVE_USER);
    userToSet = users.find(u => u.id === savedId) || users[0]; // defaults to Mugdho
  }

  setActiveUser(userToSet.id, false);
}

function setActiveUser(userId, triggerSound = true) {
  const users = getUsersRegistry();
  const found = users.find(u => u.id.toLowerCase() === userId.toLowerCase());
  if (!found) return false;

  state.activeUser = found;
  localStorage.setItem(STORAGE_KEY_ACTIVE_USER, found.id);

  // Set default level according to user's track
  if (found.level) {
    setLevel(found.level);
  } else {
    setLevel('all');
  }

  updateActiveUserUI();
  updateHomeHistorySummary();

  if (triggerSound) playSound('select');
  return true;
}

function updateActiveUserUI() {
  const u = state.activeUser;
  if (!u) return;

  // Header User Badge
  DOM.headerUserAvatar.textContent = u.avatar || '👤';
  DOM.headerUserName.textContent = u.name;
  DOM.headerUserRole.textContent = u.role;

  // Setup Strip
  DOM.stripUserAvatar.textContent = u.avatar || '👤';
  DOM.stripUserName.textContent = u.name;
  DOM.stripUserRole.textContent = u.role;
  DOM.stripUserId.textContent = `ID: ${u.id}`;

  // Exam Top Bar
  DOM.examDisplayAvatar.textContent = u.avatar || '👤';
  DOM.examDisplayName.textContent = u.name;
  DOM.examDisplayRole.textContent = u.role;

  // Dashboard Header
  DOM.dbActiveAvatar.textContent = u.avatar || '👤';
  DOM.dbActiveUsername.textContent = u.name;
  DOM.dbActiveRoleTag.textContent = `Exam Track: ${u.role} • User ID: ${u.id}`;

  DOM.homeUserHistoryTitle.textContent = `${u.name}-এর পূর্বের পরীক্ষার রেকর্ড`;
}

function setLevel(levelKey) {
  state.targetLevel = levelKey;
  DOM.levelCards.forEach(card => {
    if (card.dataset.level === levelKey) {
      card.classList.add('selected');
      const radio = card.querySelector('input');
      if (radio) radio.checked = true;
    } else {
      card.classList.remove('selected');
    }
  });
}

// Migrate any legacy data from before multi-user was added
function migrateLegacyDatabaseIfNeeded() {
  const legacy = localStorage.getItem(STORAGE_LEGACY_DB);
  if (legacy) {
    try {
      const records = JSON.parse(legacy);
      if (Array.isArray(records) && records.length > 0) {
        const mugdhoKey = `EXAM_HISTORY_mugdho`;
        const existing = localStorage.getItem(mugdhoKey);
        if (!existing) {
          localStorage.setItem(mugdhoKey, JSON.stringify(records));
        }
      }
      localStorage.removeItem(STORAGE_LEGACY_DB);
    } catch (e) {
      console.warn("Could not migrate legacy DB", e);
    }
  }
}

function loadSettings() {
  const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
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
    soundEnabled: state.soundEnabled
  };
  localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
}

function updateSoundUI() {
  DOM.soundIcon.textContent = state.soundEnabled ? '🔊' : '🔇';
  DOM.soundToggleBtn.title = state.soundEnabled ? 'Mute Sound' : 'Enable Sound';
}

function updateTimePreviews() {
  const q = state.questionCount;
  DOM.standardTimePreview.textContent = `${q} মিনিট (${q} mins)`;
  DOM.speedTimePreview.textContent = `${Math.ceil(q / 2)} মিনিট (${Math.ceil(q / 2)} mins)`;
}

// Update quick history summary on home card
function updateHomeHistorySummary() {
  const db = getUserExamDatabase(state.activeUser.id);
  if (db.length === 0) {
    DOM.homeHistorySummary.textContent = `${state.activeUser.name} এখনো কোনো পরীক্ষা দেয়নি। প্রথম পরীক্ষা শুরু করো!`;
  } else {
    const last = db[db.length - 1];
    DOM.homeHistorySummary.textContent = `সর্বশেষ পরীক্ষা #${last.serial}: ${last.score}/${last.totalQuestions} (${last.percentage}%) • তারিখ: ${last.date}`;
  }
}

// ====================================================
// SCREEN NAVIGATION
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
// USER SWITCHER & LOGIN MODAL
// ====================================================
function openUserModal() {
  renderUserCardsInModal();
  DOM.createUserForm.classList.add('hidden');
  DOM.btnToggleCreateUser.textContent = '➕ নতুন ইউজার আইডি তৈরি করুন (Create New User)';
  DOM.userModal.classList.remove('hidden');
  playSound('click');
}

function closeUserModal() {
  DOM.userModal.classList.add('hidden');
}

function renderUserCardsInModal() {
  const users = getUsersRegistry();
  DOM.modalUserCardsGrid.innerHTML = '';

  users.forEach(u => {
    const card = document.createElement('div');
    card.className = 'user-card-item';
    if (state.activeUser && state.activeUser.id === u.id) {
      card.classList.add('active-user');
    }

    card.innerHTML = `
      <span class="uc-avatar">${u.avatar || '👤'}</span>
      <div>
        <strong class="uc-name">${escapeHtml(u.name)}</strong>
        <span class="uc-role">${escapeHtml(u.role)}</span>
        <small style="color:var(--text-muted); font-size:0.7rem; font-weight:700;">ID: ${escapeHtml(u.id)}</small>
      </div>
    `;

    card.addEventListener('click', () => {
      setActiveUser(u.id);
      closeUserModal();
      if (DOM.screenDashboard.classList.contains('active-screen')) {
        renderDashboard();
      }
    });

    DOM.modalUserCardsGrid.appendChild(card);
  });
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

  // User Switcher Openers
  DOM.headerUserBtn.addEventListener('click', openUserModal);
  DOM.btnSwitchUserStrip.addEventListener('click', openUserModal);
  DOM.btnDbSwitchUser.addEventListener('click', openUserModal);
  DOM.userModalClose.addEventListener('click', closeUserModal);

  // Direct User ID Form Login
  DOM.directLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const idTyped = DOM.directUserIdInput.value.trim().toLowerCase();
    if (!idTyped) return;

    const users = getUsersRegistry();
    const found = users.find(u => u.id.toLowerCase() === idTyped);

    if (found) {
      setActiveUser(found.id);
      DOM.directUserIdInput.value = '';
      closeUserModal();
      if (DOM.screenDashboard.classList.contains('active-screen')) {
        renderDashboard();
      }
    } else {
      playSound('warning');
      alert(`⚠️ '${idTyped}' নামের কোনো ইউজার আইডি পাওয়া যায়নি! দয়া করে সঠিক আইডি দিন বা নিচে নতুন ইউজার তৈরি করুন।`);
    }
  });

  // Toggle Create User Form
  DOM.btnToggleCreateUser.addEventListener('click', () => {
    const isHidden = DOM.createUserForm.classList.contains('hidden');
    if (isHidden) {
      DOM.createUserForm.classList.remove('hidden');
      DOM.btnToggleCreateUser.textContent = '❌ ফরম বন্ধ করুন';
      DOM.newUserName.focus();
    } else {
      DOM.createUserForm.classList.add('hidden');
      DOM.btnToggleCreateUser.textContent = '➕ নতুন ইউজার আইডি তৈরি করুন (Create New User)';
    }
    playSound('click');
  });

  // Create User Form Submit
  DOM.createUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = DOM.newUserName.value.trim();
    const id = DOM.newUserId.value.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '');
    const role = DOM.newUserRole.value;

    if (!name || !id) {
      alert('দয়া করে নাম ও ইউজার আইডি লিখুন!');
      return;
    }

    const users = getUsersRegistry();
    if (users.some(u => u.id === id)) {
      alert(`⚠️ '${id}' ইউজার আইডিটি ইতিমধ্যে ব্যবহার করা হয়েছে! অন্য আইডি দিন।`);
      return;
    }

    // Determine avatar & level
    let avatar = '👤';
    let level = 'all';
    if (role.includes('SSC')) { avatar = '🧑‍🎓'; level = 'ssc'; }
    else if (role.includes('BCS') || role.includes('Job')) { avatar = '👨‍💼'; level = 'bcs'; }
    else if (role.includes('Class Four') || role.includes('Class Two') || role.includes('Primary')) { avatar = '👦'; level = 'class4'; }

    const newUser = { id, name, role, level, avatar };
    users.push(newUser);
    saveUsersRegistry(users);

    DOM.newUserName.value = '';
    DOM.newUserId.value = '';
    DOM.createUserForm.classList.add('hidden');

    setActiveUser(id);
    closeUserModal();
    alert(`🎉 অভিনন্দন! '${name}' (ID: ${id}) সফলভাবে তৈরি ও লগইন হয়েছে।`);
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

  // Target Level Card Selection
  DOM.levelCards.forEach(card => {
    card.addEventListener('click', () => {
      DOM.levelCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const radio = card.querySelector('input');
      radio.checked = true;
      state.targetLevel = card.dataset.level;
      playSound('click');
    });
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

  // Dashboard Tabs (My Records vs Family Leaderboard)
  DOM.dashboardTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      DOM.dashboardTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tabTarget = tab.dataset.dtab;

      if (tabTarget === 'my-history') {
        DOM.tabMyHistory.classList.add('active-pane');
        DOM.tabLeaderboard.classList.remove('active-pane');
        DOM.dbTotalTests.parentElement.parentElement.style.display = 'grid';
      } else {
        DOM.tabMyHistory.classList.remove('active-pane');
        DOM.tabLeaderboard.classList.add('active-pane');
        renderFamilyLeaderboard();
      }
      playSound('click');
    });
  });

  // Clear Database (Personal)
  DOM.btnClearDb.addEventListener('click', () => {
    showModal({
      title: `${state.activeUser.name}-এর রেকর্ড মুছে ফেলবেন?`,
      message: `শুধুমাত্র ${state.activeUser.name}-এর সংরক্ষিত সব পরীক্ষার তথ্য মুছে যাবে। অন্য সদস্যদের কোনো তথ্য মুছবে না। আপনি কি নিশ্চিত?`,
      onConfirm: () => {
        clearUserExamDatabase(state.activeUser.id);
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

  // Filter pool by Target Level
  let pool = [...rawQuestions];
  if (state.targetLevel && state.targetLevel !== 'all') {
    const levelFiltered = pool.filter(q => q.level === state.targetLevel);
    if (levelFiltered.length >= 10) {
      pool = levelFiltered;
    }
  }

  // Filter pool by Mode
  if (state.examMode === 'assertive_to_interrogative') {
    pool = pool.filter(q => q.type === 'assertive_to_interrogative');
  } else if (state.examMode === 'interrogative_to_assertive') {
    pool = pool.filter(q => q.type === 'interrogative_to_assertive');
  } else {
    // Mixed: balance both types
    const p1 = shuffleArray([...pool.filter(q => q.type === 'assertive_to_interrogative')]);
    const p2 = shuffleArray([...pool.filter(q => q.type === 'interrogative_to_assertive')]);
    pool = [];
    const maxLen = Math.max(p1.length, p2.length);
    for (let i = 0; i < maxLen; i++) {
      if (p1[i]) pool.push(p1[i]);
      if (p2[i]) pool.push(p2[i]);
    }
  }

  // If pool has fewer items than requested, reuse with shuffle
  if (pool.length < state.questionCount) {
    const originalLen = pool.length;
    let extra = shuffleArray([...rawQuestions]);
    for (let q of extra) {
      if (pool.length >= state.questionCount) break;
      if (!pool.some(x => x.sentence === q.sentence)) {
        pool.push(q);
      }
    }
  }

  pool = shuffleArray(pool);
  const targetCount = Math.min(state.questionCount, pool.length);
  const selectedQuestions = pool.slice(0, targetCount);

  // Shuffle options per question
  state.activeQuestions = selectedQuestions.map((q, qIndex) => {
    const originalOptions = q.options.map((optText, origIdx) => ({
      text: optText,
      isCorrect: origIdx === q.answer
    }));

    const shuffledOptions = shuffleArray(originalOptions);
    const newCorrectIdx = shuffledOptions.findIndex(o => o.isCorrect);

    return {
      id: qIndex + 1,
      level: q.level || 'all',
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
  updateActiveUserUI();
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
    let minutesAllotted = questionCount;
    if (state.timerMode === 'speed') {
      minutesAllotted = Math.ceil(questionCount / 2);
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

// Render active question
function renderActiveQuestion() {
  const q = state.activeQuestions[state.currentQuestionIndex];
  if (!q) return;

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

  // Level Badge
  if (q.level === 'bcs') {
    DOM.qLevelBadge.innerHTML = '<span>💼 BCS & Job Standard</span>';
  } else if (q.level === 'ssc') {
    DOM.qLevelBadge.innerHTML = '<span>🧑‍🎓 SSC Board Standard</span>';
  } else {
    DOM.qLevelBadge.innerHTML = '<span>👦 Class 2 - 4 Standard</span>';
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

  // Date & Time
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

  // User-specific database
  const userDb = getUserExamDatabase(state.activeUser.id);
  const nextSerial = userDb.length > 0 ? userDb[userDb.length - 1].serial + 1 : 1;

  let levelLabel = 'All Levels';
  if (state.targetLevel === 'ssc') levelLabel = 'SSC Exam';
  else if (state.targetLevel === 'bcs') levelLabel = 'BCS Exam';
  else if (state.targetLevel === 'class4') levelLabel = 'Class 2-4';

  const examRecord = {
    serial: nextSerial,
    userId: state.activeUser.id,
    studentName: state.activeUser.name,
    timestamp: now.getTime(),
    date: dateFormatted,
    time: timeFormatted,
    mode: formatModeName(state.examMode),
    level: levelLabel,
    totalQuestions: totalQuestions,
    score: correctCount,
    wrong: wrongCount,
    skipped: skippedCount,
    percentage: percentage,
    grade: grade,
    timeTaken: timeTakenFormatted
  };

  saveUserExamRecord(state.activeUser.id, examRecord);

  // Present Results
  displayResults({
    examRecord,
    detailedQuestions
  });

  if (percentage >= 50) {
    confetti.fire(3500);
  }

  showScreen('result');
}

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

  DOM.filterCntAll.textContent = detailedQuestions.length;
  DOM.filterCntWrong.textContent = examRecord.wrong;
  DOM.filterCntCorrect.textContent = examRecord.score;

  DOM.filterTabs.forEach(t => t.classList.remove('active'));
  DOM.filterTabs[0].classList.add('active');

  renderReviewCards(detailedQuestions, 'all');
}

function renderReviewCards(questions, filter) {
  DOM.reviewCardsContainer.innerHTML = '';

  const filtered = questions.filter(q => {
    if (filter === 'wrong') return !q.isCorrect && !q.isSkipped;
    if (filter === 'correct') return q.isCorrect;
    return true;
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
        <span class="q-no">প্রশ্ন #${q.id} • ${q.type === 'assertive_to_interrogative' ? 'Assertive ➔ Interrogative' : 'Interrogative ➔ Assertive'} • Level: ${q.level.toUpperCase()}</span>
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
// PER-USER DATABASE & DASHBOARD LOGIC
// ====================================================
function getUserDbKey(userId) {
  return `EXAM_HISTORY_${userId.toLowerCase()}`;
}

function getUserExamDatabase(userId) {
  const data = localStorage.getItem(getUserDbKey(userId));
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function saveUserExamRecord(userId, record) {
  const db = getUserExamDatabase(userId);
  db.push(record);
  localStorage.setItem(getUserDbKey(userId), JSON.stringify(db));
}

function clearUserExamDatabase(userId) {
  localStorage.removeItem(getUserDbKey(userId));
}

function renderDashboard() {
  updateActiveUserUI();
  const db = getUserExamDatabase(state.activeUser.id);

  if (db.length === 0) {
    DOM.dbEmptyState.classList.remove('hidden');
    DOM.historyTableBody.innerHTML = '';
    DOM.dbTotalTests.textContent = '0';
    DOM.dbBestScore.textContent = '--';
    DOM.dbAvgAccuracy.textContent = '--';
  } else {
    DOM.dbEmptyState.classList.add('hidden');
    DOM.dbTotalTests.textContent = db.length;

    let maxPct = 0;
    let totalPctSum = 0;

    db.forEach(item => {
      if (item.percentage > maxPct) maxPct = item.percentage;
      totalPctSum += item.percentage;
    });

    DOM.dbBestScore.textContent = `${maxPct}%`;
    DOM.dbAvgAccuracy.textContent = `${Math.round(totalPctSum / db.length)}%`;

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
        <td>${escapeHtml(record.mode)}</td>
        <td><span class="tag-level">${escapeHtml(record.level || 'All')}</span></td>
        <td>${record.totalQuestions} টি</td>
        <td><strong>${record.score} / ${record.totalQuestions}</strong></td>
        <td>${record.percentage}%</td>
        <td>${escapeHtml(record.timeTaken)}</td>
        <td><span class="grade-badge ${gradeClass}">${record.grade}</span></td>
      `;

      DOM.historyTableBody.appendChild(tr);
    });
  }

  // Also render Family Leaderboard
  renderFamilyLeaderboard();
}

function renderFamilyLeaderboard() {
  const users = getUsersRegistry();
  const leaderData = users.map(u => {
    const db = getUserExamDatabase(u.id);
    let best = 0;
    let sum = 0;
    let lastDate = 'কখনো দেয়নি';

    if (db.length > 0) {
      db.forEach(rec => {
        if (rec.percentage > best) best = rec.percentage;
        sum += rec.percentage;
      });
      const lastRec = db[db.length - 1];
      lastDate = `${lastRec.date} (${lastRec.score}/${lastRec.totalQuestions})`;
    }

    return {
      user: u,
      totalTests: db.length,
      bestScore: best,
      avgScore: db.length > 0 ? Math.round(sum / db.length) : 0,
      lastDate: lastDate
    };
  });

  // Sort by highest score, then total tests
  leaderData.sort((a, b) => b.bestScore - a.bestScore || b.totalTests - a.totalTests);

  DOM.leaderboardTableBody.innerHTML = '';

  leaderData.forEach((item, index) => {
    const tr = document.createElement('tr');
    const isCurrent = state.activeUser && state.activeUser.id === item.user.id;
    if (isCurrent) tr.style.background = '#f0fdf4';

    let medal = `#${index + 1}`;
    if (index === 0 && item.bestScore > 0) medal = '🥇 ১ম';
    else if (index === 1 && item.bestScore > 0) medal = '🥈 ২য়';
    else if (index === 2 && item.bestScore > 0) medal = '🥉 ৩য়';

    tr.innerHTML = `
      <td>
        <span style="font-size:1.2rem; margin-right:4px;">${item.user.avatar || '👤'}</span>
        <strong>${escapeHtml(item.user.name)}</strong>
        ${isCurrent ? '<small style="color:var(--success); font-weight:800;"> (তুমি)</small>' : ''}
        <br><small style="color:var(--text-muted);">${medal}</small>
      </td>
      <td><code>${escapeHtml(item.user.id)}</code></td>
      <td><span class="strip-role">${escapeHtml(item.user.role)}</span></td>
      <td><strong>${item.totalTests} টি</strong></td>
      <td><strong style="color:var(--primary); font-size:1.05rem;">${item.totalTests > 0 ? item.bestScore + '%' : '--'}</strong></td>
      <td>${item.totalTests > 0 ? item.avgScore + '%' : '--'}</td>
      <td><small>${escapeHtml(item.lastDate)}</small></td>
      <td>
        ${!isCurrent ? `
          <button type="button" class="pill-btn light small" onclick="switchUserFromLeaderboard('${item.user.id}')">
            লগইন ➔
          </button>
        ` : `
          <span style="color:var(--success); font-weight:800; font-size:0.8rem;">সক্রিয় ✓</span>
        `}
      </td>
    `;

    DOM.leaderboardTableBody.appendChild(tr);
  });
}

// Global hook for leaderboard switch button
window.switchUserFromLeaderboard = function(userId) {
  setActiveUser(userId);
  renderDashboard();
};

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
