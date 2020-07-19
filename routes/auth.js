/**
 * Path: '/api/login'
 */

const { Router } = require('express');
const { login } = require('../controllers/auth');
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
)


module.exports = router;