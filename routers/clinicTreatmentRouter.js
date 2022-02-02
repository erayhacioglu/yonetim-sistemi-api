const router = require('express').Router();
const {
	createTreatment,
	updateTreatment,
	deleteTreatment,
} = require('../controllers/clinicTreatmentController');
const ApiKey = require('../middlewares/apiKey');

router.post('/:id', ApiKey, createTreatment);
router.patch('/:id', ApiKey, updateTreatment);
router.delete('/:id', ApiKey, deleteTreatment);

module.exports = router;
