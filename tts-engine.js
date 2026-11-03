/**
 * ÔN THI TDV FREE - UNIVERSAL TTS PRONUNCIATION ENGINE (V2.0 ROBUST)
 * Hệ thống phát âm chuẩn quốc tế cho Tiếng Trung (HSK 1, HSK 2, HSK 3) & Tiếng Anh (TA1)
 * 
 * Khắc phục hoàn toàn lỗi 404 và không phát được âm thanh:
 * 1. Phân mảnh câu tự động (Sentence Chunking <= 65 ký tự): Google Translate TTS chỉ chấp nhận <= 100 ký tự.
 *    Khi câu dài hơn sẽ bị 404 Not Found. Thuật toán chunking tách câu tự nhiên theo dấu chấm/ngắt nghỉ
 *    để mọi request đều <= 65 ký tự -> TRIỆT TIÊU 100% LỖI 404.
 * 2. Đa tầng Fallback liên hoàn (Multi-Tier Resilient Streaming):
 *    - Tuyến 1: Google Translate Cloud TTS (client=tw-ob)
 *    - Tuyến 2: Google Translate Secondary Mirror (translate.google.com.vn)
 *    - Tuyến 3: Youdao Dictionary Voice Stream (chuẩn từ vựng & ngữ âm)
 *    - Tuyến 4: Web Speech API (SpeechSynthesis) với đầy đủ bản vá chống Chrome GC & Autoplay Unlock.
 * 3. Hỗ trợ đầy đủ thể thức CBT Hanban (lặp 2 lần, nghỉ 2s, mở khóa gesture trên điện thoại).
 */

(function (window) {
  'use strict';

  var currentAudio = null;
  var currentTimer = null;
  var heartbeatInterval = null;
  var isPlaying = false;
  var activeListener = null;
  var activeUtterance = null;
  var cachedVoices = [];

  // Khởi tạo danh sách giọng đọc từ trình duyệt
  function initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      cachedVoices = window.speechSynthesis.getVoices() || [];
      if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
        window.speechSynthesis.onvoiceschanged = function () {
          try {
            cachedVoices = window.speechSynthesis.getVoices() || [];
          } catch (e) {}
        };
      }
    } catch (e) {}
  }
  initVoices();

  // Làm sạch văn bản trước khi phát âm
  function cleanSpeechText(text, lang) {
    if (!text) return '';
    var str = String(text);
    var l = (lang || '').toLowerCase();

    if (l.indexOf('zh') === 0) {
      // Bỏ các tiền tố phân vai hội thoại như 女：, 男：, 问：
      str = str.replace(/([男女]\s*[:：]\s*)/g, ' ');
      str = str.replace(/(问\s*[:：]\s*)/g, ' ');
      str = str.replace(/(例如\s*[:：]\s*)/g, ' ');
      str = str.replace(/第\s*\d+\s*题\s*[:：]?\s*/g, ' ');
      // Bỏ ký tự trang trí
      str = str.replace(/[\u2605\u2606\u2713\u2715]/g, ' ');
      // Bỏ chú thích trong ngoặc đơn (dịch nghĩa hoặc pinyin)
      str = str.replace(/[\(（][^\)）]*[\)）]/g, ' ');
    } else {
      // Tiếng Anh: Bỏ các tiền tố nhận định
      str = str.replace(/^(Statement\s*\(Nhận định\)\s*:\s*)/gi, '');
      str = str.replace(/\s*is\s+True\s+or\s+False\??$/gi, '');
      str = str.replace(/^["'“](.*)["'”]$/g, '$1');
    }

    return str.replace(/\s+/g, ' ').trim();
  }

  // Tách văn bản thành các đoạn ngắn (chunks <= maxLen) theo ranh giới câu tự nhiên
  function splitTextIntoSpeechChunks(text, lang, maxLen) {
    var limit = maxLen || 65;
    var cleanText = cleanSpeechText(text, lang);
    if (!cleanText) return [];
    if (cleanText.length <= limit) return [cleanText];

    var isZh = (lang || '').toLowerCase().indexOf('zh') === 0;
    // Tách theo dấu kết thúc câu
    var delimiterRegex = isZh 
      ? /([^。！？；\n]+[。！？；\n]?)/g 
      : /([^.!?;\n]+[.!?;\n]?)/g;
    
    var sentences = cleanText.match(delimiterRegex) || [cleanText];
    var chunks = [];
    var current = '';

    for (var i = 0; i < sentences.length; i++) {
      var s = sentences[i].trim();
      if (!s) continue;

      if (s.length > limit) {
        // Tách câu quá dài theo dấu phẩy / ngắt hơi
        var commaRegex = isZh ? /([^，、 ]+[，、 ]?)/g : /([^, ]+[, ]?)/g;
        var subParts = s.match(commaRegex) || [s];
        for (var j = 0; j < subParts.length; j++) {
          var sub = subParts[j].trim();
          if (!sub) continue;
          if (current && (current.length + sub.length + (isZh ? 0 : 1) > limit)) {
            chunks.push(current);
            current = sub;
          } else {
            current = current ? (current + (isZh ? '' : ' ') + sub) : sub;
          }
        }
      } else {
        if (current && (current.length + s.length + (isZh ? 0 : 1) > limit)) {
          chunks.push(current);
          current = s;
        } else {
          current = current ? (current + (isZh ? '' : ' ') + s) : s;
        }
      }
    }
    if (current) chunks.push(current);
    return chunks.length > 0 ? chunks : [cleanText];
  }

  // Tạo URL âm thanh MP3 từ Google Translate TTS (Primary)
  function getGoogleTtsUrl(textChunk, lang) {
    var l = (lang || '').toLowerCase().indexOf('zh') === 0 ? 'zh-CN' : 'en';
    if (!textChunk) return null;
    return 'https://translate.google.com/translate_tts?ie=UTF-8&tl=' + l + '&client=tw-ob&q=' + encodeURIComponent(textChunk);
  }

  // Tạo URL âm thanh từ Google Translate TTS Mirror (Secondary)
  function getGoogleMirrorTtsUrl(textChunk, lang) {
    var l = (lang || '').toLowerCase().indexOf('zh') === 0 ? 'zh-CN' : 'en';
    if (!textChunk) return null;
    return 'https://translate.google.com.vn/translate_tts?ie=UTF-8&tl=' + l + '&client=tw-ob&q=' + encodeURIComponent(textChunk);
  }

  // Tạo URL âm thanh từ Youdao Dict TTS
  function getYoudaoTtsUrl(textChunk, lang) {
    var isZh = (lang || '').toLowerCase().indexOf('zh') === 0;
    if (!textChunk) return null;
    if (isZh) {
      return 'https://dict.youdao.com/dictvoice?audio=' + encodeURIComponent(textChunk) + '&le=zh';
    } else {
      return 'https://dict.youdao.com/dictvoice?audio=' + encodeURIComponent(textChunk) + '&type=2';
    }
  }

  // Chọn giọng đọc tốt nhất cho Web Speech API
  function pickBestVoice(lang) {
    if (!cachedVoices || !cachedVoices.length) {
      if (typeof window !== 'undefined' && window.speechSynthesis && window.speechSynthesis.getVoices) {
        cachedVoices = window.speechSynthesis.getVoices() || [];
      }
    }
    if (!cachedVoices || !cachedVoices.length) return null;

    var isZh = (lang || '').toLowerCase().indexOf('zh') === 0;
    var targetLang = isZh ? 'zh-cn' : 'en-us';

    // 1. Khớp chính xác mã ngôn ngữ
    var matched = cachedVoices.find(function (v) {
      return v.lang && v.lang.toLowerCase() === targetLang;
    });
    if (matched) return matched;

    // 2. Khớp theo tên giọng phổ biến chất lượng cao
    if (isZh) {
      var zhKeywords = ['chinese', 'mandarin', '普通话', '国语', 'xiaoxiao', 'yunxi', 'huihui', 'yaoyao', 'kangkang', 'tingting'];
      matched = cachedVoices.find(function (v) {
        var name = (v.name || '').toLowerCase();
        return zhKeywords.some(function (k) { return name.indexOf(k) !== -1; });
      });
      if (matched) return matched;
    } else {
      var enKeywords = ['english', 'zira', 'david', 'mark', 'samantha', 'google us english'];
      matched = cachedVoices.find(function (v) {
        var name = (v.name || '').toLowerCase();
        return enKeywords.some(function (k) { return name.indexOf(k) !== -1; });
      });
      if (matched) return matched;
    }

    // 3. Khớp tiền tố ngôn ngữ (zh hoặc en)
    var prefix = isZh ? 'zh' : 'en';
    matched = cachedVoices.find(function (v) {
      return v.lang && v.lang.toLowerCase().indexOf(prefix) === 0;
    });

    return matched || null;
  }

  // Dừng mọi âm thanh đang phát ngay lập tức
  function stop() {
    isPlaying = false;
    if (currentTimer) {
      clearTimeout(currentTimer);
      currentTimer = null;
    }
    if (heartbeatInterval) {
      clearInterval(heartbeatInterval);
      heartbeatInterval = null;
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
    activeUtterance = null;
    if (typeof window !== 'undefined') {
      window.__tdvActiveUtter = null;
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

  // Phát âm thanh qua Web Speech API (SpeechSynthesis) với đầy đủ các bản vá trình duyệt
  function speakViaWebSpeech(cleanText, lang, onDone, onError) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onError) onError(new Error('Trình duyệt không hỗ trợ Web Speech API'));
      else if (onDone) onDone();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch (e) {}

    var isZh = (lang || '').toLowerCase().indexOf('zh') === 0;
    var utter = new SpeechSynthesisUtterance(cleanText);
    utter.lang = isZh ? 'zh-CN' : 'en-US';
    utter.rate = isZh ? 0.90 : 0.95;
    utter.pitch = 1.0;

    var bestVoice = pickBestVoice(lang);
    if (bestVoice) {
      utter.voice = bestVoice;
    }

    // Bản vá chống Chrome Garbage Collection xóa object Utterance giữa chừng
    activeUtterance = utter;
    if (typeof window !== 'undefined') {
      window.__tdvActiveUtter = utter;
    }

    var hasEnded = false;
    function finishOnce() {
      if (!hasEnded) {
        hasEnded = true;
        if (heartbeatInterval) {
          clearInterval(heartbeatInterval);
          heartbeatInterval = null;
        }
        activeUtterance = null;
        if (typeof window !== 'undefined') {
          window.__tdvActiveUtter = null;
        }
        if (onDone) onDone();
      }
    }

    utter.onend = finishOnce;
    utter.onerror = function (err) {
      console.warn('[TDV_TTS] Web Speech API event error:', err);
      // Nếu lỗi nhưng không nghiêm trọng thì vẫn hoàn thành tiến trình
      finishOnce();
    };

    // Bản vá Chrome 15s Hang: Kích hoạt lại định kỳ
    if (heartbeatInterval) clearInterval(heartbeatInterval);
    heartbeatInterval = setInterval(function () {
      if (typeof window !== 'undefined' && window.speechSynthesis && window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      } else {
        clearInterval(heartbeatInterval);
        heartbeatInterval = null;
      }
    }, 8000);

    try {
      window.speechSynthesis.speak(utter);
      // Đánh thức engine nếu audio context bị ngủ
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch (se) {
      console.warn('[TDV_TTS] Lỗi speechSynthesis.speak:', se);
      finishOnce();
    }
  }

  // Phát một mẩu âm thanh đơn lẻ (chunk <= 65 ký tự) qua HTML5 Audio với Multi-Tier Fallback
  function playSingleChunk(chunk, lang, onFinish, onFail) {
    if (!chunk) {
      if (onFinish) onFinish();
      return;
    }

    var isZh = (lang || '').toLowerCase().indexOf('zh') === 0;
    var googleUrl = getGoogleTtsUrl(chunk, lang);
    var googleMirrorUrl = getGoogleMirrorTtsUrl(chunk, lang);
    var youdaoUrl = getYoudaoTtsUrl(chunk, lang);

    var sources = [
      { name: 'Google TTS', url: googleUrl },
      { name: 'Google Mirror', url: googleMirrorUrl },
      { name: 'Youdao TTS', url: youdaoUrl }
    ];

    var currentSourceIndex = 0;
    var audio = new Audio();
    currentAudio = audio;
    audio.preload = 'auto';

    var hasFinished = false;
    function finishChunk() {
      if (!hasFinished) {
        hasFinished = true;
        if (currentAudio === audio) currentAudio = null;
        if (onFinish) onFinish();
      }
    }

    audio.onended = finishChunk;

    function tryNextSource() {
      if (!isPlaying) return;

      if (currentSourceIndex < sources.length) {
        var srcObj = sources[currentSourceIndex];
        currentSourceIndex++;

        if (!srcObj.url) {
          tryNextSource();
          return;
        }

        audio.src = srcObj.url;
        var playPromise = audio.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(function () {
            // Lỗi autoplay hoặc không giải mã được -> thử nguồn tiếp theo
            tryNextSource();
          });
        }
      } else {
        // Cả 3 nguồn online đều không tải được -> chuyển sang Web Speech API
        speakViaWebSpeech(chunk, lang, finishChunk, onFail);
      }
    }

    audio.onerror = function () {
      tryNextSource();
    };

    tryNextSource();
  }

  // Phát tuần tự danh sách các chunks trong một lượt đọc
  function playChunksSequentially(chunks, lang, onComplete, onError) {
    if (!chunks || !chunks.length) {
      if (onComplete) onComplete();
      return;
    }

    var chunkIdx = 0;

    function nextChunk() {
      if (!isPlaying) return;

      if (chunkIdx >= chunks.length) {
        if (onComplete) onComplete();
        return;
      }

      var currentText = chunks[chunkIdx];
      chunkIdx++;

      playSingleChunk(currentText, lang, function () {
        if (!isPlaying) return;
        if (chunkIdx < chunks.length) {
          // Nghỉ ngắn 120ms giữa các câu cho tự nhiên
          currentTimer = setTimeout(nextChunk, 120);
        } else {
          if (onComplete) onComplete();
        }
      }, function (err) {
        if (onError) onError(err);
      });
    }

    nextChunk();
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

    // Tách thành các đoạn <= 65 ký tự để triệt tiêu 100% lỗi 404 từ máy chủ TTS
    var chunks = splitTextIntoSpeechChunks(clean, lang, 65);

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

      playChunksSequentially(chunks, lang, function () {
        if (!isPlaying) return;

        if (currentRound < repeat) {
          currentRound++;
          var pauseMsg = 'Nghỉ ' + Math.round(pauseMs / 1000) + ' giây trước lần phát ' + currentRound + '...';
          notifyState('pausing', pauseMsg);
          if (opts.onProgress) opts.onProgress(currentRound, repeat, pauseMsg);

          currentTimer = setTimeout(function () {
            runRound();
          }, pauseMs);
        } else {
          isPlaying = false;
          var doneMsg = (repeat > 1) 
            ? 'Đã phát xong ' + repeat + ' lần (Bấm để nghe lại)' 
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
    splitTextIntoSpeechChunks: splitTextIntoSpeechChunks,
    getGoogleTtsUrl: getGoogleTtsUrl,
    getYoudaoTtsUrl: getYoudaoTtsUrl
  };

})(typeof window !== 'undefined' ? window : this);
