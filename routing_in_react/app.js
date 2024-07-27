const express = require("express");

const PORT = 8080;
const app = express();

const blogs = [];

app.use(express.json());

// !TODO: mount routes
app.get("/health", (req, res) => {
  res.send("OK");
});

// Create
app.post("/blog", (req, res) => {
  //   console.log(req.body);
  const { body } = req;

  const { author, content } = body;

  if (author && content) {
    blogs.push({ author, content });
    res.send("OK");
    return;
  }
  res.status(400).send("!OK");
});

// Read all blogs
app.get("/blog", (req, res) => {
  res.status(200).json(blogs).send();
});

// Read individual blog using ID
app.get("/blog/:blogId", (req, res) => {
  let { blogId } = req.params;
  console.log(blogId);

  if (blogId > 0 && blogId <= blogs.length) {
    blogId -= 1;
    const blogToReturn = blogs[blogId];
    return res.status(200).json(blogToReturn).send();
  }
  //   res.json(blogs).send();
  res.status(404).send();
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
