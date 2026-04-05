import React from 'react';

export default function Toast({ toast }) {
  return (
    <div className="fixed top-24 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
      <div className={`bg-dark text-white px-6 py-4 rounded-xl shadow-2xl transition-all duration-300 flex items-center gap-3 min-w-[250px] transform ${toast.show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
        <i className={`text-xl ${toast.type === 'error' ? 'fa-solid fa-triangle-exclamation text-red-500' : toast.type === 'success' ? 'fa-solid fa-circle-check text-green-500' : 'fa-solid fa-circle-info text-primary'}`}></i>
        <span className="font-medium text-sm">{toast.message}</span>
      </div>
    </div>
  );
}