const express = require("express");

const PORT = 8080;
const app = express();
app.use(express.json());

const blogs = [];

app.get("/health", (req,res) => {
    res.send("ok");
});

app.post("/blog", (req, res) => {
    const {body} =req;
    const {author, content} = body;
    
    if(author && content){
        blogs.push({author, content});
        res.send("OK");
        return;
    }
    res.status(400).send("!OK");
});

app.get("./blog", (req, res) => {
    res.json(blogs).send();
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})