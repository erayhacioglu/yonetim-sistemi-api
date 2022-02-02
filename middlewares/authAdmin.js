const Personals = require('../models/personalModel');

const authAdmin = async (req, res, next) => {
	try {
		const personal = await Personals.findOne({ _id: req.user.id });
		if (personal.personalAuthority !== 'Admin')
			return res.status(500).json({ msg: 'Admin erişimi reddedildi' });
		next();
	} catch (err) {
		return res.status(500).json({ msg: err.message });
	}
};

module.exports = authAdmin;
