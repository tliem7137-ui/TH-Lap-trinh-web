# Web Quản Lý Blogger (Blogger Manager)

- **Sinh viên thực hiện**: Đỗ Thanh Liêm
- **MSSV**: N23DCAT041

## 1. Giới thiệu đề tài
Hệ thống quản lý blogger hỗ trợ theo dõi danh sách tác giả, quản lý bài viết, phân loại chuyên mục và kiểm soát trạng thái nội dung trực quan trên nền tảng web đơn trang (Single Page Application - SPA).

## 2. Công nghệ sử dụng
- **Thư viện UI**: React 19, JavaScript (ES6+)
- **Build tool**: Vite (cấu hình chạy cổng 3000)
- **Định tuyến (Routing)**: React Router v7 (`react-router-dom`)
- **Định dạng (Styling)**: Pure CSS (Flexbox, CSS Grid, Responsive)
- **Quản lý phiên bản**: Git & GitHub

## 3. Cấu trúc thư mục dự án
```text
blogger-management/
├── index.html              # File HTML chính của ứng dụng
├── package.json            # Quản lý dependencies và scripts
├── vite.config.js          # Cấu hình Vite (server port 3000)
├── public/
│   └── default-avatar.svg  # Avatar mặc định cho blogger
├── src/
│   ├── main.jsx            # Entry point của React
│   ├── App.jsx             # Cấu hình BrowserRouter, Routes và state chung
│   ├── App.css             # CSS bố cục layout (Header, Footer, Navbar)
│   ├── index.css           # CSS biến dùng chung và reset style
│   ├── data/
│   │   └── mockData.js     # Dữ liệu mẫu bloggers và bài viết
│   ├── components/
│   │   ├── Navbar.jsx      # Thanh điều hướng (NavLink)
│   │   └── Footer.jsx      # Chân trang thông tin
│   ├── pages/
│   │   ├── Home.jsx        # Giao diện Trang chủ (Dashboard)
│   │   ├── AboutUs.jsx     # Trang Giới thiệu (/about-us)
│   │   ├── Bloggers.jsx    # Trang Quản lý danh sách Blogger (/bloggers)
│   │   ├── Posts.jsx       # Trang Quản lý bài viết (/posts)
│   │   ├── CreatePost.jsx  # Trang Thêm bài viết mới (/create-post)
│   │   └── NotFound.jsx    # Trang 404 khi truy cập sai URL
│   └── styles/
│       ├── Home.css        # File CSS định dạng riêng cho Trang chủ
│       └── Pages.css       # File CSS cho các trang chức năng khác
```

## 4. Hướng dẫn cài đặt và chạy ứng dụng
1. Cài đặt các gói thư viện:
   ```bash
   npm install
   ```
2. Chạy ứng dụng ở môi trường phát triển:
   ```bash
   npm run dev
   ```
3. Mở trình duyệt và truy cập: `http://localhost:3000`

## 5. Danh sách các đường dẫn (Routes)
- `http://localhost:3000/` : Trang chủ thống kê và bài viết mới
- `http://localhost:3000/about-us` : Trang giới thiệu
- `http://localhost:3000/bloggers` : Danh sách và bộ lọc tìm kiếm bloggers
- `http://localhost:3000/posts` : Quản lý bài viết (xem, lọc trạng thái, xóa bài)
- `http://localhost:3000/create-post` : Soạn thảo và thêm bài viết mới
