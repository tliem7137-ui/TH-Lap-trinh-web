import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Bloggers from './pages/Bloggers';
import Posts from './pages/Posts';
import CreatePost from './pages/CreatePost';
import NotFound from './pages/NotFound';
import { initialBloggers, initialPosts } from './data/mockData';
import { getBloggers, getPosts, createPost, updatePost, deletePost } from './services/api';
import './App.css';

function App() {
  const [bloggers, setBloggers] = useState(initialBloggers);
  const [posts, setPosts] = useState(initialPosts);
  const [isLoading, setIsLoading] = useState(false);

  // 1. GET Request bằng Axios khi ứng dụng khởi chạy
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [bloggersData, postsData] = await Promise.all([
          getBloggers(),
          getPosts(),
        ]);
        if (bloggersData && bloggersData.length > 0) setBloggers(bloggersData);
        if (postsData && postsData.length > 0) setPosts(postsData);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu từ API:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // 2. POST Request bằng Axios: Thêm bài viết mới
  const handleAddPost = async (newPostData, newBlogger) => {
    try {
      const createdPost = await createPost({
        title: newPostData.title,
        excerpt: newPostData.excerpt,
        category: newPostData.category,
        status: newPostData.status,
        bloggerName: newPostData.bloggerName,
        bloggerId: newPostData.bloggerId,
      });

      // Cập nhật lại state giao diện
      setPosts((prev) => [createdPost || newPostData, ...prev]);

      if (newBlogger) {
        setBloggers((prev) => [newBlogger, ...prev]);
      } else {
        setBloggers((prev) =>
          prev.map((b) =>
            b.id === newPostData.bloggerId ? { ...b, postsCount: b.postsCount + 1 } : b
          )
        );
      }
    } catch (error) {
      console.error('Lỗi khi gửi POST request tạo bài viết:', error);
    }
  };

  // 3. PUT Request bằng Axios: Đổi trạng thái bài viết (Xuất bản <-> Bản nháp)
  const handleToggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'Đã xuất bản' ? 'Bản nháp' : 'Đã xuất bản';
    try {
      await updatePost(id, { status: nextStatus });
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: nextStatus } : p))
      );
    } catch (error) {
      console.error('Lỗi khi gửi PUT request cập nhật bài viết:', error);
    }
  };

  // 4. DELETE Request bằng Axios: Xóa bài viết
  const handleDeletePost = async (id) => {
    const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?');
    if (!isConfirmed) return;

    try {
      await deletePost(id);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      console.error('Lỗi khi gửi DELETE request xóa bài viết:', error);
    }
  };

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Navbar />

        <div className="main-content">
          {isLoading && (
            <div style={{ textAlign: 'center', padding: '10px', fontSize: '13px', color: '#64748b' }}>
              Đang tải dữ liệu từ API Backend...
            </div>
          )}

          <Routes>
            <Route path="/" element={<Home bloggers={bloggers} posts={posts} />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/bloggers" element={<Bloggers bloggers={bloggers} />} />
            <Route
              path="/posts"
              element={
                <Posts
                  posts={posts}
                  onDeletePost={handleDeletePost}
                  onToggleStatus={handleToggleStatus}
                />
              }
            />
            <Route
              path="/create-post"
              element={<CreatePost bloggers={bloggers} onAddPost={handleAddPost} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
