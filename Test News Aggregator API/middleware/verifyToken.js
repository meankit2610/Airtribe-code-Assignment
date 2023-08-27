const jwt = require('jsonwebtoken')
const User = require('../Model/user')

const verifyToken = (req, res, next) => {
    if (req.headers.authorization) {
        jwt.verify(req.headers.authorization, process.env.API_SECRET, function (err, decoded) {
            if (err) {
                req.user = undefined
                next();
            }
            else {
                User.findOne({
                    _id:decoded.id
                }).then((user) => {
                    req.user = user;
                    next();
                }).catch(err => {
                    return res.status(500).send(err)
                })
            }
        });
    }

    else {
        req.user = undefined;
        req.message = 'Authorization header not found'
        next()
    }
}

module.exports = verifyToken;