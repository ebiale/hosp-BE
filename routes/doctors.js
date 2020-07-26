/*
* ruta: '/api/doctors'
* */
const {deleteDoctor, updateDoctor, addDoctor, getDoctors, getDoctorById} = require('../controllers/Doctors');
const {Router} = require('express');
const {check} = require('express-validator');
const {fieldValidation} = require('../middlewares/field-validation');

const {validateJWT} = require('../middlewares/validate-token-jwt');

const router = Router();

router.get('/', validateJWT, getDoctors);
router.get('/:id', validateJWT, getDoctorById);
router.post('/',
    [
        validateJWT,
        check('name', 'Name required').not().isEmpty(),
        check('hospital', 'Hospital should be valid').isMongoId(),
        fieldValidation
    ],
    addDoctor
);
router.put('/:id',
    [
        validateJWT,
        check('name', 'Name required').not().isEmpty(),
        check('hospital', 'Hospital should be valid').isMongoId(),
        fieldValidation
    ],
    updateDoctor
);
router.delete('/:id', validateJWT, deleteDoctor);


module.exports = router;
