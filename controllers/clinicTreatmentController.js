const Clinics = require('../models/clinicModel');

//@desc   Create A Clinic Treatment
//@route  Post -> /api/clinicTreatment/:id
//@access Private/Admin
const createTreatment = async (req, res) => {
	try {
		const { id } = req.params;
		const clinic = await Clinics.findOne({ _id: id });
		const treatmentFields = req.body;
		await Clinics.updateOne(
			{ _id: clinic._id },
			{
				$set: {
					treatments: [...clinic.treatments, treatmentFields],
				},
			},
			{ new: true }
		);
		return res.status(201).json({ msg: 'Tedavi Oluşturuldu' });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

//@desc   Update A Clinic Treatment
//@route  Patch -> /api/clinicTreatment/:id
//@access Private/Admin
const updateTreatment = async (req, res) => {
	try {
		const { id } = req.params;
		const { treatmentId } = req.query;
		const { treatment, price, priceType } = req.body;
		const clinic = await Clinics.findOne({ _id: id });
		//ilgili kliniğin tedavilerinden treatmentId ile uyuşan tedaviyi buluyoruz
		const findClinicTreatment = clinic?.treatments?.find(
			(treatment) => treatment._id.toString() === treatmentId
		);
		//kullanıcıdan gelen değerleri bulduğumuz kliniğin içine entegre ediyoruz
		if (treatment) findClinicTreatment.treatment = treatment;
		if (price) findClinicTreatment.price = price;
		if (priceType) findClinicTreatment.priceType = priceType;
		//bulduğumuz kliniğin tüm klinikler dizisi içindeki (obje olarak) index numarasını buluyoruz
		const index = clinic?.treatments?.findIndex(
			(item) => item._id.toString() === treatmentId
		);
		//bulduğumuz indexin yerine içine kullanıcıdan gelen verilerle değiştirdiğimiz objeyi veriyoruz
		clinic?.treatments.splice(index, 1, findClinicTreatment);
		await clinic.save();
		return res.status(200).json({ msg: 'Tedavi Güncellendi.' });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

//@desc   Delete A Clinic Treatment
//@route  Delete -> /api/clinicTreatment/:id
//@access Private/Admin
const deleteTreatment = async (req, res) => {
	try {
		const { id } = req.params;
		const { treatmentId } = req.query;
		const clinic = await Clinics.findOne({ _id: id });
		//ilgili kliniğin tedavilerinden treatmentId ile uyuşmayan tedavileri buluyoruz
		const filteredClinicTreatment = clinic?.treatments?.filter(
			(treatment) => treatment._id.toString() !== treatmentId
		);
		await Clinics.updateOne(
			{ _id: clinic._id },
			{
				$set: {
					treatments: filteredClinicTreatment,
				},
			},
			{ new: true }
		);
		return res.status(200).json({ msg: 'Tedavi Silindi' });
	} catch (err) {
		return res.status(500).json({ msg: 'Server Error : ' + err });
	}
};

module.exports = {
	createTreatment,
	updateTreatment,
	deleteTreatment,
};
