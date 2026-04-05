import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Register() {
  const { login } = useAuth();
  const[step, setStep] = useState(1); // Step 1: Details, Step 2: OTP
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const[email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [errors, setErrors] = useState({});

  const otpRefs = useRef([]);

  // Strict Validation Logic
  const validateForm = () => {
    const newErrors = {};

    // Name Validation
    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Mobile Validation (Basic digit and length check)
    if (!mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{7,15}$/.test(mobile.replace(/\D/g, ''))) {
      newErrors.mobile = 'Please enter a valid mobile number';
    }

    // Password Validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must be 8+ chars and include 1 uppercase, 1 lowercase, 1 number, and 1 special character.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    if (field === 'fullName') setFullName(value);
    if (field === 'email') setEmail(value);
    if (field === 'mobile') setMobile(value);
    if (field === 'password') setPassword(value);
    
    // Clear error for the field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev,[field]: null }));
    }
  };

  // Handle Step 1 (Send OTP)
  const handleSendOTP = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    // Simulate sending OTP
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  // Handle Step 2 (Verify OTP & Login)
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length < 6) {
      setErrors({ otp: 'Please enter all 6 digits' });
      return;
    }

    setLoading(true);
    await login({ email, password }, true);
  };

  // OTP Input Handler
  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;
    
    setErrors((prev) => ({ ...prev, otp: null }));
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Auto-focus previous input on backspace if current is empty
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Graphic */}
      <div className="hidden lg:flex w-1/2 bg-indigo-900 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 to-purple-600/20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/40 blur-[120px] rounded-full"></div>
        
        <div className="relative z-10 text-white max-w-lg">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-400 flex items-center justify-center text-xl font-bold mb-8 shadow-lg shadow-indigo-500/30">C</div>
          <h2 className="text-4xl font-extrabold mb-6 leading-tight">Start automating your images today.</h2>
          <ul className="space-y-4 text-indigo-100 font-medium">
            <li className="flex items-center gap-3"><i className="fa-solid fa-circle-check text-indigo-300"></i> 50 Free API calls per month</li>
            <li className="flex items-center gap-3"><i className="fa-solid fa-circle-check text-indigo-300"></i> Unlimited web interface usage</li>
            <li className="flex items-center gap-3"><i className="fa-solid fa-circle-check text-indigo-300"></i> Access to Figma & Photoshop plugins</li>
          </ul>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative overflow-y-auto">
        <div className="max-w-md w-full animate-fade-in py-8">
          
          {step === 1 ? (
            /* --- STEP 1: REGISTRATION FORM --- */
            <>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Create an account</h2>
              <p className="text-slate-500 mb-8 font-medium">Join thousands of creators using ClearBG.</p>

              <form onSubmit={handleSendOTP} className="space-y-5" noValidate>
                {/* Full Name Input */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className={`w-full px-5 py-3.5 bg-white border ${errors.fullName ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-200 focus:ring-indigo-600/20 focus:border-indigo-600'} rounded-xl outline-none transition-all text-slate-900 placeholder:text-slate-400`} 
                    placeholder="John Doe" 
                  />
                  {errors.fullName && <p className="text-red-500 text-sm font-semibold mt-2">{errors.fullName}</p>}
                </div>
                
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email address</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-5 py-3.5 bg-white border ${errors.email ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-200 focus:ring-indigo-600/20 focus:border-indigo-600'} rounded-xl outline-none transition-all text-slate-900 placeholder:text-slate-400`} 
                    placeholder="you@company.com" 
                  />
                  {errors.email && <p className="text-red-500 text-sm font-semibold mt-2">{errors.email}</p>}
                </div>

                {/* Country Code + Mobile Number Input */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Mobile Number</label>
                  <div className="flex gap-2">
                    <select 
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-1/3 px-3 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-indigo-600/20 focus:border-indigo-600 outline-none text-sm font-bold text-slate-700 transition-all cursor-pointer"
                    >
                      <option value="+1">🇺🇸 +1</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+91">🇮🇳 +91</option>
                      <option value="+61">🇦🇺 +61</option>
                      <option value="+49">🇩🇪 +49</option>
                    </select>
                    <input 
                      type="tel" 
                      value={mobile}
                      onChange={(e) => handleInputChange('mobile', e.target.value)}
                      className={`w-2/3 px-5 py-3.5 bg-white border ${errors.mobile ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-200 focus:ring-indigo-600/20 focus:border-indigo-600'} rounded-xl outline-none transition-all text-slate-900 placeholder:text-slate-400`} 
                      placeholder="000-000-0000" 
                    />
                  </div>
                  {errors.mobile && <p className="text-red-500 text-sm font-semibold mt-2">{errors.mobile}</p>}
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`w-full pl-5 pr-12 py-3.5 bg-white border ${errors.password ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500' : 'border-slate-200 focus:ring-indigo-600/20 focus:border-indigo-600'} rounded-xl outline-none transition-all text-slate-900 placeholder:text-slate-400`} 
                      placeholder="••••••••" 
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors focus:outline-none"
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

                <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/30 active:scale-95 disabled:opacity-70 mt-6">
                  {loading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 'Create Account'}
                </button>
              </form>

              <p className="text-center text-sm text-slate-500 mt-8 font-medium">
                Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:text-indigo-700 hover:underline">Log in</Link>
              </p>
            </>
          ) : (
            /* --- STEP 2: OTP VERIFICATION --- */
            <div className="animate-fade-in text-center">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-6 shadow-sm shadow-indigo-600/10">
                <i className="fa-solid fa-envelope-open-text"></i>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Check your email</h2>
              <p className="text-slate-500 mb-8 font-medium">We've sent a 6-digit verification code to <br/><span className="font-bold text-slate-900">{email}</span></p>

              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div className="flex justify-center gap-2 sm:gap-3">
                  {otp.map((digit, index) => (
                    <input 
                      key={index} 
                      ref={(el) => (otpRefs.current[index] = el)}
                      type="text" 
                      maxLength="1" 
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className={`w-11 h-14 sm:w-12 sm:h-14 text-center text-2xl font-bold bg-white border-2 ${errors.otp ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-600/20'} rounded-xl outline-none transition-all shadow-sm text-slate-900`} 
                    />
                  ))}
                </div>
                {errors.otp && <p className="text-red-500 text-sm font-semibold">{errors.otp}</p>}

                <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/30 active:scale-95 disabled:opacity-70 mt-6">
                  {loading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 'Verify & Login'}
                </button>
              </form>

              <p className="text-center text-sm text-slate-500 mt-8 font-medium">
                Didn't receive the email? <button className="text-indigo-600 font-bold hover:text-indigo-700 hover:underline">Click to resend</button>
              </p>
              <button onClick={() => setStep(1)} className="mt-4 text-xs font-bold text-slate-400 hover:text-slate-700 transition-colors">
                <i className="fa-solid fa-arrow-left mr-1"></i> Back to registration
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}