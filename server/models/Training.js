const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    department: { type: String, required: true },
    instructor: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    durationHours: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['Active', 'Upcoming', 'Completed'],
      default: 'Active',
    },
    description: { type: String, required: true },
    enrolledEmployees: [
      {
        employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        employeeName: { type: String },
        progress: { type: Number, default: 0, min: 0, max: 100 },
        completed: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Training', trainingSchema);
