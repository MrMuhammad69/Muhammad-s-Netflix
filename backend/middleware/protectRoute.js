import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { ENV_VARS } from '../Config/envVars.js';

export const protectRoute = async (req, res, next) => {
    try {
        // Check if token exists
        const token = req.cookies['jwt-netflix'];
        if (!token) {
            return res.status(401).json({ success: false, message: 'User is unauthorized' });
        }

        // Verify token
        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ success: false, message: 'Token is invalid' });
        }

        // Find user by ID and select all fields except password
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found' });
        }

        // Attach user to request object
        req.user = user;
        next();
    } catch (error) {
        console.error('Error in protectRoute middleware:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
