'use strict';

import { Products } from '../../models';


function getAllProducts(req, res) {
    Products.find({}).then(products => {
        res.send(products);
    });
}

function getProductById(req, res) {
    const id = req.swagger.params.id.value;

    Products.findById(id).then(product => {
        if (product) {
            res.send(product);
        } else {
            res.sendStatus(404);
        }
    });
}

function getProductReviewsById(req, res) {
    const id = req.swagger.params.id.value;

    Products.findById(id).then(product => {
        if (product) {
            res.send(product.reviews);
        } else {
            res.sendStatus(404);
        }
    });
}

function addProduct(req, res) {
    const newProduct = req.swagger.params.body.value;

    const product = new Products({
        name: newProduct.name,
        brand: newProduct.brand,
        price: newProduct.price,
        reviews: []
    });

    product.save((err, product) => {
        if (err) return res.sendStatus(500);
        res.send(product);
    });
}

function deleteProductById(req, res) {
    const id = req.swagger.params.id.value;

    Products.findByIdAndRemove(id, {}, (err) => {
        // for some reason no error when there is no item with such id
        // I'd expect error here, but.. works fine with correct id
        if (err) {
            res.sendStatus(404);
        } else {
            res.json({ message: 'Executed' });
        }
    });
}

module.exports = {
    getAllProducts,
    getProductById,
    getProductReviewsById,
    addProduct,
    deleteProductById
};
