const express = require('express');
import authMiddleware from '../middlewares/authMiddleware';
import { Users } from '../models';

const usersRouter = express.Router();

// usersRouter.use(authMiddleware);

usersRouter.get('/users', function (req, res) {
    Users.find({}).then(users => {
        res.send(users);
    });
});

usersRouter.delete('/users/:id', function (req, res) {
    const id = req.params.id;

    Users.findByIdAndRemove(id, {}, (err) => {
        // for some reason no error when there is no item with such id
        // I'd expect error here, but.. works fine with correct id
        if (err) {
            res.sendStatus(404);
        } else {
            res.json({ message: 'Executed' });
        }
    });
});

module.exports = usersRouter;
