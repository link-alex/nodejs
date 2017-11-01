const http = require('http');

const hostname = '127.0.0.1';
const port = 3002;

const product = {
    id: 1,
    name: 'Supreme T-Shirt',
    brand: 'Supreme',
    price: 99.99,
    options: [
        { color: 'blue' },
        { size: 'XL' }
    ]
};

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(product));
});

server.listen(port, hostname, () => {
    console.log(`Server JSON running at http://${hostname}:${port}/`);
});
