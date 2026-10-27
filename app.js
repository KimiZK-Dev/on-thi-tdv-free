(function (window, document) {
  'use strict';

  // Quản lý Giao diện Dark / Light theme
  function initTheme() {
    var savedTheme = null;
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        savedTheme = window.localStorage.getItem('TDV_THEME');
      }
    } catch (e) {}

    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    applyTheme(currentTheme);

    var themeToggleBtn = document.getElementById('btn-theme-toggle');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', function () {
        var nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
      });
    }

    // Lắng nghe thay đổi hệ thống nếu chưa chọn thủ công
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        var hasUserTheme = false;
        try {
          hasUserTheme = !!(window.localStorage && window.localStorage.getItem('TDV_THEME'));
        } catch (err) {}
        if (!hasUserTheme) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('TDV_THEME', theme);
      }
    } catch (e) {}

    var themeToggleBtn = document.getElementById('btn-theme-toggle');
    if (themeToggleBtn) {
      var iconSlot = document.getElementById('theme-icon-slot');
      var textEl = themeToggleBtn.querySelector('.theme-text');
      var sunSvg = '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>';
      var moonSvg = '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>';

      if (theme === 'dark') {
        if (iconSlot) iconSlot.innerHTML = sunSvg;
        if (textEl) textEl.textContent = 'Giao diện sáng';
        themeToggleBtn.setAttribute('title', 'Chuyển sang giao diện sáng');
      } else {
        if (iconSlot) iconSlot.innerHTML = moonSvg;
        if (textEl) textEl.textContent = 'Giao diện tối';
        themeToggleBtn.setAttribute('title', 'Chuyển sang giao diện tối');
      }
    }
  }

  // Cập nhật thống kê Hero Header
  function updateHeroStats() {
    var totalQuestions = 0;
    var subjects = window.TDV_CONFIG && window.TDV_CONFIG.getAllSubjects ? window.TDV_CONFIG.getAllSubjects() : [];

    subjects.forEach(function (sub) {
      if (window.TDV_QUIZ && typeof window.TDV_QUIZ.getTotalQuestionCountForSubject === 'function') {
        totalQuestions += window.TDV_QUIZ.getTotalQuestionCountForSubject(sub.id);
      }
    });

    var statQuestionsEl = document.getElementById('hero-stat-questions');
    var statSubjectsEl = document.getElementById('hero-stat-subjects');
    var footerStatsEl = document.getElementById('footer-stats-note');

    if (statQuestionsEl && totalQuestions > 0) {
      statQuestionsEl.textContent = totalQuestions.toLocaleString('vi-VN') + '+';
    }
    if (statSubjectsEl && subjects.length > 0) {
      statSubjectsEl.textContent = subjects.length + ' môn';
    }
    if (footerStatsEl && totalQuestions > 0 && subjects.length > 0) {
      footerStatsEl.innerHTML = 'Kho dữ liệu ' + subjects.length + ' môn học &bull; ' + totalQuestions.toLocaleString('vi-VN') + ' câu hỏi &bull; Phát triển vì cộng đồng sinh viên';
    }
  }

  // Khởi động toàn bộ ứng dụng
  function bootstrap() {
    initTheme();

    try {
      if (window.TDV_NAV && typeof window.TDV_NAV.init === 'function') {
        window.TDV_NAV.init();
      }
    } catch (err) {
      console.error('[TDV_APP] Lỗi khởi tạo TDV_NAV:', err);
    }

    try {
      if (window.TDV_QUIZ && typeof window.TDV_QUIZ.init === 'function') {
        window.TDV_QUIZ.init();
      }
    } catch (err) {
      console.error('[TDV_APP] Lỗi khởi tạo TDV_QUIZ:', err);
    }

    updateHeroStats();

    // Hỗ trợ mở môn thông qua URL Hash nếu có (VD: #ta1)
    if (typeof window !== 'undefined' && window.location && window.location.hash) {
      var hashSub = window.location.hash.replace('#', '').trim().toLowerCase();
      if (hashSub && window.TDV_CONFIG && window.TDV_CONFIG.getSubjectById(hashSub)) {
        setTimeout(function () {
          window.TDV_QUIZ.openSubject(hashSub);
        }, 100);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }

  window.TDV_APP = {
    bootstrap: bootstrap,
    applyTheme: applyTheme,
    updateHeroStats: updateHeroStats
  };
})(typeof window !== 'undefined' ? window : this, typeof document !== 'undefined' ? document : {});
