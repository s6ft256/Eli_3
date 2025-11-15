
import React, { useState } from 'react';
import { courseCategories } from '../constants';
import { Course } from '../types';

const CourseTable: React.FC<{ courses: Course[] }> = ({ courses }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-800 text-white">
                <tr>
                    <th className="py-3 px-4 uppercase font-semibold text-sm text-left">Code</th>
                    <th className="py-3 px-4 uppercase font-semibold text-sm text-left">Programme</th>
                    <th className="py-3 px-4 uppercase font-semibold text-sm text-left">Duration</th>
                </tr>
            </thead>
            <tbody className="text-gray-700">
                {courses.map((course, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                        <td className="py-3 px-4">{course.code}</td>
                        <td className="py-3 px-4">{course.programme}</td>
                        <td className="py-3 px-4">{course.duration}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);


const CoursesPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState(courseCategories[0].name);

    const activeCategory = courseCategories.find(cat => cat.name === activeTab);

    return (
        <div className="min-h-screen bg-gray-100">
             <header className="bg-yellow-500 text-white py-20">
                <div className="container mx-auto px-6 text-center">
                <h1 className="text-5xl font-bold">Our Popular Courses</h1>
                <p className="mt-4 text-xl">Explore our extensive range of training programs</p>
                </div>
            </header>

            <div className="container mx-auto px-6 py-12">
                <div className="flex border-b border-gray-300 overflow-x-auto mb-8">
                    {courseCategories.map(category => (
                        <button
                            key={category.name}
                            onClick={() => setActiveTab(category.name)}
                            className={`py-4 px-6 text-lg font-medium focus:outline-none whitespace-nowrap ${
                                activeTab === category.name 
                                    ? 'border-b-4 border-yellow-500 text-yellow-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg">
                    {activeCategory && <CourseTable courses={activeCategory.courses} />}
                </div>
            </div>
        </div>
    );
};

export default CoursesPage;
