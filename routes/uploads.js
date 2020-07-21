/*
* route: 'api/uploads/'
* */

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');


const {validateJWT} = require('../middlewares/validate-token-jwt');
const {fileUpload, getImage} = require('../controllers/uploads');

const router = Router();

router.use(expressFileUpload());
router.put('/:type/:id', validateJWT, fileUpload);
router.get('/:type/:img', getImage);

module.exports = router;
