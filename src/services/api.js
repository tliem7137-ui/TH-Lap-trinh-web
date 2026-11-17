import axios from 'axios';
import { initialBloggers, initialPosts } from '../data/mockData';

// Khởi tạo instance axios kết nối đến ASP.NET Core Web API
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Biến lưu trữ fallback khi backend chưa khởi động
let localBloggers = [...initialBloggers];
let localPosts = [...initialPosts];

// ================= BLOGGERS API (GET, POST, PUT, DELETE) =================

// 1. GET: Lấy danh sách tất cả blogger
export const getBloggers = async () => {
  try {
    const response = await apiClient.get('/bloggers');
    return response.data;
  } catch (error) {
    console.warn('Backend chưa khởi động hoặc gặp lỗi, sử dụng dữ liệu cục bộ:', error.message);
    return localBloggers;
  }
};

// 2. GET: Lấy chi tiết một blogger theo ID
export const getBloggerById = async (id) => {
  try {
    const response = await apiClient.get(`/bloggers/${id}`);
    return response.data;
  } catch (error) {
    console.warn('Backend chưa khởi động, tìm kiếm trên dữ liệu cục bộ:', error.message);
    return localBloggers.find((b) => b.id === Number(id)) || null;
  }
};

// 3. POST: Thêm mới một blogger
export const createBlogger = async (bloggerData) => {
  try {
    const response = await apiClient.post('/bloggers', bloggerData);
    return response.data;
  } catch (error) {
    console.warn('Backend chưa khởi động, thêm vào dữ liệu cục bộ:', error.message);
    const newBlogger = {
      id: Date.now(),
      ...bloggerData,
      postsCount: 0,
      followers: 0,
      joinDate: new Date().toLocaleDateString('vi-VN'),
    };
    localBloggers = [newBlogger, ...localBloggers];
    return newBlogger;
  }
};

// 4. PUT: Cập nhật thông tin blogger theo ID
export const updateBlogger = async (id, updatedData) => {
  try {
    const response = await apiClient.put(`/bloggers/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.warn('Backend chưa khởi động, cập nhật dữ liệu cục bộ:', error.message);
    localBloggers = localBloggers.map((b) =>
      b.id === Number(id) ? { ...b, ...updatedData } : b
    );
    return { success: true, id };
  }
};

// 5. DELETE: Xóa blogger theo ID
export const deleteBlogger = async (id) => {
  try {
    const response = await apiClient.delete(`/bloggers/${id}`);
    return response.data;
  } catch (error) {
    console.warn('Backend chưa khởi động, xóa trên dữ liệu cục bộ:', error.message);
    localBloggers = localBloggers.filter((b) => b.id !== Number(id));
    return { success: true, id };
  }
};

// ================= POSTS API (GET, POST, PUT, DELETE) =================

// 1. GET: Lấy danh sách tất cả bài viết
export const getPosts = async (params = {}) => {
  try {
    const response = await apiClient.get('/posts', { params });
    return response.data;
  } catch (error) {
    console.warn('Backend chưa khởi động hoặc gặp lỗi, sử dụng dữ liệu cục bộ:', error.message);
    return localPosts;
  }
};

// 2. GET: Lấy chi tiết bài viết theo ID
export const getPostById = async (id) => {
  try {
    const response = await apiClient.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.warn('Backend chưa khởi động, tìm kiếm trên dữ liệu cục bộ:', error.message);
    return localPosts.find((p) => p.id === Number(id)) || null;
  }
};

// 3. POST: Đăng bài viết mới
export const createPost = async (postData) => {
  try {
    const response = await apiClient.post('/posts', postData);
    return response.data;
  } catch (error) {
    console.warn('Backend chưa khởi động, thêm vào dữ liệu cục bộ:', error.message);
    const newPost = {
      id: Date.now(),
      ...postData,
      views: 0,
      likes: 0,
      createdAt: new Date().toLocaleDateString('vi-VN'),
    };
    localPosts = [newPost, ...localPosts];
    return newPost;
  }
};

// 4. PUT: Cập nhật bài viết theo ID (ví dụ: đổi trạng thái hoặc sửa tiêu đề)
export const updatePost = async (id, updatedData) => {
  try {
    const response = await apiClient.put(`/posts/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.warn('Backend chưa khởi động, cập nhật dữ liệu cục bộ:', error.message);
    localPosts = localPosts.map((p) =>
      p.id === Number(id) ? { ...p, ...updatedData } : p
    );
    return { success: true, id };
  }
};

// 5. DELETE: Xóa bài viết theo ID
export const deletePost = async (id) => {
  try {
    const response = await apiClient.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.warn('Backend chưa khởi động, xóa trên dữ liệu cục bộ:', error.message);
    localPosts = localPosts.filter((p) => p.id !== Number(id));
    return { success: true, id };
  }
};

export default apiClient;
