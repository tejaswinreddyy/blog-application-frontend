import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function EditBlog() {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: "", description: "", published: false, userId: "" });

  useEffect(() => {
    axios.get(`http://localhost:8080/blogs/${blogId}`, { withCredentials: true })
      .then(res => {
        const fetchedBlog = res.data.data;
        setBlog(fetchedBlog);  
      })
      .catch(err => {
        console.error("Failed to fetch blog for editing:", err);
      });
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:8080/blogs/${blogId}`,
        { 
          ...blog,  
          userId: blog.userId 
        },
        { withCredentials: true }
      );
      alert("Blog updated successfully!");
      navigate(`/blogs/${blogId}`);
    } catch (error) {
      console.error("Failed to update blog:", error);
      alert("Failed to update blog.");
    }
  };

  const handleChange = (e) => {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow">
        <h1 className="text-3xl font-bold mb-4">Edit Blog</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Title</label>
            <input
              type="text"
              name="title"
              className="w-full border rounded p-2"
              value={blog.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              className="w-full border rounded p-2"
              rows="4"
              value={blog.description}
              onChange={handleChange}
              required
            />
          </div>
        
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
}
