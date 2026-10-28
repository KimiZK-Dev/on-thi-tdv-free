/**
 * EDUZ CBT - SỔ TAY TỪ VỰNG & CẤU TRÚC NGỮ PHÁP HSK 1 & HSK 2 CHUẨN HANBAN
 * Bao gồm:
 * - HSK 1: Trọn bộ 151 Từ vựng chuẩn Hanban + 6 Chuyên đề Ngữ pháp Cốt lõi
 * - HSK 2: Trọn bộ 770+ Từ vựng thực chiến CTI + 5 Chuyên đề Ngữ pháp Nâng cao
 * Tích hợp tra cứu Pinyin, loại từ, nghĩa tiếng Việt, ví dụ minh họa và tìm kiếm không dấu
 */

(function (global) {
  'use strict';

  var HSK1_VOCABULARY = [
  {
    "stt": 1,
    "hanzi": "爱",
    "pinyin": "ài",
    "type": "động từ",
    "meaning": "yêu, thích",
    "example": "我爱爸爸妈妈。(Wǒ ài bàba māma - Tôi yêu bố mẹ.)"
  },
  {
    "stt": 2,
    "hanzi": "八",
    "pinyin": "bā",
    "type": "số từ",
    "meaning": "số 8",
    "example": "他有八本书。(Tā yǒu bā běn shū - Anh ấy có 8 cuốn sách.)"
  },
  {
    "stt": 3,
    "hanzi": "爸爸",
    "pinyin": "bàba",
    "type": "danh từ",
    "meaning": "bố, cha",
    "example": "我爸爸是老师。(Wǒ bàba shì lǎoshī - Bố tôi là giáo viên.)"
  },
  {
    "stt": 4,
    "hanzi": "杯子",
    "pinyin": "bēizi",
    "type": "danh từ",
    "meaning": "cốc, chén, ly",
    "example": "杯子里有水。(Bēizi li yǒu shuǐ - Trong cốc có nước.)"
  },
  {
    "stt": 5,
    "hanzi": "北京",
    "pinyin": "Běijīng",
    "type": "danh từ riêng",
    "meaning": "Bắc Kinh",
    "example": "我想去北京。(Wǒ xiǎng qù Běijīng - Tôi muốn đi Bắc Kinh.)"
  },
  {
    "stt": 6,
    "hanzi": "本",
    "pinyin": "běn",
    "type": "lượng từ",
    "meaning": "quyển, cuốn (sách, vở)",
    "example": "这是一本书。(Zhè shì yì běn shū - Đây là một cuốn sách.)"
  },
  {
    "stt": 7,
    "hanzi": "不客气",
    "pinyin": "bú kèqi",
    "type": "cụm từ",
    "meaning": "đừng khách sáo, không có gì",
    "example": "谢谢！— 不客气。(Xièxie! — Bú kèqi - Cảm ơn! — Không có gì.)"
  },
  {
    "stt": 8,
    "hanzi": "不",
    "pinyin": "bù",
    "type": "phó từ",
    "meaning": "không (phủ định hiện tại, tương lai)",
    "example": "我不是学生。(Wǒ bú shì xuésheng - Tôi không phải học sinh.)"
  },
  {
    "stt": 9,
    "hanzi": "菜",
    "pinyin": "cài",
    "type": "danh từ",
    "meaning": "rau, món ăn",
    "example": "中国菜很好吃。(Zhōngguó cài hěn hǎochī - Món ăn Trung Quốc rất ngon.)"
  },
  {
    "stt": 10,
    "hanzi": "茶",
    "pinyin": "chá",
    "type": "danh từ",
    "meaning": "trà, chè",
    "example": "请喝茶。(Qǐng hē chá - Xin mời uống trà.)"
  },
  {
    "stt": 11,
    "hanzi": "吃",
    "pinyin": "chī",
    "type": "động từ",
    "meaning": "ăn",
    "example": "你想吃什么？(Nǐ xiǎng chī shénme? - Bạn muốn ăn gì?)"
  },
  {
    "stt": 12,
    "hanzi": "出租车",
    "pinyin": "chūzūchē",
    "type": "danh từ",
    "meaning": "xe taxi",
    "example": "我们坐出租车去。(Wǒmen zuò chūzūchē qù - Chúng tôi đi taxi đi.)"
  },
  {
    "stt": 13,
    "hanzi": "打电话",
    "pinyin": "dǎ diànhuà",
    "type": "cụm động từ",
    "meaning": "gọi điện thoại",
    "example": "他在打电话。(Tā zài dǎ diànhuà - Anh ấy đang gọi điện thoại.)"
  },
  {
    "stt": 14,
    "hanzi": "大",
    "pinyin": "dà",
    "type": "tính từ",
    "meaning": "to, lớn",
    "example": "这个苹果很大。(Zhè ge píngguǒ hěn dà - Quả táo này rất to.)"
  },
  {
    "stt": 15,
    "hanzi": "的",
    "pinyin": "de",
    "type": "trợ từ",
    "meaning": "của (sở hữu), trợ từ kết cấu",
    "example": "这是我的书。(Zhè shì wǒ de shū - Đây là sách của tôi.)"
  },
  {
    "stt": 16,
    "hanzi": "点",
    "pinyin": "diǎn",
    "type": "danh từ / lượng từ",
    "meaning": "giờ, chút, điểm",
    "example": "现在三点。(Xiànzài sān diǎn - Bây giờ là 3 giờ.)"
  },
  {
    "stt": 17,
    "hanzi": "电脑",
    "pinyin": "diànnǎo",
    "type": "danh từ",
    "meaning": "máy tính, máy vi tính",
    "example": "他买了一个新电脑。(Tā mǎile yí ge xīn diànnǎo - Anh ấy đã mua một máy tính mới.)"
  },
  {
    "stt": 18,
    "hanzi": "电视",
    "pinyin": "diànshì",
    "type": "danh từ",
    "meaning": "ti vi, truyền hình",
    "example": "我看电视。(Wǒ kàn diànshì - Tôi xem ti vi.)"
  },
  {
    "stt": 19,
    "hanzi": "电影",
    "pinyin": "diànyǐng",
    "type": "danh từ",
    "meaning": "phim, điện ảnh",
    "example": "明天去看电影。(Míngtiān qù kàn diànyǐng - Ngày mai đi xem phim.)"
  },
  {
    "stt": 20,
    "hanzi": "东西",
    "pinyin": "dōngxi",
    "type": "danh từ",
    "meaning": "đồ vật, đồ đạc",
    "example": "你买什么东西？(Nǐ mǎi shénme dōngxi? - Bạn mua đồ gì thế?)"
  },
  {
    "stt": 21,
    "hanzi": "都",
    "pinyin": "dōu",
    "type": "phó từ",
    "meaning": "đều, cũng",
    "example": "我们都是中国人。(Wǒmen dōu shì Zhōngguó rén - Chúng tôi đều là người Trung Quốc.)"
  },
  {
    "stt": 22,
    "hanzi": "读",
    "pinyin": "dú",
    "type": "động từ",
    "meaning": "đọc",
    "example": "请读这个字。(Qǐng dú zhè ge zì - Xin hãy đọc chữ này.)"
  },
  {
    "stt": 23,
    "hanzi": "对不起",
    "pinyin": "duìbuqǐ",
    "type": "cụm từ",
    "meaning": "xin lỗi",
    "example": "对不起，我来晚了。(Duìbuqǐ, wǒ lái wǎn le - Xin lỗi, tôi đến muộn.)"
  },
  {
    "stt": 24,
    "hanzi": "多",
    "pinyin": "duō",
    "type": "tính từ / phó từ",
    "meaning": "nhiều, bao nhiêu",
    "example": "这里人很多。(Zhèlǐ rén hěn duō - Ở đây người rất đông.)"
  },
  {
    "stt": 25,
    "hanzi": "多少",
    "pinyin": "duōshao",
    "type": "đại từ",
    "meaning": "bao nhiêu",
    "example": "这个多少钱？(Zhè ge duōshao qián? - Cái này bao nhiêu tiền?)"
  },
  {
    "stt": 26,
    "hanzi": "儿子",
    "pinyin": "érzi",
    "type": "danh từ",
    "meaning": "con trai",
    "example": "他有两个儿子。(Tā yǒu liǎng ge érzi - Anh ấy có hai con trai.)"
  },
  {
    "stt": 27,
    "hanzi": "二",
    "pinyin": "èr",
    "type": "số từ",
    "meaning": "số 2",
    "example": "星期二。(Xīngqī'èr - Thứ ba.)"
  },
  {
    "stt": 28,
    "hanzi": "饭馆",
    "pinyin": "fànguǎn",
    "type": "danh từ",
    "meaning": "nhà hàng, quán ăn",
    "example": "我们去饭馆吃饭。(Wǒmen qù fànguǎn chīfàn - Chúng tôi đến quán ăn cơm.)"
  },
  {
    "stt": 29,
    "hanzi": "飞机",
    "pinyin": "fēijī",
    "type": "danh từ",
    "meaning": "máy bay",
    "example": "我坐飞机去北京。(Wǒ zuò fēijī qù Běijīng - Tôi đi máy bay đến Bắc Kinh.)"
  },
  {
    "stt": 30,
    "hanzi": "分钟",
    "pinyin": "fēnzhōng",
    "type": "danh từ",
    "meaning": "phút (khoảng thời gian)",
    "example": "等我五分钟。(Děng wǒ wǔ fēnzhōng - Đợi tôi năm phút.)"
  },
  {
    "stt": 31,
    "hanzi": "高兴",
    "pinyin": "gāoxìng",
    "type": "tính từ",
    "meaning": "vui vẻ, vui mừng",
    "example": "认识你很高兴。(Rènshi nǐ hěn gāoxìng - Rất vui được quen biết bạn.)"
  },
  {
    "stt": 32,
    "hanzi": "个",
    "pinyin": "gè",
    "type": "lượng từ",
    "meaning": "cái, con, người (lượng từ phổ biến)",
    "example": "一个人。(Yí ge rén - Một người.)"
  },
  {
    "stt": 33,
    "hanzi": "工作",
    "pinyin": "gōngzuò",
    "type": "danh từ / động từ",
    "meaning": "công việc, làm việc",
    "example": "你在哪儿工作？(Nǐ zài nǎr gōngzuò? - Bạn làm việc ở đâu?)"
  },
  {
    "stt": 34,
    "hanzi": "汉语",
    "pinyin": "hànyǔ",
    "type": "danh từ",
    "meaning": "tiếng Hán, tiếng Trung",
    "example": "我学汉语。(Wǒ xué hànyǔ - Tôi học tiếng Trung.)"
  },
  {
    "stt": 35,
    "hanzi": "好",
    "pinyin": "hǎo",
    "type": "tính từ",
    "meaning": "tốt, đẹp, hay, khỏe",
    "example": "你好！(Nǐ hǎo! - Xin chào!)"
  },
  {
    "stt": 36,
    "hanzi": "号",
    "pinyin": "hào",
    "type": "danh từ",
    "meaning": "ngày (mùng), số",
    "example": "今天几号？(Jīntiān jǐ hào? - Hôm nay ngày mấy?)"
  },
  {
    "stt": 37,
    "hanzi": "喝",
    "pinyin": "hē",
    "type": "động từ",
    "meaning": "uống",
    "example": "喝水。(Hē shuǐ - Uống nước.)"
  },
  {
    "stt": 38,
    "hanzi": "和",
    "pinyin": "hé",
    "type": "liên từ",
    "meaning": "và, cùng, với",
    "example": "我和你。(Wǒ hé nǐ - Tôi và bạn.)"
  },
  {
    "stt": 39,
    "hanzi": "很",
    "pinyin": "hěn",
    "type": "phó từ",
    "meaning": "rất, quá",
    "example": "他很高。(Tā hěn gāo - Anh ấy rất cao.)"
  },
  {
    "stt": 40,
    "hanzi": "后面",
    "pinyin": "hòumiàn",
    "type": "danh từ phương vị",
    "meaning": "phía sau, đằng sau",
    "example": "学校在后面。(Xuéxiào zài hòumiàn - Trường học ở phía sau.)"
  },
  {
    "stt": 41,
    "hanzi": "回",
    "pinyin": "huí",
    "type": "động từ",
    "meaning": "về, quay lại",
    "example": "我回家。(Wǒ huí jiā - Tôi về nhà.)"
  },
  {
    "stt": 42,
    "hanzi": "会",
    "pinyin": "huì",
    "type": "trợ động từ",
    "meaning": "biết (qua học hỏi), sẽ",
    "example": "我会说汉语。(Wǒ huì shuō hànyǔ - Tôi biết nói tiếng Trung.)"
  },
  {
    "stt": 43,
    "hanzi": "几",
    "pinyin": "jǐ",
    "type": "đại từ",
    "meaning": "mấy, vài (< 10)",
    "example": "你几岁？(Nǐ jǐ suì? - Bạn mấy tuổi?)"
  },
  {
    "stt": 44,
    "hanzi": "家",
    "pinyin": "jiā",
    "type": "danh từ",
    "meaning": "nhà, gia đình",
    "example": "我家在北京。(Wǒ jiā zài Běijīng - Nhà tôi ở Bắc Kinh.)"
  },
  {
    "stt": 45,
    "hanzi": "叫",
    "pinyin": "jiào",
    "type": "động từ",
    "meaning": "tên là, gọi",
    "example": "你叫什么名字？(Nǐ jiào shénme míngzi? - Bạn tên là gì?)"
  },
  {
    "stt": 46,
    "hanzi": "今天",
    "pinyin": "jīntiān",
    "type": "danh từ thời gian",
    "meaning": "hôm nay",
    "example": "今天星期五。(Jīntiān xīngqīwǔ - Hôm nay là thứ sáu.)"
  },
  {
    "stt": 47,
    "hanzi": "九",
    "pinyin": "jiǔ",
    "type": "số từ",
    "meaning": "số 9",
    "example": "九个人。(Jiǔ ge rén - Chín người.)"
  },
  {
    "stt": 48,
    "hanzi": "开",
    "pinyin": "kāi",
    "type": "động từ",
    "meaning": "mở, lái (xe)",
    "example": "开门。(Kāi mén - Mở cửa.) | 开车 (Lái xe)"
  },
  {
    "stt": 49,
    "hanzi": "看",
    "pinyin": "kàn",
    "type": "động từ",
    "meaning": "nhìn, xem, đọc",
    "example": "看书。(Kàn shū - Đọc sách.)"
  },
  {
    "stt": 50,
    "hanzi": "看见",
    "pinyin": "kànjiàn",
    "type": "động từ",
    "meaning": "nhìn thấy, trông thấy",
    "example": "我看见他了。(Wǒ kànjiàn tā le - Tôi nhìn thấy anh ấy rồi.)"
  },
  {
    "stt": 51,
    "hanzi": "块",
    "pinyin": "kuài",
    "type": "lượng từ",
    "meaning": "đồng (tệ), miếng, hòn",
    "example": "五块钱。(Wǔ kuài qián - Năm đồng tệ.)"
  },
  {
    "stt": 52,
    "hanzi": "来",
    "pinyin": "lái",
    "type": "động từ",
    "meaning": "đến, tới",
    "example": "他来了。(Tā lái le - Anh ấy đến rồi.)"
  },
  {
    "stt": 53,
    "hanzi": "老师",
    "pinyin": "lǎoshī",
    "type": "danh từ",
    "meaning": "thầy giáo, cô giáo",
    "example": "王老师。(Wáng lǎoshī - Thầy giáo Vương.)"
  },
  {
    "stt": 54,
    "hanzi": "了",
    "pinyin": "le",
    "type": "trợ từ",
    "meaning": "rồi (biểu thị hoàn thành / biến hóa)",
    "example": "吃饭了。(Chīfàn le - Ăn cơm rồi.)"
  },
  {
    "stt": 55,
    "hanzi": "冷",
    "pinyin": "lěng",
    "type": "tính từ",
    "meaning": "lạnh",
    "example": "今天很冷。(Jīntiān hěn lěng - Hôm nay rất lạnh.)"
  },
  {
    "stt": 56,
    "hanzi": "里",
    "pinyin": "lǐ",
    "type": "danh từ phương vị",
    "meaning": "trong, bên trong",
    "example": "屋子里。(Wūzi li - Trong phòng.)"
  },
  {
    "stt": 57,
    "hanzi": "六",
    "pinyin": "liù",
    "type": "số từ",
    "meaning": "số 6",
    "example": "六点。(Liù diǎn - 6 giờ.)"
  },
  {
    "stt": 58,
    "hanzi": "妈妈",
    "pinyin": "māma",
    "type": "danh từ",
    "meaning": "mẹ, má",
    "example": "我妈妈在做饭。(Wǒ māma zài zuò fàn - Mẹ tôi đang nấu cơm.)"
  },
  {
    "stt": 59,
    "hanzi": "吗",
    "pinyin": "ma",
    "type": "trợ từ nghi vấn",
    "meaning": "không? à? (hỏi có/không)",
    "example": "你好吗？(Nǐ hǎo ma? - Bạn có khỏe không?)"
  },
  {
    "stt": 60,
    "hanzi": "买",
    "pinyin": "mǎi",
    "type": "động từ",
    "meaning": "mua",
    "example": "我想买一个苹果。(Wǒ xiǎng mǎi yí ge píngguǒ - Tôi muốn mua một quả táo.)"
  },
  {
    "stt": 61,
    "hanzi": "猫",
    "pinyin": "māo",
    "type": "danh từ",
    "meaning": "con mèo",
    "example": "一只猫。(Yì zhī māo - Một con mèo.)"
  },
  {
    "stt": 62,
    "hanzi": "没关系",
    "pinyin": "méi guānxi",
    "type": "cụm từ",
    "meaning": "không sao, không việc gì",
    "example": "对不起！— 没关系。(Duìbuqǐ! — Méi guānxi - Xin lỗi! — Không sao.)"
  },
  {
    "stt": 63,
    "hanzi": "没有",
    "pinyin": "méiyǒu",
    "type": "động từ / phó từ",
    "meaning": "không có, chưa",
    "example": "我没有钱。(Wǒ méiyǒu qián - Tôi không có tiền.)"
  },
  {
    "stt": 64,
    "hanzi": "米饭",
    "pinyin": "mǐfàn",
    "type": "danh từ",
    "meaning": "cơm, cơm trắng",
    "example": "吃米饭。(Chī mǐfàn - Ăn cơm.)"
  },
  {
    "stt": 65,
    "hanzi": "明天",
    "pinyin": "míngtiān",
    "type": "danh từ thời gian",
    "meaning": "ngày mai",
    "example": "明天见。(Míngtiān jiàn - Ngày mai gặp.)"
  },
  {
    "stt": 66,
    "hanzi": "名字",
    "pinyin": "míngzi",
    "type": "danh từ",
    "meaning": "tên, họ tên",
    "example": "你的名字。(Nǐ de míngzi - Tên của bạn.)"
  },
  {
    "stt": 67,
    "hanzi": "哪",
    "pinyin": "nǎ",
    "type": "đại từ",
    "meaning": "nào",
    "example": "哪个？(Nǎ ge? - Cái nào?)"
  },
  {
    "stt": 68,
    "hanzi": "哪儿",
    "pinyin": "nǎr",
    "type": "đại từ",
    "meaning": "ở đâu, nơi nào",
    "example": "你在哪儿？(Nǐ zài nǎr? - Bạn ở đâu?)"
  },
  {
    "stt": 69,
    "hanzi": "那",
    "pinyin": "nà",
    "type": "đại từ",
    "meaning": "kia, đó",
    "example": "那是谁？(Nà shì shéi? - Kia là ai?)"
  },
  {
    "stt": 70,
    "hanzi": "那儿",
    "pinyin": "nàr",
    "type": "đại từ",
    "meaning": "chỗ đó, nơi kia",
    "example": "他在那儿。(Tā zài nàr - Anh ấy ở đằng kia.)"
  },
  {
    "stt": 71,
    "hanzi": "呢",
    "pinyin": "ne",
    "type": "trợ từ ngữ khí",
    "meaning": "thì sao? đang (hỏi vặn)",
    "example": "我很好，你呢？(Wǒ hěn hǎo, nǐ ne? - Tôi rất khỏe, còn bạn thì sao?)"
  },
  {
    "stt": 72,
    "hanzi": "能",
    "pinyin": "néng",
    "type": "trợ động từ",
    "meaning": "có thể (năng lực, hoàn cảnh)",
    "example": "我能去吗？(Wǒ néng qù ma? - Tôi có thể đi không?)"
  },
  {
    "stt": 73,
    "hanzi": "你",
    "pinyin": "nǐ",
    "type": "đại từ",
    "meaning": "bạn, anh, chị (ngôi thứ 2)",
    "example": "你好！(Nǐ hǎo! - Chào bạn!)"
  },
  {
    "stt": 74,
    "hanzi": "年",
    "pinyin": "nián",
    "type": "danh từ",
    "meaning": "năm",
    "example": "一年。(Yì nián - Một năm.)"
  },
  {
    "stt": 75,
    "hanzi": "女儿",
    "pinyin": "nǚ'ér",
    "type": "danh từ",
    "meaning": "con gái",
    "example": "我有一个女儿。(Wǒ yǒu yí ge nǚ'ér - Tôi có một người con gái.)"
  },
  {
    "stt": 76,
    "hanzi": "朋友",
    "pinyin": "péngyou",
    "type": "danh từ",
    "meaning": "bạn bè, bạn",
    "example": "他是我的好朋友。(Tā shì wǒ de hǎo péngyou - Anh ấy là bạn thân của tôi.)"
  },
  {
    "stt": 77,
    "hanzi": "漂亮",
    "pinyin": "piàoliang",
    "type": "tính từ",
    "meaning": "xinh đẹp, đẹp đẽ",
    "example": "这件衣服真漂亮。(Zhè jiàn yīfu zhēn piàoliang - Chiếc áo này thật đẹp.)"
  },
  {
    "stt": 78,
    "hanzi": "苹果",
    "pinyin": "píngguǒ",
    "type": "danh từ",
    "meaning": "quả táo",
    "example": "吃苹果。(Chī píngguǒ - Ăn táo.)"
  },
  {
    "stt": 79,
    "hanzi": "七",
    "pinyin": "qī",
    "type": "số từ",
    "meaning": "số 7",
    "example": "七点。(Qī diǎn - 7 giờ.)"
  },
  {
    "stt": 80,
    "hanzi": "钱",
    "pinyin": "qián",
    "type": "danh từ",
    "meaning": "tiền, tiền bạc",
    "example": "多少钱？(Duōshao qián? - Bao nhiêu tiền?)"
  },
  {
    "stt": 81,
    "hanzi": "前面",
    "pinyin": "qiánmiàn",
    "type": "danh từ phương vị",
    "meaning": "phía trước, đằng trước",
    "example": "他在前面。(Tā zài qiánmiàn - Anh ấy ở phía trước.)"
  },
  {
    "stt": 82,
    "hanzi": "请",
    "pinyin": "qǐng",
    "type": "động từ",
    "meaning": "mời, xin phép",
    "example": "请坐。(Qǐng zuò - Mời ngồi.)"
  },
  {
    "stt": 83,
    "hanzi": "去",
    "pinyin": "qù",
    "type": "động từ",
    "meaning": "đi (rời xa người nói)",
    "example": "我去学校。(Wǒ qù xuéxiào - Tôi đi đến trường.)"
  },
  {
    "stt": 84,
    "hanzi": "热",
    "pinyin": "rè",
    "type": "tính từ",
    "meaning": "nóng",
    "example": "今天很热。(Jīntiān hěn rè - Hôm nay rất nóng.)"
  },
  {
    "stt": 85,
    "hanzi": "人",
    "pinyin": "rén",
    "type": "danh từ",
    "meaning": "người, con người",
    "example": "中国人。(Zhōngguó rén - Người Trung Quốc.)"
  },
  {
    "stt": 86,
    "hanzi": "认识",
    "pinyin": "rènshi",
    "type": "động từ",
    "meaning": "quen biết, nhận biết",
    "example": "你认识他吗？(Nǐ rènshi tā ma? - Bạn có quen anh ấy không?)"
  },
  {
    "stt": 87,
    "hanzi": "三",
    "pinyin": "sān",
    "type": "số từ",
    "meaning": "số 3",
    "example": "三个人。(Sān ge rén - Ba người.)"
  },
  {
    "stt": 88,
    "hanzi": "商店",
    "pinyin": "shāngdiàn",
    "type": "danh từ",
    "meaning": "cửa hàng, tiệm buôn",
    "example": "我去商店买东西。(Wǒ qù shāngdiàn mǎi dōngxi - Tôi đến cửa hàng mua đồ.)"
  },
  {
    "stt": 89,
    "hanzi": "上",
    "pinyin": "shàng",
    "type": "danh từ / động từ",
    "meaning": "trên, lên, đi (làm/học)",
    "example": "桌子上。(Zhuōzi shang - Trên bàn.) | 上班 (Đi làm)"
  },
  {
    "stt": 90,
    "hanzi": "上午",
    "pinyin": "shàngwǔ",
    "type": "danh từ thời gian",
    "meaning": "buổi sáng",
    "example": "上午九点。(Shàngwǔ jiǔ diǎn - 9 giờ sáng.)"
  },
  {
    "stt": 91,
    "hanzi": "少",
    "pinyin": "shǎo",
    "type": "tính từ",
    "meaning": "ít, thiếu",
    "example": "人很少。(Rén hěn shǎo - Người rất ít.)"
  },
  {
    "stt": 92,
    "hanzi": "谁",
    "pinyin": "shéi",
    "type": "đại từ",
    "meaning": "ai, người nào",
    "example": "他是谁？(Tā shì shéi? - Anh ấy là ai?)"
  },
  {
    "stt": 93,
    "hanzi": "什么",
    "pinyin": "shénme",
    "type": "đại từ",
    "meaning": "cái gì, gì",
    "example": "这是什么？(Zhè shì shénme? - Đây là cái gì?)"
  },
  {
    "stt": 94,
    "hanzi": "十",
    "pinyin": "shí",
    "type": "số từ",
    "meaning": "số 10",
    "example": "十块钱。(Shí kuài qián - Mười đồng tệ.)"
  },
  {
    "stt": 95,
    "hanzi": "时候",
    "pinyin": "shíhou",
    "type": "danh từ",
    "meaning": "lúc, khi (thời điểm)",
    "example": "什么时候？(Shénme shíhou? - Khi nào? Lúc nào?)"
  },
  {
    "stt": 96,
    "hanzi": "是",
    "pinyin": "shì",
    "type": "động từ",
    "meaning": "là, đúng, phải",
    "example": "我是学生。(Wǒ shì xuésheng - Tôi là học sinh.)"
  },
  {
    "stt": 97,
    "hanzi": "书",
    "pinyin": "shū",
    "type": "danh từ",
    "meaning": "sách, cuốn sách",
    "example": "汉语书。(Hànyǔ shū - Sách tiếng Hán.)"
  },
  {
    "stt": 98,
    "hanzi": "水",
    "pinyin": "shuǐ",
    "type": "danh từ",
    "meaning": "nước",
    "example": "喝水。(Hē shuǐ - Uống nước.)"
  },
  {
    "stt": 99,
    "hanzi": "水果",
    "pinyin": "shuǐguǒ",
    "type": "danh từ",
    "meaning": "hoa quả, trái cây",
    "example": "买水果。(Mǎi shuǐguǒ - Mua hoa quả.)"
  },
  {
    "stt": 100,
    "hanzi": "睡觉",
    "pinyin": "shuìjiào",
    "type": "động từ",
    "meaning": "ngủ, đi ngủ",
    "example": "我想睡觉。(Wǒ xiǎng shuìjiào - Tôi muốn đi ngủ.)"
  },
  {
    "stt": 101,
    "hanzi": "说话",
    "pinyin": "shuōhuà",
    "type": "cụm động từ",
    "meaning": "nói chuyện",
    "example": "请别说话。(Qǐng bié shuōhuà - Xin đừng nói chuyện.)"
  },
  {
    "stt": 102,
    "hanzi": "四",
    "pinyin": "sì",
    "type": "số từ",
    "meaning": "số 4",
    "example": "四个。(Sì ge - Bốn cái.)"
  },
  {
    "stt": 103,
    "hanzi": "岁",
    "pinyin": "suì",
    "type": "lượng từ",
    "meaning": "tuổi",
    "example": "他今年五岁。(Tā jīnnián wǔ suì - Cậu ấy năm nay 5 tuổi.)"
  },
  {
    "stt": 104,
    "hanzi": "他",
    "pinyin": "tā",
    "type": "đại từ",
    "meaning": "anh ấy, ông ấy (ngôi 3 nam)",
    "example": "他是我的老师。(Tā shì wǒ de lǎoshī - Anh ấy là thầy của tôi.)"
  },
  {
    "stt": 105,
    "hanzi": "她",
    "pinyin": "tā",
    "type": "đại từ",
    "meaning": "cô ấy, bà ấy (ngôi 3 nữ)",
    "example": "她很漂亮。(Tā hěn piàoliang - Cô ấy rất xinh đẹp.)"
  },
  {
    "stt": 106,
    "hanzi": "太",
    "pinyin": "tài",
    "type": "phó từ",
    "meaning": "quá, lắm (tài...le)",
    "example": "太好了！(Tài hǎo le! - Tốt quá rồi!)"
  },
  {
    "stt": 107,
    "hanzi": "天气",
    "pinyin": "tiānqì",
    "type": "danh từ",
    "meaning": "thời tiết, khí hậu",
    "example": "今天天气很好。(Jīntiān tiānqì hěn hǎo - Thời tiết hôm nay rất đẹp.)"
  },
  {
    "stt": 108,
    "hanzi": "听",
    "pinyin": "tīng",
    "type": "động từ",
    "meaning": "nghe, lắng nghe",
    "example": "听音乐。(Tīng yīnyuè - Nghe nhạc.)"
  },
  {
    "stt": 109,
    "hanzi": "同学",
    "pinyin": "tóngxué",
    "type": "danh từ",
    "meaning": "bạn cùng học, bạn học",
    "example": "我们是同学。(Wǒmen shì tóngxué - Chúng tôi là bạn học.)"
  },
  {
    "stt": 110,
    "hanzi": "喂",
    "pinyin": "wèi",
    "type": "thán từ",
    "meaning": "alo, này, ê",
    "example": "喂，你好！(Wèi, nǐ hǎo! - Alo, xin chào!)"
  },
  {
    "stt": 111,
    "hanzi": "我",
    "pinyin": "wǒ",
    "type": "đại từ",
    "meaning": "tôi, tao, tớ (ngôi thứ nhất)",
    "example": "我是中国人。(Wǒ shì Zhōngguó rén - Tôi là người Trung Quốc.)"
  },
  {
    "stt": 112,
    "hanzi": "我们",
    "pinyin": "wǒmen",
    "type": "đại từ",
    "meaning": "chúng tôi, chúng ta",
    "example": "我们去吃饭。(Wǒmen qù chīfàn - Chúng ta đi ăn cơm nhé.)"
  },
  {
    "stt": 113,
    "hanzi": "五",
    "pinyin": "wǔ",
    "type": "số từ",
    "meaning": "số 5",
    "example": "五月。(Wǔ yuè - Tháng năm.)"
  },
  {
    "stt": 114,
    "hanzi": "喜欢",
    "pinyin": "xǐhuan",
    "type": "động từ",
    "meaning": "thích, ưa chuộng",
    "example": "我喜欢学中文。(Wǒ xǐhuan xué zhōngwén - Tôi thích học tiếng Trung.)"
  },
  {
    "stt": 115,
    "hanzi": "下",
    "pinyin": "xià",
    "type": "danh từ / động từ",
    "meaning": "dưới, xuống (xe), tan (học)",
    "example": "下车。(Xià chē - Xuống xe.) | 下课 (Tan học)"
  },
  {
    "stt": 116,
    "hanzi": "下午",
    "pinyin": "xiàwǔ",
    "type": "danh từ thời gian",
    "meaning": "buổi chiều",
    "example": "下午三点。(Xiàwǔ sān diǎn - 3 giờ chiều.)"
  },
  {
    "stt": 117,
    "hanzi": "下雨",
    "pinyin": "xiàyǔ",
    "type": "cụm động từ",
    "meaning": "mưa, trời mưa",
    "example": "外面下雨了。(Wàimiàn xiàyǔ le - Bên ngoài trời mưa rồi.)"
  },
  {
    "stt": 118,
    "hanzi": "先生",
    "pinyin": "xiānsheng",
    "type": "danh từ",
    "meaning": "ông, ngài, tiên sinh, chồng",
    "example": "王先生。(Wáng xiānsheng - Ông Vương.)"
  },
  {
    "stt": 119,
    "hanzi": "现在",
    "pinyin": "xiànzài",
    "type": "danh từ thời gian",
    "meaning": "bây giờ, hiện tại",
    "example": "现在几点？(Xiànzài jǐ diǎn? - Bây giờ là mấy giờ?)"
  },
  {
    "stt": 120,
    "hanzi": "想",
    "pinyin": "xiǎng",
    "type": "trợ động từ / động từ",
    "meaning": "muốn, nhớ, suy nghĩ",
    "example": "我想去中国。(Wǒ xiǎng qù Zhōngguó - Tôi muốn đi Trung Quốc.)"
  },
  {
    "stt": 121,
    "hanzi": "小",
    "pinyin": "xiǎo",
    "type": "tính từ",
    "meaning": "nhỏ, bé",
    "example": "这个狗很小。(Zhè ge gǒu hěn xiǎo - Con chó này rất nhỏ.)"
  },
  {
    "stt": 122,
    "hanzi": "小姐",
    "pinyin": "xiǎojiě",
    "type": "danh từ",
    "meaning": "cô gái, tiểu thư",
    "example": "李小姐。(Lǐ xiǎojiě - Cô Lý.)"
  },
  {
    "stt": 123,
    "hanzi": "些",
    "pinyin": "xiē",
    "type": "lượng từ",
    "meaning": "một vài, một số (yìxiē)",
    "example": "这些东西。(Zhèxiē dōngxi - Những thứ này.)"
  },
  {
    "stt": 124,
    "hanzi": "写",
    "pinyin": "xiě",
    "type": "động từ",
    "meaning": "viết",
    "example": "写汉字。(Xiě hànzì - Viết chữ Hán.)"
  },
  {
    "stt": 125,
    "hanzi": "谢谢",
    "pinyin": "xièxie",
    "type": "động từ",
    "meaning": "cảm ơn",
    "example": "谢谢你！(Xièxie nǐ! - Cảm ơn bạn!)"
  },
  {
    "stt": 126,
    "hanzi": "星期",
    "pinyin": "xīngqī",
    "type": "danh từ",
    "meaning": "tuần, thứ",
    "example": "星期天。(Xīngqītiān - Chủ nhật.)"
  },
  {
    "stt": 127,
    "hanzi": "学生",
    "pinyin": "xuésheng",
    "type": "danh từ",
    "meaning": "học sinh, sinh viên",
    "example": "他是大学生。(Tā shì dàxuésheng - Anh ấy là sinh viên đại học.)"
  },
  {
    "stt": 128,
    "hanzi": "学习",
    "pinyin": "xuéxí",
    "type": "động từ / danh từ",
    "meaning": "học tập, học",
    "example": "努力学习。(Nǔlì xuéxí - Chăm chỉ học tập.)"
  },
  {
    "stt": 129,
    "hanzi": "学校",
    "pinyin": "xuéxiào",
    "type": "danh từ",
    "meaning": "trường học",
    "example": "我们在学校。(Wǒmen zài xuéxiào - Chúng tôi ở trường.)"
  },
  {
    "stt": 130,
    "hanzi": "一",
    "pinyin": "yī",
    "type": "số từ",
    "meaning": "số 1",
    "example": "一个。(Yí ge - Một cái.)"
  },
  {
    "stt": 131,
    "hanzi": "一点儿",
    "pinyin": "yìdiǎnr",
    "type": "cụm số lượng",
    "meaning": "một chút, một ít",
    "example": "吃一点儿水果。(Chī yìdiǎnr shuǐguǒ - Ăn một chút hoa quả.)"
  },
  {
    "stt": 132,
    "hanzi": "衣服",
    "pinyin": "yīfu",
    "type": "danh từ",
    "meaning": "quần áo, y phục",
    "example": "穿衣服。(Chuān yīfu - Mặc quần áo.)"
  },
  {
    "stt": 133,
    "hanzi": "医生",
    "pinyin": "yīshēng",
    "type": "danh từ",
    "meaning": "bác sĩ, thầy thuốc",
    "example": "他在医院当医生。(Tā zài yīyuàn dāng yīshēng - Anh ấy làm bác sĩ ở bệnh viện.)"
  },
  {
    "stt": 134,
    "hanzi": "医院",
    "pinyin": "yīyuàn",
    "type": "danh từ",
    "meaning": "bệnh viện",
    "example": "去医院。(Qù yīyuàn - Đến bệnh viện.)"
  },
  {
    "stt": 135,
    "hanzi": "椅子",
    "pinyin": "yǐzi",
    "type": "danh từ",
    "meaning": "cái ghế",
    "example": "坐椅子。(Zuò yǐzi - Ngồi ghế.)"
  },
  {
    "stt": 136,
    "hanzi": "有",
    "pinyin": "yǒu",
    "type": "động từ",
    "meaning": "có, tồn tại",
    "example": "我有一本书。(Wǒ yǒu yì běn shū - Tôi có một cuốn sách.)"
  },
  {
    "stt": 137,
    "hanzi": "月",
    "pinyin": "yuè",
    "type": "danh từ",
    "meaning": "tháng, mặt trăng",
    "example": "八月。(Bā yuè - Tháng tám.)"
  },
  {
    "stt": 138,
    "hanzi": "再见",
    "pinyin": "zàijiàn",
    "type": "cụm từ",
    "meaning": "tạm biệt, hẹn gặp lại",
    "example": "老师，再见！(Lǎoshī, zàijiàn! - Tạm biệt cô giáo!)"
  },
  {
    "stt": 139,
    "hanzi": "在",
    "pinyin": "zài",
    "type": "giới từ / động từ",
    "meaning": "ở, tại, đang (tiếp diễn)",
    "example": "他在家。(Tā zài jiā - Anh ấy ở nhà.) | 他在看书 (Anh ấy đang đọc sách)"
  },
  {
    "stt": 140,
    "hanzi": "怎么",
    "pinyin": "zěnme",
    "type": "đại từ",
    "meaning": "sao, thế nào, làm sao",
    "example": "这个字怎么读？(Zhè ge zì zěnme dú? - Chữ này đọc thế nào?)"
  },
  {
    "stt": 141,
    "hanzi": "怎么样",
    "pinyin": "zěnmeyàng",
    "type": "đại từ",
    "meaning": "như thế nào, ra sao",
    "example": "今天天气怎么样？(Jīntiān tiānqì zěnmeyàng? - Thời tiết hôm nay thế nào?)"
  },
  {
    "stt": 142,
    "hanzi": "这",
    "pinyin": "zhè",
    "type": "đại từ",
    "meaning": "đây, này",
    "example": "这是我的猫。(Zhè shì wǒ de māo - Đây là mèo của tôi.)"
  },
  {
    "stt": 143,
    "hanzi": "这儿",
    "pinyin": "zhèr",
    "type": "đại từ",
    "meaning": "ở đây, chỗ này",
    "example": "你来这儿。(Nǐ lái zhèr - Bạn đến đây đi.)"
  },
  {
    "stt": 144,
    "hanzi": "中国",
    "pinyin": "Zhōngguó",
    "type": "danh từ riêng",
    "meaning": "Trung Quốc",
    "example": "我去中国。(Wǒ qù Zhōngguó - Tôi đi Trung Quốc.)"
  },
  {
    "stt": 145,
    "hanzi": "中午",
    "pinyin": "zhōngwǔ",
    "type": "danh từ thời gian",
    "meaning": "buổi trưa",
    "example": "中午十二点。(Zhōngwǔ shí'èr diǎn - 12 giờ trưa.)"
  },
  {
    "stt": 146,
    "hanzi": "住",
    "pinyin": "zhù",
    "type": "động từ",
    "meaning": "ở, cư trú, sinh sống",
    "example": "他住在北京。(Tā zhù zài Běijīng - Anh ấy sống ở Bắc Kinh.)"
  },
  {
    "stt": 147,
    "hanzi": "桌子",
    "pinyin": "zhuōzi",
    "type": "danh từ",
    "meaning": "cái bàn",
    "example": "桌子上有水。(Zhuōzi shang yǒu shuǐ - Trên bàn có nước.)"
  },
  {
    "stt": 148,
    "hanzi": "字",
    "pinyin": "zì",
    "type": "danh từ",
    "meaning": "chữ, chữ Hán",
    "example": "写汉字。(Xiě hànzì - Viết chữ Hán.)"
  },
  {
    "stt": 149,
    "hanzi": "昨天",
    "pinyin": "zuótiān",
    "type": "danh từ thời gian",
    "meaning": "hôm qua",
    "example": "昨天星期日。(Zuótiān xīngqīrì - Hôm qua là chủ nhật.)"
  },
  {
    "stt": 150,
    "hanzi": "坐",
    "pinyin": "zuò",
    "type": "động từ",
    "meaning": "ngồi, đi (tàu/xe)",
    "example": "请坐。(Qǐng zuò - Mời ngồi.) | 坐飞机 (Đi máy bay)"
  },
  {
    "stt": 151,
    "hanzi": "做",
    "pinyin": "zuò",
    "type": "động từ",
    "meaning": "làm, chế tạo",
    "example": "你在做什么？(Nǐ zài zuò shénme? - Bạn đang làm gì thế?)"
  }
];

  var HSK1_GRAMMAR = [
  {
    "category": "1. Đại từ & Các dạng câu nghi vấn HSK 1",
    "items": [
      {
        "name": "Câu hỏi với '吗' (Hỏi Đúng/Sai)",
        "structure": "Câu trần thuật + 吗?",
        "example": "你是中国人吗？",
        "pinyin": "Nǐ shì Zhōngguó rén ma?",
        "meaning": "Bạn là người Trung Quốc phải không?",
        "note": "'吗' đặt cuối câu trần thuật để biến câu thành câu hỏi Yes/No."
      },
      {
        "name": "Câu hỏi với '呢' (Còn... thì sao?)",
        "structure": "Danh từ / Đại từ + 呢?",
        "example": "我很好，你呢？",
        "pinyin": "Wǒ hěn hǎo, nǐ ne?",
        "meaning": "Tôi rất khỏe, còn bạn thì sao?",
        "note": "Dùng để hỏi tiếp về một chủ đề đã được nhắc đến ở câu trước."
      },
      {
        "name": "Hỏi người bằng '谁' (Ai)",
        "structure": "Chủ ngữ + 是 + 谁? / 谁 + V?",
        "example": "他是谁？",
        "pinyin": "Tā shì shéi?",
        "meaning": "Anh ấy là ai?",
        "note": "'谁' thay thế trực tiếp vào vị trí của người cần hỏi."
      },
      {
        "name": "Hỏi đồ vật / sự việc bằng '什么' (Cái gì)",
        "structure": "Chủ ngữ + V + 什么 (+ Danh từ)?",
        "example": "你叫什么名字？",
        "pinyin": "Nǐ jiào shénme míngzi?",
        "meaning": "Bạn tên là gì?",
        "note": "Có thể đứng độc lập hoặc bổ nghĩa cho danh từ phía sau (什么书, 什么菜)."
      },
      {
        "name": "Hỏi nơi chốn bằng '哪儿' (Ở đâu)",
        "structure": "Chủ ngữ + 在 + 哪儿? / Chủ ngữ + 去 + 哪儿?",
        "example": "你在哪儿工作？",
        "pinyin": "Nǐ zài nǎr gōngzuò?",
        "meaning": "Bạn làm việc ở đâu?",
        "note": "'哪儿' thay thế cho vị trí nơi chốn, địa điểm."
      },
      {
        "name": "Hỏi số lượng bằng '几' và '多少'",
        "structure": "几 + Lượng từ + N (< 10) | 多少 + N (> 10)",
        "example": "你家有几口人？这个多少钱？",
        "pinyin": "Nǐ jiā yǒu jǐ kǒu rén? Zhè ge duōshao qián?",
        "meaning": "Nhà bạn có mấy người? Cái này bao nhiêu tiền?",
        "note": "'几' bắt buộc có lượng từ đi kèm và thường dùng cho số lượng nhỏ hơn 10. '多少' không bắt buộc có lượng từ."
      },
      {
        "name": "Hỏi cách thức bằng '怎么' (Làm thế nào)",
        "structure": "怎么 + Động từ?",
        "example": "这个字怎么读？",
        "pinyin": "Zhè ge zì zěnme dú?",
        "meaning": "Chữ này đọc thế nào?",
        "note": "Dùng hỏi phương thức thực hiện hành động."
      },
      {
        "name": "Hỏi tính chất / tình hình bằng '怎么样' (Như thế nào)",
        "structure": "Chủ ngữ + 怎么样?",
        "example": "今天天气怎么样？",
        "pinyin": "Jīntiān tiānqì zěnmeyàng?",
        "meaning": "Thời tiết hôm nay như thế nào?",
        "note": "Dùng để hỏi thăm ý kiến, tình trạng hoặc tính chất."
      }
    ]
  },
  {
    "category": "2. Số từ, Lượng từ & Biểu đạt thời gian",
    "items": [
      {
        "name": "Lượng từ phổ biến '个'",
        "structure": "Số từ + 个 + Danh từ",
        "example": "一个人，三个苹果。",
        "pinyin": "Yí ge rén, sān ge píngguǒ.",
        "meaning": "Một người, ba quả táo.",
        "note": "'个' là lượng từ thông dụng nhất trong tiếng Trung."
      },
      {
        "name": "Lượng từ sách báo '本'",
        "structure": "Số từ + 本 + 书 / 词典",
        "example": "我有两本书。",
        "pinyin": "Wǒ yǒu liǎng běn shū.",
        "meaning": "Tôi có hai cuốn sách.",
        "note": "Dùng '两' (liǎng) trước lượng từ thay cho '二' (èr)."
      },
      {
        "name": "Biểu đạt tuổi tác với '岁'",
        "structure": "Chủ ngữ + Số từ + 岁",
        "example": "我儿子今年五岁。",
        "pinyin": "Wǒ érzi jīnnián wǔ suì.",
        "meaning": "Con trai tôi năm nay 5 tuổi.",
        "note": "Không cần dùng động từ '是' trước số tuổi."
      },
      {
        "name": "Biểu đạt Ngày - Tháng - Năm",
        "structure": "Năm + 年 + Tháng + 月 + Ngày + 日 (号)",
        "example": "今天是一月一日。",
        "pinyin": "Jīntiān shì yī yuè yī rì.",
        "meaning": "Hôm nay là ngày 1 tháng 1.",
        "note": "Quy tắc thời gian tiếng Trung: Từ đơn vị lớn đến đơn vị nhỏ (Năm -> Tháng -> Ngày)."
      },
      {
        "name": "Biểu đạt các ngày trong tuần",
        "structure": "星期 + Số từ (1 - 6) / 星期天 (星期日)",
        "example": "今天星期三，明天星期四。",
        "pinyin": "Jīntiān xīngqīsān, míngtiān xīngqīsì.",
        "meaning": "Hôm nay là thứ 4, ngày mai là thứ 5.",
        "note": "星期一 (Thứ 2), 星期二 (Thứ 3)... 星期天 (Chủ nhật)."
      },
      {
        "name": "Biểu đạt Giờ và Phút",
        "structure": "Số giờ + 点 + (Số phút + 分)",
        "example": "现在十点三十分。",
        "pinyin": "Xiànzài shí diǎn sānshí fēn.",
        "meaning": "Bây giờ là 10 giờ 30 phút.",
        "note": "Buổi sáng: 上午 (shàngwǔ), Buổi trưa: 中午 (zhōngwǔ), Buổi chiều: 下午 (xiàwǔ)."
      }
    ]
  },
  {
    "category": "3. Trạng từ & Tính từ cơ bản HSK 1",
    "items": [
      {
        "name": "Phủ định với '不' (Không)",
        "structure": "不 + Động từ / Tính từ",
        "example": "他不是中国人。今天不冷。",
        "pinyin": "Tā bú shì Zhōngguó rén. Jīntiān bù lěng.",
        "meaning": "Anh ấy không phải người Trung Quốc. Hôm nay không lạnh.",
        "note": "Dùng phủ định thói quen, hiện tại hoặc tương lai. Khi đứng trước thanh 4, '不' đọc thành 'bú'."
      },
      {
        "name": "Phủ định với '没 / 没有' (Chưa, Không có)",
        "structure": "没(有) + Động từ / Danh từ",
        "example": "我没有苹果。他没去学校。",
        "pinyin": "Wǒ méiyǒu píngguǒ. Tā méi qù xuéxiào.",
        "meaning": "Tôi không có táo. Anh ấy chưa đến trường.",
        "note": "Tuyệt đối không nói '不有', chỉ được nói '没有'."
      },
      {
        "name": "Phó từ chỉ mức độ '很' (Rất)",
        "structure": "Chủ ngữ + 很 + Tính từ",
        "example": "她很高兴，苹果很大。",
        "pinyin": "Tā hěn gāoxìng, píngguǒ hěn dà.",
        "meaning": "Cô ấy rất vui, quả táo rất to.",
        "note": "Trong câu vị ngữ tính từ, bắt buộc dùng '很' làm liên kết, không dùng '是'."
      },
      {
        "name": "Cấu trúc cảm thán '太...了' (Quá, lắm)",
        "structure": "太 + Tính từ + 了",
        "example": "太好了！这个菜太好吃了！",
        "pinyin": "Tài hǎo le! Zhè ge cài tài hǎochī le!",
        "meaning": "Tốt quá rồi! Món ăn này ngon quá!",
        "note": "Dùng biểu thị cảm thán hoặc mức độ vượt quá mong đợi."
      },
      {
        "name": "Phó từ phạm vi '都' (Đều)",
        "structure": "Chủ ngữ số nhiều + 都 + V / Adj",
        "example": "我们都是学生。",
        "pinyin": "Wǒmen dōu shì xuésheng.",
        "meaning": "Chúng tôi đều là học sinh.",
        "note": "'都' luôn đứng sau chủ ngữ số nhiều và đứng trước động từ/tính từ."
      }
    ]
  },
  {
    "category": "4. Động từ cốt lõi & Cấu trúc câu HSK 1",
    "items": [
      {
        "name": "Câu chữ '是' (Khẳng định bản chất)",
        "structure": "A + 是 + B (Phủ định: A + 不是 + B)",
        "example": "我是学生，他是老师。",
        "pinyin": "Wǒ shì xuésheng, tā shì lǎoshī.",
        "meaning": "Tôi là học sinh, anh ấy là giáo viên.",
        "note": "Tương đương động từ to-be 'am/is/are' trong tiếng Anh."
      },
      {
        "name": "Câu chữ '有' (Sở hữu & Tồn tại)",
        "structure": "Chủ ngữ + 有 + Tân ngữ (Phủ định: 没有)",
        "example": "我有一个猫。桌子上有书。",
        "pinyin": "Wǒ yǒu yí ge māo. Zhuōzi shang yǒu shū.",
        "meaning": "Tôi có một con mèo. Trên bàn có sách.",
        "note": "Biểu thị ai đó sở hữu đồ vật, hoặc ở địa điểm nào đó có tồn tại đồ vật."
      },
      {
        "name": "Câu chữ '在' (Địa điểm & Đang tiếp diễn)",
        "structure": "Chủ ngữ + 在 + Nơi chốn (+ V) / Chủ ngữ + 在 + V",
        "example": "我在学校学习。他在看电视呢。",
        "pinyin": "Wǒ zài xuéxiào xuéxí. Tā zài kàn diànshì ne.",
        "meaning": "Tôi học tập ở trường. Anh ấy đang xem tivi.",
        "note": "Vừa là động từ chỉ vị trí, vừa là phó từ chỉ hành động đang diễn ra."
      },
      {
        "name": "Động từ xu hướng '去' và '来'",
        "structure": "去 / 来 + Địa điểm (+ Làm gì)",
        "example": "我去北京看朋友。",
        "pinyin": "Wǒ qù Běijīng kàn péngyou.",
        "meaning": "Tôi đi Bắc Kinh thăm bạn bè.",
        "note": "'来' là hướng về phía người nói, '去' là rời xa phía người nói."
      },
      {
        "name": "Câu liên động (Hai hành động liên tiếp)",
        "structure": "Chủ ngữ + V1 (địa điểm) + V2 (mục đích)",
        "example": "我去商店买东西。",
        "pinyin": "Wǒ qù shāngdiàn mǎi dōngxi.",
        "meaning": "Tôi đến cửa hàng mua đồ.",
        "note": "Hành động 1 chỉ phương thức/nơi chốn, hành động 2 chỉ mục đích."
      }
    ]
  },
  {
    "category": "5. Trợ động từ năng nguyện (会, 想, 能)",
    "items": [
      {
        "name": "Biểu thị kỹ năng qua học tập với '会'",
        "structure": "Chủ ngữ + 会 + Động từ (Phủ định: 不会)",
        "example": "我会说汉语，他会开车。",
        "pinyin": "Wǒ huì shuō hànyǔ, tā huì kāi chē.",
        "meaning": "Tôi biết nói tiếng Trung, anh ấy biết lái xe.",
        "note": "'会' biểu thị khả năng đạt được qua quá trình rèn luyện, học hỏi."
      },
      {
        "name": "Biểu thị nguyện vọng, mong muốn với '想'",
        "structure": "Chủ ngữ + 想 + Động từ (Phủ định: 不想)",
        "example": "我想喝茶，我想去中国。",
        "pinyin": "Wǒ xiǎng hē chá, wǒ xiǎng qù Zhōngguó.",
        "meaning": "Tôi muốn uống trà, tôi muốn đi Trung Quốc.",
        "note": "'想' còn mang nghĩa nhớ nhung (我想妈妈 - Tôi nhớ mẹ)."
      },
      {
        "name": "Biểu thị điều kiện cho phép với '能'",
        "structure": "Chủ ngữ + 能 + Động từ (Phủ định: 不能)",
        "example": "我明天能去学校。",
        "pinyin": "Wǒ míngtiān néng qù xuéxiào.",
        "meaning": "Ngày mai tôi có thể đến trường.",
        "note": "'能' biểu thị điều kiện khách quan hoặc sức khỏe cho phép."
      }
    ]
  },
  {
    "category": "6. Trợ từ quan trọng HSK 1 (的, 了, 吧, 啊)",
    "items": [
      {
        "name": "Trợ từ sở hữu và định ngữ '的'",
        "structure": "Định ngữ + 的 + Danh từ trung tâm",
        "example": "我的书，漂亮的衣服。",
        "pinyin": "Wǒ de shū, piàoliang de yīfu.",
        "meaning": "Sách của tôi, quần áo đẹp.",
        "note": "Khi mối quan hệ thân mật (gia đình, bạn bè) có thể lược bỏ '的' (我爸爸, 我朋友)."
      },
      {
        "name": "Trợ từ động thái hoàn thành '了'",
        "structure": "Chủ ngữ + Động từ + 了 (+ Tân ngữ)",
        "example": "我吃了一个苹果。",
        "pinyin": "Wǒ chīle yí ge píngguǒ.",
        "meaning": "Tôi đã ăn một quả táo.",
        "note": "Đặt ngay sau động từ để biểu thị hành động đã hoàn tất."
      },
      {
        "name": "Trợ từ ngữ khí '吧' (Đề nghị, gợi ý)",
        "structure": "Câu đề xuất + 吧!",
        "example": "我们走吧！",
        "pinyin": "Wǒmen zǒu ba!",
        "meaning": "Chúng ta đi thôi!",
        "note": "Làm cho câu mệnh lệnh, đề nghị trở nên mềm mỏng, lịch sự."
      }
    ]
  }
];

  var HSK2_VOCABULARY = [
  {
    "stt": 1,
    "hanzi": "啊",
    "pinyin": "a",
    "type": "trợ từ",
    "meaning": "à, này, nhé (trợ từ ngữ khí)"
  },
  {
    "stt": 2,
    "hanzi": "爱情",
    "pinyin": "àiqíng",
    "type": "danh từ",
    "meaning": "tình yêu"
  },
  {
    "stt": 3,
    "hanzi": "爱人",
    "pinyin": "àiren",
    "type": "danh từ",
    "meaning": "người yêu, vợ hoặc chồng"
  },
  {
    "stt": 4,
    "hanzi": "安静",
    "pinyin": "ānjìng",
    "type": "tính từ / động từ",
    "meaning": "yên tĩnh, yên lặng | im lặng lại, yên ổn lại"
  },
  {
    "stt": 5,
    "hanzi": "安全",
    "pinyin": "ānquán",
    "type": "tính từ / danh từ",
    "meaning": "an toàn | sự an toàn"
  },
  {
    "stt": 6,
    "hanzi": "白色",
    "pinyin": "Báisè",
    "type": "danh từ",
    "meaning": "màu trắng"
  },
  {
    "stt": 7,
    "hanzi": "班长",
    "pinyin": "bānzhǎng",
    "type": "danh từ",
    "meaning": "lớp trưởng"
  },
  {
    "stt": 8,
    "hanzi": "办",
    "pinyin": "bàn",
    "type": "động từ",
    "meaning": "làm, xử lý"
  },
  {
    "stt": 9,
    "hanzi": "办法",
    "pinyin": "bànfǎ",
    "type": "danh từ",
    "meaning": "biện pháp, cách làm"
  },
  {
    "stt": 10,
    "hanzi": "办公室",
    "pinyin": "bàngōngshì",
    "type": "danh từ",
    "meaning": "văn phòng"
  },
  {
    "stt": 11,
    "hanzi": "半夜",
    "pinyin": "Bànyè",
    "type": "danh từ",
    "meaning": "nửa đêm"
  },
  {
    "stt": 12,
    "hanzi": "帮助",
    "pinyin": "bāngzhù",
    "type": "động từ",
    "meaning": "giúp đỡ"
  },
  {
    "stt": 13,
    "hanzi": "饱",
    "pinyin": "bǎo",
    "type": "tính từ",
    "meaning": "no"
  },
  {
    "stt": 14,
    "hanzi": "报名",
    "pinyin": "bàomíng",
    "type": "từ vựng",
    "meaning": "đăng ký"
  },
  {
    "stt": 15,
    "hanzi": "报纸",
    "pinyin": "bàozhǐ",
    "type": "danh từ",
    "meaning": "báo giấy"
  },
  {
    "stt": 16,
    "hanzi": "北方",
    "pinyin": "běifāng",
    "type": "danh từ",
    "meaning": "miền Bắc"
  },
  {
    "stt": 17,
    "hanzi": "背",
    "pinyin": "bèi",
    "type": "động từ",
    "meaning": "ghi nhớ, học thuộc / cõng"
  },
  {
    "stt": 18,
    "hanzi": "比如",
    "pinyin": "bǐrú",
    "type": "động từ",
    "meaning": "ví dụ"
  },
  {
    "stt": 19,
    "hanzi": "比如说",
    "pinyin": "bǐrú shuō",
    "type": "từ vựng",
    "meaning": "ví dụ như"
  },
  {
    "stt": 20,
    "hanzi": "笔",
    "pinyin": "bǐ",
    "type": "danh từ / lượng từ",
    "meaning": "cái bút | khoản, món"
  },
  {
    "stt": 21,
    "hanzi": "笔记",
    "pinyin": "bǐjì",
    "type": "danh từ",
    "meaning": "ghi chép"
  },
  {
    "stt": 22,
    "hanzi": "笔记本",
    "pinyin": "bǐjìběn",
    "type": "danh từ",
    "meaning": "sổ ghi chép"
  },
  {
    "stt": 23,
    "hanzi": "必须",
    "pinyin": "bìxū",
    "type": "phó từ",
    "meaning": "phải, bắt buộc"
  },
  {
    "stt": 24,
    "hanzi": "边",
    "pinyin": "biān",
    "type": "danh từ",
    "meaning": "bên, cạnh"
  },
  {
    "stt": 25,
    "hanzi": "变",
    "pinyin": "biàn",
    "type": "động từ",
    "meaning": "thay đổi"
  },
  {
    "stt": 26,
    "hanzi": "变成",
    "pinyin": "biànchéng",
    "type": "lượng từ",
    "meaning": "trở thành"
  },
  {
    "stt": 27,
    "hanzi": "遍",
    "pinyin": "biàn",
    "type": "lượng từ",
    "meaning": "lần (từ chỉ số lần)"
  },
  {
    "stt": 28,
    "hanzi": "表",
    "pinyin": "biǎo",
    "type": "danh từ",
    "meaning": "đồng hồ / bảng biểu"
  },
  {
    "stt": 29,
    "hanzi": "表示",
    "pinyin": "biǎoshì",
    "type": "danh từ / động từ",
    "meaning": "dấu hiệu, biểu hiện | biểu thị, thể hiện, bày tỏ"
  },
  {
    "stt": 30,
    "hanzi": "不错",
    "pinyin": "búcuò",
    "type": "tính từ",
    "meaning": "không tệ, khá tốt"
  },
  {
    "stt": 31,
    "hanzi": "不但",
    "pinyin": "búdàn",
    "type": "liên từ",
    "meaning": "không những"
  },
  {
    "stt": 32,
    "hanzi": "不够",
    "pinyin": "búgòu",
    "type": "động từ / phó từ",
    "meaning": "không đủ, thiếu | chưa đủ, chưa đạt mức"
  },
  {
    "stt": 33,
    "hanzi": "不过",
    "pinyin": "búguò",
    "type": "liên từ",
    "meaning": "nhưng, tuy nhiên"
  },
  {
    "stt": 34,
    "hanzi": "不太",
    "pinyin": "bú tài",
    "type": "từ vựng",
    "meaning": "không… lắm"
  },
  {
    "stt": 35,
    "hanzi": "不要",
    "pinyin": "búyào",
    "type": "phó từ",
    "meaning": "đừng, không được"
  },
  {
    "stt": 36,
    "hanzi": "不好意思",
    "pinyin": "bù hǎoyìsi",
    "type": "tính từ",
    "meaning": "ngại, xin lỗi"
  },
  {
    "stt": 37,
    "hanzi": "不久",
    "pinyin": "bùjiǔ",
    "type": "tính từ",
    "meaning": "không lâu, chẳng bao lâu"
  },
  {
    "stt": 38,
    "hanzi": "不满",
    "pinyin": "bùmǎn",
    "type": "tính từ",
    "meaning": "bất mãn, không hài lòng"
  },
  {
    "stt": 39,
    "hanzi": "不如",
    "pinyin": "bùrú",
    "type": "động từ",
    "meaning": "không bằng"
  },
  {
    "stt": 40,
    "hanzi": "不少",
    "pinyin": "bù shǎo",
    "type": "từ vựng",
    "meaning": "không ít"
  },
  {
    "stt": 41,
    "hanzi": "不同",
    "pinyin": "bù tóng",
    "type": "từ vựng",
    "meaning": "khác nhau"
  },
  {
    "stt": 42,
    "hanzi": "不行",
    "pinyin": "bùxíng",
    "type": "động từ / tính từ",
    "meaning": "không được, không cho phép | không tốt, không đạt yêu cầu"
  },
  {
    "stt": 43,
    "hanzi": "不一定",
    "pinyin": "bùyídìng",
    "type": "phó từ",
    "meaning": "chưa chắc, không nhất định"
  },
  {
    "stt": 44,
    "hanzi": "不一会儿",
    "pinyin": "bù yíhuìr",
    "type": "từ vựng",
    "meaning": "chẳng bao lâu"
  },
  {
    "stt": 45,
    "hanzi": "部分",
    "pinyin": "bùfen",
    "type": "danh từ",
    "meaning": "bộ phận, phần"
  },
  {
    "stt": 46,
    "hanzi": "才",
    "pinyin": "cái",
    "type": "phó từ",
    "meaning": "mới, vừa"
  },
  {
    "stt": 47,
    "hanzi": "菜单",
    "pinyin": "càidān",
    "type": "danh từ",
    "meaning": "thực đơn"
  },
  {
    "stt": 48,
    "hanzi": "参观",
    "pinyin": "cānguān",
    "type": "động từ",
    "meaning": "tham quan"
  },
  {
    "stt": 49,
    "hanzi": "参加",
    "pinyin": "cānjiā",
    "type": "động từ",
    "meaning": "tham gia"
  },
  {
    "stt": 50,
    "hanzi": "草",
    "pinyin": "cǎo",
    "type": "danh từ",
    "meaning": "cỏ"
  },
  {
    "stt": 51,
    "hanzi": "草地",
    "pinyin": "cǎodì",
    "type": "danh từ",
    "meaning": "bãi cỏ"
  },
  {
    "stt": 52,
    "hanzi": "层",
    "pinyin": "céng",
    "type": "lượng từ",
    "meaning": "tầng, lớp"
  },
  {
    "stt": 53,
    "hanzi": "查",
    "pinyin": "chá",
    "type": "động từ",
    "meaning": "tra, kiểm tra"
  },
  {
    "stt": 54,
    "hanzi": "差不多",
    "pinyin": "chàbuduō",
    "type": "tính từ / phó từ",
    "meaning": "gần như giống nhau, xấp xỉ | gần như, hầu như, suýt"
  },
  {
    "stt": 55,
    "hanzi": "长",
    "pinyin": "cháng",
    "type": "tính từ",
    "meaning": "dài (chiều dài) / lâu (thời gian)"
  },
  {
    "stt": 56,
    "hanzi": "常见",
    "pinyin": "cháng jiàn",
    "type": "từ vựng",
    "meaning": "thường gặp"
  },
  {
    "stt": 57,
    "hanzi": "常用",
    "pinyin": "cháng yòng",
    "type": "từ vựng",
    "meaning": "thường dùng"
  },
  {
    "stt": 58,
    "hanzi": "场",
    "pinyin": "chǎng",
    "type": "lượng từ",
    "meaning": "trận, cuộc"
  },
  {
    "stt": 59,
    "hanzi": "超过",
    "pinyin": "chāoguò",
    "type": "động từ",
    "meaning": "vượt quá"
  },
  {
    "stt": 60,
    "hanzi": "超市",
    "pinyin": "chāoshì",
    "type": "danh từ",
    "meaning": "siêu thị"
  },
  {
    "stt": 61,
    "hanzi": "车辆",
    "pinyin": "chēliàng",
    "type": "danh từ",
    "meaning": "xe cộ"
  },
  {
    "stt": 62,
    "hanzi": "称（称一称） chēng",
    "pinyin": "động từ",
    "type": "từ vựng",
    "meaning": "cân / gọi là"
  },
  {
    "stt": 63,
    "hanzi": "成",
    "pinyin": "chéng",
    "type": "động từ",
    "meaning": "trở thành / thành công"
  },
  {
    "stt": 64,
    "hanzi": "成绩",
    "pinyin": "chéngjì",
    "type": "danh từ",
    "meaning": "thành tích, điểm số"
  },
  {
    "stt": 65,
    "hanzi": "成为",
    "pinyin": "chéngwéi",
    "type": "động từ",
    "meaning": "trở thành"
  },
  {
    "stt": 66,
    "hanzi": "重复",
    "pinyin": "chóngfù",
    "type": "động từ",
    "meaning": "lặp lại"
  },
  {
    "stt": 67,
    "hanzi": "重新",
    "pinyin": "chóngxīn",
    "type": "phó từ",
    "meaning": "làm lại từ đầu"
  },
  {
    "stt": 68,
    "hanzi": "出发",
    "pinyin": "Chūfā",
    "type": "động từ",
    "meaning": "xuất phát"
  },
  {
    "stt": 69,
    "hanzi": "出国",
    "pinyin": "chūguó",
    "type": "từ vựng",
    "meaning": "ra nước ngoài"
  },
  {
    "stt": 70,
    "hanzi": "出口",
    "pinyin": "chūkǒu",
    "type": "danh từ",
    "meaning": "xuất khẩu"
  },
  {
    "stt": 71,
    "hanzi": "出门",
    "pinyin": "chūmén",
    "type": "từ vựng",
    "meaning": "ra ngoài"
  },
  {
    "stt": 72,
    "hanzi": "出生",
    "pinyin": "chūshēng",
    "type": "động từ",
    "meaning": "sinh ra"
  },
  {
    "stt": 73,
    "hanzi": "出现",
    "pinyin": "chūxiàn",
    "type": "động từ",
    "meaning": "xuất hiện"
  },
  {
    "stt": 74,
    "hanzi": "出院",
    "pinyin": "chūyuàn",
    "type": "từ vựng",
    "meaning": "xuất viện"
  },
  {
    "stt": 75,
    "hanzi": "出租",
    "pinyin": "Chūzū",
    "type": "động từ",
    "meaning": "cho thuê"
  },
  {
    "stt": 76,
    "hanzi": "出租车",
    "pinyin": "chūzūche",
    "type": "danh từ",
    "meaning": "taxi"
  },
  {
    "stt": 77,
    "hanzi": "船",
    "pinyin": "Chuán",
    "type": "danh từ",
    "meaning": "thuyền, tàu"
  },
  {
    "stt": 78,
    "hanzi": "吹",
    "pinyin": "Chuī",
    "type": "động từ",
    "meaning": "thổi"
  },
  {
    "stt": 79,
    "hanzi": "春节",
    "pinyin": "Chūnjié",
    "type": "danh từ",
    "meaning": "Tết Nguyên Đán"
  },
  {
    "stt": 80,
    "hanzi": "春天",
    "pinyin": "chūntiān",
    "type": "danh từ",
    "meaning": "mùa xuân"
  },
  {
    "stt": 81,
    "hanzi": "词",
    "pinyin": "Cí",
    "type": "danh từ",
    "meaning": "từ"
  },
  {
    "stt": 82,
    "hanzi": "词典",
    "pinyin": "Cídiǎn",
    "type": "danh từ",
    "meaning": "từ điển"
  },
  {
    "stt": 83,
    "hanzi": "词语",
    "pinyin": "Cíyǔ",
    "type": "danh từ",
    "meaning": "từ ngữ"
  },
  {
    "stt": 84,
    "hanzi": "从小",
    "pinyin": "cóngxiǎo",
    "type": "phó từ",
    "meaning": "từ nhỏ"
  },
  {
    "stt": 85,
    "hanzi": "答应",
    "pinyin": "dāyìng",
    "type": "động từ",
    "meaning": "đồng ý"
  },
  {
    "stt": 86,
    "hanzi": "打工",
    "pinyin": "dǎgōng",
    "type": "từ vựng",
    "meaning": "làm thuê, làm thêm"
  },
  {
    "stt": 87,
    "hanzi": "打算",
    "pinyin": "dǎsuàn",
    "type": "động từ",
    "meaning": "(động) dự định, tính làm gì đó"
  },
  {
    "stt": 88,
    "hanzi": "打印",
    "pinyin": "Dǎyìn",
    "type": "động từ",
    "meaning": "in"
  },
  {
    "stt": 89,
    "hanzi": "大部分",
    "pinyin": "dàbùfen",
    "type": "từ vựng",
    "meaning": "phần lớn"
  },
  {
    "stt": 90,
    "hanzi": "大大",
    "pinyin": "Dàdà",
    "type": "phó từ",
    "meaning": "rất, cực kỳ"
  },
  {
    "stt": 91,
    "hanzi": "大多数",
    "pinyin": "dàduōshù",
    "type": "danh từ",
    "meaning": "đa số"
  },
  {
    "stt": 92,
    "hanzi": "大海",
    "pinyin": "Dàhǎi",
    "type": "danh từ",
    "meaning": "biển lớn"
  },
  {
    "stt": 93,
    "hanzi": "大家",
    "pinyin": "Dàjiā",
    "type": "đại từ",
    "meaning": "mọi người"
  },
  {
    "stt": 94,
    "hanzi": "大量",
    "pinyin": "dàliàng",
    "type": "tính từ",
    "meaning": "số lượng lớn / rộng lượng"
  },
  {
    "stt": 95,
    "hanzi": "大门",
    "pinyin": "dàmén",
    "type": "danh từ",
    "meaning": "cổng lớn"
  },
  {
    "stt": 96,
    "hanzi": "大人",
    "pinyin": "dàrén",
    "type": "danh từ",
    "meaning": "người lớn"
  },
  {
    "stt": 97,
    "hanzi": "大声",
    "pinyin": "dàshēng",
    "type": "danh từ",
    "meaning": "tiếng to, lớn tiếng"
  },
  {
    "stt": 98,
    "hanzi": "大小",
    "pinyin": "dàxiǎo",
    "type": "danh từ",
    "meaning": "kích thước"
  },
  {
    "stt": 99,
    "hanzi": "大衣",
    "pinyin": "Dàyī",
    "type": "danh từ",
    "meaning": "áo khoác"
  },
  {
    "stt": 100,
    "hanzi": "大自然",
    "pinyin": "dàzìrán",
    "type": "danh từ",
    "meaning": "thiên nhiên"
  },
  {
    "stt": 101,
    "hanzi": "带",
    "pinyin": "Dài",
    "type": "động từ",
    "meaning": "mang, đem theo"
  },
  {
    "stt": 102,
    "hanzi": "带来",
    "pinyin": "dàilái",
    "type": "động từ",
    "meaning": "mang đến"
  },
  {
    "stt": 103,
    "hanzi": "单位",
    "pinyin": "Dānwèi",
    "type": "danh từ",
    "meaning": "đơn vị"
  },
  {
    "stt": 104,
    "hanzi": "但",
    "pinyin": "Dàn",
    "type": "liên từ",
    "meaning": "nhưng"
  },
  {
    "stt": 105,
    "hanzi": "但是",
    "pinyin": "dànshì",
    "type": "liên từ",
    "meaning": "nhưng, tuy nhiên"
  },
  {
    "stt": 106,
    "hanzi": "蛋",
    "pinyin": "Dàn",
    "type": "danh từ",
    "meaning": "trứng"
  },
  {
    "stt": 107,
    "hanzi": "当",
    "pinyin": "Dāng",
    "type": "động từ",
    "meaning": "(động) làm, đảm nhiệm, trở thành"
  },
  {
    "stt": 108,
    "hanzi": "当时",
    "pinyin": "dāngshí",
    "type": "danh từ",
    "meaning": "lúc đó"
  },
  {
    "stt": 109,
    "hanzi": "倒",
    "pinyin": "Dǎo",
    "type": "động từ",
    "meaning": "ngã, đổ"
  },
  {
    "stt": 110,
    "hanzi": "到处",
    "pinyin": "dàochù",
    "type": "phó từ",
    "meaning": "khắp nơi"
  },
  {
    "stt": 111,
    "hanzi": "倒",
    "pinyin": "Dào",
    "type": "động từ",
    "meaning": "rót / đảo ngược"
  },
  {
    "stt": 112,
    "hanzi": "道",
    "pinyin": "Dào",
    "type": "lượng từ",
    "meaning": "món (lượng từ của món ăn)"
  },
  {
    "stt": 113,
    "hanzi": "道理",
    "pinyin": "dàolǐ",
    "type": "danh từ",
    "meaning": "đạo lý, lý lẽ"
  },
  {
    "stt": 114,
    "hanzi": "道路",
    "pinyin": "Dàolù",
    "type": "danh từ",
    "meaning": "con đường"
  },
  {
    "stt": 115,
    "hanzi": "得",
    "pinyin": "de",
    "type": "động từ",
    "meaning": "được, đạt"
  },
  {
    "stt": 116,
    "hanzi": "得出",
    "pinyin": "déchū",
    "type": "động từ",
    "meaning": "rút ra (kết luận)"
  },
  {
    "stt": 117,
    "hanzi": "的话",
    "pinyin": "Dehuà",
    "type": "trợ từ",
    "meaning": "nếu…"
  },
  {
    "stt": 118,
    "hanzi": "得",
    "pinyin": "dé",
    "type": "trợ từ",
    "meaning": "được (trợ từ kết cấu)"
  },
  {
    "stt": 119,
    "hanzi": "灯",
    "pinyin": "dēng",
    "type": "danh từ",
    "meaning": "đèn"
  },
  {
    "stt": 120,
    "hanzi": "等",
    "pinyin": "děng",
    "type": "trợ từ / danh từ",
    "meaning": "vân vân; v.v (liệt kê) | cấp bậc, đẳng cấp"
  },
  {
    "stt": 121,
    "hanzi": "等到",
    "pinyin": "děngdào",
    "type": "giới từ",
    "meaning": "cho đến khi"
  },
  {
    "stt": 122,
    "hanzi": "等于",
    "pinyin": "děngyú",
    "type": "động từ",
    "meaning": "bằng, tương đương"
  },
  {
    "stt": 123,
    "hanzi": "低",
    "pinyin": "Dī",
    "type": "tính từ / động từ",
    "meaning": "thấp | cúi xuống, hạ xuống"
  },
  {
    "stt": 124,
    "hanzi": "地球",
    "pinyin": "Dìqiú",
    "type": "danh từ",
    "meaning": "trái đất"
  },
  {
    "stt": 125,
    "hanzi": "地铁",
    "pinyin": "dìtiě",
    "type": "danh từ",
    "meaning": "tàu điện ngầm"
  },
  {
    "stt": 126,
    "hanzi": "地铁站",
    "pinyin": "dìtiězhàn",
    "type": "danh từ",
    "meaning": "ga tàu điện ngầm"
  },
  {
    "stt": 127,
    "hanzi": "点头",
    "pinyin": "diǎntóu",
    "type": "danh từ",
    "meaning": "gật đầu"
  },
  {
    "stt": 128,
    "hanzi": "店",
    "pinyin": "Diàn",
    "type": "danh từ",
    "meaning": "cửa hàng"
  },
  {
    "stt": 129,
    "hanzi": "掉",
    "pinyin": "Diào",
    "type": "động từ",
    "meaning": "rơi, mất"
  },
  {
    "stt": 130,
    "hanzi": "东北",
    "pinyin": "dōngběi",
    "type": "danh từ",
    "meaning": "đông bắc, hướng đông bắc"
  },
  {
    "stt": 131,
    "hanzi": "东方",
    "pinyin": "dōngfāng",
    "type": "danh từ",
    "meaning": "phía đông, phương đông"
  },
  {
    "stt": 132,
    "hanzi": "东南",
    "pinyin": "dōngnán",
    "type": "danh từ",
    "meaning": "đông nam, hướng đông nam"
  },
  {
    "stt": 133,
    "hanzi": "冬天",
    "pinyin": "dōngtiān",
    "type": "danh từ",
    "meaning": "mùa đông"
  },
  {
    "stt": 134,
    "hanzi": "懂",
    "pinyin": "Dǒng",
    "type": "động từ",
    "meaning": "hiểu"
  },
  {
    "stt": 135,
    "hanzi": "懂得",
    "pinyin": "dǒngde",
    "type": "động từ",
    "meaning": "biết, hiểu được"
  },
  {
    "stt": 136,
    "hanzi": "动物",
    "pinyin": "dòngwù",
    "type": "danh từ",
    "meaning": "động vật"
  },
  {
    "stt": 137,
    "hanzi": "动物园",
    "pinyin": "dòngwùyuán",
    "type": "danh từ",
    "meaning": "sở thú"
  },
  {
    "stt": 138,
    "hanzi": "读音",
    "pinyin": "Dúyīn",
    "type": "danh từ",
    "meaning": "cách đọc"
  },
  {
    "stt": 139,
    "hanzi": "度",
    "pinyin": "Dù",
    "type": "danh từ",
    "meaning": "(danh) mức độ, trình độ"
  },
  {
    "stt": 140,
    "hanzi": "短",
    "pinyin": "Duǎn",
    "type": "tính từ",
    "meaning": "ngắn"
  },
  {
    "stt": 141,
    "hanzi": "短信",
    "pinyin": "duǎnxìn",
    "type": "danh từ",
    "meaning": "tin nhắn"
  },
  {
    "stt": 142,
    "hanzi": "段",
    "pinyin": "Duàn",
    "type": "lượng từ",
    "meaning": "đoạn, khúc"
  },
  {
    "stt": 143,
    "hanzi": "队",
    "pinyin": "Duì",
    "type": "danh từ",
    "meaning": "đội"
  },
  {
    "stt": 144,
    "hanzi": "队长",
    "pinyin": "duìzhǎng",
    "type": "danh từ",
    "meaning": "đội trưởng"
  },
  {
    "stt": 145,
    "hanzi": "对",
    "pinyin": "Duì",
    "type": "giới từ / động từ",
    "meaning": "đối với…, với…, dành cho… | đối đãi, hướng về"
  },
  {
    "stt": 146,
    "hanzi": "对话",
    "pinyin": "duìhuà",
    "type": "động từ / danh từ",
    "meaning": "đối thoại, trò chuyện | cuộc đối thoại, đoạn hội thoại"
  },
  {
    "stt": 147,
    "hanzi": "对面",
    "pinyin": "duìmiàn",
    "type": "danh từ",
    "meaning": "đối diện"
  },
  {
    "stt": 148,
    "hanzi": "多",
    "pinyin": "Duō",
    "type": "phó từ",
    "meaning": "nhiều"
  },
  {
    "stt": 149,
    "hanzi": "多久",
    "pinyin": "Duōjiǔ",
    "type": "đại từ",
    "meaning": "bao lâu"
  },
  {
    "stt": 150,
    "hanzi": "多么",
    "pinyin": "duōme",
    "type": "phó từ",
    "meaning": "biết bao, đến mức nào"
  },
  {
    "stt": 151,
    "hanzi": "多数",
    "pinyin": "duōshù",
    "type": "danh từ",
    "meaning": "đa số"
  },
  {
    "stt": 152,
    "hanzi": "多云",
    "pinyin": "duōyún",
    "type": "danh từ",
    "meaning": "nhiều mây"
  },
  {
    "stt": 153,
    "hanzi": "而且",
    "pinyin": "érqiě",
    "type": "liên từ",
    "meaning": "hơn nữa"
  },
  {
    "stt": 154,
    "hanzi": "发",
    "pinyin": "Fā",
    "type": "động từ",
    "meaning": "phát ra, gửi"
  },
  {
    "stt": 155,
    "hanzi": "发现",
    "pinyin": "Fāxiàn",
    "type": "động từ / danh từ",
    "meaning": "phát hiện, nhận ra | sự phát hiện"
  },
  {
    "stt": 156,
    "hanzi": "饭馆",
    "pinyin": "fànguǎn",
    "type": "danh từ",
    "meaning": "quán ăn"
  },
  {
    "stt": 157,
    "hanzi": "方便",
    "pinyin": "fāngbiàn",
    "type": "tính từ",
    "meaning": "tiện lợi"
  },
  {
    "stt": 158,
    "hanzi": "方便面",
    "pinyin": "fāngbiànmiàn",
    "type": "danh từ",
    "meaning": "mì ăn liền"
  },
  {
    "stt": 159,
    "hanzi": "方法",
    "pinyin": "Fāngfǎ",
    "type": "danh từ",
    "meaning": "phương pháp"
  },
  {
    "stt": 160,
    "hanzi": "方面",
    "pinyin": "fāngmiàn",
    "type": "danh từ",
    "meaning": "phương diện"
  },
  {
    "stt": 161,
    "hanzi": "方向",
    "pinyin": "fāngxiàng",
    "type": "danh từ",
    "meaning": "phương hướng"
  },
  {
    "stt": 162,
    "hanzi": "放下",
    "pinyin": "fàngxià",
    "type": "động từ",
    "meaning": "đặt xuống, buông xuống"
  },
  {
    "stt": 163,
    "hanzi": "放心",
    "pinyin": "fàngxīn",
    "type": "động từ",
    "meaning": "yên tâm"
  },
  {
    "stt": 164,
    "hanzi": "分",
    "pinyin": "fēn",
    "type": "động từ",
    "meaning": "chia, phân"
  },
  {
    "stt": 165,
    "hanzi": "分开",
    "pinyin": "fēnkāi",
    "type": "động từ",
    "meaning": "tách ra, chia ra"
  },
  {
    "stt": 166,
    "hanzi": "分数",
    "pinyin": "fēnshù",
    "type": "danh từ",
    "meaning": "điểm số, phân số"
  },
  {
    "stt": 167,
    "hanzi": "分钟",
    "pinyin": "fēnzhōng",
    "type": "lượng từ",
    "meaning": "phút"
  },
  {
    "stt": 168,
    "hanzi": "份",
    "pinyin": "fèn",
    "type": "lượng từ",
    "meaning": "suất, phần"
  },
  {
    "stt": 169,
    "hanzi": "封",
    "pinyin": "fēng",
    "type": "lượng từ",
    "meaning": "lá (thư)"
  },
  {
    "stt": 170,
    "hanzi": "服务",
    "pinyin": "Fúwù",
    "type": "động từ / danh từ",
    "meaning": "phục vụ | dịch vụ, sự phục vụ"
  },
  {
    "stt": 171,
    "hanzi": "复习",
    "pinyin": "Fùxí",
    "type": "động từ",
    "meaning": "ôn tập"
  },
  {
    "stt": 172,
    "hanzi": "该",
    "pinyin": "Gāi",
    "type": "động từ",
    "meaning": "nên"
  },
  {
    "stt": 173,
    "hanzi": "改",
    "pinyin": "Gǎi",
    "type": "động từ",
    "meaning": "sửa, thay đổi"
  },
  {
    "stt": 174,
    "hanzi": "改变",
    "pinyin": "gǎibiàn",
    "type": "động từ / danh từ",
    "meaning": "thay đổi, biến đổi | sự thay đổi, sự biến đổi"
  },
  {
    "stt": 175,
    "hanzi": "干杯",
    "pinyin": "gānbēi",
    "type": "động từ",
    "meaning": "cạn ly"
  },
  {
    "stt": 176,
    "hanzi": "感到",
    "pinyin": "gǎndào",
    "type": "động từ",
    "meaning": "cảm thấy"
  },
  {
    "stt": 177,
    "hanzi": "感动",
    "pinyin": "gǎndòng",
    "type": "tính từ / động từ",
    "meaning": "cảm động, xúc động | làm cho cảm động"
  },
  {
    "stt": 178,
    "hanzi": "感觉",
    "pinyin": "gǎnjué",
    "type": "động từ / danh từ",
    "meaning": "cảm thấy | cảm giác"
  },
  {
    "stt": 179,
    "hanzi": "感谢",
    "pinyin": "gǎnxiè",
    "type": "động từ",
    "meaning": "cảm ơn"
  },
  {
    "stt": 180,
    "hanzi": "干活儿",
    "pinyin": "gànhuór",
    "type": "động từ",
    "meaning": "làm việc"
  },
  {
    "stt": 181,
    "hanzi": "刚",
    "pinyin": "Gāng",
    "type": "phó từ",
    "meaning": "vừa, mới"
  },
  {
    "stt": 182,
    "hanzi": "刚才",
    "pinyin": "gāngcái",
    "type": "danh từ",
    "meaning": "vừa nãy"
  },
  {
    "stt": 183,
    "hanzi": "刚刚",
    "pinyin": "gānggāng",
    "type": "phó từ",
    "meaning": "vừa mới, mới xong"
  },
  {
    "stt": 184,
    "hanzi": "高级",
    "pinyin": "Gāojí",
    "type": "tính từ",
    "meaning": "cao cấp"
  },
  {
    "stt": 185,
    "hanzi": "高中",
    "pinyin": "gāozhōng",
    "type": "danh từ",
    "meaning": "trung học phổ thông"
  },
  {
    "stt": 186,
    "hanzi": "个子",
    "pinyin": "gèzi",
    "type": "danh từ",
    "meaning": "chiều cao"
  },
  {
    "stt": 187,
    "hanzi": "更",
    "pinyin": "gèng",
    "type": "phó từ",
    "meaning": "càng"
  },
  {
    "stt": 188,
    "hanzi": "公共汽车",
    "pinyin": "gōnggòng qìche",
    "type": "danh từ",
    "meaning": "xe buýt công cộng"
  },
  {
    "stt": 189,
    "hanzi": "公交车",
    "pinyin": "gōngjiāochē",
    "type": "danh từ",
    "meaning": "xe buýt công cộng"
  },
  {
    "stt": 190,
    "hanzi": "公斤",
    "pinyin": "gōngjīn",
    "type": "lượng từ",
    "meaning": "kilôgam"
  },
  {
    "stt": 191,
    "hanzi": "公里",
    "pinyin": "Gōnglǐ",
    "type": "lượng từ",
    "meaning": "kilômét"
  },
  {
    "stt": 192,
    "hanzi": "公路",
    "pinyin": "gōnglù",
    "type": "danh từ",
    "meaning": "đường bộ"
  },
  {
    "stt": 193,
    "hanzi": "公平",
    "pinyin": "gōngpíng",
    "type": "tính từ",
    "meaning": "công bằng"
  },
  {
    "stt": 194,
    "hanzi": "公司",
    "pinyin": "gōngsī",
    "type": "danh từ",
    "meaning": "công ty"
  },
  {
    "stt": 195,
    "hanzi": "公园",
    "pinyin": "gōngyuán",
    "type": "danh từ",
    "meaning": "công viên"
  },
  {
    "stt": 196,
    "hanzi": "狗",
    "pinyin": "Gǒu",
    "type": "danh từ",
    "meaning": "chó"
  },
  {
    "stt": 197,
    "hanzi": "够",
    "pinyin": "Gòu",
    "type": "động từ / phó từ",
    "meaning": "đủ, đạt đến mức | đủ … (nhấn mạnh mức độ)"
  },
  {
    "stt": 198,
    "hanzi": "故事",
    "pinyin": "Gùshi",
    "type": "danh từ",
    "meaning": "câu chuyện"
  },
  {
    "stt": 199,
    "hanzi": "故意",
    "pinyin": "Gùyì",
    "type": "phó từ",
    "meaning": "cố ý"
  },
  {
    "stt": 200,
    "hanzi": "顾客",
    "pinyin": "Gùki",
    "type": "danh từ",
    "meaning": "khách hàng"
  },
  {
    "stt": 201,
    "hanzi": "关机",
    "pinyin": "guānjī",
    "type": "từ vựng",
    "meaning": "tắt máy, tắt nguồn"
  },
  {
    "stt": 202,
    "hanzi": "关心",
    "pinyin": "guānxīn",
    "type": "động từ",
    "meaning": "quan tâm"
  },
  {
    "stt": 203,
    "hanzi": "观点",
    "pinyin": "guāndiǎn",
    "type": "danh từ",
    "meaning": "quan điểm"
  },
  {
    "stt": 204,
    "hanzi": "广场",
    "pinyin": "guǎngchǎng",
    "type": "danh từ",
    "meaning": "quảng trường"
  },
  {
    "stt": 205,
    "hanzi": "广告",
    "pinyin": "guǎnggào",
    "type": "danh từ",
    "meaning": "quảng cáo"
  },
  {
    "stt": 206,
    "hanzi": "国际",
    "pinyin": "Guójì",
    "type": "danh từ",
    "meaning": "quốc tế"
  },
  {
    "stt": 207,
    "hanzi": "过来",
    "pinyin": "guòlái",
    "type": "động từ",
    "meaning": "đi tới"
  },
  {
    "stt": 208,
    "hanzi": "过年",
    "pinyin": "guònián",
    "type": "từ vựng",
    "meaning": "ăn Tết"
  },
  {
    "stt": 209,
    "hanzi": "过去",
    "pinyin": "guòqù",
    "type": "động từ",
    "meaning": "đi qua, đã qua"
  },
  {
    "stt": 210,
    "hanzi": "过",
    "pinyin": "Guo",
    "type": "trợ từ",
    "meaning": "đã từng"
  },
  {
    "stt": 211,
    "hanzi": "海",
    "pinyin": "Hǎi",
    "type": "danh từ",
    "meaning": "biển"
  },
  {
    "stt": 212,
    "hanzi": "海边",
    "pinyin": "hǎi biān",
    "type": "từ vựng",
    "meaning": "bờ biển"
  },
  {
    "stt": 213,
    "hanzi": "喊",
    "pinyin": "Hǎn",
    "type": "động từ",
    "meaning": "gọi, hét"
  },
  {
    "stt": 214,
    "hanzi": "好",
    "pinyin": "Hǎo",
    "type": "phó từ",
    "meaning": "lắm, quá, rất, thật"
  },
  {
    "stt": 215,
    "hanzi": "好处",
    "pinyin": "hǎochù",
    "type": "danh từ",
    "meaning": "lợi ích"
  },
  {
    "stt": 216,
    "hanzi": "好多",
    "pinyin": "hǎoduō",
    "type": "số từ",
    "meaning": "rất nhiều"
  },
  {
    "stt": 217,
    "hanzi": "好久",
    "pinyin": "Hǎojiǔ",
    "type": "tính từ",
    "meaning": "lâu lắm"
  },
  {
    "stt": 218,
    "hanzi": "好人",
    "pinyin": "hǎorén",
    "type": "danh từ",
    "meaning": "người tốt"
  },
  {
    "stt": 219,
    "hanzi": "好事",
    "pinyin": "hǎoshì",
    "type": "danh từ",
    "meaning": "việc tốt"
  },
  {
    "stt": 220,
    "hanzi": "好像",
    "pinyin": "hǎoxiàng",
    "type": "tính từ",
    "meaning": "hình như"
  },
  {
    "stt": 221,
    "hanzi": "合适",
    "pinyin": "héshì",
    "type": "tính từ",
    "meaning": "phù hợp"
  },
  {
    "stt": 222,
    "hanzi": "河",
    "pinyin": "hé",
    "type": "danh từ",
    "meaning": "sông"
  },
  {
    "stt": 223,
    "hanzi": "黑",
    "pinyin": "hēi",
    "type": "tính từ",
    "meaning": "đen"
  },
  {
    "stt": 224,
    "hanzi": "黑板",
    "pinyin": "hēibǎn",
    "type": "danh từ",
    "meaning": "bảng đen"
  },
  {
    "stt": 225,
    "hanzi": "黑色",
    "pinyin": "hēisè",
    "type": "danh từ",
    "meaning": "màu đen"
  },
  {
    "stt": 226,
    "hanzi": "红",
    "pinyin": "Hóng",
    "type": "tính từ",
    "meaning": "đỏ"
  },
  {
    "stt": 227,
    "hanzi": "红色",
    "pinyin": "hóngsi",
    "type": "danh từ",
    "meaning": "màu đỏ"
  },
  {
    "stt": 228,
    "hanzi": "后来",
    "pinyin": "hòulái",
    "type": "danh từ",
    "meaning": "về sau"
  },
  {
    "stt": 229,
    "hanzi": "忽然",
    "pinyin": "Hūrán",
    "type": "phó từ",
    "meaning": "đột nhiên"
  },
  {
    "stt": 230,
    "hanzi": "湖",
    "pinyin": "Hú",
    "type": "danh từ",
    "meaning": "hồ"
  },
  {
    "stt": 231,
    "hanzi": "护照",
    "pinyin": "hùzhào",
    "type": "danh từ",
    "meaning": "hộ chiếu"
  },
  {
    "stt": 232,
    "hanzi": "花",
    "pinyin": "Huā",
    "type": "động từ",
    "meaning": "tiêu, dùng (tiền, thời gian)"
  },
  {
    "stt": 233,
    "hanzi": "花园",
    "pinyin": "huāyuán",
    "type": "danh từ",
    "meaning": "vườn hoa"
  },
  {
    "stt": 234,
    "hanzi": "画",
    "pinyin": "Huà",
    "type": "động từ",
    "meaning": "vẽ"
  },
  {
    "stt": 235,
    "hanzi": "画家",
    "pinyin": "Huàjiā",
    "type": "danh từ",
    "meaning": "họa sĩ"
  },
  {
    "stt": 236,
    "hanzi": "画儿",
    "pinyin": "Huàr",
    "type": "danh từ",
    "meaning": "tranh vẽ"
  },
  {
    "stt": 237,
    "hanzi": "坏处",
    "pinyin": "huàichù",
    "type": "danh từ",
    "meaning": "điều xấu, điều có hại"
  },
  {
    "stt": 238,
    "hanzi": "坏人",
    "pinyin": "huàirén",
    "type": "danh từ",
    "meaning": "người xấu"
  },
  {
    "stt": 239,
    "hanzi": "欢迎",
    "pinyin": "huānyíng",
    "type": "động từ",
    "meaning": "hoan nghênh, chào mừng"
  },
  {
    "stt": 240,
    "hanzi": "换",
    "pinyin": "Huàn",
    "type": "động từ",
    "meaning": "đổi"
  },
  {
    "stt": 241,
    "hanzi": "黄",
    "pinyin": "Huáng",
    "type": "tính từ",
    "meaning": "vàng"
  },
  {
    "stt": 242,
    "hanzi": "黄色",
    "pinyin": "huángsi",
    "type": "danh từ",
    "meaning": "màu vàng"
  },
  {
    "stt": 243,
    "hanzi": "回",
    "pinyin": "Huí",
    "type": "lượng từ",
    "meaning": "lần"
  },
  {
    "stt": 244,
    "hanzi": "回国",
    "pinyin": "huí guó",
    "type": "từ vựng",
    "meaning": "về nước"
  },
  {
    "stt": 245,
    "hanzi": "会",
    "pinyin": "Huì",
    "type": "động từ",
    "meaning": "biết / sẽ"
  },
  {
    "stt": 246,
    "hanzi": "活动",
    "pinyin": "huódòng",
    "type": "từ vựng",
    "meaning": "danh từ, động từ hoạt động"
  },
  {
    "stt": 247,
    "hanzi": "或",
    "pinyin": "Huò",
    "type": "liên từ",
    "meaning": "hoặc"
  },
  {
    "stt": 248,
    "hanzi": "或者",
    "pinyin": "huòzhi",
    "type": "liên từ",
    "meaning": "hoặc là"
  },
  {
    "stt": 249,
    "hanzi": "机会",
    "pinyin": "jīhuì",
    "type": "danh từ",
    "meaning": "cơ hội"
  },
  {
    "stt": 250,
    "hanzi": "鸡",
    "pinyin": "Jī",
    "type": "danh từ",
    "meaning": "gà"
  },
  {
    "stt": 251,
    "hanzi": "级",
    "pinyin": "Jí",
    "type": "danh từ",
    "meaning": "cấp, bậc"
  },
  {
    "stt": 252,
    "hanzi": "急",
    "pinyin": "Jí",
    "type": "tính từ",
    "meaning": "gấp, vội"
  },
  {
    "stt": 253,
    "hanzi": "计划",
    "pinyin": "Jìhuà",
    "type": "danh từ / động từ",
    "meaning": "kế hoạch | lên kế hoạch, dự định"
  },
  {
    "stt": 254,
    "hanzi": "计算机",
    "pinyin": "jìsuànjī",
    "type": "danh từ",
    "meaning": "máy tính"
  },
  {
    "stt": 255,
    "hanzi": "加",
    "pinyin": "Jiā",
    "type": "động từ",
    "meaning": "thêm"
  },
  {
    "stt": 256,
    "hanzi": "加油",
    "pinyin": "jiāyóu",
    "type": "từ vựng",
    "meaning": "cố lên / đổ xăng"
  },
  {
    "stt": 257,
    "hanzi": "家（科学家） jiā(kēxuéjiā)",
    "pinyin": "hậu tố",
    "type": "từ vựng",
    "meaning": "nhà (nhà khoa học)"
  },
  {
    "stt": 258,
    "hanzi": "家庭",
    "pinyin": "Jiātíng",
    "type": "danh từ",
    "meaning": "gia đình"
  },
  {
    "stt": 259,
    "hanzi": "家长",
    "pinyin": "jiāzhǎng",
    "type": "danh từ",
    "meaning": "phụ huynh"
  },
  {
    "stt": 260,
    "hanzi": "假",
    "pinyin": "Jià",
    "type": "tính từ",
    "meaning": "giả"
  },
  {
    "stt": 261,
    "hanzi": "假期",
    "pinyin": "Jiàqī",
    "type": "danh từ",
    "meaning": "kỳ nghỉ"
  },
  {
    "stt": 262,
    "hanzi": "检查",
    "pinyin": "jiǎnchá",
    "type": "từ vựng",
    "meaning": "động từ, danh từ kiểm tra"
  },
  {
    "stt": 263,
    "hanzi": "见到",
    "pinyin": "jiàndào",
    "type": "từ vựng",
    "meaning": "gặp, nhìn thấy"
  },
  {
    "stt": 264,
    "hanzi": "见过",
    "pinyin": "jiànguo",
    "type": "từ vựng",
    "meaning": "gặp qua, từng thấy"
  },
  {
    "stt": 265,
    "hanzi": "件",
    "pinyin": "Jiàn",
    "type": "lượng từ",
    "meaning": "chiếc, cái, bộ"
  },
  {
    "stt": 266,
    "hanzi": "健康",
    "pinyin": "jiànkāng",
    "type": "tính từ / danh từ",
    "meaning": "khỏe mạnh, lành mạnh | sức khỏe"
  },
  {
    "stt": 267,
    "hanzi": "讲",
    "pinyin": "Jiǎng",
    "type": "động từ",
    "meaning": "nói"
  },
  {
    "stt": 268,
    "hanzi": "讲话",
    "pinyin": "jiǎnghuà",
    "type": "từ vựng",
    "meaning": "phát biểu"
  },
  {
    "stt": 269,
    "hanzi": "交",
    "pinyin": "Jiāo",
    "type": "động từ",
    "meaning": "giao, trao"
  },
  {
    "stt": 270,
    "hanzi": "交给",
    "pinyin": "jiāo gěi",
    "type": "từ vựng",
    "meaning": "giao cho"
  },
  {
    "stt": 271,
    "hanzi": "交朋友",
    "pinyin": "jiāo péngyǒu",
    "type": "từ vựng",
    "meaning": "kết bạn"
  },
  {
    "stt": 272,
    "hanzi": "交通",
    "pinyin": "jiāotōng",
    "type": "danh từ",
    "meaning": "giao thông"
  },
  {
    "stt": 273,
    "hanzi": "角",
    "pinyin": "Jiǎo",
    "type": "lượng từ / danh từ",
    "meaning": "miếng, góc (chỉ một phần tư), hào (đơn vị | góc, vai, sừng"
  },
  {
    "stt": 274,
    "hanzi": "角度",
    "pinyin": "Jiǎodù",
    "type": "danh từ",
    "meaning": "góc độ"
  },
  {
    "stt": 275,
    "hanzi": "饺子",
    "pinyin": "Jiǎozi",
    "type": "danh từ",
    "meaning": "há cảo"
  },
  {
    "stt": 276,
    "hanzi": "脚",
    "pinyin": "Jiǎo",
    "type": "danh từ",
    "meaning": "chân"
  },
  {
    "stt": 277,
    "hanzi": "叫作",
    "pinyin": "jiàozuò",
    "type": "động từ",
    "meaning": "gọi là"
  },
  {
    "stt": 278,
    "hanzi": "教师",
    "pinyin": "jiàoshī",
    "type": "danh từ",
    "meaning": "giáo viên"
  },
  {
    "stt": 279,
    "hanzi": "教室",
    "pinyin": "jiàoshì",
    "type": "danh từ",
    "meaning": "lớp học"
  },
  {
    "stt": 280,
    "hanzi": "教学",
    "pinyin": "jiàoxué",
    "type": "danh từ / động từ",
    "meaning": "việc giảng dạy, hoạt động dạy học | giảng dạy, dạy học"
  },
  {
    "stt": 281,
    "hanzi": "教育",
    "pinyin": "Jiàoyù",
    "type": "động từ / danh từ",
    "meaning": "giáo dục, dạy dỗ, uốn nắn | giáo dục"
  },
  {
    "stt": 282,
    "hanzi": "接",
    "pinyin": "jiē",
    "type": "động từ",
    "meaning": "nhận, đón"
  },
  {
    "stt": 283,
    "hanzi": "接到",
    "pinyin": "jiēdào",
    "type": "từ vựng",
    "meaning": "nhận được"
  },
  {
    "stt": 284,
    "hanzi": "接受",
    "pinyin": "jiēshòu",
    "type": "động từ",
    "meaning": "tiếp nhận"
  },
  {
    "stt": 285,
    "hanzi": "接下来",
    "pinyin": "jiēxiàlái",
    "type": "từ vựng",
    "meaning": "tiếp theo"
  },
  {
    "stt": 286,
    "hanzi": "接着",
    "pinyin": "jiēzhe",
    "type": "động từ / phó từ",
    "meaning": "tiếp nhận, nối, cầm lấy | tiếp theo, sau đó, ngay sau"
  },
  {
    "stt": 287,
    "hanzi": "街",
    "pinyin": "jiē",
    "type": "danh từ",
    "meaning": "đường phố"
  },
  {
    "stt": 288,
    "hanzi": "节",
    "pinyin": "jié",
    "type": "danh từ / lượng từ",
    "meaning": "lễ, ngày lễ | tiết, đoạn"
  },
  {
    "stt": 289,
    "hanzi": "节目",
    "pinyin": "jiémù",
    "type": "danh từ",
    "meaning": "chương trình"
  },
  {
    "stt": 290,
    "hanzi": "节日",
    "pinyin": "jiérì",
    "type": "danh từ",
    "meaning": "ngày lễ"
  },
  {
    "stt": 291,
    "hanzi": "结果",
    "pinyin": "jiéguǒ",
    "type": "danh từ / liên từ",
    "meaning": "kết quả | kết quả là"
  },
  {
    "stt": 292,
    "hanzi": "借",
    "pinyin": "jiè",
    "type": "động từ",
    "meaning": "mượn"
  },
  {
    "stt": 293,
    "hanzi": "斤",
    "pinyin": "Jīn",
    "type": "lượng từ",
    "meaning": "cân (0.5kg)"
  },
  {
    "stt": 294,
    "hanzi": "今后",
    "pinyin": "Jīnhòu",
    "type": "phó từ",
    "meaning": "từ nay về sau"
  },
  {
    "stt": 295,
    "hanzi": "进入",
    "pinyin": "Jìnrù",
    "type": "động từ",
    "meaning": "tiến vào"
  },
  {
    "stt": 296,
    "hanzi": "进行",
    "pinyin": "jìnxíng",
    "type": "động từ",
    "meaning": "tiến hành"
  },
  {
    "stt": 297,
    "hanzi": "近",
    "pinyin": "Jìn",
    "type": "tính từ",
    "meaning": "gần"
  },
  {
    "stt": 298,
    "hanzi": "经常",
    "pinyin": "jīngcháng",
    "type": "phó từ",
    "meaning": "thường xuyên"
  },
  {
    "stt": 299,
    "hanzi": "经过",
    "pinyin": "jīngguò",
    "type": "động từ / danh từ",
    "meaning": "đi qua, trải qua | quá trình, diễn biến"
  },
  {
    "stt": 300,
    "hanzi": "经理",
    "pinyin": "Jīnglǐ",
    "type": "danh từ",
    "meaning": "giám đốc, quản lý"
  },
  {
    "stt": 301,
    "hanzi": "酒",
    "pinyin": "Jiǔ",
    "type": "danh từ",
    "meaning": "rượu"
  },
  {
    "stt": 302,
    "hanzi": "酒店",
    "pinyin": "jiǔdiàn",
    "type": "danh từ",
    "meaning": "khách sạn"
  },
  {
    "stt": 303,
    "hanzi": "就要",
    "pinyin": "Jiùyào",
    "type": "phó từ",
    "meaning": "sắp"
  },
  {
    "stt": 304,
    "hanzi": "举",
    "pinyin": "Jǔ",
    "type": "động từ",
    "meaning": "giơ lên"
  },
  {
    "stt": 305,
    "hanzi": "举手",
    "pinyin": "jǔshǒu",
    "type": "động từ",
    "meaning": "giơ tay"
  },
  {
    "stt": 306,
    "hanzi": "举行",
    "pinyin": "Jǔxíng",
    "type": "động từ",
    "meaning": "tổ chức"
  },
  {
    "stt": 307,
    "hanzi": "句",
    "pinyin": "Jù",
    "type": "lượng từ",
    "meaning": "câu"
  },
  {
    "stt": 308,
    "hanzi": "句子",
    "pinyin": "Jùzi",
    "type": "danh từ",
    "meaning": "câu văn"
  },
  {
    "stt": 309,
    "hanzi": "卡",
    "pinyin": "Kǎ",
    "type": "danh từ",
    "meaning": "thẻ, card"
  },
  {
    "stt": 310,
    "hanzi": "开机",
    "pinyin": "kāijī",
    "type": "từ vựng",
    "meaning": "khởi động máy"
  },
  {
    "stt": 311,
    "hanzi": "开心",
    "pinyin": "Kāixīn",
    "type": "động từ / tính từ",
    "meaning": "làm cho vui, khiến (ai đó) vui | vui vẻ, vui, hạnh phúc"
  },
  {
    "stt": 312,
    "hanzi": "开学",
    "pinyin": "kāixué",
    "type": "từ vựng",
    "meaning": "khai giảng"
  },
  {
    "stt": 313,
    "hanzi": "看法",
    "pinyin": "kànfǎ",
    "type": "danh từ",
    "meaning": "quan điểm"
  },
  {
    "stt": 314,
    "hanzi": "考生",
    "pinyin": "kǎoshēng",
    "type": "danh từ",
    "meaning": "thí sinh"
  },
  {
    "stt": 315,
    "hanzi": "靠",
    "pinyin": "Kào",
    "type": "động từ",
    "meaning": "dựa vào"
  },
  {
    "stt": 316,
    "hanzi": "科",
    "pinyin": "kē",
    "type": "danh từ",
    "meaning": "môn, khoa"
  },
  {
    "stt": 317,
    "hanzi": "科学",
    "pinyin": "kēxué",
    "type": "danh từ / tính từ",
    "meaning": "khoa học | khoa học, có tính khoa học, có kỹ thuật"
  },
  {
    "stt": 318,
    "hanzi": "可爱",
    "pinyin": "kěài",
    "type": "tính từ",
    "meaning": "dễ thương"
  },
  {
    "stt": 319,
    "hanzi": "可能",
    "pinyin": "kěnéng",
    "type": "động từ / tính từ / danh từ",
    "meaning": "có lẽ, chắc là | khả thi, có thể, có khả năng | khả năng, có thể"
  },
  {
    "stt": 320,
    "hanzi": "可怕",
    "pinyin": "kěpà",
    "type": "tính từ",
    "meaning": "đáng sợ"
  },
  {
    "stt": 321,
    "hanzi": "可是",
    "pinyin": "kěshì",
    "type": "liên từ",
    "meaning": "nhưng mà"
  },
  {
    "stt": 322,
    "hanzi": "可以",
    "pinyin": "kěyǐ",
    "type": "động từ",
    "meaning": "có thể"
  },
  {
    "stt": 323,
    "hanzi": "克",
    "pinyin": "kè",
    "type": "lượng từ",
    "meaning": "gram"
  },
  {
    "stt": 324,
    "hanzi": "刻",
    "pinyin": "kè",
    "type": "lượng từ",
    "meaning": "khắc, 15 phút"
  },
  {
    "stt": 325,
    "hanzi": "客人",
    "pinyin": "kè·rén",
    "type": "danh từ",
    "meaning": "khách"
  },
  {
    "stt": 326,
    "hanzi": "课堂",
    "pinyin": "kètáng",
    "type": "danh từ",
    "meaning": "lớp học"
  },
  {
    "stt": 327,
    "hanzi": "空气",
    "pinyin": "kōngqì",
    "type": "danh từ",
    "meaning": "không khí"
  },
  {
    "stt": 328,
    "hanzi": "哭",
    "pinyin": "Kū",
    "type": "động từ",
    "meaning": "khóc"
  },
  {
    "stt": 329,
    "hanzi": "快餐",
    "pinyin": "kuàicān",
    "type": "danh từ",
    "meaning": "đồ ăn nhanh"
  },
  {
    "stt": 330,
    "hanzi": "快点儿",
    "pinyin": "kuài diǎnr",
    "type": "từ vựng",
    "meaning": "nhanh lên"
  },
  {
    "stt": 331,
    "hanzi": "快乐",
    "pinyin": "kuàilè",
    "type": "tính từ",
    "meaning": "hạnh phúc"
  },
  {
    "stt": 332,
    "hanzi": "快要",
    "pinyin": "kuàiyào",
    "type": "phó từ",
    "meaning": "sắp"
  },
  {
    "stt": 333,
    "hanzi": "筷子",
    "pinyin": "Kuàizi",
    "type": "danh từ",
    "meaning": "đũa"
  },
  {
    "stt": 334,
    "hanzi": "拉",
    "pinyin": "Lā",
    "type": "động từ",
    "meaning": "kéo"
  },
  {
    "stt": 335,
    "hanzi": "来自",
    "pinyin": "Láizì",
    "type": "động từ",
    "meaning": "đến từ"
  },
  {
    "stt": 336,
    "hanzi": "蓝",
    "pinyin": "Lán",
    "type": "tính từ",
    "meaning": "xanh biển"
  },
  {
    "stt": 337,
    "hanzi": "蓝色",
    "pinyin": "Lánsi",
    "type": "danh từ",
    "meaning": "màu xanh biển"
  },
  {
    "stt": 338,
    "hanzi": "篮球",
    "pinyin": "Lánqiú",
    "type": "danh từ",
    "meaning": "bóng rổ"
  },
  {
    "stt": 339,
    "hanzi": "老",
    "pinyin": "Lǎo",
    "type": "phó từ",
    "meaning": "già"
  },
  {
    "stt": 340,
    "hanzi": "老（老王）",
    "pinyin": "lǎo (Lǎo Wáng)",
    "type": "từ vựng",
    "meaning": "tiền tố | ông ..."
  },
  {
    "stt": 341,
    "hanzi": "老年",
    "pinyin": "lǎonián",
    "type": "danh từ",
    "meaning": "tuổi già"
  },
  {
    "stt": 342,
    "hanzi": "老朋友",
    "pinyin": "lǎo péngyǒu",
    "type": "từ vựng",
    "meaning": "bạn cũ"
  },
  {
    "stt": 343,
    "hanzi": "老是",
    "pinyin": "lǎoshì",
    "type": "phó từ",
    "meaning": "luôn luôn"
  },
  {
    "stt": 344,
    "hanzi": "离",
    "pinyin": "Lí",
    "type": "động từ / giới từ",
    "meaning": "rời khỏi, rời xa | cách, cách xa"
  },
  {
    "stt": 345,
    "hanzi": "离开",
    "pinyin": "líkāi",
    "type": "từ vựng",
    "meaning": "rời khỏi"
  },
  {
    "stt": 346,
    "hanzi": "礼物",
    "pinyin": "Lǐwù",
    "type": "danh từ",
    "meaning": "quà"
  },
  {
    "stt": 347,
    "hanzi": "里头",
    "pinyin": "Lǐtou",
    "type": "danh từ",
    "meaning": "bên trong"
  },
  {
    "stt": 348,
    "hanzi": "理想",
    "pinyin": "lǐxiǎng",
    "type": "danh từ",
    "meaning": "lý tưởng"
  },
  {
    "stt": 349,
    "hanzi": "例如",
    "pinyin": "Lìrú",
    "type": "động từ",
    "meaning": "ví dụ"
  },
  {
    "stt": 350,
    "hanzi": "例子",
    "pinyin": "Lìzi",
    "type": "danh từ",
    "meaning": "ví dụ"
  },
  {
    "stt": 351,
    "hanzi": "脸",
    "pinyin": "Liǎn",
    "type": "danh từ",
    "meaning": "khuôn mặt"
  },
  {
    "stt": 352,
    "hanzi": "练",
    "pinyin": "Liàn",
    "type": "động từ",
    "meaning": "luyện"
  },
  {
    "stt": 353,
    "hanzi": "练习",
    "pinyin": "Liànxí",
    "type": "động từ / danh từ",
    "meaning": "luyện tập, thực hành | bài tập, sự luyện tập"
  },
  {
    "stt": 354,
    "hanzi": "凉",
    "pinyin": "Liáng",
    "type": "tính từ",
    "meaning": "mát"
  },
  {
    "stt": 355,
    "hanzi": "凉快",
    "pinyin": "liángkuai",
    "type": "tính từ",
    "meaning": "mát mẻ"
  },
  {
    "stt": 356,
    "hanzi": "两",
    "pinyin": "Liǎng",
    "type": "lượng từ",
    "meaning": "hai"
  },
  {
    "stt": 357,
    "hanzi": "亮",
    "pinyin": "Liàng",
    "type": "tính từ / động từ",
    "meaning": "sáng, sáng sủa | phát sáng / bày tỏ"
  },
  {
    "stt": 358,
    "hanzi": "辆",
    "pinyin": "Liàng",
    "type": "lượng từ",
    "meaning": "chiếc (xe)"
  },
  {
    "stt": 359,
    "hanzi": "零下",
    "pinyin": "líng xià",
    "type": "từ vựng",
    "meaning": "âm độ"
  },
  {
    "stt": 360,
    "hanzi": "留",
    "pinyin": "Liú",
    "type": "động từ",
    "meaning": "ở lại"
  },
  {
    "stt": 361,
    "hanzi": "留下",
    "pinyin": "Liúxia",
    "type": "từ vựng",
    "meaning": "để lại"
  },
  {
    "stt": 362,
    "hanzi": "留学生",
    "pinyin": "liúxuéshēng",
    "type": "danh từ",
    "meaning": "du học sinh"
  },
  {
    "stt": 363,
    "hanzi": "流",
    "pinyin": "Liú",
    "type": "động từ",
    "meaning": "chảy"
  },
  {
    "stt": 364,
    "hanzi": "流利",
    "pinyin": "Liúlì",
    "type": "tính từ",
    "meaning": "trôi chảy"
  },
  {
    "stt": 365,
    "hanzi": "流行",
    "pinyin": "liúxíng",
    "type": "động từ / tính từ",
    "meaning": "thịnh hành, lan truyền, trở nên phổ biến | phổ biến, hợp mốt, thịnh hành"
  },
  {
    "stt": 366,
    "hanzi": "路边",
    "pinyin": "lù biān",
    "type": "từ vựng",
    "meaning": "ven đường"
  },
  {
    "stt": 367,
    "hanzi": "旅客",
    "pinyin": "lǚkè",
    "type": "danh từ",
    "meaning": "hành khách"
  },
  {
    "stt": 368,
    "hanzi": "旅行",
    "pinyin": "lǚxíng",
    "type": "động từ",
    "meaning": "du lịch"
  },
  {
    "stt": 369,
    "hanzi": "旅游",
    "pinyin": "Lǚyóu",
    "type": "động từ",
    "meaning": "du lịch"
  },
  {
    "stt": 370,
    "hanzi": "绿",
    "pinyin": "Lǜ",
    "type": "tính từ",
    "meaning": "xanh lá cây"
  },
  {
    "stt": 371,
    "hanzi": "绿色",
    "pinyin": "lǜsè",
    "type": "danh từ",
    "meaning": "màu xanh lá"
  },
  {
    "stt": 372,
    "hanzi": "卖",
    "pinyin": "Mài",
    "type": "động từ",
    "meaning": "bán"
  },
  {
    "stt": 373,
    "hanzi": "满",
    "pinyin": "Mǎn",
    "type": "tính từ",
    "meaning": "đầy"
  },
  {
    "stt": 374,
    "hanzi": "满意",
    "pinyin": "mǎnyì",
    "type": "động từ",
    "meaning": "hài lòng"
  },
  {
    "stt": 375,
    "hanzi": "猫",
    "pinyin": "Māo",
    "type": "danh từ",
    "meaning": "mèo"
  },
  {
    "stt": 376,
    "hanzi": "米",
    "pinyin": "Mǐ",
    "type": "lượng từ",
    "meaning": "mét"
  },
  {
    "stt": 377,
    "hanzi": "面1（见面） Miàn",
    "pinyin": "danh từ",
    "type": "lượng từ",
    "meaning": "mặt, khuôn mặt | cái, chiếc"
  },
  {
    "stt": 378,
    "hanzi": "面2（面条儿）Miàn",
    "pinyin": "danh từ",
    "type": "từ vựng",
    "meaning": "mì"
  },
  {
    "stt": 379,
    "hanzi": "面前",
    "pinyin": "miànqián",
    "type": "danh từ",
    "meaning": "trước mặt"
  },
  {
    "stt": 380,
    "hanzi": "名",
    "pinyin": "Míng",
    "type": "danh từ / lượng từ",
    "meaning": "tên, danh tiếng | dùng cho người (tôn trọng)"
  },
  {
    "stt": 381,
    "hanzi": "名称",
    "pinyin": "míngchēng",
    "type": "danh từ",
    "meaning": "tên gọi"
  },
  {
    "stt": 382,
    "hanzi": "名单",
    "pinyin": "míngdān",
    "type": "danh từ",
    "meaning": "danh sách"
  },
  {
    "stt": 383,
    "hanzi": "明星",
    "pinyin": "míngxīng",
    "type": "danh từ",
    "meaning": "ngôi sao"
  },
  {
    "stt": 384,
    "hanzi": "目的",
    "pinyin": "Mùdì",
    "type": "danh từ",
    "meaning": "mục đích"
  },
  {
    "stt": 385,
    "hanzi": "拿出",
    "pinyin": "náchū",
    "type": "từ vựng",
    "meaning": "lấy ra"
  },
  {
    "stt": 386,
    "hanzi": "拿到",
    "pinyin": "nádào",
    "type": "từ vựng",
    "meaning": "lấy được"
  },
  {
    "stt": 387,
    "hanzi": "那",
    "pinyin": "Nà",
    "type": "liên từ",
    "meaning": "kia, đó"
  },
  {
    "stt": 388,
    "hanzi": "那会儿",
    "pinyin": "nàhuìr",
    "type": "đại từ",
    "meaning": "lúc đó"
  },
  {
    "stt": 389,
    "hanzi": "那么",
    "pinyin": "Nàme",
    "type": "đại từ",
    "meaning": "như vậy, như thế"
  },
  {
    "stt": 390,
    "hanzi": "那时候",
    "pinyin": "nà shíhou",
    "type": "từ vựng",
    "meaning": "lúc đó, khi đó | 那时 | nà shí | lúc đó, khi đó"
  },
  {
    "stt": 391,
    "hanzi": "那样",
    "pinyin": "nàyàng",
    "type": "đại từ",
    "meaning": "như vậy, như thế, kiểu đó"
  },
  {
    "stt": 392,
    "hanzi": "南方",
    "pinyin": "nánfāng",
    "type": "danh từ",
    "meaning": "phía nam, miền nam"
  },
  {
    "stt": 393,
    "hanzi": "难过",
    "pinyin": "nánguò",
    "type": "tính từ",
    "meaning": "buồn, khó chịu"
  },
  {
    "stt": 394,
    "hanzi": "难看",
    "pinyin": "nánkàn",
    "type": "tính từ",
    "meaning": "xấu"
  },
  {
    "stt": 395,
    "hanzi": "难受",
    "pinyin": "nánshòu",
    "type": "tính từ",
    "meaning": "khó chịu"
  },
  {
    "stt": 396,
    "hanzi": "难题",
    "pinyin": "Nántí",
    "type": "danh từ",
    "meaning": "vấn đề khó"
  },
  {
    "stt": 397,
    "hanzi": "难听",
    "pinyin": "nántīng",
    "type": "tính từ",
    "meaning": "khó nghe"
  },
  {
    "stt": 398,
    "hanzi": "能够",
    "pinyin": "nénggòu",
    "type": "động từ",
    "meaning": "có thể"
  },
  {
    "stt": 399,
    "hanzi": "年级",
    "pinyin": "niánjí",
    "type": "danh từ",
    "meaning": "khối lớp"
  },
  {
    "stt": 400,
    "hanzi": "年轻",
    "pinyin": "niánqīng",
    "type": "tính từ",
    "meaning": "trẻ"
  },
  {
    "stt": 401,
    "hanzi": "鸟",
    "pinyin": "Niǎo",
    "type": "danh từ",
    "meaning": "chim"
  },
  {
    "stt": 402,
    "hanzi": "弄",
    "pinyin": "Nòng",
    "type": "động từ",
    "meaning": "làm, khiến"
  },
  {
    "stt": 403,
    "hanzi": "努力",
    "pinyin": "Nǔlì",
    "type": "tính từ",
    "meaning": "nỗ lực"
  },
  {
    "stt": 404,
    "hanzi": "爬",
    "pinyin": "Pá",
    "type": "động từ",
    "meaning": "trèo"
  },
  {
    "stt": 405,
    "hanzi": "爬山",
    "pinyin": "pá shān",
    "type": "từ vựng",
    "meaning": "leo núi"
  },
  {
    "stt": 406,
    "hanzi": "怕",
    "pinyin": "Pà",
    "type": "động từ",
    "meaning": "sợ"
  },
  {
    "stt": 407,
    "hanzi": "排",
    "pinyin": "Pái",
    "type": "danh từ / lượng từ",
    "meaning": "hàng | hàng, dãy"
  },
  {
    "stt": 408,
    "hanzi": "排队",
    "pinyin": "páiduì",
    "type": "từ vựng",
    "meaning": "xếp hàng"
  },
  {
    "stt": 409,
    "hanzi": "排球",
    "pinyin": "páiqiú",
    "type": "danh từ",
    "meaning": "bóng chuyền"
  },
  {
    "stt": 410,
    "hanzi": "碰",
    "pinyin": "pèng",
    "type": "động từ",
    "meaning": "chạm vào"
  },
  {
    "stt": 411,
    "hanzi": "碰到",
    "pinyin": "pèngdào",
    "type": "từ vựng",
    "meaning": "đụng phải"
  },
  {
    "stt": 412,
    "hanzi": "碰见",
    "pinyin": "pèngjiàn",
    "type": "từ vựng",
    "meaning": "gặp phải"
  },
  {
    "stt": 413,
    "hanzi": "篇",
    "pinyin": "Piān",
    "type": "lượng từ",
    "meaning": "bài, mẩu"
  },
  {
    "stt": 414,
    "hanzi": "便宜",
    "pinyin": "piányi",
    "type": "tính từ / danh từ",
    "meaning": "rẻ, giá thấp | món hời, lợi thế, phần lợi"
  },
  {
    "stt": 415,
    "hanzi": "片",
    "pinyin": "Piàn",
    "type": "lượng từ",
    "meaning": "miếng, tấm"
  },
  {
    "stt": 416,
    "hanzi": "漂亮",
    "pinyin": "piàoliang",
    "type": "tính từ",
    "meaning": "đẹp"
  },
  {
    "stt": 417,
    "hanzi": "平",
    "pinyin": "Píng",
    "type": "tính từ",
    "meaning": "bằng phẳng"
  },
  {
    "stt": 418,
    "hanzi": "平安",
    "pinyin": "píngān",
    "type": "tính từ",
    "meaning": "bình an"
  },
  {
    "stt": 419,
    "hanzi": "平常",
    "pinyin": "píngcháng",
    "type": "danh từ / tính từ",
    "meaning": "ngày thường, lúc bình thường | bình thường, không có gì đặc biệt"
  },
  {
    "stt": 420,
    "hanzi": "平等",
    "pinyin": "píngděng",
    "type": "tính từ",
    "meaning": "bình đẳng"
  },
  {
    "stt": 421,
    "hanzi": "平时",
    "pinyin": "píngshí",
    "type": "danh từ",
    "meaning": "lúc bình thường"
  },
  {
    "stt": 422,
    "hanzi": "瓶",
    "pinyin": "Píng",
    "type": "danh từ / lượng từ",
    "meaning": "chai, lọ | bình, lọ, chai, hộp"
  },
  {
    "stt": 423,
    "hanzi": "瓶子",
    "pinyin": "píngzi",
    "type": "danh từ",
    "meaning": "cái chai"
  },
  {
    "stt": 424,
    "hanzi": "普通",
    "pinyin": "pǔtōng",
    "type": "tính từ",
    "meaning": "phổ thông"
  },
  {
    "stt": 425,
    "hanzi": "普通话",
    "pinyin": "pǔtōnghuà",
    "type": "danh từ",
    "meaning": "tiếng Phổ Thông"
  },
  {
    "stt": 426,
    "hanzi": "其他",
    "pinyin": "Qítā",
    "type": "đại từ",
    "meaning": "khác"
  },
  {
    "stt": 427,
    "hanzi": "其中",
    "pinyin": "qízhōng",
    "type": "danh từ",
    "meaning": "trong đó"
  },
  {
    "stt": 428,
    "hanzi": "骑",
    "pinyin": "Qí",
    "type": "động từ",
    "meaning": "cưỡi"
  },
  {
    "stt": 429,
    "hanzi": "骑车",
    "pinyin": "qí chē",
    "type": "từ vựng",
    "meaning": "đi xe đạp"
  },
  {
    "stt": 430,
    "hanzi": "起飞",
    "pinyin": "qǐfēi",
    "type": "động từ",
    "meaning": "cất cánh"
  },
  {
    "stt": 431,
    "hanzi": "气",
    "pinyin": "qì",
    "type": "động từ / danh từ",
    "meaning": "làm cho tức giận | khí, hơi, không khí"
  },
  {
    "stt": 432,
    "hanzi": "气温",
    "pinyin": "qìwēn",
    "type": "danh từ",
    "meaning": "nhiệt độ không khí"
  },
  {
    "stt": 433,
    "hanzi": "千",
    "pinyin": "Qiān",
    "type": "số từ",
    "meaning": "nghìn"
  },
  {
    "stt": 434,
    "hanzi": "千克",
    "pinyin": "qiānkè",
    "type": "lượng từ",
    "meaning": "kilogram"
  },
  {
    "stt": 435,
    "hanzi": "前年",
    "pinyin": "qiánnián",
    "type": "danh từ",
    "meaning": "năm kia"
  },
  {
    "stt": 436,
    "hanzi": "墙",
    "pinyin": "Qiáng",
    "type": "danh từ",
    "meaning": "tường"
  },
  {
    "stt": 437,
    "hanzi": "青年",
    "pinyin": "qīngnián",
    "type": "danh từ",
    "meaning": "thanh niên"
  },
  {
    "stt": 438,
    "hanzi": "青少年",
    "pinyin": "qīng-shàonián",
    "type": "danh từ",
    "meaning": "thanh thiếu niên"
  },
  {
    "stt": 439,
    "hanzi": "轻",
    "pinyin": "Qīng",
    "type": "tính từ",
    "meaning": "nhẹ"
  },
  {
    "stt": 440,
    "hanzi": "清楚",
    "pinyin": "qīngchu",
    "type": "tính từ",
    "meaning": "rõ ràng"
  },
  {
    "stt": 441,
    "hanzi": "晴",
    "pinyin": "Qíng",
    "type": "tính từ",
    "meaning": "trời nắng"
  },
  {
    "stt": 442,
    "hanzi": "晴天",
    "pinyin": "qíngtiān",
    "type": "danh từ",
    "meaning": "ngày nắng"
  },
  {
    "stt": 443,
    "hanzi": "请客",
    "pinyin": "qǐngkè",
    "type": "từ vựng",
    "meaning": "mời khách"
  },
  {
    "stt": 444,
    "hanzi": "请求",
    "pinyin": "qǐngqiú",
    "type": "động từ / danh từ",
    "meaning": "yêu cầu, đề nghị | yêu cầu"
  },
  {
    "stt": 445,
    "hanzi": "秋天",
    "pinyin": "qiūtiān",
    "type": "danh từ",
    "meaning": "mùa thu"
  },
  {
    "stt": 446,
    "hanzi": "求",
    "pinyin": "Qiú",
    "type": "động từ",
    "meaning": "cầu, xin"
  },
  {
    "stt": 447,
    "hanzi": "球场",
    "pinyin": "qiúchǎng",
    "type": "danh từ",
    "meaning": "sân bóng"
  },
  {
    "stt": 448,
    "hanzi": "球队",
    "pinyin": "qiúduì",
    "type": "danh từ",
    "meaning": "đội bóng"
  },
  {
    "stt": 449,
    "hanzi": "球鞋",
    "pinyin": "qiúxié",
    "type": "danh từ",
    "meaning": "giày thể thao"
  },
  {
    "stt": 450,
    "hanzi": "取",
    "pinyin": "Qǔ",
    "type": "động từ",
    "meaning": "lấy"
  },
  {
    "stt": 451,
    "hanzi": "取得",
    "pinyin": "qǔdé",
    "type": "động từ",
    "meaning": "đạt được"
  },
  {
    "stt": 452,
    "hanzi": "全",
    "pinyin": "Quán",
    "type": "phó từ / tính từ",
    "meaning": "hoàn toàn, hết sức, đầy đủ | toàn bộ, đầy đủ, sẵn sàng"
  },
  {
    "stt": 453,
    "hanzi": "全部",
    "pinyin": "quánbù",
    "type": "danh từ",
    "meaning": "tất cả"
  },
  {
    "stt": 454,
    "hanzi": "全国",
    "pinyin": "quánguó",
    "type": "danh từ",
    "meaning": "toàn quốc"
  },
  {
    "stt": 455,
    "hanzi": "全家",
    "pinyin": "quánjiā",
    "type": "danh từ",
    "meaning": "cả nhà"
  },
  {
    "stt": 456,
    "hanzi": "全年",
    "pinyin": "quánnián",
    "type": "danh từ",
    "meaning": "cả năm"
  },
  {
    "stt": 457,
    "hanzi": "全身",
    "pinyin": "quánshēn",
    "type": "danh từ",
    "meaning": "toàn thân"
  },
  {
    "stt": 458,
    "hanzi": "全体",
    "pinyin": "quántǐ",
    "type": "danh từ",
    "meaning": "toàn thể"
  },
  {
    "stt": 459,
    "hanzi": "然后",
    "pinyin": "ránhòu",
    "type": "liên từ",
    "meaning": "sau đó"
  },
  {
    "stt": 460,
    "hanzi": "让",
    "pinyin": "Ràng",
    "type": "động từ / giới từ",
    "meaning": "bảo, yêu cầu, khiến ai làm gì | bị, do, bởi"
  },
  {
    "stt": 461,
    "hanzi": "热情",
    "pinyin": "rèqíng",
    "type": "danh từ / tính từ",
    "meaning": "sự nhiệt tình, lòng nhiệt tình | nhiệt tình, thân thiện, niềm nở"
  },
  {
    "stt": 462,
    "hanzi": "人口",
    "pinyin": "rinkǒu",
    "type": "danh từ",
    "meaning": "dân số"
  },
  {
    "stt": 463,
    "hanzi": "人们",
    "pinyin": "rinmen",
    "type": "danh từ",
    "meaning": "mọi người"
  },
  {
    "stt": 464,
    "hanzi": "人数",
    "pinyin": "rinshù",
    "type": "danh từ",
    "meaning": "số người"
  },
  {
    "stt": 465,
    "hanzi": "认为",
    "pinyin": "rènwéi",
    "type": "động từ",
    "meaning": "cho rằng"
  },
  {
    "stt": 466,
    "hanzi": "日报",
    "pinyin": "Rìbào",
    "type": "danh từ",
    "meaning": "báo ngày, nhật báo"
  },
  {
    "stt": 467,
    "hanzi": "日子",
    "pinyin": "Rìzi",
    "type": "danh từ",
    "meaning": "ngày tháng"
  },
  {
    "stt": 468,
    "hanzi": "如果",
    "pinyin": "rúguǒ",
    "type": "liên từ",
    "meaning": "nếu như"
  },
  {
    "stt": 469,
    "hanzi": "入口",
    "pinyin": "Rùkǒu",
    "type": "danh từ",
    "meaning": "lối vào"
  },
  {
    "stt": 470,
    "hanzi": "商量",
    "pinyin": "shāngliang",
    "type": "động từ",
    "meaning": "thảo luận"
  },
  {
    "stt": 471,
    "hanzi": "商人",
    "pinyin": "shāngrén",
    "type": "danh từ",
    "meaning": "thương nhân"
  },
  {
    "stt": 472,
    "hanzi": "上周",
    "pinyin": "shàng zhōu",
    "type": "từ vựng",
    "meaning": "tuần trước"
  },
  {
    "stt": 473,
    "hanzi": "少数",
    "pinyin": "shǎoshù",
    "type": "danh từ",
    "meaning": "thiểu số"
  },
  {
    "stt": 474,
    "hanzi": "少年",
    "pinyin": "shàonián",
    "type": "danh từ",
    "meaning": "thiếu niên"
  },
  {
    "stt": 475,
    "hanzi": "身边",
    "pinyin": "shēnbiān",
    "type": "danh từ",
    "meaning": "bên cạnh"
  },
  {
    "stt": 476,
    "hanzi": "什么样",
    "pinyin": "shénmeyàng",
    "type": "đại từ",
    "meaning": "như thế nào"
  },
  {
    "stt": 477,
    "hanzi": "生",
    "pinyin": "shēng",
    "type": "động từ",
    "meaning": "sinh, sống"
  },
  {
    "stt": 478,
    "hanzi": "生词",
    "pinyin": "shēngcí",
    "type": "danh từ",
    "meaning": "từ mới"
  },
  {
    "stt": 479,
    "hanzi": "生活",
    "pinyin": "shēnghuó",
    "type": "danh từ / động từ",
    "meaning": "cuộc sống, đời sống, sinh hoạt | sống, sinh sống, sinh hoạt"
  },
  {
    "stt": 480,
    "hanzi": "声音",
    "pinyin": "shēngyīn",
    "type": "danh từ",
    "meaning": "âm thanh"
  },
  {
    "stt": 481,
    "hanzi": "省①",
    "pinyin": "shěng",
    "type": "danh từ",
    "meaning": "tỉnh"
  },
  {
    "stt": 482,
    "hanzi": "省②",
    "pinyin": "shěng",
    "type": "động từ",
    "meaning": "tiết kiệm"
  },
  {
    "stt": 483,
    "hanzi": "十分",
    "pinyin": "shífēn",
    "type": "phó từ",
    "meaning": "rất, vô cùng"
  },
  {
    "stt": 484,
    "hanzi": "实际",
    "pinyin": "Shíjì",
    "type": "danh từ / tính từ",
    "meaning": "thực tế, tình hình thực tế | thực tế, thực tiễn, có thật"
  },
  {
    "stt": 485,
    "hanzi": "实习",
    "pinyin": "Shíxí",
    "type": "động từ / danh từ",
    "meaning": "thực tập | kỳ thực tập, đợt thực tập"
  },
  {
    "stt": 486,
    "hanzi": "实现",
    "pinyin": "shíxiàn",
    "type": "động từ",
    "meaning": "thực hiện"
  },
  {
    "stt": 487,
    "hanzi": "实在",
    "pinyin": "shízài",
    "type": "phó từ",
    "meaning": "thực sự"
  },
  {
    "stt": 488,
    "hanzi": "实在",
    "pinyin": "shízai",
    "type": "tính từ",
    "meaning": "chân thật"
  },
  {
    "stt": 489,
    "hanzi": "食物",
    "pinyin": "shíwù",
    "type": "danh từ",
    "meaning": "thức ăn"
  },
  {
    "stt": 490,
    "hanzi": "使用",
    "pinyin": "shǐyòng",
    "type": "động từ",
    "meaning": "sử dụng"
  },
  {
    "stt": 491,
    "hanzi": "市",
    "pinyin": "Shì",
    "type": "danh từ",
    "meaning": "thành phố"
  },
  {
    "stt": 492,
    "hanzi": "市长",
    "pinyin": "shìzhǎng",
    "type": "danh từ",
    "meaning": "thị trưởng"
  },
  {
    "stt": 493,
    "hanzi": "事情",
    "pinyin": "shìqíng",
    "type": "danh từ",
    "meaning": "sự việc"
  },
  {
    "stt": 494,
    "hanzi": "收",
    "pinyin": "Shōu",
    "type": "động từ",
    "meaning": "thu, nhận"
  },
  {
    "stt": 495,
    "hanzi": "收到",
    "pinyin": "shōudào",
    "type": "từ vựng",
    "meaning": "nhận được"
  },
  {
    "stt": 496,
    "hanzi": "收入",
    "pinyin": "shōurù",
    "type": "động từ / danh từ",
    "meaning": "thu vào, nhận vào | thu nhập"
  },
  {
    "stt": 497,
    "hanzi": "手表",
    "pinyin": "shǒubiǎo",
    "type": "danh từ",
    "meaning": "đồng hồ đeo tay"
  },
  {
    "stt": 498,
    "hanzi": "受到",
    "pinyin": "shòudào",
    "type": "từ vựng",
    "meaning": "chịu, nhận"
  },
  {
    "stt": 499,
    "hanzi": "舒服",
    "pinyin": "Shūfu",
    "type": "tính từ",
    "meaning": "thoải mái"
  },
  {
    "stt": 500,
    "hanzi": "熟",
    "pinyin": "shú / shóu",
    "type": "tính từ",
    "meaning": "quen / chín / thành thạo, thuần thục"
  },
  {
    "stt": 501,
    "hanzi": "数",
    "pinyin": "Shǔ",
    "type": "động từ",
    "meaning": "đếm"
  },
  {
    "stt": 502,
    "hanzi": "数字",
    "pinyin": "Shùzì",
    "type": "danh từ",
    "meaning": "chữ số"
  },
  {
    "stt": 503,
    "hanzi": "水平",
    "pinyin": "shuǐpíng",
    "type": "danh từ",
    "meaning": "trình độ"
  },
  {
    "stt": 504,
    "hanzi": "顺利",
    "pinyin": "shùnlì",
    "type": "tính từ",
    "meaning": "thuận lợi"
  },
  {
    "stt": 505,
    "hanzi": "说明",
    "pinyin": "shuōmíng",
    "type": "động từ / danh từ",
    "meaning": "giải thích, trình bày, làm rõ | lời giải thích, hướng dẫn"
  },
  {
    "stt": 506,
    "hanzi": "司机",
    "pinyin": "Sījī",
    "type": "danh từ",
    "meaning": "tài xế"
  },
  {
    "stt": 507,
    "hanzi": "送到",
    "pinyin": "sòngdào",
    "type": "từ vựng",
    "meaning": "gửi đến"
  },
  {
    "stt": 508,
    "hanzi": "送给",
    "pinyin": "sòng gěi",
    "type": "từ vựng",
    "meaning": "tặng cho"
  },
  {
    "stt": 509,
    "hanzi": "算",
    "pinyin": "Suàn",
    "type": "động từ",
    "meaning": "tính toán"
  },
  {
    "stt": 510,
    "hanzi": "虽然",
    "pinyin": "suīrán",
    "type": "liên từ",
    "meaning": "mặc dù"
  },
  {
    "stt": 511,
    "hanzi": "随便",
    "pinyin": "suíbiàn",
    "type": "tính từ",
    "meaning": "tuỳ ý"
  },
  {
    "stt": 512,
    "hanzi": "随时",
    "pinyin": "suíshí",
    "type": "phó từ",
    "meaning": "bất cứ lúc nào"
  },
  {
    "stt": 513,
    "hanzi": "所以",
    "pinyin": "Suǒyǐ",
    "type": "liên từ",
    "meaning": "vì vậy"
  },
  {
    "stt": 514,
    "hanzi": "所有",
    "pinyin": "suǒyǒu",
    "type": "tính từ",
    "meaning": "tất cả"
  },
  {
    "stt": 515,
    "hanzi": "它",
    "pinyin": "Tā",
    "type": "đại từ",
    "meaning": "nó"
  },
  {
    "stt": 516,
    "hanzi": "它们",
    "pinyin": "tāmen",
    "type": "đại từ",
    "meaning": "chúng nó"
  },
  {
    "stt": 517,
    "hanzi": "太太",
    "pinyin": "tàitai",
    "type": "danh từ",
    "meaning": "bà, vợ"
  },
  {
    "stt": 518,
    "hanzi": "太阳",
    "pinyin": "tàiyáng",
    "type": "danh từ",
    "meaning": "mặt trời"
  },
  {
    "stt": 519,
    "hanzi": "态度",
    "pinyin": "tàidù",
    "type": "danh từ",
    "meaning": "thái độ"
  },
  {
    "stt": 520,
    "hanzi": "讨论",
    "pinyin": "tǎolùn",
    "type": "động từ",
    "meaning": "thảo luận"
  },
  {
    "stt": 521,
    "hanzi": "套",
    "pinyin": "Tào",
    "type": "lượng từ",
    "meaning": "bộ"
  },
  {
    "stt": 522,
    "hanzi": "特别",
    "pinyin": "tèbié",
    "type": "tính từ / phó từ",
    "meaning": "đặc biệt | vô cùng, đặc biệt"
  },
  {
    "stt": 523,
    "hanzi": "特点",
    "pinyin": "tèdiǎn",
    "type": "danh từ",
    "meaning": "đặc điểm"
  },
  {
    "stt": 524,
    "hanzi": "疼",
    "pinyin": "téng",
    "type": "động từ",
    "meaning": "đau"
  },
  {
    "stt": 525,
    "hanzi": "提",
    "pinyin": "Tí",
    "type": "động từ",
    "meaning": "xách, cầm, đề cập, nêu ra"
  },
  {
    "stt": 526,
    "hanzi": "提出",
    "pinyin": "Tíchū",
    "type": "từ vựng",
    "meaning": "đề xuất"
  },
  {
    "stt": 527,
    "hanzi": "提到",
    "pinyin": "Tídào",
    "type": "từ vựng",
    "meaning": "nhắc đến"
  },
  {
    "stt": 528,
    "hanzi": "提高",
    "pinyin": "tígāo",
    "type": "từ vựng",
    "meaning": "nâng cao"
  },
  {
    "stt": 529,
    "hanzi": "题",
    "pinyin": "Tí",
    "type": "danh từ",
    "meaning": "đề (bài)"
  },
  {
    "stt": 530,
    "hanzi": "体育",
    "pinyin": "Tǐyù",
    "type": "danh từ",
    "meaning": "thể dục"
  },
  {
    "stt": 531,
    "hanzi": "体育场",
    "pinyin": "tǐyùchǎng",
    "type": "danh từ",
    "meaning": "sân vận động"
  },
  {
    "stt": 532,
    "hanzi": "体育馆",
    "pinyin": "tǐyùguǎn",
    "type": "danh từ",
    "meaning": "nhà thi đấu"
  },
  {
    "stt": 533,
    "hanzi": "天上",
    "pinyin": "tiānshàng",
    "type": "danh từ",
    "meaning": "trên trời"
  },
  {
    "stt": 534,
    "hanzi": "条",
    "pinyin": "Tiáo",
    "type": "lượng từ",
    "meaning": "cái, chiếc (dài)"
  },
  {
    "stt": 535,
    "hanzi": "条件",
    "pinyin": "tiáojiàn",
    "type": "danh từ",
    "meaning": "điều kiện"
  },
  {
    "stt": 536,
    "hanzi": "听讲",
    "pinyin": "tīngjiǎng",
    "type": "từ vựng",
    "meaning": "nghe giảng"
  },
  {
    "stt": 537,
    "hanzi": "听说",
    "pinyin": "tīngshuō",
    "type": "động từ",
    "meaning": "nghe nói"
  },
  {
    "stt": 538,
    "hanzi": "停",
    "pinyin": "Tíng",
    "type": "động từ",
    "meaning": "dừng"
  },
  {
    "stt": 539,
    "hanzi": "停车",
    "pinyin": "tíngchē",
    "type": "từ vựng",
    "meaning": "đỗ xe"
  },
  {
    "stt": 540,
    "hanzi": "停车场",
    "pinyin": "tíngchēchǎng",
    "type": "danh từ",
    "meaning": "bãi đỗ xe"
  },
  {
    "stt": 541,
    "hanzi": "挺",
    "pinyin": "Tǐng",
    "type": "phó từ",
    "meaning": "rất/khá"
  },
  {
    "stt": 542,
    "hanzi": "挺好",
    "pinyin": "tǐng hǎo",
    "type": "từ vựng",
    "meaning": "rất tốt"
  },
  {
    "stt": 543,
    "hanzi": "通",
    "pinyin": "Tōng",
    "type": "động từ / tính từ",
    "meaning": "thông qua, hiểu | thuận lợi"
  },
  {
    "stt": 544,
    "hanzi": "通过",
    "pinyin": "tōngguò",
    "type": "giới từ / động từ",
    "meaning": "thông qua, bằng cách, nhờ vào | đi qua, vượt qua, đỗ"
  },
  {
    "stt": 545,
    "hanzi": "通知",
    "pinyin": "tōngzhī",
    "type": "động từ / danh từ",
    "meaning": "thông báo, báo cho biết | thông báo (văn bản, nội dung thông báo)"
  },
  {
    "stt": 546,
    "hanzi": "同时",
    "pinyin": "tóngshí",
    "type": "liên từ / danh từ",
    "meaning": "đồng thời, cùng lúc | cùng lúc, trong khi"
  },
  {
    "stt": 547,
    "hanzi": "同事",
    "pinyin": "tóngshì",
    "type": "danh từ",
    "meaning": "đồng nghiệp"
  },
  {
    "stt": 548,
    "hanzi": "同样",
    "pinyin": "tóngyàng",
    "type": "tính từ / liên từ",
    "meaning": "giống nhau, như nhau, tương tự | cũng, tương tự như"
  },
  {
    "stt": 549,
    "hanzi": "头",
    "pinyin": "Tóu",
    "type": "danh từ / lượng từ",
    "meaning": "đầu, phần đầu | dùng để đếm gia súc, vật nuôi lớn (trâu,"
  },
  {
    "stt": 550,
    "hanzi": "头（里头）",
    "pinyin": "tou (lǐtou)",
    "type": "từ vựng",
    "meaning": "hậu tố | bên trong"
  },
  {
    "stt": 551,
    "hanzi": "头发",
    "pinyin": "Tóufa",
    "type": "danh từ",
    "meaning": "tóc"
  },
  {
    "stt": 552,
    "hanzi": "图片",
    "pinyin": "túpiàn",
    "type": "danh từ",
    "meaning": "hình ảnh"
  },
  {
    "stt": 553,
    "hanzi": "推",
    "pinyin": "Tuī",
    "type": "động từ",
    "meaning": "đẩy"
  },
  {
    "stt": 554,
    "hanzi": "腿",
    "pinyin": "Tuǐ",
    "type": "danh từ",
    "meaning": "chân"
  },
  {
    "stt": 555,
    "hanzi": "外地",
    "pinyin": "wàidì",
    "type": "danh từ",
    "meaning": "ngoại tỉnh/nơi khác"
  },
  {
    "stt": 556,
    "hanzi": "外卖",
    "pinyin": "wàimài",
    "type": "danh từ / động từ",
    "meaning": "đồ ăn giao tận nơi, suất ăn mang về | giao đồ ăn"
  },
  {
    "stt": 557,
    "hanzi": "完",
    "pinyin": "Wán",
    "type": "động từ",
    "meaning": "xong"
  },
  {
    "stt": 558,
    "hanzi": "完成",
    "pinyin": "wánchéng",
    "type": "từ vựng",
    "meaning": "hoàn thành"
  },
  {
    "stt": 559,
    "hanzi": "完全",
    "pinyin": "wánquán",
    "type": "tính từ / phó từ",
    "meaning": "hoàn toàn, trọn vẹn, đầy đủ | hoàn toàn, tuyệt đối"
  },
  {
    "stt": 560,
    "hanzi": "晚安",
    "pinyin": "wǎn’ān",
    "type": "động từ",
    "meaning": "chúc ngủ ngon"
  },
  {
    "stt": 561,
    "hanzi": "晚报",
    "pinyin": "wǎnbào",
    "type": "danh từ",
    "meaning": "báo buổi tối"
  },
  {
    "stt": 562,
    "hanzi": "晚餐",
    "pinyin": "wǎncān",
    "type": "danh từ",
    "meaning": "bữa tối"
  },
  {
    "stt": 563,
    "hanzi": "晚会",
    "pinyin": "wǎnhuì",
    "type": "danh từ",
    "meaning": "dạ hội"
  },
  {
    "stt": 564,
    "hanzi": "碗",
    "pinyin": "Wǎn",
    "type": "danh từ",
    "meaning": "bát"
  },
  {
    "stt": 565,
    "hanzi": "万",
    "pinyin": "Wàn",
    "type": "số từ",
    "meaning": "mười nghìn"
  },
  {
    "stt": 566,
    "hanzi": "网",
    "pinyin": "Wǎng",
    "type": "danh từ",
    "meaning": "mạng/lưới"
  },
  {
    "stt": 567,
    "hanzi": "网球",
    "pinyin": "wǎngqiú",
    "type": "danh từ",
    "meaning": "quần vợt"
  },
  {
    "stt": 568,
    "hanzi": "网站",
    "pinyin": "wǎngzhàn",
    "type": "danh từ",
    "meaning": "trang web"
  },
  {
    "stt": 569,
    "hanzi": "往",
    "pinyin": "Wǎng",
    "type": "động từ / giới từ",
    "meaning": "đi tới, hướng về | vào, tới (nói về phương hướng)"
  },
  {
    "stt": 570,
    "hanzi": "为",
    "pinyin": "wéi",
    "type": "giới từ",
    "meaning": "vì/cho"
  },
  {
    "stt": 571,
    "hanzi": "为什么",
    "pinyin": "wèi shénme",
    "type": "từ vựng",
    "meaning": "tại sao"
  },
  {
    "stt": 572,
    "hanzi": "位",
    "pinyin": "wèi",
    "type": "lượng từ",
    "meaning": "dùng để chỉ người (vị, người)"
  },
  {
    "stt": 573,
    "hanzi": "味道",
    "pinyin": "wèi·dào",
    "type": "danh từ",
    "meaning": "mùi vị"
  },
  {
    "stt": 574,
    "hanzi": "喂",
    "pinyin": "wèi",
    "type": "thán từ",
    "meaning": "alo/này"
  },
  {
    "stt": 575,
    "hanzi": "温度",
    "pinyin": "wēndù",
    "type": "danh từ",
    "meaning": "nhiệt độ"
  },
  {
    "stt": 576,
    "hanzi": "闻",
    "pinyin": "wén",
    "type": "động từ",
    "meaning": "ngửi/nghe thấy"
  },
  {
    "stt": 577,
    "hanzi": "问路",
    "pinyin": "wènlù",
    "type": "động từ",
    "meaning": "hỏi đường"
  },
  {
    "stt": 578,
    "hanzi": "问题",
    "pinyin": "wèntí",
    "type": "danh từ",
    "meaning": "vấn đề"
  },
  {
    "stt": 579,
    "hanzi": "午餐",
    "pinyin": "wǔcān",
    "type": "danh từ",
    "meaning": "bữa trưa"
  },
  {
    "stt": 580,
    "hanzi": "午睡",
    "pinyin": "wǔshuì",
    "type": "danh từ / động từ",
    "meaning": "giấc ngủ trưa | ngủ trưa"
  },
  {
    "stt": 581,
    "hanzi": "西北",
    "pinyin": "xīběi",
    "type": "danh từ",
    "meaning": "tây bắc, hướng tây bắc"
  },
  {
    "stt": 582,
    "hanzi": "西餐",
    "pinyin": "Xīcān",
    "type": "danh từ",
    "meaning": "đồ ăn phương tây"
  },
  {
    "stt": 583,
    "hanzi": "西方",
    "pinyin": "xīfāng",
    "type": "danh từ",
    "meaning": "phía tây, phương tây"
  },
  {
    "stt": 584,
    "hanzi": "西南",
    "pinyin": "Xīnán",
    "type": "danh từ",
    "meaning": "tây nam, hướng tây nam"
  },
  {
    "stt": 585,
    "hanzi": "西医",
    "pinyin": "Xīyī",
    "type": "danh từ",
    "meaning": "tây y"
  },
  {
    "stt": 586,
    "hanzi": "习惯",
    "pinyin": "xíguàn",
    "type": "danh từ / động từ",
    "meaning": "thói quen, tập quán | quen với, thích nghi với"
  },
  {
    "stt": 587,
    "hanzi": "洗衣机",
    "pinyin": "Xǐyījī",
    "type": "danh từ",
    "meaning": "máy giặt"
  },
  {
    "stt": 588,
    "hanzi": "洗澡",
    "pinyin": "xǐzǎo",
    "type": "từ vựng",
    "meaning": "tắm"
  },
  {
    "stt": 589,
    "hanzi": "下",
    "pinyin": "Xià",
    "type": "lượng từ",
    "meaning": "lần"
  },
  {
    "stt": 590,
    "hanzi": "下雪",
    "pinyin": "xià xuě",
    "type": "từ vựng",
    "meaning": "tuyết rơi"
  },
  {
    "stt": 591,
    "hanzi": "下周",
    "pinyin": "xià zhōu",
    "type": "từ vựng",
    "meaning": "tuần sau"
  },
  {
    "stt": 592,
    "hanzi": "夏天",
    "pinyin": "xiàtiān",
    "type": "danh từ",
    "meaning": "mùa hè"
  },
  {
    "stt": 593,
    "hanzi": "相同",
    "pinyin": "xiāngtóng",
    "type": "tính từ",
    "meaning": "giống nhau"
  },
  {
    "stt": 594,
    "hanzi": "相信",
    "pinyin": "xiāngxìn",
    "type": "động từ",
    "meaning": "tin tưởng"
  },
  {
    "stt": 595,
    "hanzi": "响",
    "pinyin": "Xiǎng",
    "type": "tính từ",
    "meaning": "to (âm thanh)"
  },
  {
    "stt": 596,
    "hanzi": "想到",
    "pinyin": "xiǎngdào",
    "type": "động từ",
    "meaning": "nghĩ đến"
  },
  {
    "stt": 597,
    "hanzi": "想法",
    "pinyin": "xiǎngfǎ",
    "type": "danh từ",
    "meaning": "ý tưởng"
  },
  {
    "stt": 598,
    "hanzi": "想起",
    "pinyin": "xiǎngqǐ",
    "type": "động từ",
    "meaning": "nhớ lại"
  },
  {
    "stt": 599,
    "hanzi": "向",
    "pinyin": "Xiàng",
    "type": "giới từ / động từ",
    "meaning": "về | hướng về, nhìn về"
  },
  {
    "stt": 600,
    "hanzi": "相机",
    "pinyin": "xiàngjī",
    "type": "danh từ",
    "meaning": "máy ảnh"
  },
  {
    "stt": 601,
    "hanzi": "像",
    "pinyin": "Xiàng",
    "type": "động từ",
    "meaning": "giống"
  },
  {
    "stt": 602,
    "hanzi": "小(小王)",
    "pinyin": "xiǎo (Xiǎo Wáng) tiền tố",
    "type": "từ vựng",
    "meaning": "⼩ + họ dùng để gọi thân mật"
  },
  {
    "stt": 603,
    "hanzi": "小声",
    "pinyin": "xiǎo shēng",
    "type": "từ vựng",
    "meaning": "nói nhỏ, nói khẽ, nhỏ giọng"
  },
  {
    "stt": 604,
    "hanzi": "小时候",
    "pinyin": "xiǎoshíhou",
    "type": "danh từ",
    "meaning": "lúc nhỏ"
  },
  {
    "stt": 605,
    "hanzi": "小说",
    "pinyin": "xiǎoshuō",
    "type": "danh từ",
    "meaning": "tiểu thuyết"
  },
  {
    "stt": 606,
    "hanzi": "小心",
    "pinyin": "xiǎoxīn",
    "type": "tính từ / động từ",
    "meaning": "cẩn thận, thận trọng | cẩn thận, coi chừng, đề phòng"
  },
  {
    "stt": 607,
    "hanzi": "小组",
    "pinyin": "xiǎozǔ",
    "type": "danh từ",
    "meaning": "nhóm"
  },
  {
    "stt": 608,
    "hanzi": "校园",
    "pinyin": "xiàoyuán",
    "type": "danh từ",
    "meaning": "khuôn viên trường"
  },
  {
    "stt": 609,
    "hanzi": "校长",
    "pinyin": "xiàozhǎng",
    "type": "danh từ",
    "meaning": "hiệu trưởng"
  },
  {
    "stt": 610,
    "hanzi": "笑话",
    "pinyin": "xiàohua",
    "type": "động từ",
    "meaning": "truyện cười"
  },
  {
    "stt": 611,
    "hanzi": "笑话儿",
    "pinyin": "xiàohuar",
    "type": "danh từ",
    "meaning": "trò đùa"
  },
  {
    "stt": 612,
    "hanzi": "鞋",
    "pinyin": "xié",
    "type": "danh từ",
    "meaning": "giày"
  },
  {
    "stt": 613,
    "hanzi": "心里",
    "pinyin": "xīnlǐ",
    "type": "danh từ",
    "meaning": "trong lòng"
  },
  {
    "stt": 614,
    "hanzi": "心情",
    "pinyin": "xīnqíng",
    "type": "danh từ",
    "meaning": "tâm trạng"
  },
  {
    "stt": 615,
    "hanzi": "心中",
    "pinyin": "xīnzhōng",
    "type": "danh từ",
    "meaning": "trong tim"
  },
  {
    "stt": 616,
    "hanzi": "新闻",
    "pinyin": "xīnwén",
    "type": "danh từ",
    "meaning": "tin tức"
  },
  {
    "stt": 617,
    "hanzi": "信",
    "pinyin": "xìn",
    "type": "danh từ",
    "meaning": "tin"
  },
  {
    "stt": 618,
    "hanzi": "信号",
    "pinyin": "xìnhào",
    "type": "danh từ",
    "meaning": "tín hiệu"
  },
  {
    "stt": 619,
    "hanzi": "信息",
    "pinyin": "xìnxī",
    "type": "danh từ",
    "meaning": "thông tin"
  },
  {
    "stt": 620,
    "hanzi": "信心",
    "pinyin": "xìnxīn",
    "type": "danh từ",
    "meaning": "niềm tin"
  },
  {
    "stt": 621,
    "hanzi": "信用卡",
    "pinyin": "xìnyòngkă",
    "type": "danh từ",
    "meaning": "thẻ tín dụng"
  },
  {
    "stt": 622,
    "hanzi": "星星",
    "pinyin": "xīngxing",
    "type": "danh từ",
    "meaning": "ngôi sao"
  },
  {
    "stt": 623,
    "hanzi": "行动",
    "pinyin": "xíngdòng",
    "type": "động từ / danh từ",
    "meaning": "hành động, bắt tay vào làm | hành động, hoạt động"
  },
  {
    "stt": 624,
    "hanzi": "行人",
    "pinyin": "xíngrén",
    "type": "danh từ",
    "meaning": "người đi đường"
  },
  {
    "stt": 625,
    "hanzi": "行为",
    "pinyin": "xíngwéi",
    "type": "danh từ",
    "meaning": "hành vi"
  },
  {
    "stt": 626,
    "hanzi": "姓",
    "pinyin": "xìng",
    "type": "danh từ / động từ",
    "meaning": "họ (tên họ) | mang họ là…, họ là…"
  },
  {
    "stt": 627,
    "hanzi": "姓名",
    "pinyin": "xìngmíng",
    "type": "danh từ",
    "meaning": "họ tên"
  },
  {
    "stt": 628,
    "hanzi": "休假",
    "pinyin": "xiūjià",
    "type": "từ vựng",
    "meaning": "nghỉ phép"
  },
  {
    "stt": 629,
    "hanzi": "许多",
    "pinyin": "xŭduō",
    "type": "số từ",
    "meaning": "nhiều"
  },
  {
    "stt": 630,
    "hanzi": "选",
    "pinyin": "xuăn",
    "type": "động từ",
    "meaning": "chọn"
  },
  {
    "stt": 631,
    "hanzi": "学期",
    "pinyin": "xuéqī",
    "type": "danh từ",
    "meaning": "học kỳ"
  },
  {
    "stt": 632,
    "hanzi": "雪",
    "pinyin": "xuě",
    "type": "danh từ",
    "meaning": "tuyết"
  },
  {
    "stt": 633,
    "hanzi": "颜色",
    "pinyin": "yánsè",
    "type": "danh từ",
    "meaning": "màu sắc"
  },
  {
    "stt": 634,
    "hanzi": "眼",
    "pinyin": "yăn",
    "type": "danh từ / lượng từ",
    "meaning": "mắt | cái, miệng (dùng cho giếng)"
  },
  {
    "stt": 635,
    "hanzi": "眼睛",
    "pinyin": "yănjing",
    "type": "danh từ",
    "meaning": "đôi mắt"
  },
  {
    "stt": 636,
    "hanzi": "养",
    "pinyin": "yăng",
    "type": "động từ",
    "meaning": "nuôi"
  },
  {
    "stt": 637,
    "hanzi": "样子",
    "pinyin": "yàngzi",
    "type": "danh từ",
    "meaning": "dáng vẻ"
  },
  {
    "stt": 638,
    "hanzi": "要求",
    "pinyin": "yāoqiú",
    "type": "động từ / danh từ",
    "meaning": "yêu cầu, đòi hỏi | nguyện vọng, yêu cầu, đòi hỏi"
  },
  {
    "stt": 639,
    "hanzi": "药",
    "pinyin": "yào",
    "type": "danh từ",
    "meaning": "thuốc"
  },
  {
    "stt": 640,
    "hanzi": "药店",
    "pinyin": "yàodiàn",
    "type": "danh từ",
    "meaning": "hiệu thuốc"
  },
  {
    "stt": 641,
    "hanzi": "药片",
    "pinyin": "yàopiàn",
    "type": "danh từ",
    "meaning": "thuốc viên"
  },
  {
    "stt": 642,
    "hanzi": "药水",
    "pinyin": "yàoshuĭ",
    "type": "danh từ",
    "meaning": "thuốc nước"
  },
  {
    "stt": 643,
    "hanzi": "也许",
    "pinyin": "yěxǔ",
    "type": "phó từ",
    "meaning": "có lẽ"
  },
  {
    "stt": 644,
    "hanzi": "夜",
    "pinyin": "yè",
    "type": "danh từ",
    "meaning": "đêm"
  },
  {
    "stt": 645,
    "hanzi": "夜里",
    "pinyin": "yèlǐ",
    "type": "danh từ",
    "meaning": "ban đêm"
  },
  {
    "stt": 646,
    "hanzi": "一部分",
    "pinyin": "yī bùfèn",
    "type": "danh từ",
    "meaning": "một phần"
  },
  {
    "stt": 647,
    "hanzi": "一定",
    "pinyin": "yídìng",
    "type": "tính từ / phó từ",
    "meaning": "nhất định, cố định, xác định | nhất định, chắc chắn"
  },
  {
    "stt": 648,
    "hanzi": "一共",
    "pinyin": "yígòng",
    "type": "phó từ",
    "meaning": "tổng cộng"
  },
  {
    "stt": 649,
    "hanzi": "一会儿",
    "pinyin": "yíhuìr",
    "type": "phó từ",
    "meaning": "một lúc"
  },
  {
    "stt": 650,
    "hanzi": "一路平安",
    "pinyin": "yílù-píng’ān",
    "type": "từ vựng",
    "meaning": "thượng lộ bình an"
  },
  {
    "stt": 651,
    "hanzi": "一路顺风",
    "pinyin": "yīlù-shùnfēng",
    "type": "từ vựng",
    "meaning": "thuận buồm xuôi gió"
  },
  {
    "stt": 652,
    "hanzi": "已经",
    "pinyin": "yĭjīng",
    "type": "phó từ",
    "meaning": "đã"
  },
  {
    "stt": 653,
    "hanzi": "以后",
    "pinyin": "yĭhòu",
    "type": "danh từ",
    "meaning": "sau này"
  },
  {
    "stt": 654,
    "hanzi": "以前",
    "pinyin": "yĭqián",
    "type": "danh từ",
    "meaning": "trước đây"
  },
  {
    "stt": 655,
    "hanzi": "以上",
    "pinyin": "yĭshàng",
    "type": "danh từ",
    "meaning": "trở lên"
  },
  {
    "stt": 656,
    "hanzi": "以外",
    "pinyin": "yĭwài",
    "type": "danh từ",
    "meaning": "ngoài ra"
  },
  {
    "stt": 657,
    "hanzi": "以为",
    "pinyin": "yǐwéi",
    "type": "động từ",
    "meaning": "cho rằng"
  },
  {
    "stt": 658,
    "hanzi": "以下",
    "pinyin": "yĭxià",
    "type": "danh từ",
    "meaning": "phía dưới"
  },
  {
    "stt": 659,
    "hanzi": "椅子",
    "pinyin": "yĭzi",
    "type": "danh từ",
    "meaning": "ghế"
  },
  {
    "stt": 660,
    "hanzi": "一般",
    "pinyin": "yībān",
    "type": "tính từ",
    "meaning": "thông thường"
  },
  {
    "stt": 661,
    "hanzi": "一点点",
    "pinyin": "yìdiăndiăn",
    "type": "từ vựng",
    "meaning": "một ít"
  },
  {
    "stt": 662,
    "hanzi": "一生",
    "pinyin": "yīshēng",
    "type": "danh từ",
    "meaning": "cả đời"
  },
  {
    "stt": 663,
    "hanzi": "一直",
    "pinyin": "yìzhí",
    "type": "phó từ",
    "meaning": "luôn luôn"
  },
  {
    "stt": 664,
    "hanzi": "亿",
    "pinyin": "yì",
    "type": "số từ",
    "meaning": "tỷ"
  },
  {
    "stt": 665,
    "hanzi": "意见",
    "pinyin": "yìjiàn",
    "type": "danh từ",
    "meaning": "ý kiến"
  },
  {
    "stt": 666,
    "hanzi": "意思",
    "pinyin": "yìsi",
    "type": "danh từ",
    "meaning": "ý nghĩa"
  },
  {
    "stt": 667,
    "hanzi": "因为",
    "pinyin": "yīnwèi",
    "type": "liên từ / giới từ",
    "meaning": "vì, do, bởi vì | bởi vì"
  },
  {
    "stt": 668,
    "hanzi": "阴",
    "pinyin": "yīn",
    "type": "tính từ",
    "meaning": "âm u"
  },
  {
    "stt": 669,
    "hanzi": "阴天",
    "pinyin": "yīntiān",
    "type": "danh từ",
    "meaning": "trời âm u"
  },
  {
    "stt": 670,
    "hanzi": "音乐节",
    "pinyin": "yīnyuèjié",
    "type": "danh từ",
    "meaning": "lễ hội âm nhạc"
  },
  {
    "stt": 671,
    "hanzi": "音乐",
    "pinyin": "yīnyuè",
    "type": "danh từ",
    "meaning": "âm nhạc"
  },
  {
    "stt": 672,
    "hanzi": "音乐会",
    "pinyin": "yīnyuèhuì",
    "type": "danh từ",
    "meaning": "buổi hòa nhạc"
  },
  {
    "stt": 673,
    "hanzi": "银行",
    "pinyin": "yínháng",
    "type": "danh từ",
    "meaning": "ngân hàng"
  },
  {
    "stt": 674,
    "hanzi": "银行卡",
    "pinyin": "yínhángkă",
    "type": "danh từ",
    "meaning": "thẻ ngân hàng"
  },
  {
    "stt": 675,
    "hanzi": "应该",
    "pinyin": "yīnggāi",
    "type": "động từ",
    "meaning": "nên"
  },
  {
    "stt": 676,
    "hanzi": "英文",
    "pinyin": "Yīngwén",
    "type": "danh từ",
    "meaning": "tiếng Anh (văn viết)"
  },
  {
    "stt": 677,
    "hanzi": "英语",
    "pinyin": "yīngyŭ",
    "type": "danh từ",
    "meaning": "tiếng Anh"
  },
  {
    "stt": 678,
    "hanzi": "影片",
    "pinyin": "yǐngpiàn",
    "type": "danh từ",
    "meaning": "phim"
  },
  {
    "stt": 679,
    "hanzi": "影响",
    "pinyin": "yǐngxiăng",
    "type": "động từ / danh từ",
    "meaning": "ảnh hưởng, tác động đến | sự ảnh hưởng, tác động"
  },
  {
    "stt": 680,
    "hanzi": "永远",
    "pinyin": "yǒngyuăn",
    "type": "phó từ",
    "meaning": "mãi mãi"
  },
  {
    "stt": 681,
    "hanzi": "油",
    "pinyin": "yóu",
    "type": "danh từ",
    "meaning": "dầu"
  },
  {
    "stt": 682,
    "hanzi": "游客",
    "pinyin": "yóukè",
    "type": "danh từ",
    "meaning": "khách du lịch"
  },
  {
    "stt": 683,
    "hanzi": "友好",
    "pinyin": "yŏuhăo",
    "type": "tính từ",
    "meaning": "thân thiện"
  },
  {
    "stt": 684,
    "hanzi": "有空儿",
    "pinyin": "yŏukòngr",
    "type": "động từ",
    "meaning": "rảnh"
  },
  {
    "stt": 685,
    "hanzi": "有人",
    "pinyin": "yǒurén",
    "type": "từ vựng",
    "meaning": "có người"
  },
  {
    "stt": 686,
    "hanzi": "有(一点儿)",
    "pinyin": "yŏu(yìdiănr)",
    "type": "phó từ",
    "meaning": "hơi, một chút"
  },
  {
    "stt": 687,
    "hanzi": "有意思",
    "pinyin": "yŏu yìsi",
    "type": "từ vựng",
    "meaning": "thú vị"
  },
  {
    "stt": 688,
    "hanzi": "又",
    "pinyin": "yòu",
    "type": "phó từ",
    "meaning": "lại"
  },
  {
    "stt": 689,
    "hanzi": "鱼",
    "pinyin": "yú",
    "type": "danh từ",
    "meaning": "cá"
  },
  {
    "stt": 690,
    "hanzi": "语言",
    "pinyin": "yŭyán",
    "type": "danh từ",
    "meaning": "ngôn ngữ"
  },
  {
    "stt": 691,
    "hanzi": "原来",
    "pinyin": "yuánlái",
    "type": "tính từ / phó từ",
    "meaning": "ban đầu, vốn dĩ | thì ra là…, hóa ra là…"
  },
  {
    "stt": 692,
    "hanzi": "原因",
    "pinyin": "yuányīn",
    "type": "danh từ",
    "meaning": "nguyên nhân"
  },
  {
    "stt": 693,
    "hanzi": "院",
    "pinyin": "yuàn",
    "type": "danh từ",
    "meaning": "viện"
  },
  {
    "stt": 694,
    "hanzi": "院长",
    "pinyin": "yuànzhăng",
    "type": "danh từ",
    "meaning": "viện trưởng"
  },
  {
    "stt": 695,
    "hanzi": "院子",
    "pinyin": "yuànzi",
    "type": "danh từ",
    "meaning": "sân, sân nhà"
  },
  {
    "stt": 696,
    "hanzi": "愿意",
    "pinyin": "yuànyì",
    "type": "động từ",
    "meaning": "đồng ý, bằng lòng"
  },
  {
    "stt": 697,
    "hanzi": "月份",
    "pinyin": "yuèfèn",
    "type": "danh từ",
    "meaning": "tháng"
  },
  {
    "stt": 698,
    "hanzi": "月亮",
    "pinyin": "yuèliàng",
    "type": "danh từ",
    "meaning": "mặt trăng"
  },
  {
    "stt": 699,
    "hanzi": "越",
    "pinyin": "yuè",
    "type": "phó từ",
    "meaning": "càng"
  },
  {
    "stt": 700,
    "hanzi": "越来越",
    "pinyin": "yuè lái yuè",
    "type": "từ vựng",
    "meaning": "ngày càng"
  },
  {
    "stt": 701,
    "hanzi": "云",
    "pinyin": "yún",
    "type": "danh từ",
    "meaning": "mây"
  },
  {
    "stt": 702,
    "hanzi": "运动",
    "pinyin": "yùndòng",
    "type": "động từ / danh từ",
    "meaning": "vận động, tập thể dục | thể thao, hoạt động thể thao / phong trào"
  },
  {
    "stt": 703,
    "hanzi": "咱",
    "pinyin": "zán",
    "type": "đại từ",
    "meaning": "chúng ta"
  },
  {
    "stt": 704,
    "hanzi": "咱们",
    "pinyin": "zánmen",
    "type": "đại từ",
    "meaning": "chúng ta"
  },
  {
    "stt": 705,
    "hanzi": "脏",
    "pinyin": "zāng",
    "type": "tính từ",
    "meaning": "bẩn"
  },
  {
    "stt": 706,
    "hanzi": "早餐",
    "pinyin": "zǎocān",
    "type": "danh từ",
    "meaning": "bữa sáng"
  },
  {
    "stt": 707,
    "hanzi": "早晨",
    "pinyin": "zǎochén",
    "type": "danh từ",
    "meaning": "buổi sáng sớm"
  },
  {
    "stt": 708,
    "hanzi": "早就",
    "pinyin": "zǎo jiù",
    "type": "từ vựng",
    "meaning": "đã…từ lâu"
  },
  {
    "stt": 709,
    "hanzi": "怎么办",
    "pinyin": "zěnme bàn",
    "type": "từ vựng",
    "meaning": "làm sao đây"
  },
  {
    "stt": 710,
    "hanzi": "怎么样",
    "pinyin": "zěnmeyàng",
    "type": "đại từ",
    "meaning": "như thế nào"
  },
  {
    "stt": 711,
    "hanzi": "怎样",
    "pinyin": "zěnyàng",
    "type": "đại từ",
    "meaning": "như thế nào"
  },
  {
    "stt": 712,
    "hanzi": "占",
    "pinyin": "zhàn",
    "type": "động từ",
    "meaning": "chiếm, giữ"
  },
  {
    "stt": 713,
    "hanzi": "站",
    "pinyin": "zhàn",
    "type": "động từ",
    "meaning": "đứng"
  },
  {
    "stt": 714,
    "hanzi": "站住",
    "pinyin": "zhànzhù",
    "type": "từ vựng",
    "meaning": "đứng lại"
  },
  {
    "stt": 715,
    "hanzi": "长",
    "pinyin": "zhǎng",
    "type": "động từ",
    "meaning": "lớn lên"
  },
  {
    "stt": 716,
    "hanzi": "长大",
    "pinyin": "zhǎngdà",
    "type": "từ vựng",
    "meaning": "trưởng thành"
  },
  {
    "stt": 717,
    "hanzi": "找出",
    "pinyin": "zhǎochū",
    "type": "từ vựng",
    "meaning": "tìm ra"
  },
  {
    "stt": 718,
    "hanzi": "照顾",
    "pinyin": "zhàogù",
    "type": "động từ",
    "meaning": "chăm sóc"
  },
  {
    "stt": 719,
    "hanzi": "照片",
    "pinyin": "zhàopiàn",
    "type": "danh từ",
    "meaning": "ảnh"
  },
  {
    "stt": 720,
    "hanzi": "照相",
    "pinyin": "zhàoxiàng",
    "type": "từ vựng",
    "meaning": "chụp ảnh"
  },
  {
    "stt": 721,
    "hanzi": "这么",
    "pinyin": "zhème",
    "type": "đại từ",
    "meaning": "như thế này"
  },
  {
    "stt": 722,
    "hanzi": "这时候",
    "pinyin": "zhè shíhòu",
    "type": "từ vựng",
    "meaning": "lúc này | 这时 | zhè shí | lúc đó"
  },
  {
    "stt": 723,
    "hanzi": "这样",
    "pinyin": "zhèyàng",
    "type": "đại từ",
    "meaning": "như vậy"
  },
  {
    "stt": 724,
    "hanzi": "真正",
    "pinyin": "zhēnzhèng",
    "type": "tính từ",
    "meaning": "chân chính, thật sự"
  },
  {
    "stt": 725,
    "hanzi": "正常",
    "pinyin": "zhèngcháng",
    "type": "tính từ",
    "meaning": "bình thường"
  },
  {
    "stt": 726,
    "hanzi": "正好",
    "pinyin": "zhènghǎo",
    "type": "tính từ / phó từ",
    "meaning": "vừa đúng, vừa khít, vừa đủ | đúng lúc, đúng dịp, vừa hay"
  },
  {
    "stt": 727,
    "hanzi": "正确",
    "pinyin": "zhèngquè",
    "type": "tính từ",
    "meaning": "chính xác"
  },
  {
    "stt": 728,
    "hanzi": "正是",
    "pinyin": "zhèng shì",
    "type": "từ vựng",
    "meaning": "chính là"
  },
  {
    "stt": 729,
    "hanzi": "直接",
    "pinyin": "zhíjiē",
    "type": "tính từ",
    "meaning": "trực tiếp"
  },
  {
    "stt": 730,
    "hanzi": "只",
    "pinyin": "zhǐ",
    "type": "phó từ",
    "meaning": "chỉ"
  },
  {
    "stt": 731,
    "hanzi": "只能",
    "pinyin": "zhǐ néng",
    "type": "từ vựng",
    "meaning": "chỉ có thể"
  },
  {
    "stt": 732,
    "hanzi": "只要",
    "pinyin": "zhǐyào",
    "type": "liên từ",
    "meaning": "chỉ cần"
  },
  {
    "stt": 733,
    "hanzi": "纸",
    "pinyin": "zhǐ",
    "type": "danh từ",
    "meaning": "giấy"
  },
  {
    "stt": 734,
    "hanzi": "中餐",
    "pinyin": "zhōngcān",
    "type": "danh từ",
    "meaning": "món ăn Trung Quốc"
  },
  {
    "stt": 735,
    "hanzi": "中级",
    "pinyin": "zhōngjí",
    "type": "tính từ",
    "meaning": "trung cấp"
  },
  {
    "stt": 736,
    "hanzi": "中年",
    "pinyin": "zhōngnián",
    "type": "danh từ",
    "meaning": "trung niên"
  },
  {
    "stt": 737,
    "hanzi": "中小学",
    "pinyin": "zhōng- xiǎoxué",
    "type": "từ vựng",
    "meaning": "trường tiểu học và trung học"
  },
  {
    "stt": 738,
    "hanzi": "中心",
    "pinyin": "zhōngxīn",
    "type": "danh từ",
    "meaning": "trung tâm"
  },
  {
    "stt": 739,
    "hanzi": "中医",
    "pinyin": "zhōngyī",
    "type": "danh từ",
    "meaning": "đông y"
  },
  {
    "stt": 740,
    "hanzi": "重点",
    "pinyin": "zhòngdiǎn",
    "type": "danh từ / phó từ",
    "meaning": "trọng điểm, nội dung chính | nhấn mạnh, coi trọng, chú trọng"
  },
  {
    "stt": 741,
    "hanzi": "重视",
    "pinyin": "zhòngshì",
    "type": "động từ",
    "meaning": "coi trọng"
  },
  {
    "stt": 742,
    "hanzi": "周",
    "pinyin": "Zhōu",
    "type": "lượng từ",
    "meaning": "tuần"
  },
  {
    "stt": 743,
    "hanzi": "周末",
    "pinyin": "zhōumò",
    "type": "danh từ",
    "meaning": "cuối tuần"
  },
  {
    "stt": 744,
    "hanzi": "周年",
    "pinyin": "zhōunián",
    "type": "danh từ",
    "meaning": "một năm tròn"
  },
  {
    "stt": 745,
    "hanzi": "主人",
    "pinyin": "zhǔrén",
    "type": "danh từ",
    "meaning": "chủ nhân"
  },
  {
    "stt": 746,
    "hanzi": "主要",
    "pinyin": "zhǔyào",
    "type": "tính từ",
    "meaning": "chủ yếu"
  },
  {
    "stt": 747,
    "hanzi": "住房",
    "pinyin": "zhùfáng",
    "type": "danh từ",
    "meaning": "nhà ở"
  },
  {
    "stt": 748,
    "hanzi": "住院",
    "pinyin": "zhùyuàn",
    "type": "từ vựng",
    "meaning": "nhập viện"
  },
  {
    "stt": 749,
    "hanzi": "装",
    "pinyin": "zhuāng",
    "type": "động từ",
    "meaning": "trang trí, lắp đặt"
  },
  {
    "stt": 750,
    "hanzi": "准确",
    "pinyin": "zhǔnquè",
    "type": "tính từ",
    "meaning": "chính xác"
  },
  {
    "stt": 751,
    "hanzi": "自己",
    "pinyin": "Zìjǐ",
    "type": "đại từ",
    "meaning": "tự mình"
  },
  {
    "stt": 752,
    "hanzi": "自行车",
    "pinyin": "zìxíngchē",
    "type": "danh từ",
    "meaning": "xe đạp"
  },
  {
    "stt": 753,
    "hanzi": "自由",
    "pinyin": "Zìyóu",
    "type": "danh từ / tính từ",
    "meaning": "sự tự do, quyền tự do | tự do, thoải mái"
  },
  {
    "stt": 754,
    "hanzi": "字典",
    "pinyin": "zìdiǎn",
    "type": "danh từ",
    "meaning": "tự điển"
  },
  {
    "stt": 755,
    "hanzi": "走过",
    "pinyin": "zǒuguò",
    "type": "từ vựng",
    "meaning": "đi qua"
  },
  {
    "stt": 756,
    "hanzi": "走进",
    "pinyin": "zǒujìn",
    "type": "từ vựng",
    "meaning": "đi vào"
  },
  {
    "stt": 757,
    "hanzi": "走开",
    "pinyin": "zǒukāi",
    "type": "từ vựng",
    "meaning": "tránh ra"
  },
  {
    "stt": 758,
    "hanzi": "租",
    "pinyin": "Zū",
    "type": "động từ",
    "meaning": "thuê"
  },
  {
    "stt": 759,
    "hanzi": "组",
    "pinyin": "Zǔ",
    "type": "động từ / danh từ",
    "meaning": "tổ chức, lập nhóm | nhóm, tổ, đội"
  },
  {
    "stt": 760,
    "hanzi": "组成",
    "pinyin": "zǔchéng",
    "type": "động từ",
    "meaning": "cấu thành"
  },
  {
    "stt": 761,
    "hanzi": "组长",
    "pinyin": "zǔzhǎng",
    "type": "danh từ",
    "meaning": "tổ trưởng"
  },
  {
    "stt": 762,
    "hanzi": "嘴",
    "pinyin": "Zuǐ",
    "type": "danh từ",
    "meaning": "miệng"
  },
  {
    "stt": 763,
    "hanzi": "最近",
    "pinyin": "Zuìjìn",
    "type": "danh từ",
    "meaning": "gần đây"
  },
  {
    "stt": 764,
    "hanzi": "作家",
    "pinyin": "zuòjiā",
    "type": "danh từ",
    "meaning": "nhà văn"
  },
  {
    "stt": 765,
    "hanzi": "作文",
    "pinyin": "zuòwén",
    "type": "danh từ",
    "meaning": "bài văn"
  },
  {
    "stt": 766,
    "hanzi": "作业",
    "pinyin": "zuòyè",
    "type": "danh từ",
    "meaning": "bài tập"
  },
  {
    "stt": 767,
    "hanzi": "作用",
    "pinyin": "zuòyòng",
    "type": "từ vựng",
    "meaning": "danh tù | tác dụng"
  },
  {
    "stt": 768,
    "hanzi": "座",
    "pinyin": "Zuò",
    "type": "lượng từ",
    "meaning": "cái, tòa"
  },
  {
    "stt": 769,
    "hanzi": "座位",
    "pinyin": "zuòwèi",
    "type": "danh từ",
    "meaning": "chỗ ngồi"
  },
  {
    "stt": 770,
    "hanzi": "做到",
    "pinyin": "zuòdào",
    "type": "từ vựng",
    "meaning": "làm được"
  },
  {
    "stt": 771,
    "hanzi": "做法",
    "pinyin": "zuòfǎ",
    "type": "danh từ",
    "meaning": "cách làm"
  },
  {
    "stt": 772,
    "hanzi": "做饭",
    "pinyin": "zuòfàn",
    "type": "từ vựng",
    "meaning": "nấu ăn"
  }
];

  var HSK2_GRAMMAR = [
  {
    "category": "1. Đại từ, Lượng từ & Số thứ tự HSK 2",
    "items": [
      {
        "name": "Đại từ '每' (Mỗi)",
        "structure": "每 + Lượng từ + Danh từ",
        "example": "他每天早上六点起床跑步。",
        "pinyin": "Tā měitiān zǎoshang liù diǎn qǐchuáng pǎobù.",
        "meaning": "Mỗi ngày anh ấy đều dậy chạy bộ lúc 6 giờ sáng.",
        "note": "Thường đi kèm với phó từ '都' ở vế sau."
      },
      {
        "name": "Đại từ nghi vấn '为什么' (Tại sao)",
        "structure": "Chủ ngữ + 为什么 + V / Adj?",
        "example": "你为什么不吃苹果？",
        "pinyin": "Nǐ wèishénme bù chī píngguǒ?",
        "meaning": "Tại sao bạn không ăn táo?",
        "note": "Dùng để hỏi nguyên nhân, lý do. Trả lời bằng '因为...'."
      },
      {
        "name": "Số thứ tự với '第'",
        "structure": "第 + Số đếm (+ Lượng từ + N)",
        "example": "这是第一本书，他是第一个人。",
        "pinyin": "Zhè shì dì yī běn shū, tā shì dì yī ge rén.",
        "meaning": "Đây là cuốn sách thứ nhất, anh ấy là người đầu tiên.",
        "note": "'第' đứng trước số từ để tạo thành số thứ tự."
      },
      {
        "name": "Đoản ngữ lượng từ '一下' (Một chút, một lát)",
        "structure": "Động từ + 一下",
        "example": "请等我一下。我看了一下。",
        "pinyin": "Qǐng děng wǒ yíxià. Wǒ kànle yíxià.",
        "meaning": "Xin đợi tôi một chút. Tôi đã xem qua một lát.",
        "note": "Biểu thị hành động diễn ra trong thời gian ngắn hoặc làm cho câu nhẹ nhàng hơn."
      }
    ]
  },
  {
    "category": "2. Phó từ quan trọng HSK 2 (别, 最, 真, 非常, 已经)",
    "items": [
      {
        "name": "Khuyên ngăn với '别' (Đừng)",
        "structure": "别 + Động từ (+ 了)",
        "example": "外面太热了，别出去了。",
        "pinyin": "Wàimiàn tài rè le, bié chūqù le.",
        "meaning": "Bên ngoài nóng quá, đừng ra ngoài nữa.",
        "note": "'别' tương đương '不要', dùng trong câu cầu khiến phủ định."
      },
      {
        "name": "So sánh bậc nhất với '最' (Nhất)",
        "structure": "最 + Tính từ / Động từ tâm lý",
        "example": "西瓜是我最爱吃的水果。",
        "pinyin": "Xīguā shì wǒ zuì ài chī de shuǐguǒ.",
        "meaning": "Dưa hấu là loại hoa quả tôi thích ăn nhất.",
        "note": "Biểu thị mức độ cao nhất trong một phạm vi."
      },
      {
        "name": "Mức độ cao với '非常' (Vô cùng, cực kỳ)",
        "structure": "非常 + Tính từ / Động từ",
        "example": "这个船非常大，可以坐几千人。",
        "pinyin": "Zhè ge chuán fēicháng dà, kěyǐ zuò jǐ qiān rén.",
        "meaning": "Con thuyền này vô cùng to lớn, có thể chở vài nghìn người.",
        "note": "Mức độ mạnh hơn '很'."
      },
      {
        "name": "Cảm thán với '真' (Thật là)",
        "structure": "真 + Tính từ (+ 啊)!",
        "example": "你女儿真漂亮！",
        "pinyin": "Nǐ nǚ'ér zhēn piàoliang!",
        "meaning": "Con gái bạn thật là xinh đẹp!",
        "note": "Dùng trong câu biểu thị cảm xúc ngạc nhiên, khen ngợi."
      },
      {
        "name": "Hành động đã hoàn tất với '已经' (Đã)",
        "structure": "已经 + Động từ / Cụm từ + 了",
        "example": "我已经学习汉语一年了。",
        "pinyin": "Wǒ yǐjīng xuéxí hànyǔ yì nián le.",
        "meaning": "Tôi đã học tiếng Trung được một năm rồi.",
        "note": "Nhấn mạnh hành động đã hoàn tất hoặc đạt đến mức độ/thời gian nào đó."
      }
    ]
  },
  {
    "category": "3. Liên từ quan hệ câu (因为...所以..., 虽然...但是...)",
    "items": [
      {
        "name": "Nguyên nhân - Kết quả: 因为...所以...",
        "structure": "因为 + Nguyên nhân, 所以 + Kết quả",
        "example": "因为昨天下雨，所以我们没去公园。",
        "pinyin": "Yīnwèi zuótiān xiàyǔ, suǒyǐ wǒmen méi qù gōngyuán.",
        "meaning": "Bởi vì hôm qua trời mưa, cho nên chúng tôi không đi công viên.",
        "note": "Trong giao tiếp có thể lược bỏ '因为' hoặc '所以' nhưng câu vẫn giữ nguyên ý nghĩa."
      },
      {
        "name": "Nhượng bộ chuyển ngoặt: 虽然...但是...",
        "structure": "虽然 + Vế 1, 但是 + Vế 2",
        "example": "虽然这件衣服很贵，但是很漂亮。",
        "pinyin": "Suīrán zhè jiàn yīfu hěn guì, dànshì hěn piàoliang.",
        "meaning": "Tuy rằng chiếc áo này rất đắt, nhưng rất đẹp.",
        "note": "Biểu thị sự đối lập giữa hai vế câu."
      }
    ]
  },
  {
    "category": "4. Cấu trúc so sánh '比' & Giới từ (从, 离, 对, 向)",
    "items": [
      {
        "name": "So sánh hơn với '比'",
        "structure": "A + 比 + B + Tính từ (+ Số lượng)",
        "example": "哥哥比我大两岁。今天比昨天冷。",
        "pinyin": "Gēge bǐ wǒ dà liǎng suì. Jīntiān bǐ zuótiān lěng.",
        "meaning": "Anh trai lớn hơn tôi 2 tuổi. Hôm nay lạnh hơn hôm qua.",
        "note": "Tuyệt đối không dùng '很', '非常' sau tính từ trong câu chữ '比'."
      },
      {
        "name": "Khoảng cách với '离' (Cách)",
        "structure": "Địa điểm A + 离 + Địa điểm B + 很远 / 很近",
        "example": "学校离我家很近。",
        "pinyin": "Xuéxiào lí wǒ jiā hěn jìn.",
        "meaning": "Trường học cách nhà tôi rất gần.",
        "note": "Dùng để biểu thị cự ly, khoảng cách không gian hoặc thời gian."
      },
      {
        "name": "Điểm xuất phát với '从' (Từ)",
        "structure": "从 + Nơi chốn / Thời gian + Động từ",
        "example": "他从北京来。从早上八点到下午五点。",
        "pinyin": "Tā cóng Běijīng lái. Cóng zǎoshang bā diǎn dào xiàwǔ wǔ diǎn.",
        "meaning": "Anh ấy đến từ Bắc Kinh. Từ 8 giờ sáng đến 5 giờ chiều.",
        "note": "Thường đi kèm cặp với '到' (从...到...: Từ... đến...)."
      }
    ]
  },
  {
    "category": "5. Bổ ngữ kết quả & Trợ từ động thái (过, 着)",
    "items": [
      {
        "name": "Bổ ngữ kết quả (完, 懂, 见, 到, 好)",
        "structure": "Động từ + Bổ ngữ (完/懂/见/到/好)",
        "example": "我做完作业了。我听懂了。",
        "pinyin": "Wǒ zuò wán zuòyè le. Wǒ tīng dǒng le.",
        "meaning": "Tôi làm xong bài tập rồi. Tôi nghe hiểu rồi.",
        "note": "Biểu thị kết quả đạt được của hành động. Phủ định dùng '没 + V + Bổ ngữ'."
      },
      {
        "name": "Trải nghiệm quá khứ với '过' (Từng)",
        "structure": "Chủ ngữ + V + 过 (+ Tân ngữ) (Phủ định: 没 + V + 过)",
        "example": "我去过一次中国。我没吃过这个菜。",
        "pinyin": "Wǒ qù guo yí cì Zhōngguó. Wǒ méi chī guo zhè ge cài.",
        "meaning": "Tôi từng đi Trung Quốc một lần. Tôi chưa từng ăn món này.",
        "note": "Biểu thị đã từng có trải nghiệm hành động đó trong quá khứ."
      },
      {
        "name": "Tiếp diễn trạng thái với '着' (Đang)",
        "structure": "Động từ + 着 (+ Tân ngữ)",
        "example": "门开着呢。他笑着说话。",
        "pinyin": "Mén kāi zhe ne. Tā xiào zhe shuōhuà.",
        "meaning": "Cửa đang mở đấy. Anh ấy vừa cười vừa nói chuyện.",
        "note": "Biểu thị trạng thái đang duy trì hoặc phương thức thực hiện hành động."
      }
    ]
  }
];

  global.EDUZ_HSK_HANDBOOK = {
    // Cấp độ HSK 1
    hsk1_vocabulary: HSK1_VOCABULARY,
    hsk1_grammar: HSK1_GRAMMAR,

    // Cấp độ HSK 2
    hsk2_vocabulary: HSK2_VOCABULARY,
    hsk2_grammar: HSK2_GRAMMAR,

    // Mặc định tương thích ngược
    vocabulary: HSK1_VOCABULARY,
    grammar: HSK1_GRAMMAR
  };
})(typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : this));
