const bcrypt = require("bcrypt");
const User =require("../models/User")
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Signup route handler
exports.signup = async (req, res) => {
    try {
        // Get data
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false, // Fix: should be false
                message: 'User already exists',
            });
        }

        // Secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: 'Error in hashing password', // Fix: correct typo
            });
        }

        // Create entry for User
        await User.create({ name, email, password: hashedPassword, role });
        return res.status(200).json({
            success: true,
            message: 'User created successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'User cannot be registered, please try again later',
        });
    }
}

// Login route handler
exports.login = async (req, res) => {
    try {
        // Data fetch
        const { email, password } = req.body;

        // Validation on email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all the details carefully',
            });
        }

        // Check for registered user
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User is not registered',
            });
        }

        const payload = { email: user.email, id: user._id, role: user.role };

        // Verify password & generate a JWT token
        if (await bcrypt.compare(password, user.password)) {
            // Password match
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
            
            user = user.toObject();
            user.token = token;
            delete user.password;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            // Send the token in a HttpOnly cookie
            res.cookie("token", token, options).status(200).json({
                success: true,
                user,
                message: 'User logged in successfully',
            });

        } else {
            // Password does not match
            return res.status(403).json({
                success: false,
                message: "Password incorrect",
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Login failure',
        });
    }
}
