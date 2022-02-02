const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		await mongoose.connect(
			'mongodb+srv://eray:eray@cluster0.poh7r.mongodb.net/klinik-yonetim-sistemi-api?retryWrites=true&w=majority'
		);
		console.log('Mongodb connected...');
	} catch (err) {
		console.error('Server Error : ' + err);
	}
};

module.exports = dbConnection;
