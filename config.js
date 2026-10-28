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

  // 4 TAB CHO MÔN LẬP DỰ ÁN ĐẦU TƯ (115 CÂU)
  var LPDA_TABS = [
    {
      id: 'chuong1_2',
      label: 'Chương 1 & 2: Tổng quan & Trình tự (55 câu)',
      aliases: ['chuong1_2', 'de1', 'chuong1', 'chuong2', 'ch1', 'ch2']
    },
    {
      id: 'chuong3',
      label: 'Chương 3: Căn cứ & Thị trường (40 câu)',
      aliases: ['chuong3', 'de2', 'ch3', 'thitruong']
    },
    {
      id: 'thuchanh',
      label: 'Trắc nghiệm Thực hành (20 câu)',
      aliases: ['thuchanh', 'giuaky', 'thuc_hanh', 'gk']
    },
    {
      id: 'ontap',
      label: 'Ôn tập toàn bộ học phần (115 câu)',
      aliases: ['ontap', 'on_tap', 'all', 'cuoiky', 'tonghop']
    }
  ];

  // 4 TAB CHO HỆ THỐNG THUẾ VIỆT NAM (246 CÂU)
  var THUE_TABS = [
    { id: 'chuong1', label: 'Chương 1: Tổng quan về Thuế (25 câu)', aliases: ['chuong1', 'ch1', 'tongquan'] },
    { id: 'chuong2', label: 'Chương 2: Thuế XNK (113 câu)', aliases: ['chuong2', 'ch2', 'xnk'] },
    { id: 'chuong3', label: 'Chương 3: Thuế TTĐB (108 câu)', aliases: ['chuong3', 'ch3', 'ttdb'] },
    { id: 'ontap', label: 'Tổng hợp toàn bộ 3 chương (246 câu)', aliases: ['ontap', 'on_tap', 'all', 'tonghop', 'cuoiky'] }
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
    { id: 'giuaky', label: 'Ôn tập trọng tâm (30 câu)', aliases: ['giuaky', 'giua_ky', 'trongtam'] },
    { id: 'ontap', label: 'Tổng hợp toàn bộ kiến thức (117 câu)', aliases: ['ontap', 'on_tap', 'all', 'tonghop', 'cuoiky'] }
  ];

  // DANH MỤC 9 MÔN HỌC - BẢNG MÀU THANH LỊCH, TINH TẾ
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
      color: '#475569',
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
      color: '#0284c7',
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
      color: '#6366f1',
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
      color: '#0d9488',
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
      color: '#059669',
      description: 'Trọn bộ 115 câu trắc nghiệm bám sát đề cương 100%, nghiên cứu thị trường, kỹ thuật và tài chính dự án.',
      tags: ['Chương 1 & 2: Tổng quan (55)', 'Chương 3: Căn cứ & Thị trường (40)', 'Trắc nghiệm Thực hành (20)', 'Tổng hợp (115)'],
      tabs: LPDA_TABS
    },
    {
      id: 'thue',
      code: 'THUE',
      name: 'Hệ Thống Thuế Việt Nam',
      phase: 'Giữa kỳ & Cuối kỳ',
      phaseType: 'midterm',
      examTypes: ['giuaky', 'cuoiky'],
      icon: 'file-text',
      color: '#ea580c',
      description: 'Trọn bộ 246 câu trắc nghiệm tổng quan về thuế, thuế xuất khẩu, nhập khẩu và thuế tiêu thụ đặc biệt.',
      tags: ['Chương 1: Tổng quan (25)', 'Chương 2: Thuế XNK (113)', 'Chương 3: Thuế TTĐB (108)', 'Tổng hợp (246)'],
      tabs: THUE_TABS
    },
    {
      id: 'hsk1',
      code: 'HSK1',
      name: 'Tiếng Trung HSK 1 (CTI)',
      phase: 'Chứng chỉ CTI',
      phaseType: 'midterm',
      examTypes: ['giuaky', 'cuoiky'],
      icon: 'globe',
      color: '#dc2626',
      description: 'Trọn bộ 10 đề thi chuẩn Hanban CTI quốc tế (400 câu hỏi), giọng phát âm Bắc Kinh chuẩn, chấm điểm tự động thang 200 điểm.',
      tags: ['10 Đề thi CBT (400 câu)', '20 câu Nghe hiểu', '20 câu Đọc hiểu', '150 Từ vựng Hanban'],
      tabs: []
    },
    {
      id: 'hsk2',
      code: 'HSK2',
      name: 'Tiếng Trung HSK 2 (CTI)',
      phase: 'Chứng chỉ CTI',
      phaseType: 'final',
      examTypes: ['cuoiky'],
      icon: 'award',
      color: '#b91c1c',
      description: 'Trọn bộ 10 đề thi thực chiến HSK 2 (600 câu hỏi), ma trận 60 câu/đề (35 Nghe + 25 Đọc), bám sát 770+ từ vựng và cấu trúc ngữ pháp.',
      tags: ['10 Đề thi CBT (600 câu)', '35 câu Nghe hiểu', '25 câu Đọc hiểu', '770+ Từ vựng CTI'],
      tabs: []
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
    THUE_TABS: THUE_TABS,
    CNXH_TABS: CNXH_TABS,
    KTVM_TABS: KTVM_TABS,
    getAllSubjects: function () {
      return SUBJECTS_CONFIG.slice();
    },
    getSubjectById: getSubjectById
  };
})(typeof window !== 'undefined' ? window : this);
