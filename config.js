(function (window) {
  'use strict';

  window.TDV_DATA = window.TDV_DATA || {};

  var DEFAULT_TABS = [
    { id: 'de1', label: 'Đề 1', aliases: ['de1', 'de_1', 'de 1', 'đề 1', '1', 'exam1'] },
    { id: 'de2', label: 'Đề 2', aliases: ['de2', 'de_2', 'de 2', 'đề 2', '2', 'exam2'] },
    { id: 'giuaky', label: 'Giữa kỳ', aliases: ['giuaky', 'giua_ky', 'giữa kỳ', 'gk', 'midterm'] },
    { id: 'ontap', label: 'Ôn tập toàn bộ', aliases: ['ontap', 'on_tap', 'ôn tập', 'all', 'tonghop', 'cuoiky'] }
  ];

  // 7 TAB PHÂN LOẠI CHUYÊN SÂU CHO TIẾNG ANH 1 (290 CÂU)
  var TA1_TABS = [
    {
      id: 'review_final',
      label: 'Đề cương cuối kì (56 câu)',
      aliases: ['review_final', 'review', 'final', 'decuong', 'de_cuong', 'review_final_hp1']
    },
    {
      id: 'reading',
      label: 'Đọc hiểu 100% (25 câu)',
      aliases: ['reading', 'doc_hieu', 'dochieu', 'a_doc_hieu', 'reading_comprehension']
    },
    {
      id: 'cloze',
      label: 'Đục lỗ (50 câu)',
      aliases: ['cloze', 'duc_lo', 'duclo', 'a_duc_lo', 'cloze_test']
    },
    {
      id: 'signs',
      label: 'Biển báo giao tiếp (43 câu)',
      aliases: ['signs', 'sign', 'notice', 'notices', 'bien_bao', 'bienbao', 'a_bien_bao_ta1']
    },
    {
      id: 'grammar',
      label: 'Ngữ pháp & Từ vựng (93 câu)',
      aliases: ['grammar', 'vocab', 'grammar_vocab', 'ngu_phap', 'nguphap', 'tu_vung']
    },
    {
      id: 'listening',
      label: 'Luyện nghe HP1 (23 câu)',
      aliases: ['listening', 'nghe', 'phan_nghe', 'phan_nghe_hp1', 'audio']
    },
    {
      id: 'ontap',
      label: 'Tổng hợp toàn bộ TA1 (290 câu)',
      aliases: ['ontap', 'on_tap', 'all', 'tonghop']
    }
  ];

  // 4 TAB CHO MÔN LẬP DỰ ÁN ĐẦU TƯ (55 CÂU)
  var LPDA_TABS = [
    {
      id: 'chuong1_2',
      label: 'Chương 1 & 2: Tổng quan & Trình tự (15 câu)',
      aliases: ['chuong1_2', 'de1', 'chuong1', 'chuong2', 'ch1', 'ch2']
    },
    {
      id: 'chuong3',
      label: 'Chương 3: Căn cứ & Thị trường (20 câu)',
      aliases: ['chuong3', 'de2', 'ch3', 'thitruong']
    },
    {
      id: 'thuchanh',
      label: 'Trắc nghiệm Thực hành (20 câu)',
      aliases: ['thuchanh', 'giuaky', 'thuc_hanh', 'gk']
    },
    {
      id: 'ontap',
      label: 'Ôn tập toàn bộ học phần (55 câu)',
      aliases: ['ontap', 'on_tap', 'all', 'cuoiky', 'tonghop']
    }
  ];

  // 3 TAB CHO CHỦ NGHĨA XÃ HỘI KHOA HỌC (382 CÂU)
  var CNXH_TABS = [
    { id: 'de1', label: 'Đề 1: Tổng hợp Cuối Kì (40)', aliases: ['de1', 'de_1', '1'] },
    { id: 'de2', label: 'Đề 2: Tổng hợp Cuối Kì (40)', aliases: ['de2', 'de_2', '2'] },
    { id: 'ontap', label: 'Ôn tập toàn bộ 7 chương (382 câu)', aliases: ['ontap', 'on_tap', 'all', 'cuoiky'] }
  ];

  // 4 TAB CHO KINH TẾ VI MÔ (117 CÂU)
  var KTVM_TABS = [
    { id: 'de1', label: 'Đề thi Giữa kỳ lần 1 (30)', aliases: ['de1', 'de_1', 'midterm'] },
    { id: 'de2', label: 'Đề thi Giữa kỳ lần 2 (30)', aliases: ['de2', 'de_2'] },
    { id: 'giuaky', label: 'Ôn tập trọng tâm (30)', aliases: ['giuaky', 'ontap'] },
    { id: 'ontap', label: 'Tổng hợp toàn bộ kiến thức (117 câu)', aliases: ['all', 'tonghop', 'cuoiky'] }
  ];

  // DANH MỤC 6 MÔN HỌC - HOÀN TOÀN MIỄN PHÍ, MỞ KHÓA 100%
  var SUBJECTS_CONFIG = [
    {
      id: 'ta1',
      code: 'TA1',
      name: 'Tiếng Anh 1',
      phase: 'Giữa kỳ & Cuối kỳ',
      phaseType: 'midterm',
      examTypes: ['giuaky', 'cuoiky'],
      icon: 'globe',
      color: '#3b82f6',
      badgeGradient: 'from-blue-500 to-indigo-600',
      description: 'Trọn bộ tài liệu Học phần 1: Đề cương Review Final, Đọc hiểu 100%, Đục lỗ, Biển báo giao tiếp, Ngữ pháp - Từ vựng và Phần nghe.',
      tags: ['Đề cương Review (56)', 'Đọc hiểu 100% (25)', 'Đục lỗ (50)', 'Biển báo (43)', 'Ngữ pháp (93)', 'Luyện nghe (23)'],
      tabs: TA1_TABS
    },
    {
      id: 'cnxh',
      code: 'CNXH',
      name: 'Chủ Nghĩa Xã Hội Khoa Học',
      phase: 'Cuối kỳ',
      phaseType: 'final',
      examTypes: ['cuoiky'],
      icon: 'book',
      color: '#ef4444',
      badgeGradient: 'from-red-500 to-rose-600',
      description: 'Ngân hàng đề thi trắc nghiệm kết thúc học phần đầy đủ 7 chương lý luận chính trị và đề thi chuẩn.',
      tags: ['Đề 1 Cuối Kì (40)', 'Đề 2 Cuối Kì (40)', '7 Chương lý luận (302)'],
      tabs: CNXH_TABS
    },
    {
      id: 'vimo',
      code: 'VIMO',
      name: 'Kinh Tế Vĩ Mô',
      phase: 'Cuối kỳ',
      phaseType: 'final',
      examTypes: ['cuoiky'],
      icon: 'trending-up',
      color: '#06b6d4',
      badgeGradient: 'from-cyan-500 to-teal-600',
      description: 'GDP, lạm phát, thất nghiệp, chính sách tài khóa, chính sách tiền tệ và cán cân thanh toán quốc tế.',
      tags: ['Đề 1 Chuẩn thi', 'Đề 2 Chuẩn thi', 'Giữa kỳ', 'Ôn tập 398 câu'],
      tabs: DEFAULT_TABS
    },
    {
      id: 'ktvm',
      code: 'KTVM',
      name: 'Kinh Tế Vi Mô',
      phase: 'Giữa kỳ & Cuối kỳ',
      phaseType: 'midterm',
      examTypes: ['giuaky', 'cuoiky'],
      icon: 'bar-chart',
      color: '#8b5cf6',
      badgeGradient: 'from-purple-500 to-violet-600',
      description: 'Lý thuyết cung cầu, độ co giãn, lý thuyết hành vi người tiêu dùng, chi phí sản xuất & các cấu trúc thị trường.',
      tags: ['Giữa kỳ lần 1 (30)', 'Giữa kỳ lần 2 (30)', 'Ôn tập trọng tâm (30)', 'Tổng hợp (117)'],
      tabs: KTVM_TABS
    },
    {
      id: 'vhkd',
      code: 'VHKD',
      name: 'Văn Hóa Kinh Doanh',
      phase: 'Cuối kỳ',
      phaseType: 'final',
      examTypes: ['cuoiky'],
      icon: 'award',
      color: '#f59e0b',
      badgeGradient: 'from-amber-500 to-orange-600',
      description: 'Học phần văn hóa doanh nghiệp, triết lý kinh doanh, phong cách lãnh đạo và đạo đức nghề nghiệp.',
      tags: ['Khái luận VHKD', 'Triết lý Kinh doanh', 'Đạo đức & Trách nhiệm Xã hội', 'Tổng hợp 142 câu'],
      tabs: DEFAULT_TABS
    },
    {
      id: 'lpda',
      code: 'LPDA',
      name: 'Lập Dự Án Đầu Tư',
      phase: 'Cuối kỳ',
      phaseType: 'final',
      examTypes: ['cuoiky'],
      icon: 'briefcase',
      color: '#10b981',
      badgeGradient: 'from-emerald-500 to-teal-600',
      description: 'Trọn bộ 55 câu trắc nghiệm bám sát đề cương 100%, nghiên cứu thị trường, kỹ thuật và tài chính dự án.',
      tags: ['Chương 1 & 2: Tổng quan (15)', 'Chương 3: Căn cứ & Thị trường (20)', 'Trắc nghiệm Thực hành (20)'],
      tabs: LPDA_TABS
    }
  ];

  function getSubjectById(subjectId) {
    if (!subjectId) return null;
    for (var i = 0; i < SUBJECTS_CONFIG.length; i++) {
      if (SUBJECTS_CONFIG[i].id === subjectId) {
        return SUBJECTS_CONFIG[i];
      }
    }
    return null;
  }

  window.TDV_CONFIG = {
    SUBJECTS_CONFIG: SUBJECTS_CONFIG,
    DEFAULT_TABS: DEFAULT_TABS,
    TA1_TABS: TA1_TABS,
    LPDA_TABS: LPDA_TABS,
    CNXH_TABS: CNXH_TABS,
    KTVM_TABS: KTVM_TABS,
    getAllSubjects: function () {
      return SUBJECTS_CONFIG.slice();
    },
    getSubjectById: getSubjectById
  };
})(window);
