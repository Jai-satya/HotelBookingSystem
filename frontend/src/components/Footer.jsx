import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-brand-navy text-slate-300 py-8 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-xl font-bold text-white flex items-center space-x-2">
              <svg className="w-6 h-6 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
              <span>LuxeStay</span>
            </span>
            <p className="text-sm mt-2">Premium hotel bookings made simple.</p>
          </div>
          <div className="text-sm">
            &copy; {new Date().getFullYear()} LuxeStay Hotel Management System. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
