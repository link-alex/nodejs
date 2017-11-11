const express = require('express');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const passportFacebookRouter = express.Router();

passport.use(new FacebookStrategy({
        clientID: '187391765159062',
        clientSecret: '5ff047523dce686c44abe436979347d8',
        callbackURL: 'http://localhost:8080/passport/fb/callback',
        passReqToCallback: true
    },
    (req, accessToken, refreshToken, profile, done) => {
        req.fbToken = accessToken;
        done(null, profile);
    }
));

passportFacebookRouter.use(passport.initialize());

passportFacebookRouter.get('/fb', passport.authenticate('facebook', { session: false, scope : 'email' }), (req, res, next) => {
    res.status(200).json({ msg: 'logged via facebook, Secured info here.' });
});

passportFacebookRouter.get('/fb/callback',
    passport.authenticate('facebook', { session: false, scope : 'email' }), (req, res) => {
        const body = `Your name on facebook is ${req.user && req.user.displayName} and your access token is:

${req.fbToken}`;

        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(body),
            'Content-Type': 'text/plain'
        });
        res.end(body);
    }
);

module.exports = passportFacebookRouter;
