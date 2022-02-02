const Patients = require('../models/patientModel');
const { validateEmail } = require('../utils');

//@desc   Fetch All Patients
//@route  Get -> /api/patient
//@access Private/Admin
const allPatients = async (req, res) => {
	try {
		const allPatients = await Patients.find({});
		if (allPatients.length === 0)
			return res.status(400).json({ msg: 'Kayıt Yok' });
		return res.status(200).json({ patients: allPatients });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

//@desc   Fetch A Patient
//@route  Get -> /api/patient/:id
//@access Private/Admin
const singlePatient = async (req, res) => {
	try {
		const { id } = req.params;
		const singlePatient = await Patients.findById(id);
		if (singlePatient === null)
			return res.status(400).json({ msg: 'Kayıt Yok' });
		return res.status(200).json({ patient: singlePatient });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

//@desc   Create A Patient
//@route  Post -> /api/patient
//@access Private/Admin
const createPatient = async (req, res) => {
	try {
		const {
			avatar,
			patientName,
			patientIdentityNumber,
			patientBloodGroup,
			patientOption,
			patientBirthday,
			patientGender,
			patientCountry,
			patientCity,
			patientEmail,
			patientPhone,
			patientAddress,
			patientDocs,
		} = req.body;
		if (!patientName || !patientIdentityNumber || !patientOption)
			return res.status(400).json({ msg: 'Gerekli alanları doldurun' });
		if (!validateEmail(patientEmail))
			return res.status(400).json({ msg: 'Geçersiz email' });
		const patientExist = await Patients.findOne({ patientIdentityNumber });
		if (patientExist)
			return res.status(400).json({ msg: 'Bu hasta kaydı zaten var' });
		const newPatient = new Patients({
			avatar,
			patientName: `${patientName}-${patientIdentityNumber}`,
			patientIdentityNumber,
			patientBloodGroup,
			patientOption,
			patientBirthday,
			patientGender,
			patientCountry,
			patientCity,
			patientEmail,
			patientPhone,
			patientAddress,
			patientDocs,
		});
		await newPatient.save();
		return res.status(201).json({
			msg: 'Hasta Kaydı Oluşturuldu',
			patient: {
				...newPatient._doc,
			},
		});
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

//@desc   Update A Patient
//@route  Patch -> /api/patient/:id
//@access Private/Admin
const updatePatient = async (req, res) => {
	try {
		const { id } = req.params;
		await Patients.findByIdAndUpdate({ _id: id }, req.body, { new: true });
		return res.status(200).json({
			msg: 'Hasta Kaydı Güncellendi',
		});
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

//@desc   Delete A Patient
//@route  Delete -> /api/patient/:id
//@access Private/Admin
const deletePatient = async (req, res) => {
	try {
		const { id } = req.params;
		await Patients.findByIdAndDelete({ _id: id });
		return res.status(200).json({
			msg: 'Hasta Kaydı Silindi',
		});
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

module.exports = {
	allPatients,
	singlePatient,
	createPatient,
	updatePatient,
	deletePatient,
};
