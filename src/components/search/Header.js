import React from 'react';

const Header = () => (
  <header className="flex justify-between items-center p-6 text-white shadow-md bg-indigo-400 bg-opacity-70">
    <div className="text-2xl font-bold">
      <a href="/" title="Scrappy">
        <img src="/LogoScrappy.png" className="h-12 w-auto" alt="Logo" />
      </a>
    </div>
  </header>
);

export default Header;
