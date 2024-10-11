const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true,
        trim: true,
    },
    company: {
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type:String,
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    salary: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        required: true,
        trim: true,
    },
    workType: {
        type: String,
        enum: ["Full-time", "Part-time", "Contract", "Internship", "Temporary"],
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    requirements: {
        type: [String], // Array of strings for listing job requirements
        required: false,
    },
  
});

module.exports = mongoose.model("Job", jobSchema);
