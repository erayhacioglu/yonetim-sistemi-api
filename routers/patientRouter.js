const router = require('express').Router();
const {
	allPatients,
	singlePatient,
	createPatient,
	updatePatient,
	deletePatient,
} = require('../controllers/patientController');
const ApiKey = require('../middlewares/apiKey');

router.post('/', ApiKey, createPatient);
router.get('/', ApiKey, allPatients);
router.get('/:id', ApiKey, singlePatient);
router.patch('/:id', ApiKey, updatePatient);
router.delete('/:id', ApiKey, deletePatient);

module.exports = router;
