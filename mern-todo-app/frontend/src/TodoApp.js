import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    axios.get('/api/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newTodo = { text, completed: false };
    await axios.post('/api/todos', newTodo);
    setTodos([...todos, newTodo]);
    setText('');
  };

  const handleToggleCompleted = async (id) => {
    const todo = await axios.get(`/api/todos/${id}`);
    await axios.put(`/api/todos/${id}`, { completed: !todo.data.completed });
    setTodos(todos.map((todo) => todo._id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/todos/${id}`);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <div>
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={(event) => setText(event.target.value)} />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <input type="checkbox" checked={todo.completed} onChange={() => handleToggleCompleted(todo._id)} />
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
            <button onClick={() => handleDelete(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;