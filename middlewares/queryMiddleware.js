
// parsing will make query lowerCase
function queryMiddleware(req, res, next) {
    const query = req.query;
    const paramNames = Object.keys(query);
    let parsedQuery = null;


    if (paramNames && paramNames.length) {
        try {
            parsedQuery = {};

            for (let i = 0; i < paramNames.length; i++) {
                const key = paramNames[i].toLowerCase();
                const value = query[paramNames[i]].toLowerCase();
                parsedQuery[key] = value;
            }
        } catch (err) {
            console.log(err);
        }
    }

    req.parsedQuery = parsedQuery;

    next();
}

module.exports = queryMiddleware;
