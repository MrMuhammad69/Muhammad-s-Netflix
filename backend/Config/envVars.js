import dotenv from 'dotenv';

dotenv.config();

export const ENV_VARS = {
    PORT: process.env.PORT || 3000,
    DB_URI: process.env.DB_URI,
    JWT_SECRET:process.env.JWT_SECRET,
    NODE_ENV:process.env.NODE_ENV,
    TMBD_API_KEY: process.env.TMBD_API_KEY
};
