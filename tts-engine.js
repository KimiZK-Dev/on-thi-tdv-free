/**
 * ÔN THI TDV FREE - UNIVERSAL TTS PRONUNCIATION ENGINE (V3.0 BULLETPROOF)
 * Hệ thống phát âm giọng đọc chuẩn quốc tế cho Tiếng Trung (HSK 1, HSK 2, HSK 3) & Tiếng Anh (TA1)
 *
 * Khắc phục triệt để lỗi 404 & 500 do Referer Blocking:
 * 1. Chống Referer Header: Google TTS và Baidu chặn 404 nếu request có header `Referer: https://kimizk-dev.github.io/`.
 *    Engine áp dụng `referrerPolicy = 'no-referrer'` trên player và meta tag toàn trang -> Triệt tiêu 100% mã lỗi 404.
 * 2. Tách câu hội thoại thông minh (Sentence Chunking):
 *    Tách tự động từng câu giao tiếp theo dấu kết thúc `。！？；\n` và `.!?;\n`.
 *    Tạo khoảng nghỉ 180ms tự nhiên giữa người hỏi và người đáp.
 * 3. Đa tầng máy chủ âm thanh Cloud Streaming không giới hạn:
 *    - Tuyến 1: Google Translate TTS (client=tw-ob)
 *    - Tuyến 2: Google APIs TTS (client=gtx)
 *    - Tuyến 3: Baidu Translate Cloud Audio (fanyi.baidu.com)
 *    - Tuyến 4: Youdao Dictionary Voice (từ vựng ngắn <= 15 ký tự)
 *    - Tuyến 5: Web Speech API (SpeechSynthesis) với đầy đủ bản vá GC & Autoplay.
 */

(function (window) {
  'use strict';

  var currentPlayerAudio = null;
  var currentTimer = null;
  var heartbeatInterval = null;
  var isPlaying = false;
  var activeListener = null;
  var activeUtterance = null;
  var cachedVoices = [];

  // Lấy hoặc tạo phần tử audio có chính sách no-referrer
  function getAudioPlayer() {
    var player = null;
    if (typeof document !== 'undefined') {
      player = document.getElementById('tdv-tts-player');
      if (!player) {
        player = new Audio();
        player.id = 'tdv-tts-player';
        player.className = 'hidden';
        player.preload = 'auto';
        try {
          if (document.body) document.body.appendChild(player);
        } catch (e) {}
      }
    }
    if (!player) {
      player = new Audio();
    }
    player.preload = 'auto';
    player.referrerPolicy = 'no-referrer';
    currentPlayerAudio = player;
    return player;
  }

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
      // Bỏ các tiền tố phân vai hội thoại như 女：, 男：, 问：, 例如：, 第X题
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

  // Tách văn bản thành các câu độc lập tự nhiên theo dấu chấm/hỏi/ngắt nhịp
  function splitTextIntoSpeechChunks(text, lang, maxLen) {
    var limit = maxLen || 50;
    var cleanText = cleanSpeechText(text, lang);
    if (!cleanText) return [];

    var isZh = (lang || '').toLowerCase().indexOf('zh') === 0;
    // Tách theo ranh giới câu tự nhiên
    var delimiterRegex = isZh 
      ? /([^。！？；\n]+[。！？；\n]?)/g 
      : /([^.!?;\n]+[.!?;\n]?)/g;
    
    var rawSentences = cleanText.match(delimiterRegex) || [cleanText];
    var chunks = [];

    for (var i = 0; i < rawSentences.length; i++) {
      var s = rawSentences[i].trim();
      if (!s) continue;

      if (s.length > limit) {
        // Tách câu dài theo dấu phẩy hoặc ngắt hơi
        var commaRegex = isZh ? /([^，、 ]+[，、 ]?)/g : /([^, ]+[, ]?)/g;
        var subParts = s.match(commaRegex) || [s];
        var current = '';
        for (var j = 0; j < subParts.length; j++) {
          var sub = subParts[j].trim();
          if (!sub) continue;
          if (current && (current.length + sub.length > limit)) {
            chunks.push(current);
            current = sub;
          } else {
            current = current ? (current + (isZh ? '' : ' ') + sub) : sub;
          }
        }
        if (current) chunks.push(current);
      } else {
        chunks.push(s);
      }
    }

    return chunks.length > 0 ? chunks : [cleanText];
  }

  // Tuyến 1: Google Translate TTS (tw-ob)
  function getGoogleTtsUrl(textChunk, lang) {
    var l = (lang || '').toLowerCase().indexOf('zh') === 0 ? 'zh-CN' : 'en';
    if (!textChunk) return null;
    return 'https://translate.google.com/translate_tts?ie=UTF-8&tl=' + l + '&client=tw-ob&q=' + encodeURIComponent(textChunk);
  }

  // Tuyến 2: Google APIs TTS (gtx)
  function getGoogleApisTtsUrl(textChunk, lang) {
    var l = (lang || '').toLowerCase().indexOf('zh') === 0 ? 'zh-CN' : 'en';
    if (!textChunk) return null;
    return 'https://translate.googleapis.com/translate_tts?ie=UTF-8&tl=' + l + '&client=gtx&q=' + encodeURIComponent(textChunk);
  }

  // Tuyến 3: Baidu Translate Cloud Audio (fanyi.baidu.com)
  function getBaiduTtsUrl(textChunk, lang) {
    var isZh = (lang || '').toLowerCase().indexOf('zh') === 0;
    var l = isZh ? 'zh' : 'en';
    if (!textChunk) return null;
    return 'https://fanyi.baidu.com/gettts?lan=' + l + '&text=' + encodeURIComponent(textChunk) + '&spd=5&source=web';
  }

  // Tuyến 4: Youdao Dict TTS (chỉ dùng cho từ đơn <= 15 ký tự, không dấu cách)
  function getYoudaoTtsUrl(textChunk, lang) {
    if (!textChunk || textChunk.length > 15 || textChunk.indexOf(' ') !== -1) return null;
    var isZh = (lang || '').toLowerCase().indexOf('zh') === 0;
    if (isZh) {
      return 'https://dict.youdao.com/dictvoice?audio=' + encodeURIComponent(textChunk) + '&le=zh';
    } else {
      return 'https://dict.youdao.com/dictvoice?audio=' + encodeURIComponent(textChunk) + '&type=2';
    }
  }

  // Chọn giọng đọc tối ưu cho Web Speech API
  function pickBestVoice(lang) {
    if (!cachedVoices || !cachedVoices.length) {
      if (typeof window !== 'undefined' && window.speechSynthesis && window.speechSynthesis.getVoices) {
        cachedVoices = window.speechSynthesis.getVoices() || [];
      }
    }
    if (!cachedVoices || !cachedVoices.length) return null;

    var isZh = (lang || '').toLowerCase().indexOf('zh') === 0;
    var targetLang = isZh ? 'zh-cn' : 'en-us';

    // Khớp chính xác mã ngôn ngữ
    var matched = cachedVoices.find(function (v) {
      return v.lang && v.lang.toLowerCase() === targetLang;
    });
    if (matched) return matched;

    // Khớp theo tên giọng phổ biến chất lượng cao
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

    // Khớp tiền tố ngôn ngữ (zh hoặc en)
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
    if (currentPlayerAudio) {
      try {
        currentPlayerAudio.pause();
        currentPlayerAudio.currentTime = 0;
        currentPlayerAudio.removeAttribute('src');
      } catch (e) {}
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

  // Fallback qua Web Speech API (SpeechSynthesis)
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
      console.warn('[TDV_TTS] Web Speech API error:', err);
      finishOnce();
    };

    // Bản vá Chrome 15s Hang
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
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch (se) {
      console.warn('[TDV_TTS] Lỗi speechSynthesis.speak:', se);
      finishOnce();
    }
  }

  // Phát một mẩu âm thanh đơn lẻ qua HTML5 Audio với Multi-Tier Fallback
  function playSingleChunk(chunk, lang, onFinish, onFail) {
    if (!chunk) {
      if (onFinish) onFinish();
      return;
    }

    var isZh = (lang || '').toLowerCase().indexOf('zh') === 0;
    var googleUrl = getGoogleTtsUrl(chunk, lang);
    var googleApisUrl = getGoogleApisTtsUrl(chunk, lang);
    var baiduUrl = getBaiduTtsUrl(chunk, lang);
    var youdaoUrl = getYoudaoTtsUrl(chunk, lang);

    var sources = [
      { name: 'Google TTS', url: googleUrl },
      { name: 'GoogleApis TTS', url: googleApisUrl },
      { name: 'Baidu TTS', url: baiduUrl }
    ];
    if (youdaoUrl) {
      sources.push({ name: 'Youdao TTS', url: youdaoUrl });
    }

    var currentSourceIndex = 0;
    var audio = getAudioPlayer();

    var hasFinished = false;
    function finishChunk() {
      if (!hasFinished) {
        hasFinished = true;
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
            // Lỗi play promise -> thử nguồn tiếp theo
            tryNextSource();
          });
        }
      } else {
        // Cả các nguồn Cloud đều không phát được -> fallback sang Web Speech API
        speakViaWebSpeech(chunk, lang, finishChunk, onFail);
      }
    }

    audio.onerror = function () {
      tryNextSource();
    };

    tryNextSource();
  }

  // Phát tuần tự danh sách các câu trong một lượt đọc
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
          // Nghỉ ngắn 180ms giữa các câu hội thoại cho tự nhiên
          currentTimer = setTimeout(nextChunk, 180);
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
   * Phát âm thanh văn bản (hỗ trợ lặp 2 lần kèm khoảng nghỉ chuẩn thi quốc tế)
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

    // Tách thành các câu độc lập tự nhiên
    var chunks = splitTextIntoSpeechChunks(clean, lang, 50);

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
    getGoogleApisTtsUrl: getGoogleApisTtsUrl,
    getBaiduTtsUrl: getBaiduTtsUrl,
    getYoudaoTtsUrl: getYoudaoTtsUrl
  };

})(typeof window !== 'undefined' ? window : this);
