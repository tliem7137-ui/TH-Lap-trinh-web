import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <div className="logo-area">
          <Link to="/" className="logo-area">
            <span className="logo-badge">BM</span>
            <span className="logo-title">Blogger Manager</span>
          </Link>
        </div>

        <nav className="main-nav">
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            end
          >
            Trang chủ
          </NavLink>
          <NavLink 
            to="/bloggers" 
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Quản lý Blogger
          </NavLink>
          <NavLink 
            to="/posts" 
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Bài viết
          </NavLink>
          <NavLink 
            to="/about-us" 
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
          >
            Giới thiệu
          </NavLink>
          <NavLink 
            to="/create-post" 
            className="btn-header-action"
          >
            + Viết bài mới
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
