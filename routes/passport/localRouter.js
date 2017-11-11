const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const passportLocalRouter = express.Router();

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

passport.use(new LocalStrategy(
    (username, password, cb) => {
        const user = users.find(u => u.login === username);

        if (!user) {
            return cb(null, false);
        }
        if (user.password != password) {
            return cb(null, false);
        }

        return cb(null, user);
    }
));

passportLocalRouter.use(passport.initialize());

passportLocalRouter.post('/local', passport.authenticate('local', { session: false }), (req, res, next) => {
    const user = users.find(u => u.login === req.body.username);

    res.status(200).json({ msg: `logged in, your email is ${user.email}.` });
});

module.exports = passportLocalRouter;
