
import React from 'react';
import { portfolioItems } from '../../constants';

const PortfolioCard: React.FC<{ title: string; image: string; }> = ({ title, image }) => (
    <div className="relative rounded-lg overflow-hidden shadow-lg group">
        <img src={image} alt={title} className="w-full h-64 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300 ease-in-out"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300 ease-in-out group-hover:-translate-y-1">
             <h3 className="text-white text-xl font-semibold">{title}</h3>
        </div>
    </div>
);

const Portfolio: React.FC = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Our Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item, index) => (
            <PortfolioCard key={index} title={item.title} image={item.image} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;