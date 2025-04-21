// src/pages/BlogList.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  // Check if user is logged in
  // const isLoggedIn = localStorage.getItem('username'); // Check if username exists in localStorage

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const backendPage = page - 1;
        const response = await axios.get(
          `http://localhost:8080/blogs?page=${backendPage}&size=${size}`,
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
    // Remove user credentials from localStorage on logout
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    // Optionally, redirect to login page
    window.location.reload(); // Reload to reflect changes
  };

  return (
    <div>
      {/* <nav className="bg-gray-800 text-white p-4">
        <div className="flex justify-between items-center">
          <div>
            <a href="/" className="text-xl font-bold">BlogApp</a>
          </div>

          <div>
            {isLoggedIn ? (
              // If logged in, show Logout button
              <button
                onClick={handleLogout}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              // If not logged in, show Login and Signup buttons
              <>
                <a
                  href="/login"
                  className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 mr-2"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
                >
                  Signup
                </a>
              </>
            )}
          </div>
        </div>
      </nav> */}

      {/* Blog List */}
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

        {/* Pagination */}
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
