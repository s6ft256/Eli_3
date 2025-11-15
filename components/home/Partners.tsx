
import React from 'react';
import { partners, accreditations } from '../../constants';

const LogoGrid: React.FC<{ logos: { src: string; alt: string }[] }> = ({ logos }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center">
        {logos.map((logo, index) => (
            <div key={index} className="flex justify-center items-center p-4 bg-white rounded-lg shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <img src={logo.src} alt={logo.alt} className="max-h-20 w-auto" />
            </div>
        ))}
    </div>
);


const Partners: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12">Our Partners</h2>
            <LogoGrid logos={partners} />
        </div>

         <div>
            <h2 className="text-4xl font-bold text-center mb-12">Accreditation</h2>
            <LogoGrid logos={accreditations} />
        </div>
      </div>
    </section>
  );
};

export default Partners;
