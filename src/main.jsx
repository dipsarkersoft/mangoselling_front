import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/useAuth.jsx'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'swiper/css';

createRoot(document.getElementById('root')).render(
  
<AuthProvider>

<App />
</AuthProvider>
   
  
)
