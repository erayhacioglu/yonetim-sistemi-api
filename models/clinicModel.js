const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema(
	{
		avatar: {
			type: String,
			trim: true,
		},
		clinicName: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		clinicTaxNumber: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		clinicCity: {
			type: String,
			trim: true,
		},
		clinicDistrict: {
			type: String,
			trim: true,
		},
		clinicEmail: {
			type: String,
			trim: true,
		},
		clinicPhone: {
			type: String,
			trim: true,
		},
		clinicAddress: {
			type: String,
			trim: true,
		},
		clinicMap: {
			type: String,
			trim: true,
		},
		treatments: [
			{
				treatment: {
					type: String,
					trim: true,
				},
				price: {
					type: Number,
					trim: true,
				},
				priceType: {
					type: String,
					trim: true,
				},
			},
		],
		payments: [
			{
				date: {
					type: String,
					trim: true,
					default: '',
				},
				clinic: {
					type: String,
					trim: true,
					default: '',
				},
				patient: {
					type: String,
					trim: true,
					default: '',
				},
				patientId: {
					type: String,
					trim: true,
				},
				dentist: {
					type: String,
					trim: true,
					default: '',
				},
				dentistId: {
					type: String,
					trim: true,
				},
				madeBy: {
					type: String,
					trim: true,
					default: '',
				},
				discount: {
					type: Number,
					trim: true,
					default: '',
				},
				increament: {
					type: Number,
					trim: true,
					default: '',
				},
				totalPrice: {
					type: Number,
					trim: true,
					default: '',
				},
				type: {
					type: String,
					trim: true,
					default: '',
				},
				status: {
					type: String,
					trim: true,
					default: 'Bekleniyor',
				},
				note: {
					type: String,
					trim: true,
					default: '',
				},
				patientId: {
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
						treatmentId: {
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
			},
		],
	},
	{ timestamps: true, versionKey: false }
);

const clinicModel = mongoose.model('clinic', clinicSchema);

module.exports = clinicModel;
