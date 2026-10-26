(function (window, document) {
  'use strict';

  var soundEnabled = true;
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      soundEnabled = window.localStorage.getItem('TDV_SOUND_ENABLED') !== 'false';
    }
  } catch (e) {
    soundEnabled = true;
  }
  var audioCtx = null;

  function getAudioContext() {
    if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      try {
        var AudioCtx = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioCtx();
      } catch (e) {
        console.warn('AudioContext not supported');
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playTone(freq, type, duration, delay) {
    if (!soundEnabled) return;
    try {
      var ctx = getAudioContext();
      if (!ctx) return;
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = type || 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + (delay || 0));
      gain.gain.setValueAtTime(0.05, ctx.currentTime + (delay || 0));
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + (delay || 0) + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + (delay || 0));
      osc.stop(ctx.currentTime + (delay || 0) + duration);
    } catch (err) {}
  }

  function playCorrectSound() {
    playTone(523.25, 'sine', 0.1, 0);
    playTone(659.25, 'sine', 0.15, 0.08);
  }

  function playWrongSound() {
    playTone(280, 'sine', 0.12, 0);
    playTone(220, 'sine', 0.18, 0.08);
  }

  function playClickSound() {
    playTone(400, 'sine', 0.03, 0);
  }

  function playCelebrationSound() {
    if (!soundEnabled) return;
    var notes = [523.25, 659.25, 783.99];
    notes.forEach(function (f, idx) {
      playTone(f, 'sine', 0.25, idx * 0.1);
    });
  }

  // Icons SVG nội bộ không dùng emoji
  var SVG_ICONS = {
    bookmark: '<svg class="btn-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>',
    bookmarkFilled: '<svg class="btn-icon-svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>',
    book: '<svg class="reading-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>',
    inbox: '<svg class="empty-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>',
    bell: '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>',
    bellOff: '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.7 3A6 6 0 0 1 18 8a21.3 21.3 0 0 0 .6 5"></path><path d="M17 17H3s3-2 3-9a4.67 4.67 0 0 1 .3-1.7"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>',
    check: '<svg class="indicator-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    cross: '<svg class="indicator-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
    eye: '<svg class="btn-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path></svg>',
    chevronDown: '<svg class="btn-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',
    chevronUp: '<svg class="btn-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>'
  };

  // Quản lý trạng thái hiện tại của phiên làm bài
  var currentState = {
    subjectId: null,
    activeTabId: 'ontap',
    activeTabIndex: 0,
    questions: [],
    originalQuestions: [],
    userAnswers: {},       // { [qIndex]: optIndex }
    bookmarked: {},        // { [qIndex]: true }
    revealedAnswers: {},   // { [qIndex]: true } -> xem đáp án chủ động trong Study mode
    collapsedPassages: {}, // { [qIndex]: true } -> thu gọn bài đọc trên mobile
    isSubmitted: false,
    mode: 'study',         // 'study' | 'exam'
    filterView: 'all',     // 'all' | 'wrong' | 'correct' | 'skipped'
    timerSeconds: 0,
    timerInterval: null,
    isShuffled: false
  };

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // Chuẩn hóa loại bỏ chữ cái A., B., C., D. thừa ở đầu nội dung đáp án (chỉ khi là tiền tố trắc nghiệm)
  function cleanOptionText(text) {
    if (!text) return '';
    return String(text).replace(/^[A-Fa-f][\.\:\)\-\/]+\s*/, '').trim();
  }

  // Chuẩn hóa loại bỏ chữ "Câu 1:" hoặc số ở đầu câu hỏi nếu đã có nhãn
  function cleanQuestionText(text) {
    if (!text) return '';
    return String(text).replace(/^(Câu\s*\d+[\.\:\s]*|Question\s*\d+[\.\:\s]*|\d+[\.\:\)\s]+)/i, '').trim();
  }

  function getRawQuestionsList(subjectId) {
    var raw = window.TDV_DATA ? window.TDV_DATA[subjectId] : null;
    if (!raw) return [];
    if (Array.isArray(raw)) return raw;

    var combined = [];
    for (var key in raw) {
      if (Object.prototype.hasOwnProperty.call(raw, key) && Array.isArray(raw[key])) {
        combined = combined.concat(raw[key]);
      }
    }
    return combined;
  }

  function getTotalQuestionCountForSubject(subjectId) {
    return getRawQuestionsList(subjectId).length;
  }

  function getQuestionsForCategoryTab(subjectId, tabConfig, tabIndex, totalTabs) {
    var rawData = window.TDV_DATA ? window.TDV_DATA[subjectId] : null;
    if (!rawData) return [];

    var tabId = (tabConfig.id || '').toLowerCase();
    var aliases = (tabConfig.aliases || [tabId]).map(function (a) {
      return String(a).toLowerCase().trim();
    });

    if (!Array.isArray(rawData) && typeof rawData === 'object') {
      if (tabId === 'ontap') {
        return getRawQuestionsList(subjectId);
      }
      for (var key in rawData) {
        if (Object.prototype.hasOwnProperty.call(rawData, key)) {
          if (aliases.indexOf(key.toLowerCase().trim()) !== -1 && Array.isArray(rawData[key])) {
            return rawData[key];
          }
        }
      }
    }

    var allQuestions = getRawQuestionsList(subjectId);
    if (allQuestions.length === 0) return [];

    if (tabId === 'ontap') {
      return allQuestions;
    }

    var matchedByTag = [];
    var hasAnyTagInDataset = false;

    for (var i = 0; i < allQuestions.length; i++) {
      var q = allQuestions[i];
      var qTag = q.tab || q.category || q.de || q.exam || q.part || '';
      if (qTag !== '') {
        hasAnyTagInDataset = true;
        var normalizedTag = String(qTag).toLowerCase().trim();
        if (aliases.indexOf(normalizedTag) !== -1) {
          matchedByTag.push(q);
        }
      }
    }

    if (matchedByTag.length > 0) {
      return matchedByTag;
    }

    if (!hasAnyTagInDataset) {
      var numExamTabs = Math.max(1, (totalTabs || 4) - 1);
      var chunkSize = Math.ceil(allQuestions.length / numExamTabs);
      var start = (tabIndex || 0) * chunkSize;
      var sliced = allQuestions.slice(start, start + chunkSize);
      return sliced.length > 0 ? sliced : allQuestions;
    }

    return matchedByTag;
  }

  function getFullReadingAndQuestion(questionObj, allQuestionsInSubject) {
    if (!questionObj) {
      return { readingText: '', questionText: '' };
    }

    var reading =
      questionObj.readingPassage ||
      questionObj.passage ||
      questionObj.reading ||
      questionObj.readingText ||
      questionObj.groupText ||
      questionObj.context ||
      questionObj.paragraph ||
      '';

    var groupKey = questionObj.passageId || questionObj.groupId || questionObj.readingId;
    if (!reading && groupKey && Array.isArray(allQuestionsInSubject)) {
      for (var i = 0; i < allQuestionsInSubject.length; i++) {
        var item = allQuestionsInSubject[i];
        var itemKey = item.passageId || item.groupId || item.readingId;
        var candidateText =
          item.readingPassage || item.passage || item.reading || item.readingText || item.groupText || item.context || '';
        if (itemKey === groupKey && candidateText) {
          reading = candidateText;
          break;
        }
      }
    }

    var questionText =
      questionObj.question || questionObj.text || questionObj.title || questionObj.q || 'Câu hỏi';

    return {
      readingText: String(reading || '').trim(),
      questionText: cleanQuestionText(String(questionText || '').trim())
    };
  }

  function startTimer() {
    stopTimer();
    currentState.timerSeconds = 0;
    updateTimerDisplay();
    currentState.timerInterval = setInterval(function () {
      currentState.timerSeconds++;
      updateTimerDisplay();
    }, 1000);
  }

  function stopTimer() {
    if (currentState.timerInterval) {
      clearInterval(currentState.timerInterval);
      currentState.timerInterval = null;
    }
  }

  function formatTime(totalSec) {
    var m = Math.floor(totalSec / 60);
    var s = totalSec % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }

  function updateTimerDisplay() {
    var el = document.getElementById('quiz-timer');
    if (el) {
      el.textContent = formatTime(currentState.timerSeconds);
    }
  }

  function getStorageKey() {
    if (!currentState.subjectId) return null;
    return 'TDV_SESSION_' + currentState.subjectId + '_' + currentState.activeTabId;
  }

  function saveProgress() {
    var key = getStorageKey();
    if (!key) return;
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        var data = {
          answers: currentState.userAnswers,
          bookmarks: currentState.bookmarked,
          isSubmitted: currentState.isSubmitted,
          mode: currentState.mode,
          seconds: currentState.timerSeconds,
          updatedAt: Date.now()
        };
        window.localStorage.setItem(key, JSON.stringify(data));
      }
    } catch (e) {}
  }

  function loadProgress() {
    var key = getStorageKey();
    if (!key) return null;
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        var raw = window.localStorage.getItem(key);
        if (raw) return JSON.parse(raw);
      }
    } catch (e) {}
    return null;
  }

  function clearProgress() {
    var key = getStorageKey();
    if (key) {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.removeItem(key);
        }
      } catch (e) {}
    }
  }

  function renderTabs(subjectConfig) {
    var tabsContainer = document.getElementById('quiz-category-tabs');
    if (!tabsContainer) return;

    var tabs = subjectConfig.tabs || window.TDV_CONFIG.DEFAULT_TABS;
    var html = '';

    for (var i = 0; i < tabs.length; i++) {
      var t = tabs[i];
      var count = getQuestionsForCategoryTab(subjectConfig.id, t, i, tabs.length).length;
      if (count === 0) continue;
      var isActive = t.id === currentState.activeTabId;
      var activeClass = isActive ? 'tab-btn active' : 'tab-btn';

      html +=
        '<button type="button" class="' + activeClass + '" data-tab-id="' + t.id + '" data-tab-index="' + i + '" role="tab" aria-selected="' + (isActive ? 'true' : 'false') + '">' +
          '<span class="tab-label">' + escapeHtml(t.label) + '</span>' +
          '<span class="tab-count">' + count + '</span>' +
        '</button>';
    }

    tabsContainer.innerHTML = html;

    var buttons = tabsContainer.querySelectorAll('.tab-btn');
    for (var j = 0; j < buttons.length; j++) {
      buttons[j].addEventListener('click', function () {
        var tabId = this.getAttribute('data-tab-id');
        var tabIndex = parseInt(this.getAttribute('data-tab-index'), 10) || 0;
        playClickSound();
        switchCategoryTab(tabId, tabIndex);
      });
    }

    var activeBtn = tabsContainer.querySelector('.tab-btn.active');
    if (activeBtn && typeof activeBtn.scrollIntoView === 'function') {
      try {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } catch (e) {}
    }
  }

  function updateProgressStats() {
    var total = currentState.questions.length;
    var answeredCount = Object.keys(currentState.userAnswers).length;
    var percent = total > 0 ? Math.round((answeredCount / total) * 100) : 0;

    var progressFill = document.getElementById('quiz-progress-bar-fill');
    var progressText = document.getElementById('quiz-progress-text');
    var answeredCountEl = document.getElementById('quiz-answered-count');
    var totalCountEl = document.getElementById('quiz-total-count');

    if (progressFill) progressFill.style.width = percent + '%';
    if (progressText) progressText.textContent = percent + '%';
    if (answeredCountEl) answeredCountEl.textContent = answeredCount;
    if (totalCountEl) totalCountEl.textContent = total;

    var mobileProgress = document.getElementById('mobile-palette-progress');
    if (mobileProgress) {
      mobileProgress.textContent = answeredCount + '/' + total;
    }

    renderPalette();
  }

  function renderPalette() {
    var container = document.getElementById('question-palette-grid');
    if (!container) return;

    var total = currentState.questions.length;
    var html = '';

    for (var i = 0; i < total; i++) {
      var isAnswered = currentState.userAnswers[i] !== undefined;
      var isBookmarked = !!currentState.bookmarked[i];
      var statusClass = 'status-unanswered';

      if (currentState.isSubmitted || currentState.mode === 'study') {
        if (isAnswered) {
          var isCorrect = currentState.userAnswers[i] === currentState.questions[i].answer;
          statusClass = isCorrect ? 'status-correct' : 'status-wrong';
        }
      } else if (isAnswered) {
        statusClass = 'status-answered';
      }

      var bookmarkClass = isBookmarked ? ' has-bookmark' : '';

      html +=
        '<button type="button" class="palette-item ' + statusClass + bookmarkClass + '" data-q-index="' + i + '" title="Câu ' + (i + 1) + '">' +
          (i + 1) +
          (isBookmarked ? '<span class="palette-bookmark-indicator"></span>' : '') +
        '</button>';
    }

    container.innerHTML = html;

    var items = container.querySelectorAll('.palette-item');
    for (var j = 0; j < items.length; j++) {
      items[j].addEventListener('click', function () {
        var idx = parseInt(this.getAttribute('data-q-index'), 10);
        scrollToQuestion(idx);
        closePaletteDrawer();
      });
    }
  }

  function scrollToQuestion(idx) {
    var card = document.getElementById('question-card-' + idx);
    if (card) {
      if (typeof card.scrollIntoView === 'function') {
        try {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } catch (e) {}
      }
      card.classList.add('pulse-highlight');
      setTimeout(function () {
        card.classList.remove('pulse-highlight');
      }, 1200);
    }
  }

  // Chuyển nhanh giữa câu hỏi trước/sau trên điện thoại
  function findCenterQuestionIndex() {
    var cards = document.querySelectorAll('.question-card');
    if (cards.length === 0) return 0;
    var centerY = window.innerHeight / 2;
    var closestIdx = 0;
    var closestDist = Infinity;

    for (var i = 0; i < cards.length; i++) {
      var rect = cards[i].getBoundingClientRect();
      var cardCenter = rect.top + rect.height / 2;
      var dist = Math.abs(cardCenter - centerY);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = parseInt(cards[i].getAttribute('data-q-index'), 10) || 0;
      }
    }
    return closestIdx;
  }

  function goToNextQuestion() {
    playClickSound();
    var cur = findCenterQuestionIndex();
    var next = Math.min(currentState.questions.length - 1, cur + 1);
    scrollToQuestion(next);
  }

  function goToPrevQuestion() {
    playClickSound();
    var cur = findCenterQuestionIndex();
    var prev = Math.max(0, cur - 1);
    scrollToQuestion(prev);
  }

  // Toggled xem bài đọc trên mobile
  function togglePassageCollapse(qIndex) {
    currentState.collapsedPassages[qIndex] = !currentState.collapsedPassages[qIndex];
    var box = document.getElementById('reading-passage-' + qIndex);
    var btn = document.getElementById('btn-toggle-passage-' + qIndex);
    if (box) {
      box.classList.toggle('is-collapsed', !currentState.collapsedPassages[qIndex]);
    }
    if (btn) {
      btn.innerHTML = currentState.collapsedPassages[qIndex]
        ? SVG_ICONS.chevronUp + '<span>Thu gọn bài đọc</span>'
        : SVG_ICONS.chevronDown + '<span>Xem toàn bộ bài đọc</span>';
    }
  }

  // Toggle xem đáp án trong Study mode
  function toggleRevealAnswer(qIndex) {
    playClickSound();
    currentState.revealedAnswers[qIndex] = !currentState.revealedAnswers[qIndex];
    renderSingleQuestionCard(qIndex);
  }

  // Xây dựng HTML một thẻ câu hỏi hoàn chỉnh (Clean, Mobile First & Chuẩn đáp án)
  function buildQuestionCardHtml(i, q, allSubjectQuestions) {
    var fullContent = getFullReadingAndQuestion(q, allSubjectQuestions);
    var selectedAns = currentState.userAnswers[i];
    var isAnswered = selectedAns !== undefined;
    var isBookmarked = !!currentState.bookmarked[i];
    var isRevealed = !!currentState.revealedAnswers[i];
    var letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    // Lọc theo kết quả sau khi nộp bài
    if (currentState.isSubmitted && currentState.filterView !== 'all') {
      var isCorrect = selectedAns === q.answer;
      if (currentState.filterView === 'wrong' && (isCorrect || !isAnswered)) return '';
      if (currentState.filterView === 'correct' && !isCorrect) return '';
      if (currentState.filterView === 'skipped' && isAnswered) return '';
    }

    var cardClasses = ['question-card'];
    if (isBookmarked) cardClasses.push('is-bookmarked');
    if ((currentState.isSubmitted || (currentState.mode === 'study' && isAnswered)) && isAnswered) {
      cardClasses.push(selectedAns === q.answer ? 'card-status-correct' : 'card-status-wrong');
    }

    var html = '<div class="' + cardClasses.join(' ') + '" id="question-card-' + i + '" data-q-index="' + i + '">';

    // 1. Header hàng trên: Số thứ tự + Tag kỳ thi + Badge kết quả + Bookmark
    var resultBadgeHtml = '';
    var correctLetter = letters[q.answer] || '';
    if (currentState.isSubmitted) {
      if (!isAnswered) {
        resultBadgeHtml = '<span class="eval-tag eval-tag-skipped">Chưa trả lời</span>';
      } else if (selectedAns === q.answer) {
        resultBadgeHtml = '<span class="eval-tag eval-tag-correct">' + SVG_ICONS.check + ' Đúng (+1đ)</span>';
      } else {
        var chosenLetter = letters[selectedAns] || '';
        resultBadgeHtml = '<span class="eval-tag eval-tag-wrong">' + SVG_ICONS.cross + ' Sai (Chọn ' + chosenLetter + ' - Đáp án: ' + correctLetter + ')</span>';
      }
    } else if (currentState.mode === 'study') {
      if (isAnswered) {
        if (selectedAns === q.answer) {
          resultBadgeHtml = '<span class="eval-tag eval-tag-correct">' + SVG_ICONS.check + ' Chính xác</span>';
        } else {
          var chosenLetter = letters[selectedAns] || '';
          resultBadgeHtml = '<span class="eval-tag eval-tag-wrong">' + SVG_ICONS.cross + ' Chọn ' + chosenLetter + ' - Đáp án: ' + correctLetter + '</span>';
        }
      } else if (isRevealed) {
        resultBadgeHtml = '<span class="eval-tag eval-tag-revealed">' + SVG_ICONS.eye + ' Đáp án: ' + correctLetter + '</span>';
      }
    }

    var bookmarkIcon = isBookmarked ? SVG_ICONS.bookmarkFilled : SVG_ICONS.bookmark;

    // Nút Xem đáp án trực tiếp trong Study Mode
    var revealBtnHtml = '';
    if (currentState.mode === 'study' && !currentState.isSubmitted) {
      revealBtnHtml =
        '<button type="button" class="btn-peek-answer ' + (isRevealed ? 'active' : '') + '" data-q-index="' + i + '" title="Xem đáp án chuẩn">' +
          SVG_ICONS.eye +
          '<span>' + (isRevealed ? 'Ẩn đáp án' : 'Xem đáp án') + '</span>' +
        '</button>';
    }

    html +=
      '<div class="question-header-row">' +
        '<div class="question-number-group">' +
          '<span class="question-number-pill">Câu ' + (i + 1) + '</span>' +
          resultBadgeHtml +
        '</div>' +
        '<div class="question-actions">' +
          revealBtnHtml +
          '<button type="button" class="btn-bookmark ' + (isBookmarked ? 'active' : '') + '" data-q-index="' + i + '" title="Đánh dấu câu hỏi này">' +
            bookmarkIcon +
            '<span class="bookmark-label">' + (isBookmarked ? 'Đã lưu' : 'Đánh dấu') + '</span>' +
          '</button>' +
        '</div>' +
      '</div>';

    // 2. Bài đọc hiểu nếu có (Hỗ trợ thu gọn trên màn hình điện thoại)
    if (fullContent.readingText !== '') {
      var isLong = fullContent.readingText.length > 220;
      var isCollapsed = isLong && !currentState.collapsedPassages[i];

      html +=
        '<div class="reading-passage-box ' + (isCollapsed ? 'is-collapsed' : '') + '" id="reading-passage-' + i + '">' +
          '<div class="reading-passage-header">' +
            '<div class="reading-passage-title-group">' +
              SVG_ICONS.book +
              '<span class="reading-passage-title">Đoạn văn đọc hiểu</span>' +
            '</div>' +
            (isLong ?
              '<button type="button" class="btn-toggle-passage" id="btn-toggle-passage-' + i + '" data-q-index="' + i + '">' +
                (isCollapsed ? SVG_ICONS.chevronDown + '<span>Xem toàn bộ</span>' : SVG_ICONS.chevronUp + '<span>Thu gọn</span>') +
              '</button>'
              : '') +
          '</div>' +
          '<div class="reading-passage-body">' + escapeHtml(fullContent.readingText) + '</div>' +
        '</div>';
    }

    // 3. Nội dung câu hỏi (Đã chuẩn hóa, không lặp số câu)
    html += '<div class="question-title-text">' + escapeHtml(fullContent.questionText) + '</div>';

    // 4. Danh sách lựa chọn đáp án
    html += '<div class="options-grid">';
    var options = q.options || q.choices || [];
    var shouldShowAnswer = (currentState.mode === 'study' && (isAnswered || isRevealed)) || currentState.isSubmitted;

    for (var optIdx = 0; optIdx < options.length; optIdx++) {
      var optClasses = ['option-item'];
      var isChecked = selectedAns === optIdx;
      var isCorrectOpt = optIdx === q.answer;
      var indicatorContent = '';

      if (shouldShowAnswer) {
        if (isCorrectOpt) {
          optClasses.push('correct');
          indicatorContent = SVG_ICONS.check;
        } else if (isChecked && !isCorrectOpt) {
          optClasses.push('wrong');
          indicatorContent = SVG_ICONS.cross;
        }
      } else if (isChecked) {
        optClasses.push('selected');
        indicatorContent = '<div class="indicator-radio-dot"></div>';
      }

      var optLetter = letters[optIdx] || (optIdx + 1);
      var cleanedText = cleanOptionText(options[optIdx]);

      html +=
        '<div class="' + optClasses.join(' ') + '" data-q-index="' + i + '" data-opt-index="' + optIdx + '">' +
          '<div class="option-letter">' + optLetter + '</div>' +
          '<div class="option-content">' + escapeHtml(cleanedText) + '</div>' +
          '<div class="option-indicator">' + indicatorContent + '</div>' +
        '</div>';
    }
    html += '</div>';

    // 5. Khung giải thích & đáp án chuẩn
    if (shouldShowAnswer && (q.explanation || q.answer !== undefined)) {
      var correctText = cleanOptionText(options[q.answer] || '');
      html +=
        '<div class="explanation-box">' +
          '<div class="explanation-header">' +
            '<span class="explanation-badge">Đáp án đúng: ' + (letters[q.answer] || '') + '</span>' +
            '<span class="explanation-answer-text">' + escapeHtml(correctText) + '</span>' +
          '</div>' +
          (q.explanation ? '<div class="explanation-detail">' + escapeHtml(q.explanation) + '</div>' : '') +
        '</div>';
    }

    html += '</div>';
    return html;
  }

  function renderQuestions() {
    var container = document.getElementById('quiz-questions-container');
    var footer = document.getElementById('quiz-footer-actions');
    if (!container) return;

    var questions = currentState.questions;
    if (!questions || questions.length === 0) {
      container.innerHTML =
        '<div class="empty-quiz-state">' +
          '<div class="empty-icon-box">' + SVG_ICONS.inbox + '</div>' +
          '<h3>Chưa có câu hỏi nào trong phần này</h3>' +
          '<p>Hãy chọn một đề thi hoặc phần ôn tập khác từ danh sách bên trên.</p>' +
        '</div>';
      if (footer) footer.classList.add('hidden');
      return;
    }

    if (footer) footer.classList.remove('hidden');

    var allSubjectQuestions = getRawQuestionsList(currentState.subjectId);
    var html = '';

    for (var i = 0; i < questions.length; i++) {
      html += buildQuestionCardHtml(i, questions[i], allSubjectQuestions);
    }

    if (html.trim() === '') {
      html =
        '<div class="empty-quiz-state">' +
          '<div class="empty-icon-box">' + SVG_ICONS.inbox + '</div>' +
          '<h3>Không có câu hỏi nào khớp với bộ lọc</h3>' +
          '<button type="button" class="btn-clear-filter" onclick="window.TDV_QUIZ.setFilterView(\'all\')">Xem tất cả câu hỏi</button>' +
        '</div>';
    }

    container.innerHTML = html;
    attachQuestionCardListeners(container);
    updateProgressStats();
  }

  function renderSingleQuestionCard(qIndex) {
    var oldCard = document.getElementById('question-card-' + qIndex);
    if (!oldCard) {
      renderQuestions();
      return;
    }

    var allSubjectQuestions = getRawQuestionsList(currentState.subjectId);
    var q = currentState.questions[qIndex];
    var newCardHtml = buildQuestionCardHtml(qIndex, q, allSubjectQuestions);

    var temp = document.createElement('div');
    temp.innerHTML = newCardHtml;
    var newCard = temp.firstElementChild;

    if (newCard) {
      oldCard.replaceWith(newCard);
      attachSingleCardListeners(newCard, qIndex);
    }
  }

  function attachSingleCardListeners(card, qIndex) {
    var optionNodes = card.querySelectorAll('.option-item');
    for (var k = 0; k < optionNodes.length; k++) {
      optionNodes[k].addEventListener('click', function () {
        var opt = parseInt(this.getAttribute('data-opt-index'), 10);
        selectAnswer(qIndex, opt);
      });
    }

    var bookmarkBtn = card.querySelector('.btn-bookmark');
    if (bookmarkBtn) {
      bookmarkBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleBookmark(qIndex);
      });
    }

    var peekBtn = card.querySelector('.btn-peek-answer');
    if (peekBtn) {
      peekBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleRevealAnswer(qIndex);
      });
    }

    var passageToggleBtn = card.querySelector('.btn-toggle-passage');
    if (passageToggleBtn) {
      passageToggleBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        togglePassageCollapse(qIndex);
      });
    }
  }

  function attachQuestionCardListeners(container) {
    var cards = container.querySelectorAll('.question-card');
    for (var i = 0; i < cards.length; i++) {
      var qIdx = parseInt(cards[i].getAttribute('data-q-index'), 10);
      attachSingleCardListeners(cards[i], qIdx);
    }
  }

  function selectAnswer(qIndex, optIndex) {
    if (currentState.isSubmitted && currentState.mode === 'exam') return;

    currentState.userAnswers[qIndex] = optIndex;

    var q = currentState.questions[qIndex];
    if (q) {
      if (optIndex === q.answer) {
        playCorrectSound();
      } else {
        playWrongSound();
      }
    } else {
      playClickSound();
    }

    saveProgress();

    if (currentState.mode === 'study') {
      renderSingleQuestionCard(qIndex);
      updateProgressStats();
    } else {
      updateOptionSelectionInDOM(qIndex, optIndex);
      updateProgressStats();
    }
  }

  function updateOptionSelectionInDOM(qIndex, optIndex) {
    var card = document.getElementById('question-card-' + qIndex);
    if (!card) return;
    var options = card.querySelectorAll('.option-item');
    for (var i = 0; i < options.length; i++) {
      var idx = parseInt(options[i].getAttribute('data-opt-index'), 10);
      var ind = options[i].querySelector('.option-indicator');
      if (idx === optIndex) {
        options[i].classList.add('selected');
        if (ind) ind.innerHTML = '<div class="indicator-radio-dot"></div>';
      } else {
        options[i].classList.remove('selected');
        if (ind) ind.innerHTML = '';
      }
    }
  }

  function toggleBookmark(qIndex) {
    playClickSound();
    if (currentState.bookmarked[qIndex]) {
      delete currentState.bookmarked[qIndex];
    } else {
      currentState.bookmarked[qIndex] = true;
    }
    saveProgress();

    var card = document.getElementById('question-card-' + qIndex);
    if (card) {
      var isMarked = !!currentState.bookmarked[qIndex];
      card.classList.toggle('is-bookmarked', isMarked);
      var btn = card.querySelector('.btn-bookmark');
      if (btn) {
        btn.classList.toggle('active', isMarked);
        btn.innerHTML = (isMarked ? SVG_ICONS.bookmarkFilled : SVG_ICONS.bookmark) +
          '<span class="bookmark-label">' + (isMarked ? 'Đã lưu' : 'Đánh dấu') + '</span>';
      }
    }

    renderPalette();
  }

  function submitQuiz() {
    if (!currentState.questions || currentState.questions.length === 0) return;

    var total = currentState.questions.length;
    var answeredCount = Object.keys(currentState.userAnswers).length;
    var unansweredCount = total - answeredCount;

    if (!currentState.isSubmitted && unansweredCount > 0) {
      var confirmSubmit = window.confirm(
        'Bạn còn ' + unansweredCount + ' câu chưa trả lời. Bạn có chắc chắn muốn nộp bài ngay bây giờ?'
      );
      if (!confirmSubmit) return;
    }

    stopTimer();
    currentState.isSubmitted = true;
    saveProgress();

    var correctCount = 0;
    for (var i = 0; i < total; i++) {
      if (currentState.userAnswers[i] === currentState.questions[i].answer) {
        correctCount++;
      }
    }

    var score10 = Number(((correctCount / total) * 10).toFixed(2));
    var percent = Math.round((correctCount / total) * 100);

    playCelebrationSound();
    showResultModal(score10, percent, correctCount, total, answeredCount, unansweredCount);

    renderQuestions();
  }

  function showResultModal(score10, percent, correctCount, total, answeredCount, unansweredCount) {
    var modal = document.getElementById('result-modal');
    if (!modal) return;

    var badgeText = 'Hoàn thành bài thi';
    var badgeClass = 'rank-good';
    if (score10 >= 9.0) {
      badgeText = 'Xuất sắc';
      badgeClass = 'rank-excellent';
    } else if (score10 >= 8.0) {
      badgeText = 'Giỏi';
      badgeClass = 'rank-great';
    } else if (score10 >= 6.5) {
      badgeText = 'Khá';
      badgeClass = 'rank-good';
    } else if (score10 >= 5.0) {
      badgeText = 'Trung bình / Đạt';
      badgeClass = 'rank-pass';
    } else {
      badgeText = 'Cần ôn luyện thêm';
      badgeClass = 'rank-fail';
    }

    var scoreValEl = document.getElementById('modal-score-value');
    var scorePercentEl = document.getElementById('modal-score-percent');
    var rankEl = document.getElementById('modal-rank-badge');
    var correctEl = document.getElementById('modal-stat-correct');
    var wrongEl = document.getElementById('modal-stat-wrong');
    var skippedEl = document.getElementById('modal-stat-skipped');
    var timeEl = document.getElementById('modal-stat-time');

    if (scoreValEl) scoreValEl.textContent = score10;
    if (scorePercentEl) scorePercentEl.textContent = percent + '%';
    if (rankEl) {
      rankEl.textContent = badgeText;
      rankEl.className = 'modal-rank-badge ' + badgeClass;
    }
    if (correctEl) correctEl.textContent = correctCount;
    if (wrongEl) wrongEl.textContent = answeredCount - correctCount;
    if (skippedEl) skippedEl.textContent = unansweredCount;
    if (timeEl) timeEl.textContent = formatTime(currentState.timerSeconds);

    modal.classList.remove('hidden');
    modal.classList.add('active');

    var filterBar = document.getElementById('quiz-result-filter-bar');
    if (filterBar) {
      filterBar.classList.remove('hidden');
      var btnAll = document.getElementById('filter-btn-all');
      var btnWrong = document.getElementById('filter-btn-wrong');
      var btnCorrect = document.getElementById('filter-btn-correct');
      var btnSkipped = document.getElementById('filter-btn-skipped');

      var wrongCount = answeredCount - correctCount;
      if (btnAll) btnAll.textContent = 'Tất cả (' + total + ')';
      if (btnWrong) {
        btnWrong.innerHTML = SVG_ICONS.cross + '<span>Câu sai (' + wrongCount + ')</span>';
      }
      if (btnCorrect) {
        btnCorrect.innerHTML = SVG_ICONS.check + '<span>Câu đúng (' + correctCount + ')</span>';
      }
      if (btnSkipped) {
        btnSkipped.innerHTML = '<span class="status-dot"></span><span>Chưa làm (' + unansweredCount + ')</span>';
      }
    }
  }

  function hideResultModal() {
    var modal = document.getElementById('result-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('active');
    }
  }

  function setFilterView(filterType) {
    currentState.filterView = filterType;
    var filterBtns = document.querySelectorAll('.result-filter-btn');
    filterBtns.forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-filter') === filterType);
    });
    renderQuestions();
  }

  function resetQuiz(silent) {
    if (!silent) {
      var confirmReset = window.confirm('Bạn có muốn làm lại từ đầu bộ câu hỏi này không?');
      if (!confirmReset) return;
    }

    playClickSound();
    clearProgress();
    currentState.userAnswers = {};
    currentState.bookmarked = {};
    currentState.revealedAnswers = {};
    currentState.isSubmitted = false;
    currentState.filterView = 'all';

    hideResultModal();

    var filterBar = document.getElementById('quiz-result-filter-bar');
    if (filterBar) filterBar.classList.add('hidden');

    if (currentState.mode === 'exam') {
      startTimer();
    }

    renderQuestions();
    if (typeof window.scrollTo === 'function') {
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (e) {}
    }
  }

  function toggleShuffle() {
    playClickSound();
    currentState.isShuffled = !currentState.isShuffled;

    var btn = document.getElementById('btn-shuffle-questions');
    if (btn) btn.classList.toggle('active', currentState.isShuffled);

    if (currentState.isShuffled) {
      var arr = currentState.originalQuestions.slice();
      for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
      currentState.questions = arr;
    } else {
      currentState.questions = currentState.originalQuestions.slice();
    }

    currentState.userAnswers = {};
    currentState.bookmarked = {};
    currentState.revealedAnswers = {};
    currentState.isSubmitted = false;
    renderQuestions();
  }

  function setQuizMode(mode) {
    if (currentState.mode === mode) return;
    playClickSound();
    currentState.mode = mode;

    var btnStudy = document.getElementById('btn-mode-study');
    var btnExam = document.getElementById('btn-mode-exam');
    var timerContainer = document.getElementById('quiz-timer-container');

    if (btnStudy) btnStudy.classList.toggle('active', mode === 'study');
    if (btnExam) btnExam.classList.toggle('active', mode === 'exam');

    if (mode === 'exam') {
      if (timerContainer) timerContainer.classList.remove('hidden');
      if (!currentState.isSubmitted) startTimer();
    } else {
      if (timerContainer) timerContainer.classList.add('hidden');
      stopTimer();
    }

    renderQuestions();
  }

  function switchCategoryTab(tabId, tabIndex) {
    var subjectConfig = window.TDV_CONFIG.getSubjectById(currentState.subjectId);
    if (!subjectConfig) return;

    var tabs = subjectConfig.tabs || window.TDV_CONFIG.DEFAULT_TABS;
    var targetTab = null;
    if (typeof tabIndex === 'number' && tabs[tabIndex]) {
      targetTab = tabs[tabIndex];
    } else {
      for (var t = 0; t < tabs.length; t++) {
        if (tabs[t].id === tabId) {
          targetTab = tabs[t];
          tabIndex = t;
          break;
        }
      }
      if (!targetTab) {
        targetTab = tabs[0];
        tabIndex = 0;
      }
    }

    currentState.activeTabId = targetTab.id;
    currentState.activeTabIndex = tabIndex;
    currentState.filterView = 'all';

    var rawQuestions = getQuestionsForCategoryTab(
      subjectConfig.id,
      targetTab,
      tabIndex,
      tabs.length
    );

    currentState.originalQuestions = rawQuestions.slice();
    currentState.questions = rawQuestions.slice();

    var saved = loadProgress();
    if (saved && saved.answers) {
      currentState.userAnswers = saved.answers || {};
      currentState.bookmarked = saved.bookmarks || {};
      currentState.isSubmitted = !!saved.isSubmitted;
      currentState.timerSeconds = saved.seconds || 0;
    } else {
      currentState.userAnswers = {};
      currentState.bookmarked = {};
      currentState.isSubmitted = false;
      currentState.timerSeconds = 0;
    }

    currentState.revealedAnswers = {};

    hideResultModal();
    var filterBar = document.getElementById('quiz-result-filter-bar');
    if (filterBar) filterBar.classList.add('hidden');

    if (currentState.mode === 'exam' && !currentState.isSubmitted) {
      startTimer();
    } else {
      stopTimer();
    }

    renderTabs(subjectConfig);
    renderQuestions();
    if (typeof window.scrollTo === 'function') {
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (e) {}
    }
  }

  function openSubject(subjectId, initialTabId) {
    var subjectConfig = window.TDV_CONFIG.getSubjectById(subjectId);
    if (!subjectConfig) return;

    currentState.subjectId = subjectId;
    var tabs = subjectConfig.tabs || window.TDV_CONFIG.DEFAULT_TABS;
    var targetTabId = initialTabId || tabs[0].id;

    var titleEl = document.getElementById('quiz-subject-title');
    var codeEl = document.getElementById('quiz-subject-code');
    var descEl = document.getElementById('quiz-subject-desc');
    var badgePhaseEl = document.getElementById('quiz-subject-phase');

    if (titleEl) titleEl.textContent = subjectConfig.name;
    if (codeEl) codeEl.textContent = subjectConfig.code;
    if (descEl) descEl.textContent = subjectConfig.description || '';
    if (badgePhaseEl) {
      badgePhaseEl.textContent = subjectConfig.phase || 'Học phần';
      badgePhaseEl.className = 'badge-phase ' + (subjectConfig.phaseType === 'final' ? 'badge-final' : 'badge-midterm');
    }

    if (window.TDV_NAV) {
      window.TDV_NAV.switchView('view-quiz');
    }

    var targetIndex = 0;
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].id === targetTabId) {
        targetIndex = i;
        break;
      }
    }

    switchCategoryTab(targetTabId, targetIndex);
  }

  function openPaletteDrawer() {
    playClickSound();
    var drawer = document.getElementById('palette-drawer');
    var overlay = document.getElementById('palette-overlay');
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    renderPalette();
  }

  function closePaletteDrawer() {
    var drawer = document.getElementById('palette-drawer');
    var overlay = document.getElementById('palette-overlay');
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
  }

  function updateSoundButtonDisplay() {
    var btnSoundToggle = document.getElementById('btn-sound-toggle');
    if (!btnSoundToggle) return;
    var iconSlot = document.getElementById('sound-icon-slot');
    var textSlot = document.getElementById('sound-toggle-text');
    if (iconSlot) {
      iconSlot.innerHTML = soundEnabled ? SVG_ICONS.bell : SVG_ICONS.bellOff;
    }
    if (textSlot) {
      textSlot.textContent = soundEnabled ? 'Âm thanh: Bật' : 'Âm thanh: Tắt';
    }
  }

  function init() {
    var btnSubmit = document.getElementById('btn-submit-quiz');
    var btnReset = document.getElementById('btn-reset-quiz');
    var btnShuffle = document.getElementById('btn-shuffle-questions');

    if (btnSubmit) btnSubmit.addEventListener('click', submitQuiz);
    if (btnReset) btnReset.addEventListener('click', function () { resetQuiz(false); });
    if (btnShuffle) btnShuffle.addEventListener('click', toggleShuffle);

    var btnStudy = document.getElementById('btn-mode-study');
    var btnExam = document.getElementById('btn-mode-exam');
    if (btnStudy) btnStudy.addEventListener('click', function () { setQuizMode('study'); });
    if (btnExam) btnExam.addEventListener('click', function () { setQuizMode('exam'); });

    var btnOpenPalette = document.getElementById('btn-open-palette');
    var btnClosePalette = document.getElementById('btn-close-palette');
    var paletteOverlay = document.getElementById('palette-overlay');
    var mobilePaletteBtn = document.getElementById('mobile-btn-palette');
    var mobilePrevBtn = document.getElementById('mobile-btn-prev');
    var mobileNextBtn = document.getElementById('mobile-btn-next');
    var mobileSubmitBtn = document.getElementById('mobile-btn-submit');

    if (btnOpenPalette) btnOpenPalette.addEventListener('click', openPaletteDrawer);
    if (mobilePaletteBtn) mobilePaletteBtn.addEventListener('click', openPaletteDrawer);
    if (mobilePrevBtn) mobilePrevBtn.addEventListener('click', goToPrevQuestion);
    if (mobileNextBtn) mobileNextBtn.addEventListener('click', goToNextQuestion);
    if (mobileSubmitBtn) mobileSubmitBtn.addEventListener('click', submitQuiz);
    if (btnClosePalette) btnClosePalette.addEventListener('click', closePaletteDrawer);
    if (paletteOverlay) paletteOverlay.addEventListener('click', closePaletteDrawer);

    var btnModalClose = document.getElementById('btn-modal-close');
    var btnModalReview = document.getElementById('btn-modal-review');
    var btnModalRetry = document.getElementById('btn-modal-retry');
    var btnModalChange = document.getElementById('btn-modal-change');

    if (btnModalClose) btnModalClose.addEventListener('click', hideResultModal);
    if (btnModalReview) btnModalReview.addEventListener('click', function () {
      hideResultModal();
      if (typeof window.scrollTo === 'function') {
        try {
          window.scrollTo({ top: 300, behavior: 'smooth' });
        } catch (e) {}
      }
    });
    if (btnModalRetry) btnModalRetry.addEventListener('click', function () {
      resetQuiz(true);
    });
    if (btnModalChange) btnModalChange.addEventListener('click', function () {
      hideResultModal();
      if (window.TDV_NAV) window.TDV_NAV.goHome();
    });

    var filterBtns = document.querySelectorAll('.result-filter-btn');
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var f = this.getAttribute('data-filter');
        setFilterView(f);
      });
    });

    var btnSoundToggle = document.getElementById('btn-sound-toggle');
    if (btnSoundToggle) {
      updateSoundButtonDisplay();
      btnSoundToggle.addEventListener('click', function () {
        soundEnabled = !soundEnabled;
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem('TDV_SOUND_ENABLED', soundEnabled ? 'true' : 'false');
          }
        } catch (e) {}
        updateSoundButtonDisplay();
        if (soundEnabled) playClickSound();
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (document.getElementById('view-quiz').classList.contains('hidden')) return;

      if (['1', '2', '3', '4'].indexOf(e.key) !== -1) {
        var opt = parseInt(e.key, 10) - 1;
        var centerIdx = findCenterQuestionIndex();
        selectAnswer(centerIdx, opt);
      } else if (e.key === 'ArrowRight' || e.key === 'j') {
        goToNextQuestion();
      } else if (e.key === 'ArrowLeft' || e.key === 'k') {
        goToPrevQuestion();
      }
    });
  }

  window.TDV_QUIZ = {
    init: init,
    openSubject: openSubject,
    getQuestionsForCategoryTab: getQuestionsForCategoryTab,
    getFullReadingAndQuestion: getFullReadingAndQuestion,
    getTotalQuestionCountForSubject: getTotalQuestionCountForSubject,
    submitQuiz: submitQuiz,
    resetQuiz: resetQuiz,
    switchCategoryTab: switchCategoryTab,
    setQuizMode: setQuizMode,
    setFilterView: setFilterView,
    scrollToQuestion: scrollToQuestion,
    goToNextQuestion: goToNextQuestion,
    goToPrevQuestion: goToPrevQuestion,
    togglePassageCollapse: togglePassageCollapse,
    toggleRevealAnswer: toggleRevealAnswer,
    openPaletteDrawer: openPaletteDrawer,
    closePaletteDrawer: closePaletteDrawer
  };
})(window, document);
