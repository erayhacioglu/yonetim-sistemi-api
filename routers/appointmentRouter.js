const router = require('express').Router();
const {
	createAppointment,
	updateAppointment,
	deleteAppointment,
} = require('../controllers/appointmentController');
const ApiKey = require('../middlewares/apiKey');

router.post('/:id', ApiKey, createAppointment);
router.patch('/:id', ApiKey, updateAppointment);
router.delete('/:id', ApiKey, deleteAppointment);

module.exports = router;
