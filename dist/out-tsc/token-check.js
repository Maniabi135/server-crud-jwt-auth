"use strict";
// Formated Token
// Authorization Token <access_Token>
Object.defineProperty(exports, "__esModule", { value: true });
// Verify Token
exports.verifyToken = function (req, res, next) {
    // get auth header value
    const bearerheader = req.headers['authorization'];
    if (typeof bearerheader !== 'undefined') {
    }
    else {
        //forbidden
        res.sendStatus(403);
    }
};
//# sourceMappingURL=token-check.js.map