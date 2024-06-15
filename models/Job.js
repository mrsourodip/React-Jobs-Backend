const mongoose = require('mongoose');

const ReactJobsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a job title'],
  },
  type: {
    type: String,
    enum: ['Full-Time', 'Part-Time', 'Remote', 'Internship'],
    required: [true, 'Please provide a job type'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a job description'],
  },
  location: {
    type: String,
    required: [true, 'Please provide a job location'],
  },
  salary: {
    type: String,
    enum: [
      'Under $50K',
      '$50K - $60K',
      '$60K - $70K',
      '$70K - $80K',
      '$80K - $90K',
      '$90K - $100K',
      '$100K - $125K',
      '$125K - $150K',
      '$150K - $175K',
      '$175K - $200K',
      'Over $200K',
    ],
    required: [true, 'Please provide a job salary'],
  },
  company: {
    name: {
      type: String,
      required: [true, 'Please provide a company name'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a company description'],
    },
    contactEmail: {
      type: String,
      required: [true, 'Please provide a company contact Email'],
    },
    contactPhone: {
      type: String,
      required: [true, 'Please provide a company contact Phone'],
    },
  },
});

module.exports = mongoose.model('ReactJobs', ReactJobsSchema);
