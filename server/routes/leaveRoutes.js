const express = require('express');
const Leave = require('../models/Leave');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// GET /api/leaves - Get leaves (All for HR/Manager, own for Employee)
router.get('/', protect, async (req, res) => {
  try {
    const filter = req.user.role === 'employee' ? { employee: req.user._id } : {};
    const leaves = await Leave.find(filter).sort({ createdAt: -1 });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/leaves - Apply for leave
router.post('/', protect, async (req, res) => {
  try {
    const leave = await Leave.create({
      ...req.body,
      employee: req.user._id,
      employeeName: req.user.name,
      department: req.user.department,
    });
    res.status(201).json(leave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /api/leaves/:id/status - Manager or HR approves/rejects leave
router.patch('/:id/status', protect, authorize('hr', 'manager'), async (req, res) => {
  try {
    const { status, reviewComment } = req.body;
    const leave = await Leave.findByIdAndUpdate(
      req.params.id,
      {
        status,
        reviewComment: reviewComment || '',
        reviewedBy: req.user._id,
        reviewerName: req.user.name,
      },
      { new: true }
    );
    res.json(leave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
