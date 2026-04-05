import React, { useState } from 'react';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  // Form Data State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  // Errors State
  const [errors, setErrors] = useState({});

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear the error for this field once the user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Strict Validation Logic
  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    // Name Regex: Letters, spaces, hyphens, apostrophes (2 to 50 chars)
    const nameRegex = /^[A-Za-z\s\-']{2,50}$/;
    
    // Email Regex: Standard email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // First Name Validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    } else if (!nameRegex.test(formData.firstName.trim())) {
      newErrors.firstName = 'Must be 2-50 characters (letters only)';
      isValid = false;
    }

    // Last Name Validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    } else if (!nameRegex.test(formData.lastName.trim())) {
      newErrors.lastName = 'Must be 2-50 characters (letters only)';
      isValid = false;
    }

    // Email Validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Message Validation
    if (!formData.message.trim()) {
      newErrors.message = 'A message is required';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
      isValid = false;
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message cannot exceed 1000 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Only proceed if the form passes strict validation
    if (validateForm()) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => { 
        setLoading(false); 
        setSent(true); 
      }, 1500);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-bgray min-h-screen relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-dark mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">Have questions about our API, enterprise pricing, or need technical support? Our team is here to help.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-start gap-4 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-blue-50 text-primary rounded-xl flex items-center justify-center text-xl shrink-0"><i className="fa-solid fa-envelope"></i></div>
              <div>
                <h3 className="font-bold text-dark text-lg mb-1">Email Us</h3>
                <p className="text-gray-500 text-sm mb-2">Our friendly team is here to help.</p>
                <a href="mailto:support@clearbg.com" className="text-primary font-semibold hover:underline">support@clearbg.com</a>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-start gap-4 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl shrink-0"><i className="fa-solid fa-location-dot"></i></div>
              <div>
                <h3 className="font-bold text-dark text-lg mb-1">Visit Us</h3>
                <p className="text-gray-500 text-sm mb-2">Come say hello at our office HQ.</p>
                <p className="text-dark font-semibold">100 AI Innovation Way<br />San Francisco, CA 94107</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex items-start gap-4 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center text-xl shrink-0"><i className="fa-solid fa-phone"></i></div>
              <div>
                <h3 className="font-bold text-dark text-lg mb-1">Call Us</h3>
                <p className="text-gray-500 text-sm mb-2">Mon-Fri from 8am to 5pm.</p>
                <a href="tel:+15550000000" className="text-dark font-semibold hover:text-primary transition">+1 (555) 000-0000</a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white">
            {sent ? (
              <div className="text-center py-10 animate-fade-in">
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6"><i className="fa-solid fa-check"></i></div>
                <h3 className="text-2xl font-bold text-dark mb-2">Message Sent!</h3>
                <p className="text-gray-500">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-5 py-3 bg-gray-50 border rounded-xl outline-none transition-all ${
                        errors.firstName ? 'border-red-500 focus:ring-2 focus:ring-red-500/50' : 'border-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary'
                      }`} 
                      placeholder="Jane" 
                    />
                    {errors.firstName && <p className="text-red-500 text-xs font-semibold mt-1.5"><i className="fa-solid fa-circle-exclamation mr-1"></i>{errors.firstName}</p>}
                  </div>
                  
                  {/* Last Name Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-5 py-3 bg-gray-50 border rounded-xl outline-none transition-all ${
                        errors.lastName ? 'border-red-500 focus:ring-2 focus:ring-red-500/50' : 'border-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary'
                      }`} 
                      placeholder="Doe" 
                    />
                    {errors.lastName && <p className="text-red-500 text-xs font-semibold mt-1.5"><i className="fa-solid fa-circle-exclamation mr-1"></i>{errors.lastName}</p>}
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-5 py-3 bg-gray-50 border rounded-xl outline-none transition-all ${
                      errors.email ? 'border-red-500 focus:ring-2 focus:ring-red-500/50' : 'border-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary'
                    }`} 
                    placeholder="jane@company.com" 
                  />
                  {errors.email && <p className="text-red-500 text-xs font-semibold mt-1.5"><i className="fa-solid fa-circle-exclamation mr-1"></i>{errors.email}</p>}
                </div>

                {/* Message Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4" 
                    className={`w-full px-5 py-3 bg-gray-50 border rounded-xl outline-none transition-all resize-none ${
                      errors.message ? 'border-red-500 focus:ring-2 focus:ring-red-500/50' : 'border-gray-200 focus:ring-2 focus:ring-primary/50 focus:border-primary'
                    }`} 
                    placeholder="How can we help you?"
                  ></textarea>
                  <div className="flex justify-between items-center mt-1.5">
                    {errors.message ? (
                      <p className="text-red-500 text-xs font-semibold"><i className="fa-solid fa-circle-exclamation mr-1"></i>{errors.message}</p>
                    ) : <span></span>}
                    <span className={`text-xs font-semibold ${formData.message.length > 1000 ? 'text-red-500' : 'text-gray-400'}`}>
                      {formData.message.length}/1000
                    </span>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {loading ? <i className="fa-solid fa-circle-notch fa-spin text-xl"></i> : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}