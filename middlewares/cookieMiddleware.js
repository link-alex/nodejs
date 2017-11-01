import cookie from 'cookie';

function cookieMiddleware(req, res, next) {
    const cookies = req.cookies || req.headers.cookie;
    let parsedCookies = null;

    if (cookies) {
        try {
            parsedCookies = cookie.parse(cookies);
        } catch (err) {
            console.log(err);
        }
    }

    req.parsedCookies = parsedCookies;

    next();
}

module.exports = cookieMiddleware;
