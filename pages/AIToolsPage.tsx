
import React, { useState } from 'react';
import ImageAnalysis from '../components/ai/ImageAnalysis';
import ImageGeneration from '../components/ai/ImageGeneration';
import ImageEditing from '../components/ai/ImageEditing';
import VideoGeneration from '../components/ai/VideoGeneration';
import LocationQuery from '../components/ai/LocationQuery';

const AIToolsPage: React.FC = () => {
    const tabs = [
        { name: 'Analyze Image', component: <ImageAnalysis />, icon: <svg xmlns="http://www.w.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg> },
        { name: 'Generate Image', component: <ImageGeneration />, icon: <svg xmlns="http://www.w.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg> },
        { name: 'Edit Image', component: <ImageEditing />, icon: <svg xmlns="http://www.w.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg> },
        { name: 'Animate Image', component: <VideoGeneration />, icon: <svg xmlns="http://www.w.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 001.553.832l3-2a1 1 0 000-1.664l-3-2z" /></svg> },
        { name: 'Location Query', component: <LocationQuery />, icon: <svg xmlns="http://www.w.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg> },
    ];
    const [activeTab, setActiveTab] = useState(tabs[0].name);

    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-6 py-4">
                    <h1 className="text-3xl font-bold text-gray-800">AI Creative Tools</h1>
                    <p className="text-gray-600 mt-1">Powered by Google Gemini</p>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                <div className="flex border-b border-gray-300 overflow-x-auto mb-8">
                    {tabs.map(tab => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`py-4 px-6 text-lg font-medium focus:outline-none whitespace-nowrap flex items-center gap-2 ${
                                activeTab === tab.name
                                    ? 'border-b-4 border-yellow-500 text-yellow-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab.icon}
                            <span>{tab.name}</span>
                        </button>
                    ))}
                </div>

                <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg">
                    {tabs.find(tab => tab.name === activeTab)?.component}
                </div>
            </main>
        </div>
    );
};

export default AIToolsPage;
