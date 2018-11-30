// Formated Token
// Authorization Token <access_Token>

// Verify Token
export const verifyToken = function(req, res, next) {
    // get auth header value
    const bearerheader = req.headers['authorization'];

    if( typeof bearerheader !== 'undefined' ) {
        // Split at space
        console.log(bearerheader);
        const bearer = bearerheader.split(' ');
        console.log(bearer);
        // Get token from array
        const bearerToken = bearer[1];
        console.log(bearerToken);
        // set Token
        req.token = bearerToken;
        console.log(req.token);
        // Next Middleware
        next();
    } else {
        //forbidden
        res.sendStatus(403);
    }
};

