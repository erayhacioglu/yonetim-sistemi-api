const Clinics = require('../models/clinicModel');
const { validateEmail } = require('../utils');

//@desc   Fetch All Clinics
//@route  Get -> /api/clinic
//@access Private/Admin
const allClinics = async (req, res) => {
	try {
		const allClinics = await Clinics.find({});
		if (allClinics.length === 0)
			return res.status(400).json({ msg: 'Kayıt Yok' });
		return res.status(200).json({ clinics: allClinics });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

//@desc   Fetch A Clinic
//@route  Get -> /api/clinic/:id
//@access Private/Admin
const singleClinic = async (req, res) => {
	try {
		const { id } = req.params;
		const singleClinic = await Clinics.findById(id);
		if (singleClinic === null)
			return res.status(400).json({ msg: 'Kayıt Yok' });
		return res.status(200).json({ clinic: singleClinic });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

//@desc   Create A Clinic
//@route  Post -> /api/clinic
//@access Private/Admin
const createClinic = async (req, res) => {
	try {
		const {
			avatar,
			clinicName,
			clinicTaxNumber,
			clinicCity,
			clinicDistrict,
			clinicEmail,
			clinicPhone,
			clinicAddress,
			clinicMap,
		} = req.body;
		if (!clinicName || !clinicTaxNumber)
			return res.status(400).json({ msg: 'Gerekli alanları doldurun' });
		if (!validateEmail(clinicEmail))
			return res.status(400).json({ msg: 'Geçersiz email' });
		const clinicNameExist = await Clinics.findOne({ clinicName });
		if (clinicNameExist)
			return res.status(400).json({ msg: 'Bu isimde kayıtlı klinik var' });
		const clinicExist = await Clinics.findOne({ clinicTaxNumber });
		if (clinicExist)
			return res
				.status(400)
				.json({ msg: 'Bu vergi numarasına kayıtlı klinik var' });
		const newClinic = new Clinics({
			avatar,
			clinicName,
			clinicTaxNumber,
			clinicCity,
			clinicDistrict,
			clinicEmail,
			clinicPhone,
			clinicAddress,
			clinicMap,
		});
		await newClinic.save();
		return res.status(201).json({
			msg: 'Klinik Oluşturuldu',
			clinic: {
				...newClinic._doc,
			},
		});
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

//@desc   Update A Clinic
//@route  Patch -> /api/clinic/:id
//@access Private/Admin
const updateClinic = async (req, res) => {
	try {
		const { id } = req.params;
		await Clinics.findByIdAndUpdate({ _id: id }, req.body, { new: true });
		return res.status(200).json({
			msg: 'Klinik Güncellendi',
		});
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

//@desc   Delete A Clinic
//@route  Delete -> /api/clinic/:id
//@access Private/Admin
const deleteClinic = async (req, res) => {
	try {
		const { id } = req.params;
		await Clinics.findByIdAndDelete({ _id: id });
		return res.status(200).json({ msg: 'Klinik Silindi' });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

module.exports = {
	allClinics,
	singleClinic,
	createClinic,
	updateClinic,
	deleteClinic,
};
