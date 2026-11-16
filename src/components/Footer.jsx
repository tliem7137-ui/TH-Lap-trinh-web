import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-info">
            <h4>Hệ Thống Quản Lý Blogger (Blogger Manager)</h4>
          </div>
          <div className="footer-links">
            <Link to="/">Trang chủ</Link>
            <Link to="/bloggers">Danh sách Blogger</Link>
            <Link to="/posts">Quản lý bài viết</Link>
            <Link to="/about-us">Giới thiệu</Link>
          </div>
        </div>
        <div className="footer-copyright">
          <p>© {new Date().getFullYear()} Blogger Manager. Xây dựng bằng React & Vite.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
