const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['Policy Update', 'Company News', 'Event', 'Urgent'],
      default: 'Company News',
    },
    priority: {
      type: String,
      enum: ['Normal', 'High', 'Critical'],
      default: 'Normal',
    },
    targetDepartment: { type: String, default: 'All Departments' },
    content: { type: String, required: true },
    authorName: { type: String, required: true },
    authorRole: { type: String, default: 'HR Administration' },
    pinned: { type: Boolean, default: false },
    acknowledgedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Announcement', announcementSchema);
