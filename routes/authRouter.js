const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();

const users = [
    {
        id: 1,
        login: 'admin',
        password: 'admin',
        email: 'ad@min.ru'
    },
    {
        id: 2,
        login: 'user',
        password: 'looser',
        email: 'pp@pp.ru'
    }
];

authRouter.post('/', function (req, res) {
    const login = req.body.username;
    const password = req.body.password;

    if (login && password) {
        const user = users.find(u => u.login === login);

        if (user && user.password === password) {
            let cert = fs.readFileSync('./config/private.key');
            cert = cert && cert.toString().trim();

            const token = jwt.sign(user, cert, { expiresIn: '1m' });

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
    } else {
        res.status(400).json({ error: 'both username and password are required' });
    }
});


module.exports = authRouter
