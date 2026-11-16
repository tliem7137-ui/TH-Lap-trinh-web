export const initialBloggers = [
  {
    id: 1,
    name: 'Nguyễn Văn An',
    username: '@an_nguyen_tech',
    email: 'an.nguyen@example.com',
    topic: 'Công nghệ & Lập trình',
    postsCount: 24,
    followers: 1250,
    status: 'Đang hoạt động',
    joinDate: '15/01/2024',
    bio: 'Kỹ sư phần mềm chia sẻ kiến thức về React, JavaScript và kiến trúc web hiện đại.',
    avatar: '/default-avatar.svg'
  },
  {
    id: 2,
    name: 'Trần Thị Mai',
    username: '@mai_wanderlust',
    email: 'mai.tran@example.com',
    topic: 'Du lịch & Trải nghiệm',
    postsCount: 18,
    followers: 3420,
    status: 'Đang hoạt động',
    joinDate: '20/02/2024',
    bio: 'Blogger du lịch, khám phá các cung đường phượt và văn hóa vùng miền Việt Nam.',
    avatar: '/default-avatar.svg'
  },
  {
    id: 3,
    name: 'Lê Hoàng Minh',
    username: '@minh_foodie',
    email: 'minh.le@example.com',
    topic: 'Ẩm thực & Đời sống',
    postsCount: 31,
    followers: 2190,
    status: 'Đang hoạt động',
    joinDate: '05/03/2024',
    bio: 'Reviewer ẩm thực, chia sẻ công thức nấu ăn gia đình truyền thống và hiện đại.',
    avatar: '/default-avatar.svg'
  },
  {
    id: 4,
    name: 'Phạm Thu Hương',
    username: '@huong_lifestyle',
    email: 'huong.pham@example.com',
    topic: 'Phong cách sống & Sách',
    postsCount: 12,
    followers: 980,
    status: 'Tạm ngưng',
    joinDate: '12/04/2024',
    bio: 'Yêu thích đọc sách, lối sống tối giản và phát triển tư duy tích cực.',
    avatar: '/default-avatar.svg'
  }
];

export const initialPosts = [
  {
    id: 101,
    title: 'Tìm hiểu React Router v7 và cách cấu hình điều hướng trong ứng dụng web',
    bloggerName: 'Nguyễn Văn An',
    bloggerId: 1,
    category: 'Công nghệ',
    views: 1540,
    likes: 120,
    createdAt: '10/10/2024',
    status: 'Đã xuất bản',
    excerpt: 'Hướng dẫn chi tiết từ cơ bản đến nâng cao về định tuyến (Routing) trong ReactJs với thư viện React Router.'
  },
  {
    id: 102,
    title: 'Kinh nghiệm du lịch tự túc Hà Giang mùa hoa tam giác mạch',
    bloggerName: 'Trần Thị Mai',
    bloggerId: 2,
    category: 'Du lịch',
    views: 3200,
    likes: 310,
    createdAt: '18/10/2024',
    status: 'Đã xuất bản',
    excerpt: 'Lịch trình 3 ngày 2 đêm chi tiết, chi phí dự tính và những điểm check-in không thể bỏ lỡ tại cao nguyên đá.'
  },
  {
    id: 103,
    title: 'Top 10 quán ăn đêm nổi tiếng nhất định phải thử tại Sài Gòn',
    bloggerName: 'Lê Hoàng Minh',
    bloggerId: 3,
    category: 'Ẩm thực',
    views: 2450,
    likes: 195,
    createdAt: '25/10/2024',
    status: 'Đã xuất bản',
    excerpt: 'Tổng hợp danh sách các quán hủ tiếu, ốc và chè đêm lâu năm dành cho các tín đồ mê ăn đêm.'
  },
  {
    id: 104,
    title: 'Cách tối ưu hiệu năng trang web React với Vite thay vì Webpack',
    bloggerName: 'Nguyễn Văn An',
    bloggerId: 1,
    category: 'Công nghệ',
    views: 890,
    likes: 67,
    createdAt: '02/11/2024',
    status: 'Đã xuất bản',
    excerpt: 'Phân tích cơ chế hoạt động của esbuild và Vite giúp tăng tốc độ build trang và Hot Module Replacement.'
  },
  {
    id: 105,
    title: 'Nghệ thuật quản lý thời gian dành cho người làm việc tự do',
    bloggerName: 'Phạm Thu Hương',
    bloggerId: 4,
    category: 'Đời sống',
    views: 450,
    likes: 38,
    createdAt: '05/11/2024',
    status: 'Bản nháp',
    excerpt: 'Phương pháp phân bổ công việc theo khung giờ và cách giữ kỷ luật bản thân khi làm việc tại nhà.'
  }
];
