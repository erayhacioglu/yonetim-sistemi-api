const router = require('express').Router();
const {
	allPersonals,
	singlePersonal,
	createPersonal,
	updatePersonal,
	deletePersonal,
	login,
	logout,
	generateAccessToken,
	refreshPassword,
} = require('../controllers/personalController');
const ApiKey = require('../middlewares/apiKey');

router.post('/', ApiKey, createPersonal);
router.get('/', ApiKey, allPersonals);
router.get('/:id', ApiKey, singlePersonal);
router.patch('/:id', ApiKey, updatePersonal);
router.delete('/:id', ApiKey, deletePersonal);
router.post('/login', ApiKey, login);
router.post('/logout', ApiKey, logout);
router.post('/refresh_token', ApiKey, generateAccessToken);
router.post('/refresh_password/:id', ApiKey, refreshPassword);

module.exports = router;
