// Controllers/UpdateInterested.js
const InterestedJob = require("../models/InterestedJob");

exports.updateInterestedSchema = async (req, res) => {
  try {
    const { company, title, interestedEmail } = req.body;

    // Validate required fields
    if (!company || !title || !interestedEmail) {
      return res.status(400).json({
        status: 400,
        message: "Please provide all required fields: company, title, and interestedEmail.",
      });
    }

    // Find the InterestedJob entry by company and title
    const interestedJob = await InterestedJob.findOne({ company, title });

    if (!interestedJob) {
      return res.status(404).json({
        status: 404,
        message: `No job found for the company '${company}' with the title '${title}'.`,
      });
    }

    // Check if the email already exists in the array
    if (interestedJob.interestedCandidateEmails.includes(interestedEmail)) {
      return res.status(400).json({
        status: 400,
        message: "This email has already been added to the interested candidates.",
      });
    }

    // Add the interested email to the array
    interestedJob.interestedCandidateEmails.push(interestedEmail);

    // Save the updated document
    await interestedJob.save();

    // Send a successful response
    return res.status(200).json({
      status: 200,
      message: "Interested candidate email added successfully.",
      data: interestedJob,
    });
  } catch (error) {
    console.error("Error updating interested job:", error);

    // Send a response with a specific error message if available
    return res.status(500).json({
      status: 500,
      message: error.message || "An internal server error occurred.",
    });
  }
};
