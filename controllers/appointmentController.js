const Patients = require('../models/patientModel');
const Personals = require('../models/personalModel');
const Clinics = require('../models/clinicModel');
const uuid = require('uuid');

// const createAppointment = async (req, res) => {
// 	try {
// 		const { id } = req.params;
// 		const appointmentFields = req.body;
// 		const patient = await Patients.findById(id);
// 		const personal = await Personals.findOne({
// 			personalName: appointmentFields.dentist,
// 		});
// 		appointmentFields.appoId = uuid.v4();
// 		const dateExist = personal.appointments.find(
// 			(item) => item.date === appointmentFields.date
// 		);
// 		if (dateExist)
// 			return res.status(400).json({ msg: 'Hekimin bu randevusu dolu' });
// 		await Patients.updateOne(
// 			{ _id: patient._id },
// 			{
// 				$set: {
// 					appointments: [...patient.appointments, appointmentFields],
// 				},
// 			},
// 			{ new: true }
// 		);
// 		await Personals.updateOne(
// 			{ _id: personal._id },
// 			{
// 				$set: {
// 					appointments: [...personal.appointments, appointmentFields],
// 				},
// 			},
// 			{ new: true }
// 		);
// 		return res.status(201).json({ msg: 'Randevu Oluşturuldu' });
// 	} catch (err) {
// 		return res.status(500).json({ msg: 'Server Error : ' + err });
// 	}
// };

// const updateAppointment = async (req, res) => {
// 	try {
// 		const { id } = req.params;
// 		const { appointmentId } = req.query;
// 		const patient = await Patients.findById(id);
// 		const findPatientAppointment = patient.appointments.find(
// 			(item) => item._id.toString() === appointmentId
// 		);
// 		const personal = await Personals.findOne({
// 			personalName: findPatientAppointment.dentist,
// 		});
// 		return res.status().json({ msg: 'Randevu Güncellendi.' });
// 	} catch (err) {
// 		return res.status(500).json({ msg: 'Server Error : ' + err });
// 	}
// };

// const deleteAppointment = async (req, res) => {
// 	try {
// 		const { id } = req.params;
// 		const { appointmentId } = req.query;
// 		const patient = await Patients.findById(id);
// 		const findPatientAppointment = patient.appointments.find(
// 			(item) => item._id.toString() === appointmentId
// 		);
// 		const personal = await Personals.findOne({
// 			personalName: findPatientAppointment.dentist,
// 		});
// 		const filterPatientAppointment = patient.appointments.filter(
// 			(item) => item._id.toString() !== appointmentId
// 		);
// 		const filterPersonalAppointment = personal.appointments.filter(
// 			(item) => item.appoId !== findPatientAppointment.appoId
// 		);
// 		await Patients.updateOne(
// 			{ _id: patient.id },
// 			{
// 				$set: {
// 					appointments: filterPatientAppointment,
// 				},
// 			},
// 			{ new: true }
// 		);
// 		await Personals.updateOne(
// 			{ _id: personal.id },
// 			{
// 				$set: {
// 					appointments: filterPersonalAppointment,
// 				},
// 			},
// 			{ new: true }
// 		);
// 		return res.status(201).json({ msg: 'Randevu Silindi' });
// 	} catch (err) {
// 		return res.status(500).json({ msg: 'Server Error : ' + err });
// 	}
// };
///////////////////////////////////////////////////////////////////////////////////////
//@desc   Create A Clinic Appointment
//@route  Post -> /api/appointment/:id
//@access Private/Admin-Operatör-Diş Hekimi
const createAppointment = async (req, res) => {
	try {
		const { id } = req.params;
		const appointmentFields = req.body;
		const clinic = await Clinics.findById(id);
		const clinicFilterAppointment = clinic.appointments.filter(
			(item) => item.date === appointmentFields.date
		);
		const exist = clinicFilterAppointment.find(
			(item) => item.dentist === appointmentFields.dentist
		);
		const exist2 = clinicFilterAppointment.find(
			(item) => item.patient === appointmentFields.patient
		);
		if (exist) {
			return res.status(400).json({ msg: 'Hekimin randevusu dolu' });
		} else {
			if (exist2) {
				return res.status(400).json({ msg: 'Hastanın randevusu var.' });
			} else {
				await Clinics.updateOne(
					{ _id: clinic._id },
					{
						$set: {
							appointments: [...clinic.appointments, appointmentFields],
						},
					},
					{ new: true }
				);
				return res.status(201).json({ msg: 'Randevu Oluşturuldu' });
			}
		}
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

//@desc   Update A Clinic Appointment
//@route  Patch -> /api/appointment/:id
//@access Private/Admin-Operatör
const updateAppointment = async (req, res) => {
	try {
		const { id } = req.params;
		const { appointmentId } = req.query;
		const { date, clinic, patient, dentist, complain } = req.body;
		const clinicData = await Clinics.findById(id);
		const findClinicAppointment = clinicData.appointments.find(
			(item) => item._id.toString() === appointmentId
		);
		const clinicFilterAppointment = clinicData.appointments.filter(
			(item) => item.date === date
		);
		const exist = clinicFilterAppointment.find(
			(item) => item.dentist === dentist
		);
		const exist2 = clinicFilterAppointment.find(
			(item) => item.patient === patient
		);
		if (exist) return res.status(400).json({ msg: 'Hekimin randevusu dolu' });

		if (exist2) return res.status(400).json({ msg: 'Hastanın randevusu var.' });

		if (date) findClinicAppointment.date = date;
		if (clinic) findClinicAppointment.clinic = clinic;
		if (patient) findClinicAppointment.patient = patient;
		if (dentist) findClinicAppointment.dentist = dentist;
		if (complain) findClinicAppointment.complain = complain;

		const index = clinicData.appointments.findIndex(
			(item) => item._id.toString() === appointmentId
		);

		clinicData.appointments.splice(index, 1, findClinicAppointment);
		await clinicData.save();
		return res.status(200).json({ msg: 'Randevu Güncellendi.' });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

//@desc   Delete A Clinic Appointment
//@route  Delete -> /api/appointment/:id
//@access Private/Admin-Operatör
const deleteAppointment = async (req, res) => {
	try {
		const { id } = req.params;
		const { appointmentId } = req.query;
		const clinic = await Clinics.findById(id);
		const filterPatientAppointment = clinic.appointments.filter(
			(item) => item._id.toString() !== appointmentId
		);
		await Clinics.updateOne(
			{ _id: clinic._id },
			{
				$set: {
					appointments: filterPatientAppointment,
				},
			},
			{ new: true }
		);
		return res.status(200).json({ msg: 'Randevu Silindi' });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

module.exports = {
	createAppointment,
	updateAppointment,
	deleteAppointment,
};
