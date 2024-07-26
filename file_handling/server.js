let http = require("http");
let fs = require("fs");
const { log } = require("console");

console.log("starting server");

http
  .createServer((req, res) => {
    fs.readFile("response.html", (err, data) => {
      if (!err) {
        res.writeHead(200, {
          "Content-Type": "text/json",
        });
        res.write(data);
        return res.end();
      }
      res;
      res.write("error while reading file" + err);
      return res.end();
    });
    //     console.log({header:req.headers});
    //     console.log({req});
    //   res.write("hello world")
    //   res.end();
  })
  .listen(8080, () => {
    console.log("welcome");
  });

// custom event in http server