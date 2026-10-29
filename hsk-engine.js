/**
 * ÔN THI TDV FREE - HSK CBT ENGINE (HSK 1 & HSK 2)
 * Chuẩn đề thi quốc tế Hanban CTI (HSK 1: H11001-H11010; HSK 2: H20901-H21338)
 * 100% Miễn phí & Mở toàn diện (Zero Paywall, Zero Locks, 0 Emoji)
 * Phát âm giọng Bắc Kinh chuẩn (zh-CN) qua Web Speech API
 * Thang điểm 200 Hanban (Nghe 100 + Đọc 100, Đạt >= 120 điểm)
 * Sổ tay tra cứu 920+ từ vựng & ngữ pháp cốt lõi
 */

(function (window, document) {
  'use strict';

  var SVG_ICONS = {
    check: '<svg class="ui-icon-status icon-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    cross: '<svg class="ui-icon-status icon-danger" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
    trophy: '<svg class="score-modal-icon icon-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.45 1-1 1H8c-.55 0-1 .45-1 1v1h10v-1c0-.55-.45-1-1-1h-1c-.55 0-1-.45-1-1v-2.34"></path><path d="M6 4h12a2 2 0 0 1 2 2v3c0 4.42-3.58 8-8 8s-8-3.58-8-8V6a2 2 0 0 1 2-2z"></path></svg>',
    target: '<svg class="score-modal-icon icon-warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>',
    volume: '<svg class="audio-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>',
    image: '<svg class="prompt-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',
    book: '<svg class="btn-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>',
    arrowRight: '<svg class="btn-arrow-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>'
  };

  var currentHskLevel = 'hsk1';
  var currentHandbookLevel = 'hsk1';
  var currentExamNumber = 1;
  var currentExamData = null;
  var currentQuestionIndex = 0;
  var userAnswers = {};
  var isSubmitted = false;
  var timerInterval = null;
  var remainingSeconds = 35 * 60;

  function isExamUnlocked() {
    return true; // 100% Free cho mọi đề thi
  }

  function isHskBlockedOnProduction() {
    return false; // Mở 100% không bảo trì
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  var HSKApp = {
    // === HSK 1 HUB ===
    openHsk1Hub: function () {
      if (window.TDV_NAV && typeof window.TDV_NAV.switchView === 'function') {
        window.TDV_NAV.switchView('hsk1-hub-view');
      } else {
        var hub1 = document.getElementById('hsk1-hub-view');
        if (hub1) hub1.classList.remove('hidden');
      }
      currentHskLevel = 'hsk1';
      this.renderHsk1ExamList();
      if (typeof window.scrollTo === 'function') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },

    closeHsk1Hub: function () {
      if (window.TDV_NAV && typeof window.TDV_NAV.goHome === 'function') {
        window.TDV_NAV.goHome();
      }
    },

    // === HSK 2 HUB ===
    openHsk2Hub: function () {
      if (window.TDV_NAV && typeof window.TDV_NAV.switchView === 'function') {
        window.TDV_NAV.switchView('hsk2-hub-view');
      } else {
        var hub2 = document.getElementById('hsk2-hub-view');
        if (hub2) hub2.classList.remove('hidden');
      }
      currentHskLevel = 'hsk2';
      this.renderHsk2ExamList();
      if (typeof window.scrollTo === 'function') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },

    closeHsk2Hub: function () {
      if (window.TDV_NAV && typeof window.TDV_NAV.goHome === 'function') {
        window.TDV_NAV.goHome();
      }
    },

    // RENDER HSK 1 EXAMS
    renderHsk1ExamList: function () {
      var listEl = document.getElementById('hsk1-exam-list');
      if (!listEl) return;

      var repo = window.HSK1_EXAM_REPOSITORY || {};
      var examsHtml = [];

      for (var i = 1; i <= 10; i++) {
        var codeNum = String(i).padStart(2, '0');
        var examCode = 'H110' + codeNum;
        var exam = repo[i] || { title: 'Đề thi chuẩn HSK 1 - Mã đề ' + examCode };

        var cardHtml = '<div class="hsk-exam-card">' +
          '<div class="hsk-exam-card-header">' +
            '<div class="hsk-exam-code-tag">' + examCode + '</div>' +
            '<span class="badge-free">Miễn phí 100%</span>' +
          '</div>' +
          '<div class="hsk-exam-card-body">' +
            '<h3 class="hsk-exam-title">Đề thi HSK 1 CBT – Số ' + codeNum + '</h3>' +
            '<div class="hsk-exam-meta">' +
              '<span>20 câu Nghe</span> &bull; <span>20 câu Đọc</span> &bull; <span>35 phút</span>' +
            '</div>' +
            '<p class="hsk-exam-desc">' +
              'Đề thi chuẩn Hanban CTI quốc tế mã ' + examCode + '. Tích hợp âm thanh phát âm Bắc Kinh, dịch nghĩa và giải thích chi tiết.' +
            '</p>' +
          '</div>' +
          '<div class="hsk-exam-card-footer">' +
            '<button type="button" class="btn-start-cbt" onclick="window.HSK_APP.startCbtExam(' + i + ', \'hsk1\')">' +
              '<span>Vào phòng thi CBT</span>' +
              SVG_ICONS.arrowRight +
            '</button>' +
          '</div>' +
        '</div>';

        examsHtml.push(cardHtml);
      }

      listEl.innerHTML = examsHtml.join('');
    },

    // RENDER HSK 2 EXAMS
    renderHsk2ExamList: function () {
      var listEl = document.getElementById('hsk2-exam-list');
      if (!listEl) return;

      var repo = window.HSK2_EXAM_REPOSITORY || {};
      var examsHtml = [];
      var hsk2Codes = ['H20901', 'H21335', 'H21006', 'H21329', 'H21330', 'H21331', 'H21332', 'H21334', 'H21336', 'H21338'];

      for (var i = 1; i <= 10; i++) {
        var codeNum = String(i).padStart(2, '0');
        var examCode = hsk2Codes[i - 1] || ('H21' + codeNum);
        var exam = repo[i] || { title: 'Đề thi chuẩn HSK 2 - Mã đề ' + examCode };

        var cardHtml = '<div class="hsk-exam-card">' +
          '<div class="hsk-exam-card-header">' +
            '<div class="hsk-exam-code-tag">' + examCode + '</div>' +
            '<span class="badge-free">Miễn phí 100%</span>' +
          '</div>' +
          '<div class="hsk-exam-card-body">' +
            '<h3 class="hsk-exam-title">Đề thi HSK 2 CBT – Số ' + codeNum + '</h3>' +
            '<div class="hsk-exam-meta">' +
              '<span>35 câu Nghe</span> &bull; <span>25 câu Đọc</span> &bull; <span>55 phút</span>' +
            '</div>' +
            '<p class="hsk-exam-desc">' +
              'Đề thi thực chiến chuẩn Hanban mã ' + examCode + ' (thang điểm 200, đạt >= 120 điểm). Bao hàm 770+ từ vựng và ngữ pháp HSK 2.' +
            '</p>' +
          '</div>' +
          '<div class="hsk-exam-card-footer">' +
            '<button type="button" class="btn-start-cbt" onclick="window.HSK_APP.startCbtExam(' + i + ', \'hsk2\')">' +
              '<span>Vào phòng thi CBT</span>' +
              SVG_ICONS.arrowRight +
            '</button>' +
          '</div>' +
        '</div>';

        examsHtml.push(cardHtml);
      }

      listEl.innerHTML = examsHtml.join('');
    },

    // -------------------------------------------------------------
    // KHỞI CHẠY PHÒNG THI CBT
    // -------------------------------------------------------------
    startCbtExam: function (examNumber, level) {
      var lvl = level || currentHskLevel || 'hsk1';
      currentHskLevel = lvl;
      var num = Number(examNumber) || 1;

      currentExamNumber = num;
      var repo = (lvl === 'hsk2') ? (window.HSK2_EXAM_REPOSITORY || {}) : (window.HSK1_EXAM_REPOSITORY || {});
      currentExamData = repo[num];

      if (!currentExamData || !currentExamData.questions) {
        return;
      }

      currentQuestionIndex = 0;
      userAnswers = {};
      isSubmitted = false;

      var duration = currentExamData.durationMinutes || (lvl === 'hsk2' ? 55 : 35);
      remainingSeconds = duration * 60;

      var examRoom = document.getElementById('cbt-exam-room');
      if (examRoom) examRoom.classList.remove('hidden');

      var examNameEl = document.getElementById('cbt-exam-name');
      if (examNameEl) {
        var levelText = (lvl === 'hsk2') ? 'HSK 2' : 'HSK 1';
        examNameEl.textContent = 'Phòng thi ' + levelText + ' CBT – Đề ' + String(num).padStart(2, '0') + ' (' + (currentExamData.examCode || '') + ')';
      }

      var scorePopup = document.getElementById('cbt-score-popup');
      if (scorePopup) scorePopup.remove();

      this.renderPalette();
      this.loadQuestion(0);
      this.startCountdown();

      if (typeof window.scrollTo === 'function') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },

    exitCbtExam: function () {
      this.stopCurrentAudio();
      clearInterval(timerInterval);
      var examRoom = document.getElementById('cbt-exam-room');
      if (examRoom) examRoom.classList.add('hidden');
    },

    startCountdown: function () {
      var self = this;
      clearInterval(timerInterval);
      var el = document.getElementById('cbt-countdown');
      var updateDisplay = function () {
        if (!el) return;
        var m = String(Math.floor(remainingSeconds / 60)).padStart(2, '0');
        var s = String(remainingSeconds % 60).padStart(2, '0');
        el.textContent = m + ':' + s;
      };
      updateDisplay();

      timerInterval = setInterval(function () {
        if (remainingSeconds > 0) {
          remainingSeconds--;
          updateDisplay();
        } else {
          clearInterval(timerInterval);
          self.submitCbtExam();
        }
      }, 1000);
    },

    // Phát âm giọng Bắc Kinh (zh-CN) chuẩn quốc tế
    playCurrentQuestionAudio: function (repeatCount) {
      if (!currentExamData || !currentExamData.questions) return;
      var q = currentExamData.questions[currentQuestionIndex];
      if (!q) return;

      var count = repeatCount !== undefined ? Number(repeatCount) : (q.section === 'listening' ? 2 : 1);
      var audioText = q.audioText || q.hanzi || q.questionText || '';
      if (!audioText) return;

      var statusEl = document.getElementById('audio-playing-indicator');
      var playBtn = document.getElementById('btn-play-cbt-audio');
      if (playBtn) playBtn.classList.add('is-playing');

      if (window.TDV_TTS && typeof window.TDV_TTS.speak === 'function') {
        window.TDV_TTS.speak(audioText, {
          lang: 'zh-CN',
          repeat: count,
          pauseMs: 2000,
          onProgress: function (iter, total, msg) {
            if (statusEl) statusEl.textContent = msg;
          },
          onEnd: function () {
            if (playBtn) playBtn.classList.remove('is-playing');
            if (statusEl) statusEl.textContent = 'Đã phát xong ' + (count > 1 ? count + ' lần' : '') + ' (Bấm nút để nghe lại)';
          },
          onError: function (err) {
            if (playBtn) playBtn.classList.remove('is-playing');
            if (statusEl) statusEl.textContent = 'Lỗi phát âm: ' + (err && err.message ? err.message : 'Không thể phát');
          }
        });
      } else if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        var utter = new SpeechSynthesisUtterance(audioText);
        utter.lang = 'zh-CN';
        window.speechSynthesis.speak(utter);
      }
    },

    stopCurrentAudio: function () {
      if (window.TDV_TTS && typeof window.TDV_TTS.stop === 'function') {
        window.TDV_TTS.stop();
      }
      if (window.speechSynthesis) {
        try { window.speechSynthesis.cancel(); } catch (e) {}
      }
      var playBtn = document.getElementById('btn-play-cbt-audio');
      if (playBtn) playBtn.classList.remove('is-playing');
      var statusEl = document.getElementById('audio-playing-indicator');
      if (statusEl) statusEl.textContent = 'Đã dừng phát âm';
    },

    loadQuestion: function (index) {
      if (!currentExamData || !currentExamData.questions) return;
      var questions = currentExamData.questions;
      if (!questions.length) return;
      currentQuestionIndex = index;
      var q = questions[index];

      var listeningTotal = currentExamData.listeningCount || (currentHskLevel === 'hsk2' ? 35 : 20);
      var readingTotal = currentExamData.readingCount || (currentHskLevel === 'hsk2' ? 25 : 20);

      // Cập nhật tiêu đề phần thi
      var bannerEl = document.getElementById('cbt-part-banner');
      if (bannerEl) {
        var partName = q.section === 'listening' 
          ? '一、听力 (Phần Nghe: Câu ' + (q.number || (index + 1)) + ' / ' + listeningTotal + ')' 
          : '二、阅读 (Phần Đọc: Câu ' + (q.number || (index + 1)) + ' / ' + questions.length + ')';
        bannerEl.textContent = partName;
      }

      // Cập nhật số câu
      var indexEl = document.getElementById('q-index-display');
      if (indexEl) indexEl.textContent = 'Câu ' + (index + 1) + ' / ' + questions.length;

      var skillEl = document.getElementById('q-skill-label');
      if (skillEl) {
        skillEl.textContent = q.section === 'listening' ? 'Kỹ năng: Nghe hiểu (' + listeningTotal + ' câu)' : 'Kỹ năng: Đọc hiểu (' + readingTotal + ' câu)';
      }

      // Audio bar
      this.stopCurrentAudio();
      var audioBar = document.getElementById('cbt-audio-bar');
      if (q.section === 'listening') {
        if (audioBar) audioBar.classList.remove('hidden');
        var statusEl = document.getElementById('audio-playing-indicator');
        if (statusEl) statusEl.textContent = 'Sẵn sàng phát âm (Bấm nút để nghe 2 lần chuẩn Hanban)';
      } else {
        if (audioBar) audioBar.classList.add('hidden');
      }

      // Shared Panel (nếu có)
      var sharedBox = document.getElementById('cbt-shared-context');
      var sharedPanels = currentExamData.sharedPanels || {};
      if (q.sharedPanelId && sharedPanels[q.sharedPanelId]) {
        if (sharedBox) {
          sharedBox.classList.remove('hidden');
          var panelObj = sharedPanels[q.sharedPanelId];
          var items = panelObj.items || [];
          var sharedHtml = '<div class="shared-panel-title">' + (panelObj.title || 'Bảng dữ liệu dùng chung (A - F)') + ':</div>' +
            '<div class="shared-grid-6">' +
            items.map(function (item) {
              var cleanLabel = item.label || '';
              if (!isSubmitted && cleanLabel) {
                cleanLabel = cleanLabel.replace(/\s*[\(（][^\)）]*[\)）]/g, '').trim();
              }
              return '<div class="shared-box-item">' +
                '<strong class="shared-key">' + item.key + '</strong>' +
                (item.imageUrl ? '<div class="shared-img-wrap"><img src="' + item.imageUrl + '" alt="' + item.key + '" /></div>' : '') +
                (cleanLabel && (!item.imageUrl || isSubmitted) ? '<div class="shared-label">' + cleanLabel + '</div>' : '') +
                (isSubmitted && item.detail ? '<div class="shared-detail">' + item.detail + '</div>' : '') +
              '</div>';
            }).join('') +
          '</div>';
          sharedBox.innerHTML = sharedHtml;
        }
      } else {
        if (sharedBox) sharedBox.classList.add('hidden');
      }

      // Prompt câu hỏi
      var promptEl = document.getElementById('q-prompt-area');
      if (promptEl) {
        var visualHtml = '';
        if (q.imageUrl) {
          visualHtml = '<div class="prompt-visual-image">' +
            '<img src="' + q.imageUrl + '" alt="Hình minh họa câu ' + q.number + '" />' +
            (isSubmitted && q.promptVisual ? '<div class="prompt-visual-caption">' + SVG_ICONS.image + '<span>' + q.promptVisual + '</span></div>' : '') +
          '</div>';
        } else if (isSubmitted && q.promptVisual) {
          visualHtml = '<div class="prompt-visual-badge">' + SVG_ICONS.image + '<span>Hình ảnh đề bài: ' + q.promptVisual + '</span></div>';
        }

        var hanziHtml = '';
        if (q.contextHanzi) {
          hanziHtml = '<div class="hanzi-context-box">' +
            '<div class="hanzi-context-main">' + q.contextHanzi + '</div>' +
            (q.contextPinyin ? '<div class="hanzi-context-pinyin">' + q.contextPinyin + '</div>' : '') +
            (isSubmitted && q.contextMeaning ? '<div class="hanzi-context-meaning">Dịch nghĩa: ' + q.contextMeaning + '</div>' : '') +
          '</div>';
        }

        var questionContent = q.questionText || q.hanzi || '';
        if (!isSubmitted && questionContent) {
          questionContent = questionContent.replace(/\s*[\(（][^\)）]*[\)）]/g, '').trim();
        }

        var speakTarget = q.audioText || q.hanzi || q.questionText || '';
        var promptAudioHtml = '';
        if (speakTarget) {
          promptAudioHtml = '<div class="prompt-audio-action">' +
            '<button type="button" class="btn-prompt-audio" onclick="window.HSK_APP.playCurrentQuestionAudio(1)" title="Nghe phát âm chuẩn câu này">' +
              SVG_ICONS.volume +
              '<span>Nghe phát âm</span>' +
            '</button>' +
          '</div>';
        }

        promptEl.innerHTML = visualHtml + hanziHtml +
          '<div class="q-hanzi-text">' + questionContent + '</div>' +
          (q.pinyin ? '<div class="q-pinyin-text">' + q.pinyin + '</div>' : '') +
          promptAudioHtml +
          (isSubmitted && q.meaning ? '<div class="q-meaning-text">Dịch nghĩa: ' + q.meaning + '</div>' : '');
      }

      // Options
      var optContainer = document.getElementById('q-options-area') || document.getElementById('q-options-container');
      if (optContainer) {
        var options = q.options || [];
        var selectedVal = userAnswers[q.id];

        var optsHtml = options.map(function (opt) {
          var isChosen = (selectedVal === opt.key);
          var cls = 'cbt-opt-btn';
          if (isChosen) cls += ' selected';
          if (isSubmitted) {
            if (opt.key === q.answer) cls += ' is-correct-answer';
            else if (isChosen) cls += ' is-wrong-answer';
          }

          var optLabel = opt.label || '';
          if (!isSubmitted) {
            if (opt.key === 'T') {
              optLabel = 'Đúng (对)';
            } else if (opt.key === 'F') {
              optLabel = 'Sai (错)';
            } else if (optLabel) {
              optLabel = optLabel.replace(/\s*[\(（][^\)）]*[\)）]/g, '').trim();
            }
          }
          var labelHtml = (optLabel && optLabel !== opt.key) ? '<span class="opt-label-text">' + optLabel + '</span>' : '';
          return '<button type="button" class="' + cls + '" onclick="window.HSK_APP.selectOption(\'' + q.id + '\', \'' + opt.key + '\')">' +
            '<span class="opt-key-badge">' + opt.key + '</span>' +
            labelHtml +
          '</button>';
        });

        optContainer.innerHTML = optsHtml.join('');
      }

      // Explanation (khi đã nộp bài)
      var expBox = document.getElementById('q-explanation-box');
      if (expBox) {
        if (isSubmitted) {
          expBox.classList.remove('hidden');
          var isUserCorrect = (userAnswers[q.id] === q.answer);
          var meaningInfo = '';
          if (q.meaning) {
            meaningInfo = '<div class="exp-meaning-box">' +
              '<strong>Dịch nghĩa câu: </strong>' + q.meaning +
            '</div>';
          }
          expBox.innerHTML = '<div class="exp-status-row">' +
            (isUserCorrect ? SVG_ICONS.check : SVG_ICONS.cross) +
            '<strong class="' + (isUserCorrect ? 'text-success' : 'text-danger') + '">' +
              (isUserCorrect ? 'Bạn đã trả lời đúng' : 'Bạn trả lời sai — Đáp án đúng là: ' + q.answer) +
            '</strong>' +
          '</div>' +
          meaningInfo +
          '<div class="exp-detail-text">' +
            '<strong>Giải thích chi tiết: </strong>' + (q.explanation || 'Không có giải thích chi tiết cho câu hỏi này.') +
          '</div>';
        } else {
          expBox.classList.add('hidden');
        }
      }

      this.renderPalette();
    },

    selectOption: function (qId, optionKey) {
      if (isSubmitted) return;
      userAnswers[qId] = optionKey;
      this.loadQuestion(currentQuestionIndex);
      this.renderPalette();
    },

    navigateQuestion: function (delta) {
      if (!currentExamData || !currentExamData.questions) return;
      var newIdx = currentQuestionIndex + delta;
      if (newIdx >= 0 && newIdx < currentExamData.questions.length) {
        this.loadQuestion(newIdx);
      }
    },

    renderPalette: function () {
      if (!currentExamData || !currentExamData.questions) return;
      var questions = currentExamData.questions;

      var listenGrid = document.getElementById('palette-listening');
      var readGrid = document.getElementById('palette-reading');

      var listenHtml = [];
      var readHtml = [];
      var listeningTotal = currentExamData.listeningCount || (currentHskLevel === 'hsk2' ? 35 : 20);

      var listenTitle = document.getElementById('palette-listen-title');
      var readTitle = document.getElementById('palette-read-title');
      if (listenTitle) listenTitle.textContent = '一、听力 (Phần Nghe: 1 – ' + listeningTotal + ')';
      if (readTitle) readTitle.textContent = '二、阅读 (Phần Đọc: ' + (listeningTotal + 1) + ' – ' + questions.length + ')';

      for (var i = 0; i < questions.length; i++) {
        var q = questions[i];
        var isCurrent = (i === currentQuestionIndex);
        var isAnswered = (userAnswers[q.id] !== undefined);

        var btnClass = 'cbt-palette-item';
        if (isCurrent) btnClass += ' current';
        if (isAnswered) btnClass += ' answered';

        if (isSubmitted) {
          var isCorrect = (userAnswers[q.id] === q.answer);
          btnClass += isCorrect ? ' correct' : ' wrong';
        }

        var itemHtml = '<button type="button" class="' + btnClass + '" onclick="window.HSK_APP.loadQuestion(' + i + ')">' +
          (i + 1) +
        '</button>';

        if (i < listeningTotal) {
          listenHtml.push(itemHtml);
        } else {
          readHtml.push(itemHtml);
        }
      }

      if (listenGrid) listenGrid.innerHTML = listenHtml.join('');
      if (readGrid) readGrid.innerHTML = readHtml.join('');
    },

    submitCbtExam: function () {
      if (isSubmitted || !currentExamData) return;
      isSubmitted = true;
      clearInterval(timerInterval);

      var questions = currentExamData.questions;
      var totalCount = questions.length;
      var listeningTotal = currentExamData.listeningCount || (currentHskLevel === 'hsk2' ? 35 : 20);
      var readingTotal = currentExamData.readingCount || (currentHskLevel === 'hsk2' ? 25 : 20);

      var correctCount = 0;
      var listenCorrect = 0;
      var readCorrect = 0;

      for (var i = 0; i < questions.length; i++) {
        var q = questions[i];
        if (userAnswers[q.id] === q.answer) {
          correctCount++;
          if (i < listeningTotal) listenCorrect++;
          else readCorrect++;
        }
      }

      var listenScore = Math.round((listenCorrect / listeningTotal) * 100);
      var readScore = Math.round((readCorrect / readingTotal) * 100);
      var totalScore = listenScore + readScore;
      var passed = (totalScore >= (currentExamData.passingScore || 120));

      this.renderPalette();
      this.loadQuestion(currentQuestionIndex);

      this.showScoreModal(totalScore, correctCount, totalCount, listenScore, readScore, listenCorrect, listeningTotal, readCorrect, readingTotal, passed);
    },

    showScoreModal: function (score, correctCount, totalCount, listenScore, readScore, listenCorrect, listeningTotal, readCorrect, readingTotal, passed) {
      var old = document.getElementById('cbt-score-popup');
      if (old) old.remove();

      var levelLabel = (currentHskLevel === 'hsk2') ? 'HSK 2' : 'HSK 1';
      var popup = document.createElement('div');
      popup.id = 'cbt-score-popup';
      popup.className = 'cbt-score-backdrop';

      popup.innerHTML = '<div class="cbt-score-modal-box">' +
        '<div class="score-modal-icon-wrap">' + (passed ? SVG_ICONS.trophy : SVG_ICONS.target) + '</div>' +
        '<h3 class="score-modal-title">' + (passed ? 'Chúc mừng! ĐẠT CHUẨN ' + levelLabel : 'Cần cố gắng thêm!') + '</h3>' +
        '<div class="score-modal-number ' + (passed ? 'score-passed' : 'score-failed') + '">' +
          score + ' <span class="score-modal-max">/ 200 điểm</span>' +
        '</div>' +
        '<div class="score-modal-details">' +
          '<div>&bull; Tổng số câu đúng: <strong>' + correctCount + ' / ' + totalCount + ' câu</strong></div>' +
          '<div>&bull; Phần Nghe hiểu: <strong>' + listenScore + ' / 100 điểm</strong> (' + listenCorrect + '/' + listeningTotal + ' câu)</div>' +
          '<div>&bull; Phần Đọc hiểu: <strong>' + readScore + ' / 100 điểm</strong> (' + readCorrect + '/' + readingTotal + ' câu)</div>' +
          '<div>&bull; Kết quả: <strong>' + (passed ? 'ĐẠT (>= 120 điểm)' : 'CHƯA ĐẠT (< 120 điểm)') + '</strong></div>' +
        '</div>' +
        '<div class="score-modal-actions">' +
          '<button type="button" class="btn-score-secondary" onclick="document.getElementById(\'cbt-score-popup\').remove()">' +
            'Xem lại đáp án' +
          '</button>' +
          '<button type="button" class="btn-score-primary" onclick="document.getElementById(\'cbt-score-popup\').remove(); window.HSK_APP.exitCbtExam();">' +
            'Về danh sách đề' +
          '</button>' +
        '</div>' +
      '</div>';

      document.body.appendChild(popup);
    },

    // -------------------------------------------------------------
    // SỔ TAY TỪ VỰNG & NGỮ PHÁP HSK 1 - 2
    // -------------------------------------------------------------
    openHandbookModal: function (level) {
      var lvl = level || currentHskLevel || 'hsk1';
      currentHandbookLevel = lvl;
      var modal = document.getElementById('modal-hsk-handbook');
      if (!modal) return;
      modal.classList.remove('hidden');
      this.switchHandbookLevel(lvl);
      this.switchHandbookTab('vocab');
    },

    switchHandbookLevel: function (level) {
      currentHandbookLevel = level || 'hsk1';
      var btnHsk1 = document.getElementById('btn-handbook-lvl-hsk1');
      var btnHsk2 = document.getElementById('btn-handbook-lvl-hsk2');
      var btnVocab = document.getElementById('btn-handbook-tab-vocab');
      var btnGrammar = document.getElementById('btn-handbook-tab-grammar');

      if (currentHandbookLevel === 'hsk2') {
        if (btnHsk1) btnHsk1.classList.remove('active');
        if (btnHsk2) btnHsk2.classList.add('active');
        if (btnVocab) btnVocab.textContent = 'Từ vựng HSK 2 (770+ từ)';
        if (btnGrammar) btnGrammar.textContent = 'Ngữ pháp HSK 2 Cốt lõi';
      } else {
        if (btnHsk1) btnHsk1.classList.add('active');
        if (btnHsk2) btnHsk2.classList.remove('active');
        if (btnVocab) btnVocab.textContent = 'Từ vựng HSK 1 (150 từ)';
        if (btnGrammar) btnGrammar.textContent = 'Ngữ pháp HSK 1 Cốt lõi';
      }

      var searchInput = document.getElementById('handbook-search-input');
      if (searchInput) searchInput.value = '';

      this.renderHandbookVocab();
      this.renderHandbookGrammar();
    },

    closeHandbookModal: function () {
      var modal = document.getElementById('modal-hsk-handbook');
      if (modal) modal.classList.add('hidden');
    },

    switchHandbookTab: function (tab) {
      var btnVocab = document.getElementById('btn-handbook-tab-vocab');
      var btnGrammar = document.getElementById('btn-handbook-tab-grammar');
      var vocabContent = document.getElementById('handbook-vocab-content');
      var grammarContent = document.getElementById('handbook-grammar-content');

      if (tab === 'vocab') {
        if (btnVocab) btnVocab.classList.add('active');
        if (btnGrammar) btnGrammar.classList.remove('active');
        if (vocabContent) vocabContent.classList.remove('hidden');
        if (grammarContent) grammarContent.classList.add('hidden');
      } else {
        if (btnVocab) btnVocab.classList.remove('active');
        if (btnGrammar) btnGrammar.classList.add('active');
        if (vocabContent) vocabContent.classList.add('hidden');
        if (grammarContent) grammarContent.classList.remove('hidden');
      }
    },

    renderHandbookVocab: function (filteredList) {
      var container = document.getElementById('handbook-vocab-content');
      if (!container) return;

      var key = (currentHandbookLevel === 'hsk2') ? 'hsk2_vocabulary' : 'hsk1_vocabulary';
      var data = filteredList || (window.EDUZ_HSK_HANDBOOK && window.EDUZ_HSK_HANDBOOK[key]) || [];
      if (!data.length) {
        container.innerHTML = '<div class="handbook-empty">Không tìm thấy từ vựng phù hợp.</div>';
        return;
      }

      var html = '<div class="handbook-vocab-grid">';
      data.forEach(function (w) {
        var cleanWord = escapeHtml(w.hanzi).replace(/'/g, "\\'");
        var cleanEx = w.example ? escapeHtml(w.example).replace(/'/g, "\\'") : '';

        html += '<div class="handbook-vocab-card">' +
          '<div class="vocab-card-top">' +
            '<div class="vocab-word-info">' +
              '<strong class="vocab-hanzi">' + escapeHtml(w.hanzi) + '</strong>' +
              '<span class="vocab-pinyin">' + escapeHtml(w.pinyin) + '</span>' +
            '</div>' +
            '<button type="button" class="btn-vocab-listen" title="Nghe phát âm từ: ' + escapeHtml(w.hanzi) + '" onclick="event.stopPropagation(); window.TDV_TTS.speak(\'' + cleanWord + '\', { lang: \'zh-CN\', repeat: 1 });">' +
              SVG_ICONS.volume +
            '</button>' +
          '</div>' +
          '<div class="vocab-type">' + escapeHtml(w.type || 'Từ vựng') + '</div>' +
          '<div class="vocab-meaning">' + escapeHtml(w.meaning) + '</div>' +
          (w.example ? '<div class="vocab-example">' +
            '<div class="vocab-example-text">' + escapeHtml(w.example) + '</div>' +
            '<button type="button" class="btn-example-listen" title="Nghe phát âm câu ví dụ" onclick="event.stopPropagation(); window.TDV_TTS.speak(\'' + cleanEx + '\', { lang: \'zh-CN\', repeat: 1 });">' +
              SVG_ICONS.volume +
              '<span>Nghe ví dụ</span>' +
            '</button>' +
          '</div>' : '') +
        '</div>';
      });
      html += '</div>';

      container.innerHTML = html;
    },

    renderHandbookGrammar: function () {
      var container = document.getElementById('handbook-grammar-content');
      if (!container) return;

      var key = (currentHandbookLevel === 'hsk2') ? 'hsk2_grammar' : 'hsk1_grammar';
      var grammarData = (window.EDUZ_HSK_HANDBOOK && window.EDUZ_HSK_HANDBOOK[key]) || [];
      var html = '';

      grammarData.forEach(function (cat) {
        html += '<div class="handbook-grammar-section">' +
          '<h4 class="grammar-section-title">' + escapeHtml(cat.category) + '</h4>' +
          '<div class="grammar-items-list">';
        cat.items.forEach(function (item) {
          var cleanEx = item.example ? escapeHtml(item.example).replace(/'/g, "\\'") : '';
          html += '<div class="grammar-card">' +
            '<div class="grammar-card-header">' +
              '<div class="grammar-name">' + escapeHtml(item.name) + '</div>' +
              (cleanEx ? '<button type="button" class="btn-grammar-listen" title="Nghe phát âm câu mẫu" onclick="event.stopPropagation(); window.TDV_TTS.speak(\'' + cleanEx + '\', { lang: \'zh-CN\', repeat: 1 });">' +
                SVG_ICONS.volume +
                '<span>Nghe câu mẫu</span>' +
              '</button>' : '') +
            '</div>' +
            '<div class="grammar-structure">' + escapeHtml(item.structure) + '</div>' +
            '<div class="grammar-example">Ví dụ: ' + escapeHtml(item.example) + '</div>' +
            (item.pinyin ? '<div class="grammar-pinyin">' + escapeHtml(item.pinyin) + '</div>' : '') +
            (item.meaning ? '<div class="grammar-meaning">Dịch: ' + escapeHtml(item.meaning) + '</div>' : '') +
            (item.note ? '<div class="grammar-note">Ghi chú: ' + escapeHtml(item.note) + '</div>' : '') +
          '</div>';
        });
        html += '</div></div>';
      });

      container.innerHTML = html;
    },

    searchHandbook: function (query) {
      var q = (query || '').toLowerCase().trim();
      var key = (currentHandbookLevel === 'hsk2') ? 'hsk2_vocabulary' : 'hsk1_vocabulary';
      var allVocab = (window.EDUZ_HSK_HANDBOOK && window.EDUZ_HSK_HANDBOOK[key]) || [];
      if (!q) {
        this.renderHandbookVocab(allVocab);
        return;
      }

      function stripTone(str) {
        return (str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      }

      var qClean = stripTone(q);

      var filtered = allVocab.filter(function (item) {
        var hanziMatch = item.hanzi && item.hanzi.toLowerCase().includes(q);
        var pinyinMatch = item.pinyin && (item.pinyin.toLowerCase().includes(q) || stripTone(item.pinyin).includes(qClean));
        var meaningMatch = item.meaning && (item.meaning.toLowerCase().includes(q) || stripTone(item.meaning).includes(qClean));
        return hanziMatch || pinyinMatch || meaningMatch;
      });

      this.renderHandbookVocab(filtered);
    }
  };

  window.HSK_APP = HSKApp;

  function initHandbookEvents() {
    var btnOpen = document.getElementById('btn-handbook-open');
    if (btnOpen) {
      btnOpen.addEventListener('click', function () {
        window.HSK_APP.openHandbookModal('hsk1');
      });
    }

    var searchInput = document.getElementById('handbook-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        window.HSK_APP.searchHandbook(e.target.value);
      });
    }

    var btnClose = document.getElementById('btn-handbook-close');
    if (btnClose) {
      btnClose.addEventListener('click', function () {
        window.HSK_APP.closeHandbookModal();
      });
    }

    var modal = document.getElementById('modal-hsk-handbook');
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) window.HSK_APP.closeHandbookModal();
      });
    }

    var btnPlayAudio = document.getElementById('btn-play-cbt-audio');
    if (btnPlayAudio) {
      btnPlayAudio.addEventListener('click', function () {
        window.HSK_APP.playCurrentQuestionAudio(2);
      });
    }

    var btnPlayOnce = document.getElementById('btn-play-once-audio');
    if (btnPlayOnce) {
      btnPlayOnce.addEventListener('click', function () {
        window.HSK_APP.playCurrentQuestionAudio(1);
      });
    }

    var btnStopAudio = document.getElementById('btn-stop-audio');
    if (btnStopAudio) {
      btnStopAudio.addEventListener('click', function () {
        window.HSK_APP.stopCurrentAudio();
      });
    }

    var btnPrev = document.getElementById('btn-cbt-prev');
    if (btnPrev) {
      btnPrev.addEventListener('click', function () {
        window.HSK_APP.navigateQuestion(-1);
      });
    }

    var btnNext = document.getElementById('btn-cbt-next');
    if (btnNext) {
      btnNext.addEventListener('click', function () {
        window.HSK_APP.navigateQuestion(1);
      });
    }

    var btnSubmit = document.getElementById('btn-cbt-submit');
    if (btnSubmit) {
      btnSubmit.addEventListener('click', function () {
        window.HSK_APP.submitCbtExam();
      });
    }

    var btnExit = document.getElementById('btn-cbt-exit');
    if (btnExit) {
      btnExit.addEventListener('click', function () {
        window.HSK_APP.exitCbtExam();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHandbookEvents);
  } else {
    initHandbookEvents();
  }

})(typeof window !== 'undefined' ? window : this, typeof document !== 'undefined' ? document : {});
