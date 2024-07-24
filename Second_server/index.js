const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const cors = require('cors');

const port = 3000;
const rootDir = __dirname + '/public';

http.createServer((req, res) => {
  const urlPath = url.parse(req.url).pathname;
  const filePath = path.join(rootDir, urlPath);

  if (fs.existsSync(filePath)) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end(`File not found: ${filePath}`);
      } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(data.toString());
      }
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end(`File not found: ${filePath}`);
  }
}).listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Enable CORS
http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});