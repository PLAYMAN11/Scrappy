import React from 'react';

const Header = () => (
  <header className="flex justify-between items-center p-6 text-white shadow-md bg-indigo-200 bg-opacity-35">
    <div className="text-2xl font-bold">
      <a href="/" title="Scrappy">
        <img src="/LogoScrappy.png" className="h-12 w-auto" alt="Logo" />
      </a>
    </div>
    <div className="flex items-center space-x-4">
      <div className="text-2xl font-bold">
        <a
          href="https://github.com/PLAYMAN11/Scrappy"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
        >
          <img src="/LogoGitHub.png" alt="GitHub" className="h-8 w-auto" />
        </a>
      </div>
      <div>
        <a href="/search">
          <button className="px-4 py-1 bg-white text-indigo-600 font-bold rounded-full hover:bg-indigo-100">
            Comenzar
          </button>
        </a>
      </div>
    </div>
  </header>
);

export default Header;
