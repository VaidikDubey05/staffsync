const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Leave = require('./models/Leave');
const Attendance = require('./models/Attendance');
const Training = require('./models/Training');
const Announcement = require('./models/Announcement');

dotenv.config();

const seedData = async () => {
  await connectDB();
  await Promise.all([
    User.deleteMany(),
    Leave.deleteMany(),
    Attendance.deleteMany(),
    Training.deleteMany(),
    Announcement.deleteMany(),
  ]);

  const users = await User.create([
    {
      employeeId: 'EMP-101',
      name: 'Priya Sharma',
      email: 'priya.sharma@staffsync.io',
      password: 'password123',
      role: 'hr',
      department: 'People & Culture',
      designation: 'HR Director',
      phone: '+91 98450 11203',
      location: 'Bengaluru, India',
      salary: 145000,
      skills: ['People Analytics', 'Labor Compliance', 'Talent Acquisition', 'HRIS'],
    },
    {
      employeeId: 'EMP-102',
      name: 'Vikram Patel',
      email: 'vikram.patel@staffsync.io',
      password: 'password123',
      role: 'manager',
      department: 'Engineering',
      designation: 'Engineering Manager',
      phone: '+91 98201 44510',
      location: 'Hyderabad, India',
      salary: 165000,
      skills: ['System Architecture', 'Node.js', 'Agile Delivery', 'Team Mentorship'],
    },
    {
      employeeId: 'EMP-103',
      name: 'Aarav Mehta',
      email: 'aarav.mehta@staffsync.io',
      password: 'password123',
      role: 'employee',
      department: 'Engineering',
      designation: 'Senior Full-Stack Engineer',
      phone: '+91 97112 88920',
      location: 'Bengaluru, India',
      salary: 118000,
      skills: ['React.js', 'Node.js', 'MongoDB', 'TypeScript', 'GraphQL'],
    },
  ]);

  console.log(`Seeded ${users.length} StaffSync users successfully.`);
  process.exit(0);
};

seedData();
