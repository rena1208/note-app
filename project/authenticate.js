const jwt = require('jsonwebtoken');
const config = require('./config');

module.exports = function authenticate(req, res, next) {
    try {
        console.log(req.headers.authorization);
        const token = req.headers.authorization;
        // const bearToken = req.headers['authorization']
        const bearer = token.split(' ');
        const bearToken = bearer[1]
        console.log(bearer[1]);
        // const bearToken = req.headers['authorization']
        // const bearer = bearToken.split(' ')
        // const token = bearer[1]
        // console.log(token);
        // console.log(config.jwt.secret);
        const decoded = jwt.verify(bearToken, config.jwt.secret);
        // console.log(decoded);
        req.jwtPayload = decoded;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            message: 'Not authenticated'
        });
    }
};