
import React, { useState } from 'react';
import { Page, NavItem } from '../types';

interface HeaderProps {
  currentPage: Page;
  navigate: (page: Page) => void;
}

const navItems: NavItem[] = [
  { name: 'Home', page: Page.Home },
  { name: 'About Us', page: Page.About },
  { name: 'Our Courses', page: Page.Courses },
];

const Header: React.FC<HeaderProps> = ({ currentPage, navigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center cursor-pointer" onClick={() => navigate(Page.Home)}>
            <img src="https://i.imgur.com/v8iSZ2I.png" alt="Infinity Skills Logo" className="h-10 w-auto" />
            <span className="ml-2 text-xl font-bold text-gray-800">Infinity Skills</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.page)}
                className={`text-gray-600 hover:text-yellow-500 transition-colors duration-300 font-medium pb-1 ${
                  currentPage === item.page ? 'border-b-2 border-yellow-500 text-yellow-500' : ''
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>
          
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.page);
                    setIsMenuOpen(false);
                  }}
                  className={`py-2 px-4 text-left rounded-md ${
                    currentPage === item.page ? 'bg-yellow-100 text-yellow-700' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;