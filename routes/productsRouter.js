const express = require('express');
import authMiddleware from '../middlewares/authMiddleware';
import { Products } from '../models';

const productsRouter = express.Router();

// productsRouter.use(authMiddleware);

productsRouter.get('/products', function (req, res) {
    Products.find({}).then(products => {
        res.send(products);
    });
});

productsRouter.get('/products/:id', function (req, res) {
    const id = req.params.id;

    Products.findById(id).then(product => {
        if (product) {
            res.send(product);
        } else {
            res.sendStatus(404);
        }
    });
});

productsRouter.get('/products/:id/reviews', function (req, res) {
    const id = req.params.id;

    Products.findById(id).then(product => {
        if (product) {
            res.send(product.reviews);
        } else {
            res.sendStatus(404);
        }
    });
});

productsRouter.post('/products', function (req, res) {
    const newProduct = req.body;

    if (newProduct && newProduct.name && newProduct.price && newProduct.brand) {
        const product = new Products({
            name: newProduct.name,
            brand: newProduct.brand,
            price: newProduct.price,
            reviews: []
        });

        product.save((err, product) => {
            if (err) return console.error(err);
            res.send(product);
        });
    } else {
        res.sendStatus(400);
    }
});

productsRouter.delete('/products/:id', function (req, res) {
    const id = req.params.id;

    Products.findByIdAndRemove(id, {}, (err) => {
        // for some reason no error when there is no item with such id
        // I'd expect error here, but.. works fine with correct id
        if (err) {
            res.sendStatus(404);
        } else {
            res.json({ message: 'Executed' });
        }
    });
});

module.exports = productsRouter;
