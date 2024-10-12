const mongoose = require('mongoose');

const InterestedJobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  companyEmail: {
    type: String,
    required: true
  },
  interestedCandidateEmails: {
    type: [String],
    required: true,
    default: []
  },
  interestedCandidateNames: {
    type: [String],
    required: true,
    default: []
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('InterestedJob', InterestedJobSchema);
