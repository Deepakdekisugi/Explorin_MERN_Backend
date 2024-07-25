import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '' });

  useEffect(() => {
    axios.get('http://localhost:3001/api/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleAddTodo = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/api/todos', newTodo)
      .then(() => setNewTodo({ title: '', description: '' }))
      .catch(error => console.error(error));
  };

  const handleDeleteTodo = (id) => {
    axios.delete(`http://localhost:3001/api/todos/${id}`)
      .then(() => {
        const newTodos = todos.filter((todo) => todo._id !== id);
        setTodos(newTodos);
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>To-Do List App</h1>
      <form onSubmit={handleAddTodo}>
        <input type="text" value={newTodo.title} onChange={(event) => setNewTodo({ ...newTodo, title: event.target.value })}
          placeholder="Enter a new to-do item" />
        <input type="text" value={newTodo.description} onChange={(event) => setNewTodo({ ...newTodo, description: event.target.value })}
          placeholder="Enter a description for the to-do item" />
        <button type="submit">Add To-Do Item</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.title} - {todo.description}
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;