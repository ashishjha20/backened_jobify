const User = require('../models/Ud'); // Import the User model

// Get user by email
const getUserByEmail = async (req, res) => {
    try {
        // Retrieve the email from the request parameters
        const email = req.params.email;

        // Find the user in the database by their email
        const user = await User.findOne({ email });

        // If user is not found, respond with an error
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Respond with the found user data
        res.status(200).json(user);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: "Error retrieving user", error });
    }
};

module.exports = {  getUserByEmail };
