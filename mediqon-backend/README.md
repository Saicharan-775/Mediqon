# 🏥 Mediqon – Backend System

> A patient-centric healthcare coordination platform designed to streamline medical appointments, reduce waiting time, and improve doctor–patient workflow through secure digital systems.

This repository contains the **backend implementation** of Mediqon, built using **NestJS** and **PostgreSQL**, focusing on authentication, role-based access, and appointment management.

---

## 🎯 Project Objective

### Problems We Solve

Traditional healthcare systems suffer from:
- ⏱️ Long waiting times
- 📋 Poor appointment coordination
- 🚶 Repeated hospital visits
- 📄 Lack of structured digital records

### Our Solution

Mediqon backend provides:
- ✅ Patient preparation before consultation
- ✅ Digital appointment organization
- ✅ Efficient doctor queue management
- ✅ Secure role-based access control

---

## 👥 System Roles

| Role | Description |
|------|-------------|
| **Patient** | Books appointments, receives tokens, views consultation time |
| **Doctor** | Views queue, updates appointment status, manages patients |
| **Hospital** | Manages doctors & infrastructure *(future scope)* |

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | NestJS |
| **Language** | TypeScript |
| **Database** | PostgreSQL |
| **ORM** | TypeORM |
| **Authentication** | JWT |
| **Validation** | class-validator |
| **Architecture** | Modular (Domain-based) |

---

## 🏗️ Backend Architecture

```
backend/
├── src/
│   ├── modules/
│   │   ├── auth/              # Authentication & JWT
│   │   ├── appointment/       # Booking & queue management
│   │   ├── doctor/            # Doctor profiles & schedules
│   │   └── hospital/          # Hospital management
│   ├── common/
│   │   ├── guards/            # Authorization guards
│   │   └── decorators/        # Custom decorators (@Roles)
│   ├── config/                # Configuration files
│   └── main.ts                # Application entry point
├── .env.example               # Environment template
├── package.json
└── tsconfig.json
```

---

## 🔐 Authentication & Authorization

### Authentication
- 🔑 JWT-based login system
- 🔒 Secure password hashing (bcrypt)
- 🎫 Token-based session handling

### Authorization
- 👮 Role-based access control (RBAC)
- 🛡️ Centralized guards
- 🏷️ Custom `@Roles()` decorator
- ✔️ Clean separation of security and business logic

---

## 📅 Appointment Management Features

### 👤 Patient Features
- ✅ Book appointment
- ✅ Receive token number
- ✅ See expected consultation time

### 👨‍⚕️ Doctor Features
- ✅ View today's appointment queue
- ✅ Access prioritized & ordered token list
- ✅ Update appointment status:
  - `CHECKED_IN`
  - `COMPLETED`
  - `NO_SHOW`

### 🔄 Appointment Workflow

```
Patient Books Appointment
         ↓
    Token Assigned
         ↓
    Doctor Queue
         ↓
   Status Update
```

This reduces repeated visits and optimizes doctor time.

---

## 🔌 API Overview

### Authentication
```
POST /auth/login
```

### Patient
```
POST /appointments/book
```

### Doctor
```
GET  /appointments/doctor/:doctorId/today
PATCH /appointments/:id/status
```

### Protected Routes Require:
```
Authorization: Bearer <JWT_TOKEN>
```

---

## 🗄️ Database Tables

| Table | Purpose |
|-------|---------|
| **users** | User credentials, roles & profiles |
| **doctors** | Doctor information & schedules |
| **hospitals** | Hospital details & infrastructure |
| **appointments** | Appointment records & queue data |

---

## 🔐 Environment Setup

Create a `.env` file in the root directory:

```env
# Server
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=mediqon

# JWT Configuration
JWT_SECRET=your_secret_key
JWT_EXPIRATION=24h
```

**⚠️ Note:** `.env` file is ignored in Git for security reasons. Use `.env.example` as a template.

---

## ▶️ Getting Started

### Prerequisites
- Node.js (v16+)
- PostgreSQL (v12+)
- npm or yarn

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run start:dev

# Build for production
npm run build

# Start production server
npm start
```

**Server runs at:** `http://localhost:3000`

---

## 🚀 Current Status

✅ Authentication complete  
✅ Role-based access control (RBAC)  
✅ Appointment booking system  
✅ Doctor queue management  
✅ Production-ready backend foundation  

---

## 🔮 Future Scope

As this project expands from minor to **major project**, planned features include:

- 🤖 AI-assisted pre-consultation guidance
- 💪 Health monitoring & reminders
- 📋 Digital medical records
- 💝 Charity & donation transparency
- ⌚ Wearable device integration
- 📱 Mobile app integration
- 📊 Analytics & reporting dashboard

---

## 🎓 Academic Note

This backend is developed as part of an **academic minor project** with a clear roadmap for future expansion into a major project.

**Focus Areas:**
- 🏛️ Clean & scalable architecture
- 🔒 Enterprise-grade security
- 🏥 Real-world healthcare workflow implementation

---

## 👨‍💻 Author & Contributors

| Role | Name |
|------|------|
| **Backend Lead** | Saicharan |
| **Project** | Mediqon Team |

---

## 📄 License

This project is part of an academic initiative.

---

**Made with ❤️ for better healthcare coordination