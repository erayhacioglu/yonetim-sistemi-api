const router = require('express').Router();
const {
	createPrescription,
	updatePrescription,
	deletePrescription,
} = require('../controllers/patientPrescriptionController');
const ApiKey = require('../middlewares/apiKey');

router.post('/:id', ApiKey, createPrescription);
router.patch('/:id', ApiKey, updatePrescription);
router.delete('/:id', ApiKey, deletePrescription);

module.exports = router;
