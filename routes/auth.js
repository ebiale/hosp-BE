/**
 * Path: '/api/login'
 */

const { Router } = require('express');
const { login, googleSignIn } = require('../controllers/auth');
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


module.exports = router;
