const express = require('express');
const Resume = require('../models/resume');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { validateResume, handleValidationErrors } = require('../middleware/validation');

const router = express.Router();

// @route   POST /api/resumes
// @desc    Create a new resume for the logged-in user
// @access  Private
router.post('/', protect, validateResume, handleValidationErrors, async (req, res) => {
  try {
    const { title, template, pages, isPublic } = req.body;

    const resume = new Resume({
      user: req.user._id,
      title,
      template,
      pages: pages || [],
      isPublic: isPublic || false,
    });

    await resume.save();

    // Add resume reference to user
    req.user.resumes.push(resume._id);
    await req.user.save();

    res.status(201).json({
      success: true,
      data: resume,
      message: 'Resume created successfully',
    });
  } catch (error) {
    console.error('Resume creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during resume creation',
    });
  }
});

// @route   GET /api/resumes/:id
// @desc    Get a resume by ID (owner or public only)
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    // Check access: owner or public
    if (!resume.isPublic && resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to view this resume' });
    }

    res.json({ success: true, data: resume });
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching resume' });
  }
});

// @route   GET /api/users/:userId/resumes
// @desc    Get all resumes for a user (owner only)
// @access  Private
router.get('/user/:userId', protect, async (req, res) => {
  try {
    if (req.user._id.toString() !== req.params.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to view these resumes' });
    }

    const resumes = await Resume.find({ user: req.params.userId });

    res.json({ success: true, count: resumes.length, data: resumes });
  } catch (error) {
    console.error('Get user resumes error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching user resumes' });
  }
});

// @route   PUT /api/resumes/:id
// @desc    Update a resume by ID (owner only)
// @access  Private
router.put('/:id', protect, validateResume, handleValidationErrors, async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this resume' });
    }

    const { title, template, pages, isPublic } = req.body;

    resume.title = title;
    resume.template = template;
    resume.pages = pages || resume.pages;
    resume.isPublic = typeof isPublic === 'boolean' ? isPublic : resume.isPublic;
    resume.updatedAt = Date.now();

    await resume.save();

    res.json({ success: true, data: resume, message: 'Resume updated successfully' });
  } catch (error) {
    console.error('Update resume error:', error);
    res.status(500).json({ success: false, message: 'Server error updating resume' });
  }
});

// @route   DELETE /api/resumes/:id
// @desc    Delete a resume by ID (owner only)
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    if (resume.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this resume' });
    }

    await resume.deleteOne();

    // Remove from user's resume references
    req.user.resumes = req.user.resumes.filter(rId => rId.toString() !== req.params.id);
    await req.user.save();

    res.json({ success: true, message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({ success: false, message: 'Server error deleting resume' });
  }
});

module.exports = router;
