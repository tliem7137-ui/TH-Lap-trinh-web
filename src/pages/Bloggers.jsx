import React, { useState } from 'react';
import '../styles/Pages.css';

function Bloggers({ bloggers }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All');

  // Lấy danh sách các chủ đề duy nhất để đưa vào dropdown filter
  const topics = ['All', ...new Set(bloggers.map(b => b.topic))];

  // Lọc blogger theo từ khóa và chủ đề
  const filteredBloggers = bloggers.filter(blogger => {
    const matchesSearch = blogger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blogger.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTopic = selectedTopic === 'All' || blogger.topic === selectedTopic;
    return matchesSearch && matchesTopic;
  });

  return (
    <div className="page-container container">
      <div className="page-header">
        <h1>Quản Lý Danh Sách Blogger</h1>
        <p>Danh sách các tác giả và nhà sáng tạo nội dung trong hệ thống</p>
      </div>

      {/* Thanh tìm kiếm và bộ lọc */}
      <div className="filter-toolbar">
        <input 
          type="text"
          className="search-input"
          placeholder="Tìm theo tên hoặc tài khoản (@username)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select 
          className="filter-select"
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
        >
          {topics.map(topic => (
            <option key={topic} value={topic}>
              {topic === 'All' ? 'Tất cả chủ đề' : topic}
            </option>
          ))}
        </select>
      </div>

      {/* Danh sách hiển thị */}
      <div className="bloggers-grid">
        {filteredBloggers.length > 0 ? (
          filteredBloggers.map(blogger => (
            <div key={blogger.id} className="blogger-home-card">
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
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '15px' }}>
                {blogger.bio}
              </p>
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
            </div>
          ))
        ) : (
          <p style={{ color: '#64748b', gridColumn: '1 / -1', textAlign: 'center', padding: '30px 0' }}>
            Không tìm thấy blogger nào phù hợp với điều kiện tìm kiếm.
          </p>
        )}
      </div>
    </div>
  );
}

export default Bloggers;
