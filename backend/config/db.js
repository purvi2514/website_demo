const mongoose = require('mongoose');
const connectDB = async (mongoUri, options = {}) => {
	try {
		const defaultOpts = { dbName: 'tazweed', serverSelectionTimeoutMS: 5000 };
		await mongoose.connect(mongoUri, Object.assign({}, defaultOpts, options));
		console.log('MongoDB connected');
	} catch (err) {
		console.error('MongoDB connection error:', err.message);
		process.exit(1);
	}
};


module.exports = connectDB;