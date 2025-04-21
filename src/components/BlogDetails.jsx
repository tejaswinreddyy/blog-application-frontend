import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BlogDetail() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/blogs/${blogId}`, { withCredentials: true })
      .then((res) => {
        setBlog(res.data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch blog detail:", err);
      });
  }, [blogId]);

  if (!blog) return <div className="p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-700 mb-4">{blog.description}</p>
        <p className="text-sm text-gray-500">
          Created At: {new Date(blog.createdAt).toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">
          Updated At: {new Date(blog.updatedAt).toLocaleString()}
        </p>
        
      </div>
    </div>
  );
}
