import React from 'react';

export default function Button({ children, onClick, variant = 'primary', isLoading, className = '', disabled }) {
  const baseStyle = "py-3 px-6 rounded-full font-semibold transition active:scale-95 flex items-center justify-center";
  const variants = {
    primary: "bg-primary text-white hover:bg-blue-700 shadow-md",
    secondary: "bg-gray-100 text-dark hover:bg-gray-200",
    outline: "border border-primary text-primary hover:bg-blue-50"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled || isLoading}
      className={`${baseStyle} ${variants[variant]} ${disabled || isLoading ? 'opacity-70 cursor-not-allowed' : ''} ${className}`}
    >
      {isLoading ? <><i className="fa-solid fa-circle-notch fa-spin mr-2"></i> Processing...</> : children}
    </button>
  );
}