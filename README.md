# 🏥 Mediqon - Premium Healthcare Booking Assistant

[![React](https://img.shields.io/badge/React-19-blue.svg?style=for-the-badge&logo=react)](https://react.dev/)
[![NestJS](https://img.shields.io/badge/NestJS-11-red.svg?style=for-the-badge&logo=nestjs)](https://nestjs.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC.svg?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-Interactive-black.svg?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Vapi.ai](https://img.shields.io/badge/AI-Voice_Assistant-6D28D9.svg?style=for-the-badge)](https://vapi.ai/)

**Mediqon** is a state-of-the-art healthcare management and booking platform designed to bridge the gap between patients and doctors through a seamless, AI-integrated experience. Featuring a premium dark-themed UI, voice-enabled assistant, and interactive 3D elements.

---

## ✨ Key Features

- 🎙️ **Vapi AI Integration**: A voice-activated AI assistant capable of handling bookings and answering medical queries in real-time.
- 📅 **Smart Appointment Scheduling**: Interactive date and time picker with real-time slot availability for doctors.
- 👤 **Comprehensive Dashboards**: Dedicated views for patients to track upcoming appointments, medical history, and notifications.
- 🏢 **Doctor Profiles**: Detailed cards for doctors featuring specialties, ratings, and instant booking options.
- 🎨 **Premium UI/UX**: Built with **Tailwind CSS 4** and **Framer Motion**, offering glassmorphism, smooth transitions, and high-fidelity animations.
- 🌐 **3D Visuals**: Leveraging **Three.js** to provide immersive interactive components within the dashboard.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) (Vite)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/), Radix UI, Headless UI
- **State/Data**: Axios, React Router, Date-fns
- **Interactive**: [Three.js](https://threejs.org/), React Three Fiber
- **Icons**: Lucide React, Heroicons, Tabler Icons

### Backend
- **Framework**: [NestJS](https://nestjs.com/) (Modular Architecture)
- **Language**: TypeScript
- **Database**: PostgreSQL with [TypeORM](https://typeorm.io/)
- **Auth**: JWT, Passport.js, Bcrypt
- **Validation**: Class-validator, Class-transformer

### AI Services
- **Voice Agent**: [Vapi AI](https://vapi.ai/) Integration

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [PostgreSQL](https://www.postgresql.org/)
- npm or pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Saicharan-775/Mediqon.git
   cd Mediqon
   ```

2. **Backend Setup**:
   ```bash
   cd mediqon-backend
   npm install
   # Create .env based on .env.example (or common defaults)
   npm run start:dev
   ```

3. **Frontend Setup**:
   ```bash
   cd ../Mediqon-frontend
   npm install
   # Create .env and configure VAPI_API_KEY if needed
   npm run dev
   ```

### Environment Variables

**Backend (.env):**
```env
DATABASE_URL=postgresql://user:password@localhost:5432/mediqon
JWT_SECRET=your_jwt_secret
```

**Frontend (.env):**
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_VAPI_PUBLIC_KEY=your_vapi_key
```

---

## 📸 Screenshots

*(Add your premium screenshots here to showcase the stunning UI)*

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is [UNLICENSED](LICENSE) (Private). Created with ❤️ for Mediqon.
