import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [post, setPost] = useState({ title: '', content: '', author: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('http://localhost:5000/posts', post);
    navigate('/');
  };

  return (
    <div className="container">
      <h2>Create Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={post.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          rows="5"
          value={post.content}
          onChange={handleChange}
          required
        />
        <input
          name="author"
          placeholder="Author"
          value={post.author}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreatePost;
