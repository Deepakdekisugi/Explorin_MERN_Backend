const mongoose = require('mongoose');

const TodoListSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean
});

module.exports = mongoose.model('TodoList', TodoListSchema);