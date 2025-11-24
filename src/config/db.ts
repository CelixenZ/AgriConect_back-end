import mongoose from 'mongoose';

const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        console.error('FATAL ERROR: MONGO_URI is not defined in environment variables.');
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDB Connected successfully!');
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err}`);
        // Exit process with failure
        process.exit(1);
    }
};

export default connectDB;   