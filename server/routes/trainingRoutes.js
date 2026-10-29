const express = require('express');
const Training = require('../models/Training');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    const trainings = await Training.find().sort({ createdAt: -1 });
    res.json(trainings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', protect, authorize('manager', 'hr'), async (req, res) => {
  try {
    const training = await Training.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json(training);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch('/:id/progress', protect, async (req, res) => {
  try {
    const { employeeName, progress } = req.body;
    const training = await Training.findById(req.params.id);
    if (!training) return res.status(404).json({ message: 'Training not found' });

    const entry = training.enrolledEmployees.find(
      (e) => e.employeeName === employeeName || String(e.employee) === String(req.user._id)
    );
    if (entry) {
      entry.progress = Math.min(100, Math.max(0, Number(progress)));
      entry.completed = entry.progress === 100;
    } else {
      training.enrolledEmployees.push({
        employee: req.user._id,
        employeeName: req.user.name,
        progress: Number(progress) || 25,
        completed: Number(progress) === 100,
      });
    }
    await training.save();
    res.json(training);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
