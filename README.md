# StaffSync — Modern Human Resource Management Solution (MERN Stack)

StaffSync is a comprehensive, role-based web application built with **MongoDB, Express.js, React.js, and Node.js (MERN)** that streamlines and automates core HR operations across an organization.

## Role-Based Capabilities

| Role | Key Capabilities |
| :--- | :--- |
| **HR Personnel (`hr`)** | Manage employee directory (CRUD), approve/reject organization-wide leave requests, monitor real-time attendance logs, and publish/pin company announcements & news. |
| **Manager (`manager`)** | Oversee direct-report leave requests, create & manage team training and development programs, assign employees to courses, and monitor team attendance & skill progression. |
| **Employee (`employee`)** | Clock in/out for daily attendance (Office/Remote/Hybrid), apply for leaves and track approval status, maintain personal & emergency records, complete assigned trainings, and read company announcements. |

## Project Structure

```
staffsync-mern/
├── server/
│   ├── package.json
│   ├── .env.example
│   ├── server.js
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Leave.js
│   │   ├── Attendance.js
│   │   ├── Training.js
│   │   └── Announcement.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── employeeRoutes.js
│   │   ├── leaveRoutes.js
│   │   ├── attendanceRoutes.js
│   │   ├── trainingRoutes.js
│   │   └── announcementRoutes.js
│   └── seed.js
└── client/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── api/
        │   └── client.js
        └── App.jsx
```

## Quick Start

### 1. Backend Setup (`server/`)
```bash
cd server
cp .env.example .env
npm install
npm run seed   # Populates initial HR, Manager, and Employee accounts & records
npm run dev    # Starts Express API on http://localhost:5000
```

### 2. Frontend Setup (`client/`)
```bash
cd client
npm install
npm run dev    # Starts React client on http://localhost:5173
```
