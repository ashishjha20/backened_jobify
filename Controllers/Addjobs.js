// Controllers/Addjobs.js
const Job = require("../models/Job");


exports.createJob = async (req, res) => {
  try {
    console.log("req body", req.body);
    const { jobTitle, company, email, location, salary, role, workType, description, requirements } = req.body;

    // Validate required fields
    if (!jobTitle || !company || !email || !location || !role || !workType || !description) {
      console.log("Not all required fields are filled...");
      return res.status(400).json({
        status: 400,
        message: "Please fill all required fields",
      });
    }

    // Create a new job document
    const job = await Job.create({
      jobTitle,
      company,
      email,  // Include the email field here
      location,
      salary,
      role,
      workType,
      description,
      requirements,
    });

    // Send a successful response
    return res.status(201).json({
      status: 201,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    console.log("Error creating job", error);
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
