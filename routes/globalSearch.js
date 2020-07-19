/*
* route: 'api/globalSearch/:search'
* */
const {globalSearch, seachByCollection} = require('../controllers/globalSearch');
const { Router } = require('express');

const {validateJWT} = require('../middlewares/validate-token-jwt');

const router = Router();

router.get('/:search', validateJWT, globalSearch);
router.get('/:collection/:search', validateJWT, seachByCollection);

module.exports = router;
