🏥 Mediqon – Backend System

Mediqon is a patient-centric healthcare coordination platform designed to streamline medical appointments, reduce waiting time, and improve doctor–patient workflow through secure digital systems.

This repository contains the backend implementation of Mediqon, built using NestJS and PostgreSQL, focusing on authentication, role-based access, and appointment management.

🎯 Project Objective

Traditional healthcare systems suffer from:

Long waiting times

Poor appointment coordination

Repeated hospital visits

Lack of structured digital records
Mediqon backend solves this by:

Preparing patients before consultation

Organizing appointments digitally

Helping doctors manage queues efficiently

Enforcing secure role-based access

🧠 System Roles

The system supports three user roles:

Role	Description
Patient	Books appointments
Doctor	Views queue & updates appointment status
Hospital	Manages doctors & infrastructure (future scope)
⚙️ Tech Stack
Layer	Technology
Framework	NestJS
Language	TypeScript
Database	PostgreSQL
ORM	TypeORM
Authentication	JWT
Validation	class-validator
Architecture	Modular (Domain-based)
🏗️ Backend Architecture
backend/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   ├── appointment/
│   │   ├── doctor/
│   │   └── hospital/
│   ├── common/
│   │   ├── guards/
│   │   └── decorators/
│   ├── config/
│   └── main.ts
├── .env.example
├── package.json
└── tsconfig.json

🔐 Authentication & Authorization
Authentication

JWT-based login system

Secure password hashing

Token-based session handling

Authorization

Role-based access control (RBAC)

Centralized guards

Custom @Roles() decorator

✔ Clean separation of security and business logic

📅 Appointment Management Features
Patient

Book appointment

Receive token number

See expected consultation time

Doctor

View today’s appointment queue

Prioritized & ordered token list

Update appointment status:

CHECKED_IN

COMPLETED

NO_SHOW

🔄 Appointment Workflow
Patient → Book Appointment
        → Token Assigned
        → Doctor Queue
        → Status Update


This reduces repeated visits and optimizes doctor time.

🔌 API Overview (Key Endpoints)
Authentication
POST /auth/login

Patient
POST /appointments/book

Doctor
GET  /appointments/doctor/:doctorId/today
PATCH /appointments/:id/status


All protected routes require:

Authorization: Bearer <JWT_TOKEN>

🗄️ Database Tables
Table	Purpose
users	Stores user credentials & roles
doctors	Doctor profiles & schedules
hospitals	Hospital information
appointments	Appointment & queue data
🔐 Environment Setup

Create a .env file using the template:

.env.example

PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=mediqon

JWT_SECRET=your_secret_key


⚠️ .env file is ignored in Git for security.

▶️ How to Run the Backend
# Install dependencies
npm install

# Start development server
npm run start:dev


Server runs at:

http://localhost:3000

🚀 Current Status

✔ Authentication complete
✔ Role-based access control
✔ Appointment booking system
✔ Doctor queue management
✔ Production-ready backend foundation

🔮 Future Scope (Major Project)

AI-assisted pre-consultation guidance

Health monitoring & reminders

Digital medical records

Charity & donation transparency

Wearable device integration

🎓 Academic Note

This backend is developed as part of a minor academic project, with a clear roadmap for future expansion into a major project.

The focus is on:

Clean architecture

Security

Real-world healthcare workflow

👨‍💻 Author
Mediqon Project Team
Backend Lead: Saicharan
