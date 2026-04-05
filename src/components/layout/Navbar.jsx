import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Features', path: '/' },
    { name: 'Bulk API', path: '/bulk' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-400 ease-in-out ${
        scrolled || isMenuOpen
          ? 'bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)]' 
          : 'bg-white/40 backdrop-blur-md border-b border-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 transition-all duration-400">
          
          {/* Logo Area */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300 group-hover:scale-105">
                <i className="fa-solid fa-wand-magic-sparkles text-sm"></i>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                ClearBG
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links (Centered) */}
          <nav className="hidden md:flex items-center justify-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.name} 
                  to={link.path} 
                  className={`text-sm font-semibold transition-colors duration-200 ${
                    isActive 
                      ? 'text-indigo-600' 
                      : 'text-slate-600 hover:text-indigo-600'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center justify-end gap-5">
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/profile" 
                  className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-2"
                >
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-indigo-50">
                    <i className="fa-regular fa-user text-xs"></i>
                  </div>
                  Profile
                </Link>
                <div className="h-4 w-[1px] bg-slate-200"></div>
                <button 
                  onClick={logout} 
                  className="text-sm font-semibold text-slate-500 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  Log in
                </Link>
                <Link 
                  to="/register" 
                  className="bg-indigo-600 text-white text-sm px-5 py-2.5 rounded-full font-semibold shadow-md shadow-indigo-500/30 hover:bg-indigo-700 hover:shadow-indigo-500/50 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 hover:text-indigo-600 p-2 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <div className="relative w-5 h-4 flex flex-col justify-between overflow-hidden">
                <span className={`w-full h-[2px] bg-current rounded-full transform transition-all duration-300 origin-left ${isMenuOpen ? 'rotate-45 translate-x-[1px]' : ''}`}></span>
                <span className={`w-full h-[2px] bg-current rounded-full transform transition-all duration-300 ${isMenuOpen ? 'opacity-0 translate-x-4' : 'opacity-100'}`}></span>
                <span className={`w-full h-[2px] bg-current rounded-full transform transition-all duration-300 origin-left ${isMenuOpen ? '-rotate-45 translate-x-[1px]' : ''}`}></span>
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* 100% Width Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200/80 shadow-2xl transition-all duration-300 ease-in-out origin-top overflow-hidden ${
          isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1 sm:px-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`block px-4 py-3.5 rounded-xl text-base font-semibold transition-colors ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="my-4 border-t border-slate-100"></div>

          {isLoggedIn ? (
            <div className="grid grid-cols-2 gap-3 px-2">
              <Link 
                to="/profile" 
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-slate-700 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200/60"
              >
                <i className="fa-regular fa-user"></i> Profile
              </Link>
              <button 
                onClick={logout} 
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-red-600 bg-red-50 rounded-xl hover:bg-red-100 transition-colors border border-red-100"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 px-2">
              <Link 
                to="/login" 
                className="flex items-center justify-center px-4 py-3 text-base font-semibold text-slate-700 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200/60"
              >
                Log in
              </Link>
              <Link 
                to="/register" 
                className="flex items-center justify-center px-4 py-3 bg-indigo-600 text-white rounded-xl text-base font-semibold shadow-md shadow-indigo-500/30 hover:bg-indigo-700 transition-colors"
              >
                Get Started Free
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}