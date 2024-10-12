const User = require('../models/Ud'); // Import the User model

// Create a new user
const createUser = async (req, res) => {
    try {
        // Create a new user with data from the request body
        const newUser = new User({
            name: req.body.name,
            phone_number: req.body.phone_number,
            email: req.body.email,
            date_of_birth: req.body.date_of_birth,
            gender: req.body.gender,
            address: req.body.address,
            skills: req.body.skills,
            education: req.body.education,
            certifications: req.body.certifications,
            work_experience: req.body.work_experience,
            availability: req.body.availability,
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        // Respond with the saved user data
        res.status(201).json(savedUser);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: "Error creating user", error });
    }
};

module.exports = { createUser };
