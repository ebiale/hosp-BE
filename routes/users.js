/*
* Route: /api/users
* */
const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, addUser, updateUser, deleteUser, getUserById } = require('../controllers/users');
const { fieldValidation } = require('../middlewares/field-validation');
const {validateJWT, validateAdminRole, validateAdminRoleOrSameUser} = require('../middlewares/validate-token-jwt');

const router = Router();

router.get('/', validateJWT, getUsers);
router.get('/:id', validateJWT, getUserById);
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
        validateJWT, validateAdminRoleOrSameUser,
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'E-mail is required').isEmail(),
        check('role', 'Role is required').not().isEmpty(),
        fieldValidation
    ],
    updateUser
);
router.delete('/:id', [validateJWT, validateAdminRole], deleteUser);

module.exports = router;
