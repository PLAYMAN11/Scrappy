import React from 'react';

const MainSection = () => (
  <section className="flex flex-col items-start justify-center text-left px-40 py-32 text-white">
    <h1 className="text-7xl font-bold text-indigo-800 mb-8">
      Menos tiempo y esfuerzo,
      <br />
      más ahorros
    </h1>
    <p className="text-lg text-gray-200 mb-8">
      Scrappy te ayuda a encontrar las mejores ofertas en múltiples plataformas.
      <br />
      ¡Empieza hoy y consigue los mejores precios para tus productos favoritos!
    </p>
    <a href="/search">
      <button className="px-6 py-3 bg-indigo-800 text-white font-bold rounded-full hover:bg-indigo-800">
        Comenzar
      </button>
    </a>
  </section>
);

export default MainSection;
