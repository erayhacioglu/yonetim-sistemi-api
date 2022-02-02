const Patients = require('../models/patientModel');

//@desc   Create A Patient Note
//@route  Post -> /api/note/:id
//@access Private/Admin-Operatör-Diş Hekimi
const createNote = async (req, res) => {
	try {
		const { id } = req.params;
		const patientNoteFields = req.body;
		const patient = await Patients.findById(id);
		await Patients.updateOne(
			{ _id: patient._id },
			{
				$set: {
					notes: [...patient.notes, patientNoteFields],
				},
			},
			{ new: true }
		);
		return res.status(201).json({ msg: 'Not Oluşturuldu' });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

//@desc   Update A Patient Note
//@route  Patch -> /api/note/:id
//@access Private/Admin-Operatör-Diş Hekimi
const updateNote = async (req, res) => {
	try {
		const { id } = req.params;
		const { noteId } = req.query;
		const { created, updateDate, updated, note } = req.body;
		const patient = await Patients.findById(id);
		const findPatientNote = patient.notes.find(
			(item) => item._id.toString() === noteId
		);
		if (created) findPatientNote.created = created;
		if (updateDate) findPatientNote.updateDate = updateDate;
		if (updated) findPatientNote.updated = updated;
		if (note) findPatientNote.note = note;
		const index = patient.notes.findIndex(
			(item) => item._id.toString() === noteId
		);
		patient.notes.splice(index, 1, findPatientNote);
		await patient.save();
		return res.status(201).json({ msg: 'Not Güncellendi' });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

//@desc   Delete A Patient Note
//@route  Delete -> /api/note/:id
//@access Private/Admin-Operatör-Diş Hekimi
const deleteNote = async (req, res) => {
	try {
		const { id } = req.params;
		const { noteId } = req.query;
		const patient = await Patients.findById(id);
		const filterPatientNote = patient.notes.filter(
			(item) => item._id.toString() !== noteId
		);
		await Patients.updateOne(
			{ _id: patient._id },
			{
				$set: {
					notes: filterPatientNote,
				},
			},
			{ new: true }
		);
		return res.status(201).json({ msg: 'Not Silindi' });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

module.exports = { createNote, updateNote, deleteNote };
