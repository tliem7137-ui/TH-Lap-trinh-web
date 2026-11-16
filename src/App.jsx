import React, { useState } from 'react';
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
import './App.css';

function App() {
  const [bloggers, setBloggers] = useState(initialBloggers);
  const [posts, setPosts] = useState(initialPosts);

  // Thêm bài viết mới và cập nhật tác giả nếu là tác giả mới
  const handleAddPost = (newPost, newBlogger) => {
    setPosts([newPost, ...posts]);

    if (newBlogger) {
      setBloggers(prev => [newBlogger, ...prev]);
    } else {
      setBloggers(prev => prev.map(b => 
        b.id === newPost.bloggerId ? { ...b, postsCount: b.postsCount + 1 } : b
      ));
    }
  };

  // Xóa bài viết khỏi danh sách
  const handleDeletePost = (id) => {
    const isConfirmed = window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?');
    if (isConfirmed) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Navbar />

        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home bloggers={bloggers} posts={posts} />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/bloggers" element={<Bloggers bloggers={bloggers} />} />
            <Route path="/posts" element={<Posts posts={posts} onDeletePost={handleDeletePost} />} />
            <Route path="/create-post" element={<CreatePost bloggers={bloggers} onAddPost={handleAddPost} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
