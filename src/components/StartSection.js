import React from 'react';

const StartSection = () => {
  return (
    <section>
      <div className="flex flex-col items-center justify-center text-center px-28 py-6 text-white bg-indigo-400 bg-opacity-70">
        <a href="/search">
          <button className="px-4 py-2 bg-white text-indigo-600 font-bold rounded-full hover:bg-indigo-100">
            Comenzar
          </button>
          <a href="/" title="Scrappy">
            <img src="/LogoScrappy.png" className="h-12 w-auto" alt="Logo" />
          </a>
        </a>
      </div>
    </section>
  );
};

export default StartSection;
