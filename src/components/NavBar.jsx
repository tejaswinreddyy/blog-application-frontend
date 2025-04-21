import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useContext } from "react";
import axios from "axios";

const Navbar = () => {
  const auth = useAuth();
  const { isAuthenticated ,logout} = auth;

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      {/* App title redirecting to home */}
      <Link to="/" className="bg-white text-blue-600 px-4 py-2 rounded font-bold hover:bg-blue-100">
        BLOGS
      </Link>

      <div className="space-x-4 flex items-center">
        {isAuthenticated ? (
          <>
            {/* Create Blog Button */}
            <Link
              to="/blogs/create-blog"
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition"
            >
              Create Blog
            </Link>

            {/* User Blogs Button */}
            <Link
              to="/blogs/user-blogs"
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition"
            >
              MY BLOGS
            </Link>

            {/* Logout Button */}
            <button
              onClick={()=>logout()}
              to="/"
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
