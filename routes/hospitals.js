/*
* ruta: '/api/hospitals'
* */
const {deleteHospital, updateHospital, addHospital, getHospitals} = require('../controllers/hospitals');
const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidation } = require('../middlewares/field-validation');

const {validateJWT} = require('../middlewares/validate-token-jwt');

const router = Router();

router.get('/', validateJWT, getHospitals);
router.post('/',
    [
        validateJWT,
        check('name', 'Name required').not().isEmpty(),
        fieldValidation
    ],
    addHospital
);
router.put('/:id',
    [

    ],
    updateHospital
);
router.delete('/:id', validateJWT, deleteHospital);

module.exports = router;
