# Web Quản Lý Blogger (Blogger Manager)

- **Sinh viên thực hiện**: Đỗ Thanh Liêm
- **MSSV**: N23DCAT041

Dự án gồm 2 phần: Front-end (ReactJS + Vite) và Back-end (ASP.NET Core Web API + Entity Framework Core).

---

## 1. Cấu trúc toàn bộ dự án
```text
blogger-management/
├── backend/                              # Back-end ASP.NET Core Web API
│   ├── BloggerManager.API.csproj         # File cấu hình project và NuGet packages
│   ├── Program.cs                        # Cấu hình CORS, DbContext, Swagger, Pipeline
│   ├── appsettings.json                  # Cấu hình ConnectionString kết nối SQL Server
│   ├── Data/
│   │   └── AppDbContext.cs               # DbContext Entity Framework Core & Seed data
│   ├── Models/
│   │   ├── Blogger.cs                    # Entity Blogger
│   │   └── Post.cs                       # Entity Post (quan hệ 1-N với Blogger)
│   ├── DTOs/
│   │   ├── BloggerDto.cs                 # DTO truyền dữ liệu Blogger
│   │   └── PostDto.cs                    # DTO truyền dữ liệu Bài viết
│   ├── Controllers/
│   │   ├── BloggersController.cs         # Controller quản lý Blogger (CRUD)
│   │   └── PostsController.cs            # Controller quản lý Bài viết (CRUD)
│   └── Migrations/
│       ├── 20261117000000_InitialCreate.cs
│       └── AppDbContextModelSnapshot.cs
│
├── src/                                  # Front-end ReactJS
│   ├── services/
│   │   └── api.js                        # Gọi API backend bằng Axios (GET, POST, PUT, DELETE)
│   ├── components/
│   │   ├── Navbar.jsx                    # Menu điều hướng
│   │   └── Footer.jsx                    # Chân trang
│   ├── pages/
│   │   ├── Home.jsx                      # Trang chủ Dashboard
│   │   ├── AboutUs.jsx                   # Trang Giới thiệu
│   │   ├── Bloggers.jsx                  # Danh sách & tìm kiếm blogger
│   │   ├── Posts.jsx                     # Quản lý bài viết (Đổi trạng thái, Xóa)
│   │   ├── CreatePost.jsx                # Thêm bài viết mới
│   │   └── NotFound.jsx                  # Trang 404
│   ├── styles/
│   │   ├── Home.css
│   │   └── Pages.css
│   ├── App.jsx                           # Tích hợp Axios request & React Router
│   └── main.jsx
├── package.json
└── vite.config.js                        # Server chạy port 3000
```

---

## 2. Danh sách các API Endpoints (Back-end)

### Bloggers Controller (`/api/bloggers`)
- `GET /api/bloggers`: Lấy danh sách toàn bộ blogger.
- `GET /api/bloggers/{id}`: Lấy chi tiết blogger theo ID.
- `POST /api/bloggers`: Thêm blogger mới.
- `PUT /api/bloggers/{id}`: Cập nhật thông tin blogger.
- `DELETE /api/bloggers/{id}`: Xóa blogger theo ID.

### Posts Controller (`/api/posts`)
- `GET /api/posts`: Lấy danh sách bài viết (hỗ trợ lọc theo chuyên mục và trạng thái).
- `GET /api/posts/{id}`: Lấy chi tiết bài viết theo ID.
- `POST /api/posts`: Đăng bài viết mới (tự động tạo blogger nếu là tác giả mới).
- `PUT /api/posts/{id}`: Cập nhật bài viết (tiêu đề, nội dung, đổi trạng thái xuất bản).
- `DELETE /api/posts/{id}`: Xóa bài viết theo ID.

---

## 3. Các phương thức Axios trên Front-end
Toàn bộ request được cấu hình tập trung trong file `src/services/api.js`:
- **GET**: `apiClient.get('/posts')`, `apiClient.get('/bloggers')`
- **POST**: `apiClient.post('/posts', newPostData)`
- **PUT**: `apiClient.put('/posts/${id}', { status: nextStatus })`
- **DELETE**: `apiClient.delete('/posts/${id}')`

---

## 4. Hướng dẫn cấu hình Database và Migration (EF Core)

### Cấu hình chuỗi kết nối (Connection String)
Trong file `backend/appsettings.json`:
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=BloggerManagerDb;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true"
}
```

### Các lệnh EF Core Migration
Mở terminal tại thư mục `backend/`:
```bash
# Cài đặt công cụ dotnet-ef (nếu chưa có)
dotnet tool install --global dotnet-ef

# 1. Tạo migration mới
dotnet ef migrations add InitialCreate

# 2. Áp dụng migration để tạo bảng trong Database
dotnet ef database update
```
*(Hoặc dùng Package Manager Console trong Visual Studio: `Add-Migration InitialCreate` và `Update-Database`)*

---

## 5. Hướng dẫn chạy dự án

### Chạy Back-end:
```bash
cd backend
dotnet run
```
Backend sẽ khởi động tại `http://localhost:5000`. Xem giao diện Swagger tại `http://localhost:5000/swagger`.

### Chạy Front-end:
```bash
npm install
npm run dev
```
Front-end sẽ khởi động tại `http://localhost:3000`.
