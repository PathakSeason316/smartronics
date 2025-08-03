import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <section className="rounded-lg overflow-hidden shadow-md border border-gray-200 my-6">
      <div className="flex flex-col sm:flex-row">
        
        {/* Hero Text */}
        <div className="w-full sm:w-1/2 flex items-center justify-center bg-white p-8 md:p-12">
          <div className="text-gray-800 max-w-md space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-[2px] bg-gray-700" />
              <span className="text-sm font-medium tracking-wide">Our Best Sellers</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
              Latest Arrival
            </h1>

            <button className="inline-flex items-center gap-2 text-sm font-semibold hover:underline transition">
              Shop Now
              <div className="w-10 h-[2px] bg-gray-700" />
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full sm:w-1/2">
          <img
            src={assets.hero_img}
            alt="Latest product showcase"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
