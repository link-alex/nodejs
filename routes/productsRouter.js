const express = require('express');
import authMiddleware from '../middlewares/authMiddleware';

const productsRouter = express.Router();

let nextId = 1;
const productBase = {
    name: '',
    brand: '',
    price: 0,
    reviews: []
};

function formatProduct(params = {}) {
    return Object.assign({}, productBase, params, { id: nextId++ });
}

const products = [];

products.push(formatProduct({
    name: 'Supreme T-Shirt',
    brand: 'Supreme',
    price: 99.99,
    reviews: [
        { author: 'David', text: 'That is good product' },
        { author: 'John', text: 'whhhhhaaaaat?' }
    ]
}));
products.push(formatProduct({
    name: 'Supreme T-Shirt',
    brand: 'Supreme',
    price: 99.99,
    reviews: []
}));

productsRouter.use(authMiddleware);

productsRouter.get('/products', function (req, res) {
    const all = JSON.stringify(products);

    if (req.parsedCookies) {
        console.log('parsedCookies', req.parsedCookies);
    }

    res.send(all);
});

productsRouter.get('/products/:id', function (req, res) {
    const id = req.params.id;
    const product = products.find(p => p.id === +id);

    if (product) {
        res.send(JSON.stringify(product));
    } else {
        res.sendStatus(404);
    }
});

productsRouter.get('/products/:id/reviews', function (req, res) {
    const id = req.params.id;
    const product = products.find(p => p.id === +id);

    if (product) {
        res.send(JSON.stringify(product.reviews));
    } else {
        res.sendStatus(404);
    }
});

productsRouter.post('/products', function (req, res) {
    const newProduct = req.body;

    if (newProduct && newProduct.name && newProduct.price && newProduct.brand) {
        products.push(formatProduct(newProduct));
        res.send(newProduct);
    } else {
        res.sendStatus(400);
    }

});

module.exports = productsRouter
