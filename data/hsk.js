/**
 * EDUZ CBT - HSK 1 EXAM REPOSITORY (H11001 - H11010)
 * Chuẩn Hanban CTI Quốc tế: 10 Đề x 40 Câu = 400 Câu hỏi
 * Tích hợp Shared Panels (A-F), Hanzi, Pinyin, Audio Script & Giải thích 1 câu
 */

(function (global) {
  'use strict';

  // Hàm dựng cấu trúc chuẩn cho từng đề từ ma trận dữ liệu CTI
  function buildHSK1Exam(examNumber, raw) {
    const code = 'H110' + String(examNumber).padStart(2, '0');
    const questions = [];

    // 1. NGHE PHẦN 1 (Câu 1 - 5): Phán đoán Đúng / Sai (true_false)
    raw.p1.forEach((item, idx) => {
      const qNum = idx + 1;
      questions.push({
        id: `${code}_Q${qNum}`,
        number: qNum,
        section: 'listening',
        part: 1,
        type: 'listening_tf',
        promptVisual: item[0], // Mô tả hình/biểu tượng hiển thị trên màn hình
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

    // 2. NGHE PHẦN 2 (Câu 6 - 10): Nghe chọn tranh A, B, C (listening_abc_img)
    raw.p2.forEach((item, idx) => {
      const qNum = idx + 6;
      questions.push({
        id: `${code}_Q${qNum}`,
        number: qNum,
        section: 'listening',
        part: 2,
        type: 'listening_abc',
        audioText: item[0],
        hanzi: item[0],
        pinyin: item[1],
        meaning: item[2],
        options: [
          { key: 'A', label: item[3][0] },
          { key: 'B', label: item[3][1] },
          { key: 'C', label: item[3][2] }
        ],
        answer: item[4],
        explanation: item[5]
      });
    });

    // 3. NGHE PHẦN 3 (Câu 11 - 15): Nghe hội thoại ghép tranh A-F (Shared Panel)
    raw.p3.items.forEach((item, idx) => {
      const qNum = idx + 11;
      questions.push({
        id: `${code}_Q${qNum}`,
        number: qNum,
        section: 'listening',
        part: 3,
        type: 'listening_match_af',
        sharedPanelId: `${code}_PANEL_L3`,
        audioText: item[0],
        hanzi: item[0],
        pinyin: item[1],
        meaning: item[2],
        options: ['A', 'B', 'C', 'D', 'E', 'F'].map((k) => ({ key: k, label: k })),
        answer: item[3],
        explanation: item[4]
      });
    });

    // 4. NGHE PHẦN 4 (Câu 16 - 20): Nghe câu ngắn + câu hỏi chọn A, B, C
    raw.p4.forEach((item, idx) => {
      const qNum = idx + 16;
      questions.push({
        id: `${code}_Q${qNum}`,
        number: qNum,
        section: 'listening',
        part: 4,
        type: 'listening_qa_abc',
        audioText: item[0],
        hanzi: item[0],
        pinyin: item[1],
        meaning: item[2],
        options: [
          { key: 'A', label: item[3][0] },
          { key: 'B', label: item[3][1] },
          { key: 'C', label: item[3][2] }
        ],
        answer: item[4],
        explanation: item[5]
      });
    });

    // 5. ĐỌC PHẦN 1 (Câu 21 - 25): Xem hình và từ vựng phán đoán Đúng / Sai
    raw.p5.forEach((item, idx) => {
      const qNum = idx + 21;
      questions.push({
        id: `${code}_Q${qNum}`,
        number: qNum,
        section: 'reading',
        part: 1,
        type: 'reading_tf',
        promptVisual: item[0],
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

    // 6. ĐỌC PHẦN 2 (Câu 26 - 30): Đọc câu ghép với tranh A-F (Shared Panel)
    raw.p6.items.forEach((item, idx) => {
      const qNum = idx + 26;
      questions.push({
        id: `${code}_Q${qNum}`,
        number: qNum,
        section: 'reading',
        part: 2,
        type: 'reading_match_img_af',
        sharedPanelId: `${code}_PANEL_R2`,
        hanzi: item[0],
        pinyin: item[1],
        meaning: item[2],
        options: ['A', 'B', 'C', 'D', 'E', 'F'].map((k) => ({ key: k, label: k })),
        answer: item[3],
        explanation: item[4]
      });
    });

    // 7. ĐỌC PHẦN 3 (Câu 31 - 35): Ghép câu hỏi - câu trả lời A-F (Shared Panel)
    raw.p7.items.forEach((item, idx) => {
      const qNum = idx + 31;
      questions.push({
        id: `${code}_Q${qNum}`,
        number: qNum,
        section: 'reading',
        part: 3,
        type: 'reading_match_qa_af',
        sharedPanelId: `${code}_PANEL_R3`,
        hanzi: item[0],
        pinyin: item[1],
        meaning: item[2],
        options: ['A', 'B', 'C', 'D', 'E', 'F'].map((k) => ({ key: k, label: k })),
        answer: item[3],
        explanation: item[4]
      });
    });

    // 8. ĐỌC PHẦN 4 (Câu 36 - 40): Điền từ vào chỗ trống A-F (Shared Panel)
    raw.p8.items.forEach((item, idx) => {
      const qNum = idx + 36;
      questions.push({
        id: `${code}_Q${qNum}`,
        number: qNum,
        section: 'reading',
        part: 4,
        type: 'reading_fill_blank_af',
        sharedPanelId: `${code}_PANEL_R4`,
        hanzi: item[0],
        pinyin: item[1],
        meaning: item[2],
        options: ['A', 'B', 'C', 'D', 'E', 'F'].map((k) => ({ key: k, label: k })),
        answer: item[3],
        explanation: item[4]
      });
    });

    return {
      examNumber: examNumber,
      examCode: code,
      title: `Đề thi chuẩn HSK 1 - Mã đề ${code}`,
      durationMinutes: 40,
      totalQuestions: 40,
      isFree: examNumber === 1,
      priceSingle: examNumber === 1 ? 0 : 49000,
      priceCombo: 99000,
      sharedPanels: {
        [`${code}_PANEL_L3`]: {
          title: 'Bảng tranh ghép hội thoại (Câu 11 - 15)',
          type: 'image_grid_af',
          items: raw.p3.panel
        },
        [`${code}_PANEL_R2`]: {
          title: 'Bảng tình huống minh họa (Câu 26 - 30)',
          type: 'image_grid_af',
          items: raw.p6.panel
        },
        [`${code}_PANEL_R3`]: {
          title: 'Bảng câu trả lời đối ứng (Câu 31 - 35)',
          type: 'sentence_list_af',
          items: raw.p7.panel
        },
        [`${code}_PANEL_R4`]: {
          title: 'Kho từ vựng điền khuyết (Câu 36 - 40)',
          type: 'word_bank_af',
          items: raw.p8.panel
        }
      },
      questions: questions
    };
  }

  // =========================================================================
  // DỮ LIỆU CHI TIẾT 10 ĐỀ HSK 1 (H11001 - H11010) CHUẨN CTI
  // =========================================================================
  const RAW_EXAMS = {
    // -----------------------------------------------------------------------
    // ĐỀ 01: H11001 (MIỄN PHÍ HOÀN TOÀN)
    // -----------------------------------------------------------------------
    1: {
      p1: [
        ['Hình: Một người đang uống trà nóng', '喝茶', 'hē chá', 'Uống trà', 'T', 'Hình vẽ người đang uống trà khớp với cụm từ 喝茶 (hē chá).'],
        ['Hình: Một học sinh đang đọc sách', '看电视', 'kàn diànshì', 'Xem tivi', 'F', 'Trong hình là đọc sách (看书), không phải xem tivi (看电视).'],
        ['Hình: Một quả táo đỏ trên bàn', '苹果', 'píngguǒ', 'Quả táo', 'T', 'Hình ảnh quả táo trùng khớp với danh từ 苹果 (píngguǒ).'],
        ['Hình: Trời đang mưa lớn', '下雪', 'xià xuě', 'Tuyết rơi', 'F', 'Hình vẽ trời mưa (下雨), trong khi băng đọc là tuyết rơi (下雪).'],
        ['Hình: Một người đang gọi điện thoại', '打电话', 'dǎ diànhuà', 'Gọi điện thoại', 'T', 'Hành động nghe gọi điện thoại khớp với 打电话 (dǎ diànhuà).']
      ],
      p2: [
        ['他是一位医生。', 'Tā shì yí wèi yīshēng.', 'Anh ấy là một bác sĩ.', ['A. Bác sĩ mặc áo blouse', 'B. Giáo viên trên bục giảng', 'C. Đầu bếp nấu ăn'], 'A', 'Từ khóa 医生 (yīshēng - bác sĩ) tương ứng với hình A.'],
        ['今天是十月五号。', 'Jīntiān shì shíyuè wǔ hào.', 'Hôm nay là ngày 5 tháng 10.', ['A. Lịch ngày 10 tháng 5', 'B. Lịch ngày 5 tháng 10', 'C. Lịch ngày 15 tháng 10'], 'B', '十月五号 (shíyuè wǔ hào) nghĩa là ngày 5 tháng 10, chọn B.'],
        ['这只小猫很漂亮。', 'Zhè zhī xiǎomāo hěn piàoliang.', 'Chú mèo nhỏ này rất đẹp.', ['A. Chú chó nhỏ', 'B. Chú mèo con', 'C. Con cá vàng'], 'B', 'Danh từ 小猫 (xiǎomāo - mèo con) khớp với hình B.'],
        ['我想买这件衣服。', 'Wǒ xiǎng mǎi zhè jiàn yīfu.', 'Tôi muốn mua bộ quần áo này.', ['A. Cửa hàng quần áo', 'B. Hiệu sách', 'C. Trạm xe buýt'], 'A', 'Cụm từ 买衣服 (mua quần áo) diễn ra tại cửa hàng thời trang ở hình A.'],
        ['现在是上午八点。', 'Xiànzài shì shàngwǔ bā diǎn.', 'Bây giờ là 8 giờ sáng.', ['A. Đồng hồ chỉ 6:00', 'B. Đồng hồ chỉ 10:00', 'C. Đồng hồ chỉ 8:00'], 'C', '八点 (bā diǎn) là 8 giờ đúng, tương ứng đồng hồ hình C.']
      ],
      p3: {
        panel: [
          { key: 'A', label: 'Đi máy bay đến Bắc Kinh', detail: '飞机 / 北京 (fēijī)' },
          { key: 'B', label: 'Uống một tách cà phê hoặc trà', detail: '喝水 / 喝茶 (hē chá)' },
          { key: 'C', label: 'Mua hoa quả ở cửa hàng', detail: '买水果 (mǎi shuǐguǒ)' },
          { key: 'D', label: 'Học tiếng Hán trên lớp', detail: '学习汉语 (xuéxí Hànyǔ)' },
          { key: 'E', label: 'Ăn cơm ở nhà hàng', detail: '吃饭 (chī fàn)' },
          { key: 'F', label: 'Đi taxi về nhà', detail: '出租车 (chūzūchē)' }
        ],
        items: [
          ['女：你去哪儿？ 男：我去商店买水果。', 'Nǚ: Nǐ qù nǎr? Nán: Wǒ qù shāngdiàn mǎi shuǐguǒ.', 'Nữ: Bạn đi đâu? Nam: Tôi đi cửa hàng mua hoa quả.', 'C', 'Từ khóa 买水果 (mua hoa quả) khớp với tranh C.'],
          ['男：你想喝什么？ 女：我想喝一点儿茶。', 'Nán: Nǐ xiǎng hē shénme? Nǚ: Wǒ xiǎng hē yìdiǎnr chá.', 'Nam: Bạn muốn uống gì? Nữ: Tôi muốn uống chút trà.', 'B', 'Hội thoại nhắc tới 喝茶 (uống trà), khớp với tranh B.'],
          ['女：你明天怎么去北京？ 男：我坐飞机去。', 'Nǚ: Nǐ míngtiān zěnme qù Běijīng? Nán: Wǒ zuò fēijī qù.', 'Nữ: Mai bạn đi Bắc Kinh bằng gì? Nam: Tôi đi bằng máy bay.', 'A', 'Cụm từ 坐飞机 (đi máy bay) khớp hoàn toàn với tranh A.'],
          ['男：你的汉语真好！ 女：谢谢，我喜欢学习汉语。', 'Nán: Nǐ de Hànyǔ zhēn hǎo! Nǚ: Xièxie, wǒ xǐhuan xuéxí Hànyǔ.', 'Nam: Tiếng Hán của bạn giỏi thật! Nữ: Cảm ơn, tôi thích học tiếng Hán.', 'D', 'Nội dung 学习汉语 (học tiếng Hán) khớp với tranh D.'],
          ['女：我们怎么回家？ 男：我们坐出租车回去吧。', 'Nǚ: Wǒmen zěnme huí jiā? Nán: Wǒmen zuò chūzūchē huíqù ba.', 'Nữ: Chúng ta về nhà thế nào? Nam: Chúng ta đi taxi về nhé.', 'F', 'Từ khóa 出租车 (xe taxi) khớp với tranh F.']
        ]
      },
      p4: [
        ['王先生今天不去医院，他在家休息。问：王先生现在在哪儿？', 'Wáng xiānsheng jīntiān bú qù yīyuàn, tā zài jiā xiūxi. Wèn: Wáng xiānsheng xiànzài zài nǎr?', 'Ông Vương hôm nay không đi bệnh viện, ông ấy ở nhà nghỉ ngơi. Hỏi: Ông Vương đang ở đâu?', ['A. 在医院 (Ở bệnh viện)', 'B. 在家 (Ở nhà)', 'C. 在学校 (Ở trường)'], 'B', 'Câu nghe nêu rõ 他在家休息 (ông ấy nghỉ ở nhà) nên chọn B.'],
        ['这个杯子二十块，那个杯子三十块。问：这个杯子多少钱？', 'Zhège bēizi èrshí kuài, nàge bēizi sānshí kuài. Wèn: Zhège bēizi duōshao qián?', 'Chiếc cốc này 20 tệ, chiếc cốc kia 30 tệ. Hỏi: Chiếc cốc này bao nhiêu tiền?', ['A. 20块 (20 tệ)', 'B. 30块 (30 tệ)', 'C. 50块 (50 tệ)'], 'A', 'Câu hỏi hỏi về 这个杯子 (chiếc cốc này) có giá 二十块 (20 tệ).'],
        ['李小姐的女儿今年五岁了。问：李小姐的女儿多大了？', 'Lǐ xiǎojiě de nǚ’ér jīnnián wǔ suì le. Wèn: Lǐ xiǎojiě de nǚ’ér duō dà le?', 'Con gái cô Lý năm nay 5 tuổi rồi. Hỏi: Con gái cô Lý bao nhiêu tuổi?', ['A. 4岁 (4 tuổi)', 'B. 5岁 (5 tuổi)', 'C. 6岁 (6 tuổi)'], 'B', 'Thông tin 五岁 (5 tuổi) khớp trực tiếp với đáp án B.'],
        ['我妈妈是老师，我爸爸是医生。问：谁是老师？', 'Wǒ māma shì lǎoshī, wǒ bàba shì yīshēng. Wèn: Shéi shì lǎoshī?', 'Mẹ tôi là giáo viên, bố tôi là bác sĩ. Hỏi: Ai là giáo viên?', ['A. 爸爸 (Bố)', 'B. 妈妈 (Mẹ)', 'C. 姐姐 (Chị gái)'], 'B', 'Trong băng đọc 我妈妈是老师 (mẹ tôi là giáo viên) nên chọn B.'],
        ['星期六上午我去朋友家看电影。问：我什么时候去看电影？', 'Xīngqīliù shàngwǔ wǒ qù péngyou jiā kàn diànyǐng. Wèn: Wǒ shénme shíhou qù kàn diànyǐng?', 'Sáng thứ Bảy tôi đến nhà bạn xem phim. Hỏi: Khi nào tôi đi xem phim?', ['A. 星期五 (Thứ Sáu)', 'B. 星期六上午 (Sáng thứ Bảy)', 'C. 星期日下午 (Chiều Chủ nhật)'], 'B', 'Thời gian 星期六上午 (sáng thứ Bảy) được nêu ngay đầu câu.']
      ],
      p5: [
        ['Hình: Một chiếc máy tính xách tay', '电脑', 'diànnǎo', 'Máy tính', 'T', 'Hình chiếc máy tính khớp với từ 电脑 (diànnǎo).'],
        ['Hình: Một bát cơm trắng', '米饭', 'mǐfàn', 'Cơm trắng', 'T', 'Hình bát cơm khớp hoàn toàn với từ 米饭 (mǐfàn).'],
        ['Hình: Một chiếc ghế tựa', '桌子', 'zhuōzi', 'Cái bàn', 'F', 'Hình vẽ là cái ghế (椅子 - yǐzi), không phải cái bàn (桌子 - zhuōzi).'],
        ['Hình: Con số 80', '十八', 'shíbā', 'Số 18', 'F', 'Hình hiển thị số 80 (八十 - bāshí), còn từ cho sẵn là 18 (十八).'],
        ['Hình: Một chiếc máy bay trên bầu trời', '飞机', 'fēijī', 'Máy bay', 'T', 'Hình máy bay khớp chính xác với danh từ 飞机 (fēijī).']
      ],
      p6: {
        panel: [
          { key: 'A', label: 'Hai người đang bắt tay chào hỏi lịch sự', detail: '认识 / 高兴' },
          { key: 'B', label: 'Một người đang ngồi viết chữ Hán', detail: '写汉字' },
          { key: 'C', label: 'Trời nắng nóng 38 độ C', detail: '天气很热' },
          { key: 'D', label: 'Một cô gái đang nấu cơm trong bếp', detail: '做饭' },
          { key: 'E', label: 'Một chàng trai đang ngủ trên giường', detail: '睡觉' },
          { key: 'F', label: 'Một học sinh đang đọc sách ở thư viện', detail: '看书' }
        ],
        items: [
          ['认识你很高兴。', 'Rènshi nǐ hěn gāoxìng.', 'Rất vui được làm quen với bạn.', 'A', 'Câu chào làm quen 认识你很高兴 ứng với cảnh bắt tay ở hình A.'],
          ['今天天气太热了。', 'Jīntiān tiānqì tài rè le.', 'Hôm nay thời tiết nóng quá.', 'C', 'Từ khóa 太热了 (nóng quá) ứng với hình C.'],
          ['妈妈在厨房做饭呢。', 'Māma zài chúfáng zuòfàn ne.', 'Mẹ đang nấu cơm trong bếp.', 'D', 'Hành động 做饭 (nấu ăn) tương ứng với hình D.'],
          ['弟弟正在学习写汉字。', 'Dìdi zhèngzài xuéxí xiě Hànzì.', 'Em trai đang học viết chữ Hán.', 'B', 'Cụm từ 写汉字 (viết chữ Hán) khớp với hình B.'],
          ['太晚了，我想去睡觉。', 'Tài wǎn le, wǒ xiǎng qù shuìjiào.', 'Muộn quá rồi, tôi muốn đi ngủ.', 'E', 'Động từ 睡觉 (đi ngủ) tương ứng với hình E.']
        ]
      },
      p7: {
        panel: [
          { key: 'A', label: '不客气。 (Bú kèqi. - Đừng khách sáo.)' },
          { key: 'B', label: '明天是星期三。 (Míngtiān shì xīngqīsān. - Ngày mai là thứ Tư.)' },
          { key: 'C', label: '在桌子上面呢。 (Zài zhuōzi shàngmiàn ne. - Ở trên mặt bàn kìa.)' },
          { key: 'D', label: '他是我的汉语老师。 (Tā shì wǒ de Hànyǔ lǎoshī. - Ông ấy là thầy giáo tiếng Hán của tôi.)' },
          { key: 'E', label: '好啊，我们一起去吧。 (Hǎo a, wǒmen yìqǐ qù ba. - Được đấy, chúng mình cùng đi nhé.)' },
          { key: 'F', label: '我今年二十岁。 (Wǒ jīnnián èrshí suì. - Năm nay tôi 20 tuổi.)' }
        ],
        items: [
          ['请问，那个人是谁？', 'Qǐngwèn, nàge rén shì shéi?', 'Xin hỏi, người kia là ai?', 'D', 'Câu hỏi 是谁 (là ai) khớp với câu trả lời giới thiệu thầy giáo ở D.'],
          ['我的茶杯在哪儿？', 'Wǒ de chábēi zài nǎr?', 'Cốc trà của tôi ở đâu?', 'C', 'Câu hỏi vị trí 在哪儿 (ở đâu) khớp với cụm chỉ vị trí 在桌子上面 ở C.'],
          ['明天是星期几？', 'Míngtiān shì xīngqījǐ?', 'Ngày mai là thứ mấy?', 'B', 'Hỏi 星期几 (thứ mấy) trả lời 星期三 (thứ Tư) ở B.'],
          ['谢谢你的帮助！', 'Xièxie nǐ de bāngzhù!', 'Cảm ơn sự giúp đỡ của bạn!', 'A', 'Đáp lại lời cảm ơn 谢谢 bằng 不客气 (đừng khách sáo) ở A.'],
          ['下午我们去书店买书，好吗？', 'Xiàwǔ wǒmen qù shūdiàn mǎi shū, hǎo ma?', 'Chiều nay chúng ta đi hiệu sách mua sách, được không?', 'E', 'Câu rủ rê có đuôi 好吗 đáp lại bằng 好啊，我们一起去吧 ở E.']
        ]
      },
      p8: {
        panel: [
          { key: 'A', label: '名字 (míngzi - tên)' },
          { key: 'B', label: '哪儿 (nǎr - ở đâu)' },
          { key: 'C', label: '多少 (duōshao - bao nhiêu)' },
          { key: 'D', label: '工作 (gōngzuò - làm việc)' },
          { key: 'E', label: '高兴 (gāoxìng - vui vẻ)' },
          { key: 'F', label: '怎么 (zěnme - như thế nào)' }
        ],
        items: [
          ['请问，你叫什么（  ）？', 'Qǐngwèn, nǐ jiào shénme (  )?', 'Xin hỏi, bạn tên là gì?', 'A', 'Cấu trúc hỏi tên chuẩn: 你叫什么名字？ (chọn A).'],
          ['这件衣服（  ）钱？', 'Zhè jiàn yīfu (  ) qián?', 'Bộ quần áo này bao nhiêu tiền?', 'C', 'Hỏi giá tiền dùng cụm 多少钱 (duōshao qián - chọn C).'],
          ['我哥哥在医院（  ）。', 'Wǒ gēge zài yīyuàn (  ).', 'Anh trai tôi làm việc ở bệnh viện.', 'D', 'Sau trạng ngữ chỉ nơi chốn 在医院 cần động từ 工作 (làm việc - chọn D).'],
          ['这个汉字（  ）读？', 'Zhège Hànzì (  ) dú?', 'Chữ Hán này đọc như thế nào?', 'F', 'Hỏi cách thức thực hiện hành động dùng 怎么 + Động từ (怎么读 - chọn F).'],
          ['今天能看见老朋友，我非常（  ）。', 'Jīntiān néng kànjiàn lǎo péngyou, wǒ fēicháng (  ).', 'Hôm nay gặp lại bạn cũ, tôi vô cùng vui mừng.', 'E', 'Sau phó từ chỉ mức độ 非常 cần tính từ 高兴 (vui vẻ - chọn E).']
        ]
      }
    },

    // -----------------------------------------------------------------------
    // ĐỀ 02: H11002
    // -----------------------------------------------------------------------
    2: {
      p1: [
        ['Hình: Một người đang lái xe ô tô', '开车', 'kāi chē', 'Lái xe', 'T', 'Hình ảnh người cầm vô lăng khớp với động từ 开车 (kāi chē).'],
        ['Hình: Một học sinh đang nghe nhạc', '写字', 'xiě zì', 'Viết chữ', 'F', 'Trong hình đang nghe nhạc, không phải viết chữ (写字).'],
        ['Hình: Một chú chó đang chạy trên cỏ', '小狗', 'xiǎogǒu', 'Chú chó nhỏ', 'T', 'Hình chú chó khớp với danh từ 小狗 (xiǎogǒu).'],
        ['Hình: Một ly nước lọc trên bàn', '米饭', 'mǐfàn', 'Cơm trắng', 'F', 'Hình vẽ là ly nước (一杯水), không phải cơm trắng (米饭).'],
        ['Hình: Hai người đang vẫy tay tạm biệt', '再见', 'zàijiàn', 'Tạm biệt', 'T', 'Hành động vẫy tay chào tạm biệt khớp với từ 再见 (zàijiàn).']
      ],
      p2: [
        ['我妈妈喜欢吃水果。', 'Wǒ māma xǐhuan chī shuǐguǒ.', 'Mẹ tôi thích ăn hoa quả.', ['A. Đĩa hoa quả tươi', 'B. Bát mì nóng', 'C. Tách cà phê'], 'A', 'Danh từ 水果 (shuǐguǒ - hoa quả) tương ứng với hình A.'],
        ['他在学校看书呢。', 'Tā zài xuéxiào kàn shū ne.', 'Cậu ấy đang đọc sách ở trường.', ['A. Đang đá bóng', 'B. Đang đọc sách', 'C. Đang ngủ'], 'B', 'Hành động 看书 (đọc sách) tương ứng với hình B.'],
        ['今天冷，请多穿一点儿衣服。', 'Jīntiān lěng, qǐng duō chuān yìdiǎnr yīfu.', 'Hôm nay lạnh, hãy mặc thêm quần áo.', ['A. Trời nắng đi bơi', 'B. Mặc áo ấm mùa đông', 'C. Ăn kem mùa hè'], 'B', 'Từ khóa 冷 (lạnh) và 穿衣服 (mặc quần áo) khớp với hình B.'],
        ['桌子上有一台电脑。', 'Zhuōzi shàng yǒu yì tái diànnǎo.', 'Trên bàn có một chiếc máy tính.', ['A. Máy tính trên bàn', 'B. Quả bóng dưới ghế', 'C. Cốc trà trên ghế'], 'A', 'Cụm 桌子上有一台电脑 khớp chính xác với hình A.'],
        ['我们下午三点去火车站。', 'Wǒmen xiàwǔ sān diǎn qù huǒchēzhàn.', '3 giờ chiều chúng tôi đi ga tàu hỏa.', ['A. Sân bay', 'B. Ga tàu hỏa (3:00)', 'C. Bệnh viện'], 'B', 'Từ khóa 火车站 (ga tàu hỏa) và 三点 (3 giờ) ứng với hình B.']
      ],
      p3: {
        panel: [
          { key: 'A', label: 'Đi xem phim ở rạp', detail: '看电影 (kàn diànyǐng)' },
          { key: 'B', label: 'Nấu các món ăn Trung Quốc', detail: '做中国菜 (zuò Zhōngguócài)' },
          { key: 'C', label: 'Gọi điện thoại cho bạn học', detail: '给同学打电话 (dǎ diànhuà)' },
          { key: 'D', label: 'Mua cốc cà phê nóng', detail: '买杯子 / 喝水' },
          { key: 'E', label: 'Ngồi học trên ghế trong lớp', detail: '坐椅子 / 上课' },
          { key: 'F', label: 'Đến bệnh viện khám bác sĩ', detail: '去医院 (qù yīyuàn)' }
        ],
        items: [
          ['男：你在做什么呢？ 女：我在做中国菜。', 'Nán: Nǐ zài zuò shénme ne? Nǚ: Wǒ zài zuò Zhōngguócài.', 'Nam: Bạn đang làm gì đấy? Nữ: Tôi đang nấu món Trung Quốc.', 'B', 'Cụm từ 做中国菜 (nấu món Trung Quốc) khớp với tranh B.'],
          ['女：晚上我们去哪儿？ 男：我们去看电影吧。', 'Nǚ: Wǎnshang wǒmen qù nǎr? Nán: Wǒmen qù kàn diànyǐng ba.', 'Nữ: Tối nay chúng ta đi đâu? Nam: Chúng ta đi xem phim nhé.', 'A', 'Hoạt động 看电影 (xem phim) khớp với tranh A.'],
          ['男：你在给谁打电话？ 女：给我的大学同学。', 'Nán: Nǐ zài gěi shéi dǎ diànhuà? Nǚ: Gěi wǒ de dàxué tóngxué.', 'Nam: Bạn đang gọi điện cho ai thế? Nữ: Cho bạn đại học của tôi.', 'C', 'Hành động 打电话 (gọi điện thoại) khớp với tranh C.'],
          ['女：张先生今天怎么没来工作？ 男：他去医院了。', 'Nǚ: Zhāng xiānsheng jīntiān zěnme méi lái gōngzuò? Nán: Tā qù yīyuàn le.', 'Nữ: Sao hôm nay ông Trương không đi làm? Nam: Ông ấy đi bệnh viện rồi.', 'F', 'Địa điểm 医院 (bệnh viện) khớp với tranh F.'],
          ['男：请问，我可以坐这儿吗？ 女：请坐。', 'Nán: Qǐngwèn, wǒ kěyǐ zuò zhèr ma? Nǚ: Qǐng zuò.', 'Nam: Xin hỏi, tôi có thể ngồi đây không? Nữ: Mời ngồi.', 'E', 'Hành động 坐 (ngồi) trong lớp học khớp với tranh E.']
        ]
      },
      p4: [
        ['大卫是美国人，他在中国学习汉语。问：大卫是哪国人？', 'Dàwèi shì Měiguórén, tā zài Zhōngguó xuéxí Hànyǔ. Wèn: Dàwèi shì nǎ guó rén?', 'David là người Mỹ, anh ấy học tiếng Hán ở Trung Quốc. Hỏi: David là người nước nào?', ['A. 中国人 (Người Trung Quốc)', 'B. 美国人 (Người Mỹ)', 'C. 英国人 (Người Anh)'], 'B', 'Câu đầu nêu rõ 大卫是美国人 (David là người Mỹ).'],
        ['我家里有四口人：爸爸、妈妈、姐姐和我。问：他家有几口人？', 'Wǒ jiālǐ yǒu sì kǒu rén: bàba, māma, jiějie hé wǒ. Wèn: Tā jiā yǒu jǐ kǒu rén?', 'Nhà tôi có 4 người: bố, mẹ, chị gái và tôi. Hỏi: Nhà anh ấy có mấy người?', ['A. 三口人 (3 người)', 'B. 四口人 (4 người)', 'C. 五口人 (5 người)'], 'B', 'Thông tin 四口人 (4 người) khớp trực tiếp với đáp án B.'],
        ['这本汉语书五十块，那本三十块。问：汉语书多少钱？', 'Zhè běn Hànyǔ shū wǔshí kuài, nà běn sānshí kuài. Wèn: Hànyǔ shū duōshao qián?', 'Quyển sách tiếng Hán này 50 tệ, quyển kia 30 tệ. Hỏi: Sách tiếng Hán giá bao nhiêu?', ['A. 30块 (30 tệ)', 'B. 50块 (50 tệ)', 'C. 80块 (80 tệ)'], 'B', '这本汉语书五十块 cho biết sách tiếng Hán giá 50 tệ.'],
        ['昨天是星期二，明天是星期四。问：今天是星期几？', 'Zuótiān shì xīngqī’èr, míngtiān shì xīngqīsì. Wèn: Jīntiān shì xīngqījǐ?', 'Hôm qua là thứ Ba, ngày mai là thứ Năm. Hỏi: Hôm nay là thứ mấy?', ['A. 星期二 (Thứ Ba)', 'B. 星期三 (Thứ Tư)', 'C. 星期四 (Thứ Năm)'], 'B', 'Hôm qua thứ Ba, ngày mai thứ Năm thì hôm nay là thứ Tư (星期三).'],
        ['姐姐喜欢买衣服，妹妹喜欢买书。问：妹妹喜欢买什么？', 'Jiějie xǐhuan mǎi yīfu, mèimei xǐhuan mǎi shū. Wèn: Mèimei xǐhuan mǎi shénme?', 'Chị gái thích mua quần áo, em gái thích mua sách. Hỏi: Em gái thích mua gì?', ['A. 衣服 (Quần áo)', 'B. 书 (Sách)', 'C. 水果 (Hoa quả)'], 'B', 'Câu nghe nói rõ 妹妹喜欢买书 (em gái thích mua sách).']
      ],
      p5: [
        ['Hình: Một chiếc tivi màn hình phẳng', '电视', 'diànshì', 'Tivi', 'T', 'Hình chiếc tivi khớp với danh từ 电视 (diànshì).'],
        ['Hình: Một người đang chạy bộ', '睡觉', 'shuìjiào', 'Đi ngủ', 'F', 'Hình vẽ người đang chạy bộ, không phải đi ngủ (睡觉).'],
        ['Hình: Ga tàu hỏa và đoàn tàu', '火车站', 'huǒchēzhàn', 'Ga tàu hỏa', 'T', 'Hình nhà ga và đoàn tàu khớp với 火车站 (huǒchēzhàn).'],
        ['Hình: Một chiếc cốc thủy tinh', '盘子', 'pánzi', 'Cái đĩa', 'F', 'Trong hình là cái cốc (杯子 - bēizi), không phải cái đĩa.'],
        ['Hình: Một học sinh đang giơ tay phát biểu', '学生', 'xuésheng', 'Học sinh', 'T', 'Hình ảnh học sinh trong lớp khớp với từ 学生 (xuésheng).']
      ],
      p6: {
        panel: [
          { key: 'A', label: 'Một chú chó đang nằm dưới gầm ghế', detail: '椅子下面 (yǐzi xiàmiàn)' },
          { key: 'B', label: 'Hai bạn học đang đi bộ đến trường', detail: '去学校 (qù xuéxiào)' },
          { key: 'C', label: 'Một người đang nghe điện thoại', detail: '打电话 / 喂' },
          { key: 'D', label: 'Một người đang mua táo ở sạp trái cây', detail: '买苹果 (mǎi píngguǒ)' },
          { key: 'E', label: 'Một gia đình đang ăn tối vui vẻ', detail: '吃晚饭 (chī wǎnfàn)' },
          { key: 'F', label: 'Trời đang mưa bên ngoài cửa sổ', detail: '下雨 (xià yǔ)' }
        ],
        items: [
          ['小狗在椅子下面呢。', 'Xiǎogǒu zài yǐzi xiàmiàn ne.', 'Chú chó nhỏ đang ở dưới gầm ghế kìa.', 'A', 'Vị trí 椅子下面 (dưới ghế) khớp hoàn toàn với hình A.'],
          ['今天外面下雨了，我们不去商店了。', 'Jīntiān wàimiàn xià yǔ le, wǒmen bú qù shāngdiàn le.', 'Hôm nay bên ngoài mưa rồi, chúng ta không đi cửa hàng nữa.', 'F', 'Hiện tượng 下雨 (trời mưa) khớp với hình F.'],
          ['我想买几斤苹果。', 'Wǒ xiǎng mǎi jǐ jīn píngguǒ.', 'Tôi muốn mua vài cân táo.', 'D', 'Hành động 买苹果 (mua táo) tương ứng với hình D.'],
          ['喂，请问王老师在家吗？', 'Wéi, qǐngwèn Wáng lǎoshī zài jiā ma?', 'Alo, xin hỏi thầy Vương có ở nhà không ạ?', 'C', 'Từ mở đầu cuộc gọi 喂 (Alo) ứng với người đang gọi điện ở hình C.'],
          ['早上八点，我和同学一起去学校。', 'Zǎoshang bā diǎn, wǒ hé tóngxué yìqǐ qù xuéxiào.', '8 giờ sáng, tôi cùng bạn học đi đến trường.', 'B', 'Hoạt động 去学校 (đi đến trường) cùng bạn học khớp với hình B.']
        ]
      },
      p7: {
        panel: [
          { key: 'A', label: '没关系。 (Méi guānxi. - Không sao đâu.)' },
          { key: 'B', label: '她今年十二岁。 (Tā jīnnián shí’èr suì. - Năm nay em ấy 12 tuổi.)' },
          { key: 'C', label: '我会说一点儿。 (Wǒ huì shuō yìdiǎnr. - Tôi biết nói một chút.)' },
          { key: 'D', label: '九月十号。 (Jiǔyuè shí hào. - Ngày 10 tháng 9.)' },
          { key: 'E', label: '我去北京饭店。 (Wǒ qù Běijīng Fàndiàn. - Tôi đi khách sạn Bắc Kinh.)' },
          { key: 'F', label: '我买了一本汉语书。 (Wǒ mǎile yì běn Hànyǔ shū. - Tôi đã mua một quyển sách tiếng Hán.)' }
        ],
        items: [
          ['对不起，我今天来晚了。', 'Duìbuqǐ, wǒ jīntiān lái wǎn le.', 'Xin lỗi, hôm nay tôi đến muộn.', 'A', 'Đáp lại lời xin lỗi 对不起 luôn là 没关系 (không sao đâu) ở A.'],
          ['你会说汉语吗？', 'Nǐ huì shuō Hànyǔ ma?', 'Bạn có biết nói tiếng Hán không?', 'C', 'Câu hỏi năng lực 会说...吗 khớp với câu trả lời 我会说一点儿 ở C.'],
          ['你在书店买了什么？', 'Nǐ zài shūdiàn mǎile shénme?', 'Bạn đã mua gì ở hiệu sách?', 'F', 'Hỏi 买了什么 (đã mua gì) khớp với 我买了一本汉语书 ở F.'],
          ['你的妹妹今年多大了？', 'Nǐ de mèimei jīnnián duō dà le?', 'Em gái bạn năm nay bao nhiêu tuổi?', 'B', 'Hỏi tuổi 多大了 của em gái khớp với 她今年十二岁 ở B.'],
          ['请问，您去哪儿？', 'Qǐngwèn, nín qù nǎr?', 'Xin hỏi, ngài đi đâu ạ?', 'E', 'Hỏi điểm đến 去哪儿 khớp với 我去北京饭店 ở E.']
        ]
      },
      p8: {
        panel: [
          { key: 'A', label: '会 (huì - biết làm gì)' },
          { key: 'B', label: '本 (běn - quyển, cuốn)' },
          { key: 'C', label: '岁 (suì - tuổi)' },
          { key: 'D', label: '冷 (lěng - lạnh)' },
          { key: 'E', label: '听 (tīng - nghe)' },
          { key: 'F', label: '吃 (chī - ăn)' }
        ],
        items: [
          ['我姐姐喜欢（  ）中国菜。', 'Wǒ jiějie xǐhuan (  ) Zhōngguócài.', 'Chị gái tôi thích ăn món Trung Quốc.', 'F', 'Trước tân ngữ 中国菜 (món ăn Trung Quốc) cần động từ 吃 (ăn - chọn F).'],
          ['桌子上有一（  ）汉语书。', 'Zhuōzi shàng yǒu yì (  ) Hànyǔ shū.', 'Trên bàn có một quyển sách tiếng Hán.', 'B', 'Lượng từ chuẩn đi với sách (书) là 本 (quyển - chọn B).'],
          ['李老师的儿子今年三（  ）了。', 'Lǐ lǎoshī de érzi jīnnián sān (  ) le.', 'Con trai thầy Lý năm nay 3 tuổi rồi.', 'C', 'Sau số từ chỉ độ tuổi cần danh từ đơn vị 岁 (tuổi - chọn C).'],
          ['我妈妈（  ）写漂亮的汉字。', 'Wǒ māma (  ) xiě piàoliang de Hànzì.', 'Mẹ tôi biết viết chữ Hán rất đẹp.', 'A', 'Động từ năng nguyện chỉ kỹ năng học được là 会 (biết - chọn A).'],
          ['北京的冬天天气很（  ）。', 'Běijīng de dōngtiān tiānqì hěn (  ).', 'Mùa đông ở Bắc Kinh thời tiết rất lạnh.', 'D', 'Miêu tả thời tiết mùa đông Bắc Kinh dùng tính từ 冷 (lạnh - chọn D).']
        ]
      }
    },

    // -----------------------------------------------------------------------
    // ĐỀ 03: H11003
    // -----------------------------------------------------------------------
    3: {
      p1: [
        ['Hình: Một bệnh viện lớn có dấu chữ thập', '医院', 'yīyuàn', 'Bệnh viện', 'T', 'Hình tòa nhà bệnh viện khớp với danh từ 医院 (yīyuàn).'],
        ['Hình: Một người đang ăn mì', '喝水', 'hē shuǐ', 'Uống nước', 'F', 'Hình vẽ đang ăn mì, không phải uống nước (喝水).'],
        ['Hình: Ba quyển sách xếp chồng lên nhau', '三本书', 'sān běn shū', 'Ba quyển sách', 'T', 'Số lượng 3 quyển sách khớp với cụm 三本书 (sān běn shū).'],
        ['Hình: Một người đang ngồi trên ghế', '站', 'zhàn', 'Đứng', 'F', 'Người trong hình đang ngồi (坐 - zuò), không phải đứng.'],
        ['Hình: Một cơn mưa lớn ngoài trời', '下雨', 'xià yǔ', 'Trời mưa', 'T', 'Hình vẽ trời mưa khớp với động từ 下雨 (xià yǔ).']
      ],
      p2: [
        ['我每天早上七点起床。', 'Wǒ měitiān zǎoshang qī diǎn qǐchuáng.', 'Tôi thức dậy lúc 7 giờ sáng mỗi ngày.', ['A. Đồng hồ 7:00 thức dậy', 'B. Đang ăn trưa lúc 12:00', 'C. Đi ngủ lúc 10:00 tối'], 'A', '七点 (7 giờ) thức dậy buổi sáng khớp với hình A.'],
        ['她去商店买水果了。', 'Tā qù shāngdiàn mǎi shuǐguǒ le.', 'Cô ấy đi cửa hàng mua hoa quả rồi.', ['A. Đang chọn mua trái cây', 'B. Đang khám bệnh', 'C. Đang dạy học'], 'A', 'Cụm từ 买水果 (mua hoa quả) khớp với hình A.'],
        ['我的小狗在椅子下面睡觉。', 'Wǒ de xiǎogǒu zài yǐzi xiàmiàn shuìjiào.', 'Chú chó nhỏ của tôi đang ngủ dưới ghế.', ['A. Mèo trên bàn', 'B. Chó ngủ dưới ghế', 'C. Cá bơi trong bể'], 'B', 'Hình ảnh chú chó dưới ghế khớp với 小狗在椅子下面 ở B.'],
        ['请给我一杯热茶。', 'Qǐng gěi wǒ yì bēi rè chá.', 'Làm ơn cho tôi một cốc trà nóng.', ['A. Một cốc trà nóng', 'B. Một đĩa cơm', 'C. Một quyển vở'], 'A', '一杯热茶 (một cốc trà nóng) tương ứng với hình A.'],
        ['我爸爸在医院工作，他是医生。', 'Wǒ bàba zài yīyuàn gōngzuò, tā shì yīshēng.', 'Bố tôi làm việc ở bệnh viện, ông ấy là bác sĩ.', ['A. Bác sĩ trong bệnh viện', 'B. Tài xế lái xe', 'C. Học sinh đọc sách'], 'A', 'Từ khóa 医院 (bệnh viện) và 医生 (bác sĩ) khớp với hình A.']
      ],
      p3: {
        panel: [
          { key: 'A', label: 'Xem tivi ở phòng khách', detail: '看电视 (kàn diànshì)' },
          { key: 'B', label: 'Đi máy bay du lịch', detail: '坐飞机 (zuò fēijī)' },
          { key: 'C', label: 'Đọc sách trong thư viện', detail: '看书 (kàn shū)' },
          { key: 'D', label: 'Mua quần áo mới', detail: '买衣服 (mǎi yīfu)' },
          { key: 'E', label: 'Ăn cơm cùng bạn bè', detail: '一起吃饭 (chī fàn)' },
          { key: 'F', label: 'Học viết chữ trên máy tính', detail: '用电脑 (diànnǎo)' }
        ],
        items: [
          ['女：你喜欢看电影还是看电视？ 男：我喜欢在家看电视。', 'Nǚ: Nǐ xǐhuan kàn diànyǐng háishi kàn diànshì? Nán: Wǒ xǐhuan zài jiā kàn diànshì.', 'Nữ: Bạn thích xem phim hay xem tivi? Nam: Tôi thích ở nhà xem tivi.', 'A', 'Cụm từ 在家看电视 (xem tivi ở nhà) khớp với tranh A.'],
          ['男：这件衣服多少钱？ 女：八十块。', 'Nán: Zhè jiàn yīfu duōshao qián? Nǚ: Bāshí kuài.', 'Nam: Bộ quần áo này bao nhiêu tiền? Nữ: 80 tệ.', 'D', 'Tình huống hỏi giá 这件衣服 (bộ quần áo này) khớp với tranh D.'],
          ['女：中午你去哪儿吃饭？ 男：我和同学去饭店吃。', 'Nǚ: Zhōngwǔ nǐ qù nǎr chī fàn? Nán: Wǒ hé tóngxué qù fàndiàn chī.', 'Nữ: Trưa nay bạn đi đâu ăn cơm? Nam: Tôi cùng bạn học ra nhà hàng ăn.', 'E', 'Hoạt động ăn cơm cùng bạn học khớp với tranh E.'],
          ['男：你看见我的电脑了吗？ 女：在桌子上呢，弟弟在用。', 'Nán: Nǐ kànjiàn wǒ de diànnǎo le ma? Nǚ: Zài zhuōzi shàng ne, dìdi zài yòng.', 'Nam: Bạn có thấy máy tính của tôi không? Nữ: Ở trên bàn kìa, em trai đang dùng.', 'F', 'Từ khóa 电脑 (máy tính) khớp với tranh F.'],
          ['女：安静一点儿，大家都在看书呢。 男：对不起。', 'Nǚ: Ānjìng yìdiǎnr, dàjiā dōu zài kàn shū ne. Nán: Duìbuqǐ.', 'Nữ: Yên lặng chút nhé, mọi người đều đang đọc sách. Nam: Xin lỗi.', 'C', 'Hoạt động 看书 (đọc sách) khớp với tranh C.']
        ]
      },
      p4: [
        ['今天是八月二号，明天是我妈妈的生日。问：妈妈的生日是几月几号？', 'Jīntiān shì bāyuè èr hào, míngtiān shì wǒ māma de shēngrì. Wèn: Māma de shēngrì shì jǐ yuè jǐ hào?', 'Hôm nay là ngày 2/8, ngày mai là sinh nhật mẹ tôi. Hỏi: Sinh nhật mẹ là ngày mấy?', ['A. 8月1号 (Ngày 1/8)', 'B. 8月2号 (Ngày 2/8)', 'C. 8月3号 (Ngày 3/8)'], 'C', 'Hôm nay 2/8, ngày mai là sinh nhật nên rơi vào ngày 3/8 (八月三号).'],
        ['小王在学校学习汉语，他会说汉语，也会写汉字。问：小王会做什么？', 'Xiǎo Wáng zài xuéxiào xuéxí Hànyǔ, tā huì shuō Hànyǔ, yě huì xiě Hànzì. Wèn: Xiǎo Wáng huì zuò shénme?', 'Tiểu Vương học tiếng Hán ở trường, cậu ấy biết nói tiếng Hán và biết viết chữ Hán. Hỏi: Tiểu Vương biết làm gì?', ['A. 做中国菜 (Nấu món Trung)', 'B. 写汉字 (Viết chữ Hán)', 'C. 开车 (Lái xe)'], 'B', 'Câu nghe nêu rõ 也会写汉字 (cũng biết viết chữ Hán).'],
        ['我上午去商店买了五个苹果和三个杯子。问：他买了几个苹果？', 'Wǒ shàngwǔ qù shāngdiàn mǎile wǔ ge píngguǒ hé sān ge bēizi. Wèn: Tā mǎile jǐ ge píngguǒ?', 'Sáng nay tôi đi cửa hàng mua 5 quả táo và 3 cái cốc. Hỏi: Anh ấy mua mấy quả táo?', ['A. 三个 (3 quả)', 'B. 五个 (5 quả)', 'C. 八个 (8 quả)'], 'B', 'Số lượng táo là 五个苹果 (5 quả táo).'],
        ['陳老师今天下午三点坐飞机去上海。问：陈老师什么时候去上海？', 'Chén lǎoshī jīntiān xiàwǔ sān diǎn zuò fēijī qù Shànghǎi. Wèn: Chén lǎoshī shénme shíhou qù Shànghǎi?', 'Chiều nay 3 giờ cô Trần đi máy bay tới Thượng Hải. Hỏi: Khi nào cô Trần đi Thượng Hải?', ['A. 上午三点 (3 giờ sáng)', 'B. 下午三点 (3 giờ chiều)', 'C. 晚上八点 (8 giờ tối)'], 'B', 'Thời gian chính xác là 今天下午三点 (3 giờ chiều hôm nay).'],
        ['桌子上没有水，只有一杯茶。问：桌子上有什么？', 'Zhuōzi shàng méiyǒu shuǐ, zhǐyǒu yì bēi chá. Wèn: Zhuōzi shàng yǒu shénme?', 'Trên bàn không có nước lọc, chỉ có một cốc trà. Hỏi: Trên bàn có gì?', ['A. 一杯水 (Một cốc nước)', 'B. 一杯茶 (Một cốc trà)', 'C. 一本书 (Một quyển sách)'], 'B', 'Câu nghe khẳng định 只有一杯茶 (chỉ có một cốc trà).']
      ],
      p5: [
        ['Hình: Một chiếc ghế gỗ', '椅子', 'yǐzi', 'Cái ghế', 'T', 'Hình chiếc ghế khớp chính xác với danh từ 椅子 (yǐzi).'],
        ['Hình: Một chiếc xe taxi màu vàng', '出租车', 'chūzūchē', 'Xe taxi', 'T', 'Hình xe taxi khớp với từ 出租车 (chūzūchē).'],
        ['Hình: Một người đang đọc báo/sách', '听音乐', 'tīng yīnyuè', 'Nghe nhạc', 'F', 'Người trong hình đang đọc sách, không phải nghe nhạc.'],
        ['Hình: Đồng hồ chỉ 12 giờ đúng', '十二点', 'shí’èr diǎn', '12 giờ', 'T', 'Đồng hồ chỉ 12:00 khớp với 十二点 (shí’èr diǎn).'],
        ['Hình: Một quả chuối vàng', '苹果', 'píngguǒ', 'Quả táo', 'F', 'Trong hình là quả chuối, không phải quả táo (苹果).']
      ],
      p6: {
        panel: [
          { key: 'A', label: 'Một người đang mua vé ở ga tàu', detail: '火车站 (huǒchēzhàn)' },
          { key: 'B', label: 'Một cô giáo đang giảng bài trên bảng', detail: '老师 (lǎoshī)' },
          { key: 'C', label: 'Một em bé đang ngủ say', detail: '睡觉 (shuìjiào)' },
          { key: 'D', label: 'Hai người đang uống trà trò chuyện', detail: '喝茶说话 (hē chá)' },
          { key: 'E', label: 'Một người đang gõ bàn phím máy tính', detail: '电脑工作 (diànnǎo)' },
          { key: 'F', label: 'Một chú mèo đang nằm trên ghế', detail: '猫在椅子上 (māo)' }
        ],
        items: [
          ['李小姐是我们的汉语老师。', 'Lǐ xiǎojiě shì wǒmen de Hànyǔ lǎoshī.', 'Cô Lý là giáo viên tiếng Hán của chúng tôi.', 'B', 'Danh từ 老师 (giáo viên) ứng với hình cô giáo đang giảng bài ở B.'],
          ['那只小猫在椅子上面呢。', 'Nà zhī xiǎomāo zài yǐzi shàngmiàn ne.', 'Chú mèo nhỏ kia đang ở trên ghế kìa.', 'F', 'Hình ảnh chú mèo nằm trên ghế khớp với câu mô tả ở F.'],
          ['我和朋友在饭店喝茶说话。', 'Wǒ hé péngyou zài fàndiàn hē chá shuōhuà.', 'Tôi và bạn uống trà trò chuyện ở nhà hàng.', 'D', 'Hoạt động 喝茶说话 (uống trà nói chuyện) khớp với hình D.'],
          ['儿子太累了，他在床上睡觉呢。', 'Érzi tài lèi le, tā zài chuáng shàng shuìjiào ne.', 'Con trai mệt quá rồi, bé đang ngủ trên giường.', 'C', 'Động từ 睡觉 (ngủ) khớp với hình C.'],
          ['爸爸用电脑工作呢。', 'Bàba yòng diànnǎo gōngzuò ne.', 'Bố đang dùng máy tính làm việc.', 'E', 'Cụm từ 用电脑工作 (dùng máy tính làm việc) khớp với hình E.']
        ]
      },
      p7: {
        panel: [
          { key: 'A', label: '太好了，谢谢你！ (Tài hǎo le, xièxie nǐ! - Tốt quá, cảm ơn bạn!)' },
          { key: 'B', label: '我在看书呢。 (Wǒ zài kàn shū ne. - Tôi đang đọc sách.)' },
          { key: 'C', label: '不，那是王医生的。 (Bù, nà shì Wáng yīshēng de. - Không, đó là của bác sĩ Vương.)' },
          { key: 'D', label: '今天天气很好，不冷。 (Jīntiān tiānqì hěn hǎo, bù lěng. - Thời tiết hôm nay rất tốt, không lạnh.)' },
          { key: 'E', label: '认识你我也很高兴。 (Rènshi nǐ wǒ yě hěn gāoxìng. - Tôi cũng rất vui được quen bạn.)' },
          { key: 'F', label: '我星期五去。 (Wǒ xīngqīwǔ qù. - Thứ Sáu tôi đi.)' }
        ],
        items: [
          ['今天天气怎么样？', 'Jīntiān tiānqì zěnmeyàng?', 'Hôm nay thời tiết thế nào?', 'D', 'Hỏi thời tiết 天气怎么样 khớp với câu trả lời 今天天气很好，不冷 ở D.'],
          ['你在做什么呢？', 'Nǐ zài zuò shénme ne?', 'Bạn đang làm gì thế?', 'B', 'Hỏi hành động đang diễn ra 在做什么 khớp với 我在看书呢 ở B.'],
          ['这个杯子是你的吗？', 'Zhège bēizi shì nǐ de ma?', 'Chiếc cốc này có phải của bạn không?', 'C', 'Câu hỏi xác nhận sở hữu 是你的吗 khớp với 不，那是王医生的 ở C.'],
          ['你什么时候去北京？', 'Nǐ shénme shíhou qù Běijīng?', 'Khi nào bạn đi Bắc Kinh?', 'F', 'Hỏi thời gian 什么时候去 khớp với 我星期五去 ở F.'],
          ['你好，认识你很高兴！', 'Nǐ hǎo, rènshi nǐ hěn gāoxìng!', 'Xin chào, rất vui được làm quen với bạn!', 'E', 'Đáp lại lời chào làm quen bằng 认识你我也很高兴 ở E.']
        ]
      },
      p8: {
        panel: [
          { key: 'A', label: '坐 (zuò - ngồi, đi bằng phương tiện)' },
          { key: 'B', label: '写 (xiě - viết)' },
          { key: 'C', label: '家 (jiā - nhà, gia đình)' },
          { key: 'D', label: '前 (qián - phía trước, trước khi)' },
          { key: 'E', label: '谁 (shéi - ai)' },
          { key: 'F', label: '热 (rè - nóng)' }
        ],
        items: [
          ['我们（  ）出租车去火车站吧。', 'Wǒmen (  ) chūzūchē qù huǒchēzhàn ba.', 'Chúng ta đi taxi ra ga tàu hỏa nhé.', 'A', 'Đi bằng phương tiện taxi dùng động từ 坐 (坐出租车 - chọn A).'],
          ['请问，那个人是（  ）？', 'Qǐngwèn, nàge rén shì (  )?', 'Xin hỏi, người kia là ai?', 'E', 'Đại từ nghi vấn hỏi người là 谁 (ai - chọn E).'],
          ['星期天我在（  ）休息，不去学校。', 'Xīngqītiān wǒ zài (  ) xiūxi, bú qù xuéxiào.', 'Chủ nhật tôi nghỉ ngơi ở nhà, không đến trường.', 'C', 'Cụm từ cố định 在家休息 (nghỉ ngơi ở nhà - chọn C).'],
          ['睡觉（  ），我喜欢看一会儿书。', 'Shuìjiào (  ), wǒ xǐhuan kàn yíhuìr shū.', 'Trước khi đi ngủ, tôi thích đọc sách một lát.', 'D', 'Danh từ chỉ phương vị/thời gian 睡觉前 (trước khi ngủ - chọn D).'],
          ['这个汉字很漂亮，是你（  ）的吗？', 'Zhège Hànzì hěn piàoliang, shì nǐ (  ) de ma?', 'Chữ Hán này đẹp quá, là do bạn viết phải không?', 'B', 'Đi với 汉字 (chữ Hán) là động từ 写 (viết - chọn B).']
        ]
      }
    },

    // -----------------------------------------------------------------------
    // ĐỀ 04: H11004
    // -----------------------------------------------------------------------
    4: {
      p1: [
        ['Hình: Một cửa hàng bán quần áo', '衣服', 'yīfu', 'Quần áo', 'T', 'Hình ảnh quần áo treo trên kệ khớp với từ 衣服 (yīfu).'],
        ['Hình: Một người đang uống nước', '吃米饭', 'chī mǐfàn', 'Ăn cơm', 'F', 'Trong hình là uống nước, không phải ăn cơm (吃米饭).'],
        ['Hình: Một quyển sách mở trên bàn', '看书', 'kàn shū', 'Đọc sách', 'T', 'Hình ảnh đọc sách khớp với cụm 看书 (kàn shū).'],
        ['Hình: Đồng hồ chỉ 9 giờ', '六点', 'liù diǎn', '6 giờ', 'F', 'Đồng hồ chỉ 9 giờ (九点), không phải 6 giờ (六点).'],
        ['Hình: Hai người bạn đang cười nói vui vẻ', '朋友', 'péngyou', 'Bạn bè', 'T', 'Hình hai người bạn thân thiết khớp với từ 朋友 (péngyou).']
      ],
      p2: [
        ['我姐姐是一名老师。', 'Wǒ jiějie shì yì míng lǎoshī.', 'Chị gái tôi là một giáo viên.', ['A. Cô giáo đứng lớp', 'B. Nữ y tá', 'C. Nhân viên bán hàng'], 'A', 'Từ khóa 老师 (giáo viên) tương ứng với hình A.'],
        ['爸爸每天早上喝一杯茶。', 'Bàba měitiān zǎoshang hē yì bēi chá.', 'Bố uống một tách trà mỗi sáng.', ['A. Tách trà nóng', 'B. Hộp sữa', 'C. Quả táo'], 'A', 'Cụm từ 一杯茶 (một cốc trà) khớp với hình A.'],
        ['外面下雨了，很冷。', 'Wàimiàn xià yǔ le, hěn lěng.', 'Bên ngoài mưa rồi, rất lạnh.', ['A. Trời nắng gắt', 'B. Trời mưa lạnh', 'C. Bầu trời đầy sao'], 'B', 'Từ khóa 下雨 (trời mưa) và 冷 (lạnh) ứng với hình B.'],
        ['他去北京坐十点的飞机。', 'Tā qù Běijīng zuò shí diǎn de fēijī.', 'Anh ấy đi Bắc Kinh trên chuyến bay 10 giờ.', ['A. Tàu hỏa', 'B. Máy bay cất cánh', 'C. Xe đạp'], 'B', 'Phương tiện 飞机 (máy bay) khớp với hình B.'],
        ['桌子下面有一只小猫。', 'Zhuōzi xiàmiàn yǒu yì zhī xiǎomāo.', 'Dưới gầm bàn có một chú mèo nhỏ.', ['A. Mèo trên ghế', 'B. Mèo dưới gầm bàn', 'C. Chó ngoài sân'], 'B', 'Vị trí 桌子下面 (dưới gầm bàn) khớp với hình B.']
      ],
      p3: {
        panel: [
          { key: 'A', label: 'Đi mua táo và hoa quả', detail: '买苹果 (mǎi píngguǒ)' },
          { key: 'B', label: 'Ngồi học trên máy tính', detail: '看电脑 (kàn diànnǎo)' },
          { key: 'C', label: 'Đi ngủ lúc 10 giờ tối', detail: '十点睡觉 (shuìjiào)' },
          { key: 'D', label: 'Nấu cơm tối ở nhà', detail: '在家做饭 (zuò fàn)' },
          { key: 'E', label: 'Đón taxi trên phố', detail: '坐出租车 (chūzūchē)' },
          { key: 'F', label: 'Đọc chữ Hán trong sách', detail: '读汉字 (dú Hànzì)' }
        ],
        items: [
          ['男：你晚上几点睡觉？ 女：我十点睡觉。', 'Nán: Nǐ wǎnshang jǐ diǎn shuìjiào? Nǚ: Wǒ shí diǎn shuìjiào.', 'Nam: Tối bạn mấy giờ đi ngủ? Nữ: Tôi 10 giờ đi ngủ.', 'C', 'Cụm từ 十点睡觉 (10 giờ đi ngủ) khớp với tranh C.'],
          ['女：这个汉字怎么读？ 男：这个字读“爱”。', 'Nǚ: Zhège Hànzì zěnme dú? Nán: Zhège zì dú “ài”.', 'Nữ: Chữ Hán này đọc thế nào? Nam: Chữ này đọc là “ài”.', 'F', 'Tình huống hỏi cách đọc chữ Hán khớp với tranh F.'],
          ['男：妈妈在哪儿呢？ 女：她在家做饭呢。', 'Nán: Māma zài nǎr ne? Nǚ: Tā zài jiā zuò fàn ne.', 'Nam: Mẹ đang ở đâu thế? Nữ: Bà ấy đang ở nhà nấu cơm.', 'D', 'Hành động 在家做饭 (nấu cơm ở nhà) khớp với tranh D.'],
          ['女：你想买什么水果？ 男：我想买几个苹果。', 'Nǚ: Nǐ xiǎng mǎi shénme shuǐguǒ? Nán: Wǒ xiǎng mǎi jǐ ge píngguǒ.', 'Nữ: Bạn muốn mua hoa quả gì? Nam: Tôi muốn mua vài quả táo.', 'A', 'Hoạt động 买苹果 (mua táo) khớp với tranh A.'],
          ['男：我们怎么去饭店？ 女：坐出租车去吧。', 'Nán: Wǒmen zěnme qù fàndiàn? Nǚ: Zuò chūzūchē qù ba.', 'Nam: Chúng mình đi nhà hàng bằng gì? Nữ: Đi taxi nhé.', 'E', 'Phương tiện 出租车 (xe taxi) khớp với tranh E.']
        ]
      },
      p4: [
        ['李先生在医院工作，他太太在学校工作。问：李先生的太太在哪儿工作？', 'Lǐ xiānsheng zài yīyuàn gōngzuò, tā tàitai zài xuéxiào gōngzuò. Wèn: Lǐ xiānsheng de tàitai zài nǎr gōngzuò?', 'Ông Lý làm việc ở bệnh viện, vợ ông ấy làm việc ở trường học. Hỏi: Vợ ông Lý làm việc ở đâu?', ['A. 在医院 (Ở bệnh viện)', 'B. 在学校 (Ở trường học)', 'C. 在商店 (Ở cửa hàng)'], 'B', 'Câu nghe nêu rõ 他太太在学校工作 (vợ ông ấy làm ở trường học).'],
        ['今天星期四，明天我们去北京看朋友。问：他们星期几去北京？', 'Jīntiān xīngqīsì, míngtiān wǒmen qù Běijīng kàn péngyou. Wèn: Tāmen xīngqījǐ qù Běijīng?', 'Hôm nay thứ Tư, ngày mai chúng tôi đi Bắc Kinh thăm bạn. Hỏi: Thứ mấy họ đi Bắc Kinh?', ['A. 星期四 (Thứ Năm)', 'B. 星期五 (Thứ Sáu)', 'C. 星期六 (Thứ Bảy)'], 'B', 'Hôm nay là thứ Năm (星期四), ngày mai sẽ là thứ Sáu (星期五).'],
        ['我喜欢吃米饭，不喜欢吃面条。问：他喜欢吃什么？', 'Wǒ xǐhuan chī mǐfàn, bù xǐhuan chī miàntiáo. Wèn: Tā xǐhuan chī shénme?', 'Tôi thích ăn cơm, không thích ăn mì. Hỏi: Anh ấy thích ăn gì?', ['A. 米饭 (Cơm)', 'B. 水果 (Hoa quả)', 'C. 中国菜 (Món Trung)'], 'A', 'Câu đầu khẳng định 我喜欢吃米饭 (tôi thích ăn cơm).'],
        ['这件大衣服九十块，那件小衣服六十块。问：小衣服多少钱？', 'Zhè jiàn dà yīfu jiǔshí kuài, nà jiàn xiǎo yīfu liùshí kuài. Wèn: Xiǎo yīfu duōshao qián?', 'Chiếc áo cỡ lớn này 90 tệ, chiếc áo cỡ nhỏ kia 60 tệ. Hỏi: Áo cỡ nhỏ bao nhiêu tiền?', ['A. 60块 (60 tệ)', 'B. 90块 (90 tệ)', 'C. 30块 (30 tệ)'], 'A', 'Thông tin 那件小衣服六十块 cho biết áo nhỏ giá 60 tệ.'],
        ['张老师有一个儿子，今年八岁了。问：张老师的儿子几岁了？', 'Zhāng lǎoshī yǒu yí ge érzi, jīnnián bā suì le. Wèn: Zhāng lǎoshī de érzi jǐ suì le?', 'Thầy Trương có một cậu con trai, năm nay 8 tuổi rồi. Hỏi: Con trai thầy Trương mấy tuổi?', ['A. 六岁 (6 tuổi)', 'B. 七岁 (7 tuổi)', 'C. 八岁 (8 tuổi)'], 'C', 'Độ tuổi của con trai thầy Trương là 八岁 (8 tuổi).']
      ],
      p5: [
        ['Hình: Một bàn ăn trong nhà hàng', '饭店', 'fàndiàn', 'Nhà hàng', 'T', 'Hình không gian nhà hàng khớp với từ 饭店 (fàndiàn).'],
        ['Hình: Một người đang viết chữ', '写汉字', 'xiě Hànzì', 'Viết chữ Hán', 'T', 'Hành động viết chữ khớp với 写汉字 (xiě Hànzì).'],
        ['Hình: Một chú mèo con', '小狗', 'xiǎogǒu', 'Chú chó nhỏ', 'F', 'Trong hình là con mèo (小猫), không phải con chó (小狗).'],
        ['Hình: Tờ tiền mệnh giá 50 tệ', '五十块', 'wǔshí kuài', '50 tệ', 'T', 'Mệnh giá 50 tệ khớp với cụm 五十块 (wǔshí kuài).'],
        ['Hình: Trời nắng chói chang', '下雨', 'xià yǔ', 'Trời mưa', 'F', 'Hình vẽ trời nắng đẹp, không phải trời mưa (下雨).']
      ],
      p6: {
        panel: [
          { key: 'A', label: 'Hai người đang xem phim trong rạp', detail: '看电影 (kàn diànyǐng)' },
          { key: 'B', label: 'Một học sinh đang hỏi bài thầy giáo', detail: '问老师 (wèn lǎoshī)' },
          { key: 'C', label: 'Một người đang lái xe ô tô trên đường', detail: '开车 (kāi chē)' },
          { key: 'D', label: 'Một cô gái đang mua cốc nước', detail: '买水 (mǎi shuǐ)' },
          { key: 'E', label: 'Một chàng trai đang gọi điện thoại', detail: '打电话 (dǎ diànhuà)' },
          { key: 'F', label: 'Một gia đình đang ở sân bay', detail: '坐飞机 (zuò fēijī)' }
        ],
        items: [
          ['我爸爸会开车，他每天开车去工作。', 'Wǒ bàba huì kāi chē, tā měitiān kāi chē qù gōngzuò.', 'Bố tôi biết lái xe, mỗi ngày ông đều lái xe đi làm.', 'C', 'Động từ 开车 (lái xe) khớp với hình C.'],
          ['星期六晚上我和朋友去看电影。', 'Xīngqīliù wǎnshang wǒ hé péngyou qù kàn diànyǐng.', 'Tối thứ Bảy tôi cùng bạn đi xem phim.', 'A', 'Hoạt động 看电影 (xem phim) ứng với hình A.'],
          ['我有一个问题想问一下老师。', 'Wǒ yǒu yí ge wèntí xiǎng wèn yíxià lǎoshī.', 'Tôi có một câu hỏi muốn hỏi thầy giáo một chút.', 'B', 'Tình huống học sinh hỏi bài thầy giáo khớp với hình B.'],
          ['明天我们全家坐飞机去北京。', 'Míngtiān wǒmen quánjiā zuò fēijī qù Běijīng.', 'Ngày mai cả nhà tôi đi máy bay tới Bắc Kinh.', 'F', 'Cụm từ 坐飞机 (đi máy bay) ứng với hình gia đình ở sân bay tại F.'],
          ['他正在给妈妈打电话呢。', 'Tā zhèngzài gěi māma dǎ diànhuà ne.', 'Anh ấy đang gọi điện thoại cho mẹ.', 'E', 'Hành động 打电话 (gọi điện thoại) khớp với hình E.']
        ]
      },
      p7: {
        panel: [
          { key: 'A', label: '好的，请喝茶。 (Hǎo de, qǐng hē chá. - Vâng, mời uống trà.)' },
          { key: 'B', label: '他是我的大学同学。 (Tā shì wǒ de dàxué tóngxué. - Cậu ấy là bạn đại học của tôi.)' },
          { key: 'C', label: '在火车站前面。 (Zài huǒchēzhàn qiánmiàn. - Ở phía trước ga tàu hỏa.)' },
          { key: 'D', label: '我喜欢吃苹果。 (Wǒ xǐhuan chī píngguǒ. - Tôi thích ăn táo.)' },
          { key: 'E', label: '现在下午四点。 (Xiànzài xiàwǔ sì diǎn. - Bây giờ là 4 giờ chiều.)' },
          { key: 'F', label: '五十块钱。 (Wǔshí kuài qián. - 50 đồng.)' }
        ],
        items: [
          ['请问，现在几点了？', 'Qǐngwèn, xiànzài jǐ diǎn le?', 'Xin hỏi, bây giờ là mấy giờ rồi?', 'E', 'Hỏi giờ 现在几点了 khớp với câu trả lời 现在下午四点 ở E.'],
          ['你喜欢吃什么水果？', 'Nǐ xǐhuan chī shénme shuǐguǒ?', 'Bạn thích ăn loại hoa quả nào?', 'D', 'Hỏi 吃什么水果 khớp với 我喜欢吃苹果 (tôi thích ăn táo) ở D.'],
          ['请问，北京饭店在哪儿？', 'Qǐngwèn, Běijīng Fàndiàn zài nǎr?', 'Xin hỏi, khách sạn Bắc Kinh ở đâu?', 'C', 'Hỏi địa điểm 在哪儿 khớp với 在火车站前面 (trước ga tàu) ở C.'],
          ['那个人是谁？你认识他吗？', 'Nàge rén shì shéi? Nǐ rènshi tā ma?', 'Người kia là ai? Bạn có quen anh ấy không?', 'B', 'Hỏi thông tin người 是谁 khớp với 他是我的大学同学 ở B.'],
          ['这件衣服多少钱？', 'Zhè jiàn yīfu duōshao qián?', 'Bộ quần áo này bao nhiêu tiền?', 'F', 'Hỏi giá 多少钱 khớp với 五十块钱 (50 tệ) ở F.']
        ]
      },
      p8: {
        panel: [
          { key: 'A', label: '喝 (hē - uống)' },
          { key: 'B', label: '看 (kàn - xem, nhìn, thăm)' },
          { key: 'C', label: '买 (mǎi - mua)' },
          { key: 'D', label: '说 (shuō - nói)' },
          { key: 'E', label: '小 (xiǎo - nhỏ, bé)' },
          { key: 'F', label: '开 (kāi - lái xe, mở)' }
        ],
        items: [
          ['我想去商店（  ）一个新杯子。', 'Wǒ xiǎng qù shāngdiàn (  ) yí ge xīn bēizi.', 'Tôi muốn đi cửa hàng mua một chiếc cốc mới.', 'C', 'Đi cửa hàng để mua đồ dùng động từ 买 (mua - chọn C).'],
          ['大卫的汉语很好，他会（  ）很多汉语。', 'Dàwèi de Hànyǔ hěn hǎo, tā huì (  ) hěn duō Hànyǔ.', 'Tiếng Hán của David rất tốt, anh ấy biết nói rất nhiều tiếng Hán.', 'D', 'Đi với ngôn ngữ 汉语 dùng động từ 说 (nói - chọn D).'],
          ['天太热了，我想（  ）一点儿冷水。', 'Tiān tài rè le, wǒ xiǎng (  ) yìdiǎnr lěng shuǐ.', 'Trời nóng quá, tôi muốn uống một chút nước mát.', 'A', 'Đi với tân ngữ 水 (nước) dùng động từ 喝 (uống - chọn A).'],
          ['这件衣服太（  ）了，有大一点儿的吗？', 'Zhè jiàn yīfu tài (  ) le, yǒu dà yìdiǎnr de ma?', 'Chiếc áo này nhỏ quá, có chiếc nào rộng hơn chút không?', 'E', 'Vế sau hỏi 大一点儿 (lớn hơn chút) nên vế trước là 太小了 (nhỏ quá - chọn E).'],
          ['明天我去医院（  ）一个老朋友。', 'Míngtiān wǒ qù yīyuàn (  ) yí ge lǎo péngyou.', 'Ngày mai tôi đến bệnh viện thăm một người bạn cũ.', 'B', 'Cụm 看朋友 nghĩa là thăm bạn bè (chọn B).']
        ]
      }
    },

    // -----------------------------------------------------------------------
    // ĐỀ 05: H11005
    // -----------------------------------------------------------------------
    5: {
      p1: [
        ['Hình: Một học sinh đang viết bài tại bàn học', '桌子', 'zhuōzi', 'Cái bàn', 'T', 'Trong hình có chiếc bàn học khớp với danh từ 桌子 (zhuōzi).'],
        ['Hình: Một chú mèo đang ngủ', '小猫', 'xiǎomāo', 'Chú mèo nhỏ', 'T', 'Hình chú mèo khớp với từ 小猫 (xiǎomāo).'],
        ['Hình: Một người đang lên máy bay', '坐火车', 'zuò huǒchē', 'Đi tàu hỏa', 'F', 'Trong hình là đi máy bay (坐飞机), không phải đi tàu hỏa (坐火车).'],
        ['Hình: Một đĩa trái cây gồm táo và lê', '水果', 'shuǐguǒ', 'Hoa quả', 'T', 'Hình đĩa trái cây khớp với danh từ 水果 (shuǐguǒ).'],
        ['Hình: Đồng hồ chỉ 3 giờ chiều', '十点', 'shí diǎn', '10 giờ', 'F', 'Đồng hồ chỉ 3 giờ (三点), không phải 10 giờ (十点).']
      ],
      p2: [
        ['我哥哥在大学学习。', 'Wǒ gēge zài dàxué xuéxí.', 'Anh trai tôi học ở trường đại học.', ['A. Nam sinh viên trong trường', 'B. Đầu bếp trong nhà hàng', 'C. Bác sĩ khám bệnh'], 'A', 'Từ khóa 在大学学习 (học ở đại học) khớp với hình A.'],
        ['这本字典是王老师的。', 'Zhè běn zìdiǎn shì Wáng lǎoshī de.', 'Quyển từ điển này là của thầy Vương.', ['A. Một quyển sách/từ điển', 'B. Một chiếc điện thoại', 'C. Một chiếc ghế'], 'A', 'Lượng từ 本 đi với sách/từ điển tương ứng với hình A.'],
        ['今天天气很好，不冷也不热。', 'Jīntiān tiānqì hěn hǎo, bù lěng yě bú rè.', 'Hôm nay thời tiết rất đẹp, không lạnh cũng không nóng.', ['A. Bão tuyết lớn', 'B. Trời nắng dịu, mây trắng', 'C. Mưa tầm tã'], 'B', 'Cụm 天气很好 (thời tiết rất đẹp) khớp với hình B.'],
        ['妹妹喜欢听音乐。', 'Mèimei xǐhuan tīng yīnyuè.', 'Em gái thích nghe nhạc.', ['A. Đeo tai nghe nghe nhạc', 'B. Đang nấu cơm', 'C. Đang lau bàn'], 'A', 'Hoạt động 听音乐 (nghe nhạc) tương ứng với hình A.'],
        ['我们中午吃米饭和中国菜。', 'Wǒmen zhōngwǔ chī mǐfàn hé Zhōngguócài.', 'Trưa nay chúng tôi ăn cơm và món Trung Quốc.', ['A. Bữa cơm với các món ăn', 'B. Cốc cà phê sáng', 'C. Quả táo trên đĩa'], 'A', 'Cụm 吃米饭和中国菜 khớp với mâm cơm ở hình A.']
      ],
      p3: {
        panel: [
          { key: 'A', label: 'Đi bộ đến trường học', detail: '去学校 (qù xuéxiào)' },
          { key: 'B', label: 'Uống nước sau khi tập thể dục', detail: '喝水 (hē shuǐ)' },
          { key: 'C', label: 'Mua sách tại hiệu sách', detail: '买书 (mǎi shū)' },
          { key: 'D', label: 'Làm việc trên máy tính ở văn phòng', detail: '工作 (gōngzuò)' },
          { key: 'E', label: 'Gọi điện thoại hỏi thăm gia đình', detail: '打电话 (dǎ diànhuà)' },
          { key: 'F', label: 'Xem tivi buổi tối cùng bố mẹ', detail: '看电视 (kàn diànshì)' }
        ],
        items: [
          ['女：你去哪儿？ 男：我去书店买几本书。', 'Nǚ: Nǐ qù nǎr? Nán: Wǒ qù shūdiàn mǎi jǐ běn shū.', 'Nữ: Bạn đi đâu? Nam: Tôi đi hiệu sách mua vài quyển sách.', 'C', 'Cụm từ 买几本书 (mua vài quyển sách) khớp với tranh C.'],
          ['男：太热了，你想喝点儿什么？ 女：给我一杯水吧。', 'Nán: Tài rè le, nǐ xiǎng hē diǎnr shénme? Nǚ: Gěi wǒ yì bēi shuǐ ba.', 'Nam: Nóng quá, bạn muốn uống gì? Nữ: Cho tôi một cốc nước nhé.', 'B', 'Yêu cầu 一杯水 (một cốc nước) khớp với tranh B.'],
          ['女：你爸爸现在在哪儿工作？ 男：他在一家大公司工作。', 'Nǚ: Nǐ bàba xiànzài zài nǎr gōngzuò? Nán: Tā zài yì jiā dà gōngsī gōngzuò.', 'Nữ: Bố bạn hiện làm việc ở đâu? Nam: Ông ấy làm ở một công ty lớn.', 'D', 'Hoạt động 工作 (làm việc) ở văn phòng khớp với tranh D.'],
          ['男：晚上你在家做什么？ 女：我和爸爸妈妈一起看电视。', 'Nán: Wǎnshang nǐ zài jiā zuò shénme? Nǚ: Wǒ hé bàba māma yìqǐ kàn diànshì.', 'Nam: Tối ở nhà bạn làm gì? Nữ: Tôi cùng bố mẹ xem tivi.', 'F', 'Hoạt động 看电视 (xem tivi) cùng bố mẹ khớp với tranh F.'],
          ['女：现在七点半了，快去学校吧！ 男：好的，再见。', 'Nǚ: Xiànzài qī diǎn bàn le, kuài qù xuéxiào ba! Nán: Hǎo de, zàijiàn.', 'Nữ: 7 rưỡi rồi, mau đi học thôi! Nam: Vâng, tạm biệt.', 'A', 'Hành động 去学校 (đi đến trường) khớp với tranh A.']
        ]
      },
      p4: [
        ['王小姐今年二十二岁，她是大学学生。问：王小姐今年多大了？', 'Wáng xiǎojiě jīnnián èrshí’èr suì, tā shì dàxué xuésheng. Wèn: Wáng xiǎojiě jīnnián duō dà le?', 'Cô Vương năm nay 22 tuổi, cô ấy là sinh viên đại học. Hỏi: Cô Vương năm nay bao nhiêu tuổi?', ['A. 20岁 (20 tuổi)', 'B. 22岁 (22 tuổi)', 'C. 25岁 (25 tuổi)'], 'B', 'Câu nghe nêu rõ 二十二岁 (22 tuổi).'],
        ['昨天我买了一个新杯子，是白色的，十五块钱。问：杯子多少钱？', 'Zuótiān wǒ mǎile yí ge xīn bēizi, shì báisè de, shíwǔ kuài qián. Wèn: Bēizi duōshao qián?', 'Hôm qua tôi mua một chiếc cốc mới màu trắng, giá 15 tệ. Hỏi: Chiếc cốc giá bao nhiêu?', ['A. 15块 (15 tệ)', 'B. 25块 (25 tệ)', 'C. 50块 (50 tệ)'], 'A', 'Giá chiếc cốc là 十五块钱 (15 tệ).'],
        ['今天星期日，我们不去学校，我们在家看电影。问：他们今天在哪儿看电影？', 'Jīntiān xīngqīrì, wǒmen bú qù xuéxiào, wǒmen zài jiā kàn diànyǐng. Wèn: Tāmen jīntiān zài nǎr kàn diànyǐng?', 'Hôm nay Chủ nhật, chúng tôi không đến trường mà ở nhà xem phim. Hỏi: Hôm nay họ xem phim ở đâu?', ['A. 在学校 (Ở trường)', 'B. 在家 (Ở nhà)', 'C. 在饭店 (Ở nhà hàng)'], 'B', 'Câu nghe nói rõ 我们在家看电影 (chúng tôi xem phim ở nhà).'],
        ['我妈妈做的中国菜很好吃，我很喜欢。问：谁做的中国菜很好吃？', 'Wǒ māma zuò de Zhōngguócài hěn hǎochī, wǒ hěn xǐhuan. Wèn: Shéi zuò de Zhōngguócài hěn hǎochī?', 'Món Trung Quốc mẹ tôi nấu rất ngon, tôi rất thích. Hỏi: Món Trung Quốc ai nấu rất ngon?', ['A. 爸爸 (Bố)', 'B. 妈妈 (Mẹ)', 'C. 老师 (Thầy cô)'], 'B', 'Chủ thể nấu món ăn là 我妈妈 (mẹ tôi).'],
        ['大卫上午十点坐火车去上海，下午三点到。问：大卫怎么去上海？', 'Dàwèi shàngwǔ shí diǎn zuò huǒchē qù Shànghǎi, xiàwǔ sān diǎn dào. Wèn: Dàwèi zěnme qù Shànghǎi?', 'Sáng 10 giờ David đi tàu hỏa tới Thượng Hải, 3 giờ chiều đến nơi. Hỏi: David đi Thượng Hải bằng gì?', ['A. 坐飞机 (Đi máy bay)', 'B. 坐火车 (Đi tàu hỏa)', 'C. 坐出租车 (Đi taxi)'], 'B', 'Phương tiện di chuyển là 坐火车 (đi tàu hỏa).']
      ],
      p5: [
        ['Hình: Một người đang gọi điện thoại', '打电话', 'dǎ diànhuà', 'Gọi điện thoại', 'T', 'Hình người cầm điện thoại khớp với 打电话 (dǎ diànhuà).'],
        ['Hình: Một chiếc máy tính để bàn', '电视', 'diànshì', 'Tivi', 'F', 'Trong hình là máy tính (电脑), không phải tivi (电视).'],
        ['Hình: Một cốc trà bốc khói', '喝茶', 'hē chá', 'Uống trà', 'T', 'Hình tách trà khớp với cụm 喝茶 (hē chá).'],
        ['Hình: Một bác sĩ đang khám bệnh', '老师', 'lǎoshī', 'Giáo viên', 'F', 'Người trong hình là bác sĩ (医生), không phải giáo viên (老师).'],
        ['Hình: Con số 100', '一百', 'yìbǎi', 'Một trăm', 'T', 'Số 100 khớp hoàn toàn với từ 一百 (yìbǎi).']
      ],
      p6: {
        panel: [
          { key: 'A', label: 'Một học sinh đang viết chữ Hán lên bảng', detail: '写汉字 (xiě Hànzì)' },
          { key: 'B', label: 'Một người đang mua quần áo trong shop', detail: '买衣服 (mǎi yīfu)' },
          { key: 'C', label: 'Hai người bạn đang ăn trưa ở nhà hàng', detail: '饭店吃饭 (chī fàn)' },
          { key: 'D', label: 'Một chú chó đang chạy trong công viên', detail: '小狗 (xiǎogǒu)' },
          { key: 'E', label: 'Một người đang lên xe taxi', detail: '坐出租车 (chūzūchē)' },
          { key: 'F', label: 'Một cô gái đang đọc sách trên ghế sofa', detail: '看书 (kàn shū)' }
        ],
        items: [
          ['姐姐在商店买了一件漂亮的衣服。', 'Jiějie zài shāngdiàn mǎile yí jiàn piàoliang de yīfu.', 'Chị gái đã mua một bộ quần áo đẹp ở cửa hàng.', 'B', 'Hành động mua quần áo ở cửa hàng khớp với hình B.'],
          ['中午我和朋友去饭店吃饭。', 'Zhōngwǔ wǒ hé péngyou qù fàndiàn chī fàn.', 'Buổi trưa tôi cùng bạn đi nhà hàng ăn cơm.', 'C', 'Hoạt động ăn cơm tại nhà hàng khớp với hình C.'],
          ['你看，那只小狗多漂亮啊！', 'Nǐ kàn, nà zhī xiǎogǒu duō piàoliang a!', 'Bạn nhìn kìa, chú chó nhỏ kia đẹp biết bao!', 'D', 'Danh từ 小狗 (chú chó nhỏ) ứng với hình D.'],
          ['大卫现在会写很多汉字了。', 'Dàwèi xiànzài huì xiě hěn duō Hànzì le.', 'David bây giờ đã biết viết rất nhiều chữ Hán rồi.', 'A', 'Cụm từ 写汉字 (viết chữ Hán) khớp với hình A.'],
          ['星期六下午我喜欢在家看书。', 'Xīngqīliù xiàwǔ wǒ xǐhuan zài jiā kàn shū.', 'Chiều thứ Bảy tôi thích ở nhà đọc sách.', 'F', 'Hoạt động 在家看书 (đọc sách ở nhà) khớp với hình F.']
        ]
      },
      p7: {
        panel: [
          { key: 'A', label: '我叫李明。 (Wǒ jiào Lǐ Míng. - Tôi tên là Lý Minh.)' },
          { key: 'B', label: '在学校后面。 (Zài xuéxiào hòumiàn. - Ở phía sau trường học.)' },
          { key: 'C', label: '今天十月八号。 (Jīntiān shíyuè bā hào. - Hôm nay là ngày 8 tháng 10.)' },
          { key: 'D', label: '好啊，我想买几个苹果。 (Hǎo a, wǒ xiǎng mǎi jǐ ge píngguǒ. - Được đấy, tôi muốn mua vài quả táo.)' },
          { key: 'E', label: '我坐飞机去。 (Wǒ zuò fēijī qù. - Tôi đi bằng máy bay.)' },
          { key: 'F', label: '不客气。 (Bú kèqi. - Đừng khách sáo.)' }
        ],
        items: [
          ['请问，你叫什么名字？', 'Qǐngwèn, nǐ jiào shénme míngzi?', 'Xin hỏi, bạn tên là gì?', 'A', 'Hỏi tên 叫什么名字 khớp với 我叫李明 ở A.'],
          ['今天是几月几号？', 'Jīntiān shì jǐ yuè jǐ hào?', 'Hôm nay là ngày mấy tháng mấy?', 'C', 'Hỏi ngày tháng 几月几号 khớp với 今天十月八号 ở C.'],
          ['我们下午去商店买东西，好吗？', 'Wǒmen xiàwǔ qù shāngdiàn mǎi dōngxi, hǎo ma?', 'Chiều nay chúng mình đi cửa hàng mua đồ nhé, được không?', 'D', 'Câu rủ đi mua đồ khớp với 好啊，我想买几个苹果 ở D.'],
          ['你明天怎么去上海？', 'Nǐ míngtiān zěnme qù Shànghǎi?', 'Ngày mai bạn đi Thượng Hải bằng phương tiện gì?', 'E', 'Hỏi phương tiện 怎么去 khớp với 我坐飞机去 ở E.'],
          ['请问，医院在哪儿？', 'Qǐngwèn, yīyuàn zài nǎr?', 'Xin hỏi, bệnh viện ở đâu ạ?', 'B', 'Hỏi vị trí 在哪儿 khớp với 在学校后面 (phía sau trường học) ở B.']
        ]
      },
      p8: {
        panel: [
          { key: 'A', label: '住 (zhù - sống, ở)' },
          { key: 'B', label: '些 (xiē - một vài, một ít)' },
          { key: 'C', label: '想 (xiǎng - muốn, nhớ)' },
          { key: 'D', label: '回 (huí - về, quay về)' },
          { key: 'E', label: '都 (dōu - đều)' },
          { key: 'F', label: '年 (nián - năm)' }
        ],
        items: [
          ['爸爸和妈妈（  ）是老师。', 'Bàba hé māma (  ) shì lǎoshī.', 'Bố và mẹ đều là giáo viên.', 'E', 'Chủ ngữ số nhiều (Bố và mẹ) dùng phó từ tổng括 都 (đều - chọn E).'],
          ['太晚了，我们快（  ）家吧。', 'Tài wǎn le, wǒmen kuài (  ) jiā ba.', 'Muộn quá rồi, chúng ta mau về nhà thôi.', 'D', 'Cụm động tân cố định 回家 (về nhà - chọn D).'],
          ['你在北京（  ）了多长时间？', 'Nǐ zài Běijīng (  ) le duō cháng shíjiān?', 'Bạn đã sống ở Bắc Kinh bao lâu rồi?', 'A', 'Sau giới từ chỉ nơi chốn 在北京 dùng động từ 住 (cư trú, sống - chọn A).'],
          ['桌子上有一（  ）水果，请吃吧。', 'Zhuōzi shàng yǒu yì (  ) shuǐguǒ, qǐng chī ba.', 'Trên bàn có một ít hoa quả, mời ăn nhé.', 'B', 'Cụm lượng từ số lượng không xác định 一些 (một vài, một ít - chọn B).'],
          ['明（  ）我打算去中国学习汉语。', 'Míng (  ) wǒ dǎsuàn qù Zhōngguó xuéxí Hànyǔ.', 'Năm sau tôi dự định đi Trung Quốc học tiếng Hán.', 'F', 'Ghép với 明 tạo thành danh từ chỉ thời gian 明年 (năm sau - chọn F).']
        ]
      }
    },

    // -----------------------------------------------------------------------
    // ĐỀ 06: H11006
    // -----------------------------------------------------------------------
    6: {
      p1: [
        ['Hình: Một người đang mỉm cười vẫy tay chào', '你好', 'nǐ hǎo', 'Xin chào', 'T', 'Hành động vẫy tay chào khớp với từ 你好 (nǐ hǎo).'],
        ['Hình: Một chiếc máy bay đang bay', '出租车', 'chūzūchē', 'Xe taxi', 'F', 'Trong hình là máy bay (飞机), không phải xe taxi (出租车).'],
        ['Hình: Một người đang nấu ăn trong bếp', '做饭', 'zuò fàn', 'Nấu cơm', 'T', 'Hình ảnh đầu bếp/nội trợ nấu ăn khớp với 做饭 (zuò fàn).'],
        ['Hình: Một quyển sách tiếng Hán', '电脑', 'diànnǎo', 'Máy tính', 'F', 'Hình vẽ là quyển sách (书), không phải máy tính (电脑).'],
        ['Hình: Đồng hồ chỉ 5 giờ đúng', '五点', 'wǔ diǎn', '5 giờ', 'T', 'Đồng hồ chỉ 5:00 khớp với 五点 (wǔ diǎn).']
      ],
      p2: [
        ['弟弟很喜欢吃苹果。', 'Dìdi hěn xǐhuan chī píngguǒ.', 'Em trai rất thích ăn táo.', ['A. Cậu bé ăn táo', 'B. Cậu bé uống sữa', 'C. Cậu bé đọc sách'], 'A', 'Cụm từ 吃苹果 (ăn táo) tương ứng với hình A.'],
        ['我妈妈在商店买衣服呢。', 'Wǒ māma zài shāngdiàn mǎi yīfu ne.', 'Mẹ tôi đang mua quần áo ở cửa hàng.', ['A. Mua quần áo', 'B. Mua hoa quả', 'C. Khám bệnh'], 'A', 'Hoạt động 买衣服 (mua quần áo) khớp với hình A.'],
        ['李老师正在打电话。', 'Lǐ lǎoshī zhèngzài dǎ diànhuà.', 'Thầy Lý đang gọi điện thoại.', ['A. Đang viết bảng', 'B. Đang nghe điện thoại', 'C. Đang uống trà'], 'B', 'Từ khóa 打电话 (gọi điện thoại) khớp với hình B.'],
        ['桌子上有一个杯子。', 'Zhuōzi shàng yǒu yí ge bēizi.', 'Trên bàn có một chiếc cốc.', ['A. Cốc nước trên bàn', 'B. Quả bóng dưới bàn', 'C. Sách trên ghế'], 'A', 'Hình chiếc cốc trên mặt bàn khớp với 桌子上有一个杯子 ở A.'],
        ['今天下雪了，天气很冷。', 'Jīntiān xià xuě le, tiānqì hěn lěng.', 'Hôm nay trời mưa, thời tiết rất lạnh.', ['A. Trời nắng ấm', 'B. Trời lạnh có mưa/tuyết', 'C. Đi bơi mùa hè'], 'B', 'Từ khóa 很冷 (rất lạnh) ứng với hình B.']
      ],
      p3: {
        panel: [
          { key: 'A', label: 'Đi tàu hỏa về quê', detail: '坐火车 (zuò huǒchē)' },
          { key: 'B', label: 'Học tiếng Hán cùng bạn bè', detail: '学习汉语 (xuéxí Hànyǔ)' },
          { key: 'C', label: 'Ngủ trưa trên giường', detail: '睡觉 (shuìjiào)' },
          { key: 'D', label: 'Xem phim cuối tuần', detail: '看电影 (kàn diànyǐng)' },
          { key: 'E', label: 'Bác sĩ khám bệnh tại bệnh viện', detail: '医生 / 医院' },
          { key: 'F', label: 'Uống trà buổi sáng', detail: '喝茶 (hē chá)' }
        ],
        items: [
          ['女：你姐姐做什么工作？ 男：她是医生，在医院工作。', 'Nǚ: Nǐ jiějie zuò shénme gōngzuò? Nán: Tā shì yīshēng, zài yīyuàn gōngzuò.', 'Nữ: Chị gái bạn làm nghề gì? Nam: Chị ấy là bác sĩ, làm việc ở bệnh viện.', 'E', 'Từ khóa 医生 (bác sĩ) và 医院 (bệnh viện) khớp với tranh E.'],
          ['男：你们怎么去北京？ 女：我们坐火车去。', 'Nán: Nǐmen zěnme qù Běijīng? Nǚ: Wǒmen zuò huǒchē qù.', 'Nam: Các bạn đi Bắc Kinh bằng gì? Nữ: Chúng tôi đi bằng tàu hỏa.', 'A', 'Phương tiện 坐火车 (đi tàu hỏa) khớp với tranh A.'],
          ['女：小王在家吗？ 男：在，他在房间里睡觉呢。', 'Nǚ: Xiǎo Wáng zài jiā ma? Nán: Zài, tā zài fángjiān lǐ shuìjiào ne.', 'Nữ: Tiểu Vương có ở nhà không? Nam: Có, cậu ấy đang ngủ trong phòng.', 'C', 'Hành động 睡觉 (ngủ) khớp với tranh C.'],
          ['男：星期天你喜欢做什么？ 女：我喜欢和朋友去看电影。', 'Nán: Xīngqītiān nǐ xǐhuan zuò shénme? Nǚ: Wǒ xǐhuan hé péngyou qù kàn diànyǐng.', 'Nam: Chủ nhật bạn thích làm gì? Nữ: Tôi thích cùng bạn đi xem phim.', 'D', 'Hoạt động 看电影 (xem phim) khớp với tranh D.'],
          ['女：汉语难吗？ 男：不难，我们都很喜欢学习汉语。', 'Nǚ: Hànyǔ nán ma? Nán: Bù nán, wǒmen dōu hěn xǐhuan xuéxí Hànyǔ.', 'Nữ: Tiếng Hán có khó không? Nam: Không khó, chúng tôi đều thích học tiếng Hán.', 'B', 'Nội dung 学习汉语 (học tiếng Hán) khớp với tranh B.']
        ]
      },
      p4: [
        ['我昨天去了书店，买了三本汉语书。问：他昨天买了什么？', 'Wǒ zuótiān qùle shūdiàn, mǎile sān běn Hànyǔ shū. Wèn: Tā zuótiān mǎile shénme?', 'Hôm qua tôi đi hiệu sách, mua 3 quyển sách tiếng Hán. Hỏi: Hôm qua anh ấy mua gì?', ['A. 三本书 (3 quyển sách)', 'B. 三个杯子 (3 cái cốc)', 'C. 三件衣服 (3 bộ quần áo)'], 'A', 'Câu nghe nói rõ 买了三本汉语书 (mua 3 quyển sách tiếng Hán).'],
        ['现在是十一点半，我们十二点去吃饭。问：他们几点去吃饭？', 'Xiànzài shì shíyī diǎn bàn, wǒmen shí’èr diǎn qù chī fàn. Wèn: Tāmen jǐ diǎn qù chī fàn?', 'Bây giờ là 11 rưỡi, 12 giờ chúng tôi đi ăn cơm. Hỏi: Mấy giờ họ đi ăn cơm?', ['A. 11点 (11 giờ)', 'B. 11点半 (11 rưỡi)', 'C. 12点 (12 giờ)'], 'C', 'Thời gian đi ăn là 十二点 (12 giờ).'],
        ['我家有一只小狗和两只小猫。问：他家有几只小猫？', 'Wǒ jiā yǒu yì zhī xiǎogǒu hé liǎng zhī xiǎomāo. Wèn: Tā jiā yǒu jǐ zhī xiǎomāo?', 'Nhà tôi có 1 chú chó nhỏ và 2 chú mèo nhỏ. Hỏi: Nhà anh ấy có mấy chú mèo?', ['A. 一只 (1 con)', 'B. 两只 (2 con)', 'C. 三只 (3 con)'], 'B', 'Số lượng mèo là 两只小猫 (2 chú mèo).'],
        ['张先生今年四十岁，他女儿今年十岁。问：张先生的女儿多大了？', 'Zhāng xiānsheng jīnnián sìshí suì, tā nǚ’ér jīnnián shí suì. Wèn: Zhāng xiānsheng de nǚ’ér duō dà le?', 'Ông Trương năm nay 40 tuổi, con gái ông năm nay 10 tuổi. Hỏi: Con gái ông Trương bao nhiêu tuổi?', ['A. 10岁 (10 tuổi)', 'B. 20岁 (20 tuổi)', 'C. 40岁 (40 tuổi)'], 'A', 'Câu nghe nêu rõ 他女儿今年十岁 (con gái ông ấy năm nay 10 tuổi).'],
        ['今天我不去学校，我在家看电视。问：他今天在哪儿？', 'Jīntiān wǒ bú qù xuéxiào, wǒ zài jiā kàn diànshì. Wèn: Tā jīntiān zài nǎr?', 'Hôm nay tôi không đi học, tôi ở nhà xem tivi. Hỏi: Hôm nay cậu ấy ở đâu?', ['A. 在学校 (Ở trường)', 'B. 在家 (Ở nhà)', 'C. 在医院 (Ở bệnh viện)'], 'B', 'Thông tin 我在家看电视 cho biết cậu ấy đang ở nhà.']
      ],
      p5: [
        ['Hình: Một bát cơm nóng', '米饭', 'mǐfàn', 'Cơm trắng', 'T', 'Hình bát cơm khớp với từ 米饭 (mǐfàn).'],
        ['Hình: Một người đang lái xe ô tô', '开车', 'kāi chē', 'Lái xe', 'T', 'Hình ảnh người lái xe khớp với 开车 (kāi chē).'],
        ['Hình: Một chiếc bàn làm việc', '椅子', 'yǐzi', 'Cái ghế', 'F', 'Trong hình là cái bàn (桌子), không phải cái ghế (椅子).'],
        ['Hình: Tờ lịch ngày thứ Sáu', '星期五', 'xīngqīwǔ', 'Thứ Sáu', 'T', 'Tờ lịch thứ Sáu khớp với 星期五 (xīngqīwǔ).'],
        ['Hình: Một người đang đọc sách', '睡觉', 'shuìjiào', 'Đi ngủ', 'F', 'Người trong hình đang đọc sách (看书), không phải đi ngủ (睡觉).']
      ],
      p6: {
        panel: [
          { key: 'A', label: 'Hai người đang uống trà ở quán', detail: '喝茶 (hē chá)' },
          { key: 'B', label: 'Một học sinh đang ngồi trước máy tính', detail: '电脑 (diànnǎo)' },
          { key: 'C', label: 'Một người đang vẫy gọi xe taxi', detail: '出租车 (chūzūchē)' },
          { key: 'D', label: 'Một cô gái đang mua hoa quả', detail: '买水果 (mǎi shuǐguǒ)' },
          { key: 'E', label: 'Một thầy giáo đang viết chữ trên bảng', detail: '写汉字 (xiě Hànzì)' },
          { key: 'F', label: 'Trời mưa to ngoài đường phố', detail: '下雨 (xià yǔ)' }
        ],
        items: [
          ['王老师在黑板上写汉字呢。', 'Wáng lǎoshī zài hēibǎn shàng xiě Hànzì ne.', 'Thầy Vương đang viết chữ Hán trên bảng.', 'E', 'Hành động thầy giáo viết chữ Hán khớp với hình E.'],
          ['外面下雨了，我们坐出租车回家吧。', 'Wàimiàn xià yǔ le, wǒmen zuò chūzūchē huí jiā ba.', 'Ngoài trời mưa rồi, chúng ta bắt taxi về nhà nhé.', 'C', 'Hành động đón xe taxi (出租车) khớp với hình C.'],
          ['我妈妈去商店买了一些水果。', 'Wǒ māma qù shāngdiàn mǎile yìxiē shuǐguǒ.', 'Mẹ tôi đi cửa hàng mua một ít hoa quả.', 'D', 'Hoạt động 买水果 (mua hoa quả) khớp với hình D.'],
          ['哥哥用电脑看电影呢。', 'Gēge yòng diànnǎo kàn diànyǐng ne.', 'Anh trai đang dùng máy tính xem phim.', 'B', 'Hình ảnh ngồi trước máy tính (电脑) khớp với hình B.'],
          ['下午我和老朋友一起喝茶。', 'Xiàwǔ wǒ hé lǎo péngyou yìqǐ hē chá.', 'Buổi chiều tôi cùng người bạn cũ uống trà.', 'A', 'Hoạt động 喝茶 (uống trà) cùng bạn khớp với hình A.']
        ]
      },
      p7: {
        panel: [
          { key: 'A', label: '没关系。 (Méi guānxi. - Không sao đâu.)' },
          { key: 'B', label: '我会做中国菜。 (Wǒ huì zuò Zhōngguócài. - Tôi biết nấu món Trung Quốc.)' },
          { key: 'C', label: '在桌子下面呢。 (Zài zhuōzi xiàmiàn ne. - Ở dưới gầm bàn kìa.)' },
          { key: 'D', label: '三十五块。 (Sānshíwǔ kuài. - 35 đồng.)' },
          { key: 'E', label: '他是我的医生。 (Tā shì wǒ de yīshēng. - Ông ấy là bác sĩ của tôi.)' },
          { key: 'F', label: '明天见！ (Míngtiān jiàn! - Hẹn gặp lại ngày mai!)' }
        ],
        items: [
          ['你会做饭吗？', 'Nǐ huì zuò fàn ma?', 'Bạn có biết nấu ăn không?', 'B', 'Hỏi kỹ năng nấu ăn 会做饭吗 khớp với 我会做中国菜 ở B.'],
          ['你看见我的小狗了吗？', 'Nǐ kànjiàn wǒ de xiǎogǒu le ma?', 'Bạn có nhìn thấy chú chó nhỏ của tôi không?', 'C', 'Hỏi tìm vị trí chú chó khớp với 在桌子下面呢 (ở dưới gầm bàn) tại C.'],
          ['这本书多少钱？', 'Zhè běn shū duōshao qián?', 'Quyển sách này bao nhiêu tiền?', 'D', 'Hỏi giá 多少钱 khớp với 三十五块 (35 tệ) ở D.'],
          ['老师，再见！', 'Lǎoshī, zàijiàn!', 'Thưa thầy, tạm biệt!', 'F', 'Đáp lại lời chào tạm biệt 再见 bằng 明天见 (hẹn gặp ngày mai) ở F.'],
          ['对不起，这个字我不会读。', 'Duìbuqǐ, zhège zì wǒ bú huì dú.', 'Xin lỗi, chữ này tôi không biết đọc.', 'A', 'Đáp lại lời xin lỗi 对不起 bằng 没关系 (không sao đâu) ở A.']
        ]
      },
      p8: {
        panel: [
          { key: 'A', label: '月 (yuè - tháng)' },
          { key: 'B', label: '上 (shàng - phía trên, lên)' },
          { key: 'C', label: '听 (tīng - nghe)' },
          { key: 'D', label: '请 (qǐng - mời, xin)' },
          { key: 'E', label: '人 (rén - người)' },
          { key: 'F', label: '好 (hǎo - tốt, ngon)' }
        ],
        items: [
          ['（  ）问，李老师在办公室吗？', '(  ) wèn, Lǐ lǎoshī zài bàngōngshì ma?', 'Xin hỏi, thầy Lý có ở văn phòng không?', 'D', 'Từ lịch sự mở đầu câu hỏi là 请问 (xin hỏi - chọn D).'],
          ['桌子（  ）有一台电脑和两本书。', 'Zhuōzi (  ) yǒu yì tái diànnǎo hé liǎng běn shū.', 'Trên mặt bàn có một chiếc máy tính và hai quyển sách.', 'B', 'Phương vị từ chỉ trên bề mặt bàn là 桌子上 (chọn B).'],
          ['一年有十二个（  ）。', 'Yì nián yǒu shí’èr ge (  ).', 'Một năm có 12 tháng.', 'A', 'Một năm có 12 tháng: 十二个月 (chọn A).'],
          ['这个饭店的中国菜很（  ）吃。', 'Zhège fàndiàn de Zhōngguócài hěn (  ) chī.', 'Món Trung Quốc của nhà hàng này rất ngon.', 'F', 'Ghép với 吃 tạo thành tính từ 好吃 (ngon - chọn F).'],
          ['大家请安静，先（  ）老师说话。', 'Dàjiā qǐng ānjìng, xiān (  ) lǎoshī shuōhuà.', 'Mọi người xin giữ trật tự, hãy nghe thầy giáo nói trước.', 'C', 'Đi với 老师说话 là động từ 听 (lắng nghe - chọn C).']
        ]
      }
    },

    // -----------------------------------------------------------------------
    // ĐỀ 07: H11007
    // -----------------------------------------------------------------------
    7: {
      p1: [
        ['Hình: Một người đang xem đồng hồ đeo tay (8:00)', '八点', 'bā diǎn', '8 giờ', 'T', 'Đồng hồ chỉ 8:00 khớp với cụm 八点 (bā diǎn).'],
        ['Hình: Một học sinh đang đọc sách', '写字', 'xiě zì', 'Viết chữ', 'F', 'Trong hình là đọc sách (看书), không phải viết chữ (写字).'],
        ['Hình: Một chiếc máy tính xách tay', '电脑', 'diànnǎo', 'Máy tính', 'T', 'Hình chiếc laptop khớp với danh từ 电脑 (diànnǎo).'],
        ['Hình: Một người đang uống nước lọc', '吃苹果', 'chī píngguǒ', 'Ăn táo', 'F', 'Người trong hình đang uống nước (喝水), không phải ăn táo.'],
        ['Hình: Hai người đang ngồi trên máy bay', '坐飞机', 'zuò fēijī', 'Đi máy bay', 'T', 'Hình khoang hành khách máy bay khớp với 坐飞机 (zuò fēijī).']
      ],
      p2: [
        ['我买了一件新衣服。', 'Wǒ mǎile yí jiàn xīn yīfu.', 'Tôi đã mua một bộ quần áo mới.', ['A. Chiếc áo sơ mi mới', 'B. Đôi giày thể thao', 'C. Chiếc cặp sách'], 'A', 'Từ khóa 一件新衣服 (một chiếc áo mới) khớp với hình A.'],
        ['小狗在椅子上面呢。', 'Xiǎogǒu zài yǐzi shàngmiàn ne.', 'Chú chó nhỏ đang ở trên ghế kìa.', ['A. Chó nằm trên ghế', 'B. Mèo dưới gầm bàn', 'C. Chó chạy ngoài sân'], 'A', 'Hình chú chó nằm trên ghế khớp với 小狗在椅子上面 ở A.'],
        ['我妈妈是医院的医生。', 'Wǒ māma shì yīyuàn de yīshēng.', 'Mẹ tôi là bác sĩ ở bệnh viện.', ['A. Nữ bác sĩ', 'B. Nữ giáo viên', 'C. Nữ đầu bếp'], 'A', 'Danh từ 医生 (bác sĩ) tương ứng với hình A.'],
        ['今天很热，我想吃西瓜和水果。', 'Jīntiān hěn rè, wǒ xiǎng chī xīguā hé shuǐguǒ.', 'Hôm nay rất nóng, tôi muốn ăn dưa hấu và hoa quả.', ['A. Đĩa hoa quả mát lạnh', 'B. Nồi lẩu nóng', 'C. Áo khoác mùa đông'], 'A', 'Từ khóa 水果 (hoa quả) trong ngày nóng ứng với hình A.'],
        ['他每天晚上九点看书。', 'Tā měitiān wǎnshang jiǔ diǎn kàn shū.', 'Mỗi tối 9 giờ cậu ấy đều đọc sách.', ['A. Đọc sách lúc 9:00', 'B. Xem tivi lúc 8:00', 'C. Đi ngủ lúc 11:00'], 'A', 'Hành động 看书 (đọc sách) lúc 9 giờ khớp với hình A.']
      ],
      p3: {
        panel: [
          { key: 'A', label: 'Đi taxi đến ga tàu hỏa', detail: '出租车 (chūzūchē)' },
          { key: 'B', label: 'Nấu bữa tối tại nhà', detail: '做饭 (zuò fàn)' },
          { key: 'C', label: 'Gọi điện thoại cho thầy giáo', detail: '打电话 (dǎ diànhuà)' },
          { key: 'D', label: 'Uống trà trong nhà hàng', detail: '喝茶 (hē chá)' },
          { key: 'E', label: 'Viết chữ Hán vào vở', detail: '写汉字 (xiě Hànzì)' },
          { key: 'F', label: 'Xem phim ở rạp chiếu phim', detail: '看电影 (kàn diànyǐng)' }
        ],
        items: [
          ['男：你在写什么呢？ 女：我在写汉字呢。', 'Nán: Nǐ zài xiě shénme ne? Nǚ: Wǒ zài xiě Hànzì ne.', 'Nam: Bạn đang viết gì thế? Nữ: Tôi đang viết chữ Hán.', 'E', 'Cụm từ 写汉字 (viết chữ Hán) khớp với tranh E.'],
          ['女：我们怎么去火车站？ 男：坐出租车去吧，很快。', 'Nǚ: Wǒmen zěnme qù huǒchēzhàn? Nán: Zuò chūzūchē qù ba, hěn kuài.', 'Nữ: Chúng ta đi ga tàu bằng gì? Nam: Đi taxi nhé, rất nhanh.', 'A', 'Phương tiện 出租车 (xe taxi) khớp với tranh A.'],
          ['男：今天晚上我们去饭店吃吗？ 女：不去，我在家做饭。', 'Nán: Jīntiān wǎnshang wǒmen qù fàndiàn chī ma? Nǚ: Bú qù, wǒ zài jiā zuò fàn.', 'Nam: Tối nay mình ra nhà hàng ăn chứ? Nữ: Không, tôi nấu cơm ở nhà.', 'B', 'Hoạt động 在家做饭 (nấu cơm ở nhà) khớp với tranh B.'],
          ['女：王老师今天没来学校，你知道吗？ 男：我给他打个电话问问。', 'Nǚ: Wáng lǎoshī jīntiān méi lái xuéxiào, nǐ zhīdào ma? Nán: Wǒ gěi tā dǎ ge diànhuà wènwen.', 'Nữ: Hôm nay thầy Vương không đến trường, bạn biết không? Nam: Để tôi gọi điện hỏi thầy.', 'C', 'Hành động 打电话 (gọi điện thoại) khớp với tranh C.'],
          ['男：这个电影好看吗？ 女：很好看，我很喜欢。', 'Nán: Zhège diànyǐng hǎokàn ma? Nǚ: Hěn hǎokàn, wǒ hěn xǐhuan.', 'Nam: Bộ phim này hay không? Nữ: Rất hay, tôi rất thích.', 'F', 'Từ khóa 电影 (bộ phim) khớp với tranh F.']
        ]
      },
      p4: [
        ['李明今年十八岁，他弟弟今年十五岁。问：李明的弟弟多大了？', 'Lǐ Míng jīnnián shíbā suì, tā dìdi jīnnián shíwǔ suì. Wèn: Lǐ Míng de dìdi duō dà le?', 'Lý Minh năm nay 18 tuổi, em trai cậu ấy năm nay 15 tuổi. Hỏi: Em trai Lý Minh bao nhiêu tuổi?', ['A. 15岁 (15 tuổi)', 'B. 18岁 (18 tuổi)', 'C. 20岁 (20 tuổi)'], 'A', 'Câu nghe nói rõ 他弟弟今年十五岁 (em trai cậu ấy 15 tuổi).'],
        ['我去商店买了四个苹果，一共二十块钱。问：苹果多少钱？', 'Wǒ qù shāngdiàn mǎile sì ge píngguǒ, yígòng èrshí kuài qián. Wèn: Píngguǒ duōshao qián?', 'Tôi đi cửa hàng mua 4 quả táo, tổng cộng 20 tệ. Hỏi: Táo hết bao nhiêu tiền?', ['A. 4块 (4 tệ)', 'B. 10块 (10 tệ)', 'C. 20块 (20 tệ)'], 'C', 'Tổng số tiền mua táo là 二十块钱 (20 tệ).'],
        ['今天是星期一，张先生星期三去北京。问：张先生星期几去北京？', 'Jīntiān shì xīngqīyī, Zhāng xiānsheng xīngqīsān qù Běijīng. Wèn: Zhāng xiānsheng xīngqījǐ qù Běijīng?', 'Hôm nay thứ Hai, thứ Tư ông Trương đi Bắc Kinh. Hỏi: Thứ mấy ông Trương đi Bắc Kinh?', ['A. 星期一 (Thứ Hai)', 'B. 星期二 (Thứ Ba)', 'C. 星期三 (Thứ Tư)'], 'C', 'Thời gian đi Bắc Kinh là 星期三 (thứ Tư).'],
        ['桌子上有一本汉语书和两个杯子。问：桌子上有几本书？', 'Zhuōzi shàng yǒu yì běn Hànyǔ shū hé liǎng ge bēizi. Wèn: Zhuōzi shàng yǒu jǐ běn shū?', 'Trên bàn có 1 quyển sách tiếng Hán và 2 chiếc cốc. Hỏi: Trên bàn có mấy quyển sách?', ['A. 一本 (1 quyển)', 'B. 两本 (2 quyển)', 'C. 三本 (3 quyển)'], 'A', 'Số lượng sách trên bàn là 一本汉语书 (1 quyển sách).'],
        ['姐姐喜欢喝茶，妈妈喜欢喝水。问：谁喜欢喝茶？', 'Jiějie xǐhuan hē chá, māma xǐhuan hē shuǐ. Wèn: Shéi xǐhuan hē chá?', 'Chị gái thích uống trà, mẹ thích uống nước lọc. Hỏi: Ai thích uống trà?', ['A. 妈妈 (Mẹ)', 'B. 姐姐 (Chị gái)', 'C. 妹妹 (Em gái)'], 'B', 'Chủ thể thích uống trà là 姐姐 (chị gái).']
      ],
      p5: [
        ['Hình: Một ga tàu hỏa đông đúc', '火车站', 'huǒchēzhàn', 'Ga tàu hỏa', 'T', 'Hình nhà ga tàu khớp với 火车站 (huǒchēzhàn).'],
        ['Hình: Một chú mèo trắng', '小猫', 'xiǎomāo', 'Mèo con', 'T', 'Hình chú mèo khớp với từ 小猫 (xiǎomāo).'],
        ['Hình: Một người đang xem tivi', '听音乐', 'tīng yīnyuè', 'Nghe nhạc', 'F', 'Người trong hình đang xem tivi (看电视), không phải nghe nhạc.'],
        ['Hình: Con số 60', '六十', 'liùshí', 'Số 60', 'T', 'Con số 60 khớp với từ 六十 (liùshí).'],
        ['Hình: Một chiếc cốc trà', '米饭', 'mǐfàn', 'Cơm trắng', 'F', 'Trong hình là chiếc cốc (杯子), không phải bát cơm (米饭).']
      ],
      p6: {
        panel: [
          { key: 'A', label: 'Một học sinh đang chào cô giáo ở cổng trường', detail: '老师好 (lǎoshī)' },
          { key: 'B', label: 'Một người đang ngủ say trên giường', detail: '睡觉 (shuìjiào)' },
          { key: 'C', label: 'Hai người đang ăn tối tại nhà hàng', detail: '饭店吃饭 (fàndiàn)' },
          { key: 'D', label: 'Một chàng trai đang lái xe ô tô', detail: '开车 (kāi chē)' },
          { key: 'E', label: 'Một cô gái đang mua sách ở hiệu sách', detail: '买书 (mǎi shū)' },
          { key: 'F', label: 'Trời đang mưa to bên ngoài', detail: '下雨 (xià yǔ)' }
        ],
        items: [
          ['早上好，李老师！', 'Zǎoshang hǎo, Lǐ lǎoshī!', 'Chào buổi sáng cô Lý!', 'A', 'Tình huống học sinh chào cô giáo khớp với hình A.'],
          ['今天外面下雨，我不去商店了。', 'Jīntiān wàimiàn xià yǔ, wǒ bú qù shāngdiàn le.', 'Hôm nay bên ngoài mưa, tôi không đi cửa hàng nữa.', 'F', 'Từ khóa 下雨 (trời mưa) khớp với hình F.'],
          ['我哥哥会开车，他开车带我去学校。', 'Wǒ gēge huì kāi chē, tā kāi chē dài wǒ qù xuéxiào.', 'Anh trai tôi biết lái xe, anh ấy lái xe đưa tôi đến trường.', 'D', 'Hành động 开车 (lái xe) tương ứng với hình D.'],
          ['她在书店买了一本汉语书。', 'Tā zài shūdiàn mǎile yì běn Hànyǔ shū.', 'Cô ấy đã mua một quyển sách tiếng Hán ở hiệu sách.', 'E', 'Hoạt động 买书 (mua sách) khớp với hình E.'],
          ['晚上十一点了，弟弟已经睡觉了。', 'Wǎnshang shíyī diǎn le, dìdi yǐjīng shuìjiào le.', '11 giờ tối rồi, em trai đã đi ngủ rồi.', 'B', 'Động từ 睡觉 (đi ngủ) khớp với hình B.']
        ]
      },
      p7: {
        panel: [
          { key: 'A', label: '好的，我们一起去。 (Hǎo de, wǒmen yìqǐ qù. - Được, chúng mình cùng đi nhé.)' },
          { key: 'B', label: '我今年二十一岁。 (Wǒ jīnnián èrshíyī suì. - Năm nay tôi 21 tuổi.)' },
          { key: 'C', label: '不客气。 (Bú kèqi. - Đừng khách sáo.)' },
          { key: 'D', label: '在椅子上面呢。 (Zài yǐzi shàngmiàn ne. - Ở trên ghế kìa.)' },
          { key: 'E', label: '他是我的同学。 (Tā shì wǒ de tóngxué. - Cậu ấy là bạn học của tôi.)' },
          { key: 'F', label: '我想喝一杯水。 (Wǒ xiǎng hē yì bēi shuǐ. - Tôi muốn uống một cốc nước.)' }
        ],
        items: [
          ['你想喝点儿什么？', 'Nǐ xiǎng hē diǎnr shénme?', 'Bạn muốn uống chút gì không?', 'F', 'Hỏi muốn uống gì 喝点儿什么 khớp với 我想喝一杯水 ở F.'],
          ['我的衣服在哪儿呢？', 'Wǒ de yīfu zài nǎr ne?', 'Quần áo của tôi ở đâu nhỉ?', 'D', 'Hỏi vị trí 在哪儿 khớp với 在椅子上面呢 (ở trên ghế) tại D.'],
          ['谢谢你送我回家！', 'Xièxie nǐ sòng wǒ huí jiā!', 'Cảm ơn bạn đã đưa tôi về nhà!', 'C', 'Đáp lại lời cảm ơn 谢谢 bằng 不客气 ở C.'],
          ['你今年多大了？', 'Nǐ jīnnián duō dà le?', 'Năm nay bạn bao nhiêu tuổi?', 'B', 'Hỏi tuổi 多大了 khớp với 我今年二十一岁 ở B.'],
          ['明天我们去医院看王老师，好吗？', 'Míngtiān wǒmen qù yīyuàn kàn Wáng lǎoshī, hǎo ma?', 'Ngày mai chúng mình đến bệnh viện thăm thầy Vương nhé, được không?', 'A', 'Câu đề nghị có 好吗 khớp với 好的，我们一起去 ở A.']
        ]
      },
      p8: {
        panel: [
          { key: 'A', label: '字 (zì - chữ)' },
          { key: 'B', label: '院 (yuàn - viện)' },
          { key: 'C', label: '少 (shǎo - ít, bao nhiêu)' },
          { key: 'D', label: '看 (kàn - nhìn thấy, xem)' },
          { key: 'E', label: '哪 (nǎ - nào, đâu)' },
          { key: 'F', label: '天 (tiān - ngày, trời)' }
        ],
        items: [
          ['请问，你是（  ）国人？', 'Qǐngwèn, nǐ shì (  ) guó rén?', 'Xin hỏi, bạn là người nước nào?', 'E', 'Cụm hỏi quốc tịch chuẩn: 哪国人 (người nước nào - chọn E).'],
          ['你们学校有多（  ）个学生？', 'Nǐmen xuéxiào yǒu duō (  ) ge xuésheng?', 'Trường của các bạn có bao nhiêu học sinh?', 'C', 'Ghép với 多 tạo thành từ nghi vấn hỏi số lượng 多少 (bao nhiêu - chọn C).'],
          ['我没（  ）见你的茶杯。', 'Wǒ méi (  ) jiàn nǐ de chábēi.', 'Tôi không nhìn thấy cốc trà của bạn.', 'D', 'Ghép với 见 tạo thành động từ 看见 (nhìn thấy - chọn D).'],
          ['今（  ）是星期六，我们不去工作。', 'Jīn (  ) shì xīngqīliù, wǒmen bú qù gōngzuò.', 'Hôm nay là thứ Bảy, chúng tôi không đi làm.', 'F', 'Ghép với 今 tạo thành danh từ chỉ thời gian 今天 (hôm nay - chọn F).'],
          ['这个汉（  ）太难写了。', 'Zhège Hàn (  ) tài nán xiě le.', 'Chữ Hán này khó viết quá.', 'A', 'Ghép với 汉 tạo thành danh từ 汉字 (chữ Hán - chọn A).']
        ]
      }
    },

    // -----------------------------------------------------------------------
    // ĐỀ 08: H11008
    // -----------------------------------------------------------------------
    8: {
      p1: [
        ['Hình: Một người đang đọc sách chăm chú', '看书', 'kàn shū', 'Đọc sách', 'T', 'Hình người đọc sách khớp với cụm 看书 (kàn shū).'],
        ['Hình: Một quả táo đỏ', '米饭', 'mǐfàn', 'Cơm trắng', 'F', 'Trong hình là quả táo (苹果), không phải cơm trắng (米饭).'],
        ['Hình: Một chiếc xe ô tô đang chạy', '开车', 'kāi chē', 'Lái xe', 'T', 'Hình người lái xe ô tô khớp với 开车 (kāi chē).'],
        ['Hình: Một chú chó nhỏ', '小猫', 'xiǎomāo', 'Mèo con', 'F', 'Trong hình là chú chó (小狗), không phải mèo con (小猫).'],
        ['Hình: Hai người đang nói chuyện điện thoại', '打电话', 'dǎ diànhuà', 'Gọi điện thoại', 'T', 'Hình ảnh nghe gọi điện thoại khớp với 打电话 (dǎ diànhuà).']
      ],
      p2: [
        ['这双鞋子多少钱？不对，我想买这件衣服。', 'Zhè shuāng xiézi duōshao qián? Bú duì, wǒ xiǎng mǎi zhè jiàn yīfu.', 'Tôi muốn mua bộ quần áo này.', ['A. Bộ quần áo trên giá treo', 'B. Chiếc bàn học', 'C. Quyển sách'], 'A', 'Từ khóa 这件衣服 (bộ quần áo này) khớp với hình A.'],
        ['现在是下午两点。', 'Xiànzài shì xiàwǔ liǎng diǎn.', 'Bây giờ là 2 giờ chiều.', ['A. Đồng hồ chỉ 2:00', 'B. Đồng hồ chỉ 5:00', 'C. Đồng hồ chỉ 10:00'], 'A', '两点 (2 giờ) khớp chính xác với đồng hồ ở hình A.'],
        ['哥哥在房间里用电脑工作。', 'Gēge zài fángjiān lǐ yòng diànnǎo gōngzuò.', 'Anh trai đang dùng máy tính làm việc trong phòng.', ['A. Làm việc với máy tính', 'B. Đang nấu ăn', 'C. Đang chạy bộ'], 'A', 'Cụm từ 用电脑工作 khớp với hình A.'],
        ['我们坐火车去北京。', 'Wǒmen zuò huǒchē qù Běijīng.', 'Chúng tôi đi tàu hỏa tới Bắc Kinh.', ['A. Đoàn tàu hỏa', 'B. Chiếc xe đạp', 'C. Máy bay'], 'A', 'Phương tiện 火车 (tàu hỏa) tương ứng với hình A.'],
        ['妈妈在厨房做中国菜呢。', 'Māma zài chúfáng zuò Zhōngguócài ne.', 'Mẹ đang nấu món Trung Quốc trong bếp.', ['A. Nấu ăn trong bếp', 'B. Xem tivi ở phòng khách', 'C. Đọc sách ở thư viện'], 'A', 'Hành động 做中国菜 (nấu món Trung Quốc) khớp với hình A.']
      ],
      p3: {
        panel: [
          { key: 'A', label: 'Đi máy bay công tác', detail: '坐飞机 (zuò fēijī)' },
          { key: 'B', label: 'Uống trà nóng buổi sáng', detail: '喝茶 (hē chá)' },
          { key: 'C', label: 'Mua hoa quả tươi ở cửa hàng', detail: '买水果 (mǎi shuǐguǒ)' },
          { key: 'D', label: 'Bác sĩ khám bệnh ở bệnh viện', detail: '去医院 (qù yīyuàn)' },
          { key: 'E', label: 'Ngồi học tiếng Hán trên lớp', detail: '学习汉语 (xuéxí Hànyǔ)' },
          { key: 'F', label: 'Xem tivi cùng gia đình', detail: '看电视 (kàn diànshì)' }
        ],
        items: [
          ['女：你买什么了？ 男：我买了一些苹果和水果。', 'Nǚ: Nǐ mǎi shénme le? Nán: Wǒ mǎile yìxiē píngguǒ hé shuǐguǒ.', 'Nữ: Bạn đã mua gì thế? Nam: Tôi mua một ít táo và hoa quả.', 'C', 'Cụm từ 买水果 (mua hoa quả) khớp hoàn toàn với tranh C.'],
          ['男：爸爸在哪儿呢？ 女：他在客厅看电视呢。', 'Nán: Bàba zài nǎr ne? Nǚ: Tā zài kètīng kàn diànshì ne.', 'Nam: Bố đang ở đâu thế? Nữ: Ông ấy đang xem tivi ở phòng khách.', 'F', 'Hoạt động 看电视 (xem tivi) khớp với tranh F.'],
          ['女：王先生明天怎么去北京？ 男：他坐飞机去。', 'Nǚ: Wáng xiānsheng míngtiān zěnme qù Běijīng? Nán: Tā zuò fēijī qù.', 'Nữ: Mai ông Vương đi Bắc Kinh bằng gì? Nam: Ông ấy đi máy bay.', 'A', 'Phương tiện 坐飞机 (đi máy bay) khớp với tranh A.'],
          ['男：请坐，你想喝水还是喝茶？ 女：喝茶吧，谢谢。', 'Nán: Qǐng zuò, nǐ xiǎng hē shuǐ háishi hē chá? Nǚ: Hē chá ba, xièxie.', 'Nam: Mời ngồi, bạn muốn uống nước hay uống trà? Nữ: Uống trà nhé, cảm ơn.', 'B', 'Từ khóa 喝茶 (uống trà) khớp với tranh B.'],
          ['女：你今天怎么不去学校？ 男：我不舒服，想去医院看看。', 'Nǚ: Nǐ jīntiān zěnme bú qù xuéxiào? Nán: Wǒ bù shūfu, xiǎng qù yīyuàn kànkan.', 'Nữ: Sao hôm nay bạn không đi học? Nam: Tôi không khỏe, muốn đi bệnh viện khám.', 'D', 'Địa điểm 医院 (bệnh viện) khớp với tranh D.']
        ]
      },
      p4: [
        ['今天是九月一号，我们学校开始上课。问：今天是几月几号？', 'Jīntiān shì jiǔyuè yī hào, wǒmen xuéxiào kāishǐ shàngkè. Wèn: Jīntiān shì jǐ yuè jǐ hào?', 'Hôm nay là ngày 1 tháng 9, trường chúng tôi bắt đầu vào học. Hỏi: Hôm nay là ngày mấy tháng mấy?', ['A. 8月1号 (Ngày 1/8)', 'B. 9月1号 (Ngày 1/9)', 'C. 10月1号 (Ngày 1/10)'], 'B', 'Câu nghe nêu rõ 九月一号 (ngày 1 tháng 9).'],
        ['我妈妈今年四十五岁，爸爸四十八岁。问：妈妈今年多大了？', 'Wǒ māma jīnnián sìshíwǔ suì, bàba sìshíbā suì. Wèn: Māma jīnnián duō dà le?', 'Mẹ tôi năm nay 45 tuổi, bố 48 tuổi. Hỏi: Mẹ năm nay bao nhiêu tuổi?', ['A. 45岁 (45 tuổi)', 'B. 48岁 (48 tuổi)', 'C. 50岁 (50 tuổi)'], 'A', 'Thông tin 我妈妈今年四十五岁 cho biết mẹ 45 tuổi.'],
        ['大卫很喜欢看中国电影，他每个星期六都看。问：大卫喜欢看什么？', 'Dàwèi hěn xǐhuan kàn Zhōngguó diànyǐng, tā měi ge xīngqīliù dōu kàn. Wèn: Dàwèi xǐhuan kàn shénme?', 'David rất thích xem phim Trung Quốc, thứ Bảy nào anh ấy cũng xem. Hỏi: David thích xem gì?', ['A. 中国书 (Sách Trung Quốc)', 'B. 中国电影 (Phim Trung Quốc)', 'C. 电视 (Tivi)'], 'B', 'Cụm từ 看中国电影 (xem phim Trung Quốc) khớp với đáp án B.'],
        ['桌子下面有一只小狗，椅子上面有一只小猫。问：小猫在哪儿？', 'Zhuōzi xiàmiàn yǒu yì zhī xiǎogǒu, yǐzi shàngmiàn yǒu yì zhī xiǎomāo. Wèn: Xiǎomāo zài nǎr?', 'Dưới bàn có một chú chó, trên ghế có một chú mèo. Hỏi: Chú mèo ở đâu?', ['A. 桌子下面 (Dưới bàn)', 'B. 椅子上面 (Trên ghế)', 'C. 桌子上面 (Trên bàn)'], 'B', 'Vị trí của chú mèo là 椅子上面 (trên ghế).'],
        ['这个大杯子三十块，那个小杯子十块。问：买两个杯子一共多少钱？', 'Zhège dà bēizi sānshí kuài, nàge xiǎo bēizi shí kuài. Wèn: Mǎi liǎng ge bēizi yígòng duōshao qián?', 'Cốc lớn 30 tệ, cốc nhỏ 10 tệ. Hỏi: Mua cả 2 chiếc cốc hết tổng cộng bao nhiêu tiền?', ['A. 20块 (20 tệ)', 'B. 30块 (30 tệ)', 'C. 40块 (40 tệ)'], 'C', '30 tệ cộng 10 tệ bằng 40 tệ (四十块).']
      ],
      p5: [
        ['Hình: Một học sinh đang viết chữ Hán', '写汉字', 'xiě Hànzì', 'Viết chữ Hán', 'T', 'Hình viết chữ Hán khớp với cụm 写汉字 (xiě Hànzì).'],
        ['Hình: Một người đang ngủ trên giường', '起床', 'qǐchuáng', 'Thức dậy', 'F', 'Người trong hình đang ngủ say (睡觉), chưa thức dậy.'],
        ['Hình: Một chiếc xe taxi trên đường', '出租车', 'chūzūchē', 'Xe taxi', 'T', 'Hình chiếc taxi khớp với danh từ 出租车 (chūzūchē).'],
        ['Hình: Một đĩa cơm trắng', '水果', 'shuǐguǒ', 'Hoa quả', 'F', 'Trong hình là cơm trắng (米饭), không phải hoa quả (水果).'],
        ['Hình: Hai người đang bắt tay vui vẻ', '高兴', 'gāoxìng', 'Vui vẻ', 'T', 'Biểu cảm bắt tay tươi cười khớp với tính từ 高兴 (gāoxìng).']
      ],
      p6: {
        panel: [
          { key: 'A', label: 'Một người đang mua sách tại hiệu sách', detail: '买书 (mǎi shū)' },
          { key: 'B', label: 'Trời mưa lớn ngoài đường', detail: '下雨 (xià yǔ)' },
          { key: 'C', label: 'Một cô giáo đang giảng bài trên lớp', detail: '老师 (lǎoshī)' },
          { key: 'D', label: 'Một gia đình đang ăn cơm tối', detail: '吃饭 (chī fàn)' },
          { key: 'E', label: 'Một chàng trai đang uống nước', detail: '喝水 (hē shuǐ)' },
          { key: 'F', label: 'Một người đang làm việc với máy tính', detail: '电脑 (diànnǎo)' }
        ],
        items: [
          ['太渴了，我想喝一杯水。', 'Tài kě le, wǒ xiǎng hē yì bēi shuǐ.', 'Khát quá, tôi muốn uống một cốc nước.', 'E', 'Hành động 喝一杯水 (uống một cốc nước) khớp với hình E.'],
          ['陈小姐是我们学校的汉语老师。', 'Chén xiǎojiě shì wǒmen xuéxiào de Hànyǔ lǎoshī.', 'Cô Trần là giáo viên tiếng Hán của trường chúng tôi.', 'C', 'Danh từ 老师 (giáo viên) ứng với hình cô giáo giảng bài ở C.'],
          ['星期天全家人在一起吃晚饭。', 'Xīngqītiān quánjiārén zài yìqǐ chī wǎnfàn.', 'Chủ nhật cả gia đình cùng nhau ăn bữa tối.', 'D', 'Hoạt động 吃晚饭 (ăn tối) cùng gia đình khớp với hình D.'],
          ['今天下午我去书店买了几本书。', 'Jīntiān xiàwǔ wǒ qù shūdiàn mǎile jǐ běn shū.', 'Chiều nay tôi đi hiệu sách mua vài quyển sách.', 'A', 'Cụm từ 买了几本书 (mua vài quyển sách) khớp với hình A.'],
          ['外面下雨了，你坐出租车去吧。', 'Wàimiàn xià yǔ le, nǐ zuò chūzūchē qù ba.', 'Ngoài trời mưa rồi, bạn đi taxi đi nhé.', 'B', 'Hiện tượng 下雨 (trời mưa) khớp với hình B.']
        ]
      },
      p7: {
        panel: [
          { key: 'A', label: '我会说一点儿汉语。 (Wǒ huì shuō yìdiǎnr Hànyǔ. - Tôi biết nói một chút tiếng Hán.)' },
          { key: 'B', label: '在火车站后面。 (Zài huǒchēzhàn hòumiàn. - Ở phía sau ga tàu hỏa.)' },
          { key: 'C', label: '明天是星期六。 (Míngtiān shì xīngqīliù. - Ngày mai là thứ Bảy.)' },
          { key: 'D', label: '那是王医生的电脑。 (Nà shì Wáng yīshēng de diànnǎo. - Đó là máy tính của bác sĩ Vương.)' },
          { key: 'E', label: '好啊，我也想买衣服。 (Hǎo a, wǒ yě xiǎng mǎi yīfu. - Được đấy, tôi cũng muốn mua quần áo.)' },
          { key: 'F', label: '八十块钱。 (Bāshí kuài qián. - 80 đồng.)' }
        ],
        items: [
          ['桌子上那是谁的电脑？', 'Zhuōzi shàng nà shì shéi de diànnǎo?', 'Trên bàn kia là máy tính của ai?', 'D', 'Hỏi sở hữu 谁的电脑 khớp với 那是王医生的电脑 ở D.'],
          ['明天是星期几？', 'Míngtiān shì xīngqījǐ?', 'Ngày mai là thứ mấy?', 'C', 'Hỏi thứ mấy 星期几 khớp với 明天是星期六 ở C.'],
          ['你会说汉语吗？', 'Nǐ huì shuō Hànyǔ ma?', 'Bạn có biết nói tiếng Hán không?', 'A', 'Hỏi kỹ năng 会说汉语吗 khớp với 我会说一点儿汉语 ở A.'],
          ['请问，饭店在哪儿？', 'Qǐngwèn, fàndiàn zài nǎr?', 'Xin hỏi, nhà hàng ở đâu ạ?', 'B', 'Hỏi vị trí 在哪儿 khớp với 在火车站后面 ở B.'],
          ['下午我们去商店，好吗？', 'Xiàwǔ wǒmen qù shāngdiàn, hǎo ma?', 'Chiều nay chúng ta đi cửa hàng nhé, được không?', 'E', 'Rủ đi cửa hàng 去商店 khớp với 好啊，我也想买衣服 ở E.']
        ]
      },
      p8: {
        panel: [
          { key: 'A', label: '来 (lái - đến)' },
          { key: 'B', label: '不 (bù - không)' },
          { key: 'C', label: '很 (hěn - rất)' },
          { key: 'D', label: '个 (ge - cái, người)' },
          { key: 'E', label: '块 (kuài - đồng, tệ)' },
          { key: 'F', label: '下 (xià - phía dưới, sau)' }
        ],
        items: [
          ['这本书二十五（  ）钱。', 'Zhè běn shū èrshíwǔ (  ) qián.', 'Quyển sách này giá 25 tệ.', 'E', 'Đơn vị tiền tệ khẩu ngữ đi trước 钱 là 块 (二十五块钱 - chọn E).'],
          ['我有三（  ）中国朋友。', 'Wǒ yǒu sān (  ) Zhōngguó péngyou.', 'Tôi có 3 người bạn Trung Quốc.', 'D', 'Lượng từ phổ thông đi với 朋友 (bạn bè) là 个 (chọn D).'],
          ['李小姐的衣服（  ）漂亮。', 'Lǐ xiǎojiě de yīfu (  ) piàoliang.', 'Quần áo của cô Lý rất đẹp.', 'C', 'Trước tính từ 漂亮 cần phó từ chỉ mức độ 很 (rất - chọn C).'],
          ['今天太冷了，我（  ）想出去。', 'Jīntiān tài lěng le, wǒ (  ) xiǎng chūqù.', 'Hôm nay lạnh quá, tôi không muốn ra ngoài.', 'B', 'Phó từ phủ định đặt trước động từ năng nguyện 想 là 不 (不想 - chọn B).'],
          ['王老师什么时候（  ）学校？', 'Wáng lǎoshī shénme shíhou (  ) xuéxiào?', 'Khi nào thầy Vương đến trường?', 'A', 'Trước tân ngữ chỉ địa điểm 学校 cần động từ xu hướng 来 (đến - chọn A).']
        ]
      }
    },

    // -----------------------------------------------------------------------
    // ĐỀ 09: H11009
    // -----------------------------------------------------------------------
    9: {
      p1: [
        ['Hình: Một gia đình đang ăn cơm quanh bàn ăn', '吃饭', 'chī fàn', 'Ăn cơm', 'T', 'Hình ảnh bữa ăn gia đình khớp với động từ 吃饭 (chī fàn).'],
        ['Hình: Một chiếc ghế sofa', '电脑', 'diànnǎo', 'Máy tính', 'F', 'Trong hình là chiếc ghế, không phải máy tính (电脑).'],
        ['Hình: Một người đang vẫy gọi xe taxi', '出租车', 'chūzūchē', 'Xe taxi', 'T', 'Hình ảnh đón xe taxi khớp với danh từ 出租车 (chūzūchē).'],
        ['Hình: Trời nắng đẹp', '下雨', 'xià yǔ', 'Trời mưa', 'F', 'Trong hình là trời nắng, không phải trời mưa (下雨).'],
        ['Hình: Một cô giáo đang đứng trên bục giảng', '老师', 'lǎoshī', 'Giáo viên', 'T', 'Hình cô giáo giảng bài khớp với danh từ 老师 (lǎoshī).']
      ],
      p2: [
        ['我每天上午十点工作。', 'Wǒ měitiān shàngwǔ shí diǎn gōngzuò.', 'Tôi làm việc lúc 10 giờ sáng mỗi ngày.', ['A. Làm việc lúc 10:00', 'B. Ngủ lúc 10:00', 'C. Đá bóng ngoài sân'], 'A', 'Hoạt động 工作 (làm việc) lúc 10 giờ khớp với hình A.'],
        ['桌子上有一个苹果和一本书。', 'Zhuōzi shàng yǒu yí ge píngguǒ hé yì běn shū.', 'Trên bàn có một quả táo và một quyển sách.', ['A. Quả táo và quyển sách trên bàn', 'B. Hai cái cốc trên bàn', 'C. Máy tính trên ghế'], 'A', 'Hình ảnh quả táo và quyển sách trên bàn khớp với câu mô tả ở A.'],
        ['妹妹很喜欢她的小猫。', 'Mèimei hěn xǐhuan tā de xiǎomāo.', 'Em gái rất thích chú mèo nhỏ của cô ấy.', ['A. Bé gái ôm mèo con', 'B. Bé trai dắt chó', 'C. Chim đậu trên cây'], 'A', 'Danh từ 小猫 (mèo con) tương ứng với hình A.'],
        ['我们坐飞机去上海。', 'Wǒmen zuò fēijī qù Shànghǎi.', 'Chúng tôi đi máy bay tới Thượng Hải.', ['A. Máy bay trên bầu trời', 'B. Đoàn tàu hỏa', 'C. Xe ô tô'], 'A', 'Phương tiện 飞机 (máy bay) khớp với hình A.'],
        ['他在医院看医生呢。', 'Tā zài yīyuàn kàn yīshēng ne.', 'Anh ấy đang khám bác sĩ ở bệnh viện.', ['A. Bệnh nhân khám bác sĩ', 'B. Học sinh trong thư viện', 'C. Đầu bếp nấu ăn'], 'A', 'Từ khóa 医院 (bệnh viện) và 医生 (bác sĩ) khớp với hình A.']
      ],
      p3: {
        panel: [
          { key: 'A', label: 'Đi mua quần áo ở trung tâm thương mại', detail: '买衣服 (mǎi yīfu)' },
          { key: 'B', label: 'Gọi điện thoại cho bạn bè', detail: '打电话 (dǎ diànhuà)' },
          { key: 'C', label: 'Uống trà trò chuyện', detail: '喝茶 (hē chá)' },
          { key: 'D', label: 'Viết chữ Hán trên giấy', detail: '写汉字 (xiě Hànzì)' },
          { key: 'E', label: 'Lái xe ô tô đi làm', detail: '开车 (kāi chē)' },
          { key: 'F', label: 'Ngủ ngon giấc vào ban đêm', detail: '睡觉 (shuìjiào)' }
        ],
        items: [
          ['女：你会开车吗？ 男：会，我每天开车去公司。', 'Nǚ: Nǐ huì kāi chē ma? Nán: Huì, wǒ měitiān kāi chē qù gōngsī.', 'Nữ: Bạn biết lái xe không? Nam: Biết, mỗi ngày tôi đều lái xe đi làm.', 'E', 'Hành động 开车 (lái xe) khớp với tranh E.'],
          ['男：这件衣服很漂亮，你买吗？ 女：买，我很喜欢。', 'Nán: Zhè jiàn yīfu hěn piàoliang, nǐ mǎi ma? Nǚ: Mǎi, wǒ hěn xǐhuan.', 'Nam: Bộ quần áo này đẹp lắm, bạn mua không? Nữ: Mua chứ, tôi rất thích.', 'A', 'Tình huống 买衣服 (mua quần áo) khớp với tranh A.'],
          ['女：大卫的汉字写得怎么样？ 男：他写得非常好。', 'Nǚ: Dàwèi de Hànzì xiě de zěnmeyàng? Nán: Tā xiě de fēicháng hǎo.', 'Nữ: David viết chữ Hán thế nào? Nam: Anh ấy viết đẹp lắm.', 'D', 'Cụm từ 汉字写得非常好 (viết chữ Hán rất đẹp) khớp với tranh D.'],
          ['男：张先生在吗？ 女：他在给朋友打电话呢。', 'Nán: Zhāng xiānsheng zài ma? Nǚ: Tā zài gěi péngyou dǎ diànhuà ne.', 'Nam: Ông Trương có đây không? Nữ: Ông ấy đang gọi điện cho bạn.', 'B', 'Hành động 打电话 (gọi điện thoại) khớp với tranh B.'],
          ['女：已经十二点了，快去睡觉吧。 男：好的，晚安。', 'Nǚ: Yǐjīng shí’èr diǎn le, kuài qù shuìjiào ba. Nán: Hǎo de, wǎn’ān.', 'Nữ: Đã 12 giờ rồi, mau đi ngủ thôi. Nam: Vâng, chúc ngủ ngon.', 'F', 'Từ khóa 睡觉 (đi ngủ) khớp với tranh F.']
        ]
      },
      p4: [
        ['我哥哥今年二十八岁，他在北京一家医院工作。问：哥哥在哪儿工作？', 'Wǒ gēge jīnnián èrshíbā suì, tā zài Běijīng yì jiā yīyuàn gōngzuò. Wèn: Gēge zài nǎr gōngzuò?', 'Anh trai tôi năm nay 28 tuổi, làm việc tại một bệnh viện ở Bắc Kinh. Hỏi: Anh trai làm việc ở đâu?', ['A. 学校 (Trường học)', 'B. 医院 (Bệnh viện)', 'C. 饭店 (Nhà hàng)'], 'B', 'Câu nghe nêu rõ 在北京一家医院工作 (làm ở bệnh viện).'],
        ['今天星期五，明天我不工作，去朋友家玩儿。问：明天是星期几？', 'Jīntiān xīngqīwǔ, míngtiān wǒ bù gōngzuò, qù péngyou jiā wánr. Wèn: Míngtiān shì xīngqījǐ?', 'Hôm nay thứ Sáu, mai tôi nghỉ làm đi chơi nhà bạn. Hỏi: Ngày mai là thứ mấy?', ['A. 星期五 (Thứ Sáu)', 'B. 星期六 (Thứ Bảy)', 'C. 星期日 (Chủ nhật)'], 'B', 'Hôm nay thứ Sáu (星期五) thì ngày mai là thứ Bảy (星期六).'],
        ['妈妈去商店买了一些水果，没有买米饭。问：妈妈买了什么？', 'Māma qù shāngdiàn mǎile yìxiē shuǐguǒ, méiyǒu mǎi mǐfàn. Wèn: Māma mǎile shénme?', 'Mẹ đi cửa hàng mua một ít hoa quả, không mua gạo/cơm. Hỏi: Mẹ đã mua gì?', ['A. 水果 (Hoa quả)', 'B. 米饭 (Cơm)', 'C. 杯子 (Cái cốc)'], 'A', 'Thông tin 买了一些水果 cho biết mẹ đã mua hoa quả.'],
        ['这本书三十块，那本字典五十块。问：字典多少钱？', 'Zhè běn shū sānshí kuài, nà běn zìdiǎn wǔshí kuài. Wèn: Zìdiǎn duōshao qián?', 'Quyển sách này 30 tệ, quyển từ điển kia 50 tệ. Hỏi: Quyển từ điển giá bao nhiêu?', ['A. 30块 (30 tệ)', 'B. 50块 (50 tệ)', 'C. 80块 (80 tệ)'], 'B', '那本字典五十块 cho biết quyển từ điển giá 50 tệ.'],
        ['下午四点我去火车站接一个老朋友。问：他下午四点去哪儿？', 'Xiàwǔ sì diǎn wǒ qù huǒchēzhàn jiē yí ge lǎo péngyou. Wèn: Tā xiàwǔ sì diǎn qù nǎr?', '4 giờ chiều tôi ra ga tàu đón một người bạn cũ. Hỏi: 4 giờ chiều anh ấy đi đâu?', ['A. 飞机场 (Sân bay)', 'B. 火车站 (Ga tàu hỏa)', 'C. 学校 (Trường học)'], 'B', 'Điểm đến lúc 4 giờ chiều là 火车站 (ga tàu hỏa).']
      ],
      p5: [
        ['Hình: Một tách trà nóng', '茶', 'chá', 'Trà', 'T', 'Hình tách trà khớp với danh từ 茶 (chá).'],
        ['Hình: Một chú chó con', '小狗', 'xiǎogǒu', 'Chú chó nhỏ', 'T', 'Hình chú chó khớp với từ 小狗 (xiǎogǒu).'],
        ['Hình: Đồng hồ chỉ 4 giờ', '七点', 'qī diǎn', '7 giờ', 'F', 'Đồng hồ chỉ 4 giờ (四点), không phải 7 giờ (七点).'],
        ['Hình: Một người đang xem phim', '看电影', 'kàn diànyǐng', 'Xem phim', 'T', 'Hình ảnh xem phim khớp với cụm 看电影 (kàn diànyǐng).'],
        ['Hình: Một chiếc bàn gỗ', '杯子', 'bēizi', 'Cái cốc', 'F', 'Trong hình là cái bàn (桌子), không phải cái cốc (杯子).']
      ],
      p6: {
        panel: [
          { key: 'A', label: 'Một học sinh đang đọc sách tiếng Hán', detail: '读汉语书 (kàn shū)' },
          { key: 'B', label: 'Một người đang nấu ăn trong bếp', detail: '做饭 (zuò fàn)' },
          { key: 'C', label: 'Hai người đang ngồi uống nước ở quán', detail: '喝水 (hē shuǐ)' },
          { key: 'D', label: 'Một chiếc máy tính đặt trên bàn làm việc', detail: '电脑 (diànnǎo)' },
          { key: 'E', label: 'Trời mùa đông lạnh giá có tuyết', detail: '天气很冷 (hěn lěng)' },
          { key: 'F', label: 'Hai bạn học đang vẫy tay tạm biệt', detail: '再见 (zàijiàn)' }
        ],
        items: [
          ['桌子上放着一台新电脑。', 'Zhuōzi shàng fàngzhe yì tái xīn diànnǎo.', 'Trên bàn đặt một chiếc máy tính mới.', 'D', 'Hình chiếc máy tính trên bàn khớp với câu mô tả ở D.'],
          ['今天天气太冷了，多穿件衣服吧。', 'Jīntiān tiānqì tài lěng le, duō chuān jiàn yīfu ba.', 'Hôm nay thời tiết lạnh quá, hãy mặc thêm áo vào nhé.', 'E', 'Từ khóa 太冷了 (lạnh quá) khớp với hình E.'],
          ['姐姐喜欢在家做中国菜。', 'Jiějie xǐhuan zài jiā zuò Zhōngguócài.', 'Chị gái thích nấu món Trung Quốc ở nhà.', 'B', 'Hoạt động nấu ăn ở nhà khớp với hình B.'],
          ['同学们，明天见！再见！', 'Tóngxuémen, míngtiān jiàn! Zàijiàn!', 'Các bạn học, hẹn gặp ngày mai! Tạm biệt!', 'F', 'Lời chào tạm biệt 再见 ứng với hình vẫy tay ở F.'],
          ['我每天早上都读一会儿汉语书。', 'Wǒ měitiān zǎoshang dōu dú yíhuìr Hànyǔ shū.', 'Mỗi buổi sáng tôi đều đọc sách tiếng Hán một lát.', 'A', 'Hoạt động đọc sách tiếng Hán khớp với hình A.']
        ]
      },
      p7: {
        panel: [
          { key: 'A', label: '不客气。 (Bú kèqi. - Đừng khách sáo.)' },
          { key: 'B', label: '我姓张，叫张东。 (Wǒ xìng Zhāng, jiào Zhāng Dōng. - Tôi họ Trương, tên là Trương Đông.)' },
          { key: 'C', label: '在椅子下面呢。 (Zài yǐzi xiàmiàn ne. - Ở dưới gầm ghế kìa.)' },
          { key: 'D', label: '十月二号。 (Shíyuè èr hào. - Ngày 2 tháng 10.)' },
          { key: 'E', label: '好的，你想吃什么？ (Hǎo de, nǐ xiǎng chī shénme? - Được, bạn muốn ăn gì?)' },
          { key: 'F', label: '我坐出租车去。 (Wǒ zuò chūzūchē qù. - Tôi đi bằng xe taxi.)' }
        ],
        items: [
          ['请问，您贵姓？', 'Qǐngwèn, nín guìxìng?', 'Xin hỏi, quý danh (họ) của ngài là gì?', 'B', 'Hỏi họ 您贵姓 khớp với câu trả lời 我姓张，叫张东 ở B.'],
          ['中午我们去饭店吃饭吧？', 'Zhōngwǔ wǒmen qù fàndiàn chī fàn ba?', 'Trưa nay chúng ta ra nhà hàng ăn cơm nhé?', 'E', 'Câu rủ đi ăn cơm khớp với 好的，你想吃什么 ở E.'],
          ['你怎么去飞机场？', 'Nǐ zěnme qù fēijīchǎng?', 'Bạn đi ra sân bay bằng phương tiện gì?', 'F', 'Hỏi phương tiện 怎么去 khớp với 我坐出租车去 ở F.'],
          ['你看见我的小猫了吗？', 'Nǐ kànjiàn wǒ de xiǎomāo le ma?', 'Bạn có nhìn thấy chú mèo nhỏ của tôi không?', 'C', 'Hỏi tìm vị trí chú mèo khớp với 在椅子下面呢 ở C.'],
          ['你什么时候去上海工作？', 'Nǐ shénme shíhou qù Shànghǎi gōngzuò?', 'Khi nào bạn đi Thượng Hải làm việc?', 'D', 'Hỏi thời điểm 什么时候 khớp với 十月二号 (ngày 2 tháng 10) ở D.']
        ]
      },
      p8: {
        panel: [
          { key: 'A', label: '儿 (ér - con)' },
          { key: 'B', label: '起 (qǐ - cùng, dậy)' },
          { key: 'C', label: '识 (shi - quen biết)' },
          { key: 'D', label: '店 (diàn - cửa hàng, tiệm)' },
          { key: 'E', label: '面 (miàn - phía, mặt)' },
          { key: 'F', label: '午 (wǔ - buổi trưa)' }
        ],
        items: [
          ['认（  ）你很高兴，我叫王方。', 'Rèn (  ) nǐ hěn gāoxìng, wǒ jiào Wáng Fāng.', 'Rất vui được làm quen với bạn, tôi tên là Vương Phương.', 'C', 'Ghép với 认 tạo thành động từ 认识 (quen biết - chọn C).'],
          ['今天中（  ）我们在学校吃饭。', 'Jīntiān zhōng (  ) wǒmen zài xuéxiào chī fàn.', 'Trưa hôm nay chúng tôi ăn cơm ở trường.', 'F', 'Ghép với 中 tạo thành danh từ chỉ thời gian 中午 (buổi trưa - chọn F).'],
          ['对不（  ），我今天来晚了。', 'Duìbu (  ), wǒ jīntiān lái wǎn le.', 'Xin lỗi, hôm nay tôi đến muộn.', 'B', 'Cụm từ xin lỗi cố định 对不起 (xin lỗi - chọn B).'],
          ['学校前（  ）有一个很大的水果商店。', 'Xuéxiào qián (  ) yǒu yí ge hěn dà de shuǐguǒ shāngdiàn.', 'Phía trước trường học có một cửa hàng hoa quả rất lớn.', 'E', 'Ghép với 前 tạo thành phương vị từ 前面 (phía trước - chọn E).'],
          ['李老师有一个女（  ），今年六岁了。', 'Lǐ lǎoshī yǒu yí ge nǚ (  ), jīnnián liù suì le.', 'Cô Lý có một cô con gái, năm nay 6 tuổi rồi.', 'A', 'Ghép với 女 tạo thành danh từ 女儿 (con gái - chọn A).']
        ]
      }
    },

    // -----------------------------------------------------------------------
    // ĐỀ 10: H11010
    // -----------------------------------------------------------------------
    10: {
      p1: [
        ['Hình: Một chiếc máy bay trên đường băng', '飞机', 'fēijī', 'Máy bay', 'T', 'Hình chiếc máy bay khớp với danh từ 飞机 (fēijī).'],
        ['Hình: Một người đang viết chữ Hán', '打电话', 'dǎ diànhuà', 'Gọi điện thoại', 'F', 'Người trong hình đang viết chữ (写字), không phải gọi điện thoại (打电话).'],
        ['Hình: Một giỏ táo tươi', '苹果', 'píngguǒ', 'Quả táo', 'T', 'Hình ảnh những quả táo khớp với danh từ 苹果 (píngguǒ).'],
        ['Hình: Một người đang lái xe ô tô', '坐火车', 'zuò huǒchē', 'Đi tàu hỏa', 'F', 'Trong hình là lái ô tô (开车), không phải đi tàu hỏa (坐火车).'],
        ['Hình: Một học sinh đang đọc sách', '看书', 'kàn shū', 'Đọc sách', 'T', 'Hành động đọc sách khớp với cụm 看书 (kàn shū).']
      ],
      p2: [
        ['我爸爸是一名医生。', 'Wǒ bàba shì yì míng yīshēng.', 'Bố tôi là một bác sĩ.', ['A. Bác sĩ trong bệnh viện', 'B. Thầy giáo trên lớp', 'C. Tài xế taxi'], 'A', 'Danh từ 医生 (bác sĩ) tương ứng với hình A.'],
        ['今天天气很热，我想喝冷水。', 'Jīntiān tiānqì hěn rè, wǒ xiǎng hē lěng shuǐ.', 'Hôm nay trời rất nóng, tôi muốn uống nước mát.', ['A. Trời nắng nóng uống nước', 'B. Mặc áo bông mùa đông', 'C. Trời mưa che ô'], 'A', 'Từ khóa 很热 (rất nóng) và 喝冷水 (uống nước mát) khớp với hình A.'],
        ['桌子上有三本汉语书。', 'Zhuōzi shàng yǒu sān běn Hànyǔ shū.', 'Trên bàn có 3 quyển sách tiếng Hán.', ['A. Ba quyển sách trên bàn', 'B. Một chiếc máy tính', 'C. Hai cái cốc'], 'A', 'Số lượng 三本汉语书 (3 quyển sách tiếng Hán) khớp với hình A.'],
        ['弟弟晚上九点睡觉。', 'Dìdi wǎnshang jiǔ diǎn shuìjiào.', 'Em trai đi ngủ lúc 9 giờ tối.', ['A. Cậu bé ngủ lúc 9:00', 'B. Ăn sáng lúc 7:00', 'C. Xem tivi lúc 8:00'], 'A', 'Hoạt động 睡觉 (ngủ) lúc 9 giờ tối khớp với hình A.'],
        ['我和妈妈在商店买衣服。', 'Wǒ hé māma zài shāngdiàn mǎi yīfu.', 'Tôi và mẹ mua quần áo ở cửa hàng.', ['A. Hai mẹ con chọn quần áo', 'B. Hai người ở sân bay', 'C. Nấu cơm trong bếp'], 'A', 'Cụm từ 买衣服 (mua quần áo) khớp với hình A.']
      ],
      p3: {
        panel: [
          { key: 'A', label: 'Ăn cơm trưa tại nhà hàng', detail: '饭店吃饭 (chī fàn)' },
          { key: 'B', label: 'Làm việc trên máy tính', detail: '用电脑 (diànnǎo)' },
          { key: 'C', label: 'Đi xem phim cùng bạn', detail: '看电影 (kàn diànyǐng)' },
          { key: 'D', label: 'Chú chó nhỏ dưới gầm ghế', detail: '小狗 (xiǎogǒu)' },
          { key: 'E', label: 'Đón xe taxi đi ga tàu', detail: '坐出租车 (chūzūchē)' },
          { key: 'F', label: 'Uống trà nóng buổi chiều', detail: '喝茶 (hē chá)' }
        ],
        items: [
          ['女：你看见我的小狗了吗？ 男：它在椅子下面呢。', 'Nǚ: Nǐ kànjiàn wǒ de xiǎogǒu le ma? Nán: Tā zài yǐzi xiàmiàn ne.', 'Nữ: Bạn có thấy chú chó của tôi không? Nam: Nó ở dưới gầm ghế kìa.', 'D', 'Hình ảnh chú chó dưới ghế khớp với tranh D.'],
          ['男：中午我们在哪儿吃饭？ 女：去学校前面的饭店吃吧。', 'Nán: Zhōngwǔ wǒmen zài nǎr chī fàn? Nǚ: Qù xuéxiào qiánmiàn de fàndiàn chī ba.', 'Nam: Trưa nay mình ăn cơm ở đâu? Nữ: Ra nhà hàng trước trường ăn nhé.', 'A', 'Hoạt động ăn cơm ở nhà hàng khớp với tranh A.'],
          ['女：你在电脑上看什么呢？ 男：我在工作呢。', 'Nǚ: Nǐ zài diànnǎo shàng kàn shénme ne? Nán: Wǒ zài gōngzuò ne.', 'Nữ: Bạn đang xem gì trên máy tính thế? Nam: Tôi đang làm việc.', 'B', 'Từ khóa 电脑 (máy tính) và 工作 (làm việc) khớp với tranh B.'],
          ['男：星期六晚上我们去看电影，好吗？ 女：好啊，我也很想去。', 'Nán: Xīngqīliù wǎnshang wǒmen qù kàn diànyǐng, hǎo ma? Nǚ: Hǎo a, wǒ yě hěn xiǎng qù.', 'Nam: Tối thứ Bảy mình đi xem phim nhé? Nữ: Được đấy, tôi cũng rất muốn đi.', 'C', 'Hoạt động 看电影 (xem phim) khớp với tranh C.'],
          ['女：现在去火车站怎么去？ 男：我们坐出租车去吧。', 'Nǚ: Xiànzài qù huǒchēzhàn zěnme qù? Nán: Wǒmen zuò chūzūchē qù ba.', 'Nữ: Giờ ra ga tàu đi bằng gì? Nam: Chúng mình đi taxi nhé.', 'E', 'Phương tiện 坐出租车 (đi taxi) khớp với tranh E.']
        ]
      },
      p4: [
        ['李老师是北京人，她现在在上海工作。问：李老师现在在哪儿工作？', 'Lǐ lǎoshī shì Běijīngrén, tā xiànzài zài Shànghǎi gōngzuò. Wèn: Lǐ lǎoshī xiànzài zài nǎr gōngzuò?', 'Cô Lý là người Bắc Kinh, hiện cô đang làm việc ở Thượng Hải. Hỏi: Hiện cô Lý làm việc ở đâu?', ['A. 北京 (Bắc Kinh)', 'B. 上海 (Thượng Hải)', 'C. 广州 (Quảng Châu)'], 'B', 'Câu nghe nói rõ 她现在在上海工作 (hiện cô ấy làm ở Thượng Hải).'],
        ['我买了五个苹果和一些草莓，一共三十块钱。问：他买了几个苹果？', 'Wǒ mǎile wǔ ge píngguǒ hé yìxiē cǎoméi, yígòng sānshí kuài qián. Wèn: Tā mǎile jǐ ge píngguǒ?', 'Tôi mua 5 quả táo và một ít dâu tây, tổng cộng 30 tệ. Hỏi: Anh ấy mua mấy quả táo?', ['A. 三个 (3 quả)', 'B. 五个 (5 quả)', 'C. 十个 (10 quả)'], 'B', 'Số lượng táo là 五个苹果 (5 quả táo).'],
        ['大卫学习汉语两年了，他会说汉语，也会写汉字。问：大卫学习什么？', 'Dàwèi xuéxí Hànyǔ liǎng nián le, tā huì shuō Hànyǔ, yě huì xiě Hànzì. Wèn: Dàwèi xuéxí shénme?', 'David học tiếng Hán 2 năm rồi, biết nói và viết chữ Hán. Hỏi: David học gì?', ['A. 汉语 (Tiếng Hán)', 'B. 做中国菜 (Nấu món Trung)', 'C. 开车 (Lái xe)'], 'A', 'Câu đầu nêu rõ 大卫学习汉语 (David học tiếng Hán).'],
        ['今天是十一月十号，星期三。问：明天是几月几号？', 'Jīntiān shì shíyīyuè shí hào, xīngqīsān. Wèn: Míngtiān shì jǐ yuè jǐ hào?', 'Hôm nay là ngày 10 tháng 11, thứ Tư. Hỏi: Ngày mai là ngày mấy tháng mấy?', ['A. 11月9号 (Ngày 9/11)', 'B. 11月10号 (Ngày 10/11)', 'C. 11月11号 (Ngày 11/11)'], 'C', 'Hôm nay 10/11 thì ngày mai là 11/11 (十一月十一号).'],
        ['王小姐喜欢在家看电视，不喜欢去电影院。问：王小姐喜欢做什么？', 'Wáng xiǎojiě xǐhuan zài jiā kàn diànshì, bù xǐhuan qù diànyǐngyuàn. Wèn: Wáng xiǎojiě xǐhuan zuò shénme?', 'Cô Vương thích xem tivi ở nhà, không thích ra rạp. Hỏi: Cô Vương thích làm gì?', ['A. 在家看电视 (Xem tivi ở nhà)', 'B. 去医院 (Đi bệnh viện)', 'C. 去商店 (Đi cửa hàng)'], 'A', 'Thông tin 喜欢在家看电视 khớp trực tiếp với đáp án A.']
      ],
      p5: [
        ['Hình: Một chiếc cốc uống nước', '杯子', 'bēizi', 'Cái cốc', 'T', 'Hình chiếc cốc khớp với danh từ 杯子 (bēizi).'],
        ['Hình: Một chú mèo đang nằm', '小猫', 'xiǎomāo', 'Mèo con', 'T', 'Hình chú mèo khớp với từ 小猫 (xiǎomāo).'],
        ['Hình: Con số 15', '五十', 'wǔshí', 'Số 50', 'F', 'Trong hình là số 15 (十五 - shíwǔ), không phải 50 (五十).'],
        ['Hình: Một bát cơm trắng', '米饭', 'mǐfàn', 'Cơm trắng', 'T', 'Hình bát cơm khớp với danh từ 米饭 (mǐfàn).'],
        ['Hình: Một người đang chạy bộ', '坐', 'zuò', 'Ngồi', 'F', 'Người trong hình đang chạy, không phải đang ngồi (坐).']
      ],
      p6: {
        panel: [
          { key: 'A', label: 'Một người đang gọi điện thoại di động', detail: '打电话 (dǎ diànhuà)' },
          { key: 'B', label: 'Hai bạn học đang đi vào trường học', detail: '去学校 (qù xuéxiào)' },
          { key: 'C', label: 'Một cô gái đang viết chữ Hán', detail: '写汉字 (xiě Hànzì)' },
          { key: 'D', label: 'Một người đang nấu ăn trong bếp', detail: '做饭 (zuò fàn)' },
          { key: 'E', label: 'Trời đang mưa to', detail: '下雨 (xià yǔ)' },
          { key: 'F', label: 'Một chàng trai đang uống trà', detail: '喝茶 (hē chá)' }
        ],
        items: [
          ['早上八点，我和同学一起去学校上课。', 'Zǎoshang bā diǎn, wǒ hé tóngxué yìqǐ qù xuéxiào shàngkè.', '8 giờ sáng, tôi cùng bạn học đến trường lên lớp.', 'B', 'Hoạt động đến trường cùng bạn học khớp với hình B.'],
          ['爸爸很喜欢喝中国茶。', 'Bàba hěn xǐhuan hē Zhōngguó chá.', 'Bố rất thích uống trà Trung Quốc.', 'F', 'Hành động 喝茶 (uống trà) khớp với hình F.'],
          ['妈妈正在厨房里做晚饭呢。', 'Māma zhèngzài chúfáng lǐ zuò wǎnfàn ne.', 'Mẹ đang nấu bữa tối trong bếp.', 'D', 'Hoạt động 做晚饭 (nấu bữa tối) khớp với hình D.'],
          ['外面下雨了，我们今天不出去玩儿了。', 'Wàimiàn xià yǔ le, wǒmen jīntiān bù chūqù wánr le.', 'Ngoài trời mưa rồi, hôm nay chúng ta không ra ngoài chơi nữa.', 'E', 'Hiện tượng 下雨 (trời mưa) khớp với hình E.'],
          ['喂，请问张先生在家吗？', 'Wéi, qǐngwèn Zhāng xiānsheng zài jiā ma?', 'Alo, xin hỏi ông Trương có ở nhà không ạ?', 'A', 'Câu mở đầu cuộc gọi điện thoại khớp với hình A.']
        ]
      },
      p7: {
        panel: [
          { key: 'A', label: '没关系。 (Méi guānxi. - Không sao đâu.)' },
          { key: 'B', label: '我今年二十岁。 (Wǒ jīnnián èrshí suì. - Năm nay tôi 20 tuổi.)' },
          { key: 'C', label: '在桌子上面呢。 (Zài zhuōzi shàngmiàn ne. - Ở trên mặt bàn kìa.)' },
          { key: 'D', label: '他是我的汉语老师。 (Tā shì wǒ de Hànyǔ lǎoshī. - Thầy ấy là giáo viên tiếng Hán của tôi.)' },
          { key: 'E', label: '六十块钱。 (Liùshí kuài qián. - 60 đồng.)' },
          { key: 'F', label: '好啊，我们坐出租车去吧。 (Hǎo a, wǒmen zuò chūzūchē qù ba. - Được đấy, chúng mình đi taxi nhé.)' }
        ],
        items: [
          ['这件漂亮的衣服多少钱？', 'Zhè jiàn piàoliang de yīfu duōshao qián?', 'Bộ quần áo đẹp này giá bao nhiêu tiền?', 'E', 'Hỏi giá 多少钱 khớp với 六十块钱 (60 tệ) ở E.'],
          ['请问，那个人是谁？', 'Qǐngwèn, nàge rén shì shéi?', 'Xin hỏi, người kia là ai?', 'D', 'Hỏi người 是谁 khớp với 他是我的汉语老师 ở D.'],
          ['我的汉语书在哪儿呢？', 'Wǒ de Hànyǔ shū zài nǎr ne?', 'Quyển sách tiếng Hán của tôi ở đâu nhỉ?', 'C', 'Hỏi vị trí 在哪儿 khớp với 在桌子上面呢 ở C.'],
          ['对不起，我不会写这个汉字。', 'Duìbuqǐ, wǒ bú huì xiě zhège Hànzì.', 'Xin lỗi, tôi không biết viết chữ Hán này.', 'A', 'Đáp lại lời xin lỗi 对不起 bằng 没关系 ở A.'],
          ['我们现在去火车站，好吗？', 'Wǒmen xiànzài qù huǒchēzhàn, hǎo ma?', 'Bây giờ chúng ta ra ga tàu hỏa nhé, được không?', 'F', 'Câu rủ đi ga tàu khớp với 好啊，我们坐出租车去吧 ở F.']
        ]
      },
      p8: {
        panel: [
          { key: 'A', label: '喜 (xǐ - thích, vui)' },
          { key: 'B', label: '现 (xiàn - hiện tại)' },
          { key: 'C', label: '朋 (péng - bạn bè)' },
          { key: 'D', label: '学 (xué - học)' },
          { key: 'E', label: '高 (gāo - cao, vui)' },
          { key: 'F', label: '医 (yī - y tế)' }
        ],
        items: [
          ['请问，（  ）在几点了？', 'Qǐngwèn, (  ) zài jǐ diǎn le?', 'Xin hỏi, bây giờ là mấy giờ rồi?', 'B', 'Ghép với 在 tạo thành danh từ chỉ thời gian 现在 (bây giờ - chọn B).'],
          ['我姐姐在（  ）院工作，她是医生。', 'Wǒ jiějie zài (  ) yuàn gōngzuò, tā shì yīshēng.', 'Chị gái tôi làm việc ở bệnh viện, chị ấy là bác sĩ.', 'F', 'Ghép với 院 tạo thành danh từ 医院 (bệnh viện - chọn F).'],
          ['大卫是我最好的中国（  ）友。', 'Dàwèi shì wǒ zuì hǎo de Zhōngguó (  ) you.', 'David là người bạn Trung Quốc thân nhất của tôi.', 'C', 'Ghép với 友 tạo thành danh từ 朋友 (bạn bè - chọn C).'],
          ['我非常（  ）欢吃妈妈做的中国菜。', 'Wǒ fēicháng (  ) huan chī māma zuò de Zhōngguócài.', 'Tôi vô cùng thích ăn món Trung Quốc mẹ nấu.', 'A', 'Ghép với 欢 tạo thành động từ 喜欢 (thích - chọn A).'],
          ['我们在北京大（  ）学习汉语。', 'Wǒmen zài Běijīng Dà (  ) xuéxí Hànyǔ.', 'Chúng tôi học tiếng Hán tại Đại học Bắc Kinh.', 'D', 'Ghép với 大 tạo thành danh từ 大学 (đại học - chọn D).']
        ]
      }
    }
  };

  // =========================================================================
  // KHỞI TẠO KHO ĐỀ TOÀN CỤC: window.HSK1_EXAM_REPOSITORY (1 -> 10)
  // =========================================================================
  const repository = {};
  for (let i = 1; i <= 10; i++) {
    repository[i] = buildHSK1Exam(i, RAW_EXAMS[i]);
    // Tạo thêm alias theo tên biến HSK1_EXAM_01 ... HSK1_EXAM_10 trên window
    const paddedKey = 'HSK1_EXAM_' + String(i).padStart(2, '0');
    global[paddedKey] = repository[i];
  }

  global.HSK1_EXAM_REPOSITORY = repository;
})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
