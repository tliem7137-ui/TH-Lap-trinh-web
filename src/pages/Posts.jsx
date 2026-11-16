import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pages.css';

function Posts({ posts, onDeletePost }) {
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredPosts = posts.filter(post => {
    if (filterStatus === 'All') return true;
    return post.status === filterStatus;
  });

  return (
    <div className="page-container container">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h1>Quản Lý Bài Viết</h1>
          <p>Xem toàn bộ danh sách bài viết, tình trạng kiểm duyệt và thao tác quản lý</p>
        </div>
        <Link to="/create-post" className="btn-submit" style={{ textDecoration: 'none', display: 'inline-block' }}>
          + Thêm bài viết mới
        </Link>
      </div>

      <div className="filter-toolbar">
        <select 
          className="filter-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">Tất cả trạng thái</option>
          <option value="Đã xuất bản">Đã xuất bản</option>
          <option value="Bản nháp">Bản nháp</option>
        </select>
        <span style={{ fontSize: '14px', color: '#64748b' }}>
          Hiển thị: <strong>{filteredPosts.length}</strong> bài viết
        </span>
      </div>

      <div className="table-responsive">
        <table className="custom-table">
          <thead>
            <tr>
              <th style={{ width: '60px' }}>Mã</th>
              <th>Tiêu đề bài viết</th>
              <th>Tác giả</th>
              <th>Chuyên mục</th>
              <th>Ngày tạo</th>
              <th>Lượt xem</th>
              <th>Trạng thái</th>
              <th style={{ textAlign: 'center' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <tr key={post.id}>
                  <td>#{post.id}</td>
                  <td>
                    <strong>{post.title}</strong>
                  </td>
                  <td>{post.bloggerName}</td>
                  <td>
                    <span className="post-category-tag">{post.category}</span>
                  </td>
                  <td>{post.createdAt}</td>
                  <td>{post.views.toLocaleString('vi-VN')}</td>
                  <td>
                    <span className={`post-status-badge ${post.status === 'Đã xuất bản' ? 'status-published' : 'status-draft'}`}>
                      {post.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <div className="action-btn-group" style={{ justifyContent: 'center' }}>
                      <button 
                        className="btn-sm-delete"
                        onClick={() => onDeletePost(post.id)}
                        title="Xóa bài viết"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                  Không có bài viết nào phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Posts;
