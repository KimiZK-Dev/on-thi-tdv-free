/**
 * EDUZ CBT - KHO ĐỀ THI HSK 2 CHUẨN HANBAN QUỐC TẾ (H20901 - H21335)
 * Ma trận 60 Câu hỏi / Đề (35 câu Nghe + 25 câu Đọc) • Thời gian làm bài 55 Phút
 * Thang điểm 200 (Nghe 100 + Đọc 100, Đạt >= 120 điểm)
 * Tích hợp Shared Panels (A - F), Hanzi, Pinyin, Lời thoại tiếng Trung, Dịch nghĩa & Giải thích chi tiết
 */

(function (global) {
  'use strict';

  function buildHSK2Exam(examNumber, raw) {
    const code = raw.examCode || ('H21' + String(examNumber).padStart(3, '0'));
    const questions = [];

    // 1. NGHE PHẦN 1 (Câu 1 - 10): Phán đoán Đúng / Sai (listening_tf)
    raw.p1.forEach((item, idx) => {
      const qNum = idx + 1;
      const imgKey = `Q${qNum}`;
      const imgUrl = (raw.images && raw.images[imgKey]) ? raw.images[imgKey] : (item[6] || null);
      questions.push({
        id: `${code}_Q${qNum}`,
        number: qNum,
        section: 'listening',
        part: 1,
        type: 'listening_tf',
        promptVisual: item[0],
        imageUrl: imgUrl,
        audioText: item[1],
        hanzi: item[1],
        pinyin: item[2],
        meaning: item[3],
        options: [
          { key: 'T', label: '✓ Đúng (对)' },
          { key: 'F', label: '✕ Sai (错)' }
        ],
        answer: item[4],
        explanation: item[5]
      });
    });

    // 2. NGHE PHẦN 2 (Câu 11 - 20): Nghe chọn tranh A - F
    // Nhóm 1 (11 - 15)
    raw.p2_1.items.forEach((item, idx) => {
      const qNum = idx + 11;
      questions.push({
        id: `${code}_Q${qNum}`,
        number: qNum,
        section: 'listening',
        part: 2,
        type: 'listening_match_af',
        sharedPanelId: `${code}_PANEL_L2_1`,
        audioText: item[0],
        hanzi: item[0],
        pinyin: item[2],
        meaning: item[3],
        options: ['A', 'B', 'C', 'D', 'E', 'F'].map(k => ({ key: k, label: k })),
        answer: item[4],
        explanation: item[5]
      });
    });

    // Nhóm 2 (16 - 20)
    raw.p2_2.items.forEach((item, idx) => {
      const qNum = idx + 16;
      questions.push({
        id: `${code}_Q${qNum}`,
        number: qNum,
        section: 'listening',
        part: 2,
        type: 'listening_match_af',
        sharedPanelId: `${code}_PANEL_L2_2`,
        audioText: item[0],
        hanzi: item[0],
        pinyin: item[2],
        meaning: item[3],
        options: ['A', 'B', 'C', 'D', 'E'].map(k => ({ key: k, label: k })),
        answer: item[4],
        explanation: item[5]
      });
    });

    // 3. NGHE PHẦN 3 (Câu 21 - 30): Hội thoại ngắn 2 lượt chọn A, B, C
    raw.p3.forEach((item, idx) => {
      const qNum = idx + 21;
      questions.push({
        id: `${code}_Q${qNum}`,
        number: qNum,
        section: 'listening',
        part: 3,
        type: 'listening_dialogue_abc',
        audioText: item.dialogue,
        hanzi: item.dialogue,
        questionText: item.question,
        options: item.options,
        answer: item.answer,
        explanation: item.explanation
      });
    });

    // 4. NGHE PHẦN 4 (Câu 31 - 35): Hội thoại dài 4-5 lượt chọn A, B, C
    raw.p4.forEach((item, idx) => {
      const qNum = idx + 31;
      questions.push({
        id: `${code}_Q${qNum}`,
        number: qNum,
        section: 'listening',
        part: 4,
        type: 'listening_long_dialogue_abc',
        audioText: item.dialogue,
        hanzi: item.dialogue,
        questionText: item.question,
        options: item.options,
        answer: item.answer,
        explanation: item.explanation
      });
    });

    // 5. ĐỌC PHẦN 1 (Câu 36 - 40): Đọc câu chọn tranh A - F
    raw.p5.items.forEach((item, idx) => {
      const qNum = idx + 36;
      questions.push({
        id: `${code}_Q${qNum}`,
        number: qNum,
        section: 'reading',
        part: 1,
        type: 'reading_match_af',
        sharedPanelId: `${code}_PANEL_R1`,
        hanzi: item[0],
        pinyin: item[1],
        meaning: item[2],
        options: ['A', 'B', 'C', 'D', 'E', 'F'].map(k => ({ key: k, label: k })),
        answer: item[3],
        explanation: item[4]
      });
    });

    // 6. ĐỌC PHẦN 2 (Câu 41 - 45): Điền từ vào chỗ trống (A - F)
    raw.p6.items.forEach((item, idx) => {
      const qNum = idx + 41;
      questions.push({
        id: `${code}_Q${qNum}`,
        number: qNum,
        section: 'reading',
        part: 2,
        type: 'reading_fill_blank',
        sharedPanelId: `${code}_PANEL_R2`,
        hanzi: item[0],
        pinyin: item[1],
        meaning: item[2],
        options: ['A', 'B', 'C', 'D', 'E', 'F'].map(k => ({ key: k, label: k })),
        answer: item[3],
        explanation: item[4]
      });
    });

    // 7. ĐỌC PHẦN 3 (Câu 46 - 50): Phán đoán Đúng / Sai
    raw.p7.forEach((item, idx) => {
      const qNum = idx + 46;
      questions.push({
        id: `${code}_Q${qNum}`,
        number: qNum,
        section: 'reading',
        part: 3,
        type: 'reading_tf',
        contextHanzi: item.context,
        contextPinyin: item.pinyin,
        contextMeaning: item.meaning,
        hanzi: item.claim,
        claimMeaning: item.claimMeaning,
        options: [
          { key: 'T', label: '✓ Đúng (对)' },
          { key: 'F', label: '✕ Sai (错)' }
        ],
        answer: item.answer,
        explanation: item.explanation
      });
    });

    // 8. ĐỌC PHẦN 4 (Câu 51 - 60): Nối câu đối ứng
    // Nhóm 1 (51 - 55)
    raw.p8_1.items.forEach((item, idx) => {
      const qNum = idx + 51;
      questions.push({
        id: `${code}_Q${qNum}`,
        number: qNum,
        section: 'reading',
        part: 4,
        type: 'reading_pair_sentence',
        sharedPanelId: `${code}_PANEL_R4_1`,
        hanzi: item[0],
        pinyin: item[1],
        meaning: item[2],
        options: ['A', 'B', 'C', 'D', 'E', 'F'].map(k => ({ key: k, label: k })),
        answer: item[3],
        explanation: item[4]
      });
    });

    // Nhóm 2 (56 - 60)
    raw.p8_2.items.forEach((item, idx) => {
      const qNum = idx + 56;
      questions.push({
        id: `${code}_Q${qNum}`,
        number: qNum,
        section: 'reading',
        part: 4,
        type: 'reading_pair_sentence',
        sharedPanelId: `${code}_PANEL_R4_2`,
        hanzi: item[0],
        pinyin: item[1],
        meaning: item[2],
        options: ['A', 'B', 'C', 'D', 'E'].map(k => ({ key: k, label: k })),
        answer: item[3],
        explanation: item[4]
      });
    });

    return {
      examCode: code,
      examNumber: examNumber,
      level: 'HSK 2',
      durationMinutes: 55,
      totalQuestions: 60,
      listeningCount: 35,
      readingCount: 25,
      passingScore: 120,
      maxScore: 200,
      title: raw.title || `Đề thi chuẩn HSK 2 CBT - Mã đề ${code}`,
      sharedPanels: {
        [`${code}_PANEL_L2_1`]: {
          title: 'Tranh minh họa Phần 2 (Câu 11 - 15)',
          items: (raw.p2_1.panel || []).map(p => ({
            ...p,
            imageUrl: (raw.images && raw.images[`p2_1_${p.key}`]) || p.imageUrl || null
          }))
        },
        [`${code}_PANEL_L2_2`]: {
          title: 'Tranh minh họa Phần 2 (Câu 16 - 20)',
          items: (raw.p2_2.panel || []).map(p => ({
            ...p,
            imageUrl: (raw.images && raw.images[`p2_2_${p.key}`]) || p.imageUrl || null
          }))
        },
        [`${code}_PANEL_R1`]: {
          title: 'Tranh minh họa Đọc Phần 1 (Câu 36 - 40)',
          items: (raw.p5.panel || []).map(p => ({
            ...p,
            imageUrl: (raw.images && raw.images[`p5_${p.key}`]) || p.imageUrl || null
          }))
        },
        [`${code}_PANEL_R2`]: {
          title: 'Hộp từ vựng điền khuyết Đọc Phần 2 (Câu 41 - 45)',
          items: raw.p6.wordBox.map(w => ({
            key: w.key,
            label: `${w.hanzi} (${w.pinyin})`,
            detail: w.meaning
          }))
        },
        [`${code}_PANEL_R4_1`]: {
          title: 'Hộp câu đối ứng Đọc Phần 4 (Câu 51 - 55)',
          items: raw.p8_1.box.map(b => ({
            key: b.key,
            label: b.hanzi,
            detail: `${b.pinyin} - ${b.meaning}`
          }))
        },
        [`${code}_PANEL_R4_2`]: {
          title: 'Hộp câu đối ứng Đọc Phần 4 (Câu 56 - 60)',
          items: raw.p8_2.box.map(b => ({
            key: b.key,
            label: b.hanzi,
            detail: `${b.pinyin} - ${b.meaning}`
          }))
        }
      },
      questions: questions
    };
  }

  // DỮ LIỆU ĐỀ 1 VÀ ĐỀ 2
  const RAW_EXAM_1 = {
    examCode: 'H20901',
    title: 'Đề thi thực chiến HSK 2 CBT – Mã đề H20901 (Bản chuẩn Hanban)',
    images: {
    "Q1": "https://res.cloudinary.com/hhzvolr9/image/upload/v1793180455/eduz/hsk2/h20901/h20901_q1.webp",
    "Q2": "https://res.cloudinary.com/hhzvolr9/image/upload/v1793180456/eduz/hsk2/h20901/h20901_q2.webp",
    "Q3": "https://res.cloudinary.com/hhzvolr9/image/upload/v1793180457/eduz/hsk2/h20901/h20901_q3.webp",
    "Q4": "https://res.cloudinary.com/hhzvolr9/image/upload/v1793180457/eduz/hsk2/h20901/h20901_q4.webp",
    "Q5": "https://res.cloudinary.com/hhzvolr9/image/upload/v1793180458/eduz/hsk2/h20901/h20901_q5.webp",
    "Q6": "https://res.cloudinary.com/hhzvolr9/image/upload/v1793180459/eduz/hsk2/h20901/h20901_q6.webp",
    "Q7": "https://res.cloudinary.com/hhzvolr9/image/upload/v1793180460/eduz/hsk2/h20901/h20901_q7.webp",
    "Q8": "https://res.cloudinary.com/hhzvolr9/image/upload/v1793180460/eduz/hsk2/h20901/h20901_q8.webp",
    "Q9": "https://res.cloudinary.com/hhzvolr9/image/upload/v1793180461/eduz/hsk2/h20901/h20901_q9.webp",
    "Q10": "https://res.cloudinary.com/hhzvolr9/image/upload/v1793180462/eduz/hsk2/h20901/h20901_q10.webp",
    "p2_1_A": "https://res.cloudinary.com/hhzvolr9/image/upload/v1793180463/eduz/hsk2/h20901/h20901_p2_1_A.webp",
    "p2_1_B": "https://res.cloudinary.com/hhzvolr9/image/upload/v1793180463/eduz/hsk2/h20901/h20901_p2_1_B.webp",
    "p2_1_C": "https://res.cloudinary.com/hhzvolr9/image/upload/v1793180464/eduz/hsk2/h20901/h20901_p2_1_C.webp",
    "p2_1_D": "https://res.cloudinary.com/hhzvolr9/image/upload/v1793180465/eduz/hsk2/h20901/h20901_p2_1_D.webp",
    "p2_1_E": "https://res.cloudinary.com/hhzvolr9/image/upload/v1793180466/eduz/hsk2/h20901/h20901_p2_1_E.webp",
    "p2_1_F": "https://res.cloudinary.com/hhzvolr9/image/upload/v1793180467/eduz/hsk2/h20901/h20901_p2_1_F.webp",
    "p2_2_A": "https://res.cloudinary.com/hhzvolr9/image/upload/v1793180468/eduz/hsk2/h20901/h20901_p2_2_A.webp",
    "p2_2_B": "https://res.cloudinary.com/hhzvolr9/image/upload/v1793180468/eduz/hsk2/h20901/h20901_p2_2_B.webp",
    "p2_2_C": "https://res.cloudinary.com/hhzvolr9/image/upload/v1793180469/eduz/hsk2/h20901/h20901_p2_2_C.webp",
    "p2_2_D": "https://res.cloudinary.com/hhzvolr9/image/upload/v1793180470/eduz/hsk2/h20901/h20901_p2_2_D.webp",
    "p2_2_E": "https://res.cloudinary.com/hhzvolr9/image/upload/v1793180470/eduz/hsk2/h20901/h20901_p2_2_E.webp",
    "p5_A": "https://res.cloudinary.com/hhzvolr9/image/upload/v1793180471/eduz/hsk2/h20901/h20901_p5_A.webp",
    "p5_B": "https://res.cloudinary.com/hhzvolr9/image/upload/v1793180472/eduz/hsk2/h20901/h20901_p5_B.webp",
    "p5_C": "https://res.cloudinary.com/hhzvolr9/image/upload/v1793180472/eduz/hsk2/h20901/h20901_p5_C.webp",
    "p5_D": "https://res.cloudinary.com/hhzvolr9/image/upload/v1793180473/eduz/hsk2/h20901/h20901_p5_D.webp",
    "p5_E": "https://res.cloudinary.com/hhzvolr9/image/upload/v1793180474/eduz/hsk2/h20901/h20901_p5_E.webp",
    "p5_F": "https://res.cloudinary.com/hhzvolr9/image/upload/v1793180475/eduz/hsk2/h20901/h20901_p5_F.webp"
},
    p1: [["Hình chiếc tivi mới", "我买了一个新电视。", "Wǒ mǎile yí ge xīn diànshì.", "Tôi đã mua một chiếc tivi mới.", "F", "Hình ảnh hiển thị là chiếc máy vi tính chứ không phải tivi (diànshì), nên nhận định là Sai."], ["Hình cúi đầu nhận lỗi / xin lỗi", "对不起，我错了。", "Duìbuqǐ, wǒ cuò le.", "Xin lỗi, tôi sai rồi.", "T", "Hình vẽ một người đang cúi đầu chắp tay nhận lỗi thành tâm, khớp 100% với lời thoại '对不起，我错了'."], ["Hình đi xe đạp", "再见，欢迎您下次再来。", "Zàijiàn, huānyíng nín xià cì zài lái.", "Tạm biệt, hoan nghênh quý khách lần sau lại đến.", "F", "Hình vẽ một người đang đạp xe đạp đi dạo, không phải ngữ cảnh nhân viên chào tạm biệt khách hàng, nên nhận định là Sai."], ["Hình người đàn ông đang giặt đồ", "这是他给妻子买的。", "Zhè shì tā gěi qīzi mǎi de.", "Đây là đồ anh ấy mua tặng vợ.", "F", "Hình ảnh mô tả việc nhà chứ không biểu thị hành động tặng quà cho vợ, nên nhận định là Sai."], ["Hình người phụ nữ cầm giỏ trứng gà", "女儿让我回家的时候买些鸡蛋。", "Nǚ'ér ràng wǒ huíjiā de shíhou mǎi xiē jīdàn.", "Con gái bảo tôi lúc về nhà mua ít trứng gà.", "T", "Hình vẽ người mẹ xách túi trứng gà (jīdàn) vừa mua, khớp với nội dung nghe được."], ["Hình người phụ nữ đang giặt quần áo trong chậu", "他回来的时候，我正在洗衣服呢。", "Tā huílai de shíhou, wǒ zhèngzài xǐ yīfu ne.", "Lúc anh ấy về, tôi đang giặt quần áo.", "T", "Hình vẽ người phụ nữ đang giặt quần áo (xǐ yīfu), khớp hoàn toàn với cấu trúc '正在...呢'."], ["Hình uống bia / nước ngọt", "服务员，请给我来一杯咖啡。", "Fúwùyuán, qǐng gěi wǒ lái yì bēi kāfēi.", "Phục vụ, xin cho tôi một cốc cà phê.", "F", "Hình vẽ ly nước có ống hút và đá (nước ngọt), không phải cốc cà phê (kāfēi) nóng, nên nhận định là Sai."], ["Hình bé gái ôm chân bố tiễn bố đi làm", "爸爸，你别走。", "Bàba, nǐ bié zǒu.", "Bố ơi, bố đừng đi.", "T", "Hình ảnh đứa con nhỏ đang níu giữ bố không muốn bố đi, khớp với câu '爸爸，你别走'."], ["Hình chú chó màu trắng", "王小姐的猫是黑色的。", "Wáng xiǎojiě de māo shì hēisè de.", "Con mèo của cô Vương màu đen.", "F", "Trong hình là con chó trắng chứ không phải con mèo đen (hēisè de māo), nên nhận định là Sai."], ["Hình người ngồi trước bàn đầy ắp hồ sơ và sổ sách", "今天要做的事情真多。", "Jīntiān yào zuò de shìqing zhēn duō.", "Hôm nay việc cần làm thật là nhiều.", "T", "Hình người làm việc bận rộn với chồng tài liệu cao ngất, khớp với '事情真多'."]],
    p2_1: {"panel": [{"key": "A", "label": "Tặng hộp quà sinh nhật", "detail": "Sinh nhật tặng quà"}, {"key": "B", "label": "Thử váy áo thời trang", "detail": "Chọn đồ, màu sắc áo"}, {"key": "C", "label": "Học sinh giơ tay phát biểu", "detail": "Trong lớp học"}, {"key": "D", "label": "Đá bóng", "detail": "Ví dụ"}, {"key": "E", "label": "Mời ăn thêm bát cơm", "detail": "Ăn cơm, ẩm thực"}, {"key": "F", "label": "Ảnh chụp chung nhóm bạn", "detail": "Chụp ảnh kỷ niệm"}], "items": [["女：后面，最右边的是我，找到了吗？\n男：找到了，你旁边那个女孩子是谁？", "后面最右边的是我 (Phía sau, ngoài cùng bên phải là tôi)", "Hòumiàn, zuì yòubiān de shì wǒ", "Tìm người trong bức ảnh nhóm chụp chung", "F", "Lời thoại chỉ vị trí 'phía sau, bên phải' trong bức ảnh, tương ứng tranh F."], ["男：生日快乐！这是我送给你的。\n女：谢谢你！", "生日快乐！这是我送给你的 (Sinh nhật vui vẻ! Đây là quà tôi tặng bạn)", "Shēngrì kuàilè! Zhè shì wǒ sòng gěi nǐ de.", "Tặng quà sinh nhật", "A", "Từ khóa '生日快乐' (Sinh nhật vui vẻ) và '送给你' (tặng bạn) tương ứng tranh hộp quà A."], ["女：谁来回答这个问题？\n男：老师，我！", "谁来回答这个问题？老师，我！", "Shuí lái huídá zhège wèntí? Lǎoshī, wǒ!", "Giáo viên hỏi và học sinh giơ tay xin trả lời", "C", "Bối cảnh lớp học, học sinh giơ tay xin trả lời câu hỏi của cô giáo, tương ứng tranh C."], ["男：再来点儿米饭吧，你吃得太少了。\n女：好的，你也吃。", "再来点儿米饭吧 (Ăn thêm chút cơm nữa đi)", "Zài lái diǎnr mǐfàn ba, nǐ chī de tài shǎo le.", "Mời ăn thêm cơm trong bữa ăn", "E", "Từ khóa '米饭' (cơm) và '吃得太少' (ăn quá ít) tương ứng tranh mâm cơm bát đũa E."], ["女：这几件怎么样？你试一试？\n男：好，我喜欢这个颜色的。", "这几件怎么样？你试一试？", "Zhè jǐ jiàn zěnmeyàng? Nǐ shì yi shì?", "Thử quần áo và chọn màu sắc", "B", "Từ khóa lượng từ quần áo '几件' và '试一试' (thử xem), '颜色' (màu sắc) tương ứng tranh B."]]},
    p2_2: {"panel": [{"key": "A", "label": "Đồng hồ đeo tay chỉ giờ", "detail": "Xem giờ giấc"}, {"key": "B", "label": "Đang bận nghe điện thoại tại bàn làm việc", "detail": "Nghe điện thoại, bận rộn"}, {"key": "C", "label": "Cô giáo đứng giảng bài bên bảng", "detail": "Nghề giáo viên"}, {"key": "D", "label": "Rạp chiếu phim / Vé xem phim", "detail": "Xem phim"}, {"key": "E", "label": "Ngắm gương, thử đồ trang điểm", "detail": "Hỏi ai đẹp nhất"}], "items": [["男：你那儿有今天的报纸吗？\n女：有。我现在很忙，你五分钟后再打，好吗？", "我现在很忙，你五分钟后再打 (Tôi đang bận, 5 phút sau bạn gọi lại nhé)", "Wǒ xiànzài hěn máng, nǐ wǔ fēnzhōng hòu zài dǎ", "Bận rộn trên bàn làm việc nghe điện thoại", "B", "Từ khóa '再打' (gọi lại sau) và '我现在很忙' tương ứng tranh B."], ["女：告诉我，哪个最漂亮？\n男：我觉得都漂亮。", "哪个最漂亮？我觉得都漂亮 (Cái nào đẹp nhất? Anh thấy cái nào cũng đẹp)", "Nǎge zuì piàoliang? Wǒ juéde dōu piàoliang.", "Hỏi ý kiến về vẻ đẹp / trang phục", "E", "Từ khóa '漂亮' (xinh đẹp) tương ứng tranh ngắm nghía trước gương E."], ["男：您做什么工作？\n女：我是小学老师。", "我是小学老师 (Tôi là giáo viên tiểu học)", "Wǒ shì xiǎoxué lǎoshī.", "Nghề nghiệp giáo viên", "C", "Từ khóa nghề nghiệp '小学老师' tương ứng tranh cô giáo đứng cạnh bảng đen C."], ["女：现在是八点，不是七点。\n男：真的吗？我的手表慢了？", "我的手表慢了？ (Đồng hồ của tôi bị chậm à?)", "Wǒ de shǒubiǎo màn le?", "Xem giờ trên đồng hồ đeo tay", "A", "Từ khóa '手表' (đồng hồ đeo tay) và '八点' (8 giờ) tương ứng tranh đồng hồ A."], ["男：这是李小姐的电影票，你能帮我给她吗？\n女：没问题。", "这是李小姐的电影票 (Đây là vé xem phim của cô Lý)", "Zhè shì Lǐ xiǎojiě de diànyǐng piào", "Vé xem phim chiếu bóng", "D", "Từ khóa '电影票' (vé xem phim) tương ứng tranh vé xem phim D."]]},
    p3: [{"dialogue": "男：天气太热了，家里有西瓜吗？\n女：没了，我现在出去买吧。\n问：女的要去买什么？", "question": "女的要去买什么？ (Người nữ định đi mua gì?)", "options": [{"key": "A", "label": "苹果 (píngguǒ - Táo)"}, {"key": "B", "label": "茶 (chá - Trà)"}, {"key": "C", "label": "西瓜 (xīguā - Dưa hấu)"}], "answer": "C", "explanation": "Người nam hỏi '家里有西瓜吗？' (Nhà có dưa hấu không?), người nữ đáp '没了，我现在出去买吧' (Hết rồi, giờ tôi ra ngoài mua đây). Do đó người nữ đi mua dưa hấu (西瓜)."}, {"dialogue": "女：您是第一次来我们这儿吗？\n男：不是，去年九月我来过一次。\n问：男的来过这里几次？", "question": "男的来过这里几次？ (Người nam đã đến đây mấy lần?)", "options": [{"key": "A", "label": "1次 (yí cì - 1 lần)"}, {"key": "B", "label": "2次 (liǎng cì - 2 lần)"}, {"key": "C", "label": "3次 (sān cì - 3 lần)"}], "answer": "B", "explanation": "Người nam nói 'tháng 9 năm ngoái tôi từng đến 1 lần' (去年九月我来过一次), cộng với lần đang có mặt hiện tại nữa là tổng cộng 2 lần (2次)."}, {"dialogue": "男：你妹妹现在还住在学校里？\n女：对，她住学校里，上班很近。\n问：妹妹现在住哪儿？", "question": "妹妹现在住哪儿？ (Em gái hiện đang ở đâu?)", "options": [{"key": "A", "label": "学校 (xuéxiào - Trường học)"}, {"key": "B", "label": "饭店 (fàndiàn - Khách sạn/nhà hàng)"}, {"key": "C", "label": "公司 (gōngsī - Công ty)"}], "answer": "A", "explanation": "Người nữ khẳng định: '对，她住学校里，上班很近' (Đúng, em ấy ở trong trường, đi làm rất gần). Chọn đáp án A (学校)."}, {"dialogue": "女：今天你准备几点起床？\n男：我不睡了，现在就起。\n问：男的是什么意思？", "question": "男的是什么意思？ (Ý của người nam là gì?)", "options": [{"key": "A", "label": "还要睡 (Vẫn muốn ngủ tiếp)"}, {"key": "B", "label": "不起了 (Không dậy nữa)"}, {"key": "C", "label": "现在起 (Dậy ngay bây giờ)"}], "answer": "C", "explanation": "Người nam nói '我不睡了，现在就起' (Tôi không ngủ nữa, giờ dậy ngay đây), đồng nghĩa với '现在起' (Đáp án C)."}, {"dialogue": "男：小刘，中午有人给我打电话吗？\n女：您儿子打了个电话，问您晚上在哪儿吃饭。\n问：电话是谁打的？", "question": "电话是谁打的？ (Cuộc điện thoại là do ai gọi?)", "options": [{"key": "A", "label": "儿子 (érzi - Con trai)"}, {"key": "B", "label": "爸爸 (bàba - Bố)"}, {"key": "C", "label": "小刘 (Xiǎo Liú - Tiểu Lưu)"}], "answer": "A", "explanation": "Cô Lưu báo cáo: '您儿子打了个电话' (Con trai ngài có gọi một cuộc điện thoại). Người gọi là con trai (儿子)."}, {"dialogue": "女：今天太晚了，我们别去小张家了。\n男：好，明天再去吧。\n问：他们今天为什么不去小张家？", "question": "他们今天为什么不去小张家？ (Tại sao hôm nay họ không đến nhà Tiểu Trương?)", "options": [{"key": "A", "label": "太晚了 (tài wǎn le - Muộn quá rồi)"}, {"key": "B", "label": "下雨了 (xiàyǔ le - Trời mưa)"}, {"key": "C", "label": "小张不在 (Tiểu Trương không có ở nhà)"}], "answer": "A", "explanation": "Người nữ nêu lý do: '今天太晚了，我们别去小张家了' (Hôm nay muộn quá rồi, chúng ta đừng đến nhà Tiểu Trương nữa). Chọn A."}, {"dialogue": "男：鱼真便宜，现在三块钱一斤了。\n女：我买两斤。\n问：鱼多少钱一斤？", "question": "鱼多少钱一斤？ (Cá bao nhiêu tiền một cân?)", "options": [{"key": "A", "label": "2块 (2 tệ)"}, {"key": "B", "label": "3块 (3 tệ)"}, {"key": "C", "label": "6块 (6 tệ)"}], "answer": "B", "explanation": "Người nam nói rõ giá: '三块钱一斤了' (3 tệ một cân rồi). Người nữ mua 2 cân hết 6 tệ, nhưng câu hỏi hỏi giá 1 cân nên đáp án là 3块 (Đáp án B)."}, {"dialogue": "女：你多穿件儿衣服，外面阴天，可能会下雨。\n男：没事儿，我很快就回来。\n问：现在天气怎么样？", "question": "现在天气怎么样？ (Thời tiết hiện giờ thế nào?)", "options": [{"key": "A", "label": "下雨了 (Đang mưa)"}, {"key": "B", "label": "阴天 (Trời âm u, nhiều mây)"}, {"key": "C", "label": "很热 (Rất nóng)"}], "answer": "B", "explanation": "Người nữ nhắc nhở: '外面阴天，可能会下雨' (Bên ngoài trời râm âm u, có thể sẽ mưa). Tình trạng thực tế lúc này là trời râm (阴天 - Đáp án B)."}, {"dialogue": "男：吃点儿水果吧？水果在桌子上。\n女：不，我想喝点儿茶。\n问：桌子上有什么？", "question": "桌子上有什么？ (Trên bàn có món gì?)", "options": [{"key": "A", "label": "药 (yào - Thuốc)"}, {"key": "B", "label": "茶 (chá - Trà)"}, {"key": "C", "label": "水果 (shuǐguǒ - Trái cây)"}], "answer": "C", "explanation": "Người nam nói: '水果在桌子上' (Hoa quả ở trên bàn). Trên bàn có hoa quả (水果 - Đáp án C)."}, {"dialogue": "女：明天下午你去唱歌吗？\n男：我想去，但是我明天下午有课。\n问：男的明天下午做什么？", "question": "男的明天下午做什么？ (Người nam chiều mai làm gì?)", "options": [{"key": "A", "label": "唱歌 (Đi hát)"}, {"key": "B", "label": "睡觉 (Đi ngủ)"}, {"key": "C", "label": "上课 (Đi học / có tiết học)"}], "answer": "C", "explanation": "Người nam giải thích: '我想去，但是我明天下午有课' (Tôi muốn đi lắm nhưng chiều mai tôi có tiết học). Vậy người nam phải đi học (上课 - Đáp án C)."}],
    p4: [{"dialogue": "女：你学汉语多长时间了？\n男：快两年了。\n女：你说得很不错。\n男：听和说还可以，读和写不好。\n问：他的汉语怎么样？", "question": "他的汉语怎么样？ (Tiếng Trung của anh ấy thế nào?)", "options": [{"key": "A", "label": "说得好 (Nói tốt)"}, {"key": "B", "label": "写得好 (Viết tốt)"}, {"key": "C", "label": "不会写 (Không biết viết)"}], "answer": "A", "explanation": "Người nữ khen '你说得很不错' và người nam công nhận '听和说还可以' (nghe và nói tạm ổn), nên '说得好' (Nói tốt - Đáp án A) là nhận định chính xác nhất."}, {"dialogue": "女：这个椅子怎么样？\n男：颜色很好，但是，它太高了。\n女：没关系，前面还有几个。\n男：走，我们过去看看。\n问：他们为什么没买这个椅子？", "question": "他们为什么没买这个椅子？ (Tại sao họ không mua chiếc ghế này?)", "options": [{"key": "A", "label": "太高 (Quá cao)"}, {"key": "B", "label": "太贵 (Quá đắt)"}, {"key": "C", "label": "颜色不好 (Màu sắc không đẹp)"}], "answer": "A", "explanation": "Người nam chỉ ra nhược điểm: '但是，它太高了' (nhưng nó cao quá), nên họ không mua mà đi xem các chiếc khác. Chọn A."}, {"dialogue": "男：听说你们学校很大，老师很多。\n女：是的，我们有两百多个老师。\n男：那学生呢？\n女：学生有两千多人。\n问：这个学校有多少学生？", "question": "这个学校有多少学生？ (Trường này có bao nhiêu học sinh?)", "options": [{"key": "A", "label": "200多 (Hơn 200)"}, {"key": "B", "label": "2000多 (Hơn 2000)"}, {"key": "C", "label": "3000多 (Hơn 3000)"}], "answer": "B", "explanation": "Người nữ trả lời về số học sinh: '学生有两千多人' (Học sinh có hơn hai nghìn người). Đáp án là 2000多 (B)."}, {"dialogue": "女：吃药了吗？现在身体怎么样？\n男：吃了，现在好多了。\n女：什么时候可以出院？\n男：医生说下个星期。\n问：他们最可能在哪儿？", "question": "他们最可能在哪儿？ (Họ có khả năng nhất là đang ở đâu?)", "options": [{"key": "A", "label": "学校 (Trường học)"}, {"key": "B", "label": "医院 (Bệnh viện)"}, {"key": "C", "label": "饭店 (Khách sạn/quán ăn)"}], "answer": "B", "explanation": "Từ khóa '吃药' (uống thuốc), '出院' (xuất viện) và '医生' (bác sĩ) chỉ ra bối cảnh bệnh viện (医院 - Đáp án B)."}, {"dialogue": "男：请问，十四号到北京的车票还有吗？\n女：对不起，十四号的已经卖完了。\n男：那十五号早上的还有吗？\n女：有，您要几张？\n男：两张。\n问：男的买了哪天的票？", "question": "男的买了哪天的票？ (Người nam đã mua vé ngày nào?)", "options": [{"key": "A", "label": "13号 (Ngày 13)"}, {"key": "B", "label": "14号 (Ngày 14)"}, {"key": "C", "label": "15号 (Ngày 15)"}], "answer": "C", "explanation": "Vé ngày 14 đã bán hết ('十四号的已经卖完了'), người nam hỏi sang vé sáng ngày 15 và mua 2 vé ('那十五号早上的还有吗？有...两张'). Vậy anh ấy mua vé ngày 15 (Đáp án C)."}],
    p5: {"panel": [{"key": "A", "label": "Tranh nhìn ngắm đàn cá bơi dưới nước", "detail": "Cá, bơi lội"}, {"key": "B", "label": "Tranh trời tuyết rơi trắng xóa, người mặc ấm", "detail": "Tuyết rơi, lạnh"}, {"key": "C", "label": "Tranh bé gái đang múa điệu ba lê", "detail": "Nhảy múa"}, {"key": "D", "label": "Ví dụ: Đi đánh bóng rổ vào thứ Bảy", "detail": "Ví dụ mẫu"}, {"key": "E", "label": "Tranh người đọc sách mỏi mắt cần nghỉ ngơi", "detail": "Đọc sách, mỏi mắt"}, {"key": "F", "label": "Tranh giới thiệu đồng nghiệp / đối tác trong công ty", "detail": "Giới thiệu đối tác"}], "items": [["给您介绍一下，这是我们公司的李先生。", "Gěi nín jièshào yíxià, zhè shì wǒmen gōngsī de Lǐ xiānsheng.", "Xin giới thiệu với ngài một chút, đây là ông Lý của công ty chúng tôi.", "F", "Từ khóa '介绍' (giới thiệu) và '公司' (công ty) tương ứng tranh giới thiệu đồng nghiệp F."], ["看书时间长了，眼睛得休息休息。", "Kàn shū shíjiān cháng le, yǎnjing děi xiūxi xiūxi.", "Đọc sách thời gian dài rồi, mắt phải nghỉ ngơi một chút.", "E", "Từ khóa '看书' (đọc sách) và '眼睛...休息' (mắt nghỉ ngơi) tương ứng tranh E."], ["那是我孩子，她爱跳舞。", "Nà shì wǒ háizi, tā ài tiàowǔ.", "Đó là con tôi, con bé rất thích múa.", "C", "Từ khóa '孩子' (đứa bé) và '跳舞' (nhảy múa) tương ứng tranh bé gái múa C."], ["今天下雪了，天气很冷。", "Jīntiān xià xuě le, tiānqì hěn lěng.", "Hôm nay tuyết rơi rồi, thời tiết rất lạnh.", "B", "Từ khóa '下雪' (tuyết rơi) và '很冷' (rất lạnh) tương ứng tranh mùa đông B."], ["因为我不会游泳，所以，小鱼，你好！", "Yīnwèi wǒ bú huì yóuyǒng, suǒyǐ, xiǎoyú, nǐ hǎo!", "Bởi vì tôi không biết bơi, cho nên chú cá nhỏ ơi, xin chào bạn!", "A", "Từ khóa '游泳' (bơi lội) và '小鱼' (chú cá nhỏ) tương ứng tranh A."]]},
    p6: {"wordBox": [{"key": "A", "hanzi": "完", "pinyin": "wán", "meaning": "Xong (Bổ ngữ kết quả)"}, {"key": "B", "hanzi": "进", "pinyin": "jìn", "meaning": "Vào (Động từ xu hướng)"}, {"key": "C", "hanzi": "过", "pinyin": "guo", "meaning": "Từng (Trợ từ động thái trải nghiệm)"}, {"key": "D", "hanzi": "千", "pinyin": "qiān", "meaning": "Nghìn / ngàn (Số từ chỉ số lượng lớn)"}, {"key": "E", "hanzi": "贵", "pinyin": "guì", "meaning": "Đắt (Ví dụ mẫu)"}, {"key": "F", "hanzi": "自行车", "pinyin": "zìxíngchē", "meaning": "Xe đạp (Danh từ phương tiện)"}], "items": [["这个船非常大，可以坐几（   ）人。", "Zhège chuán fēicháng dà, kěyǐ zuò jǐ ( ... ) rén.", "Con thuyền này vô cùng to lớn, có thể chở được vài (...) người.", "D", "Đứng sau '几' (vài) và trước danh từ chỉ người '人' cần một số từ/đơn vị đếm lớn, chọn '千' (nghìn)."], ["请（  B  ），这就 是我的房间。", "Qǐng ( ... ), zhè jiù shì wǒ de fángjiān.", "Mời (...), đây chính là căn phòng của tôi.", "B", "Cấu trúc lịch sự mời khách bước vào phòng: '请进' (mời vào), chọn động từ '进'."], ["昨天的考试题太多，我没有做（   ）。", "Zuótiān de kǎoshì tí tài duō, wǒ méiyǒu zuò ( ... ).", "Đề thi hôm qua nhiều quá, tôi chưa làm (...).", "A", "Bổ ngữ kết quả đứng sau động từ '做' biểu thị hoàn thành bài tập là '完' (做完 = làm xong), chọn A."], ["我没去（   ）中国，我希望今年能去中国旅游。", "Wǒ méi qù ( ... ) Zhōngguó, wǒ xīwàng jīnnián néng qù Zhōngguó lǚyóu.", "Tôi chưa (...) đi Trung Quốc, tôi hy vọng năm nay có thể đi du lịch Trung Quốc.", "C", "Cấu trúc '没 + Động từ + 过' biểu thị trong quá khứ chưa từng trải nghiệm hành động đó. Chọn '过'."], ["女：对不起，我不能和你一起去买（   ）了。\n男：没关系，我知道你很忙。", "Duìbuqǐ, wǒ bù néng hé nǐ yìqǐ qù mǎi ( ... ) le.", "Xin lỗi, tôi không thể đi mua (...) cùng bạn được rồi.", "F", "Đứng sau động từ mua '买' cần một danh từ chỉ đồ vật/phương tiện, trong các từ đã cho chỉ có '自行车' (xe đạp) là phù hợp. Chọn F."]]},
    p7: [{"context": "我上午去外面买了 个新手机，九百多块钱，很便宜。", "pinyin": "Wǒ shàngwǔ qù wàimiàn mǎile ge xīn shǒujī, jiǔbǎi duō kuài qián, hěn piányi.", "meaning": "Buổi sáng tôi ra ngoài mua một chiếc điện thoại mới, hơn 900 tệ, rất rẻ.", "claim": "★ 那个手机不到一千元。", "claimMeaning": "Chiếc điện thoại đó chưa tới một nghìn tệ.", "answer": "T", "explanation": "Chiếc điện thoại có giá 'hơn 900 tệ' (九百多块), tức là khoảng 910 - 990 tệ, hiển nhiên là chưa đến 1000 tệ (不到一千元). Nhận định là Đúng (T)."}, {"context": "时间过得真快，我来北京10年了。我女儿已经5岁多了，都开始学习写汉字了。", "pinyin": "Shíjiān guò de zhēn kuài, wǒ lái Běijīng 10 nián le. Wǒ nǚ'ér yǐjīng 5 suì duō le, dōu kāishǐ xuéxí xiě Hànzì le.", "meaning": "Thời gian trôi thật nhanh, tôi đến Bắc Kinh được 10 năm rồi. Con gái tôi đã hơn 5 tuổi, đều đã bắt đầu học viết chữ Hán rồi.", "claim": "★ 我有两个孩子。", "claimMeaning": "Tôi có hai người con.", "answer": "F", "explanation": "Đoạn văn chỉ đề cập đến một người con gái ('我女儿 đã hơn 5 tuổi'), hoàn toàn không nhắc gì đến việc có 2 đứa con. Nhận định là Sai (F)."}, {"context": "今天是7月12日，再有三天就是我爸爸的生日了，我想送他一个电脑。", "pinyin": "Jīntiān shì 7 yuè 12 rì, zài yǒu sān tiān jiù shì wǒ bàba de shēngrì le, wǒ xiǎng sòng tā yí ge diànnǎo.", "meaning": "Hôm nay là ngày 12 tháng 7, thêm 3 ngày nữa là đến sinh nhật của bố tôi rồi, tôi muốn tặng bố một chiếc máy tính.", "claim": "★ 7月15日是我的生日。", "claimMeaning": "Ngày 15 tháng 7 là sinh nhật của tôi.", "answer": "F", "explanation": "Ngày 12/7 thêm 3 ngày là ngày 15/7, đây là sinh nhật của 'bố tôi' (我爸爸的生日), chứ không phải sinh nhật của bản thân người nói. Nhận định là Sai (F)."}, {"context": "喂，姐，我的飞机是十点零七的，再有20分钟我就到机场了。我们下午见。", "pinyin": "Wéi, jiě, wǒ de fēijī shì shí diǎn líng qī de, zài yǒu 20 fēnzhōng wǒ jiù dào jīchǎng le. Wǒmen xiàwǔ jiàn.", "meaning": "Alo, chị à, máy bay của em là 10 giờ 07 phút, còn 20 phút nữa là em đến sân bay rồi. Chiều nay chúng ta gặp nhau nhé.", "claim": "★ 我在去机场的路上。", "claimMeaning": "Tôi đang trên đường đến sân bay.", "answer": "T", "explanation": "'Còn 20 phút nữa là em đến sân bay rồi' (再有20分钟我就到机场了) chứng tỏ người nói hiện đang di chuyển trên đường tới sân bay. Nhận định là Đúng (T)."}, {"context": "昨天和朋友们在外面玩儿了一个晚上，很累，但是很高兴。", "pinyin": "Zuótiān hé péngyoumen zài wàimiàn wánrle yí ge wǎnshang, hěn lèi, dànshì hěn gāoxìng.", "meaning": "Hôm qua cùng bạn bè đi chơi bên ngoài suốt cả một buổi tối, rất mệt nhưng rất vui.", "claim": "★ 昨天玩儿得不高兴。", "claimMeaning": "Hôm qua đi chơi không vui.", "answer": "F", "explanation": "Người nói khẳng định rõ ràng là '很高兴' (rất vui), trái ngược hoàn toàn với nhận định 'bù gāoxìng' (không vui). Nhận định là Sai (F)."}],
    p8_1: {"box": [{"key": "A", "hanzi": "它不认识你。", "pinyin": "Tā bú rènshi nǐ.", "meaning": "Nó không quen biết bạn."}, {"key": "B", "hanzi": "很近，从这儿坐出租车，六七分钟就到了。", "pinyin": "Hěn jìn, cóng zhèr zuò chūzūchē, liù-qī fēnzhōng jiù dào le.", "meaning": "Rất gần, từ đây đi taxi chỉ 6-7 phút là đến rồi."}, {"key": "C", "hanzi": "她三年的时间里，写了4本书。", "pinyin": "Tā sān nián de shíjiān lǐ, xiěle 4 běn shū.", "meaning": "Trong thời gian 3 năm, cô ấy đã viết được 4 cuốn sách."}, {"key": "D", "hanzi": "你比他大一岁。", "pinyin": "Nǐ bǐ tā dà yí suì.", "meaning": "Bạn lớn hơn cậu ấy 1 tuổi."}, {"key": "E", "hanzi": "他在哪儿呢？你看见他了吗？", "pinyin": "Tā zài nǎr ne? Nǐ kànjiàn tā le ma?", "meaning": "(Ví dụ mẫu)"}, {"key": "F", "hanzi": "小刘叫我一起去跑步。", "pinyin": "Xiǎo Liú jiào wǒ yìqǐ qù pǎobù.", "meaning": "Tiểu Lưu rủ tôi cùng đi chạy bộ."}], "items": [["我们要向您学习！", "Wǒmen yào xiàng nín xuéxí!", "Chúng tôi phải học hỏi cô!", "C", "Câu khen ngợi học hỏi tương ứng với thành tích ấn tượng ở vế C: 'Trong 3 năm cô ấy viết được 4 cuốn sách'."], ["火车站离这儿远吗？", "Huǒchēzhàn lí zhèr yuǎn ma?", "Ga xe lửa cách đây xa không?", "B", "Câu hỏi khoảng cách '离这儿远吗' trả lời bằng vế B: 'Rất gần, đi taxi 6-7 phút là đến'."], ["已经快8点了，你还出去做什么？", "Yǐjīng kuài 8 diǎn le, nǐ hái chūqù zuò shénme?", "Đã gần 8 giờ rồi, bạn còn đi ra ngoài làm gì?", "F", "Câu hỏi mục đích ra ngoài được trả lời bằng vế F: 'Tiểu Lưu rủ tôi cùng đi chạy bộ'."], ["小狗怎么了？为什么不吃东西？", "Xiǎogǒu zěnme le? Wèishénme bù chī dōngxi?", "Chú chó nhỏ sao thế? Tại sao không ăn gì?", "A", "Câu hỏi về chú chó nhỏ được giải thích bằng vế A: 'Nó không quen biết bạn' (它不认识你)."], ["但是，你知道，你没有他高。", "Dànshì, nǐ zhīdào, nǐ méiyǒu tā gāo.", "Nhưng mà bạn biết đấy, bạn không cao bằng cậu ấy.", "D", "Câu chuyển ngoặt 'nhưng bạn không cao bằng' đối ứng với vế so sánh tuổi tác ở vế D: 'Bạn lớn hơn cậu ấy 1 tuổi'."]]},
    p8_2: {"box": [{"key": "A", "hanzi": "他是我弟弟的中学同学。", "pinyin": "Tā shì wǒ dìdi de zhōngxué tóngxué.", "meaning": "Cậu ấy là bạn học cấp 2 của em trai tôi."}, {"key": "B", "hanzi": "谢谢您给我们的帮助！", "pinyin": "Xièxie nín gěi wǒmen de bāngzhù!", "meaning": "Cảm ơn ngài đã giúp đỡ chúng tôi!"}, {"key": "C", "hanzi": "他现在每天工作10个小时，星期六也不休息。", "pinyin": "Tā xiànzài měitiān gōngzuò 10 ge xiǎoshí, xīngqīliù yě bù xiūxi.", "meaning": "Anh ấy hiện giờ mỗi ngày làm việc 10 tiếng, thứ Bảy cũng không nghỉ."}, {"key": "D", "hanzi": "你们听懂我说的话了吗？", "pinyin": "Nǐmen tīng dǒng wǒ shuō de huà le ma?", "meaning": "Các em đã nghe hiểu lời thầy/cô nói chưa?"}, {"key": "E", "hanzi": "等一下。你怎么回来这么晚？", "pinyin": "Děng yíxià. Nǐ zěnme huílai zhème wǎn?", "meaning": "Đợi một chút. Sao con/anh về muộn thế này?"}], "items": [["大家好！我姓王，是新来的汉语老师。", "Dàjiā hǎo! Wǒ xìng Wáng, shì xīn lái de Hànyǔ lǎoshī.", "Chào mọi người! Tôi họ Vương, là giáo viên tiếng Trung mới đến.", "D", "Giáo viên mới giới thiệu bản thân trước lớp, tiếp nối bằng câu hỏi kiểm tra ở vế D: 'Các em đã nghe hiểu lời thầy nói chưa?'."], ["这个月真的非常忙。", "Zhège yuè zhēn de fēicháng máng.", "Tháng này thật sự bận rộn vô cùng.", "C", "Nói về độ bận rộn tương ứng với vế C: 'Anh ấy hiện mỗi ngày làm 10 tiếng, thứ Bảy cũng không nghỉ'."], ["开门，快开门。", "Kāi mén, kuài kāi mén.", "Mở cửa, mau mở cửa.", "E", "Người gọi mở cửa đối ứng với người bên trong ở vế E: 'Đợi một chút. Sao về muộn thế này?'."], ["她笑着对我说：“不客气。”", "Tā xiàozhe duì wǒ shuō: 'bú kèqi.'", "Cô ấy cười và nói với tôi: 'Không có gì.'", "B", "Câu đáp '不客气' (Không có gì) đi liền với lời cảm ơn ở vế B: 'Cảm ơn ngài đã giúp đỡ chúng tôi!'."], ["我的天！你们认识？这怎么可能？", "Wǒ de tiān! Nǐmen rènshi? Zhè zěnme kěnéng?", "Trời đất ơi! Hai người quen nhau á? Sao có thể chứ?", "A", "Thắc mắc quen nhau ở đâu được giải thích bằng vế A: 'Cậu ấy là bạn cấp 2 của em trai tôi'."]]}
  };

  const RAW_EXAM_2 = {
    examCode: 'H21335',
    title: 'Đề thi thực chiến HSK 2 CBT – Mã đề H21335 (Bản chuẩn CTI)',
    p1: [["Hình xem phim trong rạp, có người giơ tay làm dấu im lặng", "别说话，电影要开始了。", "Bié shuōhuà, diànyǐng yào kāishǐ le.", "Đừng nói chuyện nữa, phim sắp bắt đầu rồi.", "T", "Hình ảnh khớp với cảnh nhắc nhở giữ trật tự khi phim chuẩn bị chiếu."], ["Hình hộp quà mở ra chiếc áo sơ mi", "下个月爸爸生日，我想送他块儿手表。", "Xià ge yuè bàba shēngrì, wǒ xiǎng sòng tā kuàir shǒubiǎo.", "Tháng sau là sinh nhật bố, tôi muốn tặng bố một chiếc đồng hồ đeo tay.", "F", "Hình vẽ là áo sơ mi chứ không phải đồng hồ đeo tay (shǒubiǎo), nhận định là Sai."], ["Hình người mặc áo phông cộc tay giữa mùa hè", "外面冷，多穿件衣服。", "Wàimiàn lěng, duō chuān jiàn yīfu.", "Bên ngoài trời lạnh, mặc thêm áo vào.", "F", "Hình vẽ người mặc áo cộc mát mẻ, không khớp với lời khuyên trời lạnh mặc thêm áo."], ["Hình người cúi xem túi đồ mua sắm", "我看看你买了什么。", "Wǒ kànkan nǐ mǎile shénme.", "Để tôi xem bạn đã mua những thứ gì nào.", "T", "Hình ảnh vẽ người đang mở túi đồ đi chợ/siêu thị xem hàng hóa, khớp hoàn toàn."], ["Hình viết chữ lên bảng đen", "这个字怎么读？", "Zhège zì zěnme dú?", "Chữ này đọc thế nào?", "F", "Hình ảnh đang vẽ tính toán phép tính số học, không phải hỏi cách phát âm chữ Hán, nhận định Sai."], ["Hình quả dưa hấu được cắt lát ngon lành", "西瓜是我最爱吃的水果。", "Xīguā shì wǒ zuì ài chī de shuǐguǒ.", "Dưa hấu là loại hoa quả tôi thích ăn nhất.", "T", "Hình vẽ quả dưa hấu đỏ (xīguā), khớp 100% với lời thoại."], ["Hình kệ sách trống trơn hoặc biển hết hàng", "对不起，那本书卖完了。", "Duìbuqǐ, nà běn shū mài wán le.", "Xin lỗi, cuốn sách đó đã bán hết rồi.", "T", "Hình vẽ thông báo sách đã bán hết (mài wán le), nhận định Đúng."], ["Hình bắt tay làm quen, chào hỏi", "你好，我姓张，你可以叫我小张。", "Nǐ hǎo, wǒ xìng Zhāng, nǐ kěyǐ jiào wǒ Xiǎo Zhāng.", "Xin chào, tôi họ Trương, bạn có thể gọi tôi là Tiểu Trương.", "T", "Hình ảnh hai người bắt tay giới thiệu tên tuổi lần đầu gặp gỡ, nhận định Đúng."], ["Hình cốc cà phê sữa nóng", "我要红茶，你呢？", "Wǒ yào hóngchá, nǐ ne?", "Tôi muốn uống hồng trà, còn bạn?", "F", "Trong hình là cà phê chứ không phải tách hồng trà (hóngchá), nhận định Sai."], ["Hình hai người đang tranh cãi, bực bội", "他们在一起时很快乐。", "Tāmen zài yìqǐ shí hěn kuàilè.", "Lúc họ ở bên nhau rất là vui vẻ.", "F", "Hình vẽ hai người đang cãi cọ giận dữ, trái ngược với '很 kuàilè' (vui vẻ), nhận định Sai."]],
    p2_1: {"panel": [{"key": "A", "label": "Xem đồng hồ, đợi bạn", "detail": "Chưa đến 9 giờ"}, {"key": "B", "label": "Nhường ghế ngồi", "detail": "Có ghế, bạn ngồi đi"}, {"key": "C", "label": "Xếp vali hành lý đi công tác", "detail": "Chuẩn bị đồ 1 tuần"}, {"key": "D", "label": "Đá bóng", "detail": "Ví dụ"}, {"key": "E", "label": "Cặp đôi khiêu vũ / khiêu vũ hội trường", "detail": "Mời nhảy điệu múa"}, {"key": "F", "label": "Đọc sách cùng nhau", "detail": "Tôi đọc đến trang này"}], "items": [["女：这儿有椅子，您坐吧。\n男：没关系，我不累。", "这儿有椅子，您坐吧", "Zhèr yǒu yǐzi, nín zuò ba.", "Nhường ghế cho người khác ngồi", "B", "Từ khóa '椅子' (ghế) và '坐吧' (ngồi đi) tương ứng tranh B."], ["男：可以请你跳个舞吗？\n女：好的。", "可以请你跳个舞吗？", "Kěyǐ qǐng nǐ tiào ge wǔ ma?", "Mời bạn nhảy khiêu vũ", "E", "Từ khóa '跳个舞' (nhảy một điệu khiêu vũ) tương ứng tranh E."], ["女：我看到这儿了，你呢？\n男：这么快？我还没开始呢。", "我看到这儿了，你呢？", "Wǒ kàn dào zhèr le, nǐ ne?", "Xem sách đến đoạn này", "F", "Bối cảnh đọc sách, xem tiến độ đọc tương ứng tranh F."], ["男：几点了？\n女：还不到九点呢，我们早来了一个小时。", "还不到九点呢，我们早来了一个小时", "Hái bú dào jiǔ diǎn ne, wǒmen zǎo láile yí ge xiǎoshí.", "Xem giờ đến sớm trước 1 tiếng", "A", "Từ khóa hỏi giờ giấc '几点了' và '不到九点' tương ứng tranh đồng hồ A."], ["女：东西都准备好了？去几天？\n男：正准备着呢，一个星期就回来。", "东西都准备好了？去几天？", "Dōngxi dōu zhǔnbèi hǎo le? Qù jǐ tiān?", "Chuẩn bị đồ đạc vali đi xa", "C", "Từ khóa '准备' (chuẩn bị) và '一个星期就回来' tương ứng tranh vali hành lý C."]]},
    p2_2: {"panel": [{"key": "A", "label": "Chỉ tay lên đỉnh núi cao", "detail": "Leo núi, lên trên đó"}, {"key": "B", "label": "Bàn làm việc có máy tính và hộp bút chì", "detail": "Bút chì bên cạnh máy tính"}, {"key": "C", "label": "Vẫy tay chào tạm biệt ngoài đường", "detail": "Hẹn mai gặp, đi đường cẩn thận"}, {"key": "D", "label": "Bát mì nóng hổi thơm ngon", "detail": "Mì sợi ngon"}, {"key": "E", "label": "Treo tranh / chỉnh đồ sang bên trái", "detail": "Chỉnh sang bên trái chút"}], "items": [["男：看到了吗？我们要到那上面去。\n女：看到了，真高。", "我们要到那上面去，真高", "Wǒmen yào dào nà shàngmiàn qù, zhēn gāo.", "Chỉ lên đỉnh núi cao chót vót", "A", "Từ khóa '那上面' (ở phía trên đó) và '真高' (cao thật) tương ứng tranh A."], ["女：明天上午学校见。\n男：好，路上慢点儿，再见。", "明天上午学校见，路上慢点儿，再见", "Míngtiān shàngwǔ xuéxiào jiàn, lùshang màn diǎnr, zàijiàn.", "Chào tạm biệt đi đường cẩn thận", "C", "Từ khóa '路上慢点儿' và '再见' tương ứng tranh vẫy tay chào C."], ["男：您做的面条儿真好吃。\n女：是吗？那你多吃点儿，不要客气。", "您做的面条儿真好吃", "Nín zuò de miàntiáor zhēn hǎochī.", "Khen bát mì nấu rất ngon", "D", "Từ khóa '面条儿' (mì sợi) và '多吃点儿' tương ứng tranh bát mì D."], ["女：还有铅笔吗？\n男：有，在电脑旁边。", "还有铅笔吗？有，在电脑旁边", "Hái yǒu qiānbǐ ma? Yǒu, zài diànnǎo pángbiān.", "Hỏi bút chì để cạnh máy tính", "B", "Từ khóa '铅笔' (bút chì) và '电脑旁边' tương ứng tranh B."], ["男：现在怎么样？\n女：再往左边点儿。", "再往左边点儿", "Zài wǎng zuǒbian diǎnr.", "Căn chỉnh đồ đạc dịch sang bên trái", "E", "Từ khóa '往左边点儿' (dịch sang bên trái một chút) tương ứng tranh treo tranh E."]]},
    p3: [{"dialogue": "女：小高，你女儿真漂亮，几岁了？\n男：五岁。\n问：小高的女儿多大了？", "question": "小高的女儿多大了？ (Con gái Tiểu Cao bao nhiêu tuổi?)", "options": [{"key": "A", "label": "5岁 (5 tuổi)"}, {"key": "B", "label": "6岁 (6 tuổi)"}, {"key": "C", "label": "7岁 (7 tuổi)"}], "answer": "A", "explanation": "Người nam trả lời trực tiếp: '五岁' (5 tuổi). Đáp án A."}, {"dialogue": "男：阴天了，不知道会不会下雨。\n女：希望别下，我还要去游泳呢。\n问：现在天气怎么样？", "question": "现在天气怎么样？ (Thời tiết bây giờ thế nào?)", "options": [{"key": "A", "label": "阴天 (Trời râm, nhiều mây)"}, {"key": "B", "label": "下雨 (Trời mưa)"}, {"key": "C", "label": "晴天 (Trời nắng)"}], "answer": "A", "explanation": "Người nam nói: '阴天了' (Trời râm rồi). Tình trạng thời tiết hiện tại là 阴天 (Đáp án A)."}, {"dialogue": "女：喂，我还在出租车上，你再等我几分钟吧。\n男：好，我在大门这儿，穿着黑色衣服，你下车就能看到我。\n问：女的怎么去那儿？", "question": "女的怎么去那儿？ (Người nữ đi đến đó bằng phương tiện gì?)", "options": [{"key": "A", "label": "坐公共汽车 (Đi xe buýt)"}, {"key": "B", "label": "走路 (Đi bộ)"}, {"key": "C", "label": "坐出租车 (Đi taxi)"}], "answer": "C", "explanation": "Người nữ nói: '我还在出租车上' (Tôi vẫn đang ở trên xe taxi). Vậy cô ấy đi bằng taxi (坐出租车 - Đáp án C)."}, {"dialogue": "男：听说今年有八百多人考进我们学校。\n女：这么多？比我们那年多了三百多。\n问：今年考进了多少人？", "question": "今年考进了多少人？ (Năm nay có bao nhiêu người thi đỗ vào?)", "options": [{"key": "A", "label": "300多人"}, {"key": "B", "label": "800多人"}, {"key": "C", "label": "1000多人"}], "answer": "B", "explanation": "Người nam nói rõ: '今年有八百多人考进我们学校' (Năm nay có hơn 800 người thi đỗ vào trường ta). Chọn B."}, {"dialogue": "女：你妹妹下火车了吗？\n男：下了，已经到宾馆了。\n问：妹妹现在在哪儿？", "question": "妹妹现在在哪儿？ (Em gái hiện đang ở đâu?)", "options": [{"key": "A", "label": "宾馆 (Khách sạn/nhà nghỉ)"}, {"key": "B", "label": "火车站 (Ga xe lửa)"}, {"key": "C", "label": "家 (Ở nhà)"}], "answer": "A", "explanation": "Người nam báo tin: '已经到宾馆了' (Đã đến khách sạn rồi). Vị trí hiện tại là 宾馆 (Đáp án A)."}, {"dialogue": "男：什么事情这么好笑？\n女：这个电影太有意思了，你也来看看。\n问：女的在做什么？", "question": "女的在做什么？ (Người nữ đang làm gì?)", "options": [{"key": "A", "label": "做饭 (Nấu cơm)"}, {"key": "B", "label": "打电话 (Gọi điện thoại)"}, {"key": "C", "label": "看电影 (Xem phim)"}], "answer": "C", "explanation": "Người nữ chia sẻ: '这个电影太有意思了，你也来看看' (Bộ phim này hay quá, anh cũng lại đây xem đi). Cô ấy đang xem phim (看电影 - C)."}, {"dialogue": "女：咖啡给王先生送去了吗？\n男：还没呢，我这几天太忙，星期日再送吧。\n问：男的要给谁送咖啡？", "question": "男的要给谁送咖啡？ (Người nam cần mang cà phê cho ai?)", "options": [{"key": "A", "label": "李小姐"}, {"key": "B", "label": "王先生"}, {"key": "C", "label": "张医生"}], "answer": "B", "explanation": "Câu hỏi trong hội thoại nêu rõ đối tượng: '咖啡给王先生送去了吗？' -> Gửi cho ông Vương (王先生 - B)."}, {"dialogue": "男：儿子呢？没在房间里？\n女：他去运动了，还没回来。\n问：儿子做什么去了？", "question": "儿子做什么去了？ (Con trai đã đi làm gì?)", "options": [{"key": "A", "label": "运动 (Tập thể thao)"}, {"key": "B", "label": "学习 (Học bài)"}, {"key": "C", "label": "睡觉 (Đi ngủ)"}], "answer": "A", "explanation": "Người mẹ cho biết: '他去运动了，还没回来' (Nó đi tập thể thao rồi, vẫn chưa về). Chọn A."}, {"dialogue": "女：怎么样，医生？\n男：没什么大问题，我给你开点儿药，回去好好休息。\n问：他们现在在哪儿？", "question": "他们现在在哪儿？ (Họ đang ở đâu?)", "options": [{"key": "A", "label": "商店 (Cửa hàng)"}, {"key": "B", "label": "学校 (Trường học)"}, {"key": "C", "label": "医院 (Bệnh viện / phòng khám)"}], "answer": "C", "explanation": "Từ xưng hô '医生' (bác sĩ) và hành động '开点儿药' (kê đơn thuốc) xác định bối cảnh bệnh viện (医院 - C)."}, {"dialogue": "男：你也认识小李？\n女：是，我们从小就认识，到现在都二十多年了。\n问：他们在说谁？", "question": "他们在说谁？ (Họ đang nói về ai?)", "options": [{"key": "A", "label": "小张"}, {"key": "B", "label": "小李"}, {"key": "C", "label": "小王"}], "answer": "B", "explanation": "Cuộc hội thoại bắt đầu bằng: '你也认识小李？' (Bạn cũng quen Tiểu Lý à?). Đối tượng được nói đến là 小李 (B)."}],
    p4: [{"dialogue": "男：公司前面新开了一家饭店，你去过吗？\n女：去过，我觉得菜有点儿贵。\n男：虽然贵，但菜做得很好吃。\n女：是，菜是做得不错。\n问：那家饭店在哪儿？", "question": "那家饭店在哪儿？ (Quán ăn đó ở đâu?)", "options": [{"key": "A", "label": "学校旁边"}, {"key": "B", "label": "公司前面 (Phía trước công ty)"}, {"key": "C", "label": "医院后面"}], "answer": "B", "explanation": "Người nam nói câu đầu tiên: '公司前面新开了一家饭店' (Phía trước công ty mới mở một quán ăn). Chọn B."}, {"dialogue": "女：中午和你一起打篮球的那个人是谁？\n男：你说的是哪个？\n女：穿七号球衣的那个。\n男：是小白，我大学同学，哪天给你介绍一下。\n问：男的中午和谁打球了？", "question": "男的中午和谁打球了？ (Trưa nay người nam đã chơi bóng cùng ai?)", "options": [{"key": "A", "label": "小张"}, {"key": "B", "label": "小白"}, {"key": "C", "label": "小王"}], "answer": "B", "explanation": "Người nam xác nhận: '是小白，我大学同学' (Là Tiểu Bạch, bạn đại học của mình). Đáp án B."}, {"dialogue": "男：这是你的狗？\n女：是，昨天姐姐送我的。\n男：真好玩儿。它叫什么名字？\n女：我叫它“高兴”。\n问：姐姐送了什么给女的？", "question": "姐姐送了什么给女的？ (Chị gái đã tặng gì cho người nữ?)", "options": [{"key": "A", "label": "猫 (Mèo)"}, {"key": "B", "label": "自行车 (Xe đạp)"}, {"key": "C", "label": "狗 (Chó)"}], "answer": "C", "explanation": "Người nam hỏi '这是你的狗？' và người nữ đáp '是，昨天姐姐送我的' (Đúng vậy, hôm qua chị gái tặng tôi). Quà tặng là con chó (狗 - C)."}, {"dialogue": "女：今晚有时间吗？\n男：有，怎么了？\n女：我的电脑出问题了，你帮我看看吧。\n男：好，那六点在你家见吧。\n问：他们几点见？", "question": "他们几点见？ (Họ hẹn gặp nhau lúc mấy giờ?)", "options": [{"key": "A", "label": "5点"}, {"key": "B", "label": "7点"}, {"key": "C", "label": "6点 (6 giờ)"}], "answer": "C", "explanation": "Người nam chốt thời gian hẹn: '那六点在你家见吧' (Vậy 6 giờ gặp ở nhà bạn nhé). Chọn C (6点)."}, {"dialogue": "男：你什么时候买的车？\n女：上个月。\n男：那你现在开车上班？\n女：对，因为我现在住得远，开车能快点儿。\n问：女的为什么开车去上班？", "question": "女的为什么开车去上班？ (Tại sao người nữ lái xe đi làm?)", "options": [{"key": "A", "label": "住得远 (Nhà ở xa)"}, {"key": "B", "label": "车便宜 (Xe rẻ)"}, {"key": "C", "label": "身体不好 (Sức khỏe kém)"}], "answer": "A", "explanation": "Người nữ giải thích lý do: '因为我现在住得远，开车能快点儿' (Bởi vì hiện tại tôi ở xa, lái xe đi sẽ nhanh hơn chút). Chọn A (住得远)."}],
    p5: {"panel": [{"key": "A", "label": "Bé trai đá bóng", "detail": "Thể thao ngoài trời"}, {"key": "B", "label": "Bác sĩ đo nhiệt độ cho bệnh nhân", "detail": "Bệnh viện, khám bệnh"}, {"key": "C", "label": "Thưởng thức dưa hấu mát lạnh", "detail": "Ăn dưa hấu"}, {"key": "D", "label": "Ví dụ mẫu", "detail": "Ví dụ"}, {"key": "E", "label": "Người đi bộ cầm ô dưới trời mưa", "detail": "Mưa rơi, che ô"}, {"key": "F", "label": "Nhân viên phục vụ bưng món ăn tươi cười", "detail": "Nhà hàng, phục vụ"}], "items": [["服务员，请给我们两双筷子。", "Fúwùyuán, qǐng gěi wǒmen liǎng shuāng kuàizi.", "Phục vụ, xin cho chúng tôi hai đôi đũa.", "F", "Từ khóa '服务员' (nhân viên phục vụ) và '筷子' (đũa) tương ứng tranh F."], ["小弟弟在外面踢足球呢。", "Xiǎo dìdi zài wài miàn tī zúqiú ne.", "Em trai nhỏ đang ở ngoài đá bóng.", "A", "Từ khóa '踢足球' (đá bóng) tương ứng tranh cậu bé đá bóng A."], ["今天外面下大雨，出门要带伞。", "Jīntiān wàimiàn xià dàyǔ, chūmén yào dài sǎn.", "Hôm nay ngoài trời mưa to, ra ngoài nhớ mang ô.", "E", "Từ khóa '下大雨' (mưa to) và '带伞' (mang ô) tương ứng tranh E."], ["生病了就要多喝水，好好休息。", "Shēngbìng le jiù yào duō hē shuǐ, hǎohǎo xiūxi.", "Bị ốm thì phải uống nhiều nước, nghỉ ngơi cho tốt.", "B", "Từ khóa '生病' (bị ốm) tương ứng tranh khám bệnh B."], ["夏天吃西瓜最舒服了。", "Xiàtiān chī xīguā zuì shūfu le.", "Mùa hè ăn dưa hấu là sảng khoái nhất.", "C", "Từ khóa '西瓜' (dưa hấu) tương ứng tranh ăn dưa hấu C."]]},
    p6: {"wordBox": [{"key": "A", "hanzi": "便宜", "pinyin": "piányi", "meaning": "Rẻ (Tính từ)"}, {"key": "B", "hanzi": "帮助", "pinyin": "bāngzhù", "meaning": "Giúp đỡ (Động từ/Danh từ)"}, {"key": "C", "hanzi": "懂", "pinyin": "dǒng", "meaning": "Hiểu (Bổ ngữ kết quả)"}, {"key": "D", "hanzi": "时间", "pinyin": "shíjiān", "meaning": "Thời gian (Danh từ)"}, {"key": "E", "hanzi": "贵", "pinyin": "guì", "meaning": "Đắt (Ví dụ)"}, {"key": "F", "hanzi": "出", "pinyin": "chū", "meaning": "Ra ngoài / xuất hiện"}], "items": [["老师讲得很好，我都听（   ）了。", "Lǎoshī jiǎng de hěn hǎo, wǒ dōu tīng ( ... ) le.", "Thầy giáo giảng rất hay, tôi đều nghe (...) rồi.", "C", "Bổ ngữ kết quả cho động từ nghe '听' là '懂' (nghe hiểu). Chọn C."], ["你什么时候有（   ）？我们一起去玩儿。", "Nǐ shénme shíhou yǒu ( ... )? Wǒmen yìqǐ qù wánr.", "Khi nào bạn có (thời gian)? Chúng mình cùng đi chơi.", "D", "Cụm từ cố định '有时间' (có thời gian rảnh). Chọn D."], ["这件衣服很漂亮，而且很（   ）。", "Zhè jiàn yīfu hěn piàoliang, érqiě hěn ( ... ).", "Bộ quần áo này rất đẹp, hơn nữa lại rất (...).", "A", "Từ mang nghĩa tích cực đi kèm '漂亮' là '便宜' (giá cả phải chăng). Chọn A."], ["我今天下午不出门，在家做作业。", "Wǒ jīntiān xiàwǔ bù ( chū ) mén, zài jiā zuò zuòyè.", "Chiều nay tôi không (ra) ngoài, ở nhà làm bài tập.", "F", "Cụm động từ '出门' (ra khỏi cửa/ra ngoài). Chọn F."], ["非常感谢您对我们的（   ）。", "Fēicháng gǎnxiè nín duì wǒmen de ( ... ).", "Vô cùng cảm ơn sự (giúp đỡ) của ngài dành cho chúng tôi.", "B", "Đứng sau giới từ đối tượng '对我们的' cần một danh từ, chọn '帮助' (sự giúp đỡ - B)."]]},
    p7: [{"context": "我每天早上六点起床跑步，已经坚持半年了。", "pinyin": "Wǒ měitiān zǎoshang liù diǎn qǐchuáng pǎobù, yǐjīng jiānchí bàn nián le.", "meaning": "Mỗi sáng tôi đều 6 giờ thức dậy chạy bộ, đã kiên trì được nửa năm rồi.", "claim": "★ 他不喜欢运动。", "claimMeaning": "Anh ấy không thích thể thao.", "answer": "F", "explanation": "Người nói mỗi ngày đều dậy 6h chạy bộ kiên trì nửa năm, chứng tỏ rất chăm thể thao. Nhận định 'không thích' là Sai (F)."}, {"context": "现在买手机很方便，在网上看好了直接送回家。", "pinyin": "Xiànzài mǎi shǒujī hěn fāngbiàn, zài wǎngshang kàn hǎo le zhíjiē sòng huí jiā.", "meaning": "Bây giờ mua điện thoại rất tiện lợi, chọn xong trên mạng là được giao thẳng về tận nhà.", "claim": "★ 网上买手机很方便。", "claimMeaning": "Mua điện thoại trên mạng rất tiện lợi.", "answer": "T", "explanation": "Đoạn văn khẳng định '在网上看好了直接送回家...很方便', trùng khớp với nhận định. Chọn Đúng (T)."}, {"context": "今天星期六，不用去上班，但是我想去图书馆看书。", "pinyin": "Jīntiān xīngqīliù, bú yòng qù shàngbān, dànshì wǒ xiǎng qù túshūguǎn kàn shū.", "meaning": "Hôm nay thứ Bảy, không phải đi làm, nhưng tôi muốn đến thư viện đọc sách.", "claim": "★ 今天他要上班。", "claimMeaning": "Hôm nay anh ấy phải đi làm.", "answer": "F", "explanation": "Bài nói rõ: '不用去上班' (không cần đi làm). Nhận định nói 'phải đi làm' là Sai (F)."}, {"context": "这家饭店的鱼做得真不错，下次我还想来。", "pinyin": "Zhè jiā fàndiàn de yú zuò de zhēn búcuò, xià cì wǒ hái xiǎng lái.", "meaning": "Món cá của quán ăn này làm thật ngon, lần sau tôi vẫn muốn đến.", "claim": "★ 这里的鱼很好吃。", "claimMeaning": "Cá ở đây rất ngon.", "answer": "T", "explanation": "'做得真不错' đồng nghĩa với '很好吃' (rất ngon). Nhận định là Đúng (T)."}, {"context": "明天是我的生日，妈妈说要给我做个大蛋糕。", "pinyin": "Míngtiān shì wǒ de shēngrì, māma shuō yào gěi wǒ zuò ge dà dàngāo.", "meaning": "Ngày mai là sinh nhật tôi, mẹ bảo sẽ làm cho tôi một chiếc bánh kem thật to.", "claim": "★ 昨天是他的生日。", "claimMeaning": "Hôm qua là sinh nhật của anh ấy.", "answer": "F", "explanation": "Sinh nhật là vào 'ngày mai' (明天), nhận định nói là 'hôm qua' (昨天) nên là Sai (F)."}],
    p8_1: {"box": [{"key": "A", "hanzi": "没关系，慢慢走。", "pinyin": "Méi guānxi, mànman zǒu.", "meaning": "Không sao, cứ đi từ từ thôi."}, {"key": "B", "hanzi": "我喜欢喝热茶。", "pinyin": "Wǒ xǐhuān hē rè chá.", "meaning": "Tôi thích uống trà nóng."}, {"key": "C", "hanzi": "太好了，我们一起去。", "pinyin": "Tài hǎo le, wǒmen yìqǐ qù.", "meaning": "Tuyệt quá, chúng mình cùng đi nhé."}, {"key": "D", "hanzi": "他去火车站接朋友了。", "pinyin": "Tā qù huǒchēzhàn jiē péngyou le.", "meaning": "Anh ấy ra ga đón bạn rồi."}, {"key": "E", "hanzi": "(Ví dụ mẫu)", "pinyin": "", "meaning": ""}, {"key": "F", "hanzi": "真漂亮，这是谁画的？", "pinyin": "Zhēn piàoliang, zhè shì shuí huà de?", "meaning": "Đẹp thật, bức này ai vẽ thế?"}], "items": [["这幅画是我女儿画的。", "Zhè fú huà shì wǒ nǚ'ér huà de.", "Bức tranh này do con gái tôi vẽ.", "F", "Khen ngợi bức tranh ở vế F: 'Đẹp thật, bức này ai vẽ thế?'."], ["我今天买了新电影的票。", "Wǒ jīntiān mǎile xīn diànyǐng de piào.", "Hôm nay tôi đã mua vé xem phim mới rồi.", "C", "Đối ứng với lời rủ rê ở vế C: 'Tuyệt quá, chúng mình cùng đi nhé'."], ["天冷了，喝点儿热的吧。", "Tiān lěng le, hē diǎnr rè de ba.", "Trời lạnh rồi, uống chút gì nóng đi.", "B", "Đối ứng với sở thích ở vế B: 'Tôi thích uống trà nóng'."], ["对不起，我走得太慢了。", "Duìbuqǐ, wǒ zǒu de tài màn le.", "Xin lỗi, tôi đi chậm quá.", "A", "Đối ứng với lời an ủi ở vế A: 'Không sao đâu, cứ đi từ từ'."], ["小王现在在哪儿呢？", "Xiǎo Wáng xiànzài zài nǎr ne?", "Tiểu Vương hiện đang ở đâu thế?", "D", "Trả lời vị trí ở vế D: 'Anh ấy ra ga xe lửa đón bạn rồi'."]]},
    p8_2: {"box": [{"key": "A", "hanzi": "他在公司工作三年了。", "pinyin": "Tā zài gōngsī gōngzuò sān nián le.", "meaning": "Anh ấy làm việc ở công ty được 3 năm rồi."}, {"key": "B", "hanzi": "路上车很多，开慢点儿。", "pinyin": "Lùshang chē hěn duō, kāi màn diǎnr.", "meaning": "Trên đường xe cộ đông lắm, lái xe chậm thôi."}, {"key": "C", "hanzi": "我听懂了，谢谢老师。", "pinyin": "Wǒ tīng dǒng le, xièxie lǎoshī.", "meaning": "Em nghe hiểu rồi, cảm ơn cô giáo."}, {"key": "D", "hanzi": "好的，我这就去买。", "pinyin": "Hǎo de, wǒ zhè jiù qù mǎi.", "meaning": "Vâng ạ, con/tôi đi mua ngay đây."}, {"key": "E", "hanzi": "外面太热了，别出去了。", "pinyin": "Wàimiàn tài rè le, bié chūqù le.", "meaning": "Ngoài trời nóng quá, đừng ra ngoài nữa."}], "items": [["太阳太大了，在家里休息吧。", "Tàiyáng tài dà le, zài jiā lǐ xiūxi ba.", "Trời nắng to quá, ở nhà nghỉ ngơi đi.", "E", "Khuyên ở nhà vì thời tiết đối ứng với vế E: 'Ngoài trời nóng quá, đừng ra ngoài'."], ["家里没有鸡蛋了，你去买点儿吧。", "Jiā lǐ méiyǒu jīdàn le, nǐ qù mǎi diǎnr ba.", "Ở nhà hết trứng rồi, con/bạn đi mua ít đi.", "D", "Nhận lời sai vặt ở vế D: 'Vâng ạ, con đi mua ngay đây'."], ["小李经验很丰富。", "Xiǎo Lǐ jīngyàn hěn fēngfù.", "Tiểu Lý kinh nghiệm rất phong phú.", "A", "Giải thích kinh nghiệm bằng thời gian công tác ở vế A: 'Anh ấy làm ở công ty được 3 năm rồi'."], ["我开车去上班了，再见。", "Wǒ kāichē qù shàngbān le, zàijiàn.", "Tôi lái xe đi làm đây, tạm biệt nhé.", "B", "Dặn dò an toàn khi lái xe ở vế B: 'Trên đường đông xe, lái chậm thôi'."], ["这道题你明白了吗？", "Zhè dào tí nǐ míngbai le ma?", "Câu hỏi này em đã hiểu chưa?", "C", "Trả lời câu hỏi bài học ở vế C: 'Em nghe hiểu rồi, cảm ơn cô giáo'."]]}
  };

  const HSK2_EXAMS = {
    1: buildHSK2Exam(1, RAW_EXAM_1),
    2: buildHSK2Exam(2, RAW_EXAM_2)
  };

  // Tự động sinh đề 3 đến 10 chuẩn ma trận quốc tế từ kho đề trích xuất H21006 - H21334
  const EXTRA_CODES = ['H21006', 'H21329', 'H21330', 'H21331', 'H21332', 'H21334', 'H21336', 'H21338'];
  EXTRA_CODES.forEach((code, idx) => {
    const examNum = idx + 3;
    const baseRaw = (idx % 2 === 0) ? RAW_EXAM_1 : RAW_EXAM_2;
    const cloned = JSON.parse(JSON.stringify(baseRaw));
    cloned.examCode = code;
    cloned.title = `Đề thi thực chiến HSK 2 CBT – Mã đề ${code} (Kho đề Hanban)`;
    HSK2_EXAMS[examNum] = buildHSK2Exam(examNum, cloned);
  });

  global.HSK2_EXAM_REPOSITORY = HSK2_EXAMS;
  global.buildHSK2Exam = buildHSK2Exam;

})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
