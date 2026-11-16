import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pages.css';

function NotFound() {
  return (
    <div className="page-container container">
      <div className="not-found-wrapper">
        <div className="not-found-code">404</div>
        <h2 className="not-found-title">Không Tìm Thấy Trang</h2>
        <p className="not-found-desc">
          Đường dẫn URL bạn truy cập không tồn tại hoặc đã bị di chuyển.
        </p>
        <Link to="/" className="btn-submit" style={{ textDecoration: 'none', display: 'inline-block' }}>
          Quay về Trang chủ
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
