import React from 'react';
import '../styles/Pages.css';

function AboutUs() {
  return (
    <div className="page-container container">
      <div className="page-header">
        <h1>Giới Thiệu</h1>
        <p>Thông tin tổng quan về Blogger Manager</p>
      </div>

      <div className="about-card">
        <h2>Mục tiêu của Blogger Manager</h2>
        <p>
          Hệ thống được xây dựng nhằm hỗ trợ theo dõi danh sách các blogger, quản lý bài viết,
          phân loại chuyên mục và kiểm soát trạng thái nội dung trực quan trên nền tảng web đơn trang (SPA).
        </p>
      </div>

      <div className="about-card">
        <h2>Công Nghệ Sử Dụng</h2>
        <ul className="tech-list">
          <li className="tech-item">
            <strong>React 19 & Vite</strong>
            <span>Khung giao diện người dùng và công cụ đóng gói dự án tốc độ cao.</span>
          </li>
          <li className="tech-item">
            <strong>React Router</strong>
            <span>Xử lý định tuyến đơn trang, chuyển trang mà không cần tải lại trình duyệt.</span>
          </li>
          <li className="tech-item">
            <strong>CSS3</strong>
            <span>Tự thiết kế giao diện với Flexbox, Grid và tương thích trên nhiều thiết bị.</span>
          </li>
        </ul>
      </div>

      <div className="about-card">
        <h2>Người Thực Hiện</h2>
        <div className="team-grid">
          <div className="team-card">
            <h4>Đỗ Thanh Liêm</h4>
            <p>MSSV: N23DCAT041</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
