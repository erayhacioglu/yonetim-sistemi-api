const router = require('express').Router();
const {
	allClinics,
	singleClinic,
	createClinic,
	updateClinic,
	deleteClinic,
} = require('../controllers/clinicController');
const ApiKey = require('../middlewares/apiKey');

router.post('/', ApiKey, createClinic);
router.get('/', ApiKey, allClinics);
router.get('/:id', ApiKey, singleClinic);
router.patch('/:id', ApiKey, updateClinic);
router.delete('/:id', ApiKey, deleteClinic);

module.exports = router;
