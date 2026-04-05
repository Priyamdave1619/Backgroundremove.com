import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function BulkApi() {
  const [activeTab, setActiveTab] = useState('remove-background');

  const sidebarLinks = [
    { id: 'remove-background', label: 'Remove Background' },
    { id: 'core-technology', label: 'Core Technology' },
    { id: 'easy-to-integrate', label: 'Integration & Architecture' },
    { id: 'get-started', label: 'Get Started' },
    { id: 'sample-code', label: 'Code Snippets & Examples' },
    { id: 'libraries-tools', label: 'SDKs & Libraries' },
    { id: 'output-formats', label: 'Advanced Output Formats' },
    { id: 'how-to-use-zip', label: 'Bulk Processing (ZIP)' },
    { id: 'oauth', label: 'OAuth 2.0 & Security' },
    { id: 'api-reference', label: 'API Reference (Deep Dive)' },
    { id: 'error-handling', label: 'Error Codes & Handling' },
    { id: 'rate-limit', label: 'Rate Limits & Concurrency' },
    { id: 'exponential-backoff', label: 'Exponential Backoff' },
    { id: 'api-changelog', label: 'API Changelog' },
  ];

  const handleScrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = window.innerWidth < 768 ? 140 : 120;
      const y = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = sidebarLinks.length - 1; i >= 0; i--) {
        const section = document.getElementById(sidebarLinks[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          if (activeTab !== sidebarLinks[i].id) {
            setActiveTab(sidebarLinks[i].id);
          }
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab, sidebarLinks]);

  // Auto-scroll the mobile horizontal navigation to keep the active tab visible
  useEffect(() => {
    const navContainer = document.getElementById('mobile-nav-container');
    const activeBtn = document.getElementById(`nav-${activeTab}`);

    if (window.innerWidth < 768 && navContainer && activeBtn) {
      // Calculates position to scroll the active button to the center of the screen
      const scrollPos = activeBtn.offsetLeft - (navContainer.offsetWidth / 2) + (activeBtn.offsetWidth / 2);
      navContainer.scrollTo({ left: scrollPos, behavior: 'smooth' });
    }
  }, [activeTab]);

  return (
    <>
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Animation Keyframes for Hero Graphic */
        @keyframes slide-pipeline {
          0% { transform: translate(-160px, -50%); opacity: 0; }
          15% { transform: translate(-80px, -50%); opacity: 1; }
          40% { transform: translate(0px, -50%); opacity: 1; }
          60% { transform: translate(0px, -50%); opacity: 1; }
          85% { transform: translate(90px, -50%); opacity: 1; }
          100% { transform: translate(140px, -50%); opacity: 0; }
        }

        @keyframes dissolve-bg {
          0%, 45% { 
            background-color: white; 
            border-color: #e5e7eb; 
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); 
          }
          55%, 100% { 
            background-color: transparent; 
            border-color: transparent; 
            box-shadow: none; 
          }
        }

        @keyframes laser-scan {
          0%, 40% { top: -10%; opacity: 0; }
          45% { opacity: 1; }
          55% { top: 110%; opacity: 1; }
          60%, 100% { top: 110%; opacity: 0; }
        }

        @keyframes flow-line {
          to { stroke-dashoffset: -20; }
        }

        @keyframes float-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .animate-slide-pipeline { animation: slide-pipeline 4s ease-in-out infinite; }
        .animate-dissolve-bg { animation: dissolve-bg 4s ease-in-out infinite; }
        .animate-laser-scan { animation: laser-scan 4s linear infinite; }
        .animate-flow-line { animation: flow-line 1s linear infinite; }
        .float-delay-1 { animation: float-gentle 6s ease-in-out infinite; }
        .float-delay-2 { animation: float-gentle 6s ease-in-out infinite 3s; }
      `}</style>

      {/* 100% Width Container with fluid padding */}
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-20 md:pt-28 pb-16 flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-16">

        {/* Navigation - Full Width on Mobile & Improved Swiping */}
        <aside className="self-stretch -mx-4 sm:-mx-6 md:mx-0 md:w-64 lg:w-72 xl:w-80 flex-shrink-0 sticky top-[60px] md:top-28 z-40 bg-white/95 backdrop-blur md:bg-transparent py-3 md:py-0 border-b border-gray-100 md:border-none shadow-sm md:shadow-none">
          <div className="md:sticky md:top-28">
            <h2 className="hidden md:block text-2xl font-black text-gray-900 mb-8 px-4 tracking-tight">ClearBG <span className="text-[#5A4BFF]">API</span></h2>

            <nav
              id="mobile-nav-container"
              className="flex flex-row md:flex-col gap-2 md:space-y-1 h-auto md:h-[75vh] overflow-x-auto md:overflow-y-auto no-scrollbar pb-1 md:pb-10 items-center md:items-stretch px-4 sm:px-6 md:px-0 overscroll-x-contain touch-pan-x"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {sidebarLinks.map((link) => (
                <button
                  key={link.id}
                  id={`nav-${link.id}`}
                  onClick={() => handleScrollToSection(link.id)}
                  className={`flex-shrink-0 whitespace-nowrap md:whitespace-normal text-left px-5 py-2.5 md:py-3 rounded-full md:rounded-lg text-sm font-semibold transition-all duration-300 ${activeTab === link.id
                    ? 'bg-[#5A4BFF] text-white shadow-md shadow-[#5A4BFF]/25 md:translate-x-1'
                    : 'text-gray-600 md:text-gray-700 bg-gray-50 md:bg-transparent hover:bg-[#F0EEFF] hover:text-[#5A4BFF]'
                    }`}
                >
                  {link.label}
                </button>
              ))}
              {/* Spacer element: Ensures the last item has padding on the right when scrolled */}
              <div className="w-2 sm:w-4 md:hidden flex-shrink-0"></div>
            </nav>
          </div>
        </aside>

        {/* Main Content Area - Fluid Flex */}
        <div className="flex-1 w-full md:border-l md:border-gray-100 md:pl-10 lg:pl-16 xl:pl-20 pb-32 pt-4 md:pt-0">

          <div className="max-w-4xl lg:max-w-5xl 2xl:max-w-7xl">

            {/* SECTION 1: Remove Background (Hero) */}
            <section id="remove-background" className="mb-20 md:mb-28">
              <div className="flex flex-col xl:flex-row items-center gap-12 lg:gap-16">

                {/* Left Side: Typography & Buttons */}
                <div className="flex-1 space-y-5 md:space-y-6 w-full text-center xl:text-left z-10">
                  {/* Badge */}
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#F0EEFF] text-[#5A4BFF] text-xs font-bold tracking-wide">
                    Enterprise-Grade API
                  </div>

                  {/* Heading - Scaled down and natural text wrapping */}
                  <h1 className="text-4xl md:text-[2.75rem] lg:text-5xl font-[900] text-[#0F172A] leading-[1.15] tracking-tight max-w-2xl mx-auto xl:mx-0">
                    Remove Backgrounds Automatically at <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5A4BFF] to-[#00D4FF]">Massive Scale</span>
                  </h1>

                  {/* Description - Scaled down text size */}
                  <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto xl:mx-0 font-medium">
                    Explore our high-performance, low-latency <strong>Background Removal API</strong> documentation. Designed for developers building next-generation e-commerce platforms, user-generated content moderation pipelines, and fully automated photo editing tools.
                  </p>

                  {/* Buttons - Using the exact purple theme color */}
                  <div className="pt-2 flex flex-col sm:flex-row justify-center xl:justify-start items-center gap-3">
                    <button className="w-full sm:w-[160px] py-3.5 flex flex-col items-center justify-center bg-[#5A4BFF] hover:bg-[#4A3BDE] text-white text-sm font-extrabold rounded-[2rem] transition-transform active:scale-95 shadow-[0_8px_20px_-6px_rgba(90,75,255,0.4)] leading-tight">
                      <span>Generate API</span>
                      <span>Key</span>
                    </button>
                    <button className="w-full sm:w-[160px] py-3.5 flex flex-col items-center justify-center bg-white hover:bg-gray-50 text-[#0F172A] border-[1.5px] border-[#E2E8F0] text-sm font-extrabold rounded-[2rem] transition-colors leading-tight">
                      <span>View</span>
                      <span>Sandbox</span>
                    </button>
                  </div>
                </div>

                {/* Right Side: Animated Processing Graphic */}
                <div className="flex-1 w-full max-w-[500px] xl:max-w-none relative mt-10 xl:mt-0 hidden md:block">
                  <div className="relative w-full aspect-square sm:h-[450px] sm:aspect-auto bg-[#F6F9FC] rounded-[2.5rem] flex items-center justify-center overflow-hidden">

                    <svg className="absolute top-1/2 left-[15%] right-[15%] w-[70%] h-2 -translate-y-1/2 z-0" overflow="visible">
                      <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="6 6" className="animate-flow-line" />
                    </svg>

                    <div className="absolute left-[8%] sm:left-[10%] top-1/2 -translate-y-1/2 w-28 h-28 sm:w-32 sm:h-32 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex flex-col items-center justify-center gap-3 z-10 float-delay-1">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full"></div>
                      <div className="w-12 h-2.5 sm:w-16 sm:h-3 bg-gray-100 rounded-full"></div>
                    </div>

                    <div className="absolute right-[8%] sm:right-[10%] top-1/2 -translate-y-1/2 w-40 h-40 sm:w-48 sm:h-48 bg-gradient-to-br from-[#5A4BFF] to-[#00D4FF] rounded-[1.5rem] shadow-[0_20px_40px_rgba(90,75,255,0.25)] flex items-center justify-center z-10 overflow-hidden float-delay-2">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-inner"></div>
                    </div>

                    <div className="absolute top-1/2 left-1/2 w-20 h-24 sm:w-24 sm:h-28 -ml-10 sm:-ml-12 border rounded-xl flex items-center justify-center z-30 animate-slide-pipeline animate-dissolve-bg overflow-hidden">
                      <div className="absolute left-0 right-0 h-[2px] bg-[#00D4FF] shadow-[0_0_8px_2px_#00D4FF] z-40 animate-laser-scan"></div>
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full"></div>
                        <div className="w-10 h-2 sm:w-12 sm:h-2.5 bg-gray-300 rounded-full"></div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </section>

            <hr className="border-gray-200 my-16" />

            {/* SECTION: Core Technology */}
            <section id="core-technology" className="mb-20 md:mb-28">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Core Technology</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                ClearBG doesn't just erase white pixels. We utilize a proprietary semantic segmentation neural network trained on over 50 million diverse images. This ensures flawless foreground extraction even in the most challenging scenarios.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-6">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Sub-Pixel Matting</h3>
                  <p className="text-gray-600 leading-relaxed">Our advanced matting algorithm captures semi-transparent details perfectly. Hair, fur, glass, and liquid edges are processed with sub-pixel accuracy, preventing the dreaded "halo" or jagged edges common in legacy tools.</p>
                </div>
                <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-sm">
                  <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center mb-6">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Ultra-Low Latency</h3>
                  <p className="text-gray-600 leading-relaxed">Deployed on high-end edge GPU clusters across North America, Europe, and Asia. Most requests complete in under 400ms, making it fully suitable for real-time user-facing applications.</p>
                </div>
              </div>
            </section>

            <hr className="border-gray-200 my-16" />

            {/* SECTION 2: Easy to integrate */}
            <section id="easy-to-integrate" className="mb-20 md:mb-28">
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                <div className="flex-1 space-y-6">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Integration & Architecture</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Designed around RESTful principles, our API can easily slide into virtually any tech stack. You control how data flows in and out of the system.
                  </p>

                  <div className="space-y-6 pt-4">
                    <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                      <h3 className="text-lg font-bold text-gray-900">1. Data Ingestion (Inputs)</h3>
                      <p className="text-gray-600 mt-2">
                        We support standard <code className="text-sm bg-white border border-gray-200 px-1 py-0.5 rounded">multipart/form-data</code> for direct binary uploads (up to 25MB), base64 encoded strings for JSON payloads, or public URL references. If you pass a URL, our servers fetch the image directly, saving your server bandwidth.
                      </p>
                    </div>
                    <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                      <h3 className="text-lg font-bold text-gray-900">2. Processing Modes</h3>
                      <p className="text-gray-600 mt-2">
                        <strong>Synchronous:</strong> The API holds the connection open and returns the processed image directly. Ideal for single-image, real-time requests. <br /><br />
                        <strong>Asynchronous (Enterprise):</strong> Submit a batch of up to 10,000 URLs and receive a Webhook callback when the entire job completes.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center lg:pt-0">
                  <div className="w-full bg-gray-900 rounded-xl overflow-hidden shadow-2xl shadow-indigo-900/10 border border-gray-800">
                    <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <span className="text-xs text-gray-400 font-mono">cURL Request</span>
                    </div>
                    <div className="p-6 md:p-8 overflow-x-auto no-scrollbar">
                      <pre className="text-sm font-mono text-gray-300 leading-relaxed whitespace-pre">
                        <span className="text-[#5A4BFF]">$</span> curl -X POST https://api.clearbg.com/v1.0/removebg \
                        <br />  -H <span className="text-green-400">'X-API-Key: YOUR_API_KEY'</span> \
                        <br />  -F <span className="text-green-400">'image_file=@/local/path/shoes.jpg'</span> \
                        <br />  -F <span className="text-green-400">'size=auto'</span> \
                        <br />  -F <span className="text-green-400">'format=png'</span> \
                        <br />  -F <span className="text-green-400">'add_shadow=true'</span> \
                        <br />  -o output_transparent.png
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-gray-200 my-16" />

            {/* SECTION 4: Sample Code */}
            <section id="sample-code" className="mb-20 md:mb-28">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Code Snippets & Examples</h2>
              <p className="text-lg text-gray-600 mb-10 max-w-4xl leading-relaxed">
                We've built robust examples for common backend languages. Below is a production-ready snippet for Node.js using Axios, demonstrating how to stream files securely without loading large binaries into memory.
              </p>

              <div className="w-full bg-[#0d1117] rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
                <div className="bg-[#161b22] px-6 py-4 border-b border-gray-800 flex justify-between items-center">
                  <span className="text-sm text-gray-300 font-mono font-medium">Node.js (Axios Streaming)</span>
                  <button className="text-xs text-gray-400 hover:text-white transition-colors bg-gray-800 px-3 py-1.5 rounded-md border border-gray-700">Copy Code</button>
                </div>
                <div className="p-6 md:p-8 overflow-x-auto no-scrollbar">
                  <pre className="text-sm md:text-base font-mono text-gray-300 whitespace-pre leading-[1.6]">
                    <span className="text-[#ff7b72]">const</span> axios = <span className="text-[#d2a8ff]">require</span>(<span className="text-[#a5d6ff]">'axios'</span>);{'\n'}
                    <span className="text-[#ff7b72]">const</span> FormData = <span className="text-[#d2a8ff]">require</span>(<span className="text-[#a5d6ff]">'form-data'</span>);{'\n'}
                    <span className="text-[#ff7b72]">const</span> fs = <span className="text-[#d2a8ff]">require</span>(<span className="text-[#a5d6ff]">'fs'</span>);{'\n\n'}
                    <span className="text-[#8b949e]">// 1. Initialize FormData instance</span>{'\n'}
                    <span className="text-[#ff7b72]">const</span> formData = <span className="text-[#ff7b72]">new</span> <span className="text-[#d2a8ff]">FormData</span>();{'\n'}
                    formData.<span className="text-[#d2a8ff]">append</span>(<span className="text-[#a5d6ff]">'size'</span>, <span className="text-[#a5d6ff]">'auto'</span>);{'\n'}
                    formData.<span className="text-[#d2a8ff]">append</span>(<span className="text-[#a5d6ff]">'format'</span>, <span className="text-[#a5d6ff]">'webp'</span>); <span className="text-[#8b949e]">// WebP saves 40% bandwidth vs PNG</span>{'\n'}
                    <span className="text-[#8b949e]">// Stream the file instead of reading entirely to RAM</span>{'\n'}
                    formData.<span className="text-[#d2a8ff]">append</span>(<span className="text-[#a5d6ff]">'image_file'</span>, fs.<span className="text-[#d2a8ff]">createReadStream</span>(<span className="text-[#a5d6ff]">'/path/to/product.jpg'</span>));{'\n\n'}
                    <span className="text-[#8b949e]">// 2. Execute POST Request</span>{'\n'}
                    axios({'{'}{'\n'}
                    {'  '}<span className="text-[#79c0ff]">method</span>: <span className="text-[#a5d6ff]">'post'</span>,{'\n'}
                    {'  '}<span className="text-[#79c0ff]">url</span>: <span className="text-[#a5d6ff]">'https://api.clearbg.com/v1.0/removebg'</span>,{'\n'}
                    {'  '}<span className="text-[#79c0ff]">data</span>: formData,{'\n'}
                    {'  '}<span className="text-[#79c0ff]">responseType</span>: <span className="text-[#a5d6ff]">'stream'</span>, <span className="text-[#8b949e]">// Highly recommended for large outputs</span>{'\n'}
                    {'  '}<span className="text-[#79c0ff]">headers</span>: {'{'}...formData.<span className="text-[#d2a8ff]">getHeaders</span>(),{'\n'}
                    {'    '}<span className="text-[#a5d6ff]">'X-Api-Key'</span>: process.env.CLEARBG_API_KEY{'\n'}
                    {'  '}{'}'}{'\n'}
                    {'}'}).<span className="text-[#d2a8ff]">then</span>((response) ={'>'} {'{'}{'\n'}
                    {'  '}<span className="text-[#8b949e]">// 3. Pipe the streamed response to a file</span>{'\n'}
                    {'  '}response.data.<span className="text-[#d2a8ff]">pipe</span>(fs.<span className="text-[#d2a8ff]">createWriteStream</span>(<span className="text-[#a5d6ff]">'output-no-bg.webp'</span>));{'\n'}
                    {'  '}response.data.<span className="text-[#d2a8ff]">on</span>(<span className="text-[#a5d6ff]">'end'</span>, () ={'>'} console.<span className="text-[#d2a8ff]">log</span>(<span className="text-[#a5d6ff]">'File saved successfully!'</span>));{'\n'}
                    {'}'}).<span className="text-[#d2a8ff]">catch</span>(error ={'>'} {'{'}{'\n'}
                    {'  '}console.<span className="text-[#d2a8ff]">error</span>(<span className="text-[#a5d6ff]">'API Error:'</span>, error.response?.status, error.response?.data);{'\n'}
                    {'}'});
                  </pre>
                </div>
              </div>
            </section>

            <hr className="border-gray-200 my-16" />

            {/* SECTION 5: Libraries + Tools */}
            <section id="libraries-tools" className="mb-20 md:mb-28">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Official SDKs & Libraries</h2>
              <p className="text-lg text-gray-600 mb-10 max-w-4xl leading-relaxed">
                Why write boilerplate? Our official SDKs handle multipart form construction, streaming, exponential backoff retries, and comprehensive TypeScript typings out of the box. Accelerate your development cycle with our maintained packages.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6 text-center">
                {['Node.js', 'Python', 'PHP', 'Ruby', 'Java', 'Go', 'Rust', 'React', 'Figma Plugin', 'Photoshop'].map((tech) => (
                  <div key={tech} className="py-5 px-3 border border-gray-200 rounded-xl bg-white hover:bg-[#F0EEFF] hover:border-[#C4B5FD] hover:shadow-md transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group">
                    <span className="text-gray-800 font-bold group-hover:text-[#5A4BFF]">{tech}</span>
                    <span className="text-xs text-gray-500 group-hover:text-[#5A4BFF]/80">{['Photoshop', 'Figma Plugin'].includes(tech) ? 'Integration' : 'Official SDK'}</span>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-gray-200 my-16" />

            {/* SECTION 6: Output Formats */}
            <section id="output-formats" className="mb-20 md:mb-28">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Advanced Output Formats</h2>
              <p className="text-lg text-gray-600 mb-10 max-w-4xl leading-relaxed">
                Depending on your downstream pipeline, you might need different file architectures. Pass the <code className="bg-gray-100 px-2 py-1 rounded text-sm text-pink-600 border border-gray-200">format</code> parameter to instruct our servers on how to encode the final image.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-[#F0EEFF] text-[#5A4BFF] px-4 py-1.5 rounded-full font-black text-sm tracking-wide">PNG</span>
                    <span className="text-gray-400 text-sm font-medium">Default</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Lossless Transparency</h3>
                  <p className="text-gray-600 leading-relaxed">The industry standard. Retains 100% of the image data losslessly with an 8-bit alpha channel. Perfect for high-end graphic design, print media, and scenarios where file size is not a constraint.</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-[#F0EEFF] text-[#5A4BFF] px-4 py-1.5 rounded-full font-black text-sm tracking-wide">WEBP</span>
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">Recommended</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Optimized for Web</h3>
                  <p className="text-gray-600 leading-relaxed">Delivers fully transparent images at roughly <strong>40-60% smaller file sizes</strong> than PNG. Essential for user-generated content, e-commerce web applications, and mobile apps aiming to save bandwidth.</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-[#F0EEFF] text-[#5A4BFF] px-4 py-1.5 rounded-full font-black text-sm tracking-wide">JPG</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Flattened Backgrounds</h3>
                  <p className="text-gray-600 leading-relaxed">JPG does not support transparency. If selected, the alpha channel is flattened against a solid color (defaults to white). Ideal for immediate insertion into strict marketplace listings (e.g., Amazon requirements).</p>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-purple-100 text-purple-800 px-4 py-1.5 rounded-full font-black text-sm tracking-wide">ZIP</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Raw Data Extraction</h3>
                  <p className="text-gray-600 leading-relaxed">Returns a compressed archive containing both the original image and a high-contrast grayscale alpha mask. Preferred by VFX artists and developers building custom compositing pipelines.</p>
                </div>
              </div>
            </section>

            <hr className="border-gray-200 my-16" />

            {/* SECTION 9: API Reference (Deep Dive) */}
            <section id="api-reference" className="mb-20 md:mb-28">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">API Reference (Deep Dive)</h2>
              <p className="text-lg text-gray-600 mb-10 max-w-4xl leading-relaxed">
                All requests must be made via HTTPS. Authenticate by passing your API key in the <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">X-Api-Key</code> header.
              </p>

              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded-md font-bold text-sm tracking-widest uppercase shadow-sm">POST</span>
                  <code className="text-gray-900 font-bold text-sm md:text-lg tracking-tight break-all">https://api.clearbg.com/v1.0/removebg</code>
                </div>

                <div className="p-0 overflow-x-auto no-scrollbar">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500 uppercase tracking-wider">
                        <th className="px-6 py-4 font-semibold w-1/4">Parameter</th>
                        <th className="px-6 py-4 font-semibold w-1/6">Type</th>
                        <th className="px-6 py-4 font-semibold">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm md:text-base">
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-5 font-mono font-bold text-gray-900 align-top">
                          image_file <span className="block mt-2 text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full w-fit uppercase font-sans tracking-wide">Required*</span>
                        </td>
                        <td className="px-6 py-5 text-gray-600 align-top">File (Binary)</td>
                        <td className="px-6 py-5 text-gray-700 leading-relaxed align-top">
                          The source image file. Must be JPEG, PNG, or WebP. Maximum file size is 25MB. Maximum resolution is 50 Megapixels. <br /><span className="text-sm text-gray-500 mt-2 block">*Required unless <code className="bg-gray-100 px-1 py-0.5 rounded">image_url</code> or <code className="bg-gray-100 px-1 py-0.5 rounded">image_base64</code> is provided.</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-5 font-mono font-bold text-gray-900 align-top">image_url</td>
                        <td className="px-6 py-5 text-gray-600 align-top">String (URL)</td>
                        <td className="px-6 py-5 text-gray-700 leading-relaxed align-top">
                          Publicly accessible URL to the source image. Our servers will download the image. Redirects are followed up to 5 times.
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-5 font-mono font-bold text-gray-900 align-top">size</td>
                        <td className="px-6 py-5 text-gray-600 align-top">String</td>
                        <td className="px-6 py-5 text-gray-700 leading-relaxed align-top">
                          Output resolution. Options:<br />
                          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                            <li><code className="bg-gray-100 px-1 py-0.5 rounded">auto</code> (Default) - Highest available up to 25MP.</li>
                            <li><code className="bg-gray-100 px-1 py-0.5 rounded">preview</code> - Resizes longest edge to 0.25MP (saves credits).</li>
                            <li><code className="bg-gray-100 px-1 py-0.5 rounded">full</code> - Preserves original resolution exactly (Pro/Enterprise only).</li>
                          </ul>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-5 font-mono font-bold text-gray-900 align-top">bg_color</td>
                        <td className="px-6 py-5 text-gray-600 align-top">String</td>
                        <td className="px-6 py-5 text-gray-700 leading-relaxed align-top">
                          Adds a solid color background. Accepts Hex codes (e.g., <code className="bg-gray-100 px-1 py-0.5 rounded">#81d4fa</code>), RGB strings, or standard color names (<code className="bg-gray-100 px-1 py-0.5 rounded">red</code>, <code className="bg-gray-100 px-1 py-0.5 rounded">transparent</code>).
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-5 font-mono font-bold text-gray-900 align-top">add_shadow</td>
                        <td className="px-6 py-5 text-gray-600 align-top">Boolean</td>
                        <td className="px-6 py-5 text-gray-700 leading-relaxed align-top">
                          If <code className="bg-gray-100 px-1 py-0.5 rounded">true</code>, uses AI to generate an artificial drop-shadow/ground-shadow based on the lighting detected in the original object. Perfect for product photography.
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-5 font-mono font-bold text-gray-900 align-top">roi</td>
                        <td className="px-6 py-5 text-gray-600 align-top">String</td>
                        <td className="px-6 py-5 text-gray-700 leading-relaxed align-top">
                          Region of Interest. Bounding box coordinates format: <code className="bg-gray-100 px-1 py-0.5 rounded">x1,y1,x2,y2</code> (e.g. <code className="bg-gray-100 px-1 py-0.5 rounded">100px,50px,500px,400px</code>). Forces the AI to only process the image within this specific box and ignore surrounding subjects.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            <hr className="border-gray-200 my-16" />

            {/* SECTION 10: Error Handling */}
            <section id="error-handling" className="mb-20 md:mb-28">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Error Codes & Handling</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-4xl">
                Our API uses standard HTTP response codes to indicate the success or failure of an API request. In general, codes in the <code className="bg-gray-100 px-2 py-1 rounded text-sm">2xx</code> range indicate success, codes in the <code className="bg-gray-100 px-2 py-1 rounded text-sm">4xx</code> range indicate an error based on the provided information, and codes in the <code className="bg-gray-100 px-2 py-1 rounded text-sm">5xx</code> range indicate a server error with ClearBG.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { code: '400', title: 'Bad Request', desc: 'Missing required parameters (like image_file) or malformed syntax.' },
                  { code: '401', title: 'Unauthorized', desc: 'Invalid API key, or OAuth access token has expired/been revoked.' },
                  { code: '402', title: 'Payment Required', desc: 'You have exhausted your credit balance or free tier limits.' },
                  { code: '403', title: 'Forbidden', desc: 'Your API key is restricted from calling this specific endpoint.' },
                  { code: '413', title: 'Payload Too Large', desc: 'The uploaded image exceeds the 25MB file size limit.' },
                  { code: '429', title: 'Too Many Requests', desc: 'You have hit your concurrency or rate limit. See backoff strategy.' }
                ].map(err => (
                  <div key={err.code} className="flex gap-4 p-5 bg-white border border-gray-200 rounded-xl">
                    <div className="bg-red-50 text-red-600 font-bold px-3 py-1.5 rounded-lg h-fit text-lg">{err.code}</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-1">{err.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{err.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-gray-200 my-16" />

            {/* SECTION 11: Exponential Backoff */}
            <section id="exponential-backoff" className="mb-20 md:mb-28">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Handling Exponential Backoff</h2>
              <div className="bg-[#F0EEFF] border-l-4 border-[#5A4BFF] p-6 rounded-r-xl mb-8">
                <p className="text-lg text-[#312E81] leading-relaxed">
                  If your bulk image processing script hits a <code className="bg-[#E0D8FE] text-[#4338CA] px-2 py-1 rounded text-sm font-bold">429 Rate Limit</code>, we strongly recommend implementing <strong>exponential backoff with jitter</strong> to prevent thundering herd problems.
                </p>
              </div>

              <p className="text-lg text-gray-600 mb-8 max-w-4xl leading-relaxed">
                Instead of retrying the request immediately and wasting your retry allowance, pause your thread. Wait a short period (e.g., 1 second) and retry. If it fails again, double the wait time (2s, 4s, 8s). Adding a random "jitter" (±500ms) prevents all your parallel workers from retrying at the exact same millisecond.
              </p>

              <div className="bg-[#0d1117] rounded-xl overflow-hidden shadow-xl border border-gray-800">
                <div className="bg-[#161b22] px-4 py-3 border-b border-gray-800">
                  <span className="text-sm text-gray-400 font-mono">Python Retry Logic Example</span>
                </div>
                <div className="p-6 md:p-8 overflow-x-auto no-scrollbar">
                  <pre className="text-sm md:text-base font-mono text-gray-300 whitespace-pre">
                    <span className="text-[#ff7b72]">import</span> time{'\n'}
                    <span className="text-[#ff7b72]">import</span> random{'\n'}
                    <span className="text-[#ff7b72]">import</span> requests{'\n\n'}
                    <span className="text-[#ff7b72]">def</span> <span className="text-[#d2a8ff]">call_api_with_backoff</span>(url, headers, files, max_retries=<span className="text-[#79c0ff]">5</span>):{'\n'}
                    {'    '}retries = <span className="text-[#79c0ff]">0</span>{'\n'}
                    {'    '}<span className="text-[#ff7b72]">while</span> retries {'<'} max_retries:{'\n'}
                    {'        '}response = requests.post(url, headers=headers, files=files){'\n'}
                    {'        '}<span className="text-[#ff7b72]">if</span> response.status_code == <span className="text-[#79c0ff]">200</span>:{'\n'}
                    {'            '}<span className="text-[#ff7b72]">return</span> response.content{'\n'}
                    {'        '}<span className="text-[#ff7b72]">elif</span> response.status_code == <span className="text-[#79c0ff]">429</span>:{'\n'}
                    {'            '}<span className="text-[#8b949e]"># Calculate backoff with random jitter</span>{'\n'}
                    {'            '}sleep_time = (<span className="text-[#79c0ff]">2</span> ** retries) + random.uniform(<span className="text-[#79c0ff]">0</span>, <span className="text-[#79c0ff]">1</span>){'\n'}
                    {'            '}time.sleep(sleep_time){'\n'}
                    {'            '}retries += <span className="text-[#79c0ff]">1</span>{'\n'}
                    {'        '}<span className="text-[#ff7b72]">else</span>:{'\n'}
                    {'            '}response.raise_for_status(){'\n'}
                    {'    '}<span className="text-[#ff7b72]">raise</span> Exception(<span className="text-[#a5d6ff]" >"Max retries exceeded"</span>)
                  </pre>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}