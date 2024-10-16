const Job = require("../models/Job"); // Assuming you have a Job model

const deleteJob = async (req, res) => {
    const { jobId } = req.params; // Get jobId from the request URL

    try {
        const job = await Job.findByIdAndDelete(jobId);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json({ message: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { deleteJob };
