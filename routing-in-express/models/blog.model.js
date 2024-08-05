const { Schema, model, default: mongoose } = require("mongoose");

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "authors",
  },
});

const Blog = model("blogs", blogSchema);

module.exports = {
  Blog,
};
