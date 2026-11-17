using Microsoft.EntityFrameworkCore;
using BloggerManager.API.Models;

namespace BloggerManager.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Blogger> Bloggers => Set<Blogger>();
        public DbSet<Post> Posts => Set<Post>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Cấu hình quan hệ: 1 Blogger có nhiều Posts
            modelBuilder.Entity<Blogger>()
                .HasMany(b => b.Posts)
                .WithOne(p => p.Blogger)
                .HasForeignKey(p => p.BloggerId)
                .OnDelete(DeleteBehavior.Cascade);

            // Nạp dữ liệu mẫu ban đầu (Seed Data)
            modelBuilder.Entity<Blogger>().HasData(
                new Blogger
                {
                    Id = 1,
                    Name = "Nguyễn Văn An",
                    Username = "@an_nguyen_tech",
                    Email = "an.nguyen@example.com",
                    Topic = "Công nghệ & Lập trình",
                    PostsCount = 2,
                    Followers = 1250,
                    Status = "Đang hoạt động",
                    JoinDate = "15/01/2024",
                    Bio = "Kỹ sư phần mềm chia sẻ kiến thức về React, JavaScript và kiến trúc web hiện đại.",
                    Avatar = "/default-avatar.svg"
                },
                new Blogger
                {
                    Id = 2,
                    Name = "Trần Thị Mai",
                    Username = "@mai_wanderlust",
                    Email = "mai.tran@example.com",
                    Topic = "Du lịch & Trải nghiệm",
                    PostsCount = 1,
                    Followers = 3420,
                    Status = "Đang hoạt động",
                    JoinDate = "20/02/2024",
                    Bio = "Blogger du lịch, khám phá các cung đường phượt và văn hóa vùng miền Việt Nam.",
                    Avatar = "/default-avatar.svg"
                },
                new Blogger
                {
                    Id = 3,
                    Name = "Lê Hoàng Minh",
                    Username = "@minh_foodie",
                    Email = "minh.le@example.com",
                    Topic = "Ẩm thực & Đời sống",
                    PostsCount = 1,
                    Followers = 2190,
                    Status = "Đang hoạt động",
                    JoinDate = "05/03/2024",
                    Bio = "Reviewer ẩm thực, chia sẻ công thức nấu ăn gia đình truyền thống và hiện đại.",
                    Avatar = "/default-avatar.svg"
                },
                new Blogger
                {
                    Id = 4,
                    Name = "Phạm Thu Hương",
                    Username = "@huong_lifestyle",
                    Email = "huong.pham@example.com",
                    Topic = "Phong cách sống & Sách",
                    PostsCount = 1,
                    Followers = 980,
                    Status = "Tạm ngưng",
                    JoinDate = "12/04/2024",
                    Bio = "Yêu thích đọc sách, lối sống tối giản và phát triển tư duy tích cực.",
                    Avatar = "/default-avatar.svg"
                }
            );

            modelBuilder.Entity<Post>().HasData(
                new Post
                {
                    Id = 101,
                    Title = "Tìm hiểu React Router v7 và cách cấu hình điều hướng trong ứng dụng web",
                    BloggerId = 1,
                    Category = "Công nghệ",
                    Views = 1540,
                    Likes = 120,
                    CreatedAt = "10/10/2024",
                    Status = "Đã xuất bản",
                    Excerpt = "Hướng dẫn chi tiết từ cơ bản đến nâng cao về định tuyến (Routing) trong ReactJs với thư viện React Router."
                },
                new Post
                {
                    Id = 102,
                    Title = "Kinh nghiệm du lịch tự túc Hà Giang mùa hoa tam giác mạch",
                    BloggerId = 2,
                    Category = "Du lịch",
                    Views = 3200,
                    Likes = 310,
                    CreatedAt = "18/10/2024",
                    Status = "Đã xuất bản",
                    Excerpt = "Lịch trình 3 ngày 2 đêm chi tiết, chi phí dự tính và những điểm check-in không thể bỏ lỡ tại cao nguyên đá."
                },
                new Post
                {
                    Id = 103,
                    Title = "Top 10 quán ăn đêm nổi tiếng nhất định phải thử tại Sài Gòn",
                    BloggerId = 3,
                    Category = "Ẩm thực",
                    Views = 2450,
                    Likes = 195,
                    CreatedAt = "25/10/2024",
                    Status = "Đã xuất bản",
                    Excerpt = "Tổng hợp danh sách các quán hủ tiếu, ốc và chè đêm lâu năm dành cho các tín đồ mê ăn đêm."
                },
                new Post
                {
                    Id = 104,
                    Title = "Cách tối ưu hiệu năng trang web React với Vite thay vì Webpack",
                    BloggerId = 1,
                    Category = "Công nghệ",
                    Views = 890,
                    Likes = 67,
                    CreatedAt = "02/11/2024",
                    Status = "Đã xuất bản",
                    Excerpt = "Phân tích cơ chế hoạt động của esbuild và Vite giúp tăng tốc độ build trang và Hot Module Replacement."
                },
                new Post
                {
                    Id = 105,
                    Title = "Nghệ thuật quản lý thời gian dành cho người làm việc tự do",
                    BloggerId = 4,
                    Category = "Đời sống",
                    Views = 450,
                    Likes = 38,
                    CreatedAt = "05/11/2024",
                    Status = "Bản nháp",
                    Excerpt = "Phương pháp phân bổ công việc theo khung giờ và cách giữ kỷ luật bản thân khi làm việc tại nhà."
                }
            );
        }
    }
}
