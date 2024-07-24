const express = require('express');
const app = express();
const mongoose = require('mongoose');
const todoList = require('./models/todoList');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true });

// Define routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get all todo items
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await todoList.find().exec();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todos' });
  }
});

// Get a single todo item
app.get('/api/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await todoList.findById(id).exec();
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
    } else {
      res.json(todo);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching todo' });
  }
});

// Create a new todo item
app.post('/api/todos', async (req, res) => {
  try {
    const todo = new todoList(req.body);
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating todo' });
  }
});

// Update a todo item
app.put('/api/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const todo = await todoList.findByIdAndUpdate(id, req.body, { new: true });
    if (!todo) {
      res.status(404).json({ message: 'Todo not found' });
    } else {
      res.json(todo);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating todo' });
  }
});

// Delete a todo item
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await todoList.findByIdAndRemove(id);
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting todo' });
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});