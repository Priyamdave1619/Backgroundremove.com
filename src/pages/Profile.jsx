import React, { useState } from 'react';
import { 
  User, CreditCard, Key, Settings, Camera, 
  Copy, Download, Clock, CheckCircle2, Shield, Eye, EyeOff, Activity, Mail, Phone, Zap, ArrowUpRight, AlertCircle, AlertTriangle
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';

// Safely import PRICING_PLANS
import { PRICING_PLANS } from '../config/constants';

export default function Profile() {
  const { isLoggedIn, logout } = useAuth();
  const { showToast } = useToast();

  // 1. Mock User Data
  const [user, setUser] = useState({
    name: "Priyam Patel",
    email: "priyam@clearbg.com",
    phone: "+91 98765 43210",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    joined: "March 12, 2025",
    totalImages: 487,
    creditsLeft: 260,
    totalCredits: 1500,
  });

  // 2. BULLETPROOF PLAN FALLBACK (Fixes the crash)
  const foundPlan = (Array.isArray(PRICING_PLANS) ? PRICING_PLANS.find(p => p.id === 'creator') : null) || {};
  
  const currentPlan = {
    name: foundPlan.name || 'Creator Plan',
    price: foundPlan.price !== undefined ? foundPlan.price : 49,
    interval: foundPlan.interval || 'month',
    features: Array.isArray(foundPlan.features) && foundPlan.features.length > 0 
      ? foundPlan.features 
      : ['Unlimited Background Removals', 'High-Res Downloads', 'Priority API Support', 'Email Support']
  };

  // 3. Mock Billing History Data
  const billingHistory = [
    { id: 'INV-2025-003', date: 'Mar 01, 2025', amount: 49.00, status: 'Paid', method: '•••• 4242' },
    { id: 'INV-2025-002', date: 'Feb 01, 2025', amount: 49.00, status: 'Paid', method: '•••• 4242' },
    { id: 'INV-2025-001', date: 'Jan 01, 2025', amount: 49.00, status: 'Paid', method: '•••• 4242' },
  ];

  // Component States
  const [activeTab, setActiveTab] = useState('overview');
  const [settingsTab, setSettingsTab] = useState('profile');
  const [showApiKey, setShowApiKey] = useState(false);
  
  // Password Visibility States
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form & Error States
  const [formData, setFormData] = useState({
    name: user.name, email: user.email, phone: user.phone, avatarPreview: user.avatar,
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '', newPassword: '', confirmPassword: '',
  });

  const [profileErrors, setProfileErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, avatarPreview: URL.createObjectURL(file) }));
    }
  };

  // --- STRICT VALIDATION LOGIC ---
  const validateProfile = () => {
    const errors = {};
    if (!formData.name.trim() || formData.name.length < 2) {
      errors.name = "Full name must be at least 2 characters long.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }
    const phoneRegex = /^\+?[\d\s-]{8,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number (8-15 digits).";
    }
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePassword = () => {
    const errors = {};
    if (!passwordData.currentPassword) {
      errors.currentPassword = "Current password is required.";
    }
    
    // Strict requirement: 8 chars, 1 letter, 1 number, 1 special character
    const strictPassRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!strictPassRegex.test(passwordData.newPassword)) {
      errors.newPassword = "Must be 8+ chars, with at least 1 letter, 1 number, and 1 special character.";
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // --- SUBMIT HANDLERS ---
  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!validateProfile()) {
      showToast("Please fix the errors in your profile.", "error");
      return;
    }
    setUser(prev => ({ ...prev, name: formData.name, email: formData.email, phone: formData.phone, avatar: formData.avatarPreview }));
    showToast("Profile updated successfully", "success");
  };

  const handleCancelProfile = () => {
    setFormData({ name: user.name, email: user.email, phone: user.phone, avatarPreview: user.avatar });
    setProfileErrors({});
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (!validatePassword()) {
      showToast("Please meet the password requirements.", "error");
      return;
    }
    showToast("Password updated successfully", "success");
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setPasswordErrors({});
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  const handleResetPasswordFields = () => {
    setPasswordData({currentPassword: '', newPassword: '', confirmPassword: ''});
    setPasswordErrors({});
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showToast("API Key copied to clipboard", "success");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 pt-24 font-sans">
        <div className="text-center w-full max-w-md p-10 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-indigo-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-indigo-950 mb-2 tracking-tight">Secure Access</h2>
          <p className="text-slate-500 mb-8 leading-relaxed">Sign in to view and manage your workspace, billing, and API settings.</p>
          <button 
            onClick={() => window.location.href = '/login'} 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-md shadow-indigo-600/20 active:scale-[0.98]"
          >
            Sign In to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-[#FAFAFA] min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* --- 1. PREMIUM HEADER --- */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200/60 overflow-hidden mb-8">
          
          {/* Deep Blue Banner */}
          <div className="h-32 sm:h-44 bg-gradient-to-r from-[#171E36] via-[#1E2548] to-[#2B2D6E] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 mix-blend-overlay"></div>
          </div>
          
          {/* Bottom Content Area */}
          <div className="px-6 sm:px-10 pb-6 sm:pb-8 relative">
            <div className="flex flex-col sm:flex-row sm:items-end gap-5 sm:gap-6">
              
              {/* Avatar */}
              <div className="-mt-12 sm:-mt-16 relative group cursor-pointer shrink-0 z-10" onClick={() => setActiveTab('settings')}>
                <div className="p-1.5 sm:p-2 bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-sm border border-slate-100">
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-[1.15rem] sm:rounded-[1.5rem] object-cover bg-slate-100" 
                  />
                </div>
                <div className="absolute inset-2 bg-indigo-900/40 backdrop-blur-sm rounded-[1.15rem] sm:rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white drop-shadow-md" />
                </div>
              </div>
              
              {/* User Details & Action Button */}
              <div className="flex-1 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6 z-10 w-full pb-1 sm:pb-2">
                
                {/* Text Info */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <h1 className="text-2xl sm:text-[1.75rem] font-extrabold text-indigo-950 tracking-tight leading-none">
                      {user.name}
                    </h1>
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#4F46E5] bg-[#EEF2FF] border border-[#E0E7FF] rounded-md">
                      Pro
                    </span>
                  </div>
                  
                  {/* Meta Info Row */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] sm:text-sm text-slate-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-slate-400" /> {user.email}
                    </span>
                    <span className="hidden sm:inline text-slate-300">|</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" /> Joined {user.joined}
                    </span>
                  </div>
                </div>

                {/* Settings Button */}
                <div className="shrink-0 pt-2 sm:pt-0">
                  <button 
                    onClick={() => setActiveTab('settings')} 
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-semibold text-sm rounded-xl transition-all shadow-sm active:scale-[0.98]"
                  >
                    <Settings className="w-4 h-4 text-slate-400" /> Settings
                  </button>
                </div>
                
              </div>
            </div>
          </div>
        </div>

        {/* --- 2. SLEEK TABS NAVIGATION --- */}
        <div className="flex overflow-x-auto pb-4 mb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex p-1 bg-white ring-1 ring-slate-100 rounded-2xl shadow-sm w-max">
            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'subscription', label: 'Plan & Billing', icon: CreditCard },
              { id: 'api', label: 'Developer API', icon: Key },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                      : 'text-slate-500 hover:text-indigo-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white/90' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* --- 3. TAB CONTENTS --- */}
        
        {/* TAB: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-7 shadow-sm ring-1 ring-slate-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-5">
                <div className="p-3 bg-blue-50/50 ring-1 ring-blue-100 rounded-2xl">
                  <Camera className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-sm font-semibold text-slate-600">Total Processed</h3>
              </div>
              <div className="flex items-end gap-3">
                <p className="text-4xl font-extrabold text-indigo-950 tracking-tight">{user.totalImages}</p>
                <div className="flex items-center text-sm font-medium text-emerald-600 mb-1 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> 12%
                </div>
              </div>
              <p className="text-sm text-slate-400 mt-2 font-medium">Images in the last 30 days</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-7 shadow-sm ring-1 ring-slate-100 hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden">
              <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-50 -mr-10 -mt-10"></div>
              <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-50/50 ring-1 ring-indigo-100 rounded-2xl">
                    <Zap className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-600">Credits Left</h3>
                </div>
                <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                  {Math.round((user.creditsLeft/user.totalCredits)*100)}%
                </span>
              </div>
              <div className="relative z-10">
                <p className="text-4xl font-extrabold text-indigo-950 tracking-tight">
                  {user.creditsLeft} <span className="text-lg text-slate-400 font-semibold">/ {user.totalCredits}</span>
                </p>
                <div className="mt-5 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${(user.creditsLeft/user.totalCredits)*100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-7 shadow-sm ring-1 ring-slate-100 hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-5">
                <div className="p-3 bg-emerald-50/50 ring-1 ring-emerald-100 rounded-2xl">
                  <Activity className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-sm font-semibold text-slate-600">API Status</h3>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                </div>
                <p className="text-3xl font-extrabold text-indigo-950 tracking-tight">Operational</p>
              </div>
              <p className="text-sm text-slate-400 mt-3 font-medium">All systems normal</p>
            </div>
          </div>
        )}

        {/* TAB: SUBSCRIPTION & BILLING */}
        {activeTab === 'subscription' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Current Plan Card */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-3xl p-8 shadow-sm ring-1 ring-slate-100 h-full relative overflow-hidden flex flex-col">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-500"></div>
                
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-indigo-950">Current Plan</h2>
                  <span className="inline-flex items-center px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 rounded-full">
                    Active
                  </span>
                </div>
                
                <div className="mb-2">
                  <h3 className="text-3xl font-extrabold text-indigo-950 tracking-tight">{currentPlan.name}</h3>
                </div>
                
                <div className="mt-2 flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-extrabold text-indigo-950 tracking-tighter">${currentPlan.price}</span>
                  <span className="text-slate-500 font-medium">/{currentPlan.interval}</span>
                </div>
                
                <div className="space-y-4 flex-grow mb-8">
                  {currentPlan.features?.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-slate-600 font-medium">
                      <div className="mt-0.5 bg-indigo-50 p-1 rounded-full text-indigo-600">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 
                      </div>
                      <span className="leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-6 space-y-3 mt-auto">
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-md active:scale-[0.98]">
                    Upgrade Workspace
                  </button>
                  <button className="w-full bg-white ring-1 ring-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:ring-red-200 font-semibold py-3 px-4 rounded-xl transition-all">
                    Cancel Subscription
                  </button>
                </div>
              </div>
            </div>

            {/* Billing History Card */}
            <div className="xl:col-span-2 flex flex-col">
              <div className="bg-white rounded-3xl shadow-sm ring-1 ring-slate-100 flex-grow overflow-hidden flex flex-col">
                <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-indigo-950">Billing History</h3>
                    <p className="text-sm text-slate-500 mt-1 font-medium">Download your previous invoices and receipts.</p>
                  </div>
                  <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors">
                    Download All
                  </button>
                </div>
                
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-slate-50/50 text-slate-500 font-semibold text-xs uppercase tracking-wider">
                      <tr>
                        <th className="px-8 py-4 border-b border-slate-100">Invoice</th>
                        <th className="px-8 py-4 border-b border-slate-100">Date</th>
                        <th className="px-8 py-4 border-b border-slate-100">Amount</th>
                        <th className="px-8 py-4 border-b border-slate-100">Status</th>
                        <th className="px-8 py-4 border-b border-slate-100 text-right">Receipt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {billingHistory.map((invoice, i) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors group">
                          <td className="px-8 py-4 font-semibold text-indigo-950">{invoice.id}</td>
                          <td className="px-8 py-4 text-slate-500 font-medium">{invoice.date}</td>
                          <td className="px-8 py-4 text-indigo-950 font-semibold">${Number(invoice.amount || 0).toFixed(2)}</td>
                          <td className="px-8 py-4">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/50">
                              {invoice.status}
                            </span>
                          </td>
                          <td className="px-8 py-4 text-right">
                            <button className="inline-flex items-center justify-center text-slate-400 hover:text-indigo-600 p-2 hover:bg-indigo-50 rounded-lg transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: API KEYS */}
        {activeTab === 'api' && (
          <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm ring-1 ring-slate-100">
              <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-indigo-600/20">
                <Key className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-indigo-950 tracking-tight">Authentication Keys</h2>
              <p className="text-slate-500 mt-2 mb-8 font-medium leading-relaxed">
                Use these keys to authenticate your API requests. Keep your production key secure and never expose it in client-side code.
              </p>
              
              <div className="space-y-4">
                <label className="block text-sm font-bold text-slate-700">Production Secret Key</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1 group">
                    <input 
                      type={showApiKey ? "text" : "password"} 
                      readOnly 
                      value="sk_live_9f8d7c6b5a41234567890abcdef" 
                      className="w-full pl-4 pr-12 py-3.5 bg-slate-50 ring-1 ring-slate-200 text-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm transition-all"
                    />
                    <button 
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1.5 rounded-md hover:bg-slate-200/50 transition-colors"
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <button 
                    onClick={() => copyToClipboard('sk_live_9f8d7c6b5a41234567890abcdef')} 
                    className="flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-indigo-600/20 active:scale-[0.98] shrink-0"
                  >
                    <Copy className="w-4 h-4" /> Copy Key
                  </button>
                </div>
              </div>

              <div className="mt-10 p-5 bg-amber-50 ring-1 ring-amber-200/60 rounded-2xl flex items-start gap-4">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-amber-900">Compromised Key?</h4>
                  <p className="text-sm text-amber-800/80 mt-1 font-medium leading-relaxed">
                    If you suspect your API key has been exposed, roll it immediately. Your old key will expire and any active integrations will fail until updated.
                  </p>
                  <button className="mt-4 px-4 py-2 bg-white ring-1 ring-amber-200 text-amber-700 text-sm font-bold rounded-lg hover:bg-amber-100 transition-colors shadow-sm">
                    Roll API Key
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-3xl shadow-sm ring-1 ring-slate-100 overflow-hidden">
              
              {/* Settings Navigation Header */}
              <div className="px-8 pt-8 pb-0 border-b border-slate-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-md shadow-indigo-600/20">
                    <Settings className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-indigo-950 tracking-tight">Account Settings</h2>
                    <p className="text-sm text-slate-500 font-medium mt-1">Manage your profile data and secure your account.</p>
                  </div>
                </div>

                <div className="flex gap-8">
                  <button 
                    onClick={() => setSettingsTab('profile')} 
                    className={`pb-4 text-sm font-bold transition-all border-b-2 ${
                      settingsTab === 'profile' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Profile Details
                  </button>
                  <button 
                    onClick={() => setSettingsTab('security')} 
                    className={`pb-4 text-sm font-bold transition-all border-b-2 ${
                      settingsTab === 'security' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Security Options
                  </button>
                </div>
              </div>

              {/* Settings Content: Profile Details */}
              {settingsTab === 'profile' && (
                <form onSubmit={handleSaveProfile} className="p-8">
                  {/* Avatar Section */}
                  <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
                    <div className="relative group cursor-pointer shrink-0">
                      <div className="p-1 rounded-full ring-1 ring-slate-200 bg-white shadow-sm">
                        <img src={formData.avatarPreview} className="w-20 h-20 rounded-full object-cover bg-slate-50" alt="Profile" />
                      </div>
                      <label className="absolute inset-1 bg-indigo-900/50 backdrop-blur-sm rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                        <Camera className="w-5 h-5 text-white mb-0.5" />
                        <span className="text-[9px] text-white font-bold uppercase tracking-wider">Change</span>
                        <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                      </label>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-indigo-950">Profile Picture</h3>
                      <p className="text-sm text-slate-500 font-medium mt-1">Upload a new avatar. Recommended size is 256x256px.</p>
                    </div>
                  </div>

                  {/* Input Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className={`w-4 h-4 ${profileErrors.name ? 'text-red-400' : 'text-slate-400'}`} />
                        </div>
                        <input 
                          type="text" 
                          value={formData.name} 
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                          className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 ring-1 text-slate-800 rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition-all font-medium ${profileErrors.name ? 'ring-red-300 focus:ring-red-500' : 'ring-slate-200 focus:ring-indigo-500'}`} 
                        />
                      </div>
                      {profileErrors.name && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-red-500 text-xs font-semibold">
                          <AlertTriangle className="w-3.5 h-3.5" /> {profileErrors.name}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className={`w-4 h-4 ${profileErrors.email ? 'text-red-400' : 'text-slate-400'}`} />
                        </div>
                        <input 
                          type="email" 
                          value={formData.email} 
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                          className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 ring-1 text-slate-800 rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition-all font-medium ${profileErrors.email ? 'ring-red-300 focus:ring-red-500' : 'ring-slate-200 focus:ring-indigo-500'}`} 
                        />
                      </div>
                      {profileErrors.email && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-red-500 text-xs font-semibold">
                          <AlertTriangle className="w-3.5 h-3.5" /> {profileErrors.email}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Phone Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Phone className={`w-4 h-4 ${profileErrors.phone ? 'text-red-400' : 'text-slate-400'}`} />
                        </div>
                        <input 
                          type="tel" 
                          value={formData.phone} 
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                          className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 ring-1 text-slate-800 rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition-all font-medium ${profileErrors.phone ? 'ring-red-300 focus:ring-red-500' : 'ring-slate-200 focus:ring-indigo-500'}`} 
                        />
                      </div>
                      {profileErrors.phone && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-red-500 text-xs font-semibold">
                          <AlertTriangle className="w-3.5 h-3.5" /> {profileErrors.phone}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                    <button type="button" onClick={handleCancelProfile} className="px-6 py-2.5 bg-white ring-1 ring-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-all shadow-sm">Discard Changes</button>
                    <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md shadow-indigo-600/20 active:scale-[0.98]">Save Profile</button>
                  </div>
                </form>
              )}

              {/* Settings Content: Security */}
              {settingsTab === 'security' && (
                <form onSubmit={handleSavePassword} className="p-8">
                  <div className="max-w-xl space-y-6 mb-8">
                    
                    {/* Current Password Input */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Current Password</label>
                      <div className="relative group">
                        <input 
                          type={showCurrentPassword ? "text" : "password"} 
                          value={passwordData.currentPassword} 
                          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} 
                          className={`w-full pl-4 pr-12 py-3.5 bg-slate-50 ring-1 text-slate-800 rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition-all font-medium ${passwordErrors.currentPassword ? 'ring-red-300 focus:ring-red-500' : 'ring-slate-200 focus:ring-indigo-500'}`} 
                          placeholder="••••••••" 
                        />
                        <button 
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1.5 rounded-md hover:bg-slate-200/50 transition-colors"
                        >
                          {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {passwordErrors.currentPassword && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-red-500 text-xs font-semibold">
                          <AlertTriangle className="w-3.5 h-3.5" /> {passwordErrors.currentPassword}
                        </div>
                      )}
                    </div>

                    {/* New Password Input */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">New Password</label>
                      <div className="relative group">
                        <input 
                          type={showNewPassword ? "text" : "password"} 
                          value={passwordData.newPassword} 
                          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} 
                          className={`w-full pl-4 pr-12 py-3.5 bg-slate-50 ring-1 text-slate-800 rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition-all font-medium ${passwordErrors.newPassword ? 'ring-red-300 focus:ring-red-500' : 'ring-slate-200 focus:ring-indigo-500'}`} 
                          placeholder="Ex: Abcd@1234" 
                        />
                        <button 
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1.5 rounded-md hover:bg-slate-200/50 transition-colors"
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {passwordErrors.newPassword ? (
                        <div className="flex items-start gap-1.5 mt-1.5 text-red-500 text-xs font-semibold">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" /> <span>{passwordErrors.newPassword}</span>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-500 mt-1.5">Must be 8+ characters, including 1 letter, 1 number, & 1 special character.</p>
                      )}
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1.5">Confirm New Password</label>
                      <div className="relative group">
                        <input 
                          type={showConfirmPassword ? "text" : "password"} 
                          value={passwordData.confirmPassword} 
                          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} 
                          className={`w-full pl-4 pr-12 py-3.5 bg-slate-50 ring-1 text-slate-800 rounded-xl focus:bg-white focus:outline-none focus:ring-2 transition-all font-medium ${passwordErrors.confirmPassword ? 'ring-red-300 focus:ring-red-500' : 'ring-slate-200 focus:ring-indigo-500'}`} 
                          placeholder="••••••••" 
                        />
                        <button 
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1.5 rounded-md hover:bg-slate-200/50 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {passwordErrors.confirmPassword && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-red-500 text-xs font-semibold">
                          <AlertTriangle className="w-3.5 h-3.5" /> {passwordErrors.confirmPassword}
                        </div>
                      )}
                    </div>

                  </div>

                  <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                    <button 
                      type="button" 
                      onClick={handleResetPasswordFields} 
                      className="px-6 py-2.5 bg-white ring-1 ring-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-all shadow-sm"
                    >
                      Reset Fields
                    </button>
                    <button type="submit" className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md shadow-indigo-600/20 active:scale-[0.98]">
                      Update Password
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}