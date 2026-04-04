# 🏥 Mediqon - The Future of Healthcare Management

[![React](https://img.shields.io/badge/React-19-blue.svg?style=for-the-badge&logo=react)](https://react.dev/)
[![NestJS](https://img.shields.io/badge/NestJS-11-red.svg?style=for-the-badge&logo=nestjs)](https://nestjs.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC.svg?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Immersive-FF69B4.svg?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Vapi.ai](https://img.shields.io/badge/AI-Voice_Concierge-6D28D9.svg?style=for-the-badge)](https://vapi.ai/)

**Mediqon** is a premium, high-fidelity healthcare ecosystem designed to redefine how patients interact with medical services. By blending cutting-edge **AI Voice Assistants**, immersive **3D Visuals**, and an elegant **Chronological Health Timeline**, Mediqon provides a state-of-the-art experience for modern medical management.

---

## 💎 The High-Fidelity Experience

### 🎙️ Human-Centric AI Concierge
Integrated with **Vapi AI**, Mediqon features a voice-activated intelligent agent. It doesn't just book appointments—it understands context, answers complex medical scheduling queries, and provides a hands-free bridge between patients and care providers.

### 🕒 Immersive Health Timeline
A masterfully crafted chronological overview of your entire medical journey. From blood test results and ECG scans to historical prescriptions and doctor consultations, every record is visualized with high-density data and smooth animations.

### 🍱 Elite Bento-Style Dashboard
Utilizing the latest **Tailwind CSS 4** and **Shadcn UI**, the dashboard offers a high-performance, glassmorphic interface. It provides instant access to upcoming appointments, detailed laboratory reports, and prescription protocols with zero friction.

### 🌐 3D Interactive Diagnostics
Leveraging **Three.js** and **React Three Fiber**, the platform incorporates immersive 3D elements that bring a tactile dimension to the digital healthcare space, making the interface feel alive and responsive.

---

## 🛠️ Engineering Excellence

### Frontend: The Modern Stack
- **React 19 (Vite)**: Leveraging the latest concurrent rendering features for unparalleled speed.
- **Tailwind CSS 4**: Utilizing the next generation of utility-first styling for deep customization and performance.
- **Framer Motion**: Powering fluid, physics-based transitions throughout the health timeline and modals.
- **Radix UI & Shadcn**: A foundation of accessible, high-quality components designed for premium aesthetics.

### Backend: Scalable Architecture
- **NestJS (TypeScript)**: A robust, modular backend built for high availability and clean architecture.
- **PostgreSQL & TypeORM**: Optimized data persistence with complex relationship mapping for doctors, clinics, and patient records.
- **Secure Authentication**: Enterprise-grade security protocol using JWT, Passport.js, and Bcrypt encryption.

---

## 🚀 Deployment & Setup

### Requirements
- **Runtime**: Node.js v18 or later.
- **Database**: PostgreSQL (v14+)
- **Tools**: npm or pnpm.

### Quick Start

1. **Clone the Hub**:
   ```bash
   git clone https://github.com/Saicharan-775/Mediqon.git
   cd Mediqon
   ```

2. **Backend Engine**:
   ```bash
   cd mediqon-backend
   npm install
   # Configure .env with your PostgreSQL credentials
   npm run start:dev
   ```

3. **Frontend Interface**:
   ```bash
   cd ../Mediqon-frontend
   npm install
   npm run dev
   ```

---

## 🔐 Environment Configuration

| Variable | Description |
| :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key for secure authentication |
| `VITE_VAPI_PUBLIC_KEY` | Your Vapi.ai public key for voice assistant |

---

## 🤝 Contribution & License

We welcome elite developers to contribute to the future of healthcare. Please submit a Pull Request for any architectural improvements.

Licensed under **UNLICENSED** (Private Repository) | Designed with ❤️ for Mediqon.
