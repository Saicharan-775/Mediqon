import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

// Lazy Loading Components for Performance
const LandingPage = lazy(() => import('./pages/LandingPage'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const DevProfile = lazy(() => import('./pages/PublicProfile'))

// Loading State Component
const GlobalLoader = () => (
  <div className="h-screen w-full flex flex-col items-center justify-center bg-background text-foreground space-y-4">
    <Loader2 className="w-10 h-10 animate-spin text-accent-primary" />
    <span className="text-sm font-medium tracking-widest uppercase opacity-50">Initializing DevLink...</span>
  </div>
)

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<GlobalLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dev/:userId" element={<DevProfile />} />
          
          {/* 
            Fallback/404 can go here. 
            Standardizing the medical app into a developer platform. 
          */}
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
