import React, { useEffect, useRef } from 'react';
import { timelineEvents } from '../../constants';

const Journey: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const elements = timelineRef.current?.querySelectorAll('.timeline-item');
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);


  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">Our Journey</h2>
        <p className="text-xl text-gray-600 text-center mb-12">2013 - 2024</p>

        <div ref={timelineRef} className="relative wrap overflow-hidden p-10 h-full">
          <div className="border-2-2 absolute border-opacity-20 border-gray-700 h-full border" style={{ left: '50%' }}></div>
          
          {timelineEvents.map((event, index) => (
            <div 
              key={index} 
              className={`timeline-item mb-8 flex justify-between items-center w-full ${index % 2 === 0 ? 'flex-row-reverse left-timeline' : 'right-timeline'}`}
            >
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-gray-800 shadow-xl w-12 h-12 rounded-full">
                <h1 className="mx-auto font-semibold text-lg text-white">{event.year}</h1>
              </div>
              <div className={`order-1 ${event.color} rounded-lg shadow-xl w-5/12 px-6 py-4`}>
                <h3 className="mb-3 font-bold text-gray-800 text-xl">{event.title}</h3>
                <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;