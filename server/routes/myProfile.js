// ROUTES
const Token = require('../util/Token'); // Cargamos el token
const express = require('express');
const router = express.Router();
const myProfileController = require('../controllers/myProfile');



//router.get('/:token', Token.verifyParam, myProfileController.getProfile);
router.get('/', Token.verifyToken, myProfileController.getProfile);
// Si lo hago con get falla ¿por qué?
router.post('/publicProfile', Token.verifyToken, myProfileController.getPublicProfile);

//router.post('/remove/:token', Token.verifyParam, myProfileController.postRemoveUser);
router.post('/remove', Token.verifyToken, myProfileController.postRemoveUser);


//router.post('/removeAdmin/:token/:userId', Token.verifyParam, myProfileController.postBlockAccess);

//router.post('/editProfile/:token', Token.verifyParam, myProfileController.saveImg);
router.post('/editProfile', Token.verifyToken, myProfileController.saveImg);

module.exports = router;




