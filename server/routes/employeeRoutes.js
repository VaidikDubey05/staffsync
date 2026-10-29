const express = require('express');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// GET /api/employees - List all employees
router.get('/', protect, async (req, res) => {
  try {
    const filter = {};
    if (req.query.department) filter.department = req.query.department;
    if (req.query.role) filter.role = req.query.role;
    const employees = await User.find(filter).sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/employees - HR creates new employee
router.post('/', protect, authorize('hr'), async (req, res) => {
  try {
    const employee = await User.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/employees/:id - HR updates employee or Employee updates own personal profile
router.put('/:id', protect, async (req, res) => {
  try {
    if (req.user.role !== 'hr' && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Not authorized to update this record' });
    }
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/employees/:id - HR removes employee
router.delete('/:id', protect, authorize('hr'), async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
