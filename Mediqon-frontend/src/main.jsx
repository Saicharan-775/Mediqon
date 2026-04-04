/**
 * Mediqon - High-Fidelity Healthcare Platform
 * Specialized in immersive user experiences, AI integration, and 3D diagnostics.
 * @version 1.0.0
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
''
createRoot(document.getElementById('root')).render(
<GoogleOAuthProvider clientId="GOOGLE_CLIENT_ID">
<App/>
</GoogleOAuthProvider>,
)
