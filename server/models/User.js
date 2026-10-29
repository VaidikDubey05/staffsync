const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    employeeId: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ['hr', 'manager', 'employee'],
      default: 'employee',
    },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    phone: { type: String, default: '' },
    location: { type: String, default: 'Bengaluru, India' },
    joinDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['Active', 'On Leave', 'Inactive'],
      default: 'Active',
    },
    salary: { type: Number, default: 0 },
    emergencyContact: {
      name: { type: String, default: '' },
      relation: { type: String, default: '' },
      phone: { type: String, default: '' },
    },
    skills: [{ type: String }],
    leaveBalance: {
      annual: { type: Number, default: 18 },
      sick: { type: Number, default: 10 },
      casual: { type: Number, default: 7 },
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
