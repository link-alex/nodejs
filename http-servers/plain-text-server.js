const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    const body = 'Hello World\n';

    res.writeHead(200, {
        'Content-Length': Buffer.byteLength(body),
        'Content-Type': 'text/plain'
    });
    res.end(body);
});

server.listen(port, hostname, () => {
    console.log(`Server Plain Text running at http://${hostname}:${port}/`);
});
