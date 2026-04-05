import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const navigate = useNavigate();
  
  // Flow states
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState('');
  
  // Toast Notification State
  const [toastMessage, setToastMessage] = useState('');

  // Form states
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  
  const [otp, setOtp] = useState(Array(6).fill(''));
  const otpRefs = useRef([]);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // Validation Rules
  const passwordRules = [
    { label: 'At least 8 characters', regex: /.{8,}/ },
    { label: 'One uppercase letter', regex: /[A-Z]/ },
    { label: 'One lowercase letter', regex: /[a-z]/ },
    { label: 'One number', regex: /[0-9]/ },
    { label: 'One special character (@$!%*?&)', regex: /[@$!%*?&]/ }
  ];

  // Helper to check if email is valid
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Helper to check if password meets all rules
  const isPasswordValid = passwordRules.every(rule => rule.regex.test(newPassword));

  // --- Effects for Timers & Toasts ---

  // OTP Cooldown Timer Effect
  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Auto-hide Toast Notification Effect
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(''), 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);


  // --- Handlers ---
  
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setGlobalError('');
    setEmailError('');
    
    if (!email) return setEmailError('Email address is required.');
    if (!isValidEmail(email)) return setEmailError('Please enter a valid email address.');

    setLoading(true);
    // TODO: API Call to send OTP
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      // Start 30s cooldown immediately when they reach the OTP step
      setResendCooldown(30); 
    }, 1500);
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0 || isResending) return;
    
    setIsResending(true);
    setGlobalError('');
    
    // TODO: API Call to resend OTP
    setTimeout(() => {
      setIsResending(false);
      setToastMessage(`A new code has been sent to ${email}`);
      setResendCooldown(30); // Reset timer to 30 seconds
    }, 1500);
  };

  // OTP Input Handlers
  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) otpRefs.current[index + 1].focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    if (pastedData.length > 0) {
      otpRefs.current[Math.min(pastedData.length, 5)].focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setGlobalError('');
    const otpString = otp.join('');

    if (otpString.length < 6) return setGlobalError('Please fill in all 6 digits.');

    setLoading(true);
    // TODO: API Call to verify OTP
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 1500);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setGlobalError('');

    if (!isPasswordValid) return setGlobalError('Please ensure your password meets all requirements.');
    if (newPassword !== confirmPassword) return setGlobalError('Passwords do not match.');

    setLoading(true);
    // TODO: API Call to update password
    setTimeout(() => {
      setLoading(false);
      navigate('/login', { state: { message: 'Password reset successfully. Please log in.' } });
    }, 1500);
  };

  // --- UI Components ---
  
  const EyeIcon = ({ isVisible, toggle }) => (
    <button type="button" onClick={toggle} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none">
      {isVisible ? (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
      ) : (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
      )}
    </button>
  );

  return (
    <div className="min-h-screen flex font-sans bg-white relative">
      
      {/* Toast Notification Popup */}
      <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
        <div className="bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl shadow-slate-900/20 flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
          </div>
          <p className="font-medium text-sm">{toastMessage}</p>
        </div>
      </div>

      {/* Left Side - Modern Graphic */}
      <div className="hidden lg:flex w-1/2 bg-slate-50 relative overflow-hidden items-center justify-center p-12 border-r border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-100 via-white to-blue-50"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full"></div>
        
        <div className="relative z-10 max-w-lg">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-white text-2xl font-bold mb-10 shadow-xl shadow-blue-600/20">C</div>
          <h2 className="text-5xl font-black mb-6 text-slate-900 tracking-tight leading-[1.1]">
            Secure your <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500">workspace.</span>
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">Follow the simple steps to verify your identity and get safely back to your creative workflow.</p>
        </div>
      </div>

      {/* Right Side - Form Container */}
      <div className="w-full lg:w-1/2 flex flex-col px-6 py-10 sm:px-12 md:px-16 lg:px-24 bg-white overflow-y-auto relative">
        <div className="w-full max-w-md mx-auto my-auto">
          
          <Link to="/login" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors mb-10 group">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to login
          </Link>

          {/* Mobile Logo */}
          <div className="text-center mb-8 lg:hidden">
             <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-600/20">C</div>
          </div>
          
          {/* Step Indicator */}
          <div className="flex items-center justify-between w-full mb-12">
            {[1, 2, 3].map((num) => (
              <React.Fragment key={num}>
                <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step === num ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 ring-4 ring-indigo-50' 
                  : step > num ? 'bg-indigo-600 text-white' 
                  : 'bg-slate-100 text-slate-400'
                }`}>
                  {step > num ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg> : num}
                </div>
                {num < 3 && <div className={`flex-1 h-1 mx-2 sm:mx-4 rounded-full transition-colors duration-300 ${step > num ? 'bg-indigo-600' : 'bg-slate-100'}`}></div>}
              </React.Fragment>
            ))}
          </div>

          <h2 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
            {step === 1 && 'Forgot Password?'}
            {step === 2 && 'Verify your email'}
            {step === 3 && 'Create new password'}
          </h2>
          <p className="text-slate-500 mb-8 text-[15px] leading-relaxed">
            {step === 1 && "No worries, we'll send you reset instructions."}
            {step === 2 && <>We sent a 6-digit code to <span className="font-semibold text-slate-900">{email}</span>. Please enter it below.</>}
            {step === 3 && 'Please create a strong password that you don\'t use on any other website.'}
          </p>

          {/* Global Error Alert */}
          {globalError && (
            <div className="mb-6 p-4 bg-red-50/50 border border-red-200 text-red-700 text-sm font-medium rounded-xl flex items-start gap-3">
              <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {globalError}
            </div>
          )}

          {/* --- STEP 1: EMAIL FORM --- */}
          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-5 py-3.5 bg-slate-50 border rounded-xl focus:bg-white focus:ring-2 focus:outline-none transition-all ${
                    emailError ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-500/20'
                  }`} 
                  placeholder="you@company.com" 
                />
                {emailError && <p className="mt-2 text-sm text-red-500 font-medium">{emailError}</p>}
              </div>
              <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100">
                {loading ? <span className="animate-pulse">Sending...</span> : 'Reset Password'}
              </button>
            </form>
          )}

          {/* --- STEP 2: OTP FORM --- */}
          {step === 2 && (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-4">Secure 6-Digit Code</label>
                <div className="flex justify-between gap-2 sm:gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={el => otpRefs.current[index] = el}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={handleOtpPaste}
                      className="w-full aspect-square text-center bg-slate-50 border border-slate-200 rounded-xl text-2xl font-bold text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all"
                    />
                  ))}
                </div>
              </div>
              <button type="submit" disabled={loading || otp.join('').length < 6} className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 mt-2">
                {loading ? <span className="animate-pulse">Verifying...</span> : 'Verify Code'}
              </button>
              
              <p className="text-center text-sm text-slate-500 mt-6">
                Didn't receive the code?{' '}
                <button 
                  type="button" 
                  onClick={handleResendOtp}
                  disabled={resendCooldown > 0 || isResending}
                  className={`font-semibold transition-colors ${
                    resendCooldown > 0 || isResending 
                      ? 'text-slate-400 cursor-not-allowed' 
                      : 'text-indigo-600 hover:text-indigo-800 hover:underline'
                  }`}
                >
                  {isResending ? 'Sending...' : resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Click to resend'}
                </button>
              </p>
            </form>
          )}

          {/* --- STEP 3: RESET PASSWORD FORM --- */}
          {step === 3 && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">New Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    onFocus={() => setIsPasswordFocused(true)}
                    className="w-full pl-5 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" 
                    placeholder="••••••••" 
                  />
                  <EyeIcon isVisible={showPassword} toggle={() => setShowPassword(!showPassword)} />
                </div>
                
                {/* Real-time strict validation checklist */}
                {(isPasswordFocused || newPassword) && (
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-xs font-semibold text-slate-700 mb-3 uppercase tracking-wider">Password Requirements:</p>
                    <ul className="space-y-2">
                      {passwordRules.map((rule, idx) => {
                        const isMet = rule.regex.test(newPassword);
                        return (
                          <li key={idx} className={`flex items-center gap-2 text-sm transition-colors duration-300 ${isMet ? 'text-emerald-600' : 'text-slate-500'}`}>
                            {isMet ? (
                              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                            ) : (
                              <svg className="w-4 h-4 shrink-0 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            )}
                            {rule.label}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm New Password</label>
                <div className="relative">
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full pl-5 pr-12 py-3.5 bg-slate-50 border rounded-xl focus:bg-white focus:ring-2 outline-none transition-all ${
                      confirmPassword && newPassword !== confirmPassword 
                      ? 'border-red-300 focus:ring-red-500/20 focus:border-red-500' 
                      : confirmPassword && newPassword === confirmPassword
                      ? 'border-emerald-300 focus:ring-emerald-500/20 focus:border-emerald-500'
                      : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500'
                    }`} 
                    placeholder="••••••••" 
                  />
                  <EyeIcon isVisible={showConfirmPassword} toggle={() => setShowConfirmPassword(!showConfirmPassword)} />
                </div>
              </div>

              <button type="submit" disabled={loading || !isPasswordValid || newPassword !== confirmPassword} className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 mt-4">
                {loading ? <span className="animate-pulse">Saving...</span> : 'Reset Password'}
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}