// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/api/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    })
      .then(response => response.json())
      .then(newPost => {
        setPosts([...posts, newPost]);
        setTitle('');
        setContent('');
      })
      .catch(err => console.error('Error posting data:', err));
  };

  return (
    <div>
      <h1>Simple Blog</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Add Post</button>
      </form>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
