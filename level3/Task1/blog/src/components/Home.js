import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  const deletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await axios.delete(`http://localhost:5000/posts/${id}`);
      setPosts(posts.filter(post => post._id !== id));
    }
  };

  return (
    <div className="container">
      <h2>All Blog Posts</h2>
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <Link to="/create">➕ Create New Post</Link>
      </div>

      {posts.length === 0 ? (
        <p>No posts found. Create one!</p>
      ) : (
        posts.map(post => (
          <div key={post._id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}...</p>
            <p><strong>Author:</strong> {post.author}</p>
            <Link to={`/view/${post._id}`}>View</Link>
            <Link to={`/edit/${post._id}`}>Edit</Link>
            <button onClick={() => deletePost(post._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Home;
