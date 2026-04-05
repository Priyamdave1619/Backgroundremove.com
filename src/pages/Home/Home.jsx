import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useImageProcessing } from '../../hooks/useImageProcessing';
import UploadZone from '../../pages/Home/components/UploadZone'; 

// --- Custom Animated Counter Component ---
const AnimatedCounter = ({ end, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 } 
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  },[]);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  },[isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default function Home() {
  const { status, originalUrl, processedUrl, fileName, processFile, processSample, reset } = useImageProcessing();
  const[sliderVal, setSliderVal] = useState(50);
  const sliderRef = useRef(null);

  const handleProcess = async (fileOrUrl, isSample = false) => {
    const success = isSample ? await processSample(fileOrUrl) : await processFile(fileOrUrl);
    if (success) setTimeout(() => sliderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 500);
  };

  const demoImage = 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80'; 
  const apparelImage = 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80'; 
  const bagImage = 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=800&q=80'; 

  const avatar1 = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80';
  const avatar2 = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80';
  const avatar3 = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80';

  return (
    <div className="animate-fade-in bg-white pt-20 md:pt-24 selection:bg-primary/20 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <div className="relative pb-16 md:pb-20 pt-6 md:pt-8">
        {/* Responsive Blobs */}
        <div className="absolute top-0 left-[-10%] md:left-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-[60px] md:blur-[80px] opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-[-10%] md:right-1/4 w-64 h-64 md:w-96 md:h-96 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-[60px] md:blur-[80px] opacity-70 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50/80 backdrop-blur-sm border border-blue-100 text-primary text-[10px] md:text-xs font-extrabold uppercase tracking-widest mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> V2.0 AI Model is Live
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-dark mb-4 md:mb-6 tracking-tight leading-[1.15]">
            Remove Backgrounds <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-purple-600">in 3 seconds.</span>
          </h1>
          
          <p className="text-base sm:text-lg text-gray-500 mb-8 md:mb-10 font-medium max-w-2xl mx-auto leading-relaxed px-2">
            Get pixel-perfect, transparent images instantly. 100% automatically and free. Perfect for products, portraits, and developers.
          </p>
          
          {/* Responsive Upload Box */}
          <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur-2xl rounded-3xl md:rounded-[2rem] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] md:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] p-2 sm:p-4 md:p-8 border border-white relative z-10">
            <UploadZone status={status} fileName={fileName} processedUrl={processedUrl} processFile={(f) => handleProcess(f)} processSample={(u) => handleProcess(u, true)} reset={reset} />
          </div>
        </div>
      </div>

      {/* 2. TRUST BADGES */}
      <div className="border-y border-gray-100 bg-gray-50/50 py-8 md:py-10">
        <p className="text-center text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 md:mb-6 px-4">Trusted by 50,000+ creators and teams</p>
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-16 opacity-40 grayscale font-bold text-lg md:text-xl tracking-tighter items-center px-4">
            <span className="flex items-center gap-1.5 md:gap-2"><i className="fa-brands fa-shopify text-xl md:text-2xl"></i> Shopify</span>
            <span className="flex items-center gap-1.5 md:gap-2"><i className="fa-brands fa-aws text-xl md:text-2xl"></i> AWS</span>
            <span className="flex items-center gap-1.5 md:gap-2"><i className="fa-brands fa-figma text-xl md:text-2xl"></i> Figma</span>
            <span className="flex items-center gap-1.5 md:gap-2"><i className="fa-brands fa-stripe text-xl md:text-2xl"></i> Stripe</span>
            <span className="flex items-center gap-1.5 md:gap-2"><i className="fa-brands fa-react text-xl md:text-2xl"></i> React</span>
        </div>
      </div>

      {/* 3. THE MAGIC (Fixed Slider) */}
      <div ref={sliderRef} className="bg-dark text-white py-16 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-primary/20 blur-[100px] md:blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4 md:mb-6">
              <i className="fa-solid fa-wand-magic-sparkles text-primary"></i> Pixel Perfect
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 md:mb-12 tracking-tight">Stunning Quality. <br className="sm:hidden"/> <span className="text-primary">Every time.</span></h2>
            
            {/* Responsive Slider Height */}
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-700 bg-white group select-none">
                
                {/* AFTER (Solid White Background) */}
                <div className="absolute inset-0 bg-white flex items-center justify-center p-4 sm:p-8 md:p-12">
                    <img src={processedUrl || demoImage} className={`w-full h-full object-contain pointer-events-none ${processedUrl ? 'drop-shadow-2xl' : 'mix-blend-multiply'}`} alt="after" />
                </div>
                
                {/* BEFORE (Original Image) */}
                <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 md:p-12 pointer-events-none bg-white border-r-2 border-white/50" style={{ clipPath: `polygon(0 0, ${sliderVal}% 0, ${sliderVal}% 100%, 0 100%)` }}>
                    {originalUrl ? (
                      <img src={originalUrl} className="w-full h-full object-contain pointer-events-none" alt="before" />
                    ) : (
                      <img src={demoImage} className="w-full h-full object-contain pointer-events-none relative z-10" alt="before" />
                    )}
                </div>
                
                {/* Drag Handle & Input */}
                <input type="range" min="0" max="100" value={sliderVal} onChange={(e) => setSliderVal(e.target.value)} className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20 touch-pan-y" />
                <div className="absolute top-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.3)] text-dark z-10 pointer-events-none transition-transform transform -translate-y-1/2 group-hover:scale-110" style={{ left: `calc(${sliderVal}% - ${window.innerWidth < 768 ? '20px' : '24px'})` }}>
                    <i className="fa-solid fa-arrows-left-right text-sm md:text-base"></i>
                </div>
            </div>
        </div>
      </div>

      {/* 4. PERFORMANCE & SCALE */}
      <div className="py-16 md:py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.3)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            <div>
              <div className="text-4xl sm:text-5xl lg:text-7xl font-black mb-1 md:mb-2"><AnimatedCounter end={50} suffix="M" duration={2500} /></div>
              <div className="text-white/80 font-bold tracking-widest uppercase text-[10px] sm:text-xs">Processed</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl lg:text-7xl font-black mb-1 md:mb-2"><AnimatedCounter end={3} suffix="s" duration={2500} /></div>
              <div className="text-white/80 font-bold tracking-widest uppercase text-[10px] sm:text-xs">Avg Speed</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl lg:text-7xl font-black mb-1 md:mb-2"><AnimatedCounter end={99} suffix="%" duration={2500} /></div>
              <div className="text-white/80 font-bold tracking-widest uppercase text-[10px] sm:text-xs">Uptime</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl lg:text-7xl font-black mb-1 md:mb-2"><AnimatedCounter end={10} suffix="k+" duration={2500} /></div>
              <div className="text-white/80 font-bold tracking-widest uppercase text-[10px] sm:text-xs">Creators</div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. HOW IT WORKS */}
      <div className="bg-white py-16 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 text-purple-600 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4 md:mb-6">Effortless Workflow</div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark mb-3 md:mb-4">As simple as 1, 2, 3</h2>
            <p className="text-gray-500 text-base md:text-xl max-w-2xl mx-auto">No complex tools or tutorials needed. Just drag, drop, and done.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 relative">
            <div className="hidden md:block absolute top-12 lg:top-16 left-[15%] right-[15%] h-1 bg-gradient-to-r from-blue-100 via-purple-100 to-green-100 z-0"></div>

            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white border-4 border-blue-50 shadow-lg md:shadow-xl flex items-center justify-center text-2xl md:text-3xl text-blue-500 mb-6 md:mb-8 group-hover:scale-110 group-hover:border-blue-100 transition-all duration-300">
                <i className="fa-solid fa-cloud-arrow-up"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-dark mb-2 md:mb-3">1. Upload</h3>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed px-4 md:px-0">Drag and drop your image, paste a URL, or upload from your device.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white border-4 border-purple-50 shadow-lg md:shadow-xl flex items-center justify-center text-2xl md:text-3xl text-purple-500 mb-6 md:mb-8 group-hover:scale-110 group-hover:border-purple-100 transition-all duration-300">
                <i className="fa-solid fa-microchip"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-dark mb-2 md:mb-3">2. AI Magic</h3>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed px-4 md:px-0">Our AI instantly analyzes the image, separating the subject perfectly.</p>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white border-4 border-green-50 shadow-lg md:shadow-xl flex items-center justify-center text-2xl md:text-3xl text-green-500 mb-6 md:mb-8 group-hover:scale-110 group-hover:border-green-100 transition-all duration-300">
                <i className="fa-solid fa-download"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-dark mb-2 md:mb-3">3. Download</h3>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed px-4 md:px-0">Download your transparent PNG image, ready to use anywhere.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. USE CASES GRID */}
      <div className="bg-gray-50 py-16 md:py-24 lg:py-32 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark mb-4 md:mb-6">Perfect for every workflow</h2>
            <p className="text-gray-500 text-base md:text-xl max-w-2xl mx-auto">Our AI handles hair, fur, and complex edges effortlessly. Built for pros, easy for everyone.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { img: demoImage, title: "E-Commerce", desc: "Create clean product listings that convert better on Shopify, Amazon, and eBay." },
              { img: apparelImage, title: "Apparel & Fashion", desc: "Perfect edge detection for clothing. Stop wasting hours masking." },
              { img: bagImage, title: "Photography", desc: "Remove messy backgrounds from photo shoots and replace them instantly." }
            ].map((useCase, idx) => (
              <div key={idx} className="bg-white rounded-2xl md:rounded-[2rem] p-6 md:p-8 border border-gray-100 shadow-xl shadow-gray-200/50 hover:-translate-y-2 transition-transform duration-500 group">
                <div className="h-48 md:h-56 rounded-xl md:rounded-3xl bg-white mb-6 md:mb-8 relative overflow-hidden flex items-center justify-center border border-gray-100">
                  <img src={useCase.img} className="w-[80%] h-[80%] object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply" alt={useCase.title} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-dark mb-2 md:mb-3">{useCase.title}</h3>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed">{useCase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7. INTEGRATIONS */}
      <div className="bg-[#0f172a] py-16 md:py-24 lg:py-32 relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-500/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-400 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4 md:mb-6">
                <i className="fa-solid fa-puzzle-piece"></i> Plugins & Apps
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 md:mb-6 leading-tight">Work directly inside <br className="hidden lg:block"/> your favorite tools.</h2>
              <p className="text-base md:text-lg text-gray-400 mb-6 md:mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Why switch tabs? We've built native integrations for the design and e-commerce tools you already use every single day.
              </p>
              <button className="w-full sm:w-auto bg-white text-dark font-bold py-3 md:py-4 px-6 md:px-8 rounded-full hover:bg-gray-200 transition-colors">
                Browse all plugins
              </button>
            </div>

            <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {[
                { icon: "fa-figma", color: "text-[#F24E1E]", title: "Figma Plugin", desc: "Remove backgrounds inside your Figma canvas." },
                { icon: "fa-camera-retro", color: "text-[#31A8FF]", title: "Photoshop", desc: "Enhance workflow with native Adobe extension." },
                { icon: "fa-chrome", color: "text-[#F4C145]", title: "Chrome Ext.", desc: "Right-click any web image to remove background." },
                { icon: "fa-desktop", color: "text-gray-300", title: "Mac & Win", desc: "Batch process images directly from your desktop." }
              ].map((plugin, idx) => (
                <div key={idx} className="bg-[#1e293b]/80 backdrop-blur-sm p-5 md:p-6 rounded-xl md:rounded-2xl border border-gray-700/50 hover:border-gray-500 hover:-translate-y-1 transition-all cursor-pointer group flex items-start gap-4 sm:block">
                  <div className={`w-10 h-10 md:w-12 md:h-12 shrink-0 bg-gray-800 rounded-lg md:rounded-xl flex items-center justify-center text-xl md:text-2xl sm:mb-4 group-hover:scale-110 transition-transform ${plugin.icon.includes('brands') ? 'fa-brands' : 'fa-solid'} ${plugin.icon} ${plugin.color}`}></div>
                  <div>
                    <h4 className="font-bold text-base md:text-lg mb-1 md:mb-2 text-white">{plugin.title}</h4>
                    <p className="text-xs md:text-sm text-gray-400">{plugin.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 8. WHY CHOOSE US */}
      <div className="bg-white py-16 md:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center sm:text-left">
            {[
              { icon: "fa-bolt", bg: "bg-blue-100", text: "text-blue-600", title: "Instant Results", desc: "Get your perfect cutouts in less than 3 seconds." },
              { icon: "fa-scissors", bg: "bg-purple-100", text: "text-purple-600", title: "Hair & Edges", desc: "We handle complex details like human hair and fur perfectly." },
              { icon: "fa-images", bg: "bg-green-100", text: "text-green-600", title: "High Resolution", desc: "Support up to 25-megapixel image outputs without losing quality." },
              { icon: "fa-shield-halved", bg: "bg-orange-100", text: "text-orange-600", title: "100% Private", desc: "Files are encrypted and permanently deleted after 60 mins." }
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center sm:items-start">
                <div className={`w-12 h-12 md:w-16 md:h-16 ${feature.bg} ${feature.text} rounded-xl md:rounded-2xl flex items-center justify-center text-xl md:text-2xl mb-4 md:mb-6`}><i className={`fa-solid ${feature.icon}`}></i></div>
                <h4 className="font-bold text-dark text-lg md:text-xl mb-2 md:mb-3">{feature.title}</h4>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 9. TESTIMONIALS */}
      <div className="bg-bgray py-16 md:py-24 lg:py-32 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-dark mb-3 md:mb-4">Loved by creators</h2>
            <p className="text-gray-500 text-base md:text-xl">Don't just take our word for it.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { img: avatar1, name: "Sarah Jenkins", role: "E-commerce Owner", quote: "This tool has saved me hours. I used to manually mask images. Now I just drop them in and get perfect results." },
              { img: avatar2, name: "David Chen", role: "Graphic Designer", quote: "The edge detection on hair is mind-blowing. I've tried other AI tools, but this one delivers the cleanest cutouts." },
              { img: avatar3, name: "Marcus Thompson", role: "UI/UX Designer", quote: "The Figma plugin is flawless. Being able to remove backgrounds without leaving my canvas is a game changer." }
            ].map((review, idx) => (
              <div key={idx} className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-[2rem] shadow-lg shadow-gray-200/40 border border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-yellow-400 mb-4 md:mb-6 text-sm md:text-base">
                    <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                  </div>
                  <p className="text-gray-600 mb-6 md:mb-8 leading-relaxed text-sm md:text-base italic">"{review.quote}"</p>
                </div>
                <div className="flex items-center gap-3 md:gap-4 border-t border-gray-100 pt-4 md:pt-6">
                  <img src={review.img} alt="User" className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-dark text-sm md:text-base">{review.name}</h4>
                    <p className="text-xs md:text-sm text-gray-500">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 10. MEGA CTA */}
      <div className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-white border-t border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/50"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="w-16 h-16 md:w-24 md:h-24 bg-primary text-white rounded-2xl md:rounded-[2rem] shadow-2xl shadow-blue-500/30 flex items-center justify-center text-2xl md:text-4xl mx-auto mb-6 md:mb-8 transform -rotate-6">
            <i className="fa-solid fa-rocket"></i>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-dark mb-4 md:mb-6 tracking-tight">Ready to save hours?</h2>
          <p className="text-lg md:text-2xl text-gray-500 mb-8 md:mb-12 max-w-2xl mx-auto">Join millions of creators scaling their workflow today. Stop masking, start creating.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-full sm:w-auto bg-primary text-white text-lg md:text-xl font-bold px-8 py-4 md:px-12 md:py-5 rounded-full shadow-xl shadow-blue-500/30 hover:bg-blue-600 hover:-translate-y-1 transition-all">
              Upload Free
            </button>
            <Link to="/pricing" className="w-full sm:w-auto bg-white border-2 border-gray-200 text-dark text-lg md:text-xl font-bold px-8 py-4 md:px-12 md:py-5 rounded-full hover:border-gray-300 hover:bg-gray-50 transition-all">
              View Pricing
            </Link>
          </div>
          <p className="mt-6 text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">No credit card required</p>
        </div>
      </div>

    </div>
  );
}