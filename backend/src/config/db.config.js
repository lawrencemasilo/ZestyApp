const mongoose = require('mongoose');

const connectDB = async () => {
    const uri = process.env.MONGO_URI; // Ensure this environment variable is set
    if (!uri) {
        throw new Error('MONGO_URI is not defined in the environment variables');
    }
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;