// ROUTES
const Token = require('../util/Token'); // Cargamos el token
const myProfileController = require('../controllers/myProfile');
const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/startSession');



router.get('/', sessionController.getLogin);
router.get('/register', sessionController.getRegister);


router.post('/login', sessionController.postLogin); 
router.post('/register', sessionController.postRegister);

// ADMIN
router.get('/admin/:token', sessionController.getAdmin); // Para el panel de admin
router.post('/blockAdmin/:token/:userId', Token.verifyParam, myProfileController.postBlockAccess);
router.post('/unblockAdmin/:token/:userId', Token.verifyParam, myProfileController.postUnblockAccess);




module.exports = router;

