import React from 'react';

const FeaturesSection = () => (
  <section className="px-6 py-12 bg-white text-start pl-40 pr-40">
    <h2 className="text-2xl font-bold text-indigo-800 mb-4">
      Explora nuestras funciones
    </h2>
    <p className="text-gray-600 mb-3">
      Nuestra plataforma ofrece las siguientes funciones para ayudarte a tomar las mejores decisiones de compra:
    </p>
    <div className="space-y-3">
      {[
        {
          title: "Búsqueda específica",
          description:
            "Revisa fácilmente los precios de productos de cada plataforma por separado. Si estás seguro o segura de lo que buscas y en dónde comprarlo, puedes usar el buscador para obtener las publicaciones con los mejores precios en la plataforma de tu elección.",
          icon: "/archer.png",
        },
        {
          title: "Búsqueda combinada",
          description:
            "Ve una lista combinada de productos para tomar decisiones rápidas. Usualmente un mismo producto tiene un precio diferente dependiendo de la plataforma en donde es ofertado, con esta función puedes comprobar rápidamente esta diferencia.",
          icon: "/combine.png",
        },
        {
          title: "Ordenamiento por precio",
          description:
            "La lista de productos puede ser ordenada ascendentemente o descendentemente. Quizá te interese ver desde el principio qué productos tienen precios mayores por lo que se permite cambiar el orden por defecto, esto es, de menor a mayor precio.",
          icon: "/sort.png",
        },
      ].map((feature, index) => (
        <div key={index} className="flex items-center space-x-4 mb-3">
          <img src={feature.icon} alt={feature.title} className="h-16 w-16" />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 leading-loose">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturesSection;
