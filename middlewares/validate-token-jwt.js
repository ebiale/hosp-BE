const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token request'
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
    } catch (e) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token request'
        })
    }

};

module.exports = {
    validateJWT,
}
