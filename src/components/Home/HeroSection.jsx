"use client";

import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white py-16 lg:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-200 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-16 lg:px-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Content Section */}
          <div className="text-center lg:text-left space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#073349] leading-tight">
              UNLOCK YOUR DESTINY WITH{' '}
              <span className="text-[#D44459]">AI-POWERED</span> ASTROLOGY
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
              PERSONALIZED GUIDANCE. MODERN MYSTICISM. ALWAYS CONNECTED.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-[#D44459] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#B83A4A] transition-colors duration-300 shadow-lg">
                GET STARTED
              </button>
              <button className="bg-transparent text-[#073349] px-8 py-4 rounded-xl font-semibold text-lg border-2 border-[#073349] hover:bg-[#073349] hover:text-white transition-all duration-300">
                LEARN MORE
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main Image Placeholder - You can replace this with actual image */}
              <div className="w-80 h-96 bg-gradient-to-br from-orange-100 to-pink-100 rounded-3xl shadow-2xl relative overflow-hidden">
                {/* Meditation Person Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-orange-300 to-pink-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-4xl">🧘‍♀️</span>
                    </div>
                    <p className="text-[#073349] font-medium">Meditation Image</p>
                    <p className="text-sm text-gray-500">(Replace with actual image)</p>
                  </div>
                </div>
                
                {/* Glowing Effects */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-yellow-300 rounded-full opacity-30 blur-xl animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-orange-300 rounded-full opacity-40 blur-lg animate-pulse delay-1000"></div>
                <div className="absolute bottom-1/3 left-1/4 w-16 h-16 bg-pink-300 rounded-full opacity-40 blur-lg animate-pulse delay-2000"></div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#D44459] rounded-full opacity-80 animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#073349] rounded-full opacity-60 animate-bounce delay-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

