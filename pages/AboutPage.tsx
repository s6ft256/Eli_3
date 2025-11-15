import React from 'react';

const ValueCard: React.FC<{ title: string, icon: React.ReactNode }> = ({ title, icon }) => (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
        <div className="text-yellow-500 mb-4">{icon}</div>
        <h4 className="text-xl font-semibold text-gray-800">{title}</h4>
    </div>
);

const AboutPage: React.FC = () => {
    const values = [
        { title: 'Transparency', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> },
        { title: 'Safety', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944a11.955 11.955 0 0118 0z" /></svg> },
        { title: 'Integrity', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg> },
        { title: 'Competence', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
        { title: 'Commitment', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
    ];
  return (
    <div className="bg-gray-50">
      <header className="bg-yellow-500 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold">About Infinity Skills</h1>
          <p className="mt-4 text-xl">Educate, Elevate, Inspire</p>
        </div>
      </header>
      
      <section className="py-16 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Who We Are?</h2>
                <p className="text-gray-600 mb-4">Infinity Studies and Technical Solutions (ISTS) was founded in 2013 by experts with the passion to empower clients with the best skills. As a leading Training & Development company, we enhance knowledge and skills for organizations and individuals through highly qualified assessors & subject matter experts. We are customer-driven, continuously elevating our quality and training standards to meet global market challenges.</p>
                <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">What We Do?</h2>
                <p className="text-gray-600">We offer motivating trainings that instigate a desire for learning. With honed expertise in multi-disciplinary skills, we provide flexible learning solutions for individuals, organizations, and governments. Our proactive approach utilizes international exposure to design training programs focused on specific client issues, blending classroom lectures, praxis learning, and technological advancement.</p>
            </div>
             <div className="relative h-96">
                <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop" alt="Team working" className="absolute w-full h-full object-cover rounded-lg shadow-lg"/>
            </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
             <div className="relative h-96 order-last md:order-first">
                <img src="https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2070&auto=format&fit=crop" alt="Global connection" className="absolute w-full h-full object-cover rounded-lg shadow-lg"/>
            </div>
            <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Where We Are?</h2>
                <p className="text-gray-600 mb-4">Located in a region at the epicenter of development, we have a unique geographical advantage to offer services globally. Headquartered in Abu Dhabi, UAE, we have regional offices in Dubai, Lahore, UK, & Canada.</p>
                <h2 className="text-3xl font-bold text-gray-800 mb-4 mt-8">Our Slogan</h2>
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-r-lg">
                    <p className="text-2xl font-bold">LEARNING FOREVER!</p>
                    <p className="text-lg">Educate Elevate Inspire</p>
                    <p className="mt-2 text-gray-700">"Learning Forever! is what we at ISTS strongly believe in, hence the name “Infinity”. We believe that it is never too early or too late to start learning something new."</p>
                </div>
            </div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
                 <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
                 <p className="text-gray-600 mb-4">To be a values-driven organization which consciously works with an unshakable commitment to empower our customers with knowledge, confidence, skills, and leadership qualities.</p>
            </div>
             <div>
                 <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
                 <p className="text-gray-600 mb-4">To create a long-term, effective partnership with our customers and to identify their needs even before they know they need it. We will achieve this by offering education and skills in the most accessible, innovative, differentiated, and honest ways.</p>
            </div>
        </div>
      </section>

       <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Core Values</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">Commitment to the satisfaction and fulfillment of our customers is our foremost priority. Our knowledgeable, friendly staff & competent consultants ensure a safe, entertaining, and achievable learning experience. Our core values revolve around these Five Philosophies:</p>
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {values.map(value => <ValueCard key={value.title} title={value.title} icon={value.icon} />)}
           </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;