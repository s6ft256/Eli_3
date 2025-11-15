import React from 'react';
import { Page } from '../../types';

interface HeroProps {
    navigate: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ navigate }) => {
  return (
    <section className="relative h-[60vh] md:h-[80vh] text-white flex items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-wider mb-4">
          Company Profile
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl font-light mb-8 max-w-3xl mx-auto">
          Infinity Studies & Technical Solutions
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => navigate(Page.About)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Learn More About Us
          </button>
          <button 
            onClick={() => navigate(Page.Courses)}
            className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            View Our Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;