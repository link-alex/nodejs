const request = require('request');
const jwt = require('jsonwebtoken');
const fs = require('fs');

function authMiddleware(req, res, next) {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    const fbAuthorizationToken = req.get('authorization');

    if (token) {
        let cert = fs.readFileSync('./config/private.key');
        cert = cert && cert.toString().trim();

        jwt.verify(token, cert, (err, decoded) => {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else if (fbAuthorizationToken) {
        getUserByFBAuthorizationToken(fbAuthorizationToken).then(
            (user) => {
                // do checks with user if needed
                next();
            },
            (error) => {
                return res.status(403).send({
                    success: false,
                    message: 'Incorrect FB token'
                });
            }
        );
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
}

function getUserByFBAuthorizationToken(token) {
    return new Promise((resolve, reject) => {
        request.get(`https://graph.facebook.com/me?access_token=${token}`, (err, res, body) => {
            let user = null;

            if (res.statusCode === 200) {
                try {
                    user = JSON.parse(body);
                } catch(e) {
                    reject(e);
                    return;
                }
            } else {
                reject('Incorrect status code');
                return;
            }

            resolve(user);
        });
    });
}

module.exports = authMiddleware;
