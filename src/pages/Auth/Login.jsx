import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

// If using @react-oauth/google, you would import it here:
// import { useGoogleLogin } from '@react-oauth/google';

// If using Firebase, you would import it here:
// import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { auth } from '../../config/firebase';

export default function Login() {
  const { login } = useAuth(); // Note: You might want to add a `loginWithGoogle` method to your useAuth hook!
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false); // Specific loading state for Google Login
  const [showPassword, setShowPassword] = useState(false);

  // Strict Validation Logic
  const validateForm = () => {
    const newErrors = {};
    
    // Strict Email Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Strict Password Regex (Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must be 8+ chars and include 1 uppercase, 1 lowercase, 1 number, and 1 special character.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Standard Email/Password Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      await login({ email, password }, false);
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  // Google Account Login Handler
  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    
    try {
      // --- OPTION 1: Using Firebase ---
      // const provider = new GoogleAuthProvider();
      // const result = await signInWithPopup(auth, provider);
      // const user = result.user;
      // await login(user); // Pass to your auth context

      // --- OPTION 2: Using @react-oauth/google (wrap component in hook instead of async function) ---
      // useGoogleLogin({ onSuccess: (res) => console.log(res) })(); 

      // --- SIMULATED LOGIN FOR UI DEMONSTRATION ---
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Google Login Successful");
      
    } catch (err) {
      console.error("Google login failed:", err);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
    
    if (errors[field]) {
      setErrors((prev) => ({ ...prev,[field]: null }));
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Graphic (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-indigo-900 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 to-purple-600/20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/40 blur-[120px] rounded-full"></div>
        
        <div className="relative z-10 text-white max-w-lg">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-400 flex items-center justify-center text-xl font-bold mb-8 shadow-lg shadow-indigo-500/30">C</div>
          <h2 className="text-4xl font-extrabold mb-6 leading-tight">Welcome back to your creative workflow.</h2>
          <p className="text-indigo-100 text-lg">Log in to access your API keys, download history, and manage your billing.</p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full animate-fade-in">
          <div className="text-center mb-10 lg:hidden">
             <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-indigo-600 to-purple-500 flex items-center justify-center text-white text-xl font-bold mb-4 shadow-lg shadow-indigo-500/30">C</div>
          </div>
          
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Log in</h2>
          <p className="text-slate-500 mb-8 font-medium">Enter your details below to access your account</p>

          {/* GOOGLE LOGIN BUTTON */}
          <button 
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading || loading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 font-bold py-3.5 px-4 rounded-xl hover:bg-slate-50 transition-all mb-6 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {googleLoading ? (
              <i className="fa-solid fa-circle-notch fa-spin text-indigo-600 text-xl"></i>
            ) : (
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="google" />
            )}
            {googleLoading ? 'Connecting to Google...' : 'Continue with Google'}
          </button>

          <div className="flex items-center mb-6">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="px-4 text-xs text-slate-400 font-bold uppercase tracking-wider">Or email</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email Input */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={googleLoading || loading}
                className={`w-full px-5 py-3.5 bg-white border ${errors.email ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-200 focus:ring-indigo-600/20 focus:border-indigo-600'} rounded-xl outline-none transition-all text-slate-900 placeholder:text-slate-400 disabled:bg-slate-50`} 
                placeholder="you@company.com" 
              />
              {errors.email && <p className="text-red-500 text-sm font-semibold mt-2">{errors.email}</p>}
            </div>
            
            {/* Password Input */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="block text-sm font-bold text-slate-700">Password</label>
                <Link to="/forgot-password" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline">
                  Forgot password?
                </Link>
              </div>
              
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  disabled={googleLoading || loading}
                  className={`w-full pl-5 pr-12 py-3.5 bg-white border ${errors.password ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-200 focus:ring-indigo-600/20 focus:border-indigo-600'} rounded-xl outline-none transition-all text-slate-900 placeholder:text-slate-400 disabled:bg-slate-50`} 
                  placeholder="••••••••" 
                />
                
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={googleLoading || loading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors focus:outline-none disabled:opacity-50"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm font-semibold mt-2">{errors.password}</p>}
            </div>

            <button type="submit" disabled={googleLoading || loading} className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/30 active:scale-95 disabled:opacity-70 mt-6">
              {loading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-8 font-medium">
            Don't have an account? <Link to="/register" className="text-indigo-600 font-bold hover:text-indigo-700 hover:underline">Sign up for free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}