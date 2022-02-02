const Personals = require('../models/personalModel');

const authDentist = async (req, res, next) => {
	try {
		const personal = await Personals.findOne({ _id: req.user.id });
		if (personal.personalAuthority !== 'Diş Hekimi')
			return res.status(500).json({ msg: 'Diş Hekimi erişimi reddedildi' });
		next();
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

module.exports = authDentist;
