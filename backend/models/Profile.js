const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  company: { type: String, required: false },
  role: { type: String, required: false },
  startDate: { type: String, required: false },
  endDate: { type: String, required: false },
  description: { type: String, required: false }
});

const EducationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  passingYear: { type: String, required: true },
  grade: { type: String, required: false }
});

const ProfileSchema = new mongoose.Schema({
  // Basic Information
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  title: { type: String, required: true }, // e.g., "Full Stack Developer"
  bio: { type: String, required: false },
  location: { type: String, required: false },
  profileImage: { type: String, required: false }, // URL to image

  // Experience (optional)
  experience: [ExperienceSchema],

  // Education
  education: [EducationSchema],

  // Skills
  technicalSkills: [{ type: String }],
  softSkills: [{ type: String }],
  languages: [{ type: String }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Profile', ProfileSchema);
