const jwt = require('jsonwebtoken');
const User = require('../models/user');

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

const validateAdminRole = async (req, res, next) => {
    const uid = req.uid;

    try {
        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Cannot find user'
            })
        }

        if (userDB.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                msg: 'Permission denied'
            })
        }

        next();
    } catch (e) {
        return res.status(401).json({
            ok: false,
            msg: 'Invalid token request'
        })
    }

};

const validateAdminRoleOrSameUser = async (req, res, next) => {
    const uid = req.uid;
    const currentId = req.params.id;

    try {
        const userDB = await User.findById(uid);

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Cannot find user'
            })
        }

        if (userDB.role !== 'ADMIN_ROLE' && uid !== currentId) {
            return res.status(403).json({
                ok: false,
                msg: 'Permission denied'
            })
        }

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
    validateAdminRole,
    validateAdminRoleOrSameUser
};
