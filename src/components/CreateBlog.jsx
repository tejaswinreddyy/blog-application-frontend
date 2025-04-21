// src/pages/CreateBlog.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    
    try {
      console.log("hello");
    
    e.preventDefault();
      const blog = { title, description, published };
      await axios.post("http://localhost:8080/blogs", blog, { withCredentials: true });
      navigate("/blogs/user-blogs");
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create New Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            className="w-full border rounded p-2"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
