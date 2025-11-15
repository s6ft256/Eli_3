
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">Abu Dhabi</h3>
            <p className="text-gray-400">Burj Al Arab, Building 107, Office 101, Hamdan Street</p>
            <p className="text-gray-400">P.O. Box 106049, Abu Dhabi, U.A.E.</p>
            <p className="mt-2 text-gray-300">
              <a href="tel:+97125835701" className="hover:text-yellow-400">(+971) 2 5835 701</a>
            </p>
             <p className="text-gray-300">
              <a href="tel:+971504450354" className="hover:text-yellow-400">(+971) 50 445 0354</a>
            </p>
            <p className="mt-1 text-gray-300">
              <a href="mailto:info@iskills.co" className="hover:text-yellow-400">info@iskills.co</a>
            </p>
            <p className="mt-1 text-gray-300">
              <a href="http://www.iskills.co" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">www.iskills.co</a>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-4">Dubai</h3>
            <p className="text-gray-400">Office M32, Al Showaib, Abu Hail</p>
            <p className="text-gray-400">(Abu Hail Metro Station Exit 2)</p>
            <p className="mt-2 text-gray-300">
              <a href="tel:+97145914218" className="hover:text-yellow-400">(+971) 4 5914 218</a>
            </p>
            <p className="text-gray-300">
              <a href="tel:+971547061531" className="hover:text-yellow-400">(+971) 54 706 1531</a>
            </p>
             <p className="mt-1 text-gray-300">
              <a href="mailto:info@iskills.co" className="hover:text-yellow-400">info@iskills.co</a>
            </p>
             <p className="mt-1 text-gray-300">
              <a href="http://www.iskills.co" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400">www.iskills.co</a>
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start">
             <img src="https://i.imgur.com/v8iSZ2I.png" alt="Infinity Skills Logo" className="h-16 w-auto mb-4" />
             <p className="text-lg font-semibold">"COMING TOGETHER IS A BEGINNING.</p>
             <p className="text-lg font-semibold">KEEPING TOGETHER IS PROGRESS.</p>
             <p className="text-lg font-semibold">WORKING TOGETHER IS SUCCESS."</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Infinity Studies & Technical Solutions. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
