const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');

import { User } from '../models';

const authRouter = express.Router();

authRouter.post('/', function (req, res) {
    const login = req.body.username;
    const password = req.body.password;

    if (login && password) {
        User.findOne({
            where: { login }
        }).then(user => {
            if (user && user.password === password) {
                let cert = fs.readFileSync('./config/private.key');
                cert = cert && cert.toString().trim();

                const userObj = JSON.parse(JSON.stringify(user));
                const token = jwt.sign(userObj, cert, { expiresIn: '1h' });

                res.status(200).json({
                    message: 'OK',
                    data: {
                        user: {
                            email: user.email,
                            username: user.login
                        }
                    },
                    token
                });
            } else {
                res.status(404).json({ error: 'incorrect user info' });
            }
        })
    } else {
        res.status(400).json({ error: 'both username and password are required' });
    }
});


module.exports = authRouter
