import React from "react";
import { blogPosts } from "../data/blogPosts";

const Blog = () => {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Gyros Hero Blog</h1>
      <div className="space-y-10">
        {blogPosts.map(post => (
          <div key={post.id}>
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-semibold mb-1">{post.title}</h2>
            <p className="text-gray-600 text-sm mb-2">{post.date}</p>
            <p className="text-gray-800 whitespace-pre-line">{post.content.trim()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;