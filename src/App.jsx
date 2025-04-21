import React from "react";
import BlogList from "./components/BlogList";
import Navbar from "./components/NavBar";
import "tailwindcss";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signup";
import BlogDetails from "./components/BlogDetails";
import UserBlogs from "./components/UserBlogs";
import CreateBlog from "./components/CreateBlog";
import EditBlog from "./components/EditPage";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/blogs/:blogId" element={<BlogDetails />} />
        <Route path="/blogs/user-blogs" element={<UserBlogs/>} />  
        <Route path="/blogs/create-blog" element={<CreateBlog />} />
        <Route path="/blogs/update/:blogId" element={<EditBlog />} />  
      </Routes>
    </div>
  );
};

export default App;
