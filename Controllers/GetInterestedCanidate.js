const InterestedCandidate = require('../models/InterestedJob');

// Function to get interested candidates based on company email
const getInterestedCandidates = async (req, res) => {
  const { companyEmail,title } = req.params;
  // Extract company email from route parameters
  // Log the email to confirm

  try {
    // Find interested candidates where companyEmail matches the specified value
    const interestedCandidates = await InterestedCandidate.find({ companyEmail: companyEmail,title:title });

    if (interestedCandidates.length === 0) {
      return res.status(404).json({ message: 'nogt founddd' });
    }

    return res.status(200).json({ interestedCandidates });
  } catch (error) {
    console.error('Error fetching interested candidates:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getInterestedCandidates };
