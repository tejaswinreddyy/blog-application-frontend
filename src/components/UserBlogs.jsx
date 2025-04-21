import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const fetchUserBlogs = async () => {
    try {
      const backendPage = page - 1;
      const response = await axios.get(
        `http://localhost:8080/blogs/user-blogs?page=${backendPage}&size=${size}`,
        { withCredentials: true }
      );
      setBlogs(response.data.data.data);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch user blogs:", error);
    }
  };

  useEffect(() => {
    fetchUserBlogs();
  }, [page, size]);

  const handleEdit = (blogId) => {
    navigate(`/blogs/update/${blogId}`);
  };

  const handleDelete = async (blogId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:8080/blogs/${blogId}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("Blog deleted successfully!");
        setBlogs((prevBlogs) => prevBlogs.filter((b) => b.blogId !== blogId));
      }
    } catch (error) {
      console.error("Failed to delete blog:", error);
      alert("Failed to delete blog.");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Blogs</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.blogId}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition duration-300 flex flex-col justify-between"
          >
            <div onClick={() => navigate(`/blogs/${blog.blogId}`)} className="cursor-pointer">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">{blog.title}</h2>
              <p className="text-gray-700 line-clamp-3">{blog.description}</p>
              <span className={`inline-block mt-2 px-2 py-1 text-xs rounded-full ${blog.published ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                {blog.published ? "Published" : "Draft"}
              </span>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEdit(blog.blogId)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog.blogId)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
              >
                Delete
              </button>
            </div>
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
  );
};

export default UserBlogs;
