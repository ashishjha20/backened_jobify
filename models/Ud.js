const mongoose = require("mongoose");

const ud = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone_number: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    date_of_birth: {
        type: Date, // To capture age
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
    },
    address: {
        type: String,
        trim: true // Simple single string for the user's location
    },
    skills: {
        type: [String], // List of practical skills (e.g., plumbing, carpentry, etc.)
        trim: true
    },
    education: [
        {
            institution_name: {
                type: String,
                trim: true
            },
            degree: {
                type: String, // E.g., "High School", "Diploma", "B.A."
                trim: true
            },
            field_of_study: {
                type: String, // E.g., "Science", "Commerce", etc.
                trim: true
            },
            start_year: {
                type: Number
            },
            end_year: {
                type: Number
            }
        }
    ],
    certifications: [
        {
            certification_name: {
                type: String,
                trim: true
            },
            institution: {
                type: String, // Where the certification was obtained from
                trim: true
            },
            year_obtained: {
                type: Number
            }
        }
    ],
    work_experience: [
        {
            company_name: {
                type: String,
                trim: true
            },
            position: {
                type: String, // E.g., "Electrician", "Mason"
                trim: true
            },
            start_year: {
                type: Number
            },
            end_year: {
                type: Number
            },
            description: {
                type: String, // Brief description of the job or duties
                trim: true
            }
        }
    ],
   
    availability: {
        type: String, // Full-time, part-time, etc.
        trim: true
    },
  
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Ud",ud);
