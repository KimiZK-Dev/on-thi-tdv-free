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
      gain.gain.setValueAtTime(0.08, ctx.currentTime + (delay || 0));
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + (delay || 0) + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + (delay || 0));
      osc.stop(ctx.currentTime + (delay || 0) + duration);
    } catch (err) {}
  }

  function playCorrectSound() {
    playTone(523.25, 'sine', 0.12, 0);       // C5
    playTone(659.25, 'sine', 0.18, 0.08);    // E5
    playTone(783.99, 'triangle', 0.25, 0.16);// G5
  }

  function playWrongSound() {
    playTone(280, 'sawtooth', 0.15, 0);
    playTone(220, 'sawtooth', 0.22, 0.1);
  }

  function playClickSound() {
    playTone(440, 'sine', 0.04, 0);
  }

  function playCelebrationSound() {
    if (!soundEnabled) return;
    var notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach(function (f, idx) {
      playTone(f, 'triangle', 0.35, idx * 0.1);
    });
  }

  // Quản lý trạng thái hiện tại của phiên làm bài
  var currentState = {
    subjectId: null,
    activeTabId: 'ontap',
    activeTabIndex: 0,
    questions: [],
    originalQuestions: [],
    userAnswers: {},       // { [qIndex]: optIndex }
    bookmarked: {},        // { [qIndex]: true }
    isSubmitted: false,
    mode: 'study',         // 'study' (Luyện tập tức thì) | 'exam' (Thi thử tính giờ)
    filterView: 'all',     // 'all' | 'wrong' | 'correct'
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

  // Bộ lọc 3 tầng thông minh bám sát dữ liệu
  function getQuestionsForCategoryTab(subjectId, tabConfig, tabIndex, totalTabs) {
    var rawData = window.TDV_DATA ? window.TDV_DATA[subjectId] : null;
    if (!rawData) return [];

    var tabId = (tabConfig.id || '').toLowerCase();
    var aliases = (tabConfig.aliases || [tabId]).map(function (a) {
      return String(a).toLowerCase().trim();
    });

    // Tầng 1: Data dạng Object { de1: [...], de2: [...] }
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

    // Tầng 2: Lọc theo thuộc tính câu hỏi (tab, category, de, exam, part)
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

    // Tầng 3 (Fallback): Chia đều câu hỏi cho các tab Đề 1, Đề 2, Giữa kỳ
    if (!hasAnyTagInDataset) {
      var numExamTabs = Math.max(1, (totalTabs || 4) - 1);
      var chunkSize = Math.ceil(allQuestions.length / numExamTabs);
      var start = (tabIndex || 0) * chunkSize;
      var sliced = allQuestions.slice(start, start + chunkSize);
      return sliced.length > 0 ? sliced : allQuestions;
    }

    return matchedByTag;
  }

  // Lấy đầy đủ 100% nội dung câu hỏi & bài đọc hiểu
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
          item.passage || item.reading || item.readingText || item.groupText || item.context || '';
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
      questionText: String(questionText || '').trim()
    };
  }

  // Đồng hồ tính giờ cho Chế độ Thi thử
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

  // Quản lý lưu trữ trạng thái dở dang
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

  // Render Tabs danh mục
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

    // Scroll active tab into view
    var activeBtn = tabsContainer.querySelector('.tab-btn.active');
    if (activeBtn && typeof activeBtn.scrollIntoView === 'function') {
      try {
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } catch (e) {}
    }
  }

  // Cập nhật thanh tiến độ và thống kê nhanh
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

    // Mobile floating trigger
    var mobileProgress = document.getElementById('mobile-palette-progress');
    if (mobileProgress) {
      mobileProgress.textContent = answeredCount + '/' + total;
    }

    renderPalette();
  }

  // Render Bản đồ câu hỏi (Question Map / Palette)
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
          (isBookmarked ? '<span class="palette-bookmark-dot">★</span>' : '') +
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

  // Render toàn bộ danh sách câu hỏi
  function renderQuestions() {
    var container = document.getElementById('quiz-questions-container');
    var footer = document.getElementById('quiz-footer-actions');
    if (!container) return;

    var questions = currentState.questions;
    if (!questions || questions.length === 0) {
      container.innerHTML =
        '<div class="empty-quiz-state">' +
          '<div class="empty-icon">📭</div>' +
          '<h3>Chưa có câu hỏi nào trong phần này</h3>' +
          '<p>Hãy chọn một đề thi hoặc phần ôn tập khác từ danh sách bên trên.</p>' +
        '</div>';
      if (footer) footer.classList.add('hidden');
      return;
    }

    if (footer) footer.classList.remove('hidden');

    var allSubjectQuestions = getRawQuestionsList(currentState.subjectId);
    var html = '';
    var letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    for (var i = 0; i < questions.length; i++) {
      var q = questions[i];
      var fullContent = getFullReadingAndQuestion(q, allSubjectQuestions);
      var selectedAns = currentState.userAnswers[i];
      var isAnswered = selectedAns !== undefined;
      var isBookmarked = !!currentState.bookmarked[i];

      // Lọc hiển thị sau khi nộp bài
      if (currentState.isSubmitted && currentState.filterView !== 'all') {
        var isCorrect = selectedAns === q.answer;
        if (currentState.filterView === 'wrong' && isCorrect) continue;
        if (currentState.filterView === 'correct' && !isCorrect) continue;
      }

      var cardClasses = ['question-card'];
      if (isBookmarked) cardClasses.push('is-bookmarked');
      if (currentState.isSubmitted && isAnswered) {
        cardClasses.push(selectedAns === q.answer ? 'card-status-correct' : 'card-status-wrong');
      }

      html += '<div class="' + cardClasses.join(' ') + '" id="question-card-' + i + '" data-q-index="' + i + '">';

      // Header thẻ câu hỏi (Số thứ tự + Nút Bookmark + Tag)
      html +=
        '<div class="question-header-row">' +
          '<div class="question-number-badge">' +
            '<span>Câu ' + (i + 1) + '</span>' +
            '<span class="question-total-badge">/ ' + questions.length + '</span>' +
          '</div>' +
          '<div class="question-actions">' +
            (q.chapter ? '<span class="question-chapter-chip">' + escapeHtml(q.chapter) + '</span>' : '') +
            '<button type="button" class="btn-bookmark ' + (isBookmarked ? 'active' : '') + '" data-q-index="' + i + '" title="Đánh dấu câu hỏi cần xem lại">' +
              (isBookmarked ? '★ Đã đánh dấu' : '☆ Đánh dấu') +
            '</button>' +
          '</div>' +
        '</div>';

      // Bài đọc hiểu / Đoạn văn (Reading passage)
      if (fullContent.readingText !== '') {
        html +=
          '<div class="reading-passage-box">' +
            '<div class="reading-passage-header">' +
              '<span class="reading-icon">📖</span>' +
              '<span class="reading-passage-title">Đoạn văn đọc hiểu (Reading Passage)</span>' +
            '</div>' +
            '<div class="reading-passage-body">' + escapeHtml(fullContent.readingText) + '</div>' +
          '</div>';
      }

      // Nội dung câu hỏi
      html +=
        '<div class="question-title-text">' + escapeHtml(fullContent.questionText) + '</div>';

      // Danh sách lựa chọn đáp án
      html += '<div class="options-grid">';
      var options = q.options || q.choices || [];
      for (var optIdx = 0; optIdx < options.length; optIdx++) {
        var optClasses = ['option-item'];
        var isChecked = selectedAns === optIdx;

        // Trạng thái theo Mode
        if (currentState.mode === 'study') {
          if (isAnswered) {
            if (optIdx === q.answer) {
              optClasses.push('correct');
            } else if (isChecked && optIdx !== q.answer) {
              optClasses.push('wrong');
            }
          } else if (isChecked) {
            optClasses.push('selected');
          }
        } else {
          // Exam mode
          if (!currentState.isSubmitted) {
            if (isChecked) optClasses.push('selected');
          } else {
            if (optIdx === q.answer) {
              optClasses.push('correct');
            } else if (isChecked && optIdx !== q.answer) {
              optClasses.push('wrong');
            }
          }
        }

        var optLetter = letters[optIdx] || (optIdx + 1);

        html +=
          '<div class="' + optClasses.join(' ') + '" data-q-index="' + i + '" data-opt-index="' + optIdx + '">' +
            '<div class="option-letter">' + optLetter + '</div>' +
            '<div class="option-content">' + escapeHtml(options[optIdx]) + '</div>' +
            '<div class="option-indicator"></div>' +
          '</div>';
      }
      html += '</div>';

      // Giải thích đáp án (Hiển thị ngay ở Study mode khi đã chọn, hoặc ở Exam mode sau khi nộp)
      var showExplanation = (currentState.mode === 'study' && isAnswered) || currentState.isSubmitted;
      if (showExplanation && (q.explanation || q.answer !== undefined)) {
        var correctOptionText = (options[q.answer] !== undefined) ? options[q.answer] : '';
        html +=
          '<div class="explanation-box">' +
            '<div class="explanation-header">' +
              '<span class="explanation-badge">Đáp án đúng: ' + (letters[q.answer] || '') + '</span>' +
              '<span class="explanation-answer-text">' + escapeHtml(correctOptionText) + '</span>' +
            '</div>' +
            (q.explanation ? '<div class="explanation-detail">' + escapeHtml(q.explanation) + '</div>' : '') +
          '</div>';
      }

      html += '</div>';
    }

    container.innerHTML = html;

    // Gắn sự kiện chọn đáp án
    var optionNodes = container.querySelectorAll('.option-item');
    for (var k = 0; k < optionNodes.length; k++) {
      optionNodes[k].addEventListener('click', function () {
        var qIdx = parseInt(this.getAttribute('data-q-index'), 10);
        var optIdx = parseInt(this.getAttribute('data-opt-index'), 10);
        selectAnswer(qIdx, optIdx);
      });
    }

    // Gắn sự kiện Bookmark
    var bookmarkBtns = container.querySelectorAll('.btn-bookmark');
    for (var b = 0; b < bookmarkBtns.length; b++) {
      bookmarkBtns[b].addEventListener('click', function (e) {
        e.stopPropagation();
        var qIdx = parseInt(this.getAttribute('data-q-index'), 10);
        toggleBookmark(qIdx);
      });
    }

    updateProgressStats();
  }

  // Chọn đáp án
  function selectAnswer(qIndex, optIndex) {
    if (currentState.isSubmitted && currentState.mode === 'exam') return;

    var isFirstSelect = currentState.userAnswers[qIndex] === undefined;
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

    // Trong study mode, cần re-render thẻ câu hỏi đó để hiện đáp án đúng và giải thích
    if (currentState.mode === 'study') {
      renderSingleQuestionCard(qIndex);
      updateProgressStats();
    } else {
      // Exam mode: chỉ cập nhật UI chọn lựa nhanh chóng mà không re-render toàn bộ
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
      if (idx === optIndex) {
        options[i].classList.add('selected');
      } else {
        options[i].classList.remove('selected');
      }
    }
  }

  function renderSingleQuestionCard(qIndex) {
    var oldCard = document.getElementById('question-card-' + qIndex);
    if (!oldCard) {
      renderQuestions();
      return;
    }

    var q = currentState.questions[qIndex];
    var allSubjectQuestions = getRawQuestionsList(currentState.subjectId);
    var fullContent = getFullReadingAndQuestion(q, allSubjectQuestions);
    var selectedAns = currentState.userAnswers[qIndex];
    var isAnswered = selectedAns !== undefined;
    var isBookmarked = !!currentState.bookmarked[qIndex];
    var letters = ['A', 'B', 'C', 'D', 'E', 'F'];

    var cardClasses = ['question-card'];
    if (isBookmarked) cardClasses.push('is-bookmarked');
    if (isAnswered) {
      cardClasses.push(selectedAns === q.answer ? 'card-status-correct' : 'card-status-wrong');
    }

    var html =
      '<div class="question-header-row">' +
        '<div class="question-number-badge">' +
          '<span>Câu ' + (qIndex + 1) + '</span>' +
          '<span class="question-total-badge">/ ' + currentState.questions.length + '</span>' +
        '</div>' +
        '<div class="question-actions">' +
          (q.chapter ? '<span class="question-chapter-chip">' + escapeHtml(q.chapter) + '</span>' : '') +
          '<button type="button" class="btn-bookmark ' + (isBookmarked ? 'active' : '') + '" data-q-index="' + qIndex + '" title="Đánh dấu câu hỏi cần xem lại">' +
            (isBookmarked ? '★ Đã đánh dấu' : '☆ Đánh dấu') +
          '</button>' +
        '</div>' +
      '</div>';

    if (fullContent.readingText !== '') {
      html +=
        '<div class="reading-passage-box">' +
          '<div class="reading-passage-header">' +
            '<span class="reading-icon">📖</span>' +
            '<span class="reading-passage-title">Đoạn văn đọc hiểu (Reading Passage)</span>' +
          '</div>' +
          '<div class="reading-passage-body">' + escapeHtml(fullContent.readingText) + '</div>' +
        '</div>';
    }

    html += '<div class="question-title-text">' + escapeHtml(fullContent.questionText) + '</div>';

    html += '<div class="options-grid">';
    var options = q.options || q.choices || [];
    for (var optIdx = 0; optIdx < options.length; optIdx++) {
      var optClasses = ['option-item'];
      var isChecked = selectedAns === optIdx;

      if (isAnswered) {
        if (optIdx === q.answer) {
          optClasses.push('correct');
        } else if (isChecked && optIdx !== q.answer) {
          optClasses.push('wrong');
        }
      } else if (isChecked) {
        optClasses.push('selected');
      }

      var optLetter = letters[optIdx] || (optIdx + 1);

      html +=
        '<div class="' + optClasses.join(' ') + '" data-q-index="' + qIndex + '" data-opt-index="' + optIdx + '">' +
          '<div class="option-letter">' + optLetter + '</div>' +
          '<div class="option-content">' + escapeHtml(options[optIdx]) + '</div>' +
          '<div class="option-indicator"></div>' +
        '</div>';
    }
    html += '</div>';

    if (isAnswered && (q.explanation || q.answer !== undefined)) {
      var correctOptionText = (options[q.answer] !== undefined) ? options[q.answer] : '';
      html +=
        '<div class="explanation-box">' +
          '<div class="explanation-header">' +
            '<span class="explanation-badge">Đáp án đúng: ' + (letters[q.answer] || '') + '</span>' +
            '<span class="explanation-answer-text">' + escapeHtml(correctOptionText) + '</span>' +
          '</div>' +
          (q.explanation ? '<div class="explanation-detail">' + escapeHtml(q.explanation) + '</div>' : '') +
        '</div>';
    }

    oldCard.className = cardClasses.join(' ');
    oldCard.innerHTML = html;

    // Gắn lại sự kiện cho các lựa chọn mới tạo
    var newOptions = oldCard.querySelectorAll('.option-item');
    for (var k = 0; k < newOptions.length; k++) {
      newOptions[k].addEventListener('click', function () {
        var opt = parseInt(this.getAttribute('data-opt-index'), 10);
        selectAnswer(qIndex, opt);
      });
    }

    var newBookmark = oldCard.querySelector('.btn-bookmark');
    if (newBookmark) {
      newBookmark.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleBookmark(qIndex);
      });
    }
  }

  // Đánh dấu bookmark
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
      card.classList.toggle('is-bookmarked', !!currentState.bookmarked[qIndex]);
      var btn = card.querySelector('.btn-bookmark');
      if (btn) {
        btn.classList.toggle('active', !!currentState.bookmarked[qIndex]);
        btn.innerHTML = currentState.bookmarked[qIndex] ? '★ Đã đánh dấu' : '☆ Đánh dấu';
      }
    }

    renderPalette();
  }

  // Nộp bài thi
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

  // Modal kết quả thi cử chuyên nghiệp
  function showResultModal(score10, percent, correctCount, total, answeredCount, unansweredCount) {
    var modal = document.getElementById('result-modal');
    if (!modal) return;

    var badgeText = 'Hoàn thành bài thi';
    var badgeClass = 'rank-good';
    if (score10 >= 9.0) {
      badgeText = 'Xuất sắc! 🎉';
      badgeClass = 'rank-excellent';
    } else if (score10 >= 8.0) {
      badgeText = 'Giỏi! 🌟';
      badgeClass = 'rank-great';
    } else if (score10 >= 6.5) {
      badgeText = 'Khá 👍';
      badgeClass = 'rank-good';
    } else if (score10 >= 5.0) {
      badgeText = 'Trung bình / Đạt 📝';
      badgeClass = 'rank-pass';
    } else {
      badgeText = 'Cần ôn luyện thêm 💪';
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

    // Hiện filter bar câu hỏi sai/đúng trên trang
    var filterBar = document.getElementById('quiz-result-filter-bar');
    if (filterBar) filterBar.classList.remove('hidden');
  }

  function hideResultModal() {
    var modal = document.getElementById('result-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('active');
    }
  }

  // Làm lại từ đầu (Reset)
  function resetQuiz(silent) {
    if (!silent) {
      var confirmReset = window.confirm('Bạn có muốn làm lại từ đầu bộ câu hỏi này không?');
      if (!confirmReset) return;
    }

    playClickSound();
    clearProgress();
    currentState.userAnswers = {};
    currentState.bookmarked = {};
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

  // Đảo ngẫu nhiên câu hỏi
  function toggleShuffle() {
    playClickSound();
    currentState.isShuffled = !currentState.isShuffled;

    var btn = document.getElementById('btn-shuffle-questions');
    if (btn) btn.classList.toggle('active', currentState.isShuffled);

    if (currentState.isShuffled) {
      // Fisher-Yates shuffle
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
    currentState.isSubmitted = false;
    renderQuestions();
  }

  // Chuyển đổi giữa Chế độ Luyện tập (Study) & Thi thử (Exam)
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

  // Chuyển đổi tab đề / chuyên mục
  function switchCategoryTab(tabId, tabIndex) {
    var subjectConfig = window.TDV_CONFIG.getSubjectById(currentState.subjectId);
    if (!subjectConfig) return;

    var tabs = subjectConfig.tabs || window.TDV_CONFIG.DEFAULT_TABS;
    var targetTab = tabs[tabIndex] || tabs[0];

    currentState.activeTabId = tabId;
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

    // Khôi phục tiến độ đã lưu nếu có
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

  // Mở một môn học (100% Hoàn toàn miễn phí, không khóa, không điều kiện!)
  function openSubject(subjectId, initialTabId) {
    var subjectConfig = window.TDV_CONFIG.getSubjectById(subjectId);
    if (!subjectConfig) return;

    currentState.subjectId = subjectId;
    var tabs = subjectConfig.tabs || window.TDV_CONFIG.DEFAULT_TABS;
    var targetTabId = initialTabId || tabs[0].id;

    // Cập nhật giao diện Header môn học
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

  // Điều khiển Drawer bản đồ câu hỏi
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

  // Khởi tạo các sự kiện toàn cục của Quiz Engine
  function init() {
    var btnSubmit = document.getElementById('btn-submit-quiz');
    var btnReset = document.getElementById('btn-reset-quiz');
    var btnShuffle = document.getElementById('btn-shuffle-questions');

    if (btnSubmit) btnSubmit.addEventListener('click', submitQuiz);
    if (btnReset) btnReset.addEventListener('click', function () { resetQuiz(false); });
    if (btnShuffle) btnShuffle.addEventListener('click', toggleShuffle);

    // Mode Buttons
    var btnStudy = document.getElementById('btn-mode-study');
    var btnExam = document.getElementById('btn-mode-exam');
    if (btnStudy) btnStudy.addEventListener('click', function () { setQuizMode('study'); });
    if (btnExam) btnExam.addEventListener('click', function () { setQuizMode('exam'); });

    // Drawer Palette triggers
    var btnOpenPalette = document.getElementById('btn-open-palette');
    var btnClosePalette = document.getElementById('btn-close-palette');
    var paletteOverlay = document.getElementById('palette-overlay');
    var mobilePaletteBtn = document.getElementById('mobile-btn-palette');

    if (btnOpenPalette) btnOpenPalette.addEventListener('click', openPaletteDrawer);
    if (mobilePaletteBtn) mobilePaletteBtn.addEventListener('click', openPaletteDrawer);
    if (btnClosePalette) btnClosePalette.addEventListener('click', closePaletteDrawer);
    if (paletteOverlay) paletteOverlay.addEventListener('click', closePaletteDrawer);

    // Modal Results buttons
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

    // Result Filter Bar buttons
    var filterBtns = document.querySelectorAll('.result-filter-btn');
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var f = this.getAttribute('data-filter');
        currentState.filterView = f;
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        renderQuestions();
      });
    });

    // Sound toggle button
    var btnSoundToggle = document.getElementById('btn-sound-toggle');
    if (btnSoundToggle) {
      btnSoundToggle.textContent = soundEnabled ? '🔔 Âm thanh: Bật' : '🔕 Âm thanh: Tắt';
      btnSoundToggle.addEventListener('click', function () {
        soundEnabled = !soundEnabled;
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem('TDV_SOUND_ENABLED', soundEnabled ? 'true' : 'false');
          }
        } catch (e) {}
        btnSoundToggle.textContent = soundEnabled ? '🔔 Âm thanh: Bật' : '🔕 Âm thanh: Tắt';
        if (soundEnabled) playClickSound();
      });
    }

    // Hotkey navigation
    document.addEventListener('keydown', function (e) {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (document.getElementById('view-quiz').classList.contains('hidden')) return;

      // 1, 2, 3, 4 -> Chọn đáp án A, B, C, D cho câu hỏi đang focus
      if (['1', '2', '3', '4'].indexOf(e.key) !== -1) {
        var opt = parseInt(e.key, 10) - 1;
        var centerCard = findCenterQuestionCard();
        if (centerCard) {
          var qIndex = parseInt(centerCard.getAttribute('data-q-index'), 10);
          selectAnswer(qIndex, opt);
        }
      }
    });
  }

  function findCenterQuestionCard() {
    var cards = document.querySelectorAll('.question-card');
    var centerY = window.innerHeight / 2;
    var closestCard = null;
    var closestDistance = Infinity;

    for (var i = 0; i < cards.length; i++) {
      var rect = cards[i].getBoundingClientRect();
      var cardCenter = rect.top + rect.height / 2;
      var dist = Math.abs(cardCenter - centerY);
      if (dist < closestDistance) {
        closestDistance = dist;
        closestCard = cards[i];
      }
    }
    return closestCard;
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
    scrollToQuestion: scrollToQuestion,
    openPaletteDrawer: openPaletteDrawer,
    closePaletteDrawer: closePaletteDrawer
  };
})(window, document);
