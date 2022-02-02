const mongoose = require('mongoose');

const personalSchema = new mongoose.Schema(
	{
		avatar: {
			type: String,
			trim: true,
		},
		personalName: {
			type: String,
			trim: true,
			required: true,
		},
		personalIdentityNumber: {
			type: Number,
			trim: true,
			required: true,
		},
		personalPassword: {
			type: String,
			trim: true,
			required: true,
			minlength: 8,
		},
		personalBloodGroup: {
			type: String,
			trim: true,
		},
		personalGender: {
			type: String,
			trim: true,
		},
		personalCity: {
			type: String,
			trim: true,
		},
		personalBirthday: {
			type: String,
			trim: true,
		},
		personalEmail: {
			type: String,
			trim: true,
			required: true,
			unique: true,
		},
		personalPhone: {
			type: String,
			trim: true,
		},
		personalSalary: {
			type: Number,
			trim: true,
		},
		personalClinic: {
			type: String,
			trim: true,
		},
		personalAuthority: {
			type: String,
			trim: true,
			default: 'Operatör',
		},
		personalAddress: {
			type: String,
			trim: true,
		},
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
	},
	{ timestamps: true, versionKey: false }
);

const personalModel = mongoose.model('personal', personalSchema);

module.exports = personalModel;
