/**
 * Path: '/api/login'
 */

const {validateJWT} = require('../middlewares/validate-token-jwt');
const { Router } = require('express');
const { login, googleSignIn, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { fieldValidation } = require('../middlewares/field-validation');

const router = Router();

router.post('/',
    [
        check('email', 'Email required').isEmail(),
        check('password', 'Password required').not().isEmpty(),
        fieldValidation
    ],
    login
);

router.post('/google',
    [
        check('token', 'Token required').not().isEmpty(),
        fieldValidation
    ],
    googleSignIn
);


router.get('/renew',
    validateJWT,
    renewToken
);


module.exports = router;
