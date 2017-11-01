const http = require('http');
const through2 = require('through2');

const hostname = '127.0.0.1';
const port = 3003;

const server = http.createServer((req, res) => {
    res.writeHead(200);
    req.pipe(through2((chunk, enc, callback) => {
        const resChunk = chunk.toString() + '\n';
        callback(null, resChunk);
    })).pipe(res);
});

server.listen(port, hostname, () => {
    console.log(`Server ECHO running at http://${hostname}:${port}/`);
});
