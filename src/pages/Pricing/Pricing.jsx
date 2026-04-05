import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PricingCard from './PricingCard'; // Assumes you have this component!

// Enhanced pricing plans
const PREMIUM_PLANS = [
  { id: 'free', name: 'Free', monthly: 0, yearly: 0, desc: 'Perfect for testing our AI.', credits: '5 HD Credits/mo', api: 'Basic Web Access', features: ['Standard resolution', 'Personal use only', 'Community support', 'Watermarked downloads'], highlight: false },
  { id: 'starter', name: 'Starter', monthly: 15, yearly: 12, desc: 'For independent creators.', credits: '100 HD Credits/mo', api: 'Basic API Access', features: ['High resolution (4K)', 'Commercial license', 'Email support', 'No watermarks'], highlight: false },
  { id: 'pro', name: 'Pro', monthly: 39, yearly: 29, desc: 'For scaling businesses.', credits: '1,000 HD Credits/mo', api: 'Full API Access', features: ['Ultra resolution (8K)', 'Priority processing', '24/7 Priority support', 'Webhooks & integrations'], highlight: true },
  { id: 'enterprise', name: 'Enterprise', monthly: 99, yearly: 79, desc: 'For high-volume operations.', credits: 'Unlimited Credits', api: 'Dedicated Node API', features: ['Custom AI model training', 'Dedicated account manager', '99.99% Uptime SLA', 'Custom contract & invoicing'], highlight: false }
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(true);
  
  // State for the interactive pricing calculator
  const [calcVolume, setCalcVolume] = useState(500);

  // Logic for the calculator recommendation
  const getRecommendedPlan = () => {
    if (calcVolume <= 100) return { name: 'Starter Plan', cost: isYearly ? '$12/mo' : '$15/mo' };
    if (calcVolume <= 1000) return { name: 'Pro Plan', cost: isYearly ? '$29/mo' : '$39/mo' };
    return { name: 'Enterprise', cost: 'Custom Pricing' };
  };

  const recommendation = getRecommendedPlan();

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blobBounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        .animate-fade-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .animate-blob-bounce { animation: blobBounce 8s infinite ease-in-out; }
        
        /* Custom Range Slider Styling */
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
          transition: transform 0.1s;
        }
        input[type=range]::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
      `}</style>

      <div className="pt-32 pb-0 bg-bgray min-h-screen relative overflow-hidden text-dark">
        
        {/* 1. HERO & BILLING TOGGLE */}
        <div className="relative z-10 animate-fade-up">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none animate-blob-bounce"></div>
          
          <div className="max-w-7xl mx-auto px-4 text-center mb-16 relative z-10">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
              Simple, transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">pricing</span>
            </h1>
            <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto font-medium">
              Get pixel-perfect background removal at scale. Start for free, upgrade when you need more power.
            </p>

            {/* Billing Toggle with glow */}
            <div className="inline-flex items-center justify-center gap-4 bg-white p-3 rounded-full shadow-lg border border-gray-100">
              <span className={`text-sm font-bold px-4 ${!isYearly ? 'text-dark' : 'text-gray-400'}`}>Monthly</span>
              <button 
                onClick={() => setIsYearly(!isYearly)}
                className="w-16 h-8 bg-dark rounded-full relative flex items-center p-1 cursor-pointer transition-colors"
              >
                <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isYearly ? 'translate-x-8' : 'translate-x-0'}`}></div>
              </button>
              <span className={`text-sm font-bold flex items-center gap-2 pr-4 ${isYearly ? 'text-dark' : 'text-gray-400'}`}>
                Annually <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-extrabold shadow-sm animate-pulse">Save 20%</span>
              </span>
            </div>
          </div>
        </div>

        {/* 2. PRICING CARDS */}
        <div className="max-w-7xl mx-auto px-4 mb-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PREMIUM_PLANS.map((plan, index) => (
              <div key={plan.id} className={`animate-fade-up delay-${(index + 1) * 100}`}>
                <PricingCard plan={plan} isYearly={isYearly} />
              </div>
            ))}
          </div>
        </div>

        {/* 3. TRUST BADGES */}
        <div className="max-w-7xl mx-auto px-4 mb-24 animate-fade-up delay-400">
          <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Trusted by 10,000+ teams worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 cursor-default">
            <span className="font-bold text-xl flex items-center gap-2"><i className="fa-brands fa-shopify text-2xl"></i> Shopify</span>
            <span className="font-bold text-xl flex items-center gap-2"><i className="fa-brands fa-aws text-2xl"></i> AWS</span>
            <span className="font-bold text-xl flex items-center gap-2"><i className="fa-brands fa-figma text-2xl"></i> Figma</span>
            <span className="font-bold text-xl flex items-center gap-2"><i className="fa-brands fa-stripe text-2xl"></i> Stripe</span>
          </div>
        </div>

        {/* 4. NEW: INTERACTIVE PRICING CALCULATOR */}
        <div className="bg-white py-24 border-y border-gray-100 relative overflow-hidden">
          {/* Decorative background shape */}
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
          
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-extrabold text-dark mb-4">Calculate your costs</h2>
              <p className="text-gray-500 text-lg">Drag the slider to estimate your monthly usage.</p>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 p-8 md:p-12">
              <div className="mb-10">
                <div className="flex justify-between items-end mb-4">
                  <span className="font-bold text-gray-500 uppercase tracking-wider text-sm">Images per month</span>
                  <span className="text-4xl font-extrabold text-primary">{calcVolume.toLocaleString()}+</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="5000" 
                  step="10"
                  value={calcVolume} 
                  onChange={(e) => setCalcVolume(Number(e.target.value))}
                  className="w-full h-3 bg-gray-100 rounded-lg appearance-none cursor-pointer outline-none"
                  style={{ background: `linear-gradient(to right, #3b82f6 ${(calcVolume/5000)*100}%, #f3f4f6 ${(calcVolume/5000)*100}%)` }}
                />
                <div className="flex justify-between text-xs font-bold text-gray-400 mt-3">
                  <span>10</span>
                  <span>5,000+</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6 border border-gray-100">
                <div>
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Recommended Plan</p>
                  <h3 className="text-3xl font-extrabold text-dark">{recommendation.name}</h3>
                </div>
                <div className="text-center md:text-right">
                  <div className="text-4xl font-extrabold text-primary mb-1">{recommendation.cost}</div>
                  <p className="text-xs text-gray-500 font-medium">Billed {isYearly ? 'Annually' : 'Monthly'}</p>
                </div>
                <button className="w-full md:w-auto bg-dark text-white font-bold py-3 px-8 rounded-full hover:bg-gray-800 transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 5. NEW: WHO IS THIS FOR? (Personas) */}
        <div className="bg-bgray py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-dark mb-4">Built for every workflow</h2>
              <p className="text-gray-500 text-lg">Whether you're coding an app or running a store, we have a plan for you.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/40 border border-gray-100 group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform"><i className="fa-solid fa-shop"></i></div>
                <h3 className="text-2xl font-bold text-dark mb-3">E-Commerce</h3>
                <p className="text-gray-500 leading-relaxed mb-6">Process thousands of product photos instantly. Create uniform, pure white backgrounds that increase conversion rates on Amazon and Shopify.</p>
                <div className="text-sm font-bold text-dark">Recommended: Starter Plan</div>
              </div>

              <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/40 border border-gray-100 group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform"><i className="fa-solid fa-code"></i></div>
                <h3 className="text-2xl font-bold text-dark mb-3">Developers</h3>
                <p className="text-gray-500 leading-relaxed mb-6">Integrate our REST API with just 3 lines of code. Enjoy 99.99% uptime, comprehensive documentation, and seamless webhooks.</p>
                <div className="text-sm font-bold text-dark">Recommended: Pro Plan</div>
              </div>

              <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/40 border border-gray-100 group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform"><i className="fa-solid fa-pen-nib"></i></div>
                <h3 className="text-2xl font-bold text-dark mb-3">Design Agencies</h3>
                <p className="text-gray-500 leading-relaxed mb-6">Stop wasting hours masking hair manually in Photoshop. Use our Figma and PS plugins to remove backgrounds directly in your canvas.</p>
                <div className="text-sm font-bold text-dark">Recommended: Pro Plan</div>
              </div>
            </div>
          </div>
        </div>

        {/* 6. DEVELOPER API SPOTLIGHT (Dark Mode) - FIXED SYNTAX HIGHLIGHTING */}
        <div className="bg-[#0f172a] py-24 relative overflow-hidden">
          {/* Glowing Accents */}
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-500/20 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6 border border-blue-500/20">
                <i className="fa-solid fa-terminal"></i> Developer API
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Integrate in minutes, <br/>scale to millions.</h2>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                Our REST API is built for speed and reliability. Drop it into your Node.js, Python, or Ruby backend instantly. Every Pro and Enterprise plan includes full API access with global edge caching.
              </p>
              <ul className="space-y-4 mb-8 text-white font-medium">
                <li className="flex items-center gap-3"><i className="fa-solid fa-circle-check text-green-400"></i> Sub 3-second processing latency</li>
                <li className="flex items-center gap-3"><i className="fa-solid fa-circle-check text-green-400"></i> Auto-scaling infrastructure</li>
                <li className="flex items-center gap-3"><i className="fa-solid fa-circle-check text-green-400"></i> Output as base64 or direct URL</li>
              </ul>
              <button className="bg-white text-dark font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-colors">
                Read the Docs
              </button>
            </div>

            {/* Code Block Design */}
            <div className="bg-[#1e293b] rounded-2xl border border-gray-700 shadow-2xl overflow-hidden">
              <div className="flex items-center px-4 py-3 bg-[#0f172a] border-b border-gray-700">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="mx-auto text-xs font-mono text-gray-500">request.js</div>
              </div>
              
              {/* FIXED: Added text-gray-300 so standard punctuation is clearly visible */}
              <div className="p-6 overflow-x-auto text-sm font-mono leading-relaxed text-gray-300">
                <span className="text-purple-400">const</span> <span className="text-blue-400">axios</span> <span className="text-purple-400">=</span> <span className="text-yellow-200">require</span>(<span className="text-green-300">'axios'</span>);<br/><br/>
                
                <span className="text-gray-500">// Initialize API request</span><br/>
                <span className="text-blue-400">axios</span>.<span className="text-yellow-200">post</span>(<span className="text-green-300">'https://api.clearbg.com/v1/remove'</span>, {'{'}<br/>
                &nbsp;&nbsp;<span className="text-blue-200">image_url:</span> <span className="text-green-300">'https://example.com/photo.jpg'</span>,<br/>
                &nbsp;&nbsp;<span className="text-blue-200">size:</span> <span className="text-green-300">'auto'</span><br/>
                {'}'}, {'{'}<br/>
                &nbsp;&nbsp;<span className="text-blue-200">headers:</span> {'{'}<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-300">'X-API-Key'</span>: <span className="text-green-300">'your_api_key_here'</span><br/>
                &nbsp;&nbsp;{'}'}<br/>
                {'}'}).<span className="text-yellow-200">then</span>(<span className="text-orange-200">response</span> <span className="text-purple-400">{'=>'}</span> {'{'}<br/>
                &nbsp;&nbsp;<span className="text-blue-400">console</span>.<span className="text-yellow-200">log</span>(response.data.result_url);<br/>
                {'}'});
              </div>
            </div>
          </div>
        </div>

        {/* 7. COMPREHENSIVE FEATURE COMPARISON */}
        <div className="bg-white py-24 border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-dark mb-4">Compare all features</h2>
              <p className="text-gray-500 text-lg">See exactly what's included in every tier.</p>
            </div>

            <div className="overflow-x-auto bg-white rounded-3xl shadow-xl border border-gray-100">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b-2 border-gray-100 bg-gray-50/50">
                    <th className="py-6 px-6 font-bold text-gray-400 uppercase tracking-wider text-sm w-1/3 rounded-tl-3xl">Features</th>
                    <th className="py-6 px-6 font-extrabold text-dark text-xl text-center">Free</th>
                    <th className="py-6 px-6 font-extrabold text-dark text-xl text-center">Starter</th>
                    <th className="py-6 px-6 font-extrabold text-primary text-xl text-center rounded-tr-3xl">Pro</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600">
                  <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-5 px-6 font-semibold">HD Output Resolution</td>
                    <td className="py-5 px-6 text-center text-gray-400 font-medium">Up to 0.25 MP</td>
                    <td className="py-5 px-6 text-center font-bold">Up to 25 MP</td>
                    <td className="py-5 px-6 text-center font-bold text-primary">Up to 50 MP</td>
                  </tr>
                  <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-5 px-6 font-semibold">API Access</td>
                    <td className="py-5 px-6 text-center text-gray-300"><i className="fa-solid fa-minus"></i></td>
                    <td className="py-5 px-6 text-center text-green-500"><i className="fa-solid fa-check"></i></td>
                    <td className="py-5 px-6 text-center text-green-500"><i className="fa-solid fa-check"></i></td>
                  </tr>
                  <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-5 px-6 font-semibold">Commercial Use License</td>
                    <td className="py-5 px-6 text-center text-gray-300"><i className="fa-solid fa-minus"></i></td>
                    <td className="py-5 px-6 text-center text-green-500"><i className="fa-solid fa-check"></i></td>
                    <td className="py-5 px-6 text-center text-green-500"><i className="fa-solid fa-check"></i></td>
                  </tr>
                  <tr className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-5 px-6 font-semibold">Webhooks & Batch Processing</td>
                    <td className="py-5 px-6 text-center text-gray-300"><i className="fa-solid fa-minus"></i></td>
                    <td className="py-5 px-6 text-center text-gray-300"><i className="fa-solid fa-minus"></i></td>
                    <td className="py-5 px-6 text-center text-green-500"><i className="fa-solid fa-check"></i></td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="py-5 px-6 font-semibold rounded-bl-3xl">Support Tier</td>
                    <td className="py-5 px-6 text-center text-gray-500 font-medium">Community</td>
                    <td className="py-5 px-6 text-center font-bold text-dark">Email (48h)</td>
                    <td className="py-5 px-6 text-center font-bold text-primary rounded-br-3xl">Priority (1h)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 8. NEW: ENTERPRISE SECURITY & COMPLIANCE */}
        <div className="bg-bgray py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-dark mb-4">Enterprise-grade Security</h2>
              <p className="text-gray-500 text-lg">Your data is yours. We treat your intellectual property with the utmost respect.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                <div className="text-4xl text-blue-500 mb-4"><i className="fa-solid fa-lock"></i></div>
                <h4 className="font-bold text-dark mb-2">TLS 1.2 Encryption</h4>
                <p className="text-sm text-gray-500">All data transferred is encrypted in transit and at rest using bank-level security.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                <div className="text-4xl text-green-500 mb-4"><i className="fa-solid fa-trash-can"></i></div>
                <h4 className="font-bold text-dark mb-2">Auto-Deletion</h4>
                <p className="text-sm text-gray-500">Images are permanently deleted from our servers 60 minutes after processing.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                <div className="text-4xl text-purple-500 mb-4"><i className="fa-solid fa-shield-halved"></i></div>
                <h4 className="font-bold text-dark mb-2">GDPR Compliant</h4>
                <p className="text-sm text-gray-500">We fully comply with EU data protection regulations and privacy laws.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                <div className="text-4xl text-orange-500 mb-4"><i className="fa-solid fa-server"></i></div>
                <h4 className="font-bold text-dark mb-2">99.99% Uptime</h4>
                <p className="text-sm text-gray-500">Enterprise plans include a dedicated SLA backed by multiple redundancy nodes.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 9. INTERACTIVE FAQ */}
        <div className="py-24 bg-white border-y border-gray-100">
          <div className="max-w-3xl mx-auto px-4">
            <h3 className="text-3xl md:text-4xl font-extrabold text-dark mb-10 text-center">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <details className="group bg-gray-50 rounded-2xl border border-gray-100 [&_summary::-webkit-details-marker]:hidden hover:shadow-md transition-shadow">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-dark font-semibold text-lg">
                  What counts as one credit?
                  <span className="relative size-5 shrink-0 text-primary">
                    <i className="fa-solid fa-plus absolute inset-0 opacity-100 group-open:opacity-0 transition-opacity"></i>
                    <i className="fa-solid fa-minus absolute inset-0 opacity-0 group-open:opacity-100 transition-opacity"></i>
                  </span>
                </summary>
                <p className="px-6 pb-6 text-gray-500 leading-relaxed border-t border-gray-100 pt-4 mt-2">
                  One credit equals one successful background removal at full high-definition resolution. Preview images (up to 0.25 megapixels) are completely free and do not consume credits. Failed API requests are never charged.
                </p>
              </details>
              <details className="group bg-gray-50 rounded-2xl border border-gray-100 [&_summary::-webkit-details-marker]:hidden hover:shadow-md transition-shadow">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-dark font-semibold text-lg">
                  What happens if I run out of credits?
                  <span className="relative size-5 shrink-0 text-primary">
                    <i className="fa-solid fa-plus absolute inset-0 opacity-100 group-open:opacity-0 transition-opacity"></i>
                    <i className="fa-solid fa-minus absolute inset-0 opacity-0 group-open:opacity-100 transition-opacity"></i>
                  </span>
                </summary>
                <p className="px-6 pb-6 text-gray-500 leading-relaxed border-t border-gray-100 pt-4 mt-2">
                  If you reach your monthly limit, your API requests will be paused safely. You can easily upgrade to a higher tier or purchase a one-time "Pay-as-you-go" credit pack from your dashboard.
                </p>
              </details>
              <details className="group bg-gray-50 rounded-2xl border border-gray-100 [&_summary::-webkit-details-marker]:hidden hover:shadow-md transition-shadow">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-dark font-semibold text-lg">
                  Can I cancel my subscription?
                  <span className="relative size-5 shrink-0 text-primary">
                    <i className="fa-solid fa-plus absolute inset-0 opacity-100 group-open:opacity-0 transition-opacity"></i>
                    <i className="fa-solid fa-minus absolute inset-0 opacity-0 group-open:opacity-100 transition-opacity"></i>
                  </span>
                </summary>
                <p className="px-6 pb-6 text-gray-500 leading-relaxed border-t border-gray-100 pt-4 mt-2">
                  Yes, you can cancel your subscription at any time directly from your billing dashboard. No questions asked. Your credits will remain available until the end of your current billing cycle.
                </p>
              </details>
            </div>
          </div>
        </div>

        {/* 10. ENTERPRISE CTA */}
        <div className="bg-bgray py-24 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <div className="w-20 h-20 bg-dark text-white rounded-[2rem] flex items-center justify-center text-3xl mx-auto mb-6 shadow-2xl shadow-dark/20">
              <i className="fa-solid fa-building-shield"></i>
            </div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Processing millions of images?</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-dark mb-6">Need a custom solution?</h2>
            <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
              Get dedicated node clusters, 99.99% uptime SLA, custom AI model fine-tuning, and volume-based discounts.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-dark text-white font-bold px-10 py-5 rounded-full hover:bg-gray-800 hover:-translate-y-1 transition-all shadow-xl shadow-gray-900/20 text-lg">
              Contact Sales <i className="fa-solid fa-arrow-right text-sm"></i>
            </Link>
          </div>
        </div>

      </div>
    </>
  );
}