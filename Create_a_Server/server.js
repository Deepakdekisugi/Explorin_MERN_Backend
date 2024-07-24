// import http from 'http';

let http = required("http");

http
    .createServer((req, res) => {
        res.write("Hello World!");
        res.end();
    })
    .listen(8080);