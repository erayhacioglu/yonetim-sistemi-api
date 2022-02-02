const router = require('express').Router();
const {
	createNote,
	updateNote,
	deleteNote,
} = require('../controllers/patientNoteController');
const ApiKey = require('../middlewares/apiKey');

router.post('/:id', ApiKey, createNote);
router.patch('/:id', ApiKey, updateNote);
router.delete('/:id', ApiKey, deleteNote);

module.exports = router;
