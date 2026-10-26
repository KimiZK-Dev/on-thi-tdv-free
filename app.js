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
      var iconEl = themeToggleBtn.querySelector('.theme-icon');
      var textEl = themeToggleBtn.querySelector('.theme-text');
      if (theme === 'dark') {
        if (iconEl) iconEl.textContent = '☀️';
        if (textEl) textEl.textContent = 'Giao diện sáng';
        themeToggleBtn.setAttribute('title', 'Chuyển sang giao diện sáng');
      } else {
        if (iconEl) iconEl.textContent = '🌙';
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

    if (statQuestionsEl && totalQuestions > 0) {
      statQuestionsEl.textContent = totalQuestions.toLocaleString('vi-VN') + '+';
    }
    if (statSubjectsEl && subjects.length > 0) {
      statSubjectsEl.textContent = subjects.length + ' môn';
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
    if (window.location.hash) {
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
    applyTheme: applyTheme
  };
})(window, document);
