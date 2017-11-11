const express = require('express');
const passport = require('passport');

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const passportGoogleRouter = express.Router();

passport.use(new GoogleStrategy({
        clientID: '8965129877-0ipq5bidj7a17rl2s6skq8r8al75eidk.apps.googleusercontent.com',
        clientSecret: '_Ka7JyPZ1WYUyv3mAi-66EC7',
        callbackURL: 'http://localhost:8080/passport/google/callback'
    },
    (token, tokenSecret, profile, done) => {
        done(null, profile);
    }
));

passportGoogleRouter.use(passport.initialize());

passportGoogleRouter.get('/google', passport.authenticate('google', { session: false, scope : 'email' }), (req, res, next) => {
    res.status(200).json({ msg: 'logged via google, Secured info here.' });
});

passportGoogleRouter.get('/google/callback',
    passport.authenticate('google', { session: false, scope : 'email' }), (req, res) => {
        const body =
`Your Google info:
    name: ${req.user && req.user.displayName},
    emails: ${req.user && JSON.stringify(req.user.emails)},
    gender: ${req.user && req.user.gender}.`;

        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(body),
            'Content-Type': 'text/plain'
        });
        res.end(body);
    }
);

module.exports = passportGoogleRouter;
