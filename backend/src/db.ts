import mongoose from 'mongoose';
import 'dotenv/config';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer | null = null;

const isTestEnv = process.env.NODE_ENV === 'test';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/web_2025';

export const connectDB = async () => {
  try {
    if (isTestEnv) {
      mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      await mongoose.connect(uri);
      console.log('Connected to in-memory MongoDB for tests');
    } else {
      await mongoose.connect(MONGO_URI);
      console.log('Connected to MongoDB');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
};