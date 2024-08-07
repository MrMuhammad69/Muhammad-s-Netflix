import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs'
import { generatetokenAndSetCookie } from '../utils/generatetoke.js';

export async function signup(req, res) {
    try {
        const { email, password, username } = req.body; // Destructuring req.body as an object
        if (!email || !password || !username) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) { // Correct the logic to check for invalid email
            return res.status(400).json({ success: false, message: "Invalid Email" });
        }

        if (password.length < 6) { // Correct the typo: lenght -> length
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
        }

        const existingUserByEmail = await User.findOne({ email: email });
        if (existingUserByEmail) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        const existingUserByUsername = await User.findOne({ username: username });
        if (existingUserByUsername) {
            return res.status(400).json({ success: false, message: "Username already exists" });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedpassword = await bcryptjs.hash(password, salt)

        const profilePics = ['/download.png', '/download(1).png']; // Correct file names
        const image = profilePics[Math.floor(Math.random() * profilePics.length)];

        const newUser = new User({
            email: email,
            password: hashedpassword,
            username: username,
            image: image
        });

        generatetokenAndSetCookie(newUser._id, res)
        await newUser.save();
        res.status(201).json({ success: true, message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid Email or Password" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid Email or Password" });
        }

        generatetokenAndSetCookie(user._id, res);

        // Create a user object without sensitive information
        const userResponse = {
            _id: user._id,
            email: user.email,
            image: user.image, // Include the image in the response
            // Add other non-sensitive fields you want to send to the frontend
        };

        res.status(200).json({ 
            success: true, 
            message: 'User logged in successfully',
            user: userResponse  // Include user data in the response
        });
        
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}



export async function logout(req, res) {
    try {
        res.clearCookie('jwt-netflix')
        res.status(200).json({ success: true, message: "Logged out successfully" });

    }
    catch (error){
        res.status(500).json({success:false,message:"Internal Server Error"})
    }
}

export async function authCheck(req, res) {
	try {
		res.status(200).json({ success: true, user: req.user });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}