import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditPost() {
  const { id } = useParams();
  const [post, setPost] = useState({ title: '', content: '', author: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = e => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/posts/${id}`, post);
    navigate('/');
  };

  return (
    <div className="container">
      <h2>Edit Blog Post</h2>
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
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditPost;
