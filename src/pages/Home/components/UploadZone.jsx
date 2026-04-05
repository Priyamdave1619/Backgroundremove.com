import React, { useState, useEffect } from 'react';
import Button from '../../../components/common/Button';
import { downloadFile } from '../../../utils/fileHelpers';

export default function UploadZone({ status, fileName, processedUrl, processFile, reset }) {
  const [isDragging, setIsDragging] = useState(false);
  const [loadingText, setLoadingText] = useState('Analyzing pixels...');

  // Processing text animation
  useEffect(() => {
    if (status === 'processing') {
      const texts = ['Analyzing pixels...', 'Separating foreground...', 'Refining edges...', 'Applying magic...'];
      let i = 0;
      const interval = setInterval(() => {
        i = (i + 1) % texts.length;
        setLoadingText(texts[i]);
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [status]);

  // Global Paste Listener
  useEffect(() => {
    const handlePaste = (e) => {
      if (status !== 'processing' && status !== 'done' && e.clipboardData.files.length) {
        const imageFile = Array.from(e.clipboardData.files).find(file => file.type.startsWith('image/'));
        if (imageFile) {
          processFile(imageFile);
        }
      }
    };
    
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [status, processFile]);

  // ==========================================
  // BULLETPROOF DRAG & DROP HANDLERS
  // ==========================================
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Validate it's an image
      const file = Array.from(e.dataTransfer.files).find(f => f.type.startsWith('image/'));
      if (file) {
        processFile(file);
      }
    }
  };

  return (
    <>
      <style>{`
        /* Original Animations */
        @keyframes floatSmooth {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.96) translateY(12px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        
        /* Modern AI & Blob Animations */
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes pulseRing {
          0% { transform: scale(0.7); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes shimmerLine {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(250%); }
        }

        /* Unique New Animations */
        @keyframes gradientXY {
          0%, 100% { background-size: 400% 400%; background-position: 0% 0%; }
          50% { background-size: 200% 200%; background-position: 100% 100%; }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.2; }
          50% { transform: translateY(-25px) scale(1.5); opacity: 0.7; }
        }

        .animate-float-smooth { animation: floatSmooth 4s ease-in-out infinite; will-change: transform; }
        .animate-pop-in { animation: popIn 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards; }
        .animate-blob { animation: blob 7s infinite cubic-bezier(0.4, 0, 0.2, 1); will-change: transform; }
        .animate-pulse-ring { animation: pulseRing 2.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite; }
        .animate-shimmer { animation: shimmerLine 1.5s infinite linear; }
        .animate-gradient-xy { animation: gradientXY 8s ease infinite; }
        .animate-particle { animation: floatParticle 4s ease-in-out infinite; }
        
        /* Delays */
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        
        .force-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        .bg-checkerboard {
          background-color: #f8fafc;
          background-image: 
            linear-gradient(45deg, #e2e8f0 25%, transparent 25%, transparent 75%, #e2e8f0 75%, #e2e8f0),
            linear-gradient(45deg, #e2e8f0 25%, transparent 25%, transparent 75%, #e2e8f0 75%, #e2e8f0);
          background-size: 24px 24px;
          background-position: 0 0, 12px 12px;
        }
      `}</style>

      <div className="relative w-full h-full min-h-[480px] flex flex-col items-center justify-center animate-pop-in font-sans antialiased">
        
        {/* =======================
            STATE 1: PROCESSING 
        ======================= */}
        {status === 'processing' && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] force-gpu">
            <div className="relative w-48 h-48 mb-10 flex items-center justify-center">
              <div className="absolute top-0 -left-4 w-32 h-32 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob force-gpu"></div>
              <div className="absolute top-0 -right-4 w-32 h-32 bg-fuchsia-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000 force-gpu"></div>
              <div className="absolute -bottom-8 left-8 w-32 h-32 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000 force-gpu"></div>

              <div className="absolute inset-0 rounded-full border-[3px] border-indigo-400/40 animate-pulse-ring force-gpu z-0"></div>
              <div className="absolute inset-0 rounded-full border-[3px] border-fuchsia-400/40 animate-pulse-ring animation-delay-1000 force-gpu z-0"></div>

              <div className="relative w-24 h-24 bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] rounded-full flex items-center justify-center z-10 animate-float-smooth">
                <i className="fa-solid fa-wand-magic-sparkles text-4xl bg-gradient-to-br from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-sm"></i>
              </div>
            </div>
            
            <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-fuchsia-700 mb-5 tracking-tight drop-shadow-sm">
              Removing Background
            </h3>

            <div className="flex flex-col items-center w-full max-w-[280px]">
              <div className="w-full bg-white/80 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                  </div>
                  <span className="font-semibold text-slate-700 text-sm tracking-wide">{loadingText}</span>
                </div>
                <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md tracking-widest animate-pulse">AI</span>
              </div>

              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden relative shadow-inner">
                <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>
        )}

        {/* =======================
            STATE 2: DONE (SUCCESS)
        ======================= */}
        {status === 'done' && (
          <div className="w-full flex flex-col h-full animate-pop-in">
            <div className="relative flex-1 rounded-2xl overflow-hidden bg-checkerboard shadow-xl border border-slate-200/80 flex items-center justify-center mb-6 min-h-[340px] group transition-all duration-500 hover:shadow-2xl hover:border-indigo-300">
              <img 
                src={processedUrl} 
                className="h-[85%] w-[85%] object-contain drop-shadow-2xl transition-all duration-700 group-hover:scale-105 group-hover:rotate-1" 
                alt="Transparent result" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none"></div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40 gap-4">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-11 h-11 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl flex items-center justify-center text-emerald-600 border border-emerald-100 shadow-inner">
                  <i className="fa-regular fa-circle-check text-xl"></i>
                </div>
                <div className="overflow-hidden">
                  <p className="font-semibold text-slate-800 truncate max-w-[180px] md:max-w-[240px] text-sm">{fileName || 'transparent-image.png'}</p>
                  <p className="text-xs text-emerald-600 font-medium flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Background removed
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3 w-full sm:w-auto">
                <Button 
                  variant="secondary" 
                  onClick={reset} 
                  className="w-full sm:w-auto bg-slate-100 border-slate-200 hover:bg-slate-200 hover:border-slate-300 text-slate-700 font-medium transition-all rounded-xl px-5 py-2.5"
                >
                  <i className="fa-solid fa-arrow-rotate-left mr-2"></i> Reset
                </Button>
                <Button 
                  onClick={() => downloadFile(processedUrl, 'ClearBG-Transparent.png')} 
                  className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-md shadow-indigo-500/30 border-0 transform hover:-translate-y-0.5 transition-all rounded-xl px-6 py-2.5 font-semibold"
                >
                  <i className="fa-solid fa-download mr-2"></i> Download HD
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* =======================
            STATE 3: DEFAULT (UPLOAD)
        ======================= */}
        {status !== 'processing' && status !== 'done' && (
          <div 
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver} 
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className="w-full h-full relative group"
          >
            {/* Drag Overlay Zone - Elevates to the top while dragging to prevent inner elements from breaking the event */}
            <div className={`absolute inset-0 rounded-2xl border-2 border-dashed transition-all duration-300 ${
              isDragging 
                ? 'border-indigo-400 bg-indigo-50/70 shadow-inner z-50 backdrop-blur-[2px]' 
                : 'border-slate-300 bg-slate-50/50 group-hover:border-indigo-300 group-hover:bg-slate-50/80 z-0'
            }`}>
              {/* Optional: Add a "Drop Now" indicator overlay if dragging */}
              {isDragging && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-indigo-600/20">
                   <i className="fa-solid fa-download text-9xl"></i>
                </div>
              )}
            </div>

            {/* Content Container */}
            <div className={`relative w-full h-full flex flex-col items-center justify-center p-8 transition-all duration-300 ${
              isDragging ? 'scale-[1.02] opacity-0 pointer-events-none' : 'scale-100 z-10 opacity-100'
            }`}>
              
              {/* Unique Hover Particles */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                <div className={`absolute top-1/4 left-1/4 w-4 h-4 bg-indigo-400 rounded-full mix-blend-multiply blur-[2px] transition-all duration-700 animate-particle opacity-0 group-hover:opacity-40`}></div>
                <div className={`absolute bottom-1/3 right-1/4 w-5 h-5 bg-fuchsia-400 rounded-full mix-blend-multiply blur-[2px] transition-all duration-700 animate-particle animation-delay-1000 opacity-0 group-hover:opacity-40`}></div>
                <div className={`absolute top-1/3 right-1/3 w-3 h-3 bg-cyan-400 rounded-full mix-blend-multiply blur-[1px] transition-all duration-700 animate-particle animation-delay-2000 opacity-0 group-hover:opacity-40`}></div>
              </div>

              {/* Dynamic Icon Container */}
              <div className="relative mb-7">
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-fuchsia-500 rounded-full blur-2xl transition-all duration-500 opacity-20 group-hover:opacity-40 group-hover:scale-125"></div>
                <div className="w-24 h-24 rounded-[2rem] flex items-center justify-center transition-all duration-500 shadow-lg relative z-10 bg-white/90 backdrop-blur-xl text-indigo-600 group-hover:-translate-y-2 group-hover:shadow-xl border border-white">
                   <i className="fa-solid fa-layer-group text-4xl"></i>
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2 tracking-tight">
                Summon your image
              </h3>
              
              <p className="text-slate-500 text-sm md:text-base mb-8 text-center max-w-sm">
                Drag & drop your file here, or initiate manual selection. Supports <span className="text-slate-800 font-medium">JPG, PNG, WebP</span>.
              </p>
              
              <input 
                type="file" 
                id="file-upload" 
                className="hidden" 
                accept="image/*" 
                onChange={(e) => { if(e.target.files?.length) processFile(e.target.files[0]) }} 
              />
              
              {/* Light/Glass Action Pill & Keyboard Hint */}
              <div className="flex flex-col items-center gap-5">
                <label 
                  htmlFor="file-upload" 
                  className="group/btn relative cursor-pointer block"
                >
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 opacity-30 group-hover/btn:opacity-100 blur-md transition duration-500 animate-gradient-xy"></div>
                  
                  <div className="relative flex items-center gap-4 px-8 py-4 bg-white/95 backdrop-blur-xl border border-white/50 rounded-2xl leading-none transition-all duration-300 group-hover/btn:scale-[0.98] shadow-sm group-hover/btn:shadow-md">
                    <div className="flex items-center justify-center w-9 h-9 bg-indigo-50 rounded-full text-indigo-600 group-hover/btn:bg-indigo-600 group-hover/btn:text-white transition-colors duration-300 shadow-inner">
                      <i className="fa-solid fa-plus text-sm"></i>
                    </div>
                    <div className="flex flex-col items-start pr-2">
                       <span className="text-slate-800 font-bold tracking-wide text-sm">Select Image</span>
                       <span className="text-slate-500 text-[10px] uppercase tracking-wider font-bold mt-0.5">Max 10MB</span>
                    </div>
                    <div className="pl-4 border-l border-slate-200">
                       <i className="fa-solid fa-arrow-right text-slate-400 group-hover/btn:text-indigo-600 transition-colors group-hover/btn:translate-x-1 duration-300"></i>
                    </div>
                  </div>
                </label>

                {/* Paste Keyboard Shortcut Hint */}
                <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                  <i className="fa-regular fa-paste opacity-70"></i>
                  <span>or paste from clipboard</span>
                  <div className="flex gap-1">
                    <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded-md text-[10px] text-slate-600 shadow-sm font-sans font-bold">Ctrl</kbd>
                    <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded-md text-[10px] text-slate-600 shadow-sm font-sans font-bold">V</kbd>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </>
  );
}