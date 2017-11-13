const express = require('express');
import authMiddleware from '../middlewares/authMiddleware';
import { Product } from '../models';

const productsRouter = express.Router();

productsRouter.use(authMiddleware);

productsRouter.get('/products', function (req, res) {
    if (req.parsedCookies) {
        console.log('parsedCookies', req.parsedCookies);
    }

    Product.findAll().then(products => {
        const all = JSON.stringify(products);
        res.send(all);
    });
});

productsRouter.get('/products/:id', function (req, res) {
    const id = req.params.id;

    Product.findById(id).then(product => {
        if (product) {
            res.send(JSON.stringify(product));
        } else {
            res.sendStatus(404);
        }
    });
});

productsRouter.get('/products/:id/reviews', function (req, res) {
    const id = req.params.id;

    Product.findById(id).then(product => {
        if (product) {
            res.send(JSON.stringify(product.reviews));
        } else {
            res.sendStatus(404);
        }
    });
});

productsRouter.post('/products', function (req, res) {
    const newProduct = req.body;

    if (newProduct && newProduct.name && newProduct.price && newProduct.brand) {
        Product.create({
            name: newProduct.name,
            brand: newProduct.brand,
            price: newProduct.price,
            reviews: []
        }).then((product) => {
            res.send(JSON.stringify(product));
        });
    } else {
        res.sendStatus(400);
    }
});

module.exports = productsRouter;
