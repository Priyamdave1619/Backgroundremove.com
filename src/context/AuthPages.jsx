import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Login() {
  const { login } = useAuth();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    login('login');
  };

  return (
    <div className="py-20 bg-gray-50 animate-fade-in min-h-[70vh]">
      <div className="max-w-md mx-auto px-4 bg-white p-8 rounded-3xl border border-gray-200 shadow-xl">
        <h2 className="text-3xl font-extrabold text-dark mb-6 text-center">Log in</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email address" className="w-full px-5 py-3 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:border-primary" required />
          <input type="password" placeholder="Password" className="w-full px-5 py-3 border border-gray-300 rounded-xl mb-6 focus:outline-none focus:border-primary" required />
          <button type="submit" className="w-full bg-dark text-white py-3 rounded-full font-semibold hover:bg-gray-800 transition active:scale-95">Log In</button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">Don't have an account? <Link to="/register" className="text-primary font-bold hover:underline">Sign up</Link></p>
      </div>
    </div>
  );
}

export function Register() {
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login('register');
  };

  return (
    <div className="py-20 bg-gray-50 animate-fade-in min-h-[70vh]">
      <div className="max-w-md mx-auto px-4 bg-white p-8 rounded-3xl border border-gray-200 shadow-xl">
        <h2 className="text-3xl font-extrabold text-dark mb-6 text-center">Sign up</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" className="w-full px-5 py-3 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:border-primary" required />
          <input type="email" placeholder="Email address" className="w-full px-5 py-3 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:border-primary" required />
          <input type="password" placeholder="Password" className="w-full px-5 py-3 border border-gray-300 rounded-xl mb-6 focus:outline-none focus:border-primary" required />
          <button type="submit" className="w-full bg-primary text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition active:scale-95">Sign up</button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-6">Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link></p>
      </div>
    </div>
  );
}