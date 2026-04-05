import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate, useNavigationType } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext.jsx';
import { ToastProvider } from './context/ToastContext.jsx';

import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';

import Home from './pages/Home/Home.jsx';
import Pricing from './pages/Pricing/Pricing.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import ForgotPassword from './pages/Auth/ForgotPassword.jsx';
import About from './pages/About.jsx';
import BulkApi from './pages/BulkApi.jsx';
import Contact from './pages/Contact.jsx';
import Profile from './pages/Profile.jsx';     // ← Added

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const navType = useNavigationType();

  const isAuthPage =
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/forgot-password';

  useEffect(() => {
    if (navType === 'POP' && isAuthPage) {
      navigate('/', { replace: true });
    }
  }, [navType, isAuthPage, navigate]);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-gray-800">
      {!isAuthPage && <Navbar />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bulk" element={<BulkApi />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* ← NEW PROFILE ROUTE */}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <AppLayout />
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}