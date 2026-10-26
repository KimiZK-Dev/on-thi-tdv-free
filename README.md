# Ôn Thi TDV Free 🎓

> **Nền tảng ôn thi trắc nghiệm trực tuyến 100% Miễn Phí — Không cần tài khoản, không cần mã kích hoạt!**

Truy cập và làm bài ngay lập tức trên mọi thiết bị: Điện thoại (iOS / Android), Máy tính bảng (iPad / Tablet) và Máy tính (Desktop / Laptop).

---

## 🌟 Tính Năng Nổi Bật

- **Hoàn toàn miễn phí & Mở (Zero Auth)**: Không cần đăng ký, đăng nhập hay nhập bất kỳ mã kích hoạt nào. Truy cập là chọn môn làm bài ngay.
- **Hơn 1.380+ câu hỏi chuẩn xác**: Ngân hàng đề thi trọn bộ 6 môn học đại cương và chuyên ngành, bám sát đề cương học phần.
- **2 Chế độ làm bài linh hoạt**:
  - 💡 **Chế độ Luyện tập (Study Mode)**: Kiểm tra đáp án ngay lập tức sau khi chọn, hiển thị giải thích chi tiết và phát âm thanh phản hồi trực quan.
  - ⏱️ **Chế độ Thi thử (Exam Mode)**: Bấm giờ làm bài như thi thật, ẩn kết quả đến khi nộp bài và chấm điểm theo thang điểm hệ 10 chuẩn xác.
- **Hiển thị 100% Bài đọc hiểu (Reading Passages)**: Không bị cắt bớt nội dung bài đọc của phần Tiếng Anh hay các ngữ cảnh thực hành.
- **🧭 Bản đồ câu hỏi (Question Palette)**: Trực quan hóa tiến độ câu hỏi (Đã làm, Chưa làm, Đúng, Sai, Đánh dấu), bấm vào là nhảy ngay đến câu cần làm.
- **⭐ Cờ đánh dấu (Bookmark)**: Gắn cờ các câu hỏi khó để dễ dàng xem lại trước khi nộp bài.
- **🔀 Đảo ngẫu nhiên (Shuffle)**: Hỗ trợ xáo trộn thứ tự câu hỏi để tránh học vẹt.
- **💾 Lưu tự động (Auto-save)**: Tự động lưu tiến độ dở dang vào trình duyệt (`localStorage`), không lo mất bài khi lỡ tải lại trang.
- **🌓 Giao diện Hiện đại (Dark / Light Mode)**: Tự động nhận diện theme hệ thống cùng nút chuyển đổi theme mượt mà.
- **🔔 Hiệu ứng âm thanh tinh tế**: Sử dụng Web Audio API cho âm thanh tương tác nhẹ nhàng (có nút bật/tắt tiện lợi).

---

## 📚 Danh Mục 6 Môn Học

| Môn Học | Mã Môn | Số Lượng Câu Hỏi | Kỳ Thi | Phân Loại Chuyên Sâu |
| :--- | :---: | :---: | :---: | :--- |
| **Tiếng Anh 1** | `TA1` | **290 câu** | Giữa kỳ & Cuối kỳ | 7 Tabs: Đề cương Review Final, Đọc hiểu 100%, Đục lỗ, Biển báo giao tiếp, Ngữ pháp & Từ vựng, Luyện nghe HP1, Ôn tập toàn bộ |
| **Chủ Nghĩa Xã Hội Khoa Học** | `CNXH` | **382 câu** | Cuối kỳ | 3 Tabs: Đề 1 Cuối kỳ, Đề 2 Cuối kỳ, Ôn tập 7 chương lý luận |
| **Kinh Tế Vĩ Mô** | `VIMO` | **398 câu** | Cuối kỳ | 4 Tabs: Đề 1, Đề 2, Giữa kỳ, Ôn tập toàn bộ 398 câu |
| **Kinh Tế Vi Mô** | `KTVM` | **117 câu** | Giữa kỳ & Cuối kỳ | 4 Tabs: Đề Giữa kỳ lần 1, Đề Giữa kỳ lần 2, Ôn tập trọng tâm, Tổng hợp |
| **Văn Hóa Kinh Doanh** | `VHKD` | **142 câu** | Cuối kỳ | 4 Tabs: Đề 1, Đề 2, Giữa kỳ, Ôn tập toàn bộ 142 câu |
| **Lập Dự Án Đầu Tư** | `LPDA` | **55 câu** | Cuối kỳ | 4 Tabs: Chương 1 & 2 Tổng quan, Chương 3 Căn cứ & Thị trường, Thực hành, Ôn tập toàn bộ |

---

## 🚀 Hướng Dẫn Sử Dụng & Triển Khai

### 1. Chạy trực tiếp trên trình duyệt
Dự án được xây dựng bằng **Vanilla HTML, CSS, JavaScript** thuần túy:
- Chỉ cần mở trực tiếp file `index.html` bằng trình duyệt web bất kỳ (Chrome, Safari, Firefox, Edge).
- Hoặc sử dụng Live Server trong VS Code / Antigravity IDE.

### 2. Triển khai lên GitHub Pages (Miễn phí)
1. Đẩy mã nguồn lên repository: `https://github.com/KimiZK-Dev/on-thi-tdv-free.git`
2. Vào mục **Settings** của repository trên GitHub.
3. Chọn tab **Pages** ở thanh điều hướng bên trái.
4. Tại phần **Build and deployment > Branch**, chọn branch `main` và thư mục `/ (root)`.
5. Bấm **Save**. Trang web sẽ tự động được xuất bản và hoạt động trực tiếp trên Internet!

---

## 📁 Cấu Trúc Dự Án

```
on-thi-tdv/
├── index.html          # Giao diện chính Single-Page Application
├── style.css           # Hệ thống thiết kế CSS Responsive, Dark/Light Mode
├── config.js           # Cấu hình danh mục 6 môn học & các tab chuyên đề
├── navigation.js       # Điều hướng trang chủ, bộ lọc tìm kiếm & thẻ môn học
├── quiz-engine.js      # Trình chấm điểm trắc nghiệm, chế độ thi thử & bản đồ câu
├── app.js              # Khởi tạo ứng dụng & đồng bộ theme
├── README.md           # Tài liệu hướng dẫn dự án
└── data/               # Dữ liệu ngân hàng câu hỏi
    ├── ta1.js          # Dữ liệu Tiếng Anh 1 (290 câu)
    ├── cnxh.js         # Dữ liệu Chủ Nghĩa Xã Hội Khoa Học (382 câu)
    ├── vimo.js         # Dữ liệu Kinh Tế Vĩ Mô (398 câu)
    ├── ktvm.js         # Dữ liệu Kinh Tế Vi Mô (117 câu)
    ├── vhkd.js         # Dữ liệu Văn Hóa Kinh Doanh (142 câu)
    └── lpda.js         # Dữ liệu Lập Dự Án Đầu Tư (55 câu)
```

---

## 📄 Bản Quyền
Dự án được phát triển và chia sẻ hoàn toàn miễn phí phục vụ cộng đồng học tập.
