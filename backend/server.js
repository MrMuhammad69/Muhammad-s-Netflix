import express from 'express';

import authRoutes from './routes/auth.route.js';
import movieRoutes from './routes/movie.route.js'
import tvRoutes from './routes/tv.route.js'
import { ENV_VARS } from './Config/envVars.js';
import { connectDB } from './Config/db.js';
import cookieParser from 'cookie-parser';
import { protectRoute } from './middleware/protectRoute.js';
import searchRoutes from './routes/search.route.js'
import path from 'path'
const app = express();
const PORT = ENV_VARS.PORT;
const __dirname = path.resolve()

// Connect to the database
connectDB();
app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie",protectRoute, movieRoutes);
app.use('/api/v1/tv',protectRoute, tvRoutes)
app.use('/api/v1/search',protectRoute,searchRoutes)

if(ENV_VARS.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    })
}


app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});

