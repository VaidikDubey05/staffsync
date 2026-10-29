const express = require('express');
const Attendance = require('../models/Attendance');
const { protect } = require('../middleware/auth');

const router = express.Router();

// GET /api/attendance - HR/Manager views all or filtered; Employee views own
router.get('/', protect, async (req, res) => {
  try {
    const filter = req.user.role === 'employee' ? { employee: req.user._id } : {};
    if (req.query.date) filter.date = req.query.date;
    const records = await Attendance.find(filter).sort({ date: -1, createdAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/attendance/clock-in - Employee clocks in
router.post('/clock-in', protect, async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const record = await Attendance.create({
      employee: req.user._id,
      employeeName: req.user.name,
      department: req.user.department,
      date: today,
      clockIn: req.body.clockIn || new Date().toLocaleTimeString(),
      workMode: req.body.workMode || 'Office',
      status: req.body.status || 'Present',
      notes: req.body.notes || '',
    });
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH /api/attendance/:id/clock-out - Employee clocks out
router.patch('/:id/clock-out', protect, async (req, res) => {
  try {
    const record = await Attendance.findByIdAndUpdate(
      req.params.id,
      {
        clockOut: req.body.clockOut || new Date().toLocaleTimeString(),
        totalHours: req.body.totalHours || 8.5,
      },
      { new: true }
    );
    res.json(record);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
