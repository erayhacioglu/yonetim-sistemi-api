const Patients = require('../models/patientModel');
const Clinics = require('../models/clinicModel');
const uuid = require('uuid');

//@desc   Create A Patient Treatment
//@route  Post -> /api/patientTreatment/:id
//@access Private/Diş Hekimi
const createTreatment = async (req, res) => {
	try {
		const { id } = req.params;
		const patient = await Patients.findById(id);
		const patientTreatmentFields = req.body;
		patientTreatmentFields.patientTreatmentId = uuid.v4();
		console.log(patientTreatmentFields);
		await Patients.updateOne(
			{ _id: patient._id },
			{
				$set: {
					treatmentDatas: [...patient.treatmentDatas, patientTreatmentFields],
				},
			},
			{ new: true }
		);
		const newPatient = await Patients.findById(id);
		const lastPatientTreatmentDatas =
			newPatient.treatmentDatas[newPatient.treatmentDatas.length - 1];
		const paymentTreatmentsFields = lastPatientTreatmentDatas.treatments;
		const clinic = await Clinics.findOne({
			clinicName: patientTreatmentFields.clinic,
		});
		await Clinics.updateOne(
			{ _id: clinic._id },
			{
				$set: {
					payments: [
						...clinic.payments,
						{
							patient: lastPatientTreatmentDatas.patientName,
							dentist: lastPatientTreatmentDatas.dentist,
							patientTreatmentId: lastPatientTreatmentDatas.patientTreatmentId,
							treatments: paymentTreatmentsFields,
						},
					],
				},
			},
			{ new: true }
		);
		return res.status(201).json({ msg: 'Tedavi Oluşturuldu' });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

//@desc   Update A Patient Treatment
//@route  Patch -> /api/patientTreatment/:id
//@access Private/Diş Hekimi
const updateTreatment = async (req, res) => {
	try {
		const { id } = req.params;
		const { date, clinic, patient, dentist, complain, note, treatments } =
			req.body;
		const { treatmentId } = req.query;
		const patientData = await Patients.findById(id);
		const findPatientTreatment = patientData.treatmentDatas.find(
			(item) => item._id.toString() === treatmentId
		);

		if (date) findPatientTreatment.date = date;
		if (clinic) findPatientTreatment.clinic = clinic;
		if (patient) findPatientTreatment.patient = patient;
		if (dentist) findPatientTreatment.dentist = dentist;
		if (complain) findPatientTreatment.complain = complain;
		if (note) findPatientTreatment.note = note;
		if (treatments) findPatientTreatment.treatments = treatments;
		const clinicData = await Clinics.findOne({ clinicName: clinic });
		const patientIndex = patientData.treatmentDatas.findIndex(
			(element) => element._id.toString() === treatmentId
		);
		const filterPaymentPatient = clinicData.payments
			.filter((payment) => payment.patientId.toString() === id)
			.find(
				(item) =>
					item.patientTreatmentId === findPatientTreatment.patientTreatmentId
			);
		console.log(filterPaymentPatient);

		return res.status(200).json({ msg: 'Tedavi Güncellendi' });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

//@desc   Delete A Patient Treatment
//@route  Delete -> /api/patientTreatment/:id
//@access Private/Diş Hekimi
const deleteTreatment = async (req, res) => {
	try {
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

module.exports = { createTreatment, updateTreatment, deleteTreatment };
