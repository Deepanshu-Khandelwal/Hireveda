const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// @route   POST /api/profiles
// @desc    Create or update a profile
// @access  Public
router.post('/', async (req, res) => {
  try {
    const {
      id, // If id exists, we update
      fullName,
      email,
      phone,
      title,
      bio,
      location,
      profileImage,
      experience,
      education,
      technicalSkills,
      softSkills,
      languages
    } = req.body;

    // Simple Validation
    if (!fullName || !email || !phone || !title) {
      return res.status(400).json({ message: 'Basic information (Name, Email, Phone, Title) is required.' });
    }

    if (!education || education.length === 0) {
      return res.status(400).json({ message: 'At least one education record is required.' });
    }

    let profile;

    if (id) {
      // Update existing profile
      profile = await Profile.findByIdAndUpdate(
        id,
        {
          fullName,
          email,
          phone,
          title,
          bio,
          location,
          profileImage,
          experience: experience || [],
          education,
          technicalSkills: technicalSkills || [],
          softSkills: softSkills || [],
          languages: languages || []
        },
        { new: true } // Return updated doc
      );

      if (!profile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      return res.status(200).json({ message: 'Profile updated successfully!', data: profile });
    } else {
      // Create new profile
      profile = new Profile({
        fullName,
        email,
        phone,
        title,
        bio,
        location,
        profileImage,
        experience: experience || [],
        education,
        technicalSkills: technicalSkills || [],
        softSkills: softSkills || [],
        languages: languages || []
      });

      await profile.save();
      return res.status(201).json({ message: 'Profile saved successfully!', data: profile });
    }
  } catch (error) {
    console.error('Error saving profile:', error);
    res.status(500).json({ message: 'Server error. Please try again.', error: error.message });
  }
});

// @route   GET /api/profiles
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().sort({ createdAt: -1 });
    res.status(200).json(profiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// @route   GET /api/profiles/:id
// @desc    Get profile by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

// @route   DELETE /api/profiles/:id
// @desc    Delete a profile
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json({ message: 'Profile deleted successfully.' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
});

module.exports = router;
