/*
* Route: /api/users
* */
const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, addUser, updateUser, deleteUser } = require('../controllers/users');
const { fieldValidation } = require('../middlewares/field-validation');
const {validateJWT} = require('../middlewares/validate-token-jwt');

const router = Router();

router.get('/', validateJWT, getUsers);
router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('password', 'Password is required').not().isEmpty(),
        check('email', 'E-mail is required').isEmail(),
        fieldValidation
    ],
    addUser
);
router.put('/:id', 
    [
        validateJWT,
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'E-mail is required').isEmail(),
        check('role', 'Role is required').not().isEmpty(),
        fieldValidation
    ],
    updateUser
);
router.delete('/:id', validateJWT, deleteUser);

module.exports = router;
