/**
 * ÔN THI TDV FREE - UNIVERSAL TTS PRONUNCIATION ENGINE
 * Hệ thống phát âm giọng đọc chuẩn quốc tế cho Tiếng Trung (HSK 1, HSK 2) & Tiếng Anh (TA1)
 * Kiến trúc đa tầng:
 *   1. HTML5 Cloud Audio Stream (Google TTS / Youdao TTS) - Âm thanh chuẩn phòng thu, không phụ thuộc OS
 *   2. Web Speech API (SpeechSynthesis) - Fallback offline nếu mất kết nối mạng
 * Hỗ trợ phát âm câu hỏi CBT (chế độ lặp lại 2 lần chuẩn Hanban), từ vựng Sổ tay HSK và luyện nghe Tiếng Anh
 */

(function (window) {
  'use strict';

  var currentAudio = null;
  var currentTimer = null;
  var isPlaying = false;
  var activeListener = null;

  // Làm sạch văn bản trước khi đưa vào bộ phát âm (loại bỏ ký hiệu phân vai, dấu ngoặc, v.v.)
  function cleanSpeechText(text, lang) {
    if (!text) return '';
    var str = String(text);
    var l = (lang || '').toLowerCase();

    if (l.indexOf('zh') === 0) {
      // Bỏ các tiền tố phân vai hội thoại như 女：, 男：, 问：
      str = str.replace(/([男女]\s*[:：]\s*)/g, ' ');
      str = str.replace(/(问\s*[:：]\s*)/g, ' ');
      str = str.replace(/[\u2605\u2606\u2713\u2715]/g, ' ');
      // Bỏ chú thích trong ngoặc đơn
      str = str.replace(/[\(（][^\)）]*[\)）]/g, ' ');
    } else {
      // Tiếng Anh: Bỏ các tiền tố nhận định
      str = str.replace(/^(Statement\s*\(Nhận định\)\s*:\s*)/gi, '');
      str = str.replace(/\s*is\s+True\s+or\s+False\??$/gi, '');
      str = str.replace(/^["'“](.*)["'”]$/g, '$1');
    }

    return str.replace(/\s+/g, ' ').trim();
  }

  // Tạo URL âm thanh MP3 từ Google Translate TTS
  function getGoogleTtsUrl(text, lang) {
    var l = (lang || '').toLowerCase().indexOf('zh') === 0 ? 'zh-CN' : 'en';
    var clean = cleanSpeechText(text, l);
    if (!clean) return null;
    return 'https://translate.google.com/translate_tts?ie=UTF-8&tl=' + l + '&client=tw-ob&q=' + encodeURIComponent(clean);
  }

  // Tạo URL âm thanh từ Youdao Dict TTS
  function getYoudaoTtsUrl(text, lang) {
    var l = (lang || '').toLowerCase().indexOf('zh') === 0 ? 'zh' : 'en';
    var clean = cleanSpeechText(text, l);
    if (!clean) return null;
    return 'https://dict.youdao.com/dictvoice?audio=' + encodeURIComponent(clean) + '&le=' + l;
  }

  // Dừng phát âm thanh ngay lập tức
  function stop() {
    isPlaying = false;
    if (currentTimer) {
      clearTimeout(currentTimer);
      currentTimer = null;
    }
    if (currentAudio) {
      try {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio.src = '';
      } catch (e) {}
      currentAudio = null;
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
    notifyState('idle', 'Sẵn sàng phát âm');
  }

  function notifyState(state, message) {
    if (typeof activeListener === 'function') {
      try {
        activeListener(state, message);
      } catch (e) {
        console.error('[TDV_TTS] Lỗi trong state callback:', e);
      }
    }
  }

  // Fallback qua Web Speech API của trình duyệt
  function speakViaWebSpeech(cleanText, lang, onDone, onError) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onError) onError(new Error('Trình duyệt không hỗ trợ Web Speech API'));
      else if (onDone) onDone();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      if (typeof window.speechSynthesis.resume === 'function') {
        window.speechSynthesis.resume();
      }
    } catch (e) {}

    var utter = new SpeechSynthesisUtterance(cleanText);
    var isZh = (lang || '').toLowerCase().indexOf('zh') === 0;
    utter.lang = isZh ? 'zh-CN' : 'en-US';
    utter.rate = isZh ? 0.88 : 0.95;

    // Tìm kiếm giọng đọc phù hợp nếu danh sách giọng đã sẵn sàng
    try {
      var voices = window.speechSynthesis.getVoices ? window.speechSynthesis.getVoices() : [];
      if (voices && voices.length) {
        var prefix = isZh ? 'zh' : 'en';
        var matched = voices.find(function (v) {
          return v.lang && v.lang.toLowerCase().indexOf(prefix) === 0;
        });
        if (matched) utter.voice = matched;
      }
    } catch (ve) {}

    utter.onend = function () {
      if (onDone) onDone();
    };

    utter.onerror = function (err) {
      console.warn('[TDV_TTS] Web Speech utter error:', err);
      if (onError) onError(err);
      else if (onDone) onDone();
    };

    try {
      window.speechSynthesis.speak(utter);
    } catch (se) {
      if (onError) onError(se);
      else if (onDone) onDone();
    }
  }

  // Phát một lượt âm thanh đơn lẻ
  function playSingleUtterance(cleanText, lang, onFinish, onFail) {
    var googleUrl = getGoogleTtsUrl(cleanText, lang);
    if (!googleUrl) {
      if (onFinish) onFinish();
      return;
    }

    var audio = new Audio();
    currentAudio = audio;
    audio.preload = 'auto';

    var hasEnded = false;
    var done = function () {
      if (!hasEnded) {
        hasEnded = true;
        if (currentAudio === audio) currentAudio = null;
        if (onFinish) onFinish();
      }
    };

    audio.onended = done;

    // Nếu Google TTS gặp sự cố mạng -> Thử Youdao TTS -> Nếu hỏng tiếp -> Fallback Web Speech
    audio.onerror = function () {
      console.warn('[TDV_TTS] Google TTS không tải được, thử kênh Youdao...');
      var youdaoUrl = getYoudaoTtsUrl(cleanText, lang);
      if (youdaoUrl) {
        var backupAudio = new Audio();
        currentAudio = backupAudio;
        backupAudio.preload = 'auto';
        backupAudio.onended = function () {
          if (currentAudio === backupAudio) currentAudio = null;
          if (onFinish) onFinish();
        };
        backupAudio.onerror = function () {
          console.warn('[TDV_TTS] Youdao TTS không tải được, chuyển sang Web Speech API...');
          speakViaWebSpeech(cleanText, lang, onFinish, onFail);
        };
        backupAudio.src = youdaoUrl;
        var pBackup = backupAudio.play();
        if (pBackup && typeof pBackup.catch === 'function') {
          pBackup.catch(function () {
            speakViaWebSpeech(cleanText, lang, onFinish, onFail);
          });
        }
      } else {
        speakViaWebSpeech(cleanText, lang, onFinish, onFail);
      }
    };

    audio.src = googleUrl;
    var playPromise = audio.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(function (err) {
        console.warn('[TDV_TTS] HTML5 Audio play() bị chặn bởi chính sách trình duyệt, thử Web Speech API:', err);
        speakViaWebSpeech(cleanText, lang, onFinish, onFail);
      });
    }
  }

  /**
   * Phát âm thanh văn bản (hỗ trợ phát lặp 2 lần kèm khoảng nghỉ chuẩn thi quốc tế)
   * @param {string} text - Đoạn văn bản cần đọc
   * @param {Object} options - Tùy chọn phát
   *   - lang: 'zh-CN' | 'en' (Mặc định 'zh-CN')
   *   - repeat: Số lần phát (1 hoặc 2, mặc định 1)
   *   - pauseMs: Khoảng nghỉ giữa các lần phát tính bằng mili-giây (mặc định 2000ms = 2s)
   *   - onStart: Callback khi bắt đầu
   *   - onProgress: Callback cập nhật tiến trình (lượt, tổng lượt, thông báo)
   *   - onEnd: Callback khi hoàn thành
   *   - onError: Callback khi xảy ra lỗi
   */
  function speak(text, options) {
    stop();

    var opts = options || {};
    var lang = opts.lang || 'zh-CN';
    var repeat = Number(opts.repeat) || 1;
    var pauseMs = opts.pauseMs !== undefined ? Number(opts.pauseMs) : 2000;
    var clean = cleanSpeechText(text, lang);

    if (!clean) {
      if (opts.onEnd) opts.onEnd();
      return;
    }

    isPlaying = true;
    activeListener = opts.onProgress || null;

    var currentRound = 1;

    function runRound() {
      if (!isPlaying) return;

      var roundMsg = (repeat > 1) 
        ? 'Đang phát lần ' + currentRound + '/' + repeat + '...' 
        : 'Đang phát âm...';
      
      notifyState('playing', roundMsg);
      if (opts.onProgress) opts.onProgress(currentRound, repeat, roundMsg);
      if (currentRound === 1 && opts.onStart) opts.onStart();

      playSingleUtterance(clean, lang, function () {
        if (!isPlaying) return;

        if (currentRound < repeat) {
          currentRound++;
          var pauseMsg = 'Nghỉ 2 giây trước lần phát ' + currentRound + '...';
          notifyState('pausing', pauseMsg);
          if (opts.onProgress) opts.onProgress(currentRound, repeat, pauseMsg);

          currentTimer = setTimeout(function () {
            runRound();
          }, pauseMs);
        } else {
          isPlaying = false;
          var doneMsg = (repeat > 1) 
            ? 'Đã phát xong 2 lần (Bấm để nghe lại)' 
            : 'Đã phát xong';
          notifyState('ended', doneMsg);
          if (opts.onProgress) opts.onProgress(repeat, repeat, doneMsg);
          if (opts.onEnd) opts.onEnd();
        }
      }, function (err) {
        isPlaying = false;
        var errMsg = 'Không thể phát âm thanh: ' + (err && err.message ? err.message : 'Lỗi kết nối');
        notifyState('error', errMsg);
        if (opts.onError) opts.onError(err);
      });
    }

    runRound();
  }

  window.TDV_TTS = {
    speak: speak,
    stop: stop,
    isPlaying: function () {
      return isPlaying;
    },
    cleanSpeechText: cleanSpeechText,
    getGoogleTtsUrl: getGoogleTtsUrl,
    getYoudaoTtsUrl: getYoudaoTtsUrl
  };

})(typeof window !== 'undefined' ? window : this);
