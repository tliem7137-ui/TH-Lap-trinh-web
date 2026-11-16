import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home({ bloggers, posts }) {
  // Tính toán số liệu thống kê
  const totalBloggers = bloggers.length;
  const totalPosts = posts.length;
  const totalViews = posts.reduce((sum, post) => sum + post.views, 0);
  const draftPosts = posts.filter(post => post.status === 'Bản nháp').length;

  return (
    <main className="home-container container">
      {/* 1. Phần Hero Banner giới thiệu trang chủ */}
      <section className="hero-banner">
        <h1>Hệ Thống Quản Lý Nội Dung Blogger</h1>
        <p>
          Nền tảng quản lý tập trung thông tin tác giả, theo dõi bài viết, số lượt xem
          và tương tác dành cho các blogger chuyên nghiệp.
        </p>
        <div className="hero-actions">
          <Link to="/create-post" className="btn-primary">
            + Đăng bài viết mới
          </Link>
          <Link to="/bloggers" className="btn-secondary">
            Xem danh sách Blogger
          </Link>
        </div>
      </section>

      {/* 2. Thống kê nhanh các chỉ số hoạt động */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Tổng số Blogger</span>
            <span className="stat-badge">Hoạt động</span>
          </div>
          <div className="stat-number">{totalBloggers}</div>
          <div className="stat-desc">Tác giả đang có trên hệ thống</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Tổng số Bài viết</span>
            <span className="stat-badge">Nội dung</span>
          </div>
          <div className="stat-number">{totalPosts}</div>
          <div className="stat-desc">Bài viết đã tạo và lưu trữ</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Lượt xem tích lũy</span>
            <span className="stat-badge">Tương tác</span>
          </div>
          <div className="stat-number">{totalViews.toLocaleString('vi-VN')}</div>
          <div className="stat-desc">Tổng lượt truy cập các bài viết</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-title">Bài viết nháp</span>
            <span className="stat-badge">Chờ duyệt</span>
          </div>
          <div className="stat-number">{draftPosts}</div>
          <div className="stat-desc">Cần hoàn thiện và xuất bản</div>
        </div>
      </section>

      {/* 3. Danh sách các Blogger tiêu biểu */}
      <section className="featured-bloggers-section">
        <div className="section-header">
          <h2 className="section-title">Bloggers Tiêu Biểu</h2>
          <Link to="/bloggers" className="view-all-link">
            Xem tất cả Blogger →
          </Link>
        </div>

        <div className="bloggers-grid">
          {bloggers.slice(0, 3).map((blogger) => (
            <article key={blogger.id} className="blogger-home-card">
              <div className="blogger-avatar-wrapper">
                <img 
                  src={blogger.avatar} 
                  alt={blogger.name} 
                  className="blogger-avatar"
                />
              </div>
              <h3 className="blogger-name">{blogger.name}</h3>
              <p className="blogger-username">{blogger.username}</p>
              <span className="blogger-topic-tag">{blogger.topic}</span>
              <div className="blogger-meta">
                <div>
                  <strong>{blogger.postsCount}</strong>
                  <span>Bài viết</span>
                </div>
                <div>
                  <strong>{blogger.followers.toLocaleString('vi-VN')}</strong>
                  <span>Người theo dõi</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Danh sách các bài viết mới cập nhật */}
      <section className="recent-posts-section">
        <div className="section-header">
          <h2 className="section-title">Bài Viết Mới Cập Nhật</h2>
          <Link to="/posts" className="view-all-link">
            Quản lý toàn bộ bài viết →
          </Link>
        </div>

        <div className="posts-list">
          {posts.map((post) => (
            <article key={post.id} className="post-item-card">
              <div className="post-main-info">
                <span className="post-category-tag">{post.category}</span>
                <h3 className="post-title">
                  <Link to="/posts">{post.title}</Link>
                </h3>
                <p className="post-excerpt">{post.excerpt}</p>
                <div className="post-footer-meta">
                  <span className="post-author">Tác giả: {post.bloggerName}</span>
                  <span>•</span>
                  <span>Ngày đăng: {post.createdAt}</span>
                  <span>•</span>
                  <span>Lượt xem: {post.views.toLocaleString('vi-VN')}</span>
                </div>
              </div>

              <div>
                <span className={`post-status-badge ${post.status === 'Đã xuất bản' ? 'status-published' : 'status-draft'}`}>
                  {post.status}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
