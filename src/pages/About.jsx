import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="pt-24 pb-0 bg-white">
      
      {/* 1. HERO SECTION */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
          <i className="fa-solid fa-leaf"></i> Our Story
        </div>
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-dark mb-6 tracking-tight">
          Designing the future of <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Visual AI.</span>
        </h1>
        <p className="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto font-medium">
          We believe that human creativity shouldn't be bottlenecked by repetitive, manual editing. ClearBG handles the busywork so you can focus on creating.
        </p>
      </div>

      {/* NEW: AS FEATURED IN (Social Proof) */}
      <div className="border-y border-gray-100 bg-gray-50/30 py-8 mb-20">
        <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Backed by top investors & featured in</p>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-40 grayscale font-black text-2xl tracking-tighter">
            <span className="flex items-center gap-2"><i className="fa-brands fa-y-combinator text-3xl"></i> Y Combinator</span>
            <span>TechCrunch</span>
            <span>WIRED</span>
            <span className="flex items-center gap-2"><i className="fa-brands fa-product-hunt text-3xl"></i> Product Hunt</span>
            <span>Forbes</span>
        </div>
      </div>

      {/* 2. MODERN IMAGE GRID */}
      <div className="max-w-7xl mx-auto px-4 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[450px]">
          <div className="rounded-[2rem] overflow-hidden shadow-2xl relative group h-64 md:h-auto">
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Team collaborating" />
          </div>
          <div className="rounded-[2rem] overflow-hidden shadow-2xl relative group md:col-span-2 h-80 md:h-auto">
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Modern Office" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8 md:p-12">
              <div>
                <div className="flex items-center gap-2 text-white/80 mb-2 font-semibold">
                  <i className="fa-solid fa-location-dot"></i> Headquarters
                </div>
                <h3 className="text-white text-3xl md:text-4xl font-bold tracking-tight">Based in San Francisco, <br/> building for the world.</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. STATS BANNER */}
      <div className="max-w-6xl mx-auto px-4 mb-24">
        <div className="bg-dark rounded-[3rem] p-12 md:p-16 text-center grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 relative overflow-hidden shadow-2xl shadow-gray-900/20">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10">
            <div className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">50M+</div>
            <div className="text-gray-400 font-bold text-xs uppercase tracking-widest">Images Processed</div>
          </div>
          <div className="relative z-10">
            <div className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">99.9%</div>
            <div className="text-gray-400 font-bold text-xs uppercase tracking-widest">API Uptime</div>
          </div>
          <div className="relative z-10">
            <div className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">150+</div>
            <div className="text-gray-400 font-bold text-xs uppercase tracking-widest">Countries</div>
          </div>
          <div className="relative z-10">
            <div className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">24/7</div>
            <div className="text-gray-400 font-bold text-xs uppercase tracking-widest">Global Support</div>
          </div>
        </div>
      </div>

      {/* NEW: THE MAGIC (Bento Box Grid Design) */}
      <div className="bg-gray-50 border-y border-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-primary text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <i className="fa-solid fa-microchip"></i> Proprietary Tech
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-dark mb-4">Under the hood</h2>
            <p className="text-gray-500 text-lg">We didn't just wrap an API. We built our own neural networks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Large Card 1 */}
            <div className="md:col-span-2 bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-dark text-white rounded-xl flex items-center justify-center text-xl mb-6 shadow-md"><i className="fa-solid fa-network-wired"></i></div>
                <h3 className="text-2xl font-bold text-dark mb-3">V2.0 Vision Architecture</h3>
                <p className="text-gray-500 leading-relaxed max-w-md">Our custom model was trained on millions of highly diverse images. It understands context, depth of field, and complex shadows better than legacy masking tools.</p>
              </div>
            </div>

            {/* Bento Small Card 1 */}
            <div className="bg-dark text-white rounded-[2rem] p-8 shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-50"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 text-white rounded-xl flex items-center justify-center text-xl mb-6 backdrop-blur-md"><i className="fa-solid fa-bolt"></i></div>
                <h3 className="text-2xl font-bold mb-3">Sub-3 Second <br/> Latency</h3>
                <p className="text-gray-400">Deployed on edge GPUs globally to ensure massive throughput and zero lag.</p>
              </div>
            </div>

            {/* Bento Small Card 2 */}
            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/40 relative group">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-xl mb-6"><i className="fa-solid fa-scissors"></i></div>
              <h3 className="text-2xl font-bold text-dark mb-3">Pixel-Perfect Edges</h3>
              <p className="text-gray-500 leading-relaxed">Advanced edge detection algorithms handle challenging subjects like hair, fur, and glass seamlessly.</p>
            </div>

            {/* Bento Large Card 2 */}
            <div className="md:col-span-2 bg-gradient-to-r from-purple-600 to-primary text-white rounded-[2rem] p-8 shadow-xl relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10 translate-x-1/4 translate-y-1/4">
                <i className="fa-solid fa-shield-halved text-[200px]"></i>
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 text-white rounded-xl flex items-center justify-center text-xl mb-6 backdrop-blur-md"><i className="fa-solid fa-lock"></i></div>
                <h3 className="text-2xl font-bold mb-3">Bank-grade Security</h3>
                <p className="text-white/80 leading-relaxed max-w-md">Your intellectual property is sacred. All uploads are encrypted in transit via SSL/TLS and immediately purged from our servers after 60 minutes. We never use user data to train our public models.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. THE MISSION (Two Column) */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-dark mb-6 tracking-tight">We're on a mission to democratize pro design.</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Started in 2023 by a group of designers and machine learning engineers, we noticed a massive gap in the market. Editing photos was either too expensive, too slow, or required years of software training.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We built our proprietary AI model from the ground up to solve one specific problem perfectly: image segmentation. Today, we empower millions of entrepreneurs, photographers, and developers to create stunning visuals at the click of a button.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-purple-300/20 rounded-3xl blur-2xl z-0"></div>
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80" alt="Team meeting" className="relative z-10 rounded-3xl shadow-xl border border-white/50" />
            </div>
          </div>
        </div>
      </div>

      {/* 5. CORE VALUES */}
      <div className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-dark mb-4">Our Core Values</h2>
            <p className="text-gray-500 text-lg">The principles that guide every decision we make.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm"><i className="fa-solid fa-rocket"></i></div>
              <h3 className="text-xl font-bold text-dark mb-3">Ship Fast, Learn Faster</h3>
              <p className="text-gray-500 leading-relaxed">We believe in rapid iteration. The best way to build a great product is to get it in the hands of users and listen to their feedback.</p>
            </div>
            <div className="p-8 rounded-3xl bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm"><i className="fa-solid fa-shield-halved"></i></div>
              <h3 className="text-xl font-bold text-dark mb-3">Privacy by Design</h3>
              <p className="text-gray-500 leading-relaxed">Your data is yours. We build privacy into our architecture from day one, ensuring images are deleted automatically and securely.</p>
            </div>
            <div className="p-8 rounded-3xl bg-white border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm"><i className="fa-solid fa-heart"></i></div>
              <h3 className="text-xl font-bold text-dark mb-3">User-Centric Excellence</h3>
              <p className="text-gray-500 leading-relaxed">We don't settle for "good enough." We obsess over the final 1% of edge detection because our users rely on us for their businesses.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. OUR JOURNEY (Timeline) */}
      <div className="bg-dark text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">Our Journey</h2>
            <p className="text-gray-400 text-lg">How we got here.</p>
          </div>
          
          <div className="space-y-12 border-l-2 border-gray-800 ml-4 md:ml-0 md:pl-8">
            <div className="relative pl-8 md:pl-0">
              <div className="absolute w-4 h-4 bg-primary rounded-full -left-[41px] md:-left-[41px] top-1.5 ring-4 ring-dark"></div>
              <h3 className="text-xl font-bold text-primary mb-1">January 2023</h3>
              <h4 className="text-2xl font-bold mb-2">The Idea is Born</h4>
              <p className="text-gray-400">Our founders started training the first iteration of our AI model in a small apartment in SF.</p>
            </div>
            <div className="relative pl-8 md:pl-0">
              <div className="absolute w-4 h-4 bg-gray-600 rounded-full -left-[41px] md:-left-[41px] top-1.5 ring-4 ring-dark"></div>
              <h3 className="text-xl font-bold text-gray-300 mb-1">August 2023</h3>
              <h4 className="text-2xl font-bold mb-2">Beta Launch</h4>
              <p className="text-gray-400">Released the first free version online. Hit 10,000 users in the first 48 hours via Product Hunt.</p>
            </div>
            <div className="relative pl-8 md:pl-0">
              <div className="absolute w-4 h-4 bg-gray-600 rounded-full -left-[41px] md:-left-[41px] top-1.5 ring-4 ring-dark"></div>
              <h3 className="text-xl font-bold text-gray-300 mb-1">March 2024</h3>
              <h4 className="text-2xl font-bold mb-2">Enterprise API Release</h4>
              <p className="text-gray-400">Launched our developer API, allowing thousands of apps to integrate our background removal tech.</p>
            </div>
            <div className="relative pl-8 md:pl-0">
              <div className="absolute w-4 h-4 bg-purple-500 rounded-full -left-[41px] md:-left-[41px] top-1.5 ring-4 ring-dark shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
              <h3 className="text-xl font-bold text-purple-400 mb-1">Today</h3>
              <h4 className="text-2xl font-bold mb-2">V2.0 AI Model Live</h4>
              <p className="text-gray-400">Processing millions of images daily with our fastest, most accurate model to date.</p>
            </div>
          </div>
        </div>
      </div>

      {/* NEW: LIFE AT CLEARBG (Company Culture & Perks) */}
      <div className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-dark mb-4">Life at ClearBG</h2>
            <p className="text-gray-500 text-lg">We treat our team as well as we treat our API users.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 text-center hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 bg-white text-dark rounded-full flex items-center justify-center text-xl mx-auto mb-4 shadow-sm"><i className="fa-solid fa-earth-americas"></i></div>
              <h4 className="font-bold text-dark mb-2">Remote First</h4>
              <p className="text-sm text-gray-500">Work from anywhere. We care about output, not hours spent at a desk.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 text-center hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 bg-white text-dark rounded-full flex items-center justify-center text-xl mx-auto mb-4 shadow-sm"><i className="fa-solid fa-mug-hot"></i></div>
              <h4 className="font-bold text-dark mb-2">Health & Wellness</h4>
              <p className="text-sm text-gray-500">Premium health coverage, mental health days, and a monthly fitness stipend.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 text-center hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 bg-white text-dark rounded-full flex items-center justify-center text-xl mx-auto mb-4 shadow-sm"><i className="fa-solid fa-book-open"></i></div>
              <h4 className="font-bold text-dark mb-2">Learning Budget</h4>
              <p className="text-sm text-gray-500">$2,000 annual stipend for courses, books, and conference tickets.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 text-center hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 bg-white text-dark rounded-full flex items-center justify-center text-xl mx-auto mb-4 shadow-sm"><i className="fa-solid fa-plane"></i></div>
              <h4 className="font-bold text-dark mb-2">Team Retreats</h4>
              <p className="text-sm text-gray-500">Twice a year, we fly the whole team to a beautiful destination to connect.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 8. CAREERS & BOTTOM CTA */}
      <div className="py-24 bg-gradient-to-b from-gray-50 to-white text-center relative overflow-hidden">
        {/* Background blobs for depth */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-8 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="w-20 h-20 bg-white text-primary rounded-full flex items-center justify-center text-3xl mx-auto mb-8 shadow-xl shadow-blue-500/10 border border-gray-100">
            <i className="fa-solid fa-briefcase"></i>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-dark mb-6 tracking-tight">Come build the future.</h2>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
            We are always looking for passionate engineers, marketers, and designers. Help us process the next billion images.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link to="/contact" className="w-full sm:w-auto bg-white border-2 border-gray-200 text-dark font-bold px-8 py-4 rounded-full hover:border-gray-300 hover:bg-gray-50 transition-all shadow-sm">
              View Open Roles
            </Link>
            <Link to="/" className="w-full sm:w-auto bg-primary text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:-translate-y-1 transition-all">
              Try the Tool Free
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}