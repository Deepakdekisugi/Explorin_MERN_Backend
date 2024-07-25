const express = require("express");
const app = express();
const PORT = 3030;

app.get('/', (req, res) => {
    res.send("Hello there World@");
});

app.get('/about', (req, res) => {
    res.send("Hello About");
});

app.listen(PORT , () =>{
    console.log("Example ${PORT}")
})