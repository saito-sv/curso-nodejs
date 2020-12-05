const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/index.html") {
    return index(req, res)
  }
  if (req.method === "GET" && req.url === "/nosotros.html") {
    return nosotros(req, res)
  }
  res.write('hola');
  res.end();
});

function index(req, res) {
  const stat = fs.statSync('./index.html');
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': stat.size
  })

  const readStream = fs.createReadStream('./index.html');
  readStream.pipe(res);
}

function nosotros(req, res) {
  const stat = fs.statSync('./nosotros.html');
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Content-Length': stat.size
  })

  const readStream = fs.createReadStream('./nosotros.html');
  readStream.pipe(res);
}

server.listen(8080);
