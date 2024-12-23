import mongoose from 'mongoose';

const connectDB = async function () {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error(`Mongo URI is missing from environment variables`);
    }
    await mongoose.connect(mongoUri);
    console.log(`MongoDB connected successfully`);
  } catch (error) {
    console.error(`MongoDB connection failed : ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
