const mongoose = require('mongoose');
const uuid = require('uuid').v4();

const patientSchema = new mongoose.Schema(
	{
		avatar: {
			type: String,
			trim: true,
		},
		patientName: {
			type: String,
			trim: true,
			required: true,
		},
		patientIdentityNumber: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		patientBloodGroup: {
			type: String,
			trim: true,
		},
		patientOption: {
			type: String,
			trim: true,
			required: true,
		},
		patientBirthday: {
			type: String,
			trim: true,
		},
		patientGender: {
			type: String,
			trim: true,
		},
		patientCountry: {
			type: String,
			trim: true,
		},
		patientCity: {
			type: String,
			trim: true,
		},
		patientEmail: {
			type: String,
			trim: true,
		},
		patientPhone: {
			type: String,
			trim: true,
		},
		patientAddress: {
			type: String,
			trim: true,
		},
		patientDocs: [],
		treatmentDatas: [
			{
				date: {
					type: String,
					trim: true,
				},
				clinic: {
					type: String,
					trim: true,
				},
				patient: {
					type: String,
					trim: true,
				},
				dentist: {
					type: String,
					trim: true,
				},
				complain: {
					type: String,
					trim: true,
				},
				note: {
					type: String,
					trim: true,
				},
				patientTreatmentId: {
					type: String,
					trim: true,
				},
				treatments: [
					{
						treatmentName: {
							type: String,
							trim: true,
						},
						treatmentTooth: [],
						treatmentPrice: {
							type: Number,
							trim: true,
						},
						treatmentPriceType: {
							type: String,
							trim: true,
						},
						treatmentRate: {
							type: Number,
							trim: true,
						},
					},
				],
			},
		],
		prescriptionDatas: [
			{
				date: {
					type: String,
					trim: true,
				},
				patient: {
					type: String,
					trim: true,
				},
				dentist: {
					type: String,
					trim: true,
				},
				complain: {
					type: String,
					trim: true,
				},
				prescriptions: [
					{
						medicine: {
							type: String,
							trim: true,
						},
						dosage: {
							type: String,
							trim: true,
						},
						frequency: {
							type: String,
							trim: true,
						},
						intruction: {
							type: String,
							trim: true,
						},
						description: {
							type: String,
							trim: true,
						},
					},
				],
			},
		],
		appointments: [
			{
				date: {
					type: String,
					trim: true,
					required: true,
				},
				clinic: {
					type: String,
					trim: true,
					required: true,
				},
				patient: {
					type: String,
					trim: true,
					required: true,
				},
				dentist: {
					type: String,
					trim: true,
					required: true,
				},
				complain: {
					type: String,
					trim: true,
				},
				appoId: {
					type: String,
					trim: true,
				},
			},
		],
		notes: [
			{
				date: {
					type: String,
					trim: true,
				},
				clinic: {
					type: String,
					trim: true,
				},
				patient: {
					type: String,
					trim: true,
				},
				created: {
					type: String,
					trim: true,
				},
				updateDate: {
					type: String,
					trim: true,
				},
				updated: {
					type: String,
					trim: true,
				},
				note: {
					type: String,
					trim: true,
				},
			},
		],
	},
	{ timestamps: true, versionKey: false }
);

const patientModel = mongoose.model('patient', patientSchema);

module.exports = patientModel;
