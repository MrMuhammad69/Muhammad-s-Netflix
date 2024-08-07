import mongoose from 'mongoose';
import { ENV_VARS } from './envVars.js';

export const connectDB = async () => {
    try {
        await mongoose.connect(ENV_VARS.DB_URI);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1); // Exit process with failure
    }
};
