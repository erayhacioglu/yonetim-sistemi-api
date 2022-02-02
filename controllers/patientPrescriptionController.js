const Patients = require('../models/patientModel');

//@desc   Create A Prescription
//@route  Post -> /api/prescription/:id?prescriptionId=
//@access Private/Diş Hekimi
const createPrescription = async (req, res) => {
	try {
		const { id } = req.params;
		const prescriptionFields = req.body;
		const patient = await Patients.findById(id);
		await Patients.updateOne(
			{ _id: patient._id },
			{
				$set: {
					prescriptionDatas: [...patient.prescriptionDatas, prescriptionFields],
				},
			},
			{ new: true }
		);
		return res.status(201).json({ msg: 'Reçete Oluşturuldu' });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

//@desc   Update A Prescription
//@route  Patch -> /api/prescription/:id?prescriptionId=
//@access Private/Diş Hekimi
const updatePrescription = async (req, res) => {
	try {
		const { id } = req.params;
		const { date, patient, dentist, complain, prescriptions } = req.body;
		const { prescriptionId } = req.query;
		const patientData = await Patients.findById(id);
		//tüm reçetelerden prescriptionId ile eşleşen reçeteyi buluyoruz
		const findPatientPrescription = patientData?.prescriptionDatas.find(
			(prescription) => prescription._id.toString() === prescriptionId
		);
		//dışarıdan gelen verileri bulduğumuz reçete objesinin içine entegre ediyoruz
		if (date) findPatientPrescription.date = date;
		if (patient) findPatientPrescription.patient = patient;
		if (dentist) findPatientPrescription.dentist = dentist;
		if (complain) findPatientPrescription.complain = complain;
		if (prescriptions) findPatientPrescription.prescriptions = prescriptions;
		//reçeteler dizisinde filtrelenen reçetenin dizi içindeki index durumu
		const index = patientData?.prescriptionDatas?.findIndex(
			(element) => element._id.toString() === prescriptionId
		);
		//entegre edilen verilerin olduğu obje reçeteler dizisindeki aynı reçete ile yer değiştiriyoruz
		patientData?.prescriptionDatas?.splice(index, 1, findPatientPrescription);
		await patientData.save();
		return res.status(201).json({ msg: 'Reçete Güncellendi' });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

//@desc   Delete A Prescription
//@route  Delete -> /api/prescription/:id?prescriptionId=
//@access Private/Diş Hekimi
const deletePrescription = async (req, res) => {
	try {
		const { id } = req.params;
		const { prescriptionId } = req.query;
		const patient = await Patients.findById(id);
		const filteredPatientPrescription = patient?.prescriptionDatas?.filter(
			(prescription) => prescription._id.toString() !== prescriptionId
		);
		await Patients.updateOne(
			{ _id: patient._id },
			{
				$set: {
					prescriptionDatas: filteredPatientPrescription,
				},
			},
			{ new: true }
		);
		return res.status(201).json({ msg: 'Reçete Silindi' });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

module.exports = {
	createPrescription,
	updatePrescription,
	deletePrescription,
};
