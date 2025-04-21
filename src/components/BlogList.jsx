import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  
  const isLoggedIn = localStorage.getItem('username'); 

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const backendPage = page - 1;
        const response = await api.get(
          `/blogs?page=${backendPage}&size=${size}`,
          { withCredentials: true }
        );
        setBlogs(response.data.data.data);
        setTotalPages(response.data.data.totalPages);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, [page, size]);

  const handleCardClick = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };

  const handleLogout = () => {
    
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    
    window.location.reload(); 
  };

  return (
    <div>
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Blogs</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.blogId}
              className="cursor-pointer bg-white p-4 rounded shadow hover:shadow-lg transition duration-300"
              onClick={() => handleCardClick(blog.blogId)}
            >
              <h2 className="text-xl font-semibold text-blue-600 mb-2">{blog.title}</h2>
              <p className="text-gray-700 line-clamp-3">{blog.description}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
