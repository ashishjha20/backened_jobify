const Job = require("../models/Job");

exports.getAllJobs = async (req, res) => {
  try {
    // Find all jobs without any filter
    const jobs = await Job.find();

    if (jobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No jobs found.",
      });
    }

    // Send the jobs in response
    res.json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
