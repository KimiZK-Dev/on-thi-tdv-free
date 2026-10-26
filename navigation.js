(function (window, document) {
  'use strict';

  var currentFilterPhase = 'all'; // 'all' | 'midterm' | 'final'
  var currentSearchKeyword = '';

  function removeVietnameseTones(str) {
    if (!str) return '';
    return String(str)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase()
      .trim();
  }

  function switchView(viewId) {
    var views = ['view-home', 'view-quiz'];
    for (var i = 0; i < views.length; i++) {
      var el = document.getElementById(views[i]);
      if (el) {
        if (views[i] === viewId) {
          el.classList.remove('hidden');
        } else {
          el.classList.add('hidden');
        }
      }
    }
  }

  function goHome() {
    switchView('view-home');
    var searchInput = document.getElementById('subject-search-input');
    if (searchInput) searchInput.value = '';
    currentSearchKeyword = '';
    currentFilterPhase = 'all';

    var filterBtns = document.querySelectorAll('.phase-filter-btn');
    filterBtns.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-phase') === 'all');
    });

    renderSubjectCards();
    if (typeof window.scrollTo === 'function') {
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (e) {}
    }
  }

  function getQuestionCount(subId) {
    if (window.TDV_QUIZ && typeof window.TDV_QUIZ.getTotalQuestionCountForSubject === 'function') {
      var c = window.TDV_QUIZ.getTotalQuestionCountForSubject(subId);
      if (c > 0) return c;
    }
    var raw = window.TDV_DATA ? window.TDV_DATA[subId] : null;
    if (Array.isArray(raw)) return raw.length;
    return 0;
  }

  // Icons SVG cho các môn học - đường nét tinh tế, chuẩn xác
  var ICONS = {
    globe: '<svg class="subject-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
    book: '<svg class="subject-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>',
    'trending-up': '<svg class="subject-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>',
    'bar-chart': '<svg class="subject-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"></line><line x1="18" y1="20" x2="18" y2="4"></line><line x1="6" y1="20" x2="6" y2="16"></line></svg>',
    award: '<svg class="subject-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>',
    briefcase: '<svg class="subject-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>'
  };

  var META_ICONS = {
    book: '<svg class="meta-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>',
    check: '<svg class="meta-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    search: '<svg class="empty-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>'
  };

  function renderSubjectCards() {
    var grid = document.getElementById('subject-grid');
    if (!grid) return;

    var allSubjects = (window.TDV_CONFIG && window.TDV_CONFIG.getAllSubjects)
      ? window.TDV_CONFIG.getAllSubjects()
      : [];

    var searchInput = document.getElementById('subject-search-input');
    var activeKeyword = searchInput ? searchInput.value.trim() : currentSearchKeyword;

    var filtered = allSubjects.filter(function (sub) {
      if (currentFilterPhase === 'midterm' && sub.phaseType !== 'midterm') return false;
      if (currentFilterPhase === 'final' && sub.phaseType !== 'final') return false;

      if (activeKeyword) {
        var cleanKw = removeVietnameseTones(activeKeyword);
        var subNameNorm = removeVietnameseTones(sub.name + ' ' + sub.code + ' ' + (sub.description || ''));
        if (subNameNorm.indexOf(cleanKw) === -1) return false;
      }
      return true;
    });

    var countBadge = document.getElementById('subjects-found-count');
    if (countBadge) {
      countBadge.textContent = filtered.length + ' môn học';
    }

    if (filtered.length === 0) {
      grid.innerHTML =
        '<div class="empty-state-card">' +
          '<div class="empty-icon-box">' + META_ICONS.search + '</div>' +
          '<h3>Không tìm thấy môn học phù hợp</h3>' +
          '<p>Hãy thử tìm kiếm với từ khóa khác hoặc bấm nút bên dưới để xem toàn bộ danh mục.</p>' +
          '<button type="button" class="btn-clear-filter" onclick="window.TDV_NAV.goHome()">Xem tất cả 6 môn học</button>' +
        '</div>';
      return;
    }

    var html = '';
    for (var i = 0; i < filtered.length; i++) {
      var s = filtered[i];
      var qCount = getQuestionCount(s.id);
      var phaseBadgeClass = s.phaseType === 'final' ? 'badge-final' : 'badge-midterm';
      var iconSvg = ICONS[s.icon] || ICONS.book;

      var tagsHtml = '';
      if (Array.isArray(s.tags)) {
        for (var t = 0; t < s.tags.length; t++) {
          tagsHtml += '<span class="course-chip">' + s.tags[t] + '</span>';
        }
      }

      html +=
        '<div class="course-card" data-subject-id="' + s.id + '">' +
          '<div class="course-card-top">' +
            '<div class="subject-icon-box">' +
              iconSvg +
            '</div>' +
            '<div class="badge-cluster">' +
              '<span class="badge-phase ' + phaseBadgeClass + '">' + (s.phase || 'Học phần') + '</span>' +
              '<span class="badge-free">Miễn phí</span>' +
            '</div>' +
          '</div>' +
          '<div class="course-card-body">' +
            '<div class="course-code-tag">' + s.code + '</div>' +
            '<h3 class="course-title">' + s.name + '</h3>' +
            '<div class="course-meta">' +
              '<span class="meta-item">' + META_ICONS.book + ' ' + qCount + ' câu trắc nghiệm</span>' +
              '<span class="meta-item">' + META_ICONS.check + ' Trọn bộ đáp án</span>' +
            '</div>' +
            '<p class="course-desc">' + (s.description || '') + '</p>' +
            '<div class="course-tags-row">' + tagsHtml + '</div>' +
          '</div>' +
          '<div class="card-action-bar">' +
            '<button type="button" class="btn-start-quiz" data-subject-id="' + s.id + '">' +
              '<span>Vào ôn luyện ngay</span>' +
              '<svg class="btn-arrow-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>' +
            '</button>' +
          '</div>' +
        '</div>';
    }

    grid.innerHTML = html;

    var cards = grid.querySelectorAll('.course-card');
    cards.forEach(function (c) {
      c.addEventListener('click', function () {
        var subId = this.getAttribute('data-subject-id');
        if (window.TDV_QUIZ && typeof window.TDV_QUIZ.openSubject === 'function') {
          window.TDV_QUIZ.openSubject(subId);
        }
      });
    });
  }

  function setPhaseFilter(phase) {
    currentFilterPhase = phase;
    var filterBtns = document.querySelectorAll('.phase-filter-btn');
    filterBtns.forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-phase') === phase);
    });
    renderSubjectCards();
  }

  function handleSearchInput(e) {
    var raw = e ? e.target.value : '';
    currentSearchKeyword = raw.trim();
    renderSubjectCards();
  }

  function init() {
    var brandLogoBtn = document.getElementById('btn-brand-home');
    if (brandLogoBtn) brandLogoBtn.addEventListener('click', goHome);

    var btnQuizHome = document.getElementById('btn-quiz-home');
    if (btnQuizHome) btnQuizHome.addEventListener('click', goHome);

    var btnHeaderHome = document.getElementById('btn-header-home');
    if (btnHeaderHome) btnHeaderHome.addEventListener('click', goHome);

    var searchInput = document.getElementById('subject-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', handleSearchInput);
    }

    var filterBtns = document.querySelectorAll('.phase-filter-btn');
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setPhaseFilter(this.getAttribute('data-phase'));
      });
    });

    renderSubjectCards();
  }

  window.TDV_NAV = {
    init: init,
    goHome: goHome,
    switchView: switchView,
    setPhaseFilter: setPhaseFilter,
    renderSubjectCards: renderSubjectCards
  };
})(window, document);
