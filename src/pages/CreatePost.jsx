import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Pages.css';

function CreatePost({ bloggers, onAddPost }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    authorName: '',
    category: '',
    excerpt: '',
    status: 'Đã xuất bản'
  });

  const [message, setMessage] = useState('');

  // Lấy danh sách các chuyên mục hiện có để làm gợi ý
  const defaultCategories = ['Công nghệ', 'Du lịch', 'Ẩm thực', 'Đời sống', 'Kinh tế', 'Giáo dục'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTitle = formData.title.trim();
    const trimmedAuthor = formData.authorName.trim();
    const trimmedCategory = formData.category.trim();
    const trimmedExcerpt = formData.excerpt.trim();

    if (!trimmedTitle || !trimmedAuthor || !trimmedCategory || !trimmedExcerpt) {
      alert('Vui lòng điền đầy đủ tiêu đề, tên tác giả, chuyên mục và tóm tắt bài viết!');
      return;
    }

    // Kiểm tra xem tác giả đã có trong hệ thống chưa
    const existingBlogger = bloggers.find(
      b => b.name.toLowerCase() === trimmedAuthor.toLowerCase()
    );

    let bloggerId = existingBlogger ? existingBlogger.id : Date.now();
    let newBlogger = null;

    // Nếu là tác giả mới, tạo thêm bản ghi blogger mới vào hệ thống
    if (!existingBlogger) {
      newBlogger = {
        id: bloggerId,
        name: trimmedAuthor,
        username: `@${trimmedAuthor.toLowerCase().replace(/\s+/g, '_')}`,
        email: `${trimmedAuthor.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        topic: trimmedCategory,
        postsCount: 1,
        followers: 0,
        status: 'Đang hoạt động',
        joinDate: new Date().toLocaleDateString('vi-VN'),
        bio: `Tác giả chuyên mục ${trimmedCategory}.`,
        avatar: '/default-avatar.svg'
      };
    }

    const newPost = {
      id: Date.now(),
      title: trimmedTitle,
      bloggerName: trimmedAuthor,
      bloggerId: bloggerId,
      category: trimmedCategory,
      views: 0,
      likes: 0,
      createdAt: new Date().toLocaleDateString('vi-VN'),
      status: formData.status,
      excerpt: trimmedExcerpt
    };

    onAddPost(newPost, newBlogger);
    setMessage('Thêm bài viết mới thành công! Hệ thống đang chuyển hướng sang trang quản lý...');

    setTimeout(() => {
      navigate('/posts');
    }, 1200);
  };

  return (
    <div className="page-container container">
      <div className="page-header">
        <h1>Thêm Bài Viết Mới</h1>
        <p>Soạn thảo nội dung, nhập tác giả và chuyên mục cho hệ thống</p>
      </div>

      <div className="form-card">
        {message && <div className="alert-success">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Tiêu đề bài viết *</label>
            <input 
              type="text"
              id="title"
              name="title"
              className="form-control"
              placeholder="Nhập tiêu đề bài viết..."
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="authorName">Tác giả (Blogger) *</label>
              <input 
                type="text"
                id="authorName"
                name="authorName"
                className="form-control"
                placeholder="Nhập tên tác giả mới hoặc chọn có sẵn..."
                list="blogger-suggestions"
                value={formData.authorName}
                onChange={handleChange}
                required
              />
              <datalist id="blogger-suggestions">
                {bloggers.map(blogger => (
                  <option key={blogger.id} value={blogger.name} />
                ))}
              </datalist>
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                Có thể nhập trực tiếp tên blogger mới chưa có trên hệ thống
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="category">Chuyên mục *</label>
              <input 
                type="text"
                id="category"
                name="category"
                className="form-control"
                placeholder="Nhập chuyên mục mới hoặc chọn gợi ý..."
                list="category-suggestions"
                value={formData.category}
                onChange={handleChange}
                required
              />
              <datalist id="category-suggestions">
                {defaultCategories.map(cat => (
                  <option key={cat} value={cat} />
                ))}
              </datalist>
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                Có thể nhập tên chuyên mục tùy ý
              </span>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="status">Trạng thái phát hành</label>
            <select 
              id="status"
              name="status"
              className="form-control"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Đã xuất bản">Đã xuất bản (Công khai)</option>
              <option value="Bản nháp">Lưu bản nháp</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="excerpt">Tóm tắt ngắn bài viết *</label>
            <textarea 
              id="excerpt"
              name="excerpt"
              rows="4"
              className="form-control"
              placeholder="Nhập mô tả tóm tắt nội dung của bài viết..."
              value={formData.excerpt}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn-submit">
            Lưu và Đăng bài viết
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
