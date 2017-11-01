const http = require('http');
const fs = require('fs');
const through2 = require('through2');

const hostname = '127.0.0.1';
const port = 3001;

const filePath = './http-servers/index.html';
const msg = 'Hello World from html-server\n';

const server = http.createServer((req, res) => {
    fs.access(filePath, fs.constants.R_OK, (err) => {
        if (err) {
            const errMsg = `no access to ${filePath} - incorrect path or not readable!`;
            console.log(errMsg);

            res.writeHead(500, {
                'Content-Length': Buffer.byteLength(errMsg),
                'Content-Type': 'text/plain'
            });
            res.end(errMsg);
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });

            try {
                fs.createReadStream(filePath)
                    .pipe(through2((chunk, enc, callback) => {
                        const resChunk = chunk.toString().replace('{message}', msg);
                        callback(null, resChunk);
                    }))
                    .pipe(res);
            } catch(e) {
                res.end();
            }
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`Server HTML running at http://${hostname}:${port}/`);
});
