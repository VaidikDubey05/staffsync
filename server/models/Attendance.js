const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    employeeName: { type: String, required: true },
    department: { type: String, required: true },
    date: { type: String, required: true }, // YYYY-MM-DD
    clockIn: { type: String, required: true },
    clockOut: { type: String, default: null },
    workMode: {
      type: String,
      enum: ['Office', 'Remote', 'Hybrid'],
      default: 'Office',
    },
    status: {
      type: String,
      enum: ['Present', 'Late', 'Half-Day', 'On Leave'],
      default: 'Present',
    },
    totalHours: { type: Number, default: 0 },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
