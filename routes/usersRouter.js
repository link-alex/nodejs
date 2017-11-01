const express = require('express');
const usersRouter = express.Router();

const users = [
    {
        id: 1,
        firstName: 'Ivan',
        lastName: 'Ivanov',
        email: 'ii@ii.ru'
    },
    {
        id: 2,
        firstName: 'Petr',
        lastName: 'Petrov',
        email: 'pp@pp.ru'
    }
];

usersRouter.get('/users', function (req, res) {
    const all = JSON.stringify(users);

    if (req.parsedQuery) {
        console.log('parsedQuery', req.parsedQuery);
    }

    res.send(all);
});


module.exports = usersRouter
