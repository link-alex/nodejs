const express = require('express');
import authMiddleware from '../middlewares/authMiddleware';
import { User } from '../models';

const usersRouter = express.Router();

usersRouter.use(authMiddleware);

usersRouter.get('/users', function (req, res) {
    if (req.parsedQuery) {
        console.log('parsedQuery', req.parsedQuery);
    }

    User.findAll().then(users => {
        const all = JSON.stringify(users);
        res.send(all);
    });
});

module.exports = usersRouter;
