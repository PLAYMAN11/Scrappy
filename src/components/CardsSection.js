import React from 'react';

const CardsSection = () => (
  <section className="px-6 py-12">
    <h2 className="text-2xl font-bold text-gray-100 text-center mb-10">
      ¿Por qué usar Scrappy?
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pl-32 pr-32">
      {[
        {
          title: "Ahorro de tiempo",
          description:
            "Encuentra los mejores precios rápidamente sin navegar por múltiples sitios.",
          icon: "/clock.png",
        },
        {
          title: "Facilidad de uso",
          description: "Una interfaz intuitiva diseñada para una navegación sencilla.",
          icon: "/love.png",
        },
        {
          title: "Datos confiables",
          description: "Información de productos precisa y actualizada.",
          icon: "/verification.png",
        },
      ].map((card, index) => (
        <div key={index} className="bg-white shadow-lg p-6 rounded-lg text-center">
          <div className="flex justify-center mb-4">
            <img src={card.icon} alt={card.title} className="h-12 w-12" />
          </div>
          <h3 className="text-xl font-semibold text-indigo-800 mb-4">{card.title}</h3>
          <p className="text-gray-600">{card.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default CardsSection;
