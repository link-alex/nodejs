const express = require('express');
const passport = require('passport');
const session = require('express-session');
const TwitterStrategy = require('passport-twitter').Strategy;

const passportTwitterRouter = express.Router();

passport.use(new TwitterStrategy({
        consumerKey: '29I6EDIoFtL2Nn0wKqRds3T6S',
        consumerSecret: '9eyVMw3L3Uc29b9r3IKWjwmpYCBqE4KrbeYVkHzxXkoIeGQ6be',
        callbackURL: 'http://localhost:8080/passport/twitter/callback'
    },
    (token, tokenSecret, profile, done) => {
        done(null, profile);
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

passportTwitterRouter.use(session({ secret: 'Why,twitter,why? '}));

passportTwitterRouter.use(passport.initialize());
passportTwitterRouter.use(passport.session());

passportTwitterRouter.get('/twitter', passport.authenticate('twitter'), (req, res, next) => {
    res.status(200).json({ msg: 'logged via twitter, Secured info here.' });
});

passportTwitterRouter.get('/twitter/callback',
    passport.authenticate('twitter'), (req, res) => {
        const body =
`Your Twitter info:
    name: ${req.user && req.user.displayName},
    username: ${req.user && req.user.username}.`;

        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(body),
            'Content-Type': 'text/plain'
        });
        res.end(body);
    }
);

module.exports = passportTwitterRouter;
