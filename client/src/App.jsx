import React, { useState, useMemo, useEffect } from 'react';
import {
  Users,
  Calendar,
  Clock,
  Megaphone,
  GraduationCap,
  LayoutDashboard,
  ShieldCheck,
  UserCheck,
  UserCog,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Building2,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Edit3,
  Trash2,
  Pin,
  Code2,
  Server,
  Database,
  Check,
  X,
  ChevronRight,
  LogOut,
  Sparkles,
  Award,
  TrendingUp,
  FileText,
  Filter,
  RefreshCw,
  Play,
  Square
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Initial Seed Data (Mirroring MongoDB Collections)
// ---------------------------------------------------------------------------

const INITIAL_EMPLOYEES = [
  {
    id: 'emp-101',
    employeeId: 'EMP-101',
    name: 'Priya Sharma',
    email: 'priya.sharma@staffsync.io',
    role: 'hr',
    roleLabel: 'HR Personnel',
    department: 'People & Culture',
    designation: 'Director of Human Resources',
    location: 'Bengaluru, India',
    phone: '+91 98450 11203',
    joinDate: '2022-03-14',
    status: 'Active',
    salary: 145000,
    manager: 'Executive Board',
    skills: ['People Analytics', 'Labor Compliance', 'Talent Acquisition', 'HRIS Operations'],
    emergencyContact: { name: 'Rohan Sharma', relation: 'Spouse', phone: '+91 98450 99001' },
    leaveBalance: { annual: 16, sick: 9, casual: 6 },
    avatarBg: 'from-violet-600 to-indigo-600',
    initials: 'PS'
  },
  {
    id: 'emp-102',
    employeeId: 'EMP-102',
    name: 'Vikram Patel',
    email: 'vikram.patel@staffsync.io',
    role: 'manager',
    roleLabel: 'Manager',
    department: 'Engineering',
    designation: 'Engineering Manager',
    location: 'Hyderabad, India',
    phone: '+91 98201 44510',
    joinDate: '2021-08-02',
    status: 'Active',
    salary: 165000,
    manager: 'CTO Office',
    skills: ['Distributed Systems', 'Node.js', 'Agile Delivery', 'Engineering Leadership'],
    emergencyContact: { name: 'Meera Patel', relation: 'Spouse', phone: '+91 98201 77812' },
    leaveBalance: { annual: 14, sick: 10, casual: 5 },
    avatarBg: 'from-blue-600 to-cyan-600',
    initials: 'VP'
  },
  {
    id: 'emp-103',
    employeeId: 'EMP-103',
    name: 'Aarav Mehta',
    email: 'aarav.mehta@staffsync.io',
    role: 'employee',
    roleLabel: 'Employee',
    department: 'Engineering',
    designation: 'Senior Full-Stack Engineer',
    location: 'Bengaluru, India',
    phone: '+91 97112 88920',
    joinDate: '2023-01-19',
    status: 'Active',
    salary: 118000,
    manager: 'Vikram Patel',
    skills: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'TypeScript'],
    emergencyContact: { name: 'Kavita Mehta', relation: 'Mother', phone: '+91 97112 33109' },
    leaveBalance: { annual: 12, sick: 8, casual: 6 },
    avatarBg: 'from-emerald-600 to-teal-600',
    initials: 'AM'
  },
  {
    id: 'emp-104',
    employeeId: 'EMP-104',
    name: 'Ananya Nair',
    email: 'ananya.nair@staffsync.io',
    role: 'employee',
    roleLabel: 'Employee',
    department: 'Product Design',
    designation: 'Lead UX Researcher',
    location: 'Mumbai, India',
    phone: '+91 98190 55421',
    joinDate: '2023-06-10',
    status: 'Active',
    salary: 112000,
    manager: 'Vikram Patel',
    skills: ['Design Systems', 'Figma', 'User Testing', 'Accessibility'],
    emergencyContact: { name: 'Suresh Nair', relation: 'Father', phone: '+91 98190 11092' },
    leaveBalance: { annual: 15, sick: 10, casual: 7 },
    avatarBg: 'from-rose-500 to-pink-600',
    initials: 'AN'
  },
  {
    id: 'emp-105',
    employeeId: 'EMP-105',
    name: 'Kabir Verma',
    email: 'kabir.verma@staffsync.io',
    role: 'employee',
    roleLabel: 'Employee',
    department: 'Engineering',
    designation: 'DevOps & Cloud Engineer',
    location: 'Pune, India',
    phone: '+91 99230 66781',
    joinDate: '2024-02-05',
    status: 'On Leave',
    salary: 108000,
    manager: 'Vikram Patel',
    skills: ['Kubernetes', 'AWS', 'Docker', 'CI/CD Pipelines', 'Terraform'],
    emergencyContact: { name: 'Neha Verma', relation: 'Sister', phone: '+91 99230 11904' },
    leaveBalance: { annual: 10, sick: 7, casual: 4 },
    avatarBg: 'from-amber-500 to-orange-600',
    initials: 'KV'
  },
  {
    id: 'emp-106',
    employeeId: 'EMP-106',
    name: 'Riya Deshmukh',
    email: 'riya.deshmukh@staffsync.io',
    role: 'manager',
    roleLabel: 'Manager',
    department: 'Customer Success',
    designation: 'Head of Client Operations',
    location: 'Delhi NCR, India',
    phone: '+91 98104 72390',
    joinDate: '2022-11-11',
    status: 'Active',
    salary: 132000,
    manager: 'COO Office',
    skills: ['Enterprise Onboarding', 'CRM Strategy', 'Account Retention', 'SLA Governance'],
    emergencyContact: { name: 'Aditya Deshmukh', relation: 'Spouse', phone: '+91 98104 99812' },
    leaveBalance: { annual: 17, sick: 9, casual: 6 },
    avatarBg: 'from-fuchsia-600 to-purple-600',
    initials: 'RD'
  }
];

const INITIAL_LEAVES = [
  {
    id: 'lv-201',
    employeeId: 'emp-103',
    employeeName: 'Aarav Mehta',
    department: 'Engineering',
    leaveType: 'Annual Leave',
    startDate: '2026-11-04',
    endDate: '2026-11-06',
    days: 3,
    reason: 'Attending family wedding ceremony in Jaipur',
    status: 'Pending',
    appliedOn: '2026-10-28',
    reviewedBy: '',
    reviewComment: ''
  },
  {
    id: 'lv-202',
    employeeId: 'emp-104',
    employeeName: 'Ananya Nair',
    department: 'Product Design',
    leaveType: 'Sick Leave',
    startDate: '2026-11-02',
    endDate: '2026-11-03',
    days: 2,
    reason: 'Dental surgery recovery and follow-up checkup',
    status: 'Pending',
    appliedOn: '2026-10-29',
    reviewedBy: '',
    reviewComment: ''
  },
  {
    id: 'lv-203',
    employeeId: 'emp-105',
    employeeName: 'Kabir Verma',
    department: 'Engineering',
    leaveType: 'Annual Leave',
    startDate: '2026-10-27',
    endDate: '2026-10-30',
    days: 4,
    reason: 'Scheduled personal travel and family festival break',
    status: 'Approved',
    appliedOn: '2026-10-18',
    reviewedBy: 'Vikram Patel (Manager)',
    reviewComment: 'Approved. On-call handoff covered by Aarav.'
  },
  {
    id: 'lv-204',
    employeeId: 'emp-103',
    employeeName: 'Aarav Mehta',
    department: 'Engineering',
    leaveType: 'Casual Leave',
    startDate: '2026-10-12',
    endDate: '2026-10-12',
    days: 1,
    reason: 'Passport renewal appointment at regional office',
    status: 'Approved',
    appliedOn: '2026-10-08',
    reviewedBy: 'Priya Sharma (HR)',
    reviewComment: 'Verified and approved.'
  }
];

const INITIAL_ATTENDANCE = [
  {
    id: 'att-301',
    employeeId: 'emp-101',
    employeeName: 'Priya Sharma',
    department: 'People & Culture',
    date: '2026-10-29',
    clockIn: '08:52 AM',
    clockOut: '05:45 PM',
    workMode: 'Office',
    status: 'Present',
    totalHours: 8.9,
    notes: 'Q4 compensation review & policy townhall prep'
  },
  {
    id: 'att-302',
    employeeId: 'emp-102',
    employeeName: 'Vikram Patel',
    department: 'Engineering',
    date: '2026-10-29',
    clockIn: '09:05 AM',
    clockOut: '06:15 PM',
    workMode: 'Hybrid',
    status: 'Present',
    totalHours: 9.2,
    notes: 'Sprint architecture review & security training rollout'
  },
  {
    id: 'att-303',
    employeeId: 'emp-103',
    employeeName: 'Aarav Mehta',
    department: 'Engineering',
    date: '2026-10-29',
    clockIn: '09:14 AM',
    clockOut: null,
    workMode: 'Office',
    status: 'Present',
    totalHours: 7.4,
    notes: 'Implementing MERN RBAC middleware & MongoDB aggregation pipelines'
  },
  {
    id: 'att-304',
    employeeId: 'emp-104',
    employeeName: 'Ananya Nair',
    department: 'Product Design',
    date: '2026-10-29',
    clockIn: '09:42 AM',
    clockOut: '06:05 PM',
    workMode: 'Remote',
    status: 'Late',
    totalHours: 8.4,
    notes: 'Employee self-service portal usability interviews'
  },
  {
    id: 'att-305',
    employeeId: 'emp-105',
    employeeName: 'Kabir Verma',
    department: 'Engineering',
    date: '2026-10-29',
    clockIn: '-',
    clockOut: '-',
    workMode: 'Remote',
    status: 'On Leave',
    totalHours: 0,
    notes: 'Approved Annual Leave (Oct 27 - Oct 30)'
  },
  {
    id: 'att-306',
    employeeId: 'emp-106',
    employeeName: 'Riya Deshmukh',
    department: 'Customer Success',
    date: '2026-10-29',
    clockIn: '08:58 AM',
    clockOut: '05:30 PM',
    workMode: 'Office',
    status: 'Present',
    totalHours: 8.5,
    notes: 'Enterprise QBR presentations'
  }
];

const INITIAL_TRAININGS = [
  {
    id: 'trn-401',
    title: 'Advanced MERN Stack Security & OWASP API Governance',
    category: 'Technical Engineering',
    department: 'Engineering',
    instructor: 'Vikram Patel',
    durationHours: 12,
    dueDate: '2026-11-18',
    status: 'Active',
    description: 'Deep-dive into JWT rotation, Mongoose query sanitization, rate limiting, and zero-trust RBAC patterns across Express.js microservices.',
    enrolled: [
      { employeeId: 'emp-103', employeeName: 'Aarav Mehta', progress: 75, completed: false },
      { employeeId: 'emp-105', employeeName: 'Kabir Verma', progress: 50, completed: false }
    ]
  },
  {
    id: 'trn-402',
    title: 'Inclusive Leadership & High-Trust Hybrid Teams',
    category: 'Leadership & Management',
    department: 'All Departments',
    instructor: 'Priya Sharma',
    durationHours: 6,
    dueDate: '2026-11-10',
    status: 'Active',
    description: 'Structured workshop for managers and senior leads on asynchronous communication, unbiased performance calibration, and psychological safety.',
    enrolled: [
      { employeeId: 'emp-102', employeeName: 'Vikram Patel', progress: 100, completed: true },
      { employeeId: 'emp-106', employeeName: 'Riya Deshmukh', progress: 100, completed: true },
      { employeeId: 'emp-103', employeeName: 'Aarav Mehta', progress: 100, completed: true }
    ]
  },
  {
    id: 'trn-403',
    title: 'WCAG 2.2 Accessibility & Enterprise Design Systems',
    category: 'Product & Design',
    department: 'Product Design',
    instructor: 'Ananya Nair',
    durationHours: 8,
    dueDate: '2026-11-25',
    status: 'Active',
    description: 'Hands-on certification covering keyboard navigation, screen-reader semantics, color contrast tokens, and responsive component patterns.',
    enrolled: [
      { employeeId: 'emp-104', employeeName: 'Ananya Nair', progress: 100, completed: true },
      { employeeId: 'emp-103', employeeName: 'Aarav Mehta', progress: 50, completed: false }
    ]
  }
];

const INITIAL_ANNOUNCEMENTS = [
  {
    id: 'ann-501',
    title: 'Q4 Annual Wellness Stipend & Flexible Year-End Holidays',
    category: 'Policy Update',
    priority: 'High',
    targetDepartment: 'All Departments',
    content: 'HR is pleased to announce an expanded ₹25,000 annual wellness reimbursement covering gym memberships, ergonomic home-office upgrades, and preventive health checkups. Please submit claims via StaffSync before December 15, 2026.',
    authorName: 'Priya Sharma',
    authorRole: 'Director of Human Resources',
    date: '2026-10-28',
    pinned: true,
    acknowledgedBy: ['emp-101', 'emp-102', 'emp-103']
  },
  {
    id: 'ann-502',
    title: 'Engineering Architecture Townhall & Demo Day — Nov 5',
    category: 'Event',
    priority: 'Normal',
    targetDepartment: 'Engineering',
    content: 'Join us next Thursday at 4:00 PM IST for live demonstrations of our new MongoDB Atlas search pipelines, automated CI/CD deployment workflows, and Q4 product roadmap Q&A.',
    authorName: 'Vikram Patel',
    authorRole: 'Engineering Manager',
    date: '2026-10-26',
    pinned: false,
    acknowledgedBy: ['emp-102', 'emp-103']
  },
  {
    id: 'ann-503',
    title: 'Mandatory Cybersecurity & 2FA Hardware Key Enrollment',
    category: 'Urgent',
    priority: 'Critical',
    targetDepartment: 'All Departments',
    content: 'All staff members must complete SSO multi-factor enrollment and verify their emergency contact records inside the My Profile tab by Friday, November 6, 2026.',
    authorName: 'Priya Sharma',
    authorRole: 'Director of Human Resources',
    date: '2026-10-24',
    pinned: true,
    acknowledgedBy: ['emp-101', 'emp-102', 'emp-104', 'emp-106']
  }
];

const INITIAL_API_LOGS = [
  { id: 'log-1', method: 'POST', endpoint: '/api/auth/login', status: 200, role: 'hr', summary: 'Authenticated session token issued (JWT)', timestamp: '19:45:02' },
  { id: 'log-2', method: 'GET', endpoint: '/api/employees?status=Active', status: 200, role: 'hr', summary: 'Fetched 6 employee documents from MongoDB users collection', timestamp: '19:45:03' },
  { id: 'log-3', method: 'GET', endpoint: '/api/attendance?date=2026-10-29', status: 200, role: 'hr', summary: 'Aggregated daily attendance logs', timestamp: '19:45:04' }
];

// ---------------------------------------------------------------------------
// Main Application Component
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// Embedded Express.js + Mongoose Backend Engine & Source Files
// ---------------------------------------------------------------------------

const SIMULATED_JWT_TOKENS = {
  hr: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVtcC0xMDEiLCJyb2xlIjoiaHIiLCJuYW1lIjoiUHJpeWEgU2hhcm1hIiwiaWF0IjoxNzYxNzQ3NjAwfQ.staffsync_hr_sig_99a8b7',
  manager: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVtcC0xMDIiLCJyb2xlIjoibWFuYWdlciIsIm5hbWUiOiJWaWtyYW0gUGF0ZWwiLCJpYXQiOjE3NjE3NDc2MDB9.staffsync_mgr_sig_44c2d1',
  employee: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVtcC0xMDMiLCJyb2xlIjoiZW1wbG95ZWUiLCJuYW1lIjoiQWFyYXYgTWVodGEiLCJpYXQiOjE3NjE3NDc2MDB9.staffsync_emp_sig_71e5f3'
};

const BACKEND_SOURCE_FILES = {
  'server/server.js': `const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('staffsync/config/db');
const { errorHandler, notFound } = require('staffsync/middleware/errorMiddleware');

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());
app.use(morgan('dev'));

// Health & System Status
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'StaffSync MERN HR Backend API',
    dbState: 'Connected (MongoDB Atlas / Mongoose 8.4)',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

// Mount REST API Routers
app.use('/api/auth', require('staffsync/routes/authRoutes'));
app.use('/api/employees', require('staffsync/routes/employeeRoutes'));
app.use('/api/leaves', require('staffsync/routes/leaveRoutes'));
app.use('/api/attendance', require('staffsync/routes/attendanceRoutes'));
app.use('/api/trainings', require('staffsync/routes/trainingRoutes'));
app.use('/api/announcements', require('staffsync/routes/announcementRoutes'));
app.use('/api/analytics', require('staffsync/routes/analyticsRoutes'));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`StaffSync Express Server running on port \${PORT}\`));`,

  'server/middleware/auth.js': `const jwt = require('jsonwebtoken');
const User = require('staffsync/models/User');

// Verify Bearer JWT Token
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ success: false, message: '401 Unauthorized: Missing Bearer token' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'staffsync_secret');
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User account not found' });
    }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: '401 Unauthorized: Invalid or expired JWT' });
  }
};

// Role-Based Access Control (RBAC) Guard
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: \`403 Forbidden: Role '\${req.user.role}' cannot access this endpoint. Allowed: [\${roles.join(', ')}]\`
      });
    }
    next();
  };
};

module.exports = { protect, authorize };`,

  'server/models/AllModels.js': `const mongoose = require('mongoose');

// 1. Employee / User Schema
const userSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['hr', 'manager', 'employee'], default: 'employee' },
  department: { type: String, required: true },
  designation: { type: String, required: true },
  status: { type: String, enum: ['Active', 'On Leave', 'Inactive'], default: 'Active' },
  salary: { type: Number, default: 0 },
  skills: [{ type: String }],
  emergencyContact: { name: String, relation: String, phone: String },
  leaveBalance: {
    annual: { type: Number, default: 18 },
    sick: { type: Number, default: 10 },
    casual: { type: Number, default: 7 }
  }
}, { timestamps: true });

// 2. Leave Request Schema
const leaveSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  employeeName: { type: String, required: true },
  department: { type: String, required: true },
  leaveType: { type: String, enum: ['Annual Leave', 'Sick Leave', 'Casual Leave', 'Parental Leave'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  days: { type: Number, required: true, min: 1 },
  reason: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  reviewedBy: { type: String, default: '' },
  reviewComment: { type: String, default: '' }
}, { timestamps: true });

// 3. Attendance Log Schema
const attendanceSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  employeeName: { type: String, required: true },
  department: { type: String, required: true },
  date: { type: String, required: true },
  clockIn: { type: String, required: true },
  clockOut: { type: String, default: null },
  workMode: { type: String, enum: ['Office', 'Remote', 'Hybrid'], default: 'Office' },
  status: { type: String, enum: ['Present', 'Late', 'Half-Day', 'On Leave'], default: 'Present' },
  totalHours: { type: Number, default: 0 },
  notes: { type: String, default: '' }
}, { timestamps: true });`,

  'server/routes/apiRoutes.js': `const express = require('express');
const router = express.Router();
const { protect, authorize } = require('staffsync/middleware/auth');
const User = require('staffsync/models/User');
const Leave = require('staffsync/models/Leave');
const Attendance = require('staffsync/models/Attendance');
const Training = require('staffsync/models/Training');
const Announcement = require('staffsync/models/Announcement');

// Employees CRUD
router.get('/employees', protect, async (req, res) => {
  const users = await User.find(req.query).sort({ createdAt: -1 });
  res.json({ success: true, count: users.length, data: users });
});

router.post('/employees', protect, authorize('hr'), async (req, res) => {
  const created = await User.create(req.body);
  res.status(201).json({ success: true, data: created });
});

// Leave Workflow
router.post('/leaves', protect, async (req, res) => {
  const leave = await Leave.create({ ...req.body, employee: req.user._id, employeeName: req.user.name });
  res.status(201).json({ success: true, data: leave });
});

router.patch('/leaves/:id/status', protect, authorize('hr', 'manager'), async (req, res) => {
  const leave = await Leave.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status, reviewComment: req.body.reviewComment, reviewedBy: req.user.name },
    { new: true }
  );
  res.json({ success: true, data: leave });
});

// Attendance Clock-In / Clock-Out
router.post('/attendance/clock-in', protect, async (req, res) => {
  const record = await Attendance.create({ ...req.body, employee: req.user._id, employeeName: req.user.name });
  res.status(201).json({ success: true, data: record });
});

// Training & Announcements
router.post('/trainings', protect, authorize('manager', 'hr'), async (req, res) => {
  const trn = await Training.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json({ success: true, data: trn });
});

router.post('/announcements', protect, authorize('hr'), async (req, res) => {
  const ann = await Announcement.create({ ...req.body, authorName: req.user.name });
  res.status(201).json({ success: true, data: ann });
});

module.exports = router;`
};

export default function App() {
  // Active Role & Persona switcher: 'hr' (Priya), 'manager' (Vikram), 'employee' (Aarav)
  const [activeRole, setActiveRole] = useState('hr');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Core MERN State Collections
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);
  const [leaves, setLeaves] = useState(INITIAL_LEAVES);
  const [attendance, setAttendance] = useState(INITIAL_ATTENDANCE);
  const [trainings, setTrainings] = useState(INITIAL_TRAININGS);
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS);
  const [apiLogs, setApiLogs] = useState(INITIAL_API_LOGS);

  // Toast Notification
  const [toast, setToast] = useState(null);

  // Embedded Backend Studio State (REST API Tester, MongoDB Collection Inspector & Code Viewer)
  const [backendSubTab, setBackendSubTab] = useState('playground');
  const [apiMethod, setApiMethod] = useState('GET');
  const [apiEndpoint, setApiEndpoint] = useState('/api/employees');
  const [apiRequestBody, setApiRequestBody] = useState('{\n  "name": "Devika Iyer",\n  "email": "devika.iyer@staffsync.io",\n  "role": "employee",\n  "department": "Engineering",\n  "designation": "Backend Node.js Engineer",\n  "location": "Bengaluru, India",\n  "salary": 122000\n}');
  const [apiResponse, setApiResponse] = useState({
    status: 200,
    statusText: '200 OK',
    latencyMs: 14,
    headers: { 'content-type': 'application/json; charset=utf-8', 'x-powered-by': 'Express 4.19.2', 'x-mongodb-collection': 'users' },
    body: {
      success: true,
      authenticatedAs: 'Priya Sharma (hr)',
      count: 6,
      data: INITIAL_EMPLOYEES.slice(0, 2)
    }
  });
  const [selectedMongoCollection, setSelectedMongoCollection] = useState('users');
  const [mongoFilterQuery, setMongoFilterQuery] = useState('');
  const [selectedBackendFile, setSelectedBackendFile] = useState('server/server.js');

  // Persist & hydrate MongoDB collections from localStorage safely
  useEffect(() => {
    try {
      const savedEmp = localStorage.getItem('staffsync_db_users');
      const savedLv = localStorage.getItem('staffsync_db_leaves');
      const savedAtt = localStorage.getItem('staffsync_db_attendance');
      const savedTrn = localStorage.getItem('staffsync_db_trainings');
      const savedAnn = localStorage.getItem('staffsync_db_announcements');
      if (savedEmp) setEmployees(JSON.parse(savedEmp));
      if (savedLv) setLeaves(JSON.parse(savedLv));
      if (savedAtt) setAttendance(JSON.parse(savedAtt));
      if (savedTrn) setTrainings(JSON.parse(savedTrn));
      if (savedAnn) setAnnouncements(JSON.parse(savedAnn));
    } catch (_e) {
      // Ignore storage errors in restricted sandboxes
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('staffsync_db_users', JSON.stringify(employees));
      localStorage.setItem('staffsync_db_leaves', JSON.stringify(leaves));
      localStorage.setItem('staffsync_db_attendance', JSON.stringify(attendance));
      localStorage.setItem('staffsync_db_trainings', JSON.stringify(trainings));
      localStorage.setItem('staffsync_db_announcements', JSON.stringify(announcements));
    } catch (_e) {
      // Ignore storage errors
    }
  }, [employees, leaves, attendance, trainings, announcements]);

  // Filters & Search
  const [empSearch, setEmpSearch] = useState('');
  const [empDeptFilter, setEmpDeptFilter] = useState('All');
  const [leaveFilter, setLeaveFilter] = useState('All');
  const [annCategoryFilter, setAnnCategoryFilter] = useState('All');

  // Modals & Forms State
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [newEmployeeForm, setNewEmployeeForm] = useState({
    name: '',
    email: '',
    role: 'employee',
    department: 'Engineering',
    designation: '',
    location: 'Bengaluru, India',
    phone: '+91 ',
    salary: 105000,
    skills: ''
  });

  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    leaveType: 'Annual Leave',
    startDate: '2026-11-10',
    endDate: '2026-11-12',
    reason: ''
  });
  const [reviewCommentMap, setReviewCommentMap] = useState({});

  const [showTrainingModal, setShowTrainingModal] = useState(false);
  const [trainingForm, setTrainingForm] = useState({
    title: '',
    category: 'Technical Engineering',
    department: 'Engineering',
    durationHours: 8,
    dueDate: '2026-12-01',
    description: ''
  });

  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    category: 'Company News',
    priority: 'Normal',
    targetDepartment: 'All Departments',
    content: '',
    pinned: false
  });

  // Employee Clock-In/Out & Personal Profile Form
  const [selectedWorkMode, setSelectedWorkMode] = useState('Office');
  const [attendanceNote, setAttendanceNote] = useState('');
  const [profileForm, setProfileForm] = useState(null);

  // Determine current logged-in user object from activeRole
  const currentUser = useMemo(() => {
    if (activeRole === 'hr') return employees.find((e) => e.id === 'emp-101') || employees[0];
    if (activeRole === 'manager') return employees.find((e) => e.id === 'emp-102') || employees[1];
    return employees.find((e) => e.id === 'emp-103') || employees[2];
  }, [activeRole, employees]);

  // Sync profileForm when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setProfileForm({
        phone: currentUser.phone,
        location: currentUser.location,
        skills: (currentUser.skills || []).join(', '),
        emergencyName: currentUser.emergencyContact?.name || '',
        emergencyRelation: currentUser.emergencyContact?.relation || '',
        emergencyPhone: currentUser.emergencyContact?.phone || ''
      });
    }
  }, [currentUser]);

  const triggerToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 3800);
    return () => clearTimeout(timer);
  }, [toast]);

  const recordApiCall = (method, endpoint, status, summary) => {
    const now = new Date();
    const timestamp = now.toTimeString().split(' ')[0];
    setApiLogs((prev) => [
      {
        id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        method,
        endpoint,
        status,
        role: activeRole,
        summary,
        timestamp
      },
      ...prev.slice(0, 19)
    ]);
  };

  // Role switch handler
  const handleRoleSwitch = (newRole) => {
    setActiveRole(newRole);
    recordApiCall('POST', `/api/auth/switch-role (${newRole.toUpperCase()})`, 200, `Switched RBAC session context to ${newRole.toUpperCase()}`);
    triggerToast(`Switched active session to ${newRole === 'hr' ? 'Priya Sharma (HR Director)' : newRole === 'manager' ? 'Vikram Patel (Engineering Manager)' : 'Aarav Mehta (Senior Engineer)'}`);
  };

  // ---------------------------------------------------------------------------
  // Handlers: Employee Management (HR + Self Profile)
  // ---------------------------------------------------------------------------

  const handleSaveEmployee = (e) => {
    e.preventDefault();
    if (!newEmployeeForm.name.trim() || !newEmployeeForm.email.trim() || !newEmployeeForm.designation.trim()) {
      triggerToast('Please fill in name, email, and designation.', 'error');
      return;
    }

    const skillsArray = newEmployeeForm.skills
      ? newEmployeeForm.skills.split(',').map((s) => s.trim()).filter(Boolean)
      : ['Core Operations'];

    if (editingEmployee) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === editingEmployee.id
            ? {
                ...emp,
                name: newEmployeeForm.name,
                email: newEmployeeForm.email,
                role: newEmployeeForm.role,
                roleLabel: newEmployeeForm.role === 'hr' ? 'HR Personnel' : newEmployeeForm.role === 'manager' ? 'Manager' : 'Employee',
                department: newEmployeeForm.department,
                designation: newEmployeeForm.designation,
                location: newEmployeeForm.location,
                phone: newEmployeeForm.phone,
                salary: Number(newEmployeeForm.salary) || 100000,
                skills: skillsArray
              }
            : emp
        )
      );
      recordApiCall('PUT', `/api/employees/${editingEmployee.employeeId}`, 200, `Updated employee record for ${newEmployeeForm.name}`);
      triggerToast(`Updated ${newEmployeeForm.name}'s employee record.`);
    } else {
      const nextNum = 101 + employees.length;
      const initials = newEmployeeForm.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
      const newEmp = {
        id: `emp-${nextNum}`,
        employeeId: `EMP-${nextNum}`,
        name: newEmployeeForm.name,
        email: newEmployeeForm.email,
        role: newEmployeeForm.role,
        roleLabel: newEmployeeForm.role === 'hr' ? 'HR Personnel' : newEmployeeForm.role === 'manager' ? 'Manager' : 'Employee',
        department: newEmployeeForm.department,
        designation: newEmployeeForm.designation,
        location: newEmployeeForm.location,
        phone: newEmployeeForm.phone,
        joinDate: '2026-10-29',
        status: 'Active',
        salary: Number(newEmployeeForm.salary) || 100000,
        manager: 'Vikram Patel',
        skills: skillsArray,
        emergencyContact: { name: 'On File', relation: 'Family', phone: '+91 98000 00000' },
        leaveBalance: { annual: 18, sick: 10, casual: 7 },
        avatarBg: 'from-indigo-600 to-blue-600',
        initials
      };
      setEmployees((prev) => [newEmp, ...prev]);
      recordApiCall('POST', '/api/employees', 201, `Created employee document ${newEmp.employeeId} (${newEmp.name})`);
      triggerToast(`Added ${newEmp.name} (${newEmp.employeeId}) to StaffSync directory.`);
    }

    setShowAddEmployeeModal(false);
    setEditingEmployee(null);
    setNewEmployeeForm({
      name: '',
      email: '',
      role: 'employee',
      department: 'Engineering',
      designation: '',
      location: 'Bengaluru, India',
      phone: '+91 ',
      salary: 105000,
      skills: ''
    });
  };

  const openEditEmployee = (emp) => {
    setEditingEmployee(emp);
    setNewEmployeeForm({
      name: emp.name,
      email: emp.email,
      role: emp.role,
      department: emp.department,
      designation: emp.designation,
      location: emp.location,
      phone: emp.phone,
      salary: emp.salary,
      skills: (emp.skills || []).join(', ')
    });
    setShowAddEmployeeModal(true);
  };

  const handleToggleEmployeeStatus = (emp) => {
    const nextStatus = emp.status === 'Active' ? 'On Leave' : 'Active';
    setEmployees((prev) => prev.map((e) => (e.id === emp.id ? { ...e, status: nextStatus } : e)));
    recordApiCall('PATCH', `/api/employees/${emp.employeeId}/status`, 200, `Set status to ${nextStatus}`);
    triggerToast(`${emp.name}'s status changed to ${nextStatus}.`);
  };

  const handleUpdateSelfProfile = (e) => {
    e.preventDefault();
    if (!profileForm) return;
    const updatedSkills = profileForm.skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === currentUser.id
          ? {
              ...emp,
              phone: profileForm.phone,
              location: profileForm.location,
              skills: updatedSkills,
              emergencyContact: {
                name: profileForm.emergencyName,
                relation: profileForm.emergencyRelation,
                phone: profileForm.emergencyPhone
              }
            }
          : emp
      )
    );
    recordApiCall('PUT', `/api/employees/${currentUser.employeeId}/profile`, 200, `Employee self-service record updated`);
    triggerToast('Personal and emergency records saved to MongoDB.');
  };

  // ---------------------------------------------------------------------------
  // Handlers: Leave Management (Employee Apply + Manager/HR Approve/Reject)
  // ---------------------------------------------------------------------------

  const handleApplyLeave = (e) => {
    e.preventDefault();
    if (!leaveForm.reason.trim()) {
      triggerToast('Please provide a reason for your leave request.', 'error');
      return;
    }
    const start = new Date(leaveForm.startDate);
    const end = new Date(leaveForm.endDate);
    const diffDays = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1);

    const newLeave = {
      id: `lv-${Date.now()}`,
      employeeId: currentUser.id,
      employeeName: currentUser.name,
      department: currentUser.department,
      leaveType: leaveForm.leaveType,
      startDate: leaveForm.startDate,
      endDate: leaveForm.endDate,
      days: diffDays,
      reason: leaveForm.reason,
      status: 'Pending',
      appliedOn: '2026-10-29',
      reviewedBy: '',
      reviewComment: ''
    };

    setLeaves((prev) => [newLeave, ...prev]);
    setShowLeaveModal(false);
    setLeaveForm({ leaveType: 'Annual Leave', startDate: '2026-11-10', endDate: '2026-11-12', reason: '' });
    recordApiCall('POST', '/api/leaves', 201, `Created ${diffDays}-day ${newLeave.leaveType} request for ${currentUser.name}`);
    triggerToast(`Submitted ${diffDays}-day ${newLeave.leaveType} request for approval.`);
  };

  const handleLeaveDecision = (leaveId, decision) => {
    if (activeRole === 'employee') {
      triggerToast('Only Managers or HR Personnel can approve or reject leaves.', 'error');
      return;
    }
    const comment = reviewCommentMap[leaveId] || (decision === 'Approved' ? 'Approved after checking team coverage.' : 'Unable to approve due to critical sprint release window.');
    const reviewerTitle = `${currentUser.name} (${activeRole.toUpperCase()})`;

    setLeaves((prev) =>
      prev.map((lv) =>
        lv.id === leaveId
          ? {
              ...lv,
              status: decision,
              reviewedBy: reviewerTitle,
              reviewComment: comment
            }
          : lv
      )
    );
    recordApiCall('PATCH', `/api/leaves/${leaveId}/status`, 200, `${decision} leave request by ${reviewerTitle}`);
    triggerToast(`Leave request marked as ${decision}.`);
  };

  // ---------------------------------------------------------------------------
  // Handlers: Attendance Tracking (Clock-In / Clock-Out / HR Log)
  // ---------------------------------------------------------------------------

  const currentTodayAttendance = useMemo(() => {
    return attendance.find((a) => a.employeeId === currentUser.id && a.date === '2026-10-29');
  }, [attendance, currentUser]);

  const handleClockInOrOut = () => {
    if (!currentTodayAttendance) {
      const newRecord = {
        id: `att-${Date.now()}`,
        employeeId: currentUser.id,
        employeeName: currentUser.name,
        department: currentUser.department,
        date: '2026-10-29',
        clockIn: '09:00 AM',
        clockOut: null,
        workMode: selectedWorkMode,
        status: 'Present',
        totalHours: 0,
        notes: attendanceNote || 'Active shift in progress'
      };
      setAttendance((prev) => [newRecord, ...prev]);
      recordApiCall('POST', '/api/attendance/clock-in', 201, `${currentUser.name} clocked in (${selectedWorkMode})`);
      triggerToast(`Clocked in for today (${selectedWorkMode} mode).`);
    } else if (!currentTodayAttendance.clockOut || currentTodayAttendance.clockOut === '-') {
      setAttendance((prev) =>
        prev.map((a) =>
          a.id === currentTodayAttendance.id
            ? {
                ...a,
                clockOut: '06:05 PM',
                totalHours: 8.8,
                notes: attendanceNote || a.notes
              }
            : a
        )
      );
      recordApiCall('PATCH', `/api/attendance/${currentTodayAttendance.id}/clock-out`, 200, `${currentUser.name} clocked out (8.8 hrs logged)`);
      triggerToast('Clocked out for today! Total work hours logged: 8.8 hrs.');
    } else {
      // Allow re-opening shift for interactive demo
      setAttendance((prev) =>
        prev.map((a) =>
          a.id === currentTodayAttendance.id
            ? {
                ...a,
                clockOut: null,
                workMode: selectedWorkMode,
                notes: attendanceNote || a.notes
              }
            : a
        )
      );
      recordApiCall('PATCH', `/api/attendance/${currentTodayAttendance.id}/resume`, 200, `Resumed shift for ${currentUser.name}`);
      triggerToast('Shift resumed for live tracking.');
    }
  };

  // ---------------------------------------------------------------------------
  // Handlers: Training & Development (Manager Create + Employee Progress)
  // ---------------------------------------------------------------------------

  const handleCreateTraining = (e) => {
    e.preventDefault();
    if (!trainingForm.title.trim() || !trainingForm.description.trim()) {
      triggerToast('Please provide a program title and description.', 'error');
      return;
    }
    const newProgram = {
      id: `trn-${Date.now()}`,
      title: trainingForm.title,
      category: trainingForm.category,
      department: trainingForm.department,
      instructor: currentUser.name,
      durationHours: Number(trainingForm.durationHours) || 6,
      dueDate: trainingForm.dueDate,
      status: 'Active',
      description: trainingForm.description,
      enrolled: [
        { employeeId: 'emp-103', employeeName: 'Aarav Mehta', progress: 0, completed: false },
        { employeeId: 'emp-104', employeeName: 'Ananya Nair', progress: 0, completed: false }
      ]
    };
    setTrainings((prev) => [newProgram, ...prev]);
    setShowTrainingModal(false);
    setTrainingForm({
      title: '',
      category: 'Technical Engineering',
      department: 'Engineering',
      durationHours: 8,
      dueDate: '2026-12-01',
      description: ''
    });
    recordApiCall('POST', '/api/trainings', 201, `Created training module "${newProgram.title}"`);
    triggerToast(`Launched training program: ${newProgram.title}`);
  };

  const handleAdvanceTraining = (trainingId) => {
    setTrainings((prev) =>
      prev.map((t) => {
        if (t.id !== trainingId) return t;
        const exists = t.enrolled.find((en) => en.employeeId === currentUser.id);
        let updatedEnrolled;
        if (exists) {
          const nextProg = Math.min(100, exists.progress + 25);
          updatedEnrolled = t.enrolled.map((en) =>
            en.employeeId === currentUser.id
              ? { ...en, progress: nextProg, completed: nextProg === 100 }
              : en
          );
        } else {
          updatedEnrolled = [
            ...t.enrolled,
            { employeeId: currentUser.id, employeeName: currentUser.name, progress: 25, completed: false }
          ];
        }
        return { ...t, enrolled: updatedEnrolled };
      })
    );
    recordApiCall('PATCH', `/api/trainings/${trainingId}/progress`, 200, `Updated training completion progress for ${currentUser.name}`);
    triggerToast('Training progress updated (+25%)!');
  };

  // ---------------------------------------------------------------------------
  // Handlers: Announcements (HR Create / Pin / Delete + Employee Acknowledge)
  // ---------------------------------------------------------------------------

  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    if (!announcementForm.title.trim() || !announcementForm.content.trim()) {
      triggerToast('Please enter both announcement title and content.', 'error');
      return;
    }
    const newAnn = {
      id: `ann-${Date.now()}`,
      title: announcementForm.title,
      category: announcementForm.category,
      priority: announcementForm.priority,
      targetDepartment: announcementForm.targetDepartment,
      content: announcementForm.content,
      authorName: currentUser.name,
      authorRole: currentUser.designation,
      date: '2026-10-29',
      pinned: announcementForm.pinned,
      acknowledgedBy: [currentUser.id]
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
    setShowAnnouncementModal(false);
    setAnnouncementForm({
      title: '',
      category: 'Company News',
      priority: 'Normal',
      targetDepartment: 'All Departments',
      content: '',
      pinned: false
    });
    recordApiCall('POST', '/api/announcements', 201, `Published announcement "${newAnn.title}"`);
    triggerToast('Company announcement published to all staff.');
  };

  const handleTogglePinAnnouncement = (annId) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === annId ? { ...a, pinned: !a.pinned } : a))
    );
    recordApiCall('PATCH', `/api/announcements/${annId}/pin`, 200, `Toggled announcement pin status`);
    triggerToast('Updated announcement pin state.');
  };

  const handleDeleteAnnouncement = (annId) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== annId));
    recordApiCall('DELETE', `/api/announcements/${annId}`, 200, `Deleted announcement document ${annId}`);
    triggerToast('Announcement removed.');
  };

  const handleAcknowledgeAnnouncement = (annId) => {
    setAnnouncements((prev) =>
      prev.map((a) => {
        if (a.id !== annId) return a;
        const already = a.acknowledgedBy.includes(currentUser.id);
        return {
          ...a,
          acknowledgedBy: already ? a.acknowledgedBy : [...a.acknowledgedBy, currentUser.id]
        };
      })
    );
    recordApiCall('POST', `/api/announcements/${annId}/acknowledge`, 200, `${currentUser.name} acknowledged announcement`);
    triggerToast('Announcement marked as read & acknowledged.');
  };

  // ---------------------------------------------------------------------------
  // Embedded Express.js + Mongoose Request Dispatcher (Live REST Backend)
  // ---------------------------------------------------------------------------

  const handleSelectEndpointPreset = (presetMethod, presetUrl, sampleBody = '') => {
    setApiMethod(presetMethod);
    setApiEndpoint(presetUrl);
    if (sampleBody) {
      setApiRequestBody(sampleBody);
    }
  };

  const executeBackendRequest = (e) => {
    if (e) e.preventDefault();
    const startTime = Date.now();
    const cleanPath = apiEndpoint.trim();
    let parsedBody = {};

    if (['POST', 'PUT', 'PATCH'].includes(apiMethod) && apiRequestBody.trim()) {
      try {
        parsedBody = JSON.parse(apiRequestBody);
      } catch (err) {
        setApiResponse({
          status: 400,
          statusText: '400 Bad Request',
          latencyMs: 3,
          headers: { 'content-type': 'application/json' },
          body: { success: false, error: 'SyntaxError: Invalid JSON payload in request body', details: err.message }
        });
        recordApiCall(apiMethod, cleanPath, 400, 'Malformed JSON request body rejected by express.json()');
        triggerToast('400 Bad Request: Invalid JSON in request body', 'error');
        return;
      }
    }

    const finishResponse = (status, statusText, collectionName, payload, logSummary) => {
      const latencyMs = Math.max(8, Date.now() - startTime + 11);
      setApiResponse({
        status,
        statusText,
        latencyMs,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'x-powered-by': 'Express 4.19.2',
          'x-rbac-role': activeRole,
          'x-mongodb-collection': collectionName
        },
        body: payload
      });
      recordApiCall(apiMethod, cleanPath, status, logSummary);
      if (status >= 400) {
        triggerToast(`${statusText}: ${payload.message || 'Request rejected'}`, 'error');
      } else {
        triggerToast(`${apiMethod} ${cleanPath} → ${statusText}`);
      }
    };

    // Route 1: GET /api/health
    if (apiMethod === 'GET' && cleanPath === '/api/health') {
      return finishResponse(
        200,
        '200 OK',
        'system.health',
        {
          status: 'ok',
          service: 'StaffSync MERN HR Backend',
          database: 'MongoDB Connected (5 Collections Active)',
          activeSessionUser: currentUser.name,
          activeRole,
          counts: {
            users: employees.length,
            leaves: leaves.length,
            attendances: attendance.length,
            trainings: trainings.length,
            announcements: announcements.length
          }
        },
        'Health check & MongoDB collection stats returned'
      );
    }

    // Route 2: GET /api/auth/me
    if (apiMethod === 'GET' && cleanPath === '/api/auth/me') {
      return finishResponse(
        200,
        '200 OK',
        'users',
        {
          success: true,
          jwtVerified: true,
          tokenPreview: SIMULATED_JWT_TOKENS[activeRole].slice(0, 36) + '...',
          user: currentUser
        },
        `Verified JWT session for ${currentUser.name} (${activeRole})`
      );
    }

    // Route 3: GET /api/analytics/summary
    if (apiMethod === 'GET' && cleanPath.startsWith('/api/analytics')) {
      return finishResponse(
        200,
        '200 OK',
        'aggregations',
        {
          success: true,
          totalEmployees: employees.length,
          activeEmployees: employees.filter((x) => x.status === 'Active').length,
          pendingLeaves: leaves.filter((x) => x.status === 'Pending').length,
          approvedLeaves: leaves.filter((x) => x.status === 'Approved').length,
          presentToday: attendance.filter((x) => x.status === 'Present' || x.status === 'Late').length,
          activeTrainings: trainings.length,
          totalPayrollMonthly: employees.reduce((acc, cur) => acc + (Number(cur.salary) || 0), 0)
        },
        'Executed MongoDB $group aggregation pipeline for HR analytics'
      );
    }

    // Route 4: GET /api/employees
    if (apiMethod === 'GET' && cleanPath.startsWith('/api/employees')) {
      return finishResponse(
        200,
        '200 OK',
        'users',
        { success: true, count: employees.length, data: employees },
        `Retrieved ${employees.length} employee documents`
      );
    }

    // Route 5: POST /api/employees (RBAC: HR Only)
    if (apiMethod === 'POST' && cleanPath === '/api/employees') {
      if (activeRole !== 'hr') {
        return finishResponse(
          403,
          '403 Forbidden',
          'users',
          {
            success: false,
            middleware: 'authorize("hr")',
            message: `Role '${activeRole}' is not authorized to create employee records. Switch to HR Admin.`
          },
          `403 Forbidden: ${activeRole} blocked from POST /api/employees`
        );
      }
      const nextNum = 101 + employees.length;
      const empName = parsedBody.name || 'New Staff Member';
      const initials = empName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
      const created = {
        id: `emp-${nextNum}`,
        employeeId: `EMP-${nextNum}`,
        name: empName,
        email: parsedBody.email || `emp${nextNum}@staffsync.io`,
        role: parsedBody.role || 'employee',
        roleLabel:
          parsedBody.role === 'hr' ? 'HR Personnel' : parsedBody.role === 'manager' ? 'Manager' : 'Employee',
        department: parsedBody.department || 'Engineering',
        designation: parsedBody.designation || 'Software Engineer',
        location: parsedBody.location || 'Bengaluru, India',
        phone: parsedBody.phone || '+91 98450 00000',
        joinDate: '2026-10-29',
        status: 'Active',
        salary: Number(parsedBody.salary) || 110000,
        manager: 'Vikram Patel',
        skills: Array.isArray(parsedBody.skills) ? parsedBody.skills : ['Node.js', 'React.js', 'MongoDB'],
        emergencyContact: { name: 'On File', relation: 'Family', phone: '+91 98000 00000' },
        leaveBalance: { annual: 18, sick: 10, casual: 7 },
        avatarBg: 'from-indigo-600 to-violet-600',
        initials
      };
      setEmployees((prev) => [created, ...prev]);
      return finishResponse(
        201,
        '201 Created',
        'users',
        { success: true, message: 'Employee document inserted into MongoDB users collection', data: created },
        `Created employee ${created.employeeId} (${created.name}) via REST API`
      );
    }

    // Route 6: GET /api/leaves
    if (apiMethod === 'GET' && cleanPath.startsWith('/api/leaves')) {
      const data = activeRole === 'employee' ? leaves.filter((l) => l.employeeId === currentUser.id) : leaves;
      return finishResponse(
        200,
        '200 OK',
        'leaves',
        { success: true, roleScope: activeRole, count: data.length, data },
        `Fetched ${data.length} leave documents`
      );
    }

    // Route 7: POST /api/leaves
    if (apiMethod === 'POST' && cleanPath === '/api/leaves') {
      const createdLeave = {
        id: `lv-${Date.now().toString().slice(-4)}`,
        employeeId: currentUser.id,
        employeeName: currentUser.name,
        department: currentUser.department,
        leaveType: parsedBody.leaveType || 'Annual Leave',
        startDate: parsedBody.startDate || '2026-11-12',
        endDate: parsedBody.endDate || '2026-11-14',
        days: Number(parsedBody.days) || 3,
        reason: parsedBody.reason || 'Submitted via Express REST API',
        status: 'Pending',
        appliedOn: '2026-10-29',
        reviewedBy: '',
        reviewComment: ''
      };
      setLeaves((prev) => [createdLeave, ...prev]);
      return finishResponse(
        201,
        '201 Created',
        'leaves',
        { success: true, data: createdLeave },
        `Created leave application ${createdLeave.id} for ${currentUser.name}`
      );
    }

    // Route 8: PATCH /api/leaves/:id/status (RBAC: HR or Manager)
    if (apiMethod === 'PATCH' && cleanPath.includes('/api/leaves/')) {
      if (activeRole === 'employee') {
        return finishResponse(
          403,
          '403 Forbidden',
          'leaves',
          {
            success: false,
            middleware: 'authorize("hr", "manager")',
            message: 'Employees cannot approve or reject leave applications.'
          },
          '403 Forbidden: employee blocked from approving leave'
        );
      }
      const targetId = cleanPath.split('/')[3] || leaves[0]?.id;
      const nextStatus = parsedBody.status || 'Approved';
      const comment = parsedBody.reviewComment || 'Approved via REST API endpoint';
      let updatedDoc = null;
      setLeaves((prev) =>
        prev.map((lv) => {
          if (lv.id === targetId) {
            updatedDoc = {
              ...lv,
              status: nextStatus,
              reviewedBy: `${currentUser.name} (${activeRole.toUpperCase()})`,
              reviewComment: comment
            };
            return updatedDoc;
          }
          return lv;
        })
      );
      return finishResponse(
        200,
        '200 OK',
        'leaves',
        { success: true, targetLeaveId: targetId, updatedStatus: nextStatus, data: updatedDoc || { id: targetId, status: nextStatus } },
        `Updated leave ${targetId} status to ${nextStatus}`
      );
    }

    // Route 9: GET / POST /api/attendance
    if (cleanPath.startsWith('/api/attendance')) {
      if (apiMethod === 'GET') {
        return finishResponse(
          200,
          '200 OK',
          'attendances',
          { success: true, count: attendance.length, data: attendance },
          `Retrieved ${attendance.length} attendance logs`
        );
      }
      if (apiMethod === 'POST') {
        const newAtt = {
          id: `att-${Date.now().toString().slice(-4)}`,
          employeeId: currentUser.id,
          employeeName: currentUser.name,
          department: currentUser.department,
          date: '2026-10-29',
          clockIn: parsedBody.clockIn || '09:10 AM',
          clockOut: parsedBody.clockOut || null,
          workMode: parsedBody.workMode || 'Office',
          status: 'Present',
          totalHours: Number(parsedBody.totalHours) || 8.0,
          notes: parsedBody.notes || 'Logged via POST /api/attendance/clock-in'
        };
        setAttendance((prev) => [newAtt, ...prev]);
        return finishResponse(
          201,
          '201 Created',
          'attendances',
          { success: true, data: newAtt },
          `Logged attendance check-in for ${currentUser.name}`
        );
      }
    }

    // Route 10: GET / POST /api/trainings
    if (cleanPath.startsWith('/api/trainings')) {
      if (apiMethod === 'GET') {
        return finishResponse(
          200,
          '200 OK',
          'trainings',
          { success: true, count: trainings.length, data: trainings },
          `Retrieved ${trainings.length} training programs`
        );
      }
      if (apiMethod === 'POST') {
        if (activeRole === 'employee') {
          return finishResponse(
            403,
            '403 Forbidden',
            'trainings',
            {
              success: false,
              middleware: 'authorize("manager", "hr")',
              message: 'Only Managers and HR can create training programs.'
            },
            '403 Forbidden: employee blocked from creating training program'
          );
        }
        const newTrn = {
          id: `trn-${Date.now().toString().slice(-4)}`,
          title: parsedBody.title || 'Microservices & MongoDB Indexing Workshop',
          category: parsedBody.category || 'Technical Engineering',
          department: parsedBody.department || 'Engineering',
          instructor: currentUser.name,
          durationHours: Number(parsedBody.durationHours) || 6,
          dueDate: parsedBody.dueDate || '2026-12-05',
          status: 'Active',
          description: parsedBody.description || 'Hands-on backend performance workshop.',
          enrolled: [{ employeeId: 'emp-103', employeeName: 'Aarav Mehta', progress: 0, completed: false }]
        };
        setTrainings((prev) => [newTrn, ...prev]);
        return finishResponse(
          201,
          '201 Created',
          'trainings',
          { success: true, data: newTrn },
          `Created training program "${newTrn.title}"`
        );
      }
    }

    // Route 11: GET / POST /api/announcements
    if (cleanPath.startsWith('/api/announcements')) {
      if (apiMethod === 'GET') {
        return finishResponse(
          200,
          '200 OK',
          'announcements',
          { success: true, count: announcements.length, data: announcements },
          `Retrieved ${announcements.length} announcements`
        );
      }
      if (apiMethod === 'POST') {
        if (activeRole !== 'hr') {
          return finishResponse(
            403,
            '403 Forbidden',
            'announcements',
            {
              success: false,
              middleware: 'authorize("hr")',
              message: `Role '${activeRole}' cannot post organization-wide announcements. Switch to HR Admin.`
            },
            `403 Forbidden: ${activeRole} blocked from POST /api/announcements`
          );
        }
        const newAnn = {
          id: `ann-${Date.now().toString().slice(-4)}`,
          title: parsedBody.title || 'New Backend Infrastructure Upgrade Completed',
          category: parsedBody.category || 'Company News',
          priority: parsedBody.priority || 'High',
          targetDepartment: parsedBody.targetDepartment || 'All Departments',
          content: parsedBody.content || 'All StaffSync REST APIs are now running on Node 20 LTS with MongoDB replica sets.',
          authorName: currentUser.name,
          authorRole: currentUser.designation,
          date: '2026-10-29',
          pinned: Boolean(parsedBody.pinned),
          acknowledgedBy: [currentUser.id]
        };
        setAnnouncements((prev) => [newAnn, ...prev]);
        return finishResponse(
          201,
          '201 Created',
          'announcements',
          { success: true, data: newAnn },
          `Published announcement "${newAnn.title}" via REST API`
        );
      }
    }

    return finishResponse(
      404,
      '404 Not Found',
      'none',
      {
        success: false,
        message: `Cannot ${apiMethod} ${cleanPath} — Route not registered on Express server`
      },
      `404 Not Found: ${apiMethod} ${cleanPath}`
    );
  };

  const handleResetDatabase = () => {
    setEmployees(INITIAL_EMPLOYEES);
    setLeaves(INITIAL_LEAVES);
    setAttendance(INITIAL_ATTENDANCE);
    setTrainings(INITIAL_TRAININGS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    try {
      localStorage.removeItem('staffsync_db_users');
      localStorage.removeItem('staffsync_db_leaves');
      localStorage.removeItem('staffsync_db_attendance');
      localStorage.removeItem('staffsync_db_trainings');
      localStorage.removeItem('staffsync_db_announcements');
    } catch (_e) {
      // Ignore storage errors
    }
    recordApiCall('POST', '/api/admin/seed', 200, 'Re-seeded all 5 MongoDB collections to initial state');
    triggerToast('MongoDB database re-seeded to initial default documents.');
  };

  const handleCopyCode = (text, label) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      triggerToast(`Copied ${label} to clipboard!`);
    } catch (_e) {
      triggerToast(`Copied ${label}!`);
    }
  };

  const activeMongoDocs = useMemo(() => {
    const map = {
      users: employees,
      leaves,
      attendances: attendance,
      trainings,
      announcements
    };
    const list = map[selectedMongoCollection] || [];
    if (!mongoFilterQuery.trim()) return list;
    const q = mongoFilterQuery.toLowerCase();
    return list.filter((doc) => JSON.stringify(doc).toLowerCase().includes(q));
  }, [selectedMongoCollection, employees, leaves, attendance, trainings, announcements, mongoFilterQuery]);

  // ---------------------------------------------------------------------------
  // Filtered Collections & Computed Metrics
  // ---------------------------------------------------------------------------

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesDept = empDeptFilter === 'All' || emp.department === empDeptFilter;
      const q = empSearch.toLowerCase();
      const matchesQuery =
        !q ||
        emp.name.toLowerCase().includes(q) ||
        emp.employeeId.toLowerCase().includes(q) ||
        emp.designation.toLowerCase().includes(q) ||
        emp.department.toLowerCase().includes(q);
      return matchesDept && matchesQuery;
    });
  }, [employees, empDeptFilter, empSearch]);

  const visibleLeaves = useMemo(() => {
    return leaves.filter((lv) => {
      const roleMatch = activeRole === 'employee' ? lv.employeeId === currentUser.id : true;
      const statusMatch = leaveFilter === 'All' || lv.status === leaveFilter;
      return roleMatch && statusMatch;
    });
  }, [leaves, activeRole, currentUser, leaveFilter]);

  const filteredAnnouncements = useMemo(() => {
    return announcements
      .filter((a) => annCategoryFilter === 'All' || a.category === annCategoryFilter)
      .sort((a, b) => Number(b.pinned) - Number(a.pinned));
  }, [announcements, annCategoryFilter]);

  const pendingLeavesCount = useMemo(() => leaves.filter((l) => l.status === 'Pending').length, [leaves]);
  const presentTodayCount = useMemo(
    () => attendance.filter((a) => a.status === 'Present' || a.status === 'Late').length,
    [attendance]
  );

  // Navigation items tailored with role badges
  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'employees', label: activeRole === 'employee' ? 'My Profile & Team' : 'Employees', icon: Users },
    { id: 'leaves', label: 'Leave Portal', icon: Calendar, badge: pendingLeavesCount > 0 ? pendingLeavesCount : null },
    { id: 'attendance', label: 'Attendance', icon: Clock },
    { id: 'training', label: 'Training & Dev', icon: GraduationCap },
    { id: 'announcements', label: 'Announcements', icon: Megaphone, badge: announcements.length },
    { id: 'mern', label: 'MERN Stack API', icon: Database }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border bg-slate-900 text-white border-slate-700 max-w-md animate-fade-in">
          {toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          )}
          <span className="text-sm font-medium">{toast.message}</span>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="ml-auto text-slate-400 hover:text-white"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Header & Role Access Switcher */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200 px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-sm">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-slate-900">StaffSync</h1>
                <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  MERN HRMS
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Centralized Workforce, Leave, Attendance & Learning Platform
              </p>
            </div>
          </div>

          {/* Interactive Role Switcher */}
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
            <span className="text-xs font-medium text-slate-500 px-2 hidden md:inline">
              Active Role:
            </span>
            <button
              type="button"
              onClick={() => handleRoleSwitch('hr')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeRole === 'hr'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              HR Admin
            </button>
            <button
              type="button"
              onClick={() => handleRoleSwitch('manager')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeRole === 'manager'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCog className="w-3.5 h-3.5" />
              Manager
            </button>
            <button
              type="button"
              onClick={() => handleRoleSwitch('employee')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeRole === 'employee'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              Employee
            </button>
          </div>

          {/* Active User Badge */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-semibold text-slate-900">{currentUser.name}</div>
              <div className="text-[11px] text-slate-500">
                {currentUser.designation} • <span className="font-medium text-indigo-600 uppercase">{activeRole}</span>
              </div>
            </div>
            <div
              className={`w-9 h-9 rounded-full bg-gradient-to-br ${currentUser.avatarBg} text-white flex items-center justify-center text-xs font-bold shadow-sm`}
            >
              {currentUser.initials}
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="max-w-7xl mx-auto mt-3 pt-2 border-t border-slate-100 flex items-center gap-1 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
                {item.badge !== null && item.badge !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-indigo-500 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 space-y-6">
        {/* Role Permissions Context Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-500/30 border border-indigo-400/40 text-indigo-200">
                {activeRole === 'hr'
                  ? 'HR Personnel Access Level'
                  : activeRole === 'manager'
                  ? 'Manager Access Level'
                  : 'Employee Self-Service Portal'}
              </span>
              <span className="text-xs text-slate-300">• Connected to StaffSync MongoDB Cluster</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold">
              Welcome back, {currentUser.name} ({currentUser.employeeId})
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl">
              {activeRole === 'hr' &&
                'You have full administrative privileges to manage employee records, approve or reject leave requests, audit daily attendance, and publish company-wide announcements.'}
              {activeRole === 'manager' &&
                'You can oversee and approve team leave requests, launch and track employee training & development programs, and monitor engineering team attendance.'}
              {activeRole === 'employee' &&
                'You can clock in/out for daily attendance, apply for leaves, update your personal and emergency records, complete assigned training programs, and read company news.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {activeRole === 'hr' && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setEditingEmployee(null);
                    setShowAddEmployeeModal(true);
                  }}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-semibold transition shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Employee
                </button>
                <button
                  type="button"
                  onClick={() => setShowAnnouncementModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition border border-white/15"
                >
                  <Megaphone className="w-4 h-4" />
                  Post News
                </button>
              </>
            )}
            {activeRole === 'manager' && (
              <>
                <button
                  type="button"
                  onClick={() => setShowTrainingModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-xs font-semibold transition shadow-sm"
                >
                  <GraduationCap className="w-4 h-4" />
                  New Training Program
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('leaves')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition border border-white/15"
                >
                  <Calendar className="w-4 h-4" />
                  Review Leaves ({pendingLeavesCount})
                </button>
              </>
            )}
            {activeRole === 'employee' && (
              <>
                <button
                  type="button"
                  onClick={() => setShowLeaveModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold transition shadow-sm"
                >
                  <Calendar className="w-4 h-4" />
                  Apply for Leave
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('attendance')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition border border-white/15"
                >
                  <Clock className="w-4 h-4" />
                  Clock In / Out
                </button>
              </>
            )}
          </div>
        </div>

        {/* ===================================================================
            TAB 1: DASHBOARD OVERVIEW
           =================================================================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* KPI Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
                <div>
                  <span className="text-xs font-medium text-slate-500">Total Workforce</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">{employees.length}</div>
                  <span className="text-xs text-emerald-600 font-medium mt-1 inline-block">
                    {employees.filter((e) => e.status === 'Active').length} Active • 4 Departments
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
                <div>
                  <span className="text-xs font-medium text-slate-500">Today&apos;s Attendance</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">
                    {presentTodayCount} / {employees.length}
                  </div>
                  <span className="text-xs text-blue-600 font-medium mt-1 inline-block">
                    {Math.round((presentTodayCount / employees.length) * 100)}% Attendance Rate
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
                  <Clock className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
                <div>
                  <span className="text-xs font-medium text-slate-500">Leave Requests</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">{pendingLeavesCount} Pending</div>
                  <span className="text-xs text-amber-600 font-medium mt-1 inline-block">
                    {leaves.filter((l) => l.status === 'Approved').length} Approved this month
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
                  <Calendar className="w-5 h-5" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start justify-between">
                <div>
                  <span className="text-xs font-medium text-slate-500">Training Programs</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">{trainings.length} Active</div>
                  <span className="text-xs text-purple-600 font-medium mt-1 inline-block">
                    78% Avg. Team Completion
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-purple-50 text-purple-600">
                  <GraduationCap className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Middle Row: Quick Role Action Center + Department & Attendance Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2 Columns: Pending Leaves & Quick Approval Queue */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {activeRole === 'employee' ? 'My Recent Leave Requests' : 'Leave Approval Queue (HR & Manager)'}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {activeRole === 'employee'
                        ? 'Track status of your submitted leave applications'
                        : 'Review and act on pending employee leave applications'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('leaves')}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    View All <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {visibleLeaves.slice(0, 3).map((lv) => (
                    <div key={lv.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-900">{lv.employeeName}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                            {lv.leaveType}
                          </span>
                          <span
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                              lv.status === 'Approved'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : lv.status === 'Rejected'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-amber-50 text-amber-700 border border-amber-200'
                            }`}
                          >
                            {lv.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">
                          <strong>{lv.startDate}</strong> to <strong>{lv.endDate}</strong> ({lv.days} day{lv.days > 1 ? 's' : ''}) — {lv.reason}
                        </p>
                      </div>

                      {lv.status === 'Pending' && activeRole !== 'employee' ? (
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleLeaveDecision(lv.id, 'Approved')}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition"
                          >
                            <Check className="w-3.5 h-3.5" /> Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => handleLeaveDecision(lv.id, 'Rejected')}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold transition"
                          >
                            <X className="w-3.5 h-3.5" /> Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 shrink-0">
                          {lv.reviewedBy ? `Reviewed by ${lv.reviewedBy}` : 'Awaiting Review'}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Workforce & Attendance Distribution */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Workforce Distribution</h3>
                  <p className="text-xs text-slate-500">Headcount & work mode metrics across departments</p>
                </div>

                <div className="space-y-3">
                  {[
                    { dept: 'Engineering', count: employees.filter((e) => e.department === 'Engineering').length, color: 'bg-indigo-600' },
                    { dept: 'People & Culture', count: employees.filter((e) => e.department === 'People & Culture').length, color: 'bg-violet-600' },
                    { dept: 'Product Design', count: employees.filter((e) => e.department === 'Product Design').length, color: 'bg-rose-500' },
                    { dept: 'Customer Success', count: employees.filter((e) => e.department === 'Customer Success').length, color: 'bg-amber-500' }
                  ].map((item) => {
                    const pct = Math.round((item.count / Math.max(1, employees.length)) * 100);
                    return (
                      <div key={item.dept} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-slate-700">{item.dept}</span>
                          <span className="text-slate-900 font-semibold">
                            {item.count} staff ({pct}%)
                          </span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${item.color} rounded-full`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <div className="text-xs font-semibold text-slate-700 mb-2">Today&apos;s Work Mode Split</div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-base font-bold text-slate-900">
                        {attendance.filter((a) => a.workMode === 'Office' && a.status !== 'On Leave').length}
                      </div>
                      <div className="text-[11px] text-slate-500">In Office</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-base font-bold text-slate-900">
                        {attendance.filter((a) => a.workMode === 'Hybrid' && a.status !== 'On Leave').length}
                      </div>
                      <div className="text-[11px] text-slate-500">Hybrid</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="text-base font-bold text-slate-900">
                        {attendance.filter((a) => a.workMode === 'Remote' && a.status !== 'On Leave').length}
                      </div>
                      <div className="text-[11px] text-slate-500">Remote</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: Latest Announcements & Active Training Highlights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Latest Announcements */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Company Announcements</h3>
                    <p className="text-xs text-slate-500">Latest HR policy updates and organization news</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('announcements')}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    Read All <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {announcements.slice(0, 2).map((ann) => (
                    <div
                      key={ann.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700">
                          {ann.category}
                        </span>
                        <span className="text-[11px] text-slate-400">{ann.date}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{ann.title}</h4>
                      <p className="text-xs text-slate-600 line-clamp-2">{ann.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Training & Development */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Training & Development</h3>
                    <p className="text-xs text-slate-500">Manager-assigned skill programs and completion status</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('training')}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    Explore Programs <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-3">
                  {trainings.slice(0, 2).map((trn) => {
                    const avgProgress =
                      trn.enrolled.length > 0
                        ? Math.round(trn.enrolled.reduce((acc, c) => acc + c.progress, 0) / trn.enrolled.length)
                        : 0;
                    return (
                      <div
                        key={trn.id}
                        className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                            {trn.category}
                          </span>
                          <span className="text-xs font-medium text-slate-500">Due {trn.dueDate}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">{trn.title}</h4>
                        <div className="flex items-center justify-between text-xs text-slate-600">
                          <span>Lead: {trn.instructor}</span>
                          <span className="font-semibold text-slate-900">{avgProgress}% Team Completion</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full" style={{ width: `${avgProgress}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 2: EMPLOYEES & PERSONAL RECORDS
           =================================================================== */}
        {activeTab === 'employees' && (
          <div className="space-y-6">
            {/* Employee Self-Service Record Card (Always accessible, highlighted for Employee role) */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${currentUser.avatarBg} text-white flex items-center justify-center text-base font-bold shadow-sm`}
                  >
                    {currentUser.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900">
                        My Personal Record — {currentUser.name}
                      </h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                        {currentUser.employeeId}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {currentUser.designation} • {currentUser.department} • Joined {currentUser.joinDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                    Annual Leave: {currentUser.leaveBalance?.annual ?? 14}d
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                    Sick Leave: {currentUser.leaveBalance?.sick ?? 8}d
                  </div>
                </div>
              </div>

              {profileForm && (
                <form onSubmit={handleUpdateSelfProfile} className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Work Location</label>
                    <input
                      type="text"
                      value={profileForm.location}
                      onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Skills (Comma separated)</label>
                    <input
                      type="text"
                      value={profileForm.skills}
                      onChange={(e) => setProfileForm({ ...profileForm, skills: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Emergency Contact Name</label>
                    <input
                      type="text"
                      value={profileForm.emergencyName}
                      onChange={(e) => setProfileForm({ ...profileForm, emergencyName: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Relationship</label>
                    <input
                      type="text"
                      value={profileForm.emergencyRelation}
                      onChange={(e) => setProfileForm({ ...profileForm, emergencyRelation: e.target.value })}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Emergency Phone</label>
                      <input
                        type="text"
                        value={profileForm.emergencyPhone}
                        onChange={(e) => setProfileForm({ ...profileForm, emergencyPhone: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition shrink-0"
                    >
                      Save My Record
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Organization Directory & HR Controls */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Organization Employee Directory</h3>
                  <p className="text-xs text-slate-500">
                    {activeRole === 'hr'
                      ? 'HR Mode: Add new employees, edit designations/compensation, or toggle employment status.'
                      : 'Browse colleagues across departments and teams.'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search name, ID, role..."
                      value={empSearch}
                      onChange={(e) => setEmpSearch(e.target.value)}
                      className="pl-8 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <select
                    value={empDeptFilter}
                    onChange={(e) => setEmpDeptFilter(e.target.value)}
                    className="px-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="All">All Departments</option>
                    <option value="Engineering">Engineering</option>
                    <option value="People & Culture">People & Culture</option>
                    <option value="Product Design">Product Design</option>
                    <option value="Customer Success">Customer Success</option>
                  </select>

                  {activeRole === 'hr' && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingEmployee(null);
                        setShowAddEmployeeModal(true);
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add Employee
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEmployees.map((emp) => (
                  <div
                    key={emp.id}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-200 transition bg-slate-50/40 flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${emp.avatarBg} text-white flex items-center justify-center text-xs font-bold shrink-0`}
                          >
                            {emp.initials}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-900">{emp.name}</h4>
                            <p className="text-xs text-slate-500">{emp.designation}</p>
                          </div>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            emp.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {emp.status}
                        </span>
                      </div>

                      <div className="text-xs text-slate-600 space-y-1 pt-1">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>
                            {emp.department} • <strong>{emp.employeeId}</strong>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span className="truncate">{emp.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{emp.location}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {(emp.skills || []).slice(0, 4).map((skill) => (
                          <span
                            key={skill}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600">
                        Role: {emp.roleLabel}
                      </span>

                      {activeRole === 'hr' && (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEditEmployee(emp)}
                            className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-medium flex items-center gap-1"
                          >
                            <Edit3 className="w-3 h-3" /> Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleEmployeeStatus(emp)}
                            className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-medium"
                          >
                            Toggle Status
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 3: LEAVE MANAGEMENT PORTAL
           =================================================================== */}
        {activeTab === 'leaves' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Leave Management & Approval Workflow</h3>
                  <p className="text-xs text-slate-500">
                    {activeRole === 'employee'
                      ? 'Submit leave applications and view real-time approval feedback from your manager or HR.'
                      : 'HR & Manager Mode: Review employee leave applications, add feedback notes, and approve or reject requests.'}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {['All', 'Pending', 'Approved', 'Rejected'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setLeaveFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                        leaveFilter === st
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setShowLeaveModal(true)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
                  >
                    <Plus className="w-3.5 h-3.5" /> Apply for Leave
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {visibleLeaves.map((lv) => (
                  <div
                    key={lv.id}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/40 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">{lv.employeeName}</span>
                        <span className="text-xs text-slate-500">({lv.department})</span>
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {lv.leaveType}
                        </span>
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                            lv.status === 'Approved'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : lv.status === 'Rejected'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {lv.status}
                        </span>
                      </div>

                      <div className="text-xs text-slate-700">
                        Duration: <strong>{lv.startDate}</strong> to <strong>{lv.endDate}</strong> ({lv.days} day
                        {lv.days > 1 ? 's' : ''}) • Applied on {lv.appliedOn}
                      </div>
                      <p className="text-xs text-slate-600">Reason: &ldquo;{lv.reason}&rdquo;</p>
                      {lv.reviewedBy && (
                        <p className="text-xs text-slate-500 italic">
                          Reviewed by <strong>{lv.reviewedBy}</strong>: {lv.reviewComment}
                        </p>
                      )}
                    </div>

                    {activeRole !== 'employee' && lv.status === 'Pending' && (
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
                        <input
                          type="text"
                          placeholder="Add reviewer note..."
                          value={reviewCommentMap[lv.id] || ''}
                          onChange={(e) =>
                            setReviewCommentMap({ ...reviewCommentMap, [lv.id]: e.target.value })
                          }
                          className="px-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleLeaveDecision(lv.id, 'Approved')}
                          className="flex items-center justify-center gap-1 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition"
                        >
                          <Check className="w-3.5 h-3.5" /> Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => handleLeaveDecision(lv.id, 'Rejected')}
                          className="flex items-center justify-center gap-1 px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition"
                        >
                          <X className="w-3.5 h-3.5" /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 4: ATTENDANCE TRACKER
           =================================================================== */}
        {activeTab === 'attendance' && (
          <div className="space-y-6">
            {/* Interactive Daily Clock-In / Clock-Out Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Daily Attendance Terminal — Oct 29, 2026
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {currentTodayAttendance
                    ? currentTodayAttendance.clockOut && currentTodayAttendance.clockOut !== '-'
                      ? `Shift Completed (${currentTodayAttendance.totalHours} hrs logged)`
                      : `Clocked In at ${currentTodayAttendance.clockIn} (${currentTodayAttendance.workMode})`
                    : 'You have not clocked in yet today'}
                </h3>
                <p className="text-xs text-slate-500">
                  Select your work mode and log your daily focus note before clocking in or out.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <select
                  value={selectedWorkMode}
                  onChange={(e) => setSelectedWorkMode(e.target.value)}
                  className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-slate-50"
                >
                  <option value="Office">Office</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>

                <input
                  type="text"
                  placeholder="Daily task / sprint focus note..."
                  value={attendanceNote}
                  onChange={(e) => setAttendanceNote(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-slate-300 w-56 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                  type="button"
                  onClick={handleClockInOrOut}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-sm transition ${
                    currentTodayAttendance && !currentTodayAttendance.clockOut
                      ? 'bg-rose-600 hover:bg-rose-500'
                      : 'bg-emerald-600 hover:bg-emerald-500'
                  }`}
                >
                  {currentTodayAttendance && !currentTodayAttendance.clockOut ? (
                    <>
                      <Square className="w-3.5 h-3.5" /> Clock Out Now
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" /> Clock In / Resume Shift
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Attendance Log Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Organization Attendance Log</h3>
                  <p className="text-xs text-slate-500">
                    Real-time check-in timestamps, work modes, and daily hours across departments
                  </p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                  Date: 2026-10-29
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                      <th className="py-3 px-4">Employee</th>
                      <th className="py-3 px-4">Department</th>
                      <th className="py-3 px-4">Work Mode</th>
                      <th className="py-3 px-4">Clock In</th>
                      <th className="py-3 px-4">Clock Out</th>
                      <th className="py-3 px-4">Hours</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Work Log Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {attendance.map((rec) => (
                      <tr key={rec.id} className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 font-semibold text-slate-900">{rec.employeeName}</td>
                        <td className="py-3 px-4 text-slate-600">{rec.department}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                            {rec.workMode}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-700">{rec.clockIn}</td>
                        <td className="py-3 px-4 font-mono text-slate-700">
                          {rec.clockOut || <span className="text-emerald-600 font-sans font-semibold">Active Shift</span>}
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-900">{rec.totalHours}h</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                              rec.status === 'Present'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : rec.status === 'Late'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {rec.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600 max-w-xs truncate">{rec.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 5: TRAINING & DEVELOPMENT PROGRAMS
           =================================================================== */}
        {activeTab === 'training' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Training & Skill Development Programs
                  </h3>
                  <p className="text-xs text-slate-500">
                    Managers oversee team learning curriculums; employees track and complete assigned modules.
                  </p>
                </div>

                {(activeRole === 'manager' || activeRole === 'hr') && (
                  <button
                    type="button"
                    onClick={() => setShowTrainingModal(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition"
                  >
                    <Plus className="w-4 h-4" /> Create Training Program
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {trainings.map((trn) => {
                  const myEnrolled = trn.enrolled.find((en) => en.employeeId === currentUser.id);
                  return (
                    <div
                      key={trn.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50/40 flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                            {trn.category}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">
                            {trn.durationHours} hrs • Due {trn.dueDate}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-slate-900">{trn.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{trn.description}</p>
                        <div className="text-xs text-slate-500">
                          Instructor: <strong className="text-slate-800">{trn.instructor}</strong> • Target:{' '}
                          <strong className="text-slate-800">{trn.department}</strong>
                        </div>
                      </div>

                      {/* Enrolled Participants Progress */}
                      <div className="space-y-2 pt-3 border-t border-slate-200/80">
                        <div className="text-xs font-semibold text-slate-700">
                          Enrolled Team Members ({trn.enrolled.length})
                        </div>
                        <div className="space-y-2">
                          {trn.enrolled.map((en) => (
                            <div key={en.employeeId} className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-slate-700 font-medium">{en.employeeName}</span>
                                <span className="font-semibold text-slate-900">
                                  {en.progress}% {en.completed ? '✓ Certified' : ''}
                                </span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    en.completed ? 'bg-emerald-600' : 'bg-blue-600'
                                  }`}
                                  style={{ width: `${en.progress}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 flex items-center justify-between">
                          <span className="text-xs text-slate-500">
                            My Progress: <strong>{myEnrolled ? `${myEnrolled.progress}%` : 'Not Started'}</strong>
                          </span>
                          <button
                            type="button"
                            onClick={() => handleAdvanceTraining(trn.id)}
                            disabled={myEnrolled?.completed}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                              myEnrolled?.completed
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                                : 'bg-slate-900 hover:bg-slate-800 text-white'
                            }`}
                          >
                            {myEnrolled?.completed
                              ? 'Completed & Certified'
                              : myEnrolled
                              ? 'Complete Next Module (+25%)'
                              : 'Enroll & Start (+25%)'}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 6: COMPANY ANNOUNCEMENTS & NEWS
           =================================================================== */}
        {activeTab === 'announcements' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Company Announcements & HR News Feed
                  </h3>
                  <p className="text-xs text-slate-500">
                    Stay informed with official policy updates, events, and executive broadcasts.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {['All', 'Policy Update', 'Company News', 'Event', 'Urgent'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setAnnCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                        annCategoryFilter === cat
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}

                  {activeRole === 'hr' && (
                    <button
                      type="button"
                      onClick={() => setShowAnnouncementModal(true)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
                    >
                      <Plus className="w-3.5 h-3.5" /> Post Announcement
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {filteredAnnouncements.map((ann) => {
                  const isAck = ann.acknowledgedBy.includes(currentUser.id);
                  return (
                    <div
                      key={ann.id}
                      className={`p-5 rounded-2xl border transition space-y-3 ${
                        ann.pinned
                          ? 'border-indigo-200 bg-indigo-50/30'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {ann.pinned && (
                            <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-600 text-white">
                              <Pin className="w-3 h-3" /> Pinned
                            </span>
                          )}
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800">
                            {ann.category}
                          </span>
                          <span
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                              ann.priority === 'Critical'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : ann.priority === 'High'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {ann.priority} Priority
                          </span>
                          <span className="text-xs text-slate-500">• {ann.targetDepartment}</span>
                        </div>

                        <span className="text-xs text-slate-400">{ann.date}</span>
                      </div>

                      <h4 className="text-base font-bold text-slate-900">{ann.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{ann.content}</p>

                      <div className="pt-3 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-3">
                        <div className="text-xs text-slate-500">
                          Posted by <strong className="text-slate-800">{ann.authorName}</strong> ({ann.authorRole}) •{' '}
                          <span>{ann.acknowledgedBy.length} staff acknowledged</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleAcknowledgeAnnouncement(ann.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 ${
                              isAck
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-900 text-white hover:bg-slate-800'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {isAck ? 'Acknowledged' : 'Acknowledge Read'}
                          </button>

                          {activeRole === 'hr' && (
                            <>
                              <button
                                type="button"
                                onClick={() => handleTogglePinAnnouncement(ann.id)}
                                className="px-2.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-medium text-slate-700"
                              >
                                {ann.pinned ? 'Unpin' : 'Pin'}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteAnnouncement(ann.id)}
                                className="p-1.5 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-600"
                                aria-label="Delete announcement"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 7: MERN BACKEND STUDIO, API PLAYGROUND & MONGODB EXPLORER
           =================================================================== */}
        {activeTab === 'mern' && (
          <div className="space-y-6">
            {/* Backend Server Status Bar & Sub-Navigation */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-slate-900 text-emerald-400 flex items-center justify-center shrink-0 shadow-sm">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">
                      Node.js + Express.js + MongoDB Backend Engine
                    </h3>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Express Server Online (Port 5000)
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Execute live REST requests with JWT + RBAC middleware, inspect MongoDB collections, or copy the Node.js backend code.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'playground', label: 'REST API Playground' },
                  { id: 'mongodb', label: 'MongoDB Collections' },
                  { id: 'source', label: 'Node/Express Code' }
                ].map((sub) => (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setBackendSubTab(sub.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
                      backendSubTab === sub.id
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleResetDatabase}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-xs font-semibold text-slate-700"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Re-seed DB
                </button>
              </div>
            </div>

            {/* SUB-TAB 1: INTERACTIVE REST API PLAYGROUND */}
            {backendSubTab === 'playground' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Request Composer */}
                <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Express REST Endpoint Tester</h4>
                      <p className="text-xs text-slate-500">
                        Test live endpoints with your current <strong className="uppercase text-indigo-600">{activeRole}</strong> JWT Bearer token
                      </p>
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                      middleware: protect + authorize()
                    </span>
                  </div>

                  {/* Quick Preset Endpoint Chips */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      Quick Endpoint Presets:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleSelectEndpointPreset('GET', '/api/health')}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-100 hover:bg-slate-200 text-slate-700"
                      >
                        GET /api/health
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectEndpointPreset('GET', '/api/auth/me')}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-100 hover:bg-slate-200 text-slate-700"
                      >
                        GET /api/auth/me
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelectEndpointPreset('GET', '/api/analytics/summary')}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-slate-100 hover:bg-slate-200 text-slate-700"
                      >
                        GET /api/analytics/summary
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleSelectEndpointPreset(
                            'POST',
                            '/api/employees',
                            '{\n  "name": "Devika Iyer",\n  "email": "devika.iyer@staffsync.io",\n  "role": "employee",\n  "department": "Engineering",\n  "designation": "Backend Node.js Engineer",\n  "location": "Bengaluru, India",\n  "salary": 122000\n}'
                          )
                        }
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200"
                      >
                        POST /api/employees (HR)
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleSelectEndpointPreset(
                            'POST',
                            '/api/leaves',
                            '{\n  "leaveType": "Casual Leave",\n  "startDate": "2026-11-18",\n  "endDate": "2026-11-19",\n  "days": 2,\n  "reason": "Personal family event"\n}'
                          )
                        }
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200"
                      >
                        POST /api/leaves
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleSelectEndpointPreset(
                            'PATCH',
                            `/api/leaves/${leaves[0]?.id || 'lv-201'}/status`,
                            '{\n  "status": "Approved",\n  "reviewComment": "Approved via Express PATCH endpoint"\n}'
                          )
                        }
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200"
                      >
                        PATCH /api/leaves/:id/status
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleSelectEndpointPreset(
                            'POST',
                            '/api/announcements',
                            '{\n  "title": "MongoDB Atlas Cluster Upgraded to M30",\n  "category": "Company News",\n  "priority": "High",\n  "targetDepartment": "All Departments",\n  "content": "Zero-downtime migration completed successfully.",\n  "pinned": true\n}'
                          )
                        }
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200"
                      >
                        POST /api/announcements (HR)
                      </button>
                    </div>
                  </div>

                  <form onSubmit={executeBackendRequest} className="space-y-3">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <select
                        value={apiMethod}
                        onChange={(e) => setApiMethod(e.target.value)}
                        className="px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 font-mono text-xs font-bold text-slate-900"
                      >
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PATCH">PATCH</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                      </select>

                      <input
                        type="text"
                        value={apiEndpoint}
                        onChange={(e) => setApiEndpoint(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="/api/employees"
                      />

                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-sm transition shrink-0"
                      >
                        Send Request
                      </button>
                    </div>

                    {/* Authorization Header Preview */}
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-600 flex items-center justify-between gap-2">
                      <div className="truncate">
                        <span className="font-bold text-slate-800">Authorization:</span> Bearer{' '}
                        {SIMULATED_JWT_TOKENS[activeRole]}
                      </div>
                      <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-sans font-semibold text-[10px] shrink-0">
                        Role: {activeRole.toUpperCase()}
                      </span>
                    </div>

                    {/* JSON Request Body Editor */}
                    {['POST', 'PUT', 'PATCH'].includes(apiMethod) && (
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Request Body (application/json)
                        </label>
                        <textarea
                          rows={6}
                          value={apiRequestBody}
                          onChange={(e) => setApiRequestBody(e.target.value)}
                          className="w-full p-3 rounded-xl border border-slate-300 font-mono text-xs bg-slate-900 text-emerald-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    )}
                  </form>
                </div>

                {/* Live HTTP Response Inspector */}
                <div className="lg:col-span-5 bg-slate-900 text-slate-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-xs font-bold text-white">Express HTTP Response</span>
                      <div className="text-[11px] text-slate-400">
                        Collection: <code className="text-indigo-400">{apiResponse.headers['x-mongodb-collection']}</code> •{' '}
                        {apiResponse.latencyMs} ms
                      </div>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${
                        apiResponse.status >= 400
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      }`}
                    >
                      {apiResponse.statusText}
                    </span>
                  </div>

                  <pre className="text-[11px] font-mono text-slate-200 overflow-x-auto max-h-80 leading-relaxed bg-slate-950/70 p-3.5 rounded-xl border border-slate-800">
                    {JSON.stringify(apiResponse.body, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* SUB-TAB 2: MONGODB COLLECTIONS DOCUMENT BROWSER */}
            {backendSubTab === 'mongodb' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    {[
                      { id: 'users', label: `db.users (${employees.length})` },
                      { id: 'leaves', label: `db.leaves (${leaves.length})` },
                      { id: 'attendances', label: `db.attendances (${attendance.length})` },
                      { id: 'trainings', label: `db.trainings (${trainings.length})` },
                      { id: 'announcements', label: `db.announcements (${announcements.length})` }
                    ].map((col) => (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() => setSelectedMongoCollection(col.id)}
                        className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold transition ${
                          selectedMongoCollection === col.id
                            ? 'bg-slate-900 text-emerald-400'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {col.label}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    value={mongoFilterQuery}
                    onChange={(e) => setMongoFilterQuery(e.target.value)}
                    placeholder="Filter BSON documents..."
                    className="px-3 py-1.5 text-xs rounded-xl border border-slate-300"
                  />
                </div>

                <div className="bg-slate-900 rounded-2xl p-4 text-slate-100 font-mono text-xs overflow-x-auto max-h-96">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[11px] text-slate-400">
                    <span>
                      staffsync.{selectedMongoCollection}.find() — Showing {activeMongoDocs.length} document(s)
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyCode(JSON.stringify(activeMongoDocs, null, 2), `${selectedMongoCollection} JSON`)
                      }
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
                    >
                      Copy JSON
                    </button>
                  </div>
                  <pre className="text-[11px] leading-relaxed text-emerald-300">
                    {JSON.stringify(activeMongoDocs, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* SUB-TAB 3: NODE.JS + EXPRESS + MONGOOSE SOURCE CODE VIEWER */}
            {backendSubTab === 'source' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {Object.keys(BACKEND_SOURCE_FILES).map((fileKey) => (
                      <button
                        key={fileKey}
                        type="button"
                        onClick={() => setSelectedBackendFile(fileKey)}
                        className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold transition ${
                          selectedBackendFile === fileKey
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {fileKey}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleCopyCode(BACKEND_SOURCE_FILES[selectedBackendFile], selectedBackendFile)
                    }
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold"
                  >
                    Copy File Code
                  </button>
                </div>

                <pre className="bg-slate-950 text-slate-100 p-4 rounded-2xl font-mono text-xs overflow-x-auto max-h-96 leading-relaxed">
                  {BACKEND_SOURCE_FILES[selectedBackendFile]}
                </pre>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Mongoose Schemas & Express Route Map */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="flex items-center gap-2.5">
                  <Server className="w-5 h-5 text-indigo-600" />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      MERN Stack Backend Architecture & REST Endpoints
                    </h3>
                    <p className="text-xs text-slate-500">
                      Express.js + Mongoose RBAC routes packaged in <code className="font-mono">staffsync-mern.zip</code>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-bold text-indigo-700 flex items-center gap-1.5">
                      <Code2 className="w-4 h-4" /> Auth & Employee Routes
                    </div>
                    <div className="font-mono text-[11px] text-slate-700 space-y-1">
                      <div>POST /api/auth/login (JWT Auth)</div>
                      <div>GET  /api/employees (Protected)</div>
                      <div>POST /api/employees (Role: HR)</div>
                      <div>PUT  /api/employees/:id (HR / Self)</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-bold text-emerald-700 flex items-center gap-1.5">
                      <Code2 className="w-4 h-4" /> Leave & Attendance Routes
                    </div>
                    <div className="font-mono text-[11px] text-slate-700 space-y-1">
                      <div>POST  /api/leaves (Apply Leave)</div>
                      <div>PATCH /api/leaves/:id/status (HR/Mgr)</div>
                      <div>POST  /api/attendance/clock-in</div>
                      <div>PATCH /api/attendance/:id/clock-out</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-bold text-blue-700 flex items-center gap-1.5">
                      <Code2 className="w-4 h-4" /> Training & Announcements
                    </div>
                    <div className="font-mono text-[11px] text-slate-700 space-y-1">
                      <div>GET   /api/trainings</div>
                      <div>POST  /api/trainings (Role: Manager/HR)</div>
                      <div>PATCH /api/trainings/:id/progress</div>
                      <div>POST  /api/announcements (Role: HR)</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-bold text-violet-700 flex items-center gap-1.5">
                      <Database className="w-4 h-4" /> MongoDB Mongoose Models
                    </div>
                    <div className="font-mono text-[11px] text-slate-700 space-y-1">
                      <div>User (RBAC: hr | manager | employee)</div>
                      <div>Leave (Start/End, Reviewer, Status)</div>
                      <div>Attendance (Date Index, WorkMode)</div>
                      <div>Training & Announcement Schemas</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Live API Activity Stream */}
              <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Live Express API Transaction Log
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">{apiLogs.length} events</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Every UI action dispatches a REST call logged below:
                  </p>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto pr-1 font-mono text-[11px]">
                  {apiLogs.map((log) => (
                    <div key={log.id} className="p-2.5 rounded-lg bg-slate-800/90 border border-slate-700 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-indigo-400">
                          {log.method} {log.endpoint}
                        </span>
                        <span className="text-emerald-400">{log.status} OK</span>
                      </div>
                      <div className="text-slate-300 font-sans text-xs">{log.summary}</div>
                      <div className="text-slate-500 text-[10px]">
                        Role: {log.role.toUpperCase()} • {log.timestamp}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =====================================================================
          MODAL 1: ADD / EDIT EMPLOYEE (HR ONLY)
         ===================================================================== */}
      {showAddEmployeeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                {editingEmployee ? `Edit Employee — ${editingEmployee.name}` : 'Onboard New Employee (HR)'}
              </h3>
              <button
                type="button"
                onClick={() => setShowAddEmployeeModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEmployee} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={newEmployeeForm.name}
                    onChange={(e) => setNewEmployeeForm({ ...newEmployeeForm, name: e.target.value })}
                    placeholder="e.g. Siddharth Rao"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={newEmployeeForm.email}
                    onChange={(e) => setNewEmployeeForm({ ...newEmployeeForm, email: e.target.value })}
                    placeholder="siddharth@staffsync.io"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">System Role *</label>
                  <select
                    value={newEmployeeForm.role}
                    onChange={(e) => setNewEmployeeForm({ ...newEmployeeForm, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="employee">Employee</option>
                    <option value="manager">Manager</option>
                    <option value="hr">HR Personnel</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department *</label>
                  <select
                    value={newEmployeeForm.department}
                    onChange={(e) => setNewEmployeeForm({ ...newEmployeeForm, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="People & Culture">People & Culture</option>
                    <option value="Product Design">Product Design</option>
                    <option value="Customer Success">Customer Success</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Designation / Job Title *</label>
                  <input
                    type="text"
                    required
                    value={newEmployeeForm.designation}
                    onChange={(e) => setNewEmployeeForm({ ...newEmployeeForm, designation: e.target.value })}
                    placeholder="e.g. Backend Engineer"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={newEmployeeForm.location}
                    onChange={(e) => setNewEmployeeForm({ ...newEmployeeForm, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Skills (Comma separated)</label>
                <input
                  type="text"
                  value={newEmployeeForm.skills}
                  onChange={(e) => setNewEmployeeForm({ ...newEmployeeForm, skills: e.target.value })}
                  placeholder="React, Node.js, MongoDB, AWS"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddEmployeeModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
                >
                  {editingEmployee ? 'Save Changes' : 'Create Employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: APPLY FOR LEAVE
         ===================================================================== */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Submit Leave Request</h3>
              <button
                type="button"
                onClick={() => setShowLeaveModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplyLeave} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Leave Type</label>
                <select
                  value={leaveForm.leaveType}
                  onChange={(e) => setLeaveForm({ ...leaveForm, leaveType: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                >
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Parental Leave">Parental Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={leaveForm.startDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={leaveForm.endDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Reason / Handover Notes *</label>
                <textarea
                  rows={3}
                  required
                  value={leaveForm.reason}
                  onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                  placeholder="Provide context and task coverage details for your manager..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLeaveModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 3: CREATE TRAINING PROGRAM (MANAGER / HR)
         ===================================================================== */}
      {showTrainingModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Launch Team Training Program</h3>
              <button
                type="button"
                onClick={() => setShowTrainingModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTraining} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Program Title *</label>
                <input
                  type="text"
                  required
                  value={trainingForm.title}
                  onChange={(e) => setTrainingForm({ ...trainingForm, title: e.target.value })}
                  placeholder="e.g. Cloud Native Kubernetes & Observability"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={trainingForm.category}
                    onChange={(e) => setTrainingForm({ ...trainingForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Technical Engineering">Technical Engineering</option>
                    <option value="Leadership & Management">Leadership & Management</option>
                    <option value="Product & Design">Product & Design</option>
                    <option value="Compliance & Security">Compliance & Security</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration (Hours)</label>
                  <input
                    type="number"
                    min={1}
                    value={trainingForm.durationHours}
                    onChange={(e) => setTrainingForm({ ...trainingForm, durationHours: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Target Completion Date</label>
                <input
                  type="date"
                  value={trainingForm.dueDate}
                  onChange={(e) => setTrainingForm({ ...trainingForm, dueDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Curriculum Objectives *</label>
                <textarea
                  rows={3}
                  required
                  value={trainingForm.description}
                  onChange={(e) => setTrainingForm({ ...trainingForm, description: e.target.value })}
                  placeholder="Describe key modules and certification goals..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTrainingModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold"
                >
                  Assign Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 4: POST COMPANY ANNOUNCEMENT (HR)
         ===================================================================== */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Publish Company Announcement</h3>
              <button
                type="button"
                onClick={() => setShowAnnouncementModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Headline *</label>
                <input
                  type="text"
                  required
                  value={announcementForm.title}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                  placeholder="e.g. Annual Performance Appraisal Window Open"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={announcementForm.category}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Company News">Company News</option>
                    <option value="Policy Update">Policy Update</option>
                    <option value="Event">Event</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={announcementForm.priority}
                    onChange={(e) => setAnnouncementForm({ ...announcementForm, priority: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Announcement Body *</label>
                <textarea
                  rows={4}
                  required
                  value={announcementForm.content}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                  placeholder="Write official announcement details..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={announcementForm.pinned}
                  onChange={(e) => setAnnouncementForm({ ...announcementForm, pinned: e.target.checked })}
                  className="rounded border-slate-300 text-indigo-600"
                />
                <span className="font-medium text-slate-700">Pin announcement to top of feed</span>
              </label>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAnnouncementModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
                >
                  Publish Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
