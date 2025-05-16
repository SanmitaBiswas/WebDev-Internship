import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function ViewPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!post) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container">
      <h2>{post.title}</h2>
      <p><strong>Author:</strong> {post.author}</p>
      <p>{post.content}</p>
      <Link to="/">← Back to Home</Link>
    </div>
  );
}

export default ViewPost;
