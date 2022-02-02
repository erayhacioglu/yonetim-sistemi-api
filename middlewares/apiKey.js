const apiKey = (req, res, next) => {
	const { API_KEY } = req.query;
	if (API_KEY === process.env.API_KEY) {
		next();
	} else {
		return res.status(400).json({ msg: 'Geçersiz Api Key' });
	}
};

module.exports = apiKey;
