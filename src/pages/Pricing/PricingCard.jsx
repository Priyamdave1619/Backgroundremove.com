import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';

export default function PricingCard({ plan, isYearly }) {
  const { isLoggedIn, setPendingRedirect } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Calculate current price based on toggle
  const price = isYearly ? plan.yearly : plan.monthly;

  const handlePurchase = () => {
    if (!isLoggedIn) {
      showToast(`Please log in to purchase ${plan.name}`, "info");
      setPendingRedirect('/pricing');
      setTimeout(() => navigate('/login'), 1200);
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsDone(true);
      showToast(`Successfully subscribed to ${plan.name}!`, "success");
      setTimeout(() => setIsDone(false), 3000);
    }, 1500);
  };

  return (
    <div className={`relative bg-white p-8 rounded-[2rem] flex flex-col transition-all duration-300 ${
      plan.highlight 
        ? 'border-2 border-primary shadow-2xl shadow-blue-500/20 lg:-mt-4 lg:mb-4' 
        : 'border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1'
    }`}>
      
      {/* Most Popular Badge */}
      {plan.highlight && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-blue-400 text-white px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-md">
          Most Popular
        </div>
      )}

      {/* Header */}
      <h3 className="text-2xl font-extrabold text-dark mb-2">{plan.name}</h3>
      <p className="text-gray-500 text-sm mb-6 h-10">{plan.desc}</p>
      
      {/* Price */}
      <div className="mb-6 flex items-end gap-1">
        <span className="text-5xl font-extrabold text-dark tracking-tighter">${price}</span>
        {plan.monthly > 0 && <span className="text-sm text-gray-400 font-medium mb-2">/mo</span>}
      </div>

      {/* Credit Limits */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
        <div className="flex items-center justify-between text-sm font-bold text-dark mb-2">
          <span>{plan.credits}</span>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{plan.api}</span>
        </div>
      </div>

      {/* Features List */}
      <ul className="space-y-4 mb-8 flex-grow text-sm text-gray-600 font-medium">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.highlight ? 'bg-blue-100 text-primary' : 'bg-gray-100 text-gray-500'}`}>
              <i className="fa-solid fa-check text-[10px]"></i>
            </div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Action Button */}
      <button 
        disabled={isProcessing}
        onClick={handlePurchase} 
        className={`w-full py-3.5 rounded-xl font-bold transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 ${
          isDone 
            ? 'bg-green-500 text-white shadow-lg' 
            : plan.highlight 
              ? 'bg-primary text-white shadow-lg shadow-blue-500/30 hover:bg-blue-600' 
              : 'bg-white border-2 border-gray-200 text-dark hover:border-dark'
        }`}
      >
        {isProcessing ? (
          <><i className="fa-solid fa-circle-notch fa-spin"></i> Processing...</>
        ) : isDone ? (
          <><i className="fa-solid fa-check"></i> Activated</>
        ) : (
          plan.monthly === 0 ? 'Start Free' : 'Subscribe'
        )}
      </button>

    </div>
  );
}